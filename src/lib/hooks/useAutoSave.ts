import { useEffect, useRef } from "react";
import { useCVStore } from "@/lib/stores/cvStore";
// import { useDebounce } from "@/lib/hooks/useDebounce"; // Removed unused import

export const useAutoSave = (delay: number = 3000) => {
    const { cv, saveCV } = useCVStore();
    const firstRender = useRef(true);

    // We need to debounce the save call
    // Or simply use useEffect on 'cv' with a timeout cleanup

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (!cv) return;

        const handler = setTimeout(() => {
            console.log("Auto-saving...");
            saveCV();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [cv, delay, saveCV]); // Warning: recursive dependency if saveCV changes state that triggers effect.
    // Actually, saveCV updates 'isSaving' but not 'cv'. So it should be fine.
    // Ideally, use deep compare or check if 'data' changed specifically.
};
