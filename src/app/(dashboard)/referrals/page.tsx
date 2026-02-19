"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";
import confetti from "canvas-confetti";

export default function ReferralsPage() {
    const [copied, setCopied] = useState(false);
    const referralLink = "https://vpsphere.com/ref/johndoe123";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#8b5cf6', '#10b981', '#3b82f6']
        });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-6 md:p-12 space-y-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <a href={ROUTES.DASHBOARD} className="hover:text-primary transition-colors">Dashboard</a>
                    <span>/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Referrals</span>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 md:p-12 mb-12 border border-primary/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-50"></div>

                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                        Earn Credits
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Invite Friends, <span className="text-primary">Earn Free Hosting</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                        Give your friends $100 in credits to get started. When they spend $25, you&apos;ll update get $25 in credits added to your account.
                    </p>

                    <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex gap-2">
                        <Input
                            value={referralLink}
                            readOnly
                            className="border-0 bg-transparent text-slate-600 dark:text-slate-300 font-medium focus-visible:ring-0"
                        />
                        <Button onClick={handleCopy} className="whitespace-nowrap min-w-[100px]">
                            {copied ? (
                                <>
                                    <span className="material-symbols-outlined text-lg mr-1">check</span>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg mr-1">content_copy</span>
                                    Copy Link
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Referrals</h3>
                        <p className="text-4xl font-bold text-slate-900 dark:text-white">12</p>
                        <p className="text-xs text-slate-500 mt-2">Friends who signed up</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Pending Credits</h3>
                        <p className="text-4xl font-bold text-slate-900 dark:text-white">$75.00</p>
                        <p className="text-xs text-slate-500 mt-2">Waiting for friends to spend $25</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                        <h3 className="text-emerald-600 dark:text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">Total Earned</h3>
                        <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">$225.00</p>
                        <p className="text-xs text-slate-500 mt-2">Credits added to your account</p>
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">How it works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-900/50">
                                <span className="material-symbols-outlined text-3xl">share</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Share your link</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Copy your unique referral link and share it with friends via email or social media.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100 dark:border-purple-900/50">
                                <span className="material-symbols-outlined text-3xl">person_add</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Friend signs up</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">They get $100 in credits to try out VPSphere for their projects.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-900/50">
                                <span className="material-symbols-outlined text-3xl">payments</span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. You get paid</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Once they spend $25 on paid services, you automatically get $25 in credits.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
