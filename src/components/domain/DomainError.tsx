"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function DomainError() {
    return (
        <div className="space-y-4 animate-fade-in">
            <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                <span className="material-symbols-outlined absolute left-4 top-4 text-red-600 dark:text-red-400">error</span>
                <AlertTitle className="ml-8 text-red-900 dark:text-red-300 font-bold mb-1">
                    DNS Verification Failed
                </AlertTitle>
                <AlertDescription className="ml-8 text-red-700 dark:text-red-400 text-sm leading-relaxed">
                    We detected a conflict with your existing DNS records. This often happens when you have multiple <strong>A Records</strong> or <strong>CNAME</strong> records for the same subdomain.
                </AlertDescription>
            </Alert>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Recommended Actions</h4>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-slate-400 text-lg">looks_one</span>
                        <span>Log in to your DNS provider (e.g., Godaddy, Namecheap).</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-slate-400 text-lg">looks_two</span>
                        <span>Remove any existing <strong>A</strong> or <strong>CNAME</strong> records for <code>www</code>.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-slate-400 text-lg">looks_3</span>
                        <span>Re-add the correct records shown above and wait 5-10 minutes.</span>
                    </li>
                </ul>
                <div className="flex gap-3">
                    <Button variant="outline" className="w-full sm:w-auto">Contact Support</Button>
                    <Button className="w-full sm:w-auto bg-slate-900 text-white dark:bg-white dark:text-slate-900">Re-Run Check</Button>
                </div>
            </div>
        </div>
    );
}
