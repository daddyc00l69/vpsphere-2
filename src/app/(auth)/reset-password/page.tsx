"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password);
        if (!validPassword) {
            return setError("Password must be at least 12 characters and include uppercase, lowercase, number, and special character.");
        }

        setLoading(true);

        try {
            const res = await fetch("https://api.devtushar.uk/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token, newPassword: password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to reset password.");
                toast.error(data.error || "Failed to reset password.");
            } else {
                toast.success("Password successfully reset! Logging you in...");

                // If it returns an accessToken, let's login directly
                if (data.token) {
                    localStorage.setItem('vpsphere_token', data.token);
                    if (data.user) {
                        localStorage.setItem('vpsphere_user', JSON.stringify(data.user));
                    }
                    document.cookie = `vpsphere_token=${data.token}; path=/; max-age=2592000; samesite=strict`;
                    router.push("/dashboard");
                } else {
                    router.push("/login");
                }
            }
        } catch {
            setError("A network error occurred.");
            toast.error("A network error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (!email || !token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Invalid Reset Link</h1>
                <p className="text-slate-500 mb-6">This password reset link is invalid or has expired.</p>
                <Link href="/forgot-password">
                    <Button>Request a new link</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full">
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

            {/* Reset Card */}
            <Card className="w-full max-w-[440px] p-8 !shadow-xl shadow-primary/5 border-slate-200 dark:border-slate-800">
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-[#111118] dark:text-white text-2xl font-bold tracking-tight mb-2">Reset your password</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Your new password must be strictly 12+ characters long with symbols and numbers to ensure maximum security.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 p-3 rounded-md text-sm border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    {/* New Password Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#111118] dark:text-slate-200 text-sm font-semibold">New Password</label>
                        <div className="relative group">
                            <Input
                                className="pr-12 py-3"
                                placeholder="Enter at least 12 characters"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={12}
                            />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors" type="button">
                                <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#111118] dark:text-slate-200 text-sm font-semibold">Confirm New Password</label>
                        <div className="relative group">
                            <Input
                                className="pr-12 py-3"
                                placeholder="Repeat your new password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                minLength={12}
                            />
                            <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors" type="button">
                                <span className="material-symbols-outlined text-[20px]">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                        </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-lg shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 group mt-2">
                        <span>{loading ? "Updating..." : "Update Password"}</span>
                        {!loading && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4">
                    <Link href="/login" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        Back to sign in
                    </Link>
                </div>
            </Card>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    <span className="text-[11px] uppercase tracking-widest font-bold">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">security</span>
                    <span className="text-[11px] uppercase tracking-widest font-bold">Session Lockout Active</span>
                </div>
            </div>
        </div>
    );
}
