"use client";

import { Button } from "@/components/ui/button";

interface ServiceHeaderProps {
    id: string;
}

export function ServiceHeader({ id }: ServiceHeaderProps) {
    return (
        <div className="bg-surface-light border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-8 pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
                    <div className="flex items-start gap-5">
                        <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">terminal</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{id}</h1>
                                <span className="px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                                    <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-base">code</span>
                                    Node.js 18.x
                                </span>
                                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-base">stars</span>
                                    Pro Plan
                                </span>
                                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-base">public</span>
                                    US-East (Virginia)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                            View Live
                        </button>
                        <Button className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">rocket</span>
                            Manual Deploy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
