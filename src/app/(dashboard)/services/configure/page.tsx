"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RepoSelection, type GitHubRepo } from "@/components/wizard/RepoSelection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@vpsphere/api-client";

export default function ConfigureWebServicePage() {
    const router = useRouter();
    const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
    const [config, setConfig] = useState({
        name: "",
        region: "India / Mumbai (ap-south-1)",
        branch: "main",
        rootDirectory: "./",
        runtime: "Node.js (Detected)",
        buildCommand: "npm install && npm run build",
        startCommand: "npm start"
    });
    const [isDeploying, setIsDeploying] = useState(false);

    useEffect(() => {
        const storedRepo = localStorage.getItem('vpsphere_selected_repo');
        if (storedRepo) {
            try {
                const repo = JSON.parse(storedRepo);
                setSelectedRepo(repo);
                setConfig(prev => ({
                    ...prev,
                    name: repo.name,
                    branch: repo.default_branch || "main"
                }));
            } catch (e) {
                console.error("Failed to parse stored repo", e);
            }
        }
    }, []);

    const handleDeploy = async () => {
        if (!selectedRepo) {
            toast.error("Please select a repository first");
            return;
        }

        setIsDeploying(true);
        try {
            const response = await api.core.post("/deploy", {
                repoUrl: selectedRepo.clone_url,
                projectName: config.name,
                branch: config.branch,
                rootDirectory: config.rootDirectory,
                buildCommand: config.buildCommand,
                startCommand: config.startCommand,
                region: config.region
            });

            toast.success("Deployment initiated successfully!");
            router.push(`/deploy/${response.data.projectId}`);
        } catch (error) {
            console.error("Deployment failed", error);
            toast.error("Failed to start deployment. Please check your plan limits or configuration.");
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <main className="flex flex-col flex-1 max-w-[1280px] mx-auto w-full px-10 py-8 overflow-y-auto">
            {/* Breadcrumbs & Header */}
            <div className="mb-8">
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Link className="hover:text-primary transition-colors" href="/services">Deploy</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">Configure Web Service</span>
                </nav>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Configure New Web Service</h1>
                <p className="text-slate-500 mt-2">Connect your source code and define your runtime environment.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Column: Configuration Forms */}
                <div className="flex-1 space-y-10 pb-12">
                    {/* Step 1: Repository Selection */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-lg">source</span>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Connect a Repository</h2>
                            </div>
                            <Button variant="ghost" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1" onClick={() => router.push('/services')}>
                                <span className="material-symbols-outlined text-sm">add</span>
                                Link more repos
                            </Button>
                        </div>

                        {selectedRepo ? (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">data_object</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedRepo.full_name}</h4>
                                        <p className="text-xs text-slate-500">
                                            {selectedRepo.isPublicImport ? "Public Repository" : "Connected via GitHub"}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRepo(null)}>Change</Button>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                                <RepoSelection onSelect={(repo) => {
                                    setSelectedRepo(repo);
                                    setConfig(prev => ({ ...prev, name: repo.name, branch: repo.default_branch || "main" }));
                                }} />
                            </div>
                        )}
                    </section>

                    {/* Step 2: Build & Deploy Settings */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-lg">settings</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Build &amp; Deploy Settings</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                                <Input
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary focus:ring-primary"
                                    type="text"
                                    value={config.name}
                                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                                />
                                <p className="text-xs text-slate-500">A unique name for your service.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Region</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary focus:ring-primary pr-10 h-10 px-3"
                                        value={config.region}
                                        onChange={(e) => setConfig({ ...config, region: e.target.value })}
                                    >
                                        <option>India / Mumbai (ap-south-1)</option>
                                        <option>US / East (us-east-1)</option>
                                        <option>EU / Frankfurt (eu-central-1)</option>
                                        <option>Singapore (ap-southeast-1)</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Branch</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:border-primary focus:ring-primary pr-10 h-10 px-3"
                                        value={config.branch}
                                        onChange={(e) => setConfig({ ...config, branch: e.target.value })}
                                    >
                                        <option value={config.branch}>{config.branch}</option>
                                        <option value="main">main</option>
                                        <option value="master">master</option>
                                        <option value="development">development</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Root Directory</label>
                                <Input
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono focus:border-primary focus:ring-primary"
                                    type="text"
                                    value={config.rootDirectory}
                                    placeholder="./"
                                    onChange={(e) => setConfig({ ...config, rootDirectory: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-500 italic">Optional subdirectory (e.g. ./apps/web)</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Runtime</label>
                                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-400 h-10">
                                    <span className="material-symbols-outlined text-sm">javascript</span>
                                    {config.runtime}
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Build Command</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-xs">$</span>
                                    <Input
                                        className="w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono focus:border-primary focus:ring-primary"
                                        type="text"
                                        value={config.buildCommand}
                                        onChange={(e) => setConfig({ ...config, buildCommand: e.target.value })}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 italic">Command executed during the build process to prepare your application.</p>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Command</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-xs">$</span>
                                    <Input
                                        className="w-full pl-7 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono focus:border-primary focus:ring-primary"
                                        type="text"
                                        value={config.startCommand}
                                        onChange={(e) => setConfig({ ...config, startCommand: e.target.value })}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 italic">Command executed to start your web service in production.</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar Plan Summary */}
                <aside className="w-full lg:w-96">
                    <div className="sticky top-24 space-y-6">
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
                                        className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-2"
                                        onClick={handleDeploy}
                                        disabled={isDeploying}
                                    >
                                        <span className="material-symbols-outlined">{isDeploying ? "sync" : "rocket_launch"}</span>
                                        {isDeploying ? "Deploying..." : "Deploy Service"}
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
                    </div>
                </aside>
            </div>
        </main>
    );
}
