"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [displayName, setDisplayName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        if (user?.displayName) {
            setDisplayName(user.displayName);
        }
    }, [user, loading, router]);

    const onSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
            await updateProfile(auth.currentUser, { displayName });
            setSuccess("Profile updated");
        } catch (e: any) {
            setError(e?.message ?? "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-xl">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ProfilePictureUpload />
                    <div className="text-sm text-muted-foreground">
                        <div className="mt-1">{user.email}</div>
                        <div className="mt-1">UID: {user.uid}</div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display name</Label>
                        <Input
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {success && <p className="text-sm text-emerald-600">{success}</p>}
                </CardContent>
                <CardFooter>
                    <Button onClick={onSave} disabled={saving}>
                        {saving ? "Saving..." : "Save changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
