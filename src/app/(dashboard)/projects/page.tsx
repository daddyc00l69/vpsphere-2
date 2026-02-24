"use client";

import Link from "next/link";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { type Service } from "@/data/mockServices";
import { ROUTES } from "@/config/routes";
import { useEffect, useState } from "react";
import api from "@vpsphere/api-client";

export default function ProjectsPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const data = await api.projects.list();
                if (isMounted) {
                    setServices(Array.isArray(data) ? data : (data.projects || []));
                }
            } catch (error) {
                console.error("Failed to fetch projects grid:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProjects();

        // Cleanup boolean to prevent setState calls if the user routes away before fetch completes
        return () => { isMounted = false; };
    }, []); // Only fetch exactly once! 

    const hasServices = services.length > 0;

    return (
        <div className="flex flex-col h-full bg-vpsBackground dark:bg-background-dark">
            <Header />
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Active Projects</h3>
                    <div className="flex items-center gap-2">
                        <Link href={ROUTES.NEW_SERVICE}>
                            <Button size="sm" className="bg-vpsPurple hover:bg-vpsPurple/90 text-white rounded-vps font-bold shadow-md shadow-vpsPurple/20">
                                <span className="material-symbols-outlined text-lg mr-1">add</span>
                                New Deployment
                            </Button>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : hasServices ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <ServiceCard key={service.id || Math.random()} service={service as Service} />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}
