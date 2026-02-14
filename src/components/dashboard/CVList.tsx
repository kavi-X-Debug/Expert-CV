"use client";

import { useCVs } from "@/lib/hooks/useCVs";
import CVCard from "./CVCard";
import CreateCVButton from "./CreateCVButton";
import { Loader2 } from "lucide-react";

export default function CVList() {
    const { cvs, loading, error } = useCVs();

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-destructive">
                Error loading CVs: {error}
            </div>
        )
    }

    if (cvs.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
                <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                    <h3 className="mt-4 text-lg font-semibold">No resumes created</h3>
                    <p className="mb-4 mt-2 text-sm text-muted-foreground">
                        You haven&apos;t created any resumes yet. Start by creating your first one.
                    </p>
                    <CreateCVButton />
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cvs.map((cv) => (
                <CVCard key={cv.id} cv={cv} />
            ))}
        </div>
    );
}
