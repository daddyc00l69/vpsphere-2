"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RepoSelectionProps {
    onSelect: (repo: string) => void;
}

const MOCK_REPOS = [
    { name: "vpsphere-api", language: "Typescript", updated: "2m ago", private: true },
    { name: "vpsphere-frontend", language: "Typescript", updated: "1h ago", private: true },
    { name: "postgres-db-config", language: "Dockerfile", updated: "3d ago", private: false },
    { name: "worker-service", language: "Python", updated: "5d ago", private: true },
    { name: "landing-page", language: "HTML", updated: "1w ago", private: false },
];

export function RepoSelection({ onSelect }: RepoSelectionProps) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filteredRepos = MOCK_REPOS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

    const handleSelect = (repoName: string) => {
        setSelected(repoName);
        onSelect(repoName);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Import Git Repository</h2>
                <p className="text-slate-500 dark:text-slate-400">Select a repository to deploy to VPSphere.</p>
            </div>

            <div className="flex gap-4 mb-6">
                <Input
                    placeholder="Search repositories..."
                    className="bg-white dark:bg-slate-900"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline" className="shrink-0 gap-2">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Add GitHub Account
                </Button>
            </div>

            <div className="space-y-3">
                {filteredRepos.map((repo) => (
                    <button
                        key={repo.name}
                        onClick={() => handleSelect(repo.name)}
                        className={cn(
                            "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all",
                            selected === repo.name
                                ? "border-vpsPurple bg-vpsPurple/5 ring-1 ring-vpsPurple shadow-md"
                                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl">
                                📦
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900 dark:text-white">{repo.name}</span>
                                    {repo.private && (
                                        <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">
                                            Private
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                    <span className="flex items-center gap-1">
                                        <span className="size-2 rounded-full bg-slate-400"></span>
                                        {repo.language}
                                    </span>
                                    <span>•</span>
                                    <span>Updated {repo.updated}</span>
                                </div>
                            </div>
                        </div>
                        <span className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                            selected === repo.name
                                ? "bg-vpsPurple text-white shadow-md shadow-vpsPurple/20"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        )}>
                            Import
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
