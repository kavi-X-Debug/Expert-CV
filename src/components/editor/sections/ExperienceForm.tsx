"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Experience } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/ui/sortable-item";

export default function ExperienceForm() {
    const { cv, addExperience, updateExperience, removeExperience, reorderExperience } = useCVStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    if (!cv) return null;

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = cv.data.experience.findIndex((item) => item.id === active.id);
            const newIndex = cv.data.experience.findIndex((item) => item.id === over.id);
            reorderExperience(oldIndex, newIndex);
        }
    };

    const handleAdd = () => {
        const newExp: Experience = {
            id: uuidv4(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        };
        addExperience(newExp);
    };

    const handleRemove = (id: string) => {
        removeExperience(id);
    };

    const handleUpdate = (id: string, field: keyof Experience, value: any) => {
        updateExperience(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={cv.data.experience.map(exp => exp.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {cv.data.experience.map((exp, index) => (
                        <SortableItem key={exp.id} id={exp.id}>
                            <Card>
                                <CardContent className="pt-6 space-y-4 relative">
                                    <div className="absolute top-2 right-2 z-20">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemove(exp.id)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Company</Label>
                                            <Input
                                                value={exp.company}
                                                onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
                                                placeholder="Company Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Position</Label>
                                            <Input
                                                value={exp.position}
                                                onChange={(e) => handleUpdate(exp.id, "position", e.target.value)}
                                                placeholder="Job Title"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input
                                                value={exp.startDate}
                                                onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)}
                                                placeholder="MM/YYYY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input
                                                value={exp.endDate}
                                                onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)}
                                                placeholder="MM/YYYY"
                                                disabled={exp.current}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`current-${exp.id}`}
                                            checked={exp.current}
                                            onCheckedChange={(checked) => handleUpdate(exp.id, "current", checked)}
                                        />
                                        <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            value={exp.location}
                                            onChange={(e) => handleUpdate(exp.id, "location", e.target.value)}
                                            placeholder="City, Country"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={exp.description}
                                            onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
                                            placeholder="Describe your responsibilities and achievements..."
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>

            <Button onClick={handleAdd} className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
        </div>
    );
}
