"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiKey {
    id: string;
    name: string;
    prefix: string;
    created_at: string;
    last_used_at: string | null;
    expires_at: string | null;
}

export default function DeveloperSettingsPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [newKeyName, setNewKeyName] = useState("");
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);

    useEffect(() => { fetchApiKeys(); }, []);

    const fetchApiKeys = async () => {
        try {
            const token = localStorage.getItem("vpsphere_token");
            const res = await fetch("https://api.devtushar.uk/auth/api-keys", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setApiKeys(data);
        } catch { toast.error("Failed to load API keys."); }
    };

    const generateApiKey = async () => {
        if (!newKeyName.trim()) return toast.error("Key name is required");
        try {
            const token = localStorage.getItem("vpsphere_token");
            const res = await fetch("https://api.devtushar.uk/auth/api-keys", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ name: newKeyName })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("API Key generated!");
                setApiKeys([data.key, ...apiKeys]);
                setGeneratedToken(data.plaintext_token);
                setNewKeyName("");
            } else {
                toast.error(data.error || "Failed to generate key");
            }
        } catch { toast.error("Network error"); }
    };

    const revokeApiKey = async (id: string) => {
        if (!confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) return;
        try {
            const token = localStorage.getItem("vpsphere_token");
            const res = await fetch(`https://api.devtushar.uk/auth/api-keys/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success("API Key revoked");
                setApiKeys(apiKeys.filter(k => k.id !== id));
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to revoke key");
            }
        } catch { toast.error("Network error"); }
    };

    const formatDate = (ds: string) => {
        const d = new Date(ds);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide pb-32">
                {/* Page Title */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">API Keys & Access Tokens</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                        Manage your credentials for programmatic access to the VPSphere ecosystem. Keep these keys secure and never share them in public repositories.
                    </p>
                </div>

                {/* Info Alert */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4 items-start">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <div>
                        <h4 className="text-sm font-bold text-primary">Security Recommendation</h4>
                        <p className="text-sm text-primary/80 dark:text-slate-400 mt-1">We recommend using Personal Access Tokens for short-lived sessions and CLI tools, while using API Keys for server-to-server integrations.</p>
                    </div>
                </div>

                {/* Section 1: Personal Access Tokens */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Programmatic API Keys</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tokens for identifying you to the VPSphere CLI and custom integrations.</p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Input
                                placeholder="Key Designation (e.g. GitHub Actions)"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                className="max-w-[200px]"
                            />
                            <Button className="flex items-center gap-2" onClick={generateApiKey}>
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Generate Key
                            </Button>
                        </div>
                    </div>

                    {generatedToken && (
                        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-800">
                            <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-2">Save your new API Key!</h4>
                            <p className="text-xs text-emerald-600 dark:text-emerald-500 mb-3">
                                Make sure to copy your personal access token now. You won&apos;t be able to see it again!
                            </p>
                            <div className="flex items-center gap-2">
                                <code className="px-4 py-2 bg-white dark:bg-slate-950 border border-emerald-200 dark:border-emerald-800 rounded-lg text-sm font-mono text-emerald-700 dark:text-emerald-400 select-all flex-1 text-center font-bold tracking-wider">
                                    {generatedToken}
                                </code>
                                <Button variant="secondary" onClick={() => { navigator.clipboard.writeText(generatedToken); toast.success("Copied to clipboard!"); }}>
                                    <span className="material-symbols-outlined text-sm mr-2">content_copy</span>
                                    Copy
                                </Button>
                                <Button variant="ghost" onClick={() => setGeneratedToken(null)}>Close</Button>
                            </div>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <tr className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider">
                                    <th className="px-6 py-4">Token Name</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4">Last Used</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {apiKeys.length === 0 ? (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">No API Keys generated yet.</td></tr>
                                ) : apiKeys.map((key) => (
                                    <tr key={key.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">{key.name}</p>
                                            <p className="text-xs font-mono text-slate-500 tracking-widest">{key.prefix}••••••••••••••••••••</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{formatDate(key.created_at)}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{key.last_used_at ? formatDate(key.last_used_at) : 'Never'}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded uppercase tracking-wide">Active</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => revokeApiKey(key.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2" title="Revoke Key">
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
