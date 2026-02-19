"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RateLimitsPage() {
    const [globalLimit, setGlobalLimit] = useState(150);
    const [enabled, setEnabled] = useState(true);

    return (
        <div className="flex flex-col h-full font-display">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">API Rate Limit Settings</h1>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">Configure programmatic traffic thresholds for your VPS infrastructure.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    System Active
                </div>
            </div>

            {/* Monitoring Chart Section */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm mb-8 shrink-0">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-time Usage Monitoring</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Global API requests per minute (RPM) over the last 24 hours.</p>
                    </div>
                    <select className="rounded-lg border-slate-200 dark:border-slate-700 text-sm focus:border-primary focus:ring-primary bg-white dark:bg-slate-800 dark:text-slate-300 outline-none">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                    </select>
                </div>
                {/* Simulated Chart */}
                <div className="h-48 w-full flex items-end gap-1 px-2 overflow-hidden">
                    {[40, 60, 50, 80, 30, 120, 140, 70, 40, 55, 45, 75, 35, 110, 130, 65, 80, 95, 60, 40, 70, 90, 100, 85].map((h, i) => (
                        <div
                            key={i}
                            className={cn("w-full rounded-t-sm transition-all hover:bg-primary", i > 15 ? "bg-primary" : "bg-primary/20 dark:bg-primary/40")}
                            style={{ height: `${(h / 150) * 100}%` }}
                            title={`${h} RPM`}
                        ></div>
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-primary"></div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Current Volume</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-0.5 w-6 border-t-2 border-dashed border-red-400"></div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Threshold (150 RPM)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8 shrink-0">
                {/* Global Limits Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">public</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Global Rate Limits</h3>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input checked={enabled} onChange={() => setEnabled(!enabled)} className="peer sr-only" type="checkbox" />
                            <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Apply a master limit across all API endpoints globally. Individual endpoint overrides will take precedence.</p>
                    <div className={cn("space-y-6 transition-opacity", !enabled && "opacity-50 pointer-events-none")}>
                        <div>
                            <div className="mb-3 flex justify-between">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Maximum Requests</span>
                                <span className="text-sm font-bold text-primary">{globalLimit} RPM</span>
                            </div>
                            <input
                                className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                                max="1000" min="1"
                                type="range"
                                value={globalLimit}
                                onChange={(e) => setGlobalLimit(parseInt(e.target.value))}
                            />
                            <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                                <span>1 RPM</span>
                                <span>1000 RPM</span>
                            </div>
                        </div>
                        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Policy Details</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> 429 Error code response enabled</li>
                                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check_circle</span> IP-based prioritization</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Burst Mode Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">bolt</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Burst Mode Strategy</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Allow temporary traffic spikes by configuring a token bucket algorithm for sudden load increases.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Burst Capacity</label>
                            <div className="flex items-center gap-2">
                                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 text-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white" type="number" defaultValue="25" />
                                <span className="text-xs font-medium text-slate-400">requests</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Refill Interval</label>
                            <div className="flex items-center gap-2">
                                <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 text-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white outline-none">
                                    <option>Every 500ms</option>
                                    <option>Every 1 second</option>
                                    <option>Every 5 seconds</option>
                                </select>
                                <span className="material-symbols-outlined text-slate-400 cursor-help text-sm">info</span>
                            </div>
                        </div>
                        <div className="rounded-lg border border-primary/20 bg-primary/5 dark:bg-primary/10 p-4">
                            <p className="text-xs text-primary leading-relaxed">
                                <strong>Recommendation:</strong> For a 150 RPM limit, a burst of 25 is optimal for standard CI/CD deployment pipelines.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Endpoint Table Section */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden mb-8 shrink-0">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Endpoint Specific Overrides</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Define custom limits for sensitive API paths.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                        <span className="material-symbols-outlined text-sm font-bold">add</span>
                        Add Override
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Endpoint Path</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Limit</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <code className="rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">/v1/deploy</code>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-[10px] font-black text-indigo-600 dark:text-indigo-400">POST</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">10 / min</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">Active</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">edit</span></button>
                                        <button className="p-1 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <code className="rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">/v1/logs/*</code>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-[10px] font-black text-blue-600 dark:text-blue-400">GET</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">500 / min</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/30 px-2 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">Active</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-lg">edit</span></button>
                                        <button className="p-1 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/30 px-6 py-3 border-t border-slate-100 dark:border-slate-800">
                    <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Show all 12 overrides →</button>
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-6">
                <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Sync across all nodes?</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Applying these changes will immediately propagate to your globally distributed VPS clusters.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-6 py-2 text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors">
                        Reset to Default
                    </button>
                    <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition-all active:scale-95">
                        Update & Deploy
                    </button>
                </div>
            </div>
        </div>
    );
}
