import type { Metadata } from "next";
import CVList from "@/components/dashboard/CVList";
import CreateCVButton from "@/components/dashboard/CreateCVButton";

export const metadata: Metadata = {
    title: "Dashboard | Expert CV",
    description: "Manage your resumes",
};

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Manage and organize your professional resumes.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <CreateCVButton />
                </div>
            </div>
            <CVList />
        </div>
    );
}
