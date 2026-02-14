import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TemplateShowcase from "@/components/landing/TemplateShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-8 md:gap-12 pb-8">
            <Hero />
            <Features />
            <TemplateShowcase />
            <HowItWorks />
            <Testimonials />
            <FAQ />
        </div>
    );
}
