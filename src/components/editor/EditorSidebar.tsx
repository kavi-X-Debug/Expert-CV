"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PersonalInfoForm from "./sections/PersonalInfoForm";
import ExperienceForm from "./sections/ExperienceForm";
import EducationForm from "./sections/EducationForm";
import SkillsForm from "./sections/SkillsForm";
import CustomizationForm from "./sections/CustomizationForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Loader2, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { generatePDF } from "@/lib/pdf/generatePDF";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function EditorSidebar() {
    const { cv, setCV } = useCVStore();
    const [isDownloading, setIsDownloading] = useState(false);

    if (!cv) return null;

    const handleDownload = async () => {
        setIsDownloading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        await generatePDF(cv);
        setIsDownloading(false);
    };

    const handleTemplateChange = async (value: string) => {
        // Optimistic update
        const updatedCV = { ...cv, templateId: value };
        setCV(updatedCV);

        try {
            // Persist to Firestore
            const cvRef = doc(db, "users", cv.userId, "cvs", cv.id);
            await updateDoc(cvRef, { templateId: value });
        } catch (error) {
            console.error("Error updating template:", error);
        }
    };

    return (
        <div className="p-6 pb-20 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold truncate max-w-[150px]">{cv.title}</h1>
                        <p className="text-xs text-muted-foreground">Last saved just now</p>
                    </div>
                </div>
                <Button size="sm" variant="outline" onClick={handleDownload} disabled={isDownloading}>
                    {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                </Button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                    <LayoutTemplate className="h-4 w-4" /> Template
                </label>
                <Select value={cv.templateId} onValueChange={handleTemplateChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="modern">Modern Professional</SelectItem>
                        <SelectItem value="classic">Classic Traditional</SelectItem>
                        <SelectItem value="creative">Creative Designer</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="tech">Tech / Developer</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Accordion type="single" collapsible defaultValue="personal-info" className="w-full">
                <AccordionItem value="personal-info">
                    <AccordionTrigger>Personal Information</AccordionTrigger>
                    <AccordionContent>
                        <PersonalInfoForm />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="experience">
                    <AccordionTrigger>Work Experience</AccordionTrigger>
                    <AccordionContent>
                        <ExperienceForm />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="education">
                    <AccordionTrigger>Education</AccordionTrigger>
                    <AccordionContent>
                        <EducationForm />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="skills">
                    <AccordionTrigger>Skills</AccordionTrigger>
                    <AccordionContent>
                        <SkillsForm />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
