"use client";

import { useState } from "react";
import { StepsIndicator } from "@/components/wizard/StepsIndicator";
import { RepoSelection } from "@/components/wizard/RepoSelection";
import { BuildConfiguration } from "@/components/wizard/BuildConfiguration";
import api from "@vpsphere/api-client";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
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
        <div className="flex flex-col h-full bg-vpsBackground dark:bg-background-dark p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto w-full">
                <StepsIndicator
                    currentStep={step}
                    steps={["Import Git Repository", "Configure Build", "Deploy"]}
                />

                <div className="mt-8">
                    {step === 1 && (
                        <RepoSelection onSelect={handleRepoSelect} />
                    )}
                    {step === 2 && (
                        <div>
                            {deployError && <div className="mb-4 bg-red-100 text-red-600 p-4 rounded">{deployError}</div>}
                            <BuildConfiguration
                                repoName={selectedRepo?.name || ""}
                                onBack={() => setStep(1)}
                                onDeploy={handleBuildSubmit}
                            />
                            {isDeploying && <p className="text-sm text-slate-500 mt-2">Starting deployment...</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
