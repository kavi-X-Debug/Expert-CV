import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    getDoc,
    query,
    where,
    orderBy,
    getDocs
} from "firebase/firestore";
import { db } from "./config";
import { CV, CVData } from "@/types/cv";

const USERS_COLLECTION = "users";
const CVS_COLLECTION = "cvs";

// Create a new CV
export const createCV = async (userId: string, templateId: string = "modern") => {
    try {
        const cvData: Partial<CV> = {
            title: "Untitled Resume",
            templateId,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            data: {
                personalInfo: {
                    fullName: "",
                    jobTitle: "",
                    email: "",
                    phone: "",
                    location: "",
                    website: "",
                    linkedin: "",
                    github: "",
                    summary: "",
                    photoURL: null
                },
                experience: [],
                education: [],
                skills: { technical: [], soft: [], languages: [] },
            } as CVData
        };

        const docRef = await addDoc(collection(db, USERS_COLLECTION, userId, CVS_COLLECTION), cvData);
        return docRef.id;
    } catch (error) {
        console.error("Error creating CV:", error);
        throw error;
    }
};

// Get a single CV by ID
export const getCV = async (userId: string, cvId: string): Promise<CV | null> => {
    try {
        const docRef = doc(db, USERS_COLLECTION, userId, CVS_COLLECTION, cvId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as CV;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting CV:", error);
        throw error;
    }
};

// Update a CV
export const updateCV = async (userId: string, cvId: string, data: Partial<CV>) => {
    try {
        const cvRef = doc(db, USERS_COLLECTION, userId, CVS_COLLECTION, cvId);
        await updateDoc(cvRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating CV:", error);
        throw error;
    }
};

// Delete a CV
export const deleteCV = async (userId: string, cvId: string) => {
    try {
        await deleteDoc(doc(db, USERS_COLLECTION, userId, CVS_COLLECTION, cvId));
    } catch (error) {
        console.error("Error deleting CV:", error);
        throw error;
    }
};

// Duplicate a CV (Optional feature)
export const duplicateCV = async (userId: string, cv: CV) => {
    try {
        const { id, ...cvData } = cv; // Exclude ID
        const newCV = {
            ...cvData,
            title: `${cv.title} (Copy)`,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, USERS_COLLECTION, userId, CVS_COLLECTION), newCV);
        return docRef.id;
    } catch (error) {
        console.error("Error duplicating CV:", error);
        throw error;
    }
};
