"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return null;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Basic account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={user.email ?? ""} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label>UID</Label>
                        <Input value={user.uid} disabled />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Personalize your experience</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    Coming soon.
                </CardContent>
            </Card>
        </div>
    );
}

