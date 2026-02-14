"use client";

import { motion } from "framer-motion";
import { FileText, Layout, Download, Save, Smartphone, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        title: "Professional Templates",
        description: "Choose from a variety of ATS-friendly templates designed by experts.",
        icon: Layout,
    },
    {
        title: "Easy Customization",
        description: "Customize colors, fonts, and layouts to match your personal brand.",
        icon: FileText,
    },
    {
        title: "PDF Export",
        description: "Download high-quality PDFs ready for job applications.",
        icon: Download,
    },
    {
        title: "Auto-Save",
        description: "Your work is automatically saved as you type. Never lose progress.",
        icon: Save,
    },
    {
        title: "Mobile Friendly",
        description: "Edit your CV on the go with our fully responsive editor.",
        icon: Smartphone,
    },
    {
        title: "ATS Optimized",
        description: "Ensure your resume gets past Applicant Tracking Systems.",
        icon: CheckCircle,
    },
];

export default function Features() {
    return (
        <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Features
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Everything you need to create a standout resume.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card>
                            <CardHeader>
                                <feature.icon className="h-10 w-10 text-primary mb-2" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
