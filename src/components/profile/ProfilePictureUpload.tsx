"use client";

import { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePictureUpload() {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    if (!user) return null;

    const handleChoose = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError(null);
        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const fileRef = ref(storage, `users/${user.uid}/profile.jpg`);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { photoURL: url });
            }
        } catch (err: any) {
            setError(err?.message ?? "Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={preview || user.photoURL || ""} alt={user.email || ""} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <Label className="text-sm">Profile picture</Label>
                <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={handleChoose} disabled={uploading}>
                        {uploading ? "Uploading..." : "Choose Image"}
                    </Button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <p className="text-xs text-muted-foreground">JPG/PNG, recommended square crop ~ 256×256</p>
            </div>
        </div>
    );
}

