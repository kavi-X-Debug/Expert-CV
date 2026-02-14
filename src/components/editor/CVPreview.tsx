"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { PDFViewer } from "@react-pdf/renderer";
import { ModernTemplatePDF } from "@/components/templates/renderers/ModernTemplate";
import { ClassicTemplatePDF } from "@/components/templates/renderers/ClassicTemplate";
import { CreativeTemplatePDF } from "@/components/templates/renderers/CreativeTemplate";
import { MinimalistTemplatePDF } from "@/components/templates/renderers/MinimalistTemplate";
import { TechTemplatePDF } from "@/components/templates/renderers/TechTemplate";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CVPreview() {
    const { cv } = useCVStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!cv || !isClient) return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin" /></div>;

    const renderTemplate = () => {
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
    };

    return (
        <div className="bg-white shadow-lg w-full h-full flex items-center justify-center">
            <PDFViewer width="100%" height="100%" showToolbar={false} className="border-none">
                {renderTemplate()}
            </PDFViewer>
        </div>
    );
}
