"use client";

import React from "react";
import { PaymentForm } from "@/components/billing/PaymentForm";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background-dark p-8 flex flex-col items-center justify-center">

            <div className="w-full max-w-md mb-8">
                <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-6">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Dashboard
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-xl">shopping_cart</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Checkout</h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                    Complete your purchase of the <span className="font-semibold text-slate-900 dark:text-white">Pro Plan</span>.
                </p>
            </div>

            <PaymentForm planName="Pro Plan" price="$29.00" />

            <div className="mt-8 text-center text-xs text-slate-400 max-w-sm">
                By subscribing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>. You can cancel anytime.
            </div>
        </div>
    );
}
