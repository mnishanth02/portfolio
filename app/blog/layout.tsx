import type { ReactNode } from "react";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Breadcrumb Navigation */ }
            <div className="border-b bg-muted/50">
                <div className="container mx-auto py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="flex items-center gap-1">
                                        <Home className="h-4 w-4" />
                                        Home
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Blog</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <main>{ children }</main>

            <Footer />
        </div>
    );
}
