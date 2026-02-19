"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { DNSVerification } from "@/components/domain/DNSVerification";
import { SSLStatus } from "@/components/domain/SSLStatus";
import { DomainError } from "@/components/domain/DomainError";
import { Button } from "@/components/ui/button";

export default function DomainPage() {
    const params = useParams();
    const domain = params ? decodeURIComponent(params.domain as string) : "example.com";

    // Simulator State
    const [viewState, setViewState] = useState<"verification" | "ssl" | "error">("verification");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-6 md:p-12 space-y-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <Link href={ROUTES.DASHBOARD} className="hover:text-primary transition-colors">Dashboard</Link>
                    <span>/</span>
                    <span>Domains</span>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-medium">{domain}</span>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{domain}</h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Status: <span className="font-mono font-medium text-slate-700 dark:text-slate-300">Pending Verification</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* Simulator Controls */}
                        <Button
                            variant={viewState === "verification" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewState("verification")}
                        >
                            DNS Check
                        </Button>
                        <Button
                            variant={viewState === "ssl" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewState("ssl")}
                        >
                            SSL Issuance
                        </Button>
                        <Button
                            variant={viewState === "error" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewState("error")}
                        >
                            Error State
                        </Button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-8">
                    {viewState === "verification" && (
                        <div className="animate-fade-in">
                            <DNSVerification
                                domain={domain}
                                expectedRecords={[
                                    { type: "A", name: "@", value: "76.76.21.21", ttl: 60 },
                                    { type: "CNAME", name: "www", value: "cname.vpsphere.cloud", ttl: 60 },
                                ]}
                            />
                        </div>
                    )}

                    {viewState === "ssl" && (
                        <div className="animate-fade-in">
                            <SSLStatus />
                        </div>
                    )}

                    {viewState === "error" && (
                        <div className="animate-fade-in">
                            <DomainError />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
