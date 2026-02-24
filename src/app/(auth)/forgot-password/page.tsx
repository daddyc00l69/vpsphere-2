"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return toast.error("Please enter your email");

        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.devtushar.uk";
            const res = await fetch(`${apiUrl}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to send reset link");
            } else {
                toast.success(data.message || "If an account exists, a reset link was sent.");
                setEmail("");
            }
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-3 text-primary mb-2">
                    <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="size-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">VPSphere</h1>
                </div>
            </div>

            {/* Auth Card */}
            <Card className="w-full p-8 md:p-10 !shadow-sm border-slate-200 dark:border-slate-800">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Reset your password</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        Enter the email address associated with your account and we will send you a link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="py-3"
                            disabled={loading}
                        />
                    </div>

                    <Button className="w-full justify-center" size="lg" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>

                {/* Back to Login */}
                <div className="mt-8 text-center">
                    <Link href="/login" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group">
                        <span className="material-symbols-outlined text-sm mr-1.5 transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Back to Login
                    </Link>
                </div>
            </Card>

            {/* Footer Decoration / Info */}
            <div className="mt-10 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    © 2023 VPSphere Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}
