"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function PaymentSuccessPage() {

    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-8 flex flex-col items-center justify-center text-center">

            <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-900/30 max-w-lg w-full">
                <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Your subscription to the <span className="font-semibold text-slate-900 dark:text-white">Pro Plan</span> is now active. Thank you for choosing VPSphere.
                </p>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-8 text-left">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-500">Amount Paid</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">$29.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-500">Transaction ID</span>
                        <span className="text-sm font-mono text-slate-900 dark:text-white">tx_123456789</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Date</span>
                        <span className="text-sm text-slate-900 dark:text-white">Oct 24, 2023, 10:42 AM</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href={ROUTES.DASHBOARD}>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6">
                            Go to Dashboard
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                        <span className="material-symbols-outlined mr-2">download</span>
                        Download Invoice
                    </Button>
                </div>
            </div>
        </div>
    );
}
