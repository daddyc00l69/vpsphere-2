"use client";

import { AuditLog } from "@/components/security/AuditLog";

export default function SecurityAuditPage() {
    return (
        <div className="flex flex-col h-full font-display">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Security Activity Audit Log</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Review all security-related events and access logs for your account.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 mb-6 shadow-sm">
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded-lg transition-colors">All Events</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Logins</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">API Access</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Account Changes</button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
                <AuditLog />
            </div>
        </div>
    );
}
