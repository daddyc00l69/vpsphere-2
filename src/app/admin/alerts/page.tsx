"use client";

import { cn } from "@/lib/utils";

const ALERTS = [
    { id: 1, type: "critical", title: "High CPU Usage detected on Server-04", time: "10 mins ago", server: "prod-api-01", description: "CPU usage spiked to 98% for > 5 minutes." },
    { id: 2, type: "warning", title: "Memory limit approaching for Database-02", time: "1 hour ago", server: "prod-db-02", description: "Memory usage at 85%." },
    { id: 3, type: "info", title: "Backup completed successfully", time: "3 hours ago", server: "System", description: "Daily snapshot created (45GB)." },
    { id: 4, type: "critical", title: "Failed login attempts blocked", time: "5 hours ago", server: "auth-service", description: "50+ failed attempts from IP 192.168.1.105." },
    { id: 5, type: "warning", title: "Disk space running low", time: "1 day ago", server: "cdn-node-03", description: "Less than 10GB remaining on /mnt/data." },
];

export default function AdminAlertsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Alerts</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Critical system notifications and resource warnings.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Mark all as read
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Configure Alerts
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {ALERTS.map((alert) => (
                    <div key={alert.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start group">
                        <div className={cn(
                            "size-10 rounded-full flex items-center justify-center shrink-0",
                            alert.type === "critical" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                                alert.type === "warning" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                                    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        )}>
                            <span className="material-symbols-outlined">
                                {alert.type === "critical" ? "error" : alert.type === "warning" ? "warning" : "info"}
                            </span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{alert.title}</h3>
                                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                    {alert.time}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{alert.description}</p>
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                    {alert.server}
                                </span>
                                {alert.type === "critical" && (
                                    <span className="px-2 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase rounded">
                                        Action Required
                                    </span>
                                )}
                            </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all self-center">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
