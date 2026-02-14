import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const AuthProvider = dynamic(
    () => import("@/components/auth/AuthProvider").then((m) => m.AuthProvider),
    { ssr: false }
);
const Toaster = dynamic(
    () => import("@/components/ui/toaster").then((m) => m.Toaster),
    { ssr: false }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: 'Expert CV - Professional Resume Builder',
    description: 'Create professional resumes with our free CV builder. Choose from templates, customize, and download your perfect resume in minutes.',
    keywords: 'resume builder, cv maker, free resume, professional cv, resume templates',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://expertcv.com',
        siteName: 'Expert CV',
        title: 'Expert CV - Free Resume Builder',
        description: 'Build professional resumes online',
        images: [{
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Expert CV',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Expert CV - Free Resume Builder',
        description: 'Build professional resumes online',
        images: ['/og-image.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable
                )}
            >
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
