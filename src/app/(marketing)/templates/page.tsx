import { Metadata } from "next";
import TemplateShowcase from "@/components/landing/TemplateShowcase";

export const metadata: Metadata = {
    title: "Resume Templates | Expert CV",
    description: "Choose from our collection of professional resume templates.",
};

export default function TemplatesPage() {
    return (
        <div className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
                <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Resume Templates
                </h1>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Browse our collection of professionally designed templates.
                    Pick one and start building your CV in minutes.
                </p>
            </div>
            <TemplateShowcase />
        </div>
    );
}
