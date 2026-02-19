"use client";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Total Users */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Users</p>
                        <span className="text-emerald-500 text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-[16px]">trending_up</span> 5.2%
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12,450</h3>
                    <div className="mt-4 h-12 w-full">
                        {/* SVG Sparkline Placeholder */}
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                            <path d="M0 35 Q 20 25, 40 30 T 80 10 T 100 5" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                        </svg>
                    </div>
                </div>

                {/* Total Servers */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Servers</p>
                        <span className="text-slate-400 text-[10px] font-bold">ACTIVE / TOTAL</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1,240 <span className="text-slate-400 font-medium">/ 1,252</span></h3>
                    <div className="mt-4 flex items-center gap-1">
                        <div className="h-2 flex-1 bg-primary rounded-full"></div>
                        <div className="h-2 w-4 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400">99.1% uptime performance</p>
                </div>

                {/* CPU Load */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Global CPU Load</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">42%</h3>
                    <div className="mt-4 relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-100 dark:bg-emerald-900/20">
                            <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500" style={{ width: "42%" }}></div>
                        </div>
                    </div>
                    <p className="mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium italic">Healthy state</p>
                </div>

                {/* RAM Usage */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Global RAM Usage</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">68%</h3>
                    <div className="mt-4 relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-amber-100 dark:bg-amber-900/20">
                            <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500" style={{ width: "68%" }}></div>
                        </div>
                    </div>
                    <p className="mt-2 text-[10px] text-amber-600 dark:text-amber-400 font-medium italic">Approaching threshold</p>
                </div>

                {/* Revenue Card */}
                <div className="bg-primary p-5 rounded-xl border border-primary/20 shadow-lg shadow-primary/20 relative overflow-hidden group">
                    <div className="relative z-10">
                        <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">Monthly Revenue</p>
                        <h3 className="text-2xl font-bold text-white">$124,500</h3>
                        <span className="text-white/70 text-xs font-medium flex items-center mt-1">
                            <span className="material-symbols-outlined text-[16px]">arrow_upward</span> +12.5% vs LY
                        </span>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                            <defs>
                                <linearGradient id="purpleGrad" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="white"></stop>
                                    <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0 40 L0 30 Q 25 10, 50 25 T 100 5 L 100 40 Z" fill="url(#purpleGrad)"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent System Activity Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent System Activity</h2>
                        <button className="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary text-xs">JD</div>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Deployed Server <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">vps-992a</span></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">London, UK</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 uppercase tracking-tight">Success</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">2 mins ago</td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary text-xs">SM</div>
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Sarah Miller</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Upgraded Plan <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">Pro+</span></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">New York, US</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 uppercase tracking-tight">Info</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">14 mins ago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* High Resource Usage Alert List */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500">report</span>
                            High Resource Alerts
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded uppercase tracking-wider">Critical</span>
                                <span className="text-[10px] text-red-400 font-medium">Just now</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">node-cluster-04</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">CPU Load: <span className="font-bold text-red-600 dark:text-red-400">98.2%</span></p>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Owner: Enterprise Dev Group</p>
                        </div>
                    </div>
                    <div className="mt-auto p-4 border-t border-slate-50 dark:border-slate-800">
                        <button className="w-full text-slate-500 font-bold text-xs flex items-center justify-center gap-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                            Resolve All Alerts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
