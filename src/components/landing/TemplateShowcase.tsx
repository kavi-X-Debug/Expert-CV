"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { createCV } from "@/lib/firebase/firestore";

const templates = [
    {
        id: "modern",
        name: "Modern Professional",
        category: "Professional",
        image: "/templates/modern-preview.png",
        description: "Clean, contemporary design for corporate roles.",
    },
    {
        id: "classic",
        name: "Classic Traditional",
        category: "Professional",
        image: "/templates/classic-preview.png",
        description: "Timeless elegance for conservative industries.",
    },
    {
        id: "creative",
        name: "Creative Designer",
        category: "Creative",
        image: "/templates/creative-preview.png",
        description: "Bold layout for creative professionals.",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        category: "Simple",
        image: "/templates/minimalist-preview.png",
        description: "Focus purely on content with ample whitespace.",
    },
    {
        id: "tech",
        name: "Tech/Developer",
        category: "Tech",
        image: "/templates/tech-preview.png",
        description: "Code-inspired aesthetic for developers.",
    },
];

export default function TemplateShowcase() {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [creatingFor, setCreatingFor] = useState<string | null>(null);

    const handleUseTemplate = async (templateId: string) => {
        if (!user) {
            toast({ title: "Please sign in", description: "Log in to start with a template." });
            router.push("/login");
            return;
        }
        try {
            setCreatingFor(templateId);
            const cvId = await createCV(user.uid, templateId);
            router.push(`/editor/${cvId}`);
        } catch (e) {
            toast({ title: "Could not start editor", description: "Please try again shortly." });
        } finally {
            setCreatingFor(null);
        }
    };

    return (
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Professional Templates
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Choose from our collection of ATS-friendly templates.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-8 md:pt-12">
                {templates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="overflow-hidden">
                            <div className="aspect-[210/297] bg-muted relative">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    <span className="text-sm">Preview coming soon</span>
                                </div>
                                {/* <Image
                  src={template.image}
                  alt={template.name}
                  width={300}
                  height={424}
                  className="object-cover transition-all hover:scale-105"
                /> */}
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg">{template.name}</CardTitle>
                                    <Badge variant="secondary">{template.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{template.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    onClick={() => handleUseTemplate(template.id)}
                                    disabled={creatingFor === template.id}
                                >
                                    {creatingFor === template.id ? "Starting..." : "Use Template"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
