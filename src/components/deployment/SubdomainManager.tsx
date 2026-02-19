"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface SubdomainManagerProps {
    initialSubdomain: string;
}

export function SubdomainManager({ initialSubdomain }: SubdomainManagerProps) {
    const [subdomain, setSubdomain] = useState(initialSubdomain);
    const [isPublic, setIsPublic] = useState(true);
    const [password, setPassword] = useState("");
    const [saved, setSaved] = useState(true);

    const handleSave = () => {
        // Simulate save
        setSaved(true);
        // Toast notification would go here
    };

    return (
        <Card className="max-w-4xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">public</span>
                    Domain & Access
                </CardTitle>
                <CardDescription>
                    Manage your application&apos;s public address and visibility settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Subdomain Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Primary Subdomain
                    </label>
                    <p className="text-xs text-slate-500 mb-2">
                        Ensure your subdomain is unique. Public access settings can be changed later in the service&apos;s dashboard.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Input
                                value={subdomain}
                                onChange={(e) => { setSubdomain(e.target.value); setSaved(false); }}
                                className="pr-32 font-mono text-sm"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none pointer-events-none">
                                .vpsphere.app
                            </div>
                        </div>
                        <Button
                            disabled={saved}
                            onClick={handleSave}
                            variant="default" // Changed from outline to default to ensure it's visible if using Shadcn
                            className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                        >
                            {saved ? "Saved" : "Save Changes"}
                        </Button>
                    </div>
                    <p className="text-xs text-slate-500">
                        Your app is accessible at <a href={`https://${subdomain}.vpsphere.app`} className="text-primary hover:underline">https://{subdomain}.vpsphere.app</a>
                    </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 my-4"></div>

                {/* Access Control */}
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-medium text-slate-900 dark:text-white mb-1">Public Access</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg">
                            When enabled, anyone with the link can access your application. Disable to restrict access or require a password.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${isPublic ? "text-emerald-500" : "text-slate-400"}`}>
                            {isPublic ? "Enabled" : "Disabled"}
                        </span>
                        <button
                            onClick={() => { setIsPublic(!isPublic); setSaved(false); }}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${isPublic ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}
                        >
                            <div className={`size-4 bg-white rounded-full shadow-sm transition-transform ${isPublic ? "translate-x-6" : "translate-x-0"}`}></div>
                        </button>
                    </div>
                </div>

                {/* Password Protection (Conditional) */}
                {!isPublic && (
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 animate-fade-in-down">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium text-sm">
                            <span className="material-symbols-outlined text-base">lock</span>
                            Password Protection
                        </div>
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder="Set access password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white dark:bg-slate-950"
                            />
                            <Button>Set Password</Button>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 py-4 flex justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="material-symbols-outlined text-sm">security</span>
                    SSL is automatically managed for all subdomains.
                </div>
                <Button variant="ghost" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                    Advanced Settings
                </Button>
            </CardFooter>
        </Card>
    );
}
