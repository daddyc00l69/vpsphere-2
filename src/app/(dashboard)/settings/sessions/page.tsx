"use client";

import Header from "@/components/header";
import { SessionList } from "@/components/settings/SessionList";

export default function SessionsPage() {
    return (
        <div className="flex flex-col h-full bg-vpsBackground dark:bg-background-dark">
            <Header />
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Page Header */}
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Active Sessions</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            View and manage devices where you are currently signed in.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {/* Security Alert */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-xl p-4 flex gap-4">
                            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg h-fit text-amber-600 dark:text-amber-500">
                                <span className="material-symbols-outlined">security</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-500 uppercase tracking-wider mb-1">Security Tip</h4>
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                    If you see a device you don&apos;t recognize, revoke access immediately and change your password.
                                </p>
                            </div>
                        </div>

                        {/* Session List */}
                        <SessionList />
                    </div>
                </div>
            </div>
        </div>
    );
}
