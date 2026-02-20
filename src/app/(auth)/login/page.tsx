"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Auth State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Signup Success State
    const isSignupSuccess = searchParams.get("signup") === "success";
    const initialEmail = searchParams.get("email");

    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
        }
    }, [initialEmail]);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else if (data.session) {
            // Success: redirect to dashboard ("/")
            router.push("/");
        } else {
            setLoading(false);
        }
    };

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
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Cloud Infrastructure for Modern Teams</p>
            </div>

            {/* Login Card */}
            <Card className="w-full p-8 !shadow-xl shadow-primary/5 border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Log in to your account</h2>

                {/* Social Auth Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                    <Button variant="secondary" className="w-full justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                        {/* GitHub Icon Placeholder - using material symbol for now roughly similar */}
                        <span className="material-symbols-outlined text-[20px]">terminal</span>
                        <span>Continue with GitHub</span>
                    </Button>
                    <Button variant="secondary" className="w-full justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-[20px]">code</span>
                        <span>Continue with GitLab</span>
                    </Button>
                </div>

                {/* Separator */}
                <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                    <span className="mx-4 flex-shrink text-xs font-semibold uppercase tracking-wider text-slate-400">or</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                </div>

                {/* Sign In Form */}
                <form className="space-y-5" onSubmit={handleSignIn}>
                    {isSignupSuccess && !error && (
                        <div className="bg-green-50 dark:bg-green-900/30 text-green-600 p-3 rounded-md text-sm border border-green-200 dark:border-green-800">
                            Your account has been created. Please check your email and verify your address before logging in.
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 p-3 rounded-md text-sm border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white" htmlFor="email">Email Address</label>
                        <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold text-slate-900 dark:text-white" htmlFor="password">Password</label>
                            <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Input id="password" type="password" placeholder="••••••••" className="pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            className="size-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-600"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm font-medium text-slate-500 dark:text-slate-400 select-none">Remember me for 30 days</label>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full justify-center shadow-lg shadow-primary/20 mt-2" size="lg">
                        <span>{loading ? "Signing In..." : "Sign In"}</span>
                        {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                    </Button>
                </form>
            </Card>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="font-bold text-primary hover:underline">
                    Sign up for free
                </Link>
            </p>
        </div>
    );
}
