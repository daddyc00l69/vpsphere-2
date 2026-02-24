"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@vpsphere/api-client";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";

interface Deployment {
    id: string;
    project_id: string;
    project_name: string;
    status: string;
    logs: string;
    created_at: string;
    branch: string;
}

export default function DeploymentsPage() {
    const [deployments, setDeployments] = useState<Deployment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeployments = async () => {
            try {
                const data = await api.deployments.list();
                setDeployments(data);
            } catch (error) {
                console.error("Failed to fetch deployments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeployments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
            case 'building': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
            case 'failed': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
            case 'pending': return 'text-amber-400 bg-amber-50/50 dark:bg-amber-900/10';
            default: return 'text-slate-500 bg-slate-50 dark:bg-slate-900/20';
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-background-dark overflow-y-auto">
            <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Deployments</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Monitor and manage your service deployments across all environments.
                        </p>
                    </div>
                    <Button asChild className="bg-vpsPurple hover:bg-vpsPurple/90 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-vpsPurple/20">
                        <Link href={ROUTES.NEW_SERVICE}>
                            New Deployment
                        </Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : deployments.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
                        <div className="size-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary mb-6">
                            <span className="material-symbols-outlined text-4xl">history</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No Deployments Found</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                            Start by creating a new service to see your deployment history here.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Project</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Branch</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">Created</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deployments.map((deployment) => (
                                    <tr key={deployment.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded bg-vpsPurple/10 flex items-center justify-center text-vpsPurple font-bold text-xs">
                                                    {deployment.project_name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-white">{deployment.project_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", getStatusColor(deployment.status))}>
                                                {deployment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                            {deployment.branch}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(deployment.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <Link href={`/deploy/${deployment.project_id}`}>
                                                <Button size="sm" variant="outline" className="text-xs font-bold border-slate-200 dark:border-slate-700 hover:text-vpsPurple hover:border-vpsPurple">
                                                    View Status
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
