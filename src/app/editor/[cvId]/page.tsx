"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useCVStore } from "@/lib/stores/cvStore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { useAutoSave } from "@/lib/hooks/useAutoSave";
import { SidebarAndPreview } from "@/components/editor/SidebarAndPreview"; // Wrapper to avoid large file
import { Loader2 } from "lucide-react";

export default function EditorPage() {
    const { cvId } = useParams();
    const { user, loading: authLoading } = useAuth();
    const { setCV, isLoading } = useCVStore();
    const router = useRouter();

    useAutoSave();

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchCV = async () => {
            if (!cvId || typeof cvId !== "string") return;

            try {
                const docRef = doc(db, "users", user.uid, "cvs", cvId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCV({ id: docSnap.id, ...docSnap.data() } as any);
                } else {
                    console.error("No such CV!");
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Error fetching CV:", error);
            }
        };

        fetchCV();
    }, [cvId, user, authLoading, router, setCV]);

    if (authLoading || isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarAndPreview />
        </div>
    );
}
