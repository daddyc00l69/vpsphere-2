"use client";

import React from "react";
import { PlanComparison } from "@/components/billing/PlanComparison";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function ChangePlanPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-8">
            <div className="max-w-5xl mx-auto mb-8">
                <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-6">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Dashboard
                </Link>
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Upgrade Your Plan</h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                        Unlock the full potential of VPSphere with our Pro plan. Get unlimited deployments, priority support, and advanced analytics.
                    </p>
                </div>

                <PlanComparison />
            </div>
        </div>
    );
}
