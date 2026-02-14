"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical, FileText, Edit, Trash, Copy } from "lucide-react";
import { type CV } from "@/types/cv";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/useAuth";
import { deleteCV, duplicateCV } from "@/lib/firebase/firestore";

interface CVCardProps {
    cv: CV;
}

export default function CVCard({ cv }: CVCardProps) {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!user) return;
        if (confirm("Are you sure you want to delete this CV?")) {
            await deleteCV(user.uid, cv.id);
        }
    };

    const handleDuplicate = async () => {
        if (!user) return;
        try {
            await duplicateCV(user.uid, cv);
        } catch (error) {
            console.error("Error duplicating:", error);
        }
    };

    return (
        <Card className="flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-primary/10 rounded-md">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-base line-clamp-1">{cv.title}</CardTitle>
                            <CardDescription className="text-xs">
                                Updated {formatDistanceToNow(cv.updatedAt.toDate(), { addSuffix: true })}
                            </CardDescription>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/editor/${cv.id}`} className="cursor-pointer w-full flex items-center">
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDuplicate}>
                                <Copy className="mr-2 h-4 w-4" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                {/* Thumbnail preview would go here */}
                <div className="aspect-[210/297] bg-muted/50 rounded-md border flex items-center justify-center text-muted-foreground text-xs">
                    Preview
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Button asChild className="w-full" variant="outline" size="sm">
                    <Link href={`/editor/${cv.id}`}>Edit Resume</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
