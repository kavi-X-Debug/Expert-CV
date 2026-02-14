"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCVStore } from "@/lib/stores/cvStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalInfoForm() {
    const { cv, updatePersonalInfo } = useCVStore();

    const { register, watch, reset } = useForm({
        defaultValues: cv?.data.personalInfo || {},
    });

    // Watch for changes and update store
    useEffect(() => {
        const subscription = watch((value) => {
            updatePersonalInfo(value as any);
        });
        return () => subscription.unsubscribe();
    }, [watch, updatePersonalInfo]);

    // Initial reset if cv changes
    useEffect(() => {
        if (cv?.data.personalInfo) {
            reset(cv.data.personalInfo);
        }
    }, [cv?.id, reset]); // Only reset on ID change to avoid loop

    if (!cv) return null;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" {...register("jobTitle")} placeholder="Software Engineer" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" {...register("email")} placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} placeholder="+1 234 567 890" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} placeholder="New York, NY" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" {...register("summary")} placeholder="Experienced software engineer..." className="min-h-[100px]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" {...register("linkedin")} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" {...register("website")} placeholder="johndoe.com" />
                </div>
            </div>
        </div>
    );
}
