"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function SSLStatus() {
    const [step, setStep] = useState(0);

    const steps = [
        { id: 1, label: "Initializing", desc: "Generating private key..." },
        { id: 2, label: "Validating", desc: "Checking DNS propagation..." },
        { id: 3, label: "Issuing", desc: "Requesting certificate from Let's Encrypt..." },
        { id: 4, label: "Deploying", desc: "Installing certificate on load balancers..." },
        { id: 5, label: "Active", desc: "Your site is secured with HTTPS." },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 2000); // Simulate progress every 2 seconds
        return () => clearInterval(interval);
    }, [steps.length]);

    const currentStep = steps[step];

    return (
        <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">lock</span>
                    SSL Certificate Status
                </CardTitle>
                <CardDescription>
                    We automatically manage SSL certificates for your custom domains.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                    {/* Visual Ring */}
                    <div className="relative size-32 mb-6">
                        <svg className="size-full" viewBox="0 0 100 100">
                            <circle
                                className="text-slate-100 dark:text-slate-800 stroke-current"
                                strokeWidth="8"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                            ></circle>
                            <circle
                                className="text-emerald-500 stroke-current transition-all duration-1000 ease-in-out"
                                strokeWidth="8"
                                strokeLinecap="round"
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                strokeDasharray="251.2"
                                strokeDashoffset={251.2 - (251.2 * ((step + 1) / steps.length))}
                                transform="rotate(-90 50 50)"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {step === steps.length - 1 ? (
                                <span className="material-symbols-outlined text-4xl text-emerald-500 animate-bounce">check_circle</span>
                            ) : (
                                <span className="font-mono text-2xl font-bold text-slate-700 dark:text-slate-200">{Math.round(((step + 1) / steps.length) * 100)}%</span>
                            )}
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 animate-fade-in-up" key={currentStep.label}>
                        {currentStep.label}
                    </h3>
                    <p className="text-sm text-slate-500 animate-fade-in-up delay-75" key={currentStep.desc}>
                        {currentStep.desc}
                    </p>
                </div>

                <div className="grid grid-cols-5 gap-1 mt-6">
                    {steps.map((s, i) => (
                        <div key={s.id} className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                                className={`h-full bg-emerald-500 transition-all duration-500 ${i <= step ? "w-full" : "w-0"}`}
                            ></div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
