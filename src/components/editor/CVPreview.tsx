"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { PDFViewer } from "@react-pdf/renderer";
import { ModernTemplatePDF } from "@/components/templates/renderers/ModernTemplate";
import { ClassicTemplatePDF } from "@/components/templates/renderers/ClassicTemplate";
import { CreativeTemplatePDF } from "@/components/templates/renderers/CreativeTemplate";
import { MinimalistTemplatePDF } from "@/components/templates/renderers/MinimalistTemplate";
import { TechTemplatePDF } from "@/components/templates/renderers/TechTemplate";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CVPreview() {
    const { cv } = useCVStore();
    const [isClient, setIsClient] = useState(false);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Force PDFViewer to re-mount on any CV change for real-time updates
        if (cv) {
            setVersion((v) => v + 1);
        }
    }, [cv]);

    if (!cv || !isClient)
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );

    const doc = useMemo(() => {
        switch (cv.templateId) {
            case "classic":
                return <ClassicTemplatePDF cv={cv} />;
            case "creative":
                return <CreativeTemplatePDF cv={cv} />;
            case "minimalist":
                return <MinimalistTemplatePDF cv={cv} />;
            case "tech":
                return <TechTemplatePDF cv={cv} />;
            case "modern":
            default:
                return <ModernTemplatePDF cv={cv} />;
        }
    }, [cv]);

    return (
        <div className="bg-white shadow-lg w-full h-full flex items-center justify-center">
            <PDFViewer key={version} width="100%" height="100%" showToolbar={false} className="border-none">
                {doc}
            </PDFViewer>
        </div>
    );
}
