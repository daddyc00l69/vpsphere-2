"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
// import { useRouter } from "next/navigation";

import { ROUTES } from "@/config/routes";

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={() => setIsOpen(false)}>
            <div
                className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                    <input
                        autoFocus
                        className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
                        placeholder="Search projects, services, documentation..."
                    />
                    <div className="text-xs font-bold text-slate-400 border border-slate-200 dark:border-slate-800 rounded px-2 py-1">ESC</div>
                </div>
                <div className="p-2">
                    <div className="text-xs font-bold text-slate-500 px-4 py-2 uppercase tracking-wider">Quick Links</div>
                    <Link href={ROUTES.DASHBOARD} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group cursor-pointer">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-vpsPurple">layers</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Dashboard</div>
                            <div className="text-xs text-slate-500">Go to your project overview</div>
                        </div>
                    </Link>
                    <Link href={ROUTES.NEW_SERVICE} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg group cursor-pointer">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-vpsPurple">add</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">New Service</div>
                            <div className="text-xs text-slate-500">Deploy a new application</div>
                        </div>
                    </Link>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-xs text-slate-500 flex justify-between items-center">
                    <span>Search powered by VPSphere</span>
                    <div className="flex gap-4">
                        <span><span className="font-bold">↑↓</span> to navigate</span>
                        <span><span className="font-bold">↵</span> to select</span>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
