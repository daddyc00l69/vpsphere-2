"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Record {
    type: string;
    name: string;
    value: string;
    ttl: number;
}

interface DNSVerificationProps {
    domain: string;
    expectedRecords: Record[];
    onVerified?: () => void;
}

export function DNSVerification({ expectedRecords, onVerified }: DNSVerificationProps) {
    const [isChecking, setIsChecking] = useState(false);
    // const [status, setStatus] = useState<"pending" | "propogating" | "verified">("pending");
    // const [lastChecked, setLastChecked] = useState<Date | null>(null);
    // Simulate current state: initially empty or partial match
    // const [currentRecords, setCurrentRecords] = useState<Record[]>([]); // Unused
    const [matches, setMatches] = useState<boolean[]>(new Array(expectedRecords.length).fill(false));

    const checkDNS = React.useCallback(async () => {
        setIsChecking(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate finding the records (success case)
        // setCurrentRecords(expectedRecords);
        setMatches(new Array(expectedRecords.length).fill(true));
        setIsChecking(false);

        if (onVerified) onVerified();
    }, [expectedRecords, onVerified]);

    useEffect(() => {
        // Auto-check on mount
        checkDNS();
    }, [checkDNS]);

    return (
        <Card className="shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">DNS Configuration</CardTitle>
                        <CardDescription>Add these records to your DNS provider (e.g., GoDaddy, Cloudflare).</CardDescription>
                    </div>
                    <Button
                        onClick={checkDNS}
                        disabled={isChecking}
                        variant="outline"
                        className="gap-2"
                    >
                        <span className={`material-symbols-outlined ${isChecking ? "animate-spin" : ""}`}>refresh</span>
                        {isChecking ? "Checking..." : "Verify DNS"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 font-medium text-slate-500">
                            <tr>
                                <th className="p-4 w-16">Status</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Value</th>
                                <th className="p-4">TTL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {expectedRecords.map((record, index) => {
                                const isMatched = matches[index];
                                return (
                                    <tr key={index} className="bg-white dark:bg-slate-950">
                                        <td className="p-4">
                                            {isMatched ? (
                                                <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center size-6 rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500" title="Not Found">
                                                    <span className="material-symbols-outlined text-sm font-bold">priority_high</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-200">{record.type}</td>
                                        <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{record.name}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 max-w-xs sm:max-w-sm md:max-w-md">
                                                <code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-xs font-mono truncate border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                                                    {record.value}
                                                </code>
                                                <button className="text-slate-400 hover:text-primary transition-colors" title="Copy">
                                                    <span className="material-symbols-outlined text-base">content_copy</span>
                                                </button>
                                            </div>
                                            {!isMatched && (
                                                <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">error</span>
                                                    Expected: {record.value}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-slate-500">{record.ttl}s</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex gap-3 text-sm text-slate-500 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
                    <span className="material-symbols-outlined text-blue-500">info</span>
                    <p>DNS changes can take up to 24-48 hours to propagate globally, although it&apos;s usually much faster.</p>
                </div>
            </CardContent>
        </Card>
    );
}
