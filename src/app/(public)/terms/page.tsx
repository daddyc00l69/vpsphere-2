import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-vpsBackground dark:bg-background-dark">
            <Card className="w-full max-w-3xl p-8 md:p-12 !shadow-xl shadow-primary/5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Terms of Service</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last updated: February 2026</p>
                </div>

                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Agreement to Terms</h2>
                        <p>By accessing or using VPSphere, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Acceptable Use</h2>
                        <p>You agree not to use the service for any unlawful purpose or in any way that interrupts, damages, or impairs the service.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Service Availability</h2>
                        <p>We strive to ensure 99.9% uptime but do not guarantee uninterrupted access. We reserve the right to modify or discontinue any part of the service with notice.</p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                    <Link href="/login">
                        <Button variant="outline" className="gap-2">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
