"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_KEYS = [
    { id: 1, name: "MacBook Pro - Home", fingerprint: "SHA256:5g4h...3d9k", added: "2 days ago", lastUsed: "10 mins ago" },
    { id: 2, name: "Windows Desktop", fingerprint: "SHA256:9j2k...1s5a", added: "1 month ago", lastUsed: "2 weeks ago" },
];

export default function SSHKeysPage() {
    const [keys, setKeys] = useState(MOCK_KEYS);
    const [isAdding, setIsAdding] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemKey, setNewItemKey] = useState("");

    const handleAdd = () => {
        if (!newItemName || !newItemKey) return;
        setKeys([...keys, {
            id: Date.now(),
            name: newItemName,
            fingerprint: "SHA256:mock...new", // Mock fingerprint generation
            added: "Just now",
            lastUsed: "Never"
        }]);
        setIsAdding(false);
        setNewItemName("");
        setNewItemKey("");
    };

    const handleDelete = (id: number) => {
        if (confirm("Revoke this SSH key? This will prevent access from the associated device.")) {
            setKeys(keys.filter(k => k.id !== id));
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SSH Keys</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage SSH keys for accessing your VPS instances securely.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add New Key
                </button>
            </div>

            {/* Add Key Form (Expandable) */}
            <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isAdding ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add SSH Key</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Key Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Work Laptop"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Public Key</label>
                            <textarea
                                placeholder="ssh-rsa AAAAB3Nza..."
                                value={newItemKey}
                                onChange={(e) => setNewItemKey(e.target.value)}
                                className="w-full px-4 py-3 h-24 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 text-slate-600 dark:text-slate-400 font-bold text-sm hover:underline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdd}
                                className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                            >
                                Add Key
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keys List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                {keys.map((key) => (
                    <div key={key.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-2xl">key</span>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {key.name}
                                </h3>
                                <p className="text-xs font-mono text-slate-500 break-all">{key.fingerprint}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                    <span>Added {key.added}</span>
                                    <span>•</span>
                                    <span>Last used {key.lastUsed}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(key.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Revoke Key"
                        >
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                ))}
                {keys.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">vpn_key_off</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No SSH Keys Found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Add an SSH key to enable secure passwordless access to your servers.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
