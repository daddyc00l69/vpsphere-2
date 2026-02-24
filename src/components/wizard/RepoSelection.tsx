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
    isPublicImport?: boolean;
}

interface RepoSelectionProps {
    onSelect: (repo: GitHubRepo) => void;
}

export function RepoSelection({ onSelect }: RepoSelectionProps) {
    const { logout } = useAuth();
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState<"github" | "public">("github");
    const [publicUrl, setPublicUrl] = useState("");
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        const checkStatusAndFetchRepos = async () => {
            // Cookie-based session; if the backend returns 401 we eject.

            try {
                // 1. Check if OAuth is connected
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.devtushar.uk";
                const statusRes = await fetch(`${apiUrl}/api/github/status`, { credentials: "include" });
                const statusData = await statusRes.json();

                setIsConnected(statusData.connected);

                // 2. If connected, fetch real repos
                if (statusData.connected) {
                    const reposRes = await fetch(`${apiUrl}/api/github/repos`, { credentials: "include" });

                    if (reposRes.ok) {
                        const reposData = await reposRes.json();
                        setRepos(reposData);
                    }
                }
            } catch (error) {
                console.error("Failed to load GitHub status", error);
                logout();
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

    const handlePublicSubmit = () => {
        if (!publicUrl.trim()) return;
        // Parse name from URL
        let name = "public-project";
        try {
            const url = new URL(publicUrl);
            const pathParts = url.pathname.split('/').filter(Boolean);
            if (pathParts.length > 0) {
                name = pathParts[pathParts.length - 1].replace('.git', '');
            }
        } catch (e) {
            // fallback name
        }

        const syntheticRepo: GitHubRepo = {
            id: Math.floor(Math.random() * 1000000),
            name: name,
            full_name: name,
            private: false,
            language: "Unknown",
            clone_url: publicUrl,
            default_branch: "main",
            updated_at: new Date().toISOString(),
            isPublicImport: true
        };
        onSelect(syntheticRepo);
    };

    const handleConnectGithub = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.devtushar.uk";
        const res = await fetch(`${apiUrl}/api/github/connect`, { credentials: "include" });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url; // Dive into GitHub OAuth
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Import Git Repository</h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <button
                        onClick={() => setTab("github")}
                        className={cn("px-4 py-2 text-sm font-bold rounded-full transition-all",
                            tab === "github" ? "bg-vpsPurple text-white shadow-md shadow-vpsPurple/20" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        GitHub Apps
                    </button>
                    <button
                        onClick={() => setTab("public")}
                        className={cn("px-4 py-2 text-sm font-bold rounded-full transition-all",
                            tab === "public" ? "bg-vpsPurple text-white shadow-md shadow-vpsPurple/20" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        Public Repository
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="p-8 text-center text-slate-500">Loading GitHub connections...</div>
            ) : tab === "github" && !isConnected ? (
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
            ) : tab === "public" ? (
                <div className="max-w-xl mx-auto space-y-4 py-8">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl flex gap-3 text-sm text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined">info</span>
                        <p>Paste any public Git URL from GitHub, GitLab, or Bitbucket to deploy it immediately without connecting an account.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 dark:text-white ml-1">Git Repository URL</label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="https://github.com/username/repo.git"
                                className="bg-white dark:bg-slate-900 h-11"
                                value={publicUrl}
                                onChange={(e) => setPublicUrl(e.target.value)}
                            />
                            <Button onClick={handlePublicSubmit} className="h-11 px-6 font-bold bg-vpsPurple hover:bg-vpsPurple/90">
                                Import
                            </Button>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">Supported: HTTPS urls only</p>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}
