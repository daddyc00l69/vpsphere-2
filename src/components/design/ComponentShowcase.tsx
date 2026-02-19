"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ComponentShowcase() {
    const [loading, setLoading] = useState(false);

    const toggleLoading = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <Card className="p-6 space-y-8">
            <h3 className="text-xl font-bold dark:text-white mb-4">Components</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Buttons */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Buttons</h4>
                    <div className="flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><span className="material-symbols-outlined">add</span></Button>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={toggleLoading} disabled={loading}>
                            {loading && <span className="material-symbols-outlined animate-spin mr-2 text-base">refresh</span>}
                            Click to Load
                        </Button>
                        <Button disabled>Disabled</Button>
                    </div>
                </div>

                {/* Inputs */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Inputs</h4>
                    <div className="space-y-4 max-w-sm">
                        <Input placeholder="Default Input" />
                        <Input placeholder="Disabled Input" disabled />
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <Input className="pl-10" placeholder="With Icon" />
                        </div>
                        <div>
                            <Input className="border-red-500 focus-visible:ring-red-200" placeholder="Error State" defaultValue="Invalid Value" />
                            <p className="text-xs text-red-500 mt-1">Please enter a valid email.</p>
                        </div>
                    </div>
                </div>

                {/* Status Badges */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">Status Badges</h4>
                    <div className="flex flex-wrap gap-4">
                        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200">Active</span>
                        <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-200">Processing</span>
                        <span className="bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-200">Pending</span>
                        <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-red-200">Failed</span>
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-slate-200">Offline</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
