"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 lg:py-32">
            <div className="flex max-w-[980px] flex-col items-start gap-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl"
                >
                    Create Your Professional CV <br className="hidden sm:inline" />
                    in Minutes
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-[700px] text-lg text-muted-foreground sm:text-xl"
                >
                    Free resume builder with professional templates. No design skills needed.
                    Join 10,000+ professionals who land their dream jobs.
                </motion.p>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-4"
            >
                <Link href="/signup">
                    <Button size="lg">Start Building Free</Button>
                </Link>
                <Link href="/templates">
                    <Button variant="outline" size="lg">
                        View Templates
                    </Button>
                </Link>
            </motion.div>
        </section>
    );
}
