"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

interface EnvVar {
    key: string;
    value: string;
    isSecret: boolean;
}

export function EnvVarTable() {
    const [vars] = useState<EnvVar[]>([
        { key: "DATABASE_URL", value: "postgres://user:pass@db:5432/db", isSecret: true },
        { key: "STRIPE_API_KEY", value: "sk_test_51K...", isSecret: true },
        { key: "JWT_SECRET", value: "supersecretkey123", isSecret: true },
        { key: "REDIS_PORT", value: "6379", isSecret: false },
    ]);

    const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

    const toggleVisibility = (key: string) => {
        const newVisible = new Set(visibleKeys);
        if (newVisible.has(key)) {
            newVisible.delete(key);
        } else {
            newVisible.add(key);
        }
        setVisibleKeys(newVisible);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Key</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Value</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right w-24">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {vars.map((v) => (
                        <tr key={v.key} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm text-slate-900 dark:text-slate-200 font-medium">{v.key}</td>
                            <td className="px-6 py-4 font-mono text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <span className="tracking-widest">
                                    {v.isSecret && !visibleKeys.has(v.key) ? "••••••••••••••••••••" : v.value}
                                </span>
                                {v.isSecret && (
                                    <button onClick={() => toggleVisibility(v.key)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1">
                                        <span className="material-symbols-outlined text-lg">
                                            {visibleKeys.has(v.key) ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* Add Row Input */}
                    <tr className="bg-primary/5 dark:bg-primary/10">
                        <td className="px-6 py-4">
                            <input
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1.5 text-sm font-mono focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                placeholder="e.g. API_KEY"
                                type="text"
                            />
                        </td>
                        <td className="px-6 py-4">
                            <input
                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1.5 text-sm font-mono focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                placeholder="Value..."
                                type="text"
                            />
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button className="size-8 bg-primary text-white flex items-center justify-center rounded-lg shadow-sm hover:bg-primary/90 ml-auto transition-colors">
                                <span className="material-symbols-outlined text-lg">add</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
