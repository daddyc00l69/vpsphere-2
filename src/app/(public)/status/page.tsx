"use client";

import React from "react";
import { Button } from "@/components/ui/button";

// Mock status data
const systems = [
    { name: "API Server", status: "operational", region: "Global" },
    { name: "Dashboard", status: "operational", region: "Global" },
    { name: "Compute (US-East)", status: "operational", region: "US-East" },
    { name: "Compute (EU-West)", status: "degraded", region: "EU-West" },
    { name: "Compute (Asia-Pacific)", status: "operational", region: "Asia-Pacific" },
    { name: "Object Storage", status: "operational", region: "Global" },
    { name: "DNS Services", status: "operational", region: "Global" },
];

const incidents = [
    {
        id: 1,
        title: "High Latency in EU-West Region",
        status: "investigating",
        date: "Today, 10:23 AM",
        updates: [
            { time: "10:45 AM", message: "We are continuing to investigate the issue. Traffic is being rerouted." },
            { time: "10:23 AM", message: "We are currently investigating reports of high latency for instances in the EU-West region." },
        ]
    },
    {
        id: 2,
        title: "Scheduled Maintenance: Database Upgrades",
        status: "completed",
        date: "Feb 15, 2026",
        updates: [
            { time: "04:00 AM", message: "Maintenance completed successfully." },
            { time: "02:00 AM", message: "Maintenance started." },
        ]
    }
];

export default function StatusPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-lg">dns</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">VPSphere Status</h1>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <a href="/dashboard">Go to Dashboard</a>
                    </Button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

                {/* Current Status Banner */}
                <div className="bg-emerald-500 text-white rounded-xl p-8 shadow-lg shadow-emerald-500/20 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                    <div>
                        <h2 className="text-2xl font-bold">All Systems Operational</h2>
                        <p className="opacity-90">Last updated: Just now</p>
                    </div>
                </div>

                {/* System Status Grid */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold">Current System Status</h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {systems.map((sys, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <div>
                                    <p className="font-medium">{sys.name}</p>
                                    <p className="text-xs text-slate-500">{sys.region}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {sys.status === 'operational' ? (
                                        <>
                                            <span className="capitalize text-sm font-medium text-emerald-600 dark:text-emerald-400">Operational</span>
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="capitalize text-sm font-medium text-orange-500 dark:text-orange-400">Degraded Performance</span>
                                            <span className="relative flex h-3 w-3">
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incidents */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2">Past Incidents</h3>

                    {incidents.map((incident) => (
                        <div key={incident.id} className="space-y-4">
                            <div>
                                <h4 className="text-lg font-medium text-slate-900 dark:text-white hover:text-primary transition-colors cursor-pointer">{incident.title}</h4>
                                <p className="text-sm text-slate-500">{incident.date}</p>
                            </div>

                            <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-4">
                                {incident.updates.map((update, i) => (
                                    <div key={i} className="relative">
                                        <p className="text-sm text-slate-700 dark:text-slate-300">{update.message}</p>
                                        <p className="text-xs text-slate-400 mt-1">{update.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
