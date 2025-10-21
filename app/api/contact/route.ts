import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSubmissionSchema } from "@/lib/validations";

// Rate limiting store (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting function
 * Limits to 1 submission per minute per IP
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  // Already has an active rate limit
  return false;
}

/**
 * Cleanup old rate limit entries to prevent memory leak
 * Called periodically to remove expired entries
 */
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, limit] of rateLimitMap.entries()) {
    if (now > limit.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Cleanup rate limit map every 5 minutes
setInterval(cleanupRateLimitMap, 5 * 60 * 1000);

/**
 * HTML escape function to prevent XSS
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    // Extract first IP from x-forwarded-for header (can contain multiple IPs)
    // Note: These headers can be spoofed; ensure deployment platform sets them correctly
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip")?.trim() ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const { name, email, message, website } = validationResult.data;

    // Check honeypot
    if (website) {
      // Silently accept spam submissions
      return NextResponse.json({ success: true });
    }

    // Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Update with verified domain
      to: process.env.CONTACT_EMAIL || "your-email@example.com",
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
				<h3>Message:</h3>
				<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
			`,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
