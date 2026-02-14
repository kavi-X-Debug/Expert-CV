import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { ModernTemplatePDF } from "@/components/templates/renderers/ModernTemplate";
import { ClassicTemplatePDF } from "@/components/templates/renderers/ClassicTemplate";
import { CreativeTemplatePDF } from "@/components/templates/renderers/CreativeTemplate";
import { MinimalistTemplatePDF } from "@/components/templates/renderers/MinimalistTemplate";
import { TechTemplatePDF } from "@/components/templates/renderers/TechTemplate";
import { CV } from "@/types/cv";
import React from "react";

export const generatePDF = async (cv: CV) => {
    let doc: React.ReactElement;

    switch (cv.templateId) {
        case "classic":
            doc = <ClassicTemplatePDF cv={cv} />;
            break;
        case "creative":
            doc = <CreativeTemplatePDF cv={cv} />;
            break;
        case "minimalist":
            doc = <MinimalistTemplatePDF cv={cv} />;
            break;
        case "tech":
            doc = <TechTemplatePDF cv={cv} />;
            break;
        case "modern":
        default:
            doc = <ModernTemplatePDF cv={cv} />;
            break;
    }

    try {
        const blob = await pdf(doc).toBlob();
        saveAs(blob, `${cv.data.personalInfo.fullName.replace(/\s+/g, "_")}_CV.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};

