"use client";

import { useState } from "react";
import { StepsIndicator } from "@/components/wizard/StepsIndicator";
import { RepoSelection } from "@/components/wizard/RepoSelection";
import { BuildConfiguration } from "@/components/wizard/BuildConfiguration";
import { ServiceTypeSelection, type ServiceType } from "@/components/wizard/ServiceTypeSelection";
import api from "@vpsphere/api-client";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [serviceType, setServiceType] = useState<ServiceType>("web");
    interface GitHubRepo {
        id: number;
        name: string;
        full_name: string;
        private: boolean;
        language: string;
        clone_url: string;
        default_branch: string;
        updated_at: string;
    }

    const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

    const [isDeploying, setIsDeploying] = useState(false);
    const [deployError, setDeployError] = useState<string | null>(null);

    const handleRepoSelect = (repo: GitHubRepo) => {
        setSelectedRepo(repo);
        setStep(2);
    };

    const handleBuildSubmit = async () => {
        if (!selectedRepo) return;
        setIsDeploying(true);
        setDeployError(null);
        try {
            // Send payload to Express deploy.js route
            const response = await api.core.post("/deploy", {
                repoUrl: selectedRepo.clone_url,
                projectName: selectedRepo.name,
                branch: selectedRepo.default_branch || 'main'
            });

            // Redirect to the WebSockets Status stream using Postgres IDs
            router.push(`/deploy/${response.data.projectId}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setDeployError(errorMessage || 'Deployment could not be initiated.');
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-vpsBackground dark:bg-background-dark overflow-y-auto">
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">New Service</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Connect your source code and define your runtime environment.
                    </p>
                </div>

                <StepsIndicator currentStep={step} steps={["Select & Connect", "Configure", "Deploy"]} />

                {step === 1 && (
                    <div className="space-y-10">
                        <ServiceTypeSelection value={serviceType} onChange={setServiceType} />

                        <div className="w-full max-w-5xl mx-auto bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Connect to Repository</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Deploy directly from GitHub. We&apos;ll automatically rebuild your service on every push.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                {/* RepoSelection already handles the GitHub OAuth connect + repo list */}
                                <RepoSelection onSelect={handleRepoSelect} />
                            </div>
                            {serviceType !== "web" && (
                                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                                    Only Web Service deployments are enabled right now. Other service types are coming soon.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="max-w-5xl mx-auto mt-8">
                        {deployError && (
                            <div className="mb-4 bg-red-100 text-red-600 p-4 rounded">
                                {deployError}
                            </div>
                        )}
                        <BuildConfiguration repoName={selectedRepo?.name || ""} onBack={() => setStep(1)} onDeploy={handleBuildSubmit} />
                        {isDeploying && <p className="text-sm text-slate-500 mt-2">Starting deployment...</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
