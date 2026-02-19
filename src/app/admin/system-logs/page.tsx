"use client";

import { SystemLogConsole } from "@/components/admin/SystemLogConsole";

export default function SystemLogsPage() {
    return (
        <div className="flex flex-col h-full font-display">
            {/* Header */}
            <div className="flex justify-between items-end mb-6 shrink-0">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Logs</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time infrastructure monitoring and event logs.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Download CSV
                    </button>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">add</span>
                        New Alert Rule
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 gap-8 mb-6 shrink-0">
                <button className="pb-3 border-b-2 border-transparent text-slate-400 font-bold text-sm hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Global Deployment Logs</button>
                <button className="pb-3 border-b-2 border-primary text-primary font-bold text-sm flex items-center gap-2">
                    Server Infrastructure Logs
                    <span className="size-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                <button className="pb-3 border-b-2 border-transparent text-slate-400 font-bold text-sm hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Build System Logs</button>
            </div>

            <div className="flex flex-1 overflow-hidden gap-6 min-h-0">
                {/* Left Panel: Log Console */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden h-full">
                    {/* Filters Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 gap-2 cursor-pointer hover:border-primary transition-colors">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Severity:</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="size-2 rounded-full bg-red-500"></span>
                                    <span className="size-2 rounded-full bg-amber-500"></span>
                                    <span className="size-2 rounded-full bg-blue-500"></span>
                                    <span className="text-xs font-semibold text-slate-900 dark:text-white">All</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                            </div>
                            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 gap-2 cursor-pointer hover:border-primary transition-colors">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Node:</span>
                                <span className="text-xs font-semibold text-slate-900 dark:text-white">US-EAST-1 (Cluster-A)</span>
                                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Stream</span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <span className="material-symbols-outlined">settings_ethernet</span>
                            </button>
                        </div>
                    </div>

                    <SystemLogConsole />
                </div>

                {/* Right Sidebar: System Health */}
                <div className="w-80 flex-col gap-6 hidden xl:flex overflow-y-auto">
                    {/* Fleet Stats Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-5 shadow-sm shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wide">Fleet Health</h3>
                            <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                                <span className="size-1.5 bg-green-500 rounded-full"></span>
                                OPTIMAL
                            </span>
                        </div>
                        {/* Disk I/O */}
                        <div className="mb-5">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Disk I/O</p>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">420 MB/s</p>
                            </div>
                            <div className="h-10 w-full bg-slate-50 dark:bg-slate-800 rounded flex items-end gap-0.5 p-1">
                                {[40, 50, 30, 60, 45, 70, 65, 80, 90, 75, 85].map((h, i) => (
                                    <div key={i} className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i > 8 ? 'rgb(84 76 246 / 0.8)' : undefined }}></div>
                                ))}
                            </div>
                        </div>
                        {/* Latency */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Network Latency</p>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">12ms avg</p>
                            </div>
                            <div className="h-10 w-full bg-slate-50 dark:bg-slate-800 rounded flex items-end gap-0.5 p-1">
                                {[20, 25, 22, 24, 26, 22, 20, 23, 21, 19, 22].map((h, i) => (
                                    <div key={i} className="w-full bg-indigo-300 dark:bg-indigo-900/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Server Nodes List */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Nodes (4)</h3>
                            <button className="text-primary text-[10px] font-bold hover:underline">RESTART ALL</button>
                        </div>
                        {/* Node Items */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between group hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="size-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">US-EAST-01</p>
                                    <p className="text-[10px] text-slate-400">Up 14d 2h 11m</p>
                                </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-sm">settings</span>
                            </button>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/50 rounded-xl p-3 flex items-center justify-between group hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="size-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                                <div>
                                    <p className="text-sm font-bold text-amber-900 dark:text-amber-400">ASIA-NE-01</p>
                                    <p className="text-[10px] text-amber-600 dark:text-amber-500 font-medium">High Load: 92% CPU</p>
                                </div>
                            </div>
                            <button className="p-1.5 text-amber-400 hover:text-amber-600 transition-colors">
                                <span className="material-symbols-outlined text-sm">warning</span>
                            </button>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between group hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <div className="size-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">US-WEST-01</p>
                                    <p className="text-[10px] text-slate-400">Up 31d 4h 01m</p>
                                </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-sm">settings</span>
                            </button>
                        </div>
                    </div>

                    {/* Help Box */}
                    <div className="mt-auto bg-slate-900 rounded-xl p-5 text-white">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Shortcuts</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] text-slate-300">Clear Console</span>
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">⌘ K</kbd>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] text-slate-300">Pause Stream</span>
                                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">SPACE</kbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
