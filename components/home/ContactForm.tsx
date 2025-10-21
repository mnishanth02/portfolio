"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSubmissionSchema, type ContactSubmission } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

/**
 * ContactForm Component
 * Form for submitting contact inquiries with validation and spam protection
 */
export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const form = useForm<ContactSubmission>({
        resolver: zodResolver(contactSubmissionSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            website: "", // Honeypot field
        },
    });

    const onSubmit = async (data: ContactSubmission) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        // Check honeypot
        if (data.website) {
            setIsSubmitting(false);
            return; // Silently fail for spam
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to send message");
            }

            setSubmitStatus("success");
            form.reset();
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Failed to send message",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6">
                {/* Name Field */ }
                <FormField
                    control={ form.control }
                    name="name"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />

                {/* Email Field */ }
                <FormField
                    control={ form.control }
                    name="email"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="your@email.com" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />

                {/* Message Field */ }
                <FormField
                    control={ form.control }
                    name="message"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell me about your project or inquiry..."
                                    rows={ 6 }
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />

                {/* Honeypot Field (hidden) */ }
                <FormField
                    control={ form.control }
                    name="website"
                    render={ ({ field }) => (
                        <FormItem className="hidden">
                            <FormControl>
                                <Input type="text" tabIndex={ -1 } autoComplete="off" { ...field } />
                            </FormControl>
                        </FormItem>
                    ) }
                />

                {/* Submit Button */ }
                <Button type="submit" className="w-full" disabled={ isSubmitting }>
                    { isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    ) }
                </Button>

                {/* Success Message */ }
                { submitStatus === "success" && (
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                            Thank you! Your message has been sent successfully. I'll get back
                            to you soon.
                        </AlertDescription>
                    </Alert>
                ) }

                {/* Error Message */ }
                { submitStatus === "error" && (
                    <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <AlertDescription className="text-red-800 dark:text-red-200">
                            { errorMessage || "Failed to send message. Please try again or email me directly." }
                        </AlertDescription>
                    </Alert>
                ) }
            </form>
        </Form>
    );
}
