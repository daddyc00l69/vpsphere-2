"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ServiceSettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            {/* General Settings */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">General Settings</h3>
                <p className="text-sm text-slate-500 mb-6">Configure basic details for your service.</p>

                <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Name</label>
                        <Input defaultValue="vpsphere-api" />
                        <p className="text-xs text-slate-500">Used to identify your service in the dashboard.</p>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </Card>

            {/* Domains */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Domains</h3>
                <p className="text-sm text-slate-500 mb-6">Manage custom domains for your service.</p>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">language</span>
                            <span className="font-mono text-sm">api.vpsphere.dev</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">Primary</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500">
                            <span className="material-symbols-outlined">delete</span>
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Input placeholder="e.g. my-app.com" className="max-w-md" />
                        <Button variant="outline">Add Domain</Button>
                    </div>
                </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/30">
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">Danger Zone</h3>
                <p className="text-sm text-slate-500 mb-6">Irreversible actions for your service.</p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-100 dark:border-red-900/20 rounded-lg bg-red-50/50 dark:bg-red-900/10">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Suspend Service</h4>
                            <p className="text-xs text-slate-500">Pause all running instances immediately.</p>
                        </div>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">Suspend</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-100 dark:border-red-900/20 rounded-lg bg-red-50/50 dark:bg-red-900/10">
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Delete Service</h4>
                            <p className="text-xs text-slate-500">Permanently remove this service and all its data.</p>
                        </div>
                        <Button variant="destructive">Delete Service</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
