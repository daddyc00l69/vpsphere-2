"use client";

import { useState } from "react";
// import { cn } from "@/lib/utils";

export default function ApiTokensPage() {
    const [showNewTokenModal, setShowNewTokenModal] = useState(false);

    return (
        <div className="flex flex-col h-full font-display max-w-5xl mx-auto w-full">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">API & Access Tokens</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage personal access tokens and service account keys.</p>
                </div>
                <button
                    onClick={() => setShowNewTokenModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">key</span>
                    Generate New Token
                </button>
            </div>

            {/* Active Tokens Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm mb-8">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <h3 className="font-bold text-slate-900 dark:text-white">Active Personal Access Tokens</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Scope</th>
                                <th className="px-6 py-4">Last Used</th>
                                <th className="px-6 py-4">Expires</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {/* Token 1 */}
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <span className="material-symbols-outlined text-lg">terminal</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">CLI Workstation</p>
                                            <p className="text-xs text-slate-500 font-mono">vps_...8x92</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-400">Read/Write</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    Just now
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    Never
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-red-500 transition-colors" title="Revoke">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                            {/* Token 2 */}
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                            <span className="material-symbols-outlined text-lg">rocket_launch</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">CI/CD Pipeline</p>
                                            <p className="text-xs text-slate-500 font-mono">vps_...k2m1</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-bold text-slate-600 dark:text-slate-400">Deploy Only</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    2 days ago
                                </td>
                                <td className="px-6 py-4 text-sm text-amber-500 font-medium">
                                    In 5 days
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-red-500 transition-colors" title="Revoke">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Security Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="material-symbols-outlined text-9xl">shield</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Security Best Practices</h3>
                    <ul className="space-y-3 text-sm text-slate-300 relative z-10">
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check</span>
                            <span>Rotate your access tokens at least every 90 days to minimize risk.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check</span>
                            <span>Use scoped tokens for CI/CD pipelines instead of full access keys.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check</span>
                            <span>Delete unused tokens immediately.</span>
                        </li>
                    </ul>
                    <button className="mt-6 text-sm font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
                        Read Security Guide <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500">
                            <span className="material-symbols-outlined">history</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Token Access Log</h3>
                            <p className="text-xs text-slate-500">Recent API authentication events</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-300">CLI Workstation</span>
                            <span className="text-xs text-slate-400">10.0.0.42 • 2m ago</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-300">CI/CD Pipeline</span>
                            <span className="text-xs text-slate-400">AWS-East • 4h ago</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Terraform Provider</span>
                            <span className="text-xs text-slate-400">192.168.1.5 • 1d ago</span>
                        </div>
                    </div>
                    <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        View Full Audit Log
                    </button>
                </div>
            </div>

            {/* Modal Overlay (Hidden by default) */}
            {showNewTokenModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Create New Token</h3>
                            <button onClick={() => setShowNewTokenModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Token Name</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold" placeholder="e.g. Development Laptop" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Expiration</label>
                                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold text-slate-600 dark:text-slate-300">
                                    <option>30 Days</option>
                                    <option>60 Days</option>
                                    <option>90 Days</option>
                                    <option>No Expiration (Not Recommended)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Scopes</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer hover:border-primary/50 transition-colors">
                                        <input type="checkbox" className="w-4 h-4 accent-primary rounded" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Read Access</p>
                                            <p className="text-xs text-slate-500">View resources, metrics, and logs</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer hover:border-primary/50 transition-colors">
                                        <input type="checkbox" className="w-4 h-4 accent-primary rounded" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Write Access</p>
                                            <p className="text-xs text-slate-500">Create, update, and delete resources</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-3 justify-end">
                            <button onClick={() => setShowNewTokenModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                            <button className="px-5 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">Generate Token</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
