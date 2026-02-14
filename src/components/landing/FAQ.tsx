"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Is Expert CV really free?",
        answer: "Yes, we offer a free tier that allows you to create and download your CV using our basic templates. We also have a premium tier for advanced features.",
    },
    {
        question: "Are the templates ATS-friendly?",
        answer: "Absolutely. All our templates are designed with Applicant Tracking Systems in mind to ensure your resume gets read by robots and humans alike.",
    },
    {
        question: "Can I download my CV in different formats?",
        answer: "目前, we support PDF download as it's the industry standard. We plan to add Word and other formats in the future.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes, your data is stored securely using Google's Firebase infrastructure. We do not sell your personal information.",
    },
    {
        question: "Can I create multiple CVs?",
        answer: "Yes, you can create and manage multiple versions of your CV for different job applications from your dashboard.",
    },
];

export default function FAQ() {
    return (
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Frequently Asked Questions
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Got questions? We've got answers.
                </p>
            </div>
            <div className="mx-auto max-w-[58rem] pt-8 md:pt-12 w-full">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
