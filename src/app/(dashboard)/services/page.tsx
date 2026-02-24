"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ServiceTypeSelection, type ServiceType } from "@/components/wizard/ServiceTypeSelection";
import { RepoSelection, type GitHubRepo } from "@/components/wizard/RepoSelection";

export default function ServicesPage() {
    const router = useRouter();
    const [serviceType, setServiceType] = useState<ServiceType>("web");

    const handleRepoSelect = (repo: GitHubRepo) => {
        // Store selected repo in local storage to be picked up by the configuration page
        localStorage.setItem('vpsphere_selected_repo', JSON.stringify(repo));
        router.push('/services/configure');
    };

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto px-8 py-12 overflow-y-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">What are you deploying?</h2>
                <p className="text-slate-500 max-w-lg mx-auto">Choose the type of service that best fits your needs. You can always change configuration settings later.</p>
            </div>

            <div className="mb-16">
                <ServiceTypeSelection value={serviceType} onChange={setServiceType} />
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                <RepoSelection onSelect={handleRepoSelect} />
            </div>

            <div className="mt-12 text-center">
                <p className="text-sm text-slate-400">
                    Not sure which one to pick?{" "}
                    <Link className="text-primary font-medium hover:underline" href="#">Read the deployment guide</Link>{" "}
                    or{" "}
                    <Link className="text-primary font-medium hover:underline" href="#">contact support</Link>.
                </p>
            </div>
        </div>
    );
}
