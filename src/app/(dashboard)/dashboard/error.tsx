"use client";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex h-64 items-center justify-center p-6">
            <div className="max-w-md text-center space-y-4">
                <h2 className="text-xl font-semibold">Unexpected error</h2>
                <p className="text-sm text-muted-foreground">
                    {error.message || "An error occurred while loading the dashboard."}
                </p>
                <button
                    className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm"
                    onClick={() => reset()}
                >
                    Retry
                </button>
            </div>
        </div>
    );
}

