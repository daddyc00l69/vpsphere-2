"use client";

import { motion } from "framer-motion";

export function HeroPreview() {
    return (
        <div className="relative mx-auto max-w-5xl mt-16 perspective-[2000px]">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-vpsPurple to-vpsIndigo rounded-xl blur opacity-20 animate-pulse"></div>

            <motion.div
                initial={{ rotateX: 20, y: 100, opacity: 0 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden"
            >
                {/* Browser Toolbar */}
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="size-3 rounded-full bg-red-500"></div>
                        <div className="size-3 rounded-full bg-amber-500"></div>
                        <div className="size-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-400 font-mono flex-1 text-center max-w-sm mx-auto flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[10px]">lock</span>
                        dashboard.devtushar.uk
                    </div>
                </div>

                {/* Content Preview (Mock Dashboard) */}
                <div className="p-6 grid grid-cols-4 gap-4 bg-slate-950">
                    {/* Sidebar */}
                    <div className="col-span-1 space-y-2 hidden sm:block">
                        <div className="h-8 w-24 bg-slate-800 rounded-md mb-6"></div>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-8 w-full bg-slate-900 rounded-md"></div>
                        ))}
                    </div>
                    {/* Main Content */}
                    <div className="col-span-4 sm:col-span-3 space-y-4">
                        <div className="flex justify-between">
                            <div className="h-8 w-32 bg-slate-800 rounded-md"></div>
                            <div className="h-8 w-8 bg-vpsPurple rounded-md"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2">
                                    <div className="size-8 bg-emerald-500/10 rounded-full"></div>
                                    <div className="h-3 w-16 bg-slate-800 rounded"></div>
                                </div>
                            ))}
                        </div>
                        <div className="h-48 bg-slate-900 border border-slate-800 rounded-lg"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
