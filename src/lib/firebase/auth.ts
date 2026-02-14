import {
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User
} from "firebase/auth";
import { auth } from "./config";

export { auth } from "./config";

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        const code = (error as any)?.code as string | undefined;
        if (code === "auth/popup-blocked") {
            await signInWithRedirect(auth, googleProvider);
            return null;
        }
        if (code === "auth/popup-closed-by-user") {
            throw new Error("Sign-in popup was closed before completing. Please try again.");
        }
        throw error;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        throw error;
    }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
