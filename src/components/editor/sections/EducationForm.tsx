"use client";

import { useCVStore } from "@/lib/stores/cvStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "@/types/cv";
import { v4 as uuidv4 } from 'uuid';
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

export default function EducationForm() {
    const { cv, addEducation, updateEducation, removeEducation, reorderEducation } = useCVStore();

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
            const oldIndex = cv.data.education.findIndex((item) => item.id === active.id);
            const newIndex = cv.data.education.findIndex((item) => item.id === over.id);
            reorderEducation(oldIndex, newIndex);
        }
    };

    const handleAdd = () => {
        const newEdu: Education = {
            id: uuidv4(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            gpa: "",
            achievements: "",
        };
        addEducation(newEdu);
    };

    const handleRemove = (id: string) => {
        removeEducation(id);
    };

    const handleUpdate = (id: string, field: keyof Education, value: string) => {
        updateEducation(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={cv.data.education.map(edu => edu.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {cv.data.education.map((edu, index) => (
                        <SortableItem key={edu.id} id={edu.id}>
                            <Card>
                                <CardContent className="pt-6 space-y-4 relative">
                                    <div className="absolute top-2 right-2 z-20">
                                        <Button variant="ghost" size="icon" onClick={() => handleRemove(edu.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Institution</Label>
                                        <Input
                                            value={edu.institution}
                                            onChange={(e) => handleUpdate(edu.id, "institution", e.target.value)}
                                            placeholder="University Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Degree</Label>
                                            <Input
                                                value={edu.degree}
                                                onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)}
                                                placeholder="Bachelor's"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Field of Study</Label>
                                            <Input
                                                value={edu.field}
                                                onChange={(e) => handleUpdate(edu.id, "field", e.target.value)}
                                                placeholder="Computer Science"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input
                                                value={edu.startDate}
                                                onChange={(e) => handleUpdate(edu.id, "startDate", e.target.value)}
                                                placeholder="YYYY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input
                                                value={edu.endDate}
                                                onChange={(e) => handleUpdate(edu.id, "endDate", e.target.value)}
                                                placeholder="YYYY"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
            <Button onClick={handleAdd} className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
        </div>
    );
}
