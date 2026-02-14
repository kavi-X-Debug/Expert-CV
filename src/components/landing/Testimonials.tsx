"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Marketing Manager",
        content: "I landed my dream job within a week of using Expert CV. The templates are stunning and ATS-friendly!",
        avatar: "/avatars/sarah.jpg",
        initials: "SJ",
    },
    {
        name: "Michael Chen",
        role: "Software Engineer",
        content: "The best resume builder I've used. Simple, clean, and gets the job done. Highly recommended for devs.",
        avatar: "/avatars/michael.jpg",
        initials: "MC",
    },
    {
        name: "Emily Davis",
        role: "Graphic Designer",
        content: "As a designer, I'm picky about layouts. These templates are pixel-perfect and very customizable.",
        avatar: "/avatars/emily.jpg",
        initials: "ED",
    },
];

export default function Testimonials() {
    return (
        <section className="container py-8 md:py-12 lg:py-24 bg-slate-50 dark:bg-transparent">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Loved by Professionals
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    See what our users have to say about their success stories.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-8 md:pt-12">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="h-full">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Avatar>
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
