"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function SkillsForm() {
    const { cv, updateData } = useCVStore();
    const [newSkill, setNewSkill] = useState("");

    if (!cv) return null;

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        // Check duplicate
        if (cv.data.skills.technical.includes(newSkill.trim())) {
            setNewSkill("");
            return;
        }

        const newSkills = [...cv.data.skills.technical, newSkill.trim()];
        updateData("skills", { ...cv.data.skills, technical: newSkills });
        setNewSkill("");
    };

    const handleRemove = (skillToRemove: string) => {
        const newSkills = cv.data.skills.technical.filter(s => s !== skillToRemove);
        updateData("skills", { ...cv.data.skills, technical: newSkills });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Add Technical Skills</Label>
                    <form onSubmit={handleAdd} className="flex gap-2">
                        <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="e.g. React, Node.js"
                        />
                        <Button type="submit" variant="secondary">Add</Button>
                    </form>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[50px] p-4 border rounded-md bg-slate-50 dark:bg-slate-900/50">
                    {cv.data.skills.technical.length === 0 && (
                        <p className="text-sm text-muted-foreground">No skills added yet.</p>
                    )}
                    {cv.data.skills.technical.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm flex gap-2 items-center">
                            {skill}
                            <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={() => handleRemove(skill)}
                            />
                        </Badge>
                    ))}
                </div>
            </div>
            {/* Add Soft skills and Languages similarly if needed */}
        </div>
    );
}
