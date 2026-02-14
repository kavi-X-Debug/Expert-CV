"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Choose a Template",
        description: "Select from our range of professional, creative, and modern templates.",
    },
    {
        number: "02",
        title: "Fill in Your Info",
        description: "Enter your details using our easy-to-use editor with real-time preview.",
    },
    {
        number: "03",
        title: "Download PDF",
        description: "Export your polished CV as a high-quality PDF ready for application.",
    },
];

export default function HowItWorks() {
    return (
        <section className="container py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-transparent">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    How It Works
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Create your perfect resume in 3 simple steps.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-8 sm:grid-cols-3 pt-8 md:pt-12">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col items-center text-center space-y-4"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                            {step.number}
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
