import React from "react";
import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Background - Blurred Dashboard */}
            <div className="absolute inset-0 z-0 blur-sm opacity-50 pointer-events-none scale-105">
                <div className="flex h-screen w-full">
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
                        <Header />
                        <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                            {/* Mock Content */}
                            <div className="h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"></div>
                            <div className="h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"></div>
                            <div className="h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"></div>
                            <div className="col-span-3 h-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-background-dark/40 backdrop-blur-sm" />

            {/* Main Content (Modal) */}
            <div className="relative z-50 flex items-center justify-center min-h-screen p-4">
                {children}
            </div>
        </div>
    );
}
