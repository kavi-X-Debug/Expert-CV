"use client";

export default function EditorError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex h-screen items-center justify-center p-6">
            <div className="max-w-md text-center space-y-4">
                <h2 className="text-xl font-semibold">Something went wrong</h2>
                <p className="text-sm text-muted-foreground">
                    {error.message || "An unexpected error occurred while loading the editor."}
                </p>
                <button
                    className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm"
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </div>
        </div>
    );
}

