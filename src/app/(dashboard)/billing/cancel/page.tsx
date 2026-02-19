"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CancelSubscriptionModal } from "@/components/billing/CancelSubscriptionModal";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function CancelSubscriptionPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-8">
            <div className="max-w-2xl mx-auto animate-fade-in">
                <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-6">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Dashboard
                </Link>

                <div className="bg-white dark:bg-slate-900 icon rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Subscription Settings</h1>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 mb-8">
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Pro Plan</p>
                            <p className="text-sm text-slate-500">$29.00 / month • Renews Oct 24, 2023</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Payment Method</p>
                                <p className="text-sm text-slate-500">Visa ending in 4242</p>
                            </div>
                            <Button variant="outline" className="text-sm">Update</Button>
                        </div>
                        <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Billing History</p>
                                <p className="text-sm text-slate-500">View past invoices and usage</p>
                            </div>
                            <Button variant="outline" className="text-sm">View</Button>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-red-600 font-bold mb-2">Danger Zone</h3>
                        <p className="text-sm text-slate-500 mb-6">
                            Once you cancel your subscription, you will lose access to premium features at the end of your current billing cycle.
                        </p>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            variant="destructive"
                            className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30"
                        >
                            Cancel Subscription
                        </Button>
                    </div>
                </div>
            </div>

            <CancelSubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
