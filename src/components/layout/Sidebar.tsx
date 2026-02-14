"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Settings, User } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Overview
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/dashboard">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button
                            variant={pathname === "/cvs" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/dashboard">
                                <FileText className="mr-2 h-4 w-4" />
                                My CVs
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Settings
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant={pathname === "/profile" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/profile">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </Button>
                        <Button
                            variant={pathname === "/settings" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href="/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
