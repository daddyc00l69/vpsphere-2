"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password);
        if (!validPassword) {
            setError("Password must be at least 12 characters and include uppercase, lowercase, number, and special character.");
            setLoading(false);
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.devtushar.uk";
            const res = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: name.toLowerCase().replace(/\s/g, ''), email, password })
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed");
                toast.error(data.error || "Registration failed");
                setLoading(false);
            } else if (data.status === 'verification_required' || res.status === 201 || res.status === 202) {
                toast.success("Registration successful! Please verify your email.");
                router.push(`/verify-email?email=${encodeURIComponent(email)}`);
            }
        } catch (err: unknown) {
            const error = err as Error;
            setError(error.message || "An error occurred");
            toast.error(error.message || "An error occurred");
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
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Create your free account</p>
            </div>

            {/* Sign Up Card */}
            <Card className="w-full p-8 !shadow-xl shadow-primary/5 border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Get started with VPSphere</h2>

                {/* Social Auth Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                    <Button variant="secondary" className="w-full justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-[20px]">terminal</span>
                        <span>Sign up with GitHub</span>
                    </Button>
                    <Button variant="secondary" className="w-full justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-[20px]">code</span>
                        <span>Sign up with GitLab</span>
                    </Button>
                </div>

                {/* Separator */}
                <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                    <span className="mx-4 flex-shrink text-xs font-semibold uppercase tracking-wider text-slate-400">or</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                </div>

                {/* Sign Up Form */}
                <form className="space-y-5" onSubmit={handleSignUp}>
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 p-3 rounded-md text-sm border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white" htmlFor="name">Full Name</label>
                        <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white" htmlFor="email">Email Address</label>
                        <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white" htmlFor="password">Password</label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={12} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <input
                            id="terms"
                            type="checkbox"
                            className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-600"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-slate-500 dark:text-slate-400">
                            I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </label>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full justify-center shadow-lg shadow-primary/20 mt-2" size="lg">
                        <span>{loading ? "Creating Account..." : "Create Account"}</span>
                        {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                    </Button>
                </form>
            </Card>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}
