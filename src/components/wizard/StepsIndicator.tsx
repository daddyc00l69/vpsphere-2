"use client";

import { cn } from "@/lib/utils";

interface StepsIndicatorProps {
    currentStep: number;
    steps: string[];
}

export function StepsIndicator({ currentStep, steps }: StepsIndicatorProps) {
    return (
        <div className="flex items-center justify-center w-full mb-8">
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step} className="flex items-center">
                            {/* Line separator */}
                            {index > 0 && (
                                <div className={cn("w-12 h-0.5 mx-4 transition-colors duration-300",
                                    isCompleted ? "bg-vpsPurple" : "bg-slate-200 dark:bg-slate-800"
                                )}></div>
                            )}

                            {/* Step Circle */}
                            <div className="flex flex-col items-center gap-2 relative">
                                <div className={cn(
                                    "size-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10",
                                    isActive ? "border-vpsPurple bg-vpsPurple text-white shadow-lg shadow-vpsPurple/25" :
                                        isCompleted ? "border-vpsPurple bg-vpsPurple text-white" :
                                            "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400"
                                )}>
                                    {isCompleted ? (
                                        <span className="material-symbols-outlined text-lg">check</span>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <span className={cn(
                                    "absolute top-12 text-xs font-bold whitespace-nowrap transition-colors duration-300",
                                    isActive ? "text-vpsPurple" :
                                        isCompleted ? "text-slate-900 dark:text-white" : "text-slate-400"
                                )}>
                                    {step}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
