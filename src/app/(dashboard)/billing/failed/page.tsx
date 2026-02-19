"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function PaymentFailedPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-8 flex flex-col items-center justify-center text-center">

            <div className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30 max-w-lg w-full">
                <div className="size-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">error</span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Payment Failed</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    We were unable to process your payment. Please check your card details or try a different payment method.
                </p>

                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 mb-8 text-left flex gap-3 text-red-700 dark:text-red-400 text-sm">
                    <span className="material-symbols-outlined text-lg">info</span>
                    Reason: The card was declined by the issuer.
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/billing/checkout">
                        <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-bold py-6">
                            Try Again
                        </Button>
                    </Link>
                    <Link href={ROUTES.DASHBOARD}>
                        <Button variant="ghost" className="w-full">
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
