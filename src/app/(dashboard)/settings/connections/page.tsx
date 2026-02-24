"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function GitHubConnectionsContent() {
    const searchParams = useSearchParams();
    const githubStatus = searchParams.get("github");
    const [status, setStatus] = useState<"success" | "error" | "loading">("loading");

    useEffect(() => {
        if (githubStatus === "success") {
            setStatus("success");
        } else if (githubStatus === "error") {
            setStatus("error");
        } else {
            setStatus("loading");
        }
    }, [githubStatus]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-background-dark min-h-[60vh]">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 text-center border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
                {status === "loading" && (
                    <div className="space-y-6">
                        <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center animate-pulse">
                            <span className="material-symbols-outlined text-4xl text-slate-400">sync</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Connecting GitHub...</h2>
                        <p className="text-slate-500">Please wait while we finalize your connection.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-6">
                        <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto flex items-center justify-center text-emerald-600">
                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Success!</h2>
                            <p className="text-slate-500 mt-2">Your GitHub account has been successfully linked to VPSphere.</p>
                        </div>
                        <div className="pt-4 flex flex-col gap-3">
                            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-lg shadow-primary/20">
                                <Link href="/services">
                                    Continue to Deploy
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full h-12">
                                <Link href="/settings">
                                    Back to Settings
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-6">
                        <div className="size-20 bg-red-100 dark:bg-red-900/30 rounded-full mx-auto flex items-center justify-center text-red-600">
                            <span className="material-symbols-outlined text-4xl">error</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Connection Failed</h2>
                            <p className="text-slate-500 mt-2">Something went wrong while linking your GitHub account. Please try again.</p>
                        </div>
                        <div className="pt-4 flex flex-col gap-3">
                            <Button asChild className="w-full h-12 font-bold shadow-lg shadow-primary/20">
                                <Link href="/services">
                                    Try Again
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" className="w-full h-12 text-slate-500 hover:text-slate-900">
                                <Link href="/support">
                                    Contact Support
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function GitHubConnectionsPage() {
    return (
        <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
            <GitHubConnectionsContent />
        </Suspense>
    );
}
