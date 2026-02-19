"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function PlanComparison() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Current Plan */}
            <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 opacity-60 grayscale-[50%]">
                <div className="absolute top-0 right-0 p-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold uppercase">Current</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hobby Plan</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-6">$0 <span className="text-sm font-normal text-slate-500">/mo</span></p>

                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-green-500">check</span>
                        1 Deployment
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-green-500">check</span>
                        512MB RAM
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-green-500">check</span>
                        Community Support
                    </li>
                </ul>
            </div>

            {/* New Plan */}
            <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-primary shadow-xl scale-105">
                <div className="absolute -top-4 right-0 left-0 flex justify-center">
                    <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-md">
                        <span className="material-symbols-outlined text-sm">star</span>
                        Upgrade Selection
                    </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pro Plan</h3>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-6">$29 <span className="text-sm font-normal text-slate-500">/mo</span></p>

                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-900 dark:text-white font-medium">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        Unlimited Deployments
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-900 dark:text-white font-medium">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        8GB RAM / 4 vCPU
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-900 dark:text-white font-medium">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        Priority 24/7 Support
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-900 dark:text-white font-medium">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        Advanced Analytics
                    </li>
                </ul>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6">
                    Confirm Upgrade
                </Button>
            </div>
        </div>
    );
}
