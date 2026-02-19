"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-slate-400">rocket_launch</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No services deployed yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8">
                Get started by deploying your first application. It only takes a few minutes.
            </p>
            <Link href={ROUTES.NEW_SERVICE}>
                <Button className="bg-vpsPurple hover:bg-vpsPurple/90 text-white rounded-vps font-bold shadow-lg shadow-vpsPurple/20">
                    <span className="material-symbols-outlined text-lg mr-2">add</span>
                    Deploy New Service
                </Button>
            </Link>
        </div>
    );
}
