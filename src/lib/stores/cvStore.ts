 "use client";
 
 import { create } from "zustand";
 import { CV, CVData, Experience, Education } from "@/types/cv";
 import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
 import { db } from "@/lib/firebase/config";

interface CVStore {
    cv: CV | null;
    isLoading: boolean;
    isSaving: boolean;
    lastSaved: Date | null;

    setCV: (cv: CV) => void;
    setCVTheme: (theme: Partial<CV["theme"]>) => void;
    updateData: (section: keyof CVData, data: any) => void;
    updatePersonalInfo: (data: Partial<CVData["personalInfo"]>) => void;
    addExperience: (experience: Experience) => void;
    updateExperience: (id: string, data: Partial<Experience>) => void;
    reorderExperience: (startIndex: number, endIndex: number) => void;
    removeExperience: (id: string) => void;

    addEducation: (education: Education) => void;
    updateEducation: (id: string, data: Partial<Education>) => void;
    reorderEducation: (startIndex: number, endIndex: number) => void;
    removeEducation: (id: string) => void;

    saveCV: () => Promise<void>;
}

export const useCVStore = create<CVStore>((set, get) => ({
    cv: null,
    isLoading: true,
    isSaving: false,
    lastSaved: null,

    setCV: (cv) => set({ cv, isLoading: false }),

    setCVTheme: (theme) =>
        set((state) => {
            if (!state.cv) return state;
            const prevTheme = state.cv.theme ?? { color: "#2563eb", font: "Helvetica" };
            return {
                cv: {
                    ...state.cv,
                    theme: { ...prevTheme, ...theme }
                }
            };
        }),

    updateData: (section, data) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        [section]: data,
                    },
                },
            };
        }),

    updatePersonalInfo: (data) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        personalInfo: {
                            ...state.cv.data.personalInfo,
                            ...data,
                        },
                    },
                },
            };
        }),

    addExperience: (experience) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        experience: [...state.cv.data.experience, experience],
                    },
                },
            };
        }),

    updateExperience: (id, data) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        experience: state.cv.data.experience.map((exp) =>
                            exp.id === id ? { ...exp, ...data } : exp
                        ),
                    },
                },
            };
        }),

    reorderExperience: (startIndex, endIndex) =>
        set((state) => {
            if (!state.cv) return state;
            const result = Array.from(state.cv.data.experience);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return {
                cv: {
                    ...state.cv,
                    data: { ...state.cv.data, experience: result }
                }
            };
        }),

    removeExperience: (id) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        experience: state.cv.data.experience.filter((exp) => exp.id !== id),
                    },
                },
            };
        }),

    addEducation: (education) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: { ...state.cv.data, education: [...state.cv.data.education, education] }
                }
            };
        }),

    updateEducation: (id, data) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        education: state.cv.data.education.map((edu) =>
                            edu.id === id ? { ...edu, ...data } : edu
                        ),
                    },
                },
            };
        }),

    reorderEducation: (startIndex, endIndex) =>
        set((state) => {
            if (!state.cv) return state;
            const result = Array.from(state.cv.data.education);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return {
                cv: {
                    ...state.cv,
                    data: { ...state.cv.data, education: result }
                }
            };
        }),

    removeEducation: (id) =>
        set((state) => {
            if (!state.cv) return state;
            return {
                cv: {
                    ...state.cv,
                    data: {
                        ...state.cv.data,
                        education: state.cv.data.education.filter((edu) => edu.id !== id),
                    },
                },
            };
        }),


    saveCV: async () => {
        const { cv } = get();
        if (!cv) return;

        set({ isSaving: true });
        try {
            const cvRef = doc(db, "users", cv.userId, "cvs", cv.id);
            await updateDoc(cvRef, {
                data: cv.data,
                theme: cv.theme, // Save theme
                updatedAt: serverTimestamp(),
            });
            set({ isSaving: false, lastSaved: new Date() });
        } catch (error) {
            console.error("Error saving CV:", error);
            set({ isSaving: false });
        }
    },
}));
