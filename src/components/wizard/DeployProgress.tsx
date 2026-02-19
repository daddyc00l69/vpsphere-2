"use client";

import { useEffect, useState } from "react";
import { Terminal } from "@/components/services/Terminal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

const BUILD_LOGS = [
    "[INFO] Cloning repository...",
    "[INFO] Repository cloned successfully.",
    "[INFO] Analyzing project structure...",
    "[INFO] Detected Node.js environment.",
    "[INFO] Installing dependencies (npm install)...",
    "[INFO] Added 842 packages in 4s.",
    "[INFO] Running build command (npm run build)...",
    "[INFO] Creating an optimized production build...",
    "[INFO] Compiled successfully.",
    "[INFO] Containerizing application...",
    "[INFO] Building Docker image...",
    "[INFO] Pushing image to registry...",
    "[INFO] Starting container...",
    "[SUCCESS] Deployment complete! Service is live.",
];

export function DeployProgress() {
    const [logs, setLogs] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                if (prev.length < BUILD_LOGS.length) {
                    return [...prev, BUILD_LOGS[prev.length]];
                } else {
                    clearInterval(interval);
                    setIsComplete(true);
                    return prev;
                }
            });
        }, 800); // Simulate build time

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {isComplete ? "Deployment Successful!" : "Deploying Service..."}
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                    {isComplete ? "Your service is now live and ready to use." : "Please wait while we build and deploy your application."}
                </p>
            </div>

            <Terminal logs={logs} />

            {isComplete && (
                <div className="flex justify-center animate-fade-in-up">
                    <Link href={ROUTES.DASHBOARD}>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-emerald-500/20 text-lg">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
