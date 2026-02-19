"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Calculate password strength
    const getStrength = (pass: string) => {
        let score = 0;
        if (!pass) return { score: 0, label: "Weak", color: "bg-slate-200 dark:bg-slate-700", text: "text-slate-500" };

        if (pass.length > 7) score += 20;
        if (pass.length > 10) score += 20;
        if (/[A-Z]/.test(pass)) score += 20;
        if (/[0-9]/.test(pass)) score += 20;
        if (/[^A-Za-z0-9]/.test(pass)) score += 20;

        if (score <= 40) return { score, label: "Weak", color: "bg-red-500", text: "text-red-500" };
        if (score <= 79) return { score, label: "Medium", color: "bg-yellow-500", text: "text-yellow-500" };
        return { score, label: "Strong", color: "bg-primary", text: "text-primary" };
    };

    const strength = getStrength(password);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Success - redirect
        window.location.href = "/reset-password/success";
    };

    return (
        <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white dark:bg-background-dark/50 px-6 py-4 md:px-10">
                <div className="flex items-center gap-3 text-primary">
                    <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                        <span className="material-symbols-outlined">cloud_queue</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">VPSphere</h2>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 hidden sm:block">Need help?</span>
                    <Button size="sm" className="h-10 px-4 font-semibold">
                        Support
                    </Button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[440px] animate-fade-in">
                    {/* Reset Card */}
                    <Card className="p-8 !shadow-sm border-slate-200 dark:border-slate-800">
                        <div className="mb-8 text-center sm:text-left">
                            <h1 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight mb-2">Reset your password</h1>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Your new password must be different from previously used passwords to ensure maximum security.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* New Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">New Password</label>
                                <div className="relative group">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter at least 8 characters"
                                        className="pr-10 py-3"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="space-y-2 py-1">
                                <div className="flex justify-between items-center text-[12px]">
                                    <span className="text-slate-500 font-medium">Password strength: <span className={`${strength.text} font-bold transition-colors`}>{strength.label}</span></span>
                                    <span className="text-slate-400">{strength.score}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: `${strength.score}%` }}></div>
                                </div>
                                <p className="text-[11px] text-slate-400 italic">Excellent! Use symbols and numbers to make it even stronger.</p>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Confirm New Password</label>
                                <div className="relative group">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Repeat your new password"
                                        className="pr-10 py-3"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm font-medium animate-fade-in">
                                    {error}
                                </div>
                            )}

                            {/* Action Button */}
                            <Button className="w-full py-3.5 shadow-md shadow-primary/20 mt-2" size="lg" disabled={!password || !confirmPassword}>
                                <span>Update Password</span>
                                <span className="material-symbols-outlined text-[18px] ml-2">arrow_forward</span>
                            </Button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4">
                            <Link href="/login" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                Back to sign in
                            </Link>
                        </div>
                    </Card>

                    {/* Security Footer */}
                    <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">verified_user</span>
                            <span className="text-[11px] uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">End-to-End Encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">security</span>
                            <span className="text-[11px] uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">SOC2 Compliant</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-6 px-10 border-t border-primary/5 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 opacity-60">
                    <p className="text-xs text-slate-500">© 2024 VPSphere Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
