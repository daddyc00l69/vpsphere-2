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
        <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Configure Project</h2>
                <p className="text-slate-500 dark:text-slate-400">Deploying <span className="font-mono font-bold text-slate-900 dark:text-white">{repoName}</span></p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 dark:text-white">Project Name</label>
                    <Input defaultValue={repoName || ""} className="font-mono" />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 dark:text-white">Framework Preset</label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {FRAMEWORKS.map((fw) => (
                            <button
                                key={fw.id}
                                onClick={() => setFramework(fw.id)}
                                className={cn(
                                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                                    framework === fw.id
                                        ? "border-vpsPurple bg-vpsPurple/5 ring-1 ring-vpsPurple text-vpsPurple font-bold"
                                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600"
                                )}
                            >
                                <span className="text-2xl">{fw.icon.startsWith("http") ? "🟢" : fw.icon}</span>
                                <span className="text-xs">{fw.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 dark:text-white">Build Command</label>
                        <Input defaultValue="npm run build" className="font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 dark:text-white">Start Command</label>
                        <Input defaultValue="npm start" className="font-mono text-xs" />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-slate-900 dark:text-white">Environment Variables</label>
                        <Button size="sm" variant="ghost" onClick={addEnvVar} className="h-6 text-xs text-vpsPurple hover:text-vpsPurple hover:bg-vpsPurple/10">+ Add</Button>
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

            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button onClick={onDeploy} className="bg-vpsPurple hover:bg-vpsPurple/90 text-white rounded-vps font-bold shadow-lg shadow-vpsPurple/20 min-w-[140px]">
                    Deploy
                </Button>
            </div>
        </div>
    );
}
