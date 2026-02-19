"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function CancelSubscriptionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                ></motion.div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-[520px] bg-white dark:bg-slate-950 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-10"
                >
                    <div className="p-8 md:p-10 text-center">
                        {/* Icon Warning */}
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 mb-6">
                            <span className="material-symbols-outlined text-4xl">sentiment_dissatisfied</span>
                        </div>

                        <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold leading-tight mb-3">
                            Are you sure you want to cancel?
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed mb-8">
                            If you cancel now, you will lose access to your premium features and dedicated resources at the end of your current billing cycle on <span className="font-semibold text-slate-900 dark:text-white">Oct 24, 2023</span>.
                        </p>

                        {/* Loss Items */}
                        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 mb-8 text-left border border-red-100 dark:border-red-900/20">
                            <h3 className="text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest mb-4">What you&apos;ll lose:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-red-500 text-xl mt-0.5">remove_circle</span>
                                    <div>
                                        <p className="text-slate-900 dark:text-white text-sm font-semibold leading-none mb-1">Priority 24/7 Support</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs text-wrap">Direct access to our expert engineering team anytime.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-red-500 text-xl mt-0.5">remove_circle</span>
                                    <div>
                                        <p className="text-slate-900 dark:text-white text-sm font-semibold leading-none mb-1">High-Performance Resources</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs text-wrap">Guaranteed CPU and high-speed RAM allocation.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={onClose}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-lg text-lg shadow-lg shadow-primary/25"
                            >
                                Keep My Plan
                                <span className="material-symbols-outlined ml-2">arrow_forward</span>
                            </Button>
                            <div className="pt-2">
                                <button className="text-slate-400 hover:text-red-500 text-sm font-medium transition-colors underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700">
                                    I still want to cancel my subscription
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
