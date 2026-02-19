"use client";

import React from "react";
import { ResourceChart } from "@/components/analytics/ResourceChart";
// Link import removed
import { ROUTES } from "@/config/routes";

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-6 md:p-12 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <a href={ROUTES.DASHBOARD} className="hover:text-primary transition-colors">Dashboard</a>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Analytics</span>
                </div>

                <p className="text-slate-500 dark:text-slate-400">
                    Monitor your server&apos;s resource consumption and performance metrics.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <span className="material-symbols-outlined">memory</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Average CPU Load</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">42%</h3>
                            </div>
                        </div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-2">
                            <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                            12% vs last week
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <span className="material-symbols-outlined">storage</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Memory Usage</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1.8 GB</h3>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Peak usage: 2.4 GB
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <span className="material-symbols-outlined">network_check</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Bandwidth</p>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">450 GB</h3>
                            </div>
                        </div>
                        <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center mt-2">
                            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                            8% vs last week
                        </p>
                    </div>
                </div>

                {/* Main Component */}
                <ResourceChart />
            </div>
        </div>
    );
}
