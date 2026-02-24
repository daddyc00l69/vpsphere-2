"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@vpsphere/api-client";
import { cn } from "@/lib/utils";

export default function ServiceOverviewPage() {
    const params = useParams();
    const serviceId = params.id as string;
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await api.projects.get(serviceId);
                setService(data);
            } catch (error) {
                console.error("Failed to fetch service:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [serviceId]);

    if (loading) return <div className="p-12 text-center text-slate-500">Loading service details...</div>;
    if (!service) return <div className="p-12 text-center text-slate-500">Service not found.</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Service Status</h3>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={cn("size-3 rounded-full", service.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400')}></div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{service.status}</span>
                        <span className="text-sm text-slate-500">since {new Date(service.updated_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Subdomain</span>
                            <span className="font-medium text-slate-900 dark:text-white">{service.subdomain}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Deployment Type</span>
                            <span className="font-medium text-slate-900 dark:text-white capitalize">{service.deployment_type?.replace('_', ' ') || 'Web Service'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Port</span>
                            <span className="font-medium text-slate-900 dark:text-white">{service.port || 'Auto'}</span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Repository Info</h3>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500">source</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-slate-900 dark:text-white truncate">{service.name}</p>
                            <p className="text-xs text-slate-500 truncate">{service.repo_url} • {service.branch}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Root Directory</span>
                            <span className="font-medium text-slate-900 dark:text-white">{service.root_directory}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Build Command</span>
                            <span className="font-medium text-slate-900 dark:text-white font-mono text-[10px]">{service.build_command || 'Detected'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Start Command</span>
                            <span className="font-medium text-slate-900 dark:text-white font-mono text-[10px]">{service.start_command || 'Detected'}</span>
                        </div>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-6">
                        <a href={service.repo_url} target="_blank" rel="noopener noreferrer">View on Git</a>
                    </Button>
                </Card>
            </div>
        </div>
    );
}
