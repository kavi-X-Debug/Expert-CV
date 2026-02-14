"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { createCV } from "@/lib/firebase/firestore";

export default function CreateCVButton() {
    const { user } = useAuth();
    const router = useRouter();
    const [creating, setCreating] = useState(false);

    const handleCreate = async () => {
        if (!user) return;
        setCreating(true);
        try {
            const cvId = await createCV(user.uid);
            router.push(`/editor/${cvId}`);
        } catch (error) {
            console.error("Error creating CV:", error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <Button onClick={handleCreate} disabled={creating}>
            <Plus className="mr-2 h-4 w-4" />
            {creating ? "Creating..." : "Create New CV"}
        </Button>
    );
}
