import { Sidebar } from "@/components/layout/Sidebar";
import { UserNav } from "@/components/layout/UserNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar className="hidden md:block w-64 border-r" />
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b flex items-center px-6 justify-between">
                    <h1 className="text-lg font-semibold md:hidden">Expert CV</h1>
                    <div className="ml-auto">
                        <UserNav />
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 pt-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
