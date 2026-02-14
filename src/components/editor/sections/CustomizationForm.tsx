"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Paintbrush, Type } from "lucide-react";

// Predefined color palettes
const COLORS = [
    { name: "Default", value: "#2563eb" }, // Blue-600
    { name: "Emerald", value: "#059669" }, // Emerald-600
    { name: "Purple", value: "#7c3aed" }, // Violet-600
    { name: "Rose", value: "#e11d48" }, // Rose-600
    { name: "Amber", value: "#d97706" }, // Amber-600
    { name: "Slate", value: "#475569" }, // Slate-600
];

// PDF-safe fonts (mapped to Standard Fonts or registered ones)
const FONTS = [
    { name: "Standard", value: "Helvetica" },
    { name: "Serif", value: "Times-Roman" },
    { name: "Mono", value: "Courier" },
];

export default function CustomizationForm() {
    const { cv, setCVTheme } = useCVStore();

    if (!cv) return null;

    const currentTheme = cv.theme || { color: "#2563eb", font: "Helvetica" };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label className="flex items-center gap-2">
                    <Paintbrush className="w-4 h-4" /> Accent Color
                </Label>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => setCVTheme({ color: color.value })}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${currentTheme.color === color.value
                                    ? "border-primary scale-110 ring-2 ring-offset-2 ring-primary"
                                    : "border-transparent hover:scale-105"
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                            aria-label={`Select ${color.name} color`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="flex items-center gap-2">
                    <Type className="w-4 h-4" /> Font Style
                </Label>
                <RadioGroup
                    value={currentTheme.font}
                    onValueChange={(val) => setCVTheme({ font: val })}
                    className="grid grid-cols-3 gap-2"
                >
                    {FONTS.map((font) => (
                        <div key={font.value}>
                            <RadioGroupItem value={font.value} id={`font-${font.value}`} className="peer sr-only" />
                            <Label
                                htmlFor={`font-${font.value}`}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center text-xs"
                            >
                                <span style={{ fontFamily: font.value === "Times-Roman" ? "Times New Roman" : font.value === "Courier" ? "Courier New" : "sans-serif" }} className="text-lg">Aa</span>
                                {font.name}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}
