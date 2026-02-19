"use client";

import { EnvVarTable } from "@/components/services/EnvVarTable";

export default function ServiceEnvironmentPage() {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Environment Variables</h3>
                    <button className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">download</span>
                        Import .env
                    </button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
                    Environment variables are encrypted and securely stored. They are injected into your service during build and runtime. Changes will require a redeploy to take effect.
                </p>
            </div>

            <EnvVarTable />

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                    <div>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Secret files and larger configurations</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Need to upload a .json key or a .pem certificate? Use the &apos;Secret Files&apos; tab in Advanced Settings.</p>
                    </div>
                </div>
                <button className="whitespace-nowrap px-4 py-2 border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    );
}
