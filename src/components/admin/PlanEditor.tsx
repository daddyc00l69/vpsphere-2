"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Plan {
    id: string;
    name: string;
    price: number;
    cpu: number;
    ram: number;
    storage: number;
    features: string[];
    isPopular: boolean;
}

const INITIAL_PLANS: Plan[] = [
    {
        id: "starter",
        name: "Starter VPS",
        price: 5,
        cpu: 1,
        ram: 1,
        storage: 20,
        features: ["1 vCPU Core", "1 GB RAM", "20 GB NVMe SSD", "1 TB Bandwidth"],
        isPopular: false
    },
    {
        id: "pro",
        name: "Pro VPS",
        price: 12,
        cpu: 2,
        ram: 4,
        storage: 50,
        features: ["2 vCPU Cores", "4 GB RAM", "50 GB NVMe SSD", "4 TB Bandwidth", "Priority Support"],
        isPopular: true
    },
    {
        id: "business",
        name: "Business VPS",
        price: 24,
        cpu: 4,
        ram: 8,
        storage: 100,
        features: ["4 vCPU Cores", "8 GB RAM", "100 GB NVMe SSD", "8 TB Bandwidth", "Dedicated IP"],
        isPopular: false
    }
];

export function PlanEditor() {
    const [plans, setPlans] = useState<Plan[]>(INITIAL_PLANS);

    const handleUpdate = (id: string, field: keyof Plan, value: string | number | boolean) => {
        setPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleFeatureUpdate = (planId: string, index: number, value: string) => {
        setPlans(prev => prev.map(p => {
            if (p.id !== planId) return p;
            const newFeatures = [...p.features];
            newFeatures[index] = value;
            return { ...p, features: newFeatures };
        }));
    };

    const saveChanges = async () => {
        // Simulate API save
        // Show toast success
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card key={plan.id} className={`flex flex-col relative overflow-hidden transition-all border-2 ${plan.isPopular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-200 dark:border-slate-800'}`}>
                        {plan.isPopular && (
                            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                                Most Popular
                            </div>
                        )}

                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <div className="mb-4">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Plan Name</label>
                                <Input
                                    value={plan.name}
                                    onChange={(e) => handleUpdate(plan.id, "name", e.target.value)}
                                    className="font-bold text-lg bg-white dark:bg-slate-900"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Monthly Price ($)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                    <Input
                                        type="number"
                                        value={plan.price}
                                        onChange={(e) => handleUpdate(plan.id, "price", parseFloat(e.target.value))}
                                        className="pl-7 font-mono text-xl font-bold bg-white dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6 flex-1">
                            {/* Resources */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">CPU Cores</label>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{plan.cpu} vCPU</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1" max="16" step="1"
                                        value={plan.cpu}
                                        onChange={(e) => handleUpdate(plan.id, "cpu", parseInt(e.target.value))}
                                        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">RAM (GB)</label>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{plan.ram} GB</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5" max="64" step="0.5"
                                        value={plan.ram}
                                        onChange={(e) => handleUpdate(plan.id, "ram", parseFloat(e.target.value))}
                                        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Features List</label>
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <div className="mt-2.5 size-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                                        <Input
                                            value={feature}
                                            onChange={(e) => handleFeatureUpdate(plan.id, idx, e.target.value)}
                                            className="h-8 text-sm"
                                        />
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full border-dashed text-slate-400 hover:text-indigo-600 hover:border-indigo-600">
                                    <span className="material-symbols-outlined text-sm mr-1">add</span>
                                    Add Feature
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={plan.isPopular}
                                    onChange={(e) => handleUpdate(plan.id, "isPopular", e.target.checked)}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                Highlight as Popular
                            </label>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end gap-3 fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg z-20 md:pl-72">
                <Button variant="ghost">Discard Changes</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={saveChanges}>
                    Save Configuration
                </Button>
            </div>
            <div className="h-16"></div> {/* Spacer */}
        </div>
    );
}
