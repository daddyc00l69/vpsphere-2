"use client";

import { PlanEditor } from "@/components/admin/PlanEditor";

export default function AdminPlansPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Plan Configuration</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage pricing tiers, resource limits, and feature lists displayed to users.</p>
                </div>
            </div>

            <PlanEditor />
        </div>
    );
}
