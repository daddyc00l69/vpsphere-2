"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Correct router for App Router
// import { ROUTES } from "@/config/routes";

export function PaymentForm({ planName, price }: { planName: string, price: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Random success/failure for demo purposes (mostly success)
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            router.push("/billing/success"); // Navigation via router
        } else {
            router.push("/billing/failed");
        }
        setIsLoading(false);
    };

    return (
        <Card className="max-w-md mx-auto shadow-lg border-slate-200 dark:border-slate-800">
            <CardHeader>
                <CardTitle>Secure Checkout</CardTitle>
                <CardDescription>Complete your subscription to {planName}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg flex justify-between items-center mb-6">
                        <div>
                            <p className="text-sm text-slate-500">Total due today</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{price}</p>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded uppercase">Monthly</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Card Information</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">credit_card</span>
                            <Input placeholder="0000 0000 0000 0000" className="pl-10" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="MM/YY" required />
                            <Input placeholder="CVC" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cardholder Name</label>
                        <Input placeholder="John Doe" required />
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Processing...
                                </span>
                            ) : (
                                `Pay ${price}`
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Payments processed securely by Razorpay
                </div>
            </CardFooter>
        </Card>
    );
}
