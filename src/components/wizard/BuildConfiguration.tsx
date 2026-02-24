"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BuildConfigurationProps {
    repoName: string | null;
    onBack: () => void;
    onDeploy: () => void;
}

const FRAMEWORKS = [
    { id: "node", name: "Node.js", icon: "http://img.icons8.com/color/48/nodejs.png" }, // Mock paths or emojis
    { id: "docker", name: "Docker", icon: "🐳" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "go", name: "Go", icon: "🐹" },
    { id: "static", name: "Static", icon: "📄" },
];

export function BuildConfiguration({ repoName, onBack, onDeploy }: BuildConfigurationProps) {
    const [framework, setFramework] = useState("node");
    const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);

    const addEnvVar = () => setEnvVars([...envVars, { key: "", value: "" }]);

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Configure New Web Service
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Deploying <span className="font-mono font-bold text-slate-900 dark:text-white">{repoName}</span>
                    </p>
                </div>
                <Button variant="ghost" onClick={onBack} className="gap-2">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,384px] gap-8">
                {/* Left: configuration */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-lg">settings</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">2. Build &amp; Deploy Settings</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                                <Input defaultValue={repoName || ""} className="font-mono" />
                                <p className="text-xs text-slate-500">A unique name for your service.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Runtime</label>
                                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-sm">javascript</span>
                                    {framework === "node" ? "Node.js (Selected)" : "Runtime preset"}
                                </div>
                                <p className="text-xs text-slate-500">Choose a preset to help VPSphere auto-detect defaults.</p>
                            </div>

                            <div className="space-y-3 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Framework Preset</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {FRAMEWORKS.map((fw) => (
                                        <button
                                            key={fw.id}
                                            type="button"
                                            onClick={() => setFramework(fw.id)}
                                            className={cn(
                                                "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                                                framework === fw.id
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary text-primary font-bold"
                                                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300"
                                            )}
                                        >
                                            <span className="text-2xl">{fw.icon.startsWith("http") ? "🟢" : fw.icon}</span>
                                            <span className="text-xs">{fw.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Build Command</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">$</span>
                                    <Input defaultValue="npm run build" className="pl-7 font-mono text-xs" />
                                </div>
                                <p className="text-xs text-slate-500 italic">Command executed during the build process to prepare your application.</p>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Command</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">$</span>
                                    <Input defaultValue="npm start" className="pl-7 font-mono text-xs" />
                                </div>
                                <p className="text-xs text-slate-500 italic">Command executed to start your web service in production.</p>
                            </div>

                            <div className="pt-2 md:col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Environment Variables</label>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={addEnvVar}
                                        className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10"
                                    >
                                        + Add
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {envVars.map((env, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input placeholder="KEY" className="font-mono text-xs" />
                                            <Input placeholder="VALUE" className="font-mono text-xs" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right: plan summary / deploy */}
                <aside className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                Plan Summary
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Selected Tier</p>
                                    <h4 className="text-3xl font-black text-primary mt-1">Free Tier</h4>
                                </div>
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Active</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                        <span className="material-symbols-outlined text-lg">memory</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 leading-none">Memory</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">512 MB RAM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                        <span className="material-symbols-outlined text-lg">computer</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 leading-none">Compute</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Shared CPU</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                        <span className="material-symbols-outlined text-lg">cloud_sync</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 leading-none">Bandwidth</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">100 GB / month</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between text-slate-900 dark:text-white mb-6">
                                    <span className="font-medium">Total Monthly Cost</span>
                                    <span className="text-xl font-black">$0.00</span>
                                </div>
                                <Button
                                    onClick={onDeploy}
                                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                    Deploy Service
                                </Button>
                                <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                                    By deploying, you agree to VPSphere&apos;s Terms of Service and Privacy Policy. Free tier resources are limited.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 flex gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            <strong>Tip:</strong> You can always upgrade to a dedicated plan later for more memory and 99.9% SLA.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
