"use client";

// import { cn } from "@/lib/utils";

const INVOICES = [
    { id: "INV-2024-001", date: "Oct 1, 2024", amount: "$24.00", status: "Paid" },
    { id: "INV-2024-002", date: "Sep 1, 2024", amount: "$24.00", status: "Paid" },
    { id: "INV-2024-003", date: "Aug 1, 2024", amount: "$24.00", status: "Paid" },
];

export default function BillingPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Billing & Usage</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your subscription and payment methods.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Plan */}
                <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Current Plan</h3>
                            <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
                                Pro Plan
                                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Active</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">$24.00</div>
                            <div className="text-xs text-slate-500">/ month</div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 mb-6 border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-center items-center gap-12 text-center">
                            <div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">8 / 10</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">Services</div>
                            </div>
                            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">45GB</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">Bandwidth</div>
                            </div>
                            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">2 / 5</div>
                                <div className="text-xs font-bold text-slate-500 uppercase">Team Members</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                            Upgrade Plan
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            Cancel Subscription
                        </button>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Payment Method</h3>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-6 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                <span className="font-bold text-[10px] text-slate-600 dark:text-slate-400">VISA</span>
                            </div>
                            <span className="font-mono text-sm text-slate-700 dark:text-slate-300">•••• 4242</span>
                        </div>
                        <p className="text-xs text-slate-500">Expires 12/2028</p>
                    </div>
                    <button className="w-full mt-6 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Update Card
                    </button>
                </div>
            </div>

            {/* Invoices */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Invoice History</h3>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Invoice ID</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Date</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Amount</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Status</th>
                                <th className="py-3 px-6 text-right text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {INVOICES.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white">{invoice.id}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{invoice.date}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white">{invoice.amount}</td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-lg">download</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
