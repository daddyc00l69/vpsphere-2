"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { Service } from "@/data/mockServices";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    service: Service;
}

const statusConfig = {
    active: { color: "bg-emerald-500", label: "Live", bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-400" },
    building: { color: "bg-amber-500", label: "Building", bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-400" },
    failed: { color: "bg-red-500", label: "Failed", bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-400" },
    stopped: { color: "bg-slate-500", label: "Stopped", bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-700 dark:text-slate-400" },
};



export function ServiceCard({ service }: ServiceCardProps) {
    const config = statusConfig[service.status] || statusConfig.stopped;

    return (
        <Link
            href={ROUTES.SERVICE_DETAILS(service.id)}
            className="block group"
        >
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-vpsPurple/50 hover:shadow-lg hover:shadow-vpsPurple/5 transition-all duration-200">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className={cn("size-12 rounded-lg flex items-center justify-center text-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                            service.status === 'active' && "bg-vpsPurple/10 text-vpsPurple"
                        )}>
                            {service.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-vpsPurple transition-colors">
                                {service.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <span className="material-symbols-outlined text-sm">public</span>
                                {service.domain}
                            </div>
                        </div>
                    </div>

                    <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5", config.bg, config.text)}>
                        <span className={cn("size-1.5 rounded-full", config.color, service.status === 'active' && "animate-pulse")}></span>
                        {config.label}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <span className="material-symbols-outlined text-sm text-slate-400">memory</span>
                            {service.runtime}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <span className="material-symbols-outlined text-sm text-slate-400">map</span>
                            {service.region}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <span className="material-symbols-outlined text-sm text-slate-400">schedule</span>
                            {service.updatedAt}
                        </div>
                    </div>

                    <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">
                        arrow_forward
                    </span>
                </div>
            </div>
        </Link>
    );
}
