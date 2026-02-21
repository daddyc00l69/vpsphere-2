"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length < 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const res = await fetch("https://api.devtushar.uk/auth/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Verification failed");
                toast.error(data.error || "Verification failed");
                setLoading(false);
            } else {
                if (data.token) {
                    localStorage.setItem('vpsphere_token', data.token);
                    if (data.user) {
                        localStorage.setItem('vpsphere_user', JSON.stringify(data.user));
                    }
                    document.cookie = `vpsphere_token=${data.token}; path=/; max-age=86400; samesite=strict`;
                }
                toast.success("Email verified! Redirecting to dashboard...");
                // Success: Cookie is set by backend. Redirect instantly!
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "An error occurred");
            toast.error(error.message || "An error occurred");
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) return;
        toast.info("Resending OTP...");
        try {
            await fetch("https://api.devtushar.uk/auth/otp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            toast.success("A new verification code has been sent!");
        } catch {
            toast.error("Failed to resend code.");
        }
    };

    return (
        <Card className="w-full p-8 !shadow-xl shadow-primary/5 border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">Verify your email</h2>
            <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
                We sent a 6-digit code to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>. Please enter it below.
            </p>

            <form className="space-y-5" onSubmit={handleVerify}>
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 p-3 rounded-md text-sm border border-red-200 dark:border-red-800">
                        {error}
                    </div>
                )}

                <div className="space-y-1.5 flex flex-col items-center">
                    <Input
                        id="otp"
                        type="text"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="text-center text-2xl tracking-[0.5em] font-mono h-14 w-full"
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full justify-center shadow-lg shadow-primary/20 mt-2" size="lg">
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                            <span>Verifying...</span>
                        </div>
                    ) : (
                        <span>Verify and Continue 🚀</span>
                    )}
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Didn&apos;t receive the code?{" "}
                <button type="button" onClick={handleResend} className="font-bold text-primary hover:underline">
                    Resend it
                </button>
            </p>
        </Card>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="flex flex-col items-center">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="flex items-center gap-3 text-primary mb-2">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-2xl">grid_view</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">VPSphere</h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Almost there!</p>
            </div>

            <Suspense fallback={<div className="text-center p-8">Loading verification state...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </div>
    );
}
