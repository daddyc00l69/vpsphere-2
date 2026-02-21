import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-vpsBackground dark:bg-background-dark">
            <Card className="w-full max-w-3xl p-8 md:p-12 !shadow-xl shadow-primary/5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last updated: February 2026</p>
                </div>

                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when creating an account, including email addresses, names, and authentication credentials.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. How We Use Information</h2>
                        <p>We use the information to provide, maintain, and improve our services, as well as to communicate with you regarding service updates or security alerts.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing.</p>
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
