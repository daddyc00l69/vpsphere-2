"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResetPasswordSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark relative overflow-hidden">
            {/* Background Decoration */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Navigation */}
            <header className="w-full px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 fixed top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined !text-xl">cloud_done</span>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">VPSphere</h2>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-6">
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Features</Link>
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Pricing</Link>
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Docs</Link>
                    </nav>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <Link href="/login" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Sign In</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
                <div className="w-full max-w-[440px] animate-fade-in">
                    {/* Branding Logo above Card */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <svg className="size-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                            </svg>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">VPSphere</span>
                        </div>
                    </div>

                    {/* Success Card */}
                    <div className="bg-white dark:bg-[#1a1932] rounded-xl shadow-xl shadow-primary/5 border border-primary/10 p-8 md:p-10 text-center">
                        {/* Success Icon */}
                        <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-success !text-4xl">check_circle</span>
                        </div>

                        {/* Text Content */}
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Password Reset Successful</h1>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            Your password has been updated. You can now log in to your VPSphere account with your new credentials.
                        </p>

                        {/* Action Button */}
                        <Link href="/login" className="block w-full">
                            <Button className="w-full py-3.5 shadow-lg shadow-primary/20 flex items-center justify-center gap-2" size="lg">
                                <span>Back to Login</span>
                                <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                            </Button>
                        </Link>

                        {/* Alternative Action */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-semibold mb-3">Security Notice</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Didn&apos;t perform this action?
                                <Link href="#" className="text-primary font-medium hover:underline ml-1">Contact Support</Link>
                            </p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-8 flex justify-center gap-4 text-slate-400 dark:text-slate-600">
                        <Link href="#" className="text-xs hover:text-primary transition-colors">Privacy Policy</Link>
                        <span className="text-[10px] self-center opacity-30">•</span>
                        <Link href="#" className="text-xs hover:text-primary transition-colors">Terms of Service</Link>
                        <span className="text-[10px] self-center opacity-30">•</span>
                        <Link href="#" className="text-xs hover:text-primary transition-colors">System Status</Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-slate-500 dark:text-slate-600 text-sm">
                © 2024 VPSphere Inc. All rights reserved.
            </footer>
        </div>
    );
}
