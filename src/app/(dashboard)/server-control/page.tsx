"use client";

import { Terminal } from "@/components/server/Terminal";

export default function ServerControlPage() {
    return (
        <div className="flex flex-col h-full font-display">
            {/* Header moved to Layout or kept here if specific? 
            The general dashboard layout provides a header, but this page has a specific "Fleet Stable" indicator and "New Container" button.
            We'll implement a custom sub-header or just use the page content.
        */}

            <header className="h-16 border-b border-border-light bg-surface-light dark:bg-slate-900 px-8 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4 flex-1">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Server Control Panel</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                        Fleet Stable
                    </div>
                    <button className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-sm">add</span> New Container
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {/* Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total Containers</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">124</h3>
                            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">+12%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Fleet Health</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">99.8%</h3>
                            <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">-0.2%</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">CPU Utilization</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">42%</h3>
                            <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: "42%" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">RAM Availability</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">31.2 GB</h3>
                            <span className="text-xs font-bold text-slate-400">of 64GB</span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                        <div className="flex gap-2">
                            <h2 className="font-bold text-lg text-slate-900 dark:text-white">Active Containers</h2>
                            <input
                                className="ml-4 bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-400 outline-none w-64"
                                placeholder="Search containers..."
                                type="text"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                            </button>
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">refresh</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Service Name</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Resource Usage</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {/* Row 1 */}
                                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">8f2d1a3</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-slate-900 dark:text-white">auth-api-v2</span>
                                            <span className="text-xs text-slate-400">node:18-alpine</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">admin-root</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <span className="size-1.5 rounded-full bg-green-600 animate-pulse"></span> Running
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-8">CPU</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: "12%" }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">12%</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-8">MEM</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-400" style={{ width: "45%" }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">452MB</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">Restart</button>
                                            <button className="px-3 py-1.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Kill</button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">4c9b8e1</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-slate-900 dark:text-white">redis-cache-cluster</span>
                                            <span className="text-xs text-slate-400">redis:7-bullseye</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">system-user</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            <span className="size-1.5 rounded-full bg-green-600 animate-pulse"></span> Running
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-8">CPU</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: "5%" }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">5%</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-8">MEM</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-400" style={{ width: "82%" }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">1.2GB</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">Restart</button>
                                            <button className="px-3 py-1.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Kill</button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">a1b2c3d</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-slate-900 dark:text-white">worker-node-01</span>
                                            <span className="text-xs text-slate-400">python:3.10-slim</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">dev-ops-02</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                            <span className="size-1.5 rounded-full bg-amber-600"></span> Restarting
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-8">CPU</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: "95%" }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">95%</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-8">MEM</span>
                                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-400" style={{ width: "30%" }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">256MB</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">Restart</button>
                                            <button className="px-3 py-1.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Kill</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Terminal Component */}
                <Terminal />
            </div>
        </div>
    );
}
