"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { CV } from "@/types/cv";

export const useCVs = () => {
    const { user } = useAuth();
    const [cvs, setCvs] = useState<CV[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "users", user.uid, "cvs"),
            orderBy("updatedAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const cvData: CV[] = [];
                snapshot.forEach((doc) => {
                    cvData.push({ id: doc.id, ...doc.data() } as CV);
                });
                setCvs(cvData);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching CVs:", err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return { cvs, loading, error };
};
