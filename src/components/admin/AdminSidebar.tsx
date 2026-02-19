"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                    <span className="material-symbols-outlined block">cloud_queue</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">VPSphere</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-4">Main Menu</div>

                <Link
                    href="/admin"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                        isActive("/admin") && pathname === "/admin"
                            ? "bg-primary text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                >
                    <span className="material-symbols-outlined text-[22px]">dashboard</span>
                    <span className="text-sm font-medium">Admin Dashboard</span>
                </Link>

                <Link
                    href="/admin/users"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                        isActive("/admin/users")
                            ? "bg-primary text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                >
                    <span className="material-symbols-outlined text-[22px]">group</span>
                    <span className="text-sm font-medium">User Management</span>
                </Link>

                <Link
                    href="/server-control"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                    <span className="material-symbols-outlined text-[22px]">dns</span>
                    <span className="text-sm font-medium">Server Control</span>
                </Link>

                <Link
                    href="/admin/plans"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                        isActive("/admin/plans")
                            ? "bg-primary text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                >
                    <span className="material-symbols-outlined text-[22px]">payments</span>
                    <span className="text-sm font-medium">Plan Management</span>
                </Link>

                <Link
                    href="/admin/system-logs"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                        isActive("/admin/system-logs")
                            ? "bg-primary text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                >
                    <span className="material-symbols-outlined text-[22px]">article</span>
                    <span className="text-sm font-medium">System Logs</span>
                </Link>

                <Link
                    href="/admin/rate-limits"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                        isActive("/admin/rate-limits")
                            ? "bg-primary text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                >
                    <span className="material-symbols-outlined text-[22px]">speed</span>
                    <span className="text-sm font-medium">Rate Limits</span>
                </Link>

                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-8">Configuration</div>

                <Link
                    href="/admin/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                        isActive("/admin/settings")
                            ? "bg-primary text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                >
                    <span className="material-symbols-outlined text-[22px]">settings</span>
                    <span className="text-sm font-medium">Site Settings</span>
                </Link>
            </nav>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <Link href="/" className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to App
                </Link>
            </div>
        </aside>
    );
}
