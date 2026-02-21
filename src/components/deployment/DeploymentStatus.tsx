"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "@/components/services/Terminal";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import confetti from "canvas-confetti";

import { io } from "socket.io-client";

type DeploymentState = "pending" | "cloning" | "building" | "deploying" | "running" | "failed";

interface DeploymentStatusProps {
    startState?: DeploymentState;
    serviceId: string;
}

// const MOCK_LOGS = [
//     "[INFO] Initializing deployment pipeline...",
//     "[INFO] Allocating resources...",
//     "[INFO] Pulling source code from git...",
//     "[INFO] Building Docker image...",
//     "[INFO] Installing dependencies...",
//     "[INFO] Build successful. Pushing to registry...",
//     "[INFO] Deploying container...",
//     "[INFO] Verifying health checks...",
//     "[SUCCESS] Service is live!",
// ];

export function DeploymentStatus({ startState = "pending", serviceId }: DeploymentStatusProps) {
    const [state, setState] = useState<DeploymentState>(startState);
    const [logs, setLogs] = useState<string[]>(["[INFO] Waiting to connect to deployment stream..."]);

    // Determine numerical step for the UI progress bar mapped to PostgreSQL ENUM
    const getStepFromStatus = (status: DeploymentState) => {
        switch (status) {
            case "pending": return 1;
            case "cloning": return 2;
            case "building": return 3;
            case "deploying": return 4;
            case "running": return 5;
            case "failed": return 5;
            default: return 1;
        }
    };

    const currentStep = getStepFromStatus(state);

    useEffect(() => {
        if (!serviceId || serviceId === "unknown-service") return;

        const socket = io("https://api.devtushar.uk", {
            withCredentials: true,
            reconnectionAttempts: 5
        });

        socket.on("connect", () => {
            setLogs(prev => [...prev, "[INFO] Live connection established."]);
            socket.emit("subscribeToProject", serviceId);
        });

        socket.on("deploymentUpdate", (data: { status: DeploymentState, logs?: string }) => {
            setState(data.status);
            if (data.logs) {
                // Split multi-line DB logs into individual terminal lines
                const newLines = data.logs.split('\n');
                setLogs(prev => [...prev, ...newLines]);
            }

            if (data.status === "running") {
                triggerConfetti();
            }
        });

        socket.on("connect_error", (err) => {
            console.error("Socket error", err);
            setLogs(prev => [...prev, `[ERROR] Connection failed: ${err.message}`]);
        });

        return () => {
            socket.disconnect();
        };
    }, [serviceId]);

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleRetry = () => {
        setState("pending");
        setLogs(["[INFO] Requesting manual retry..."]);
        // Ideally this hits a POST /deploy/retry endpoint next
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header / Stepper */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {state === "pending" && "Queued for Deployment..."}
                            {(state === "cloning" || state === "building" || state === "deploying") && "Deploying Service..."}
                            {state === "running" && "Deployment Successful!"}
                            {state === "failed" && "Deployment Failed"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Project ID: {serviceId}
                        </p>
                    </div>
                    {state === "running" && (
                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                            <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            Live
                        </span>
                    )}
                    {state === "failed" && (
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-bold border border-red-200 dark:border-red-800 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">error</span>
                            Failed
                        </span>
                    )}
                </div>

                {/* Progress Stepper */}
                <div className="relative flex justify-between">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 rounded-full -z-10"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary transition-all duration-500 -translate-y-1/2 rounded-full -z-10"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                    ></div>

                    {[{ id: 1, label: "Queued" }, { id: 2, label: "Provisioning" }, { id: 3, label: "Building" }, { id: 4, label: "Deploying" }, { id: 5, label: "Health Check" }].map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-2">
                            <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${currentStep > step.id ? "bg-primary border-primary text-white" :
                                currentStep === step.id ? "bg-white dark:bg-slate-900 border-primary text-primary" :
                                    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400"
                                }`}>
                                {currentStep > step.id ? (
                                    <span className="material-symbols-outlined text-sm">check</span>
                                ) : (
                                    step.id
                                )}
                            </div>
                            <span className={`text-xs font-medium transition-colors ${currentStep >= step.id ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"
                                }`}>{step.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Terminal logs={logs} />
                </div>

                {/* Right Column: Status & Actions */}
                <div className="space-y-6">
                    {/* Active State Card */}
                    <AnimatePresence mode="wait">
                        {(state === "pending" || state === "cloning" || state === "building" || state === "deploying") && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined animate-spin">sync</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white capitalize text-lg">{state}...</h3>
                                        <p className="text-xs text-slate-500">Processing in background</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    We are currently acquiring resources and building your Docker image via GitHub.
                                </p>
                                <Button disabled className="w-full" variant="outline">Back to Dashboard</Button>
                            </motion.div>
                        )}

                        {state === "running" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900/50 shadow-sm relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="material-symbols-outlined text-8xl text-emerald-500">rocket_launch</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Service is Live! 🚀</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    Your service has been successfully deployed and is reachable worldwide.
                                </p>

                                <div className="space-y-3">
                                    <a href={`https://${serviceId}.vpsphere.app`} target="_blank" rel="noopener noreferrer"
                                        className="block p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all group">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public URL</span>
                                            <span className="material-symbols-outlined text-slate-400 text-sm group-hover:text-primary">open_in_new</span>
                                        </div>
                                        <div className="text-primary font-mono text-sm truncate">
                                            https://{serviceId}.vpsphere.app
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        SSL Certificate Active
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                    <Link href={ROUTES.DASHBOARD} className="flex-1">
                                        <Button className="w-full" variant="outline">Dashboard</Button>
                                    </Link>
                                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">Manage</Button>
                                </div>
                            </motion.div>
                        )}

                        {state === "failed" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-red-200 dark:border-red-900/50 shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Deployment Failed</h3>
                                        <p className="text-xs text-slate-500">Error code: 1</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    The build process failed during the <strong>Health Check</strong> phase. Please check the logs for details.
                                </p>
                                <Button onClick={handleRetry} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90">
                                    <span className="material-symbols-outlined mr-2 text-lg">replay</span>
                                    Retry Deployment
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Tips */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Deploy Tips</h4>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            <li className="flex gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                                Typical build time: 1-2 mins
                            </li>
                            <li className="flex gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm">history</span>
                                Logs are preserved for 7 days
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
