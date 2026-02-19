"use client";

import React from "react";
import { FAQSection } from "@/components/support/FAQSection";
// Link import removed
import { ROUTES } from "@/config/routes";

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-6 md:p-12 space-y-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <a href={ROUTES.DASHBOARD} className="hover:text-primary transition-colors">Dashboard</a>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Support</span>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">How can we help you?</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Search our knowledge base for answers to common questions, or contact our support team directly.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Getting Started</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Learn the basics of deploying your first application.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="size-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Billing & Plans</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Manage your subscription and payment methods.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="size-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">dns</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Domains & DNS</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Connect custom domains and configure SSL.
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                    <FAQSection />
                </div>
            </div>
        </div>
    );
}
