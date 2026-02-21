"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    language: string;
    clone_url: string;
    default_branch: string;
    updated_at: string;
}

interface RepoSelectionProps {
    onSelect: (repo: GitHubRepo) => void;
}

export function RepoSelection({ onSelect }: RepoSelectionProps) {
    const { logout } = useAuth();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);


    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkStatusAndFetchRepos = async () => {
            const token = localStorage.getItem('vpsphere_token');
            if (!token) return logout();

            try {
                // 1. Check if OAuth is connected
                const statusRes = await fetch("https://api.devtushar.uk/api/github/status", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const statusData = await statusRes.json();

                setIsConnected(statusData.connected);

                // 2. If connected, fetch real repos
                if (statusData.connected) {
                    const reposRes = await fetch("https://api.devtushar.uk/api/github/repos", {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (reposRes.ok) {
                        const reposData = await reposRes.json();
                        setRepos(reposData);
                    }
                }
            } catch (error) {
                console.error("Failed to load GitHub status", error);
            } finally {
                setLoading(false);
            }
        };

        checkStatusAndFetchRepos();
    }, [logout]);

    const filteredRepos = repos.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (repo: GitHubRepo) => {
        setSelected(repo.full_name);
        onSelect(repo);
    };

    const handleConnectGithub = async () => {
        const token = localStorage.getItem('vpsphere_token');
        if (!token) return;

        const res = await fetch("https://api.devtushar.uk/api/github/connect", {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url; // Dive into GitHub OAuth
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading GitHub connections...</div>;
    }

    if (!isConnected) {
        return (
            <div className="text-center py-12 space-y-6">
                <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-slate-400">code</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connect GitHub</h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto">Link your GitHub account to directly deploy public and private repositories automatically.</p>
                </div>
                <Button size="lg" onClick={handleConnectGithub} className="gap-2">
                    <span className="material-symbols-outlined text-sm">link</span>
                    Connect Account
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Import Git Repository</h2>
                <p className="text-slate-500 dark:text-slate-400">Select a repository to deploy to VPSphere.</p>
            </div>

            <div className="flex gap-4 mb-6">
                <Input
                    placeholder="Search your repositories..."
                    className="bg-white dark:bg-slate-900"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredRepos.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No repositories found.</div>
            ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                    {filteredRepos.map((repo) => (
                        <div
                            key={repo.full_name}
                            onClick={() => handleSelect(repo)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all",
                                selected === repo.full_name
                                    ? "border-vpsPurple bg-vpsPurple/5 ring-1 ring-vpsPurple shadow-md"
                                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                                    📦
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-vpsPurple transition-colors">
                                        {repo.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                        <span className={cn("size-2 rounded-full", repo.private ? "bg-amber-400" : "bg-emerald-400")}></span>
                                        {repo.private ? "Private" : "Public"} • {repo.language || "Unknown"}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant={selected === repo.full_name ? "default" : "outline"}
                                className={cn(
                                    "rounded-full px-6 transition-all",
                                    selected === repo.full_name ? "bg-vpsPurple hover:bg-vpsPurple/90 font-bold" : "hover:border-vpsPurple hover:text-vpsPurple"
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(repo);
                                }}
                            >
                                {selected === repo.full_name ? "Selected" : "Import"}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
