"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Simple, Transparent Pricing</h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">Start small and scale as you grow. No hidden fees. We won&apos;t charge you until you&apos;re ready.</p>

                {/* Billing Toggle */}
                <div className="mt-12 flex justify-center items-center gap-4">
                    <div className="flex h-12 w-fit items-center rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 shadow-inner">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={cn(
                                "relative flex cursor-pointer h-full items-center justify-center rounded-full px-6 text-sm font-bold transition-all",
                                billingCycle === "monthly"
                                    ? "bg-white dark:bg-primary shadow-md text-slate-900 dark:text-white"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={cn(
                                "relative flex cursor-pointer h-full items-center justify-center rounded-full px-6 text-sm font-bold transition-all",
                                billingCycle === "yearly"
                                    ? "bg-white dark:bg-primary shadow-md text-slate-900 dark:text-white"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            Yearly
                        </button>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                        20% Off Yearly
                    </span>
                </div>
            </div>

            {/* Pricing Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className="flex flex-col p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Free</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Perfect for hobbyists and side projects.</p>
                    </div>
                    <div className="mb-8 flex items-baseline gap-1">
                        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">$0</span>
                        <span className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">/ month</span>
                    </div>
                    <button className="w-full mb-10 py-3.5 px-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                        Start for Free
                    </button>
                    <div className="space-y-5">
                        {[
                            "1vCPU Shared",
                            "512MB RAM",
                            "1TB Shared Bandwidth",
                            "Community Support"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-900 dark:text-slate-200">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="relative flex flex-col p-8 bg-white dark:bg-slate-900 rounded-xl border-2 border-primary shadow-2xl shadow-primary/10 scale-105 z-10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        Most Popular
                    </div>
                    <div className="mb-8 mt-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pro</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Best for growing apps and developers.</p>
                    </div>
                    <div className="mb-8 flex items-baseline gap-1">
                        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">${billingCycle === 'monthly' ? 20 : 16}</span>
                        <span className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">/ month</span>
                    </div>
                    <button className="w-full mb-10 py-3.5 px-6 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/40">
                        Upgrade to Pro
                    </button>
                    <div className="space-y-5">
                        {[
                            "4vCPU Dedicated",
                            "8GB RAM",
                            "Dedicated IP Address",
                            "24/7 Priority Support",
                            "Automated Daily Backups"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-900 dark:text-slate-200">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span className="font-semibold">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div className="flex flex-col p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Tailored for high-scale organizations.</p>
                    </div>
                    <div className="mb-8 flex items-baseline gap-1">
                        <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Custom</span>
                    </div>
                    <button className="w-full mb-10 py-3.5 px-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                        Contact Sales
                    </button>
                    <div className="space-y-5">
                        {[
                            "Unlimited Scaling",
                            "Custom Hardware Configs",
                            "SLA Uptime Guarantee",
                            "Dedicated Account Manager"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-900 dark:text-slate-200">
                                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Compare Plans</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="py-4 px-6 text-sm font-bold text-slate-500 dark:text-slate-400">Feature</th>
                                <th className="py-4 px-6 text-lg font-bold text-slate-900 dark:text-white">Free</th>
                                <th className="py-4 px-6 text-lg font-bold text-vpsPurple">Pro</th>
                                <th className="py-4 px-6 text-lg font-bold text-slate-900 dark:text-white">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm md:text-base">
                            <tr>
                                <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">Managed Servers</td>
                                <td className="py-4 px-6">1 Server</td>
                                <td className="py-4 px-6 font-bold text-vpsPurple">Unlimited</td>
                                <td className="py-4 px-6">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">Concurrent Builds</td>
                                <td className="py-4 px-6">1</td>
                                <td className="py-4 px-6 font-bold text-vpsPurple">5</td>
                                <td className="py-4 px-6">Custom</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">Team Members</td>
                                <td className="py-4 px-6">Just You</td>
                                <td className="py-4 px-6 font-bold text-vpsPurple">Up to 5</td>
                                <td className="py-4 px-6">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">Custom Domains</td>
                                <td className="py-4 px-6">3</td>
                                <td className="py-4 px-6 font-bold text-vpsPurple">Unlimited</td>
                                <td className="py-4 px-6">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">Support</td>
                                <td className="py-4 px-6">Community</td>
                                <td className="py-4 px-6 font-bold text-vpsPurple">Priority Email</td>
                                <td className="py-4 px-6">24/7 Phone & Slack</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-24 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16 tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            "Can I upgrade or downgrade my plan anytime?",
                            "Do you offer a money-back guarantee?",
                            "Only for the resources you use. We bill by the second for compute instances. For the Hobby plan, you&apos;ll be charged $5/mo flat rate.",
                            "What kind of hardware do you use?",
                            "How does the 20% yearly discount work?"
                        ].map((question, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-slate-900 dark:text-white">{question}</h4>
                                    <span className="material-symbols-outlined text-slate-400">add</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto p-12 bg-primary rounded-xl text-white relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12 pointer-events-none">
                        <span className="material-symbols-outlined text-[200px]">dns</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Still have questions?</h2>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">Our team is here to help you find the perfect infrastructure for your project. We&apos;re available 24/7 via live chat or email.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <button className="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-all">
                            Contact Us
                        </button>
                        <button className="px-8 py-4 bg-primary border-2 border-white/30 text-white rounded-lg font-bold hover:bg-white/10 transition-all">
                            View Documentation
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
