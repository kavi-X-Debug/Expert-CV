import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Expert CV",
    description: "Login to your Expert CV account",
};

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center text-primary">Expert CV</h1>
            </div>
            <LoginForm />
        </div>
    );
}
