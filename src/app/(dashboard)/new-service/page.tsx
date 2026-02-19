"use client";

import { useState } from "react";
import { StepsIndicator } from "@/components/wizard/StepsIndicator";
import { RepoSelection } from "@/components/wizard/RepoSelection";
import { BuildConfiguration } from "@/components/wizard/BuildConfiguration";
import { DeployProgress } from "@/components/wizard/DeployProgress";

export default function NewServicePage() {
    const [step, setStep] = useState(1);
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

    const handleRepoSelect = (repo: string) => {
        setSelectedRepo(repo);
        setStep(2);
    };

    const handleBuildSubmit = () => {
        setStep(3);
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
                        <BuildConfiguration
                            repoName={selectedRepo}
                            onBack={() => setStep(1)}
                            onDeploy={handleBuildSubmit}
                        />
                    )}
                    {step === 3 && (
                        <DeployProgress />
                    )}
                </div>
            </div>
        </div>
    );
}
