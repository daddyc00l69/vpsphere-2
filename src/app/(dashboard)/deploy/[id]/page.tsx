"use client";

import React from "react";
import { DeploymentStatus } from "@/components/deployment/DeploymentStatus";
import { SubdomainManager } from "@/components/deployment/SubdomainManager";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function DeploymentPage() {
    const params = useParams();
    const serviceId = params ? params.id as string : "unknown-service";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-6 md:p-12 space-y-12">
            {/* Breadcrumbs / Header */}
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Link href={ROUTES.DASHBOARD} className="hover:text-primary transition-colors">Dashboard</Link>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Deployment</span>
                </div>
                <Button variant="ghost" size="sm">
                    <span className="material-symbols-outlined mr-2">help</span>
                    Documentation
                </Button>
            </div>

            {/* Deployment Status Section */}
            <section className="animate-fade-in">
                <DeploymentStatus serviceId={serviceId} />
            </section>

            <div className="border-t border-slate-200 dark:border-slate-800 max-w-5xl mx-auto"></div>

            {/* Subdomain Management Section */}
            <section className="max-w-5xl mx-auto animate-fade-in pb-20">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Network Configuration</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Manage how users access your deployment. Changes may take up to 2 minutes to propagate.
                    </p>
                </div>
                <SubdomainManager initialSubdomain={serviceId} />
            </section>
        </div>
    );
}
