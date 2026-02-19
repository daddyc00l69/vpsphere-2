"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ServiceOverviewPage() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Service Status</h3>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-3 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">Active</span>
                        <span className="text-sm text-slate-500">since 2 mins ago</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Region</span>
                            <span className="font-medium text-slate-900 dark:text-white">US-East (N. Virginia)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Instance Type</span>
                            <span className="font-medium text-slate-900 dark:text-white">t3.micro (Shared CPU)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Public IP</span>
                            <span className="font-medium text-slate-900 dark:text-white">54.234.11.90</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Latest Deployment</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500">commit</span>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Update api routes</p>
                            <p className="text-xs text-slate-500">34a1b9c • main branch</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Status</span>
                            <span className="font-bold text-emerald-500">Success</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Duration</span>
                            <span className="font-medium text-slate-900 dark:text-white">45s</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Triggered by</span>
                            <span className="font-medium text-slate-900 dark:text-white">Git Push</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6">View Deployment History</Button>
                </Card>
            </div>

            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Environment Variables</h3>
                <p className="text-sm text-slate-500 mb-4">Securely managed variables available to your runtime.</p>
                <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="flex gap-4">
                        <span className="text-purple-600 dark:text-purple-400">NODE_ENV</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-slate-900 dark:text-slate-300">production</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-purple-600 dark:text-purple-400">DATABASE_URL</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-slate-900 dark:text-slate-300">postgres://user:pass@db...</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-purple-600 dark:text-purple-400">API_KEY</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-slate-900 dark:text-slate-300">****************</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
