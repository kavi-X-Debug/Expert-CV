"use client";

import EditorSidebar from "./EditorSidebar";
import CVPreview from "./CVPreview";

export function SidebarAndPreview() {
    return (
        <>
            <div className="w-1/2 md:w-[40%] lg:w-[35%] h-full border-r bg-background overflow-y-auto">
                <EditorSidebar />
            </div>
            <div className="flex-1 h-full bg-slate-100 dark:bg-slate-900 overflow-y-auto p-8 flex justify-center">
                <CVPreview />
            </div>
        </>
    );
}
