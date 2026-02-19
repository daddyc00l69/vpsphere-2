"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
    {
        id: 1,
        title: "Organize your Work",
        description: "Create projects to group your servers, databases, and services into logical environments for your team.",
        icon: "folder_open",
        cta: "Next",
    },
    {
        id: 2,
        title: "Deploy in Seconds",
        description: "Choose your stack, connect your repo, and launch globally with a single click.",
        icon: "rocket_launch",
        cta: "Next",
    },
    {
        id: 3,
        title: "Manage Costs",
        description: "Set budgets, track usage, and never get surprised by a bill again.",
        icon: "credit_card",
        cta: "Finish",
    },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const step = steps[currentStep];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Redirect to dashboard (mock)
            window.location.href = "/";
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[520px] animate-fade-in relative z-50">

                {/* Sidebar / Illustration Area */}
                <div className="md:w-2/5 bg-primary/5 dark:bg-primary/10 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-primary/10 relative overflow-hidden">
                    {/* Abstract Tech Illustration Placeholder */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-50"></div>

                    <div className="z-10 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-primary/10 mb-8 transition-all duration-300 transform scale-100">
                        <span key={step.icon} className="material-symbols-outlined text-primary text-7xl transition-all duration-300 animate-fade-in">
                            {step.icon}
                        </span>
                    </div>

                    <div className="flex gap-2 z-10">
                        {steps.map((s, i) => (
                            <div
                                key={s.id}
                                className={`h-2 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-primary" : "w-2 bg-primary/20"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Tour: Step {currentStep + 1} of {steps.length}</span>
                            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">Skip Tour</Link>
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                            Welcome to VPSphere!
                        </h1>

                        <div className="mt-8 space-y-6">
                            <div className="flex gap-5">
                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-2xl">{step.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="mt-12 flex items-center justify-between">
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            className={currentStep === 0 ? "invisible" : ""}
                        >
                            <span className="material-symbols-outlined text-lg mr-2">arrow_back</span>
                            Back
                        </Button>

                        <Button onClick={handleNext} className="px-8 py-3 shadow-lg shadow-primary/25" size="lg">
                            {step.cta}
                            <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Floating Progress UI (Desktop) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-white dark:bg-slate-900 px-8 py-4 rounded-full shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-8 hidden md:flex">
                {steps.map((s, i) => (
                    <React.Fragment key={s.id}>
                        <div className={`flex items-center gap-3 ${i === currentStep ? "" : "opacity-40"}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${i === currentStep ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
                                {s.id}
                            </div>
                            <div className="text-sm">
                                <div className="font-bold text-slate-900 dark:text-white">{s.title.split(" ")[0]}</div>
                                <div className="text-slate-500 text-xs hidden lg:block">{s.description.substring(0, 15)}...</div>
                            </div>
                        </div>
                        {i < steps.length - 1 && <div className="h-px w-8 bg-slate-200 dark:bg-slate-700"></div>}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
