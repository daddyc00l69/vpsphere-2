"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

const navItems = [
    { name: "Projects", icon: "layers", href: ROUTES.DASHBOARD },
    { name: "Services", icon: "dns", href: ROUTES.SERVICES },
    { name: "Analytics", icon: "bar_chart", href: ROUTES.ANALYTICS },
    { name: "Deployments", icon: "history", href: ROUTES.DEPLOYMENTS },
    // { name: "Databases", icon: "database", href: ROUTES.DATABASES }, // Placeholder
    // { name: "Env Groups", icon: "account_tree", href: ROUTES.ENV_GROUPS }, // Placeholder
];

const settingsItems = [
    { name: "Support", icon: "help", href: ROUTES.SUPPORT },
    { name: "Referrals", icon: "redeem", href: ROUTES.REFERRALS },
    { name: "Billing", icon: "credit_card", href: ROUTES.BILLING },
    { name: "Team", icon: "group", href: ROUTES.TEAM },
    // { name: "Alerts", icon: "notifications", href: ROUTES.SETTINGS_ALERTS },
    { name: "SSH Keys", icon: "key", href: ROUTES.SSH_KEYS },
    { name: "Sessions", icon: "devices", href: ROUTES.SESSIONS },
    { name: "Audit Log", icon: "security", href: ROUTES.AUDIT_LOG },
    { name: "Settings", icon: "settings", href: ROUTES.SETTINGS },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <aside className="w-[240px] flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full">
            <div className="p-6 flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-xl">cloud_queue</span>
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">VPSphere</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Personal Workspace</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-vps transition-all duration-200 ${isActive(item.href)
                            ? "bg-vpsPurple text-white shadow-md shadow-vpsPurple/20" // Active state
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                    >
                        <span className={`material-symbols-outlined text-lg ${isActive(item.href) ? "text-white" : "text-slate-400"}`}>
                            {item.icon}
                        </span>
                        {item.name}
                    </Link>
                ))}

                <div className="pt-6 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Settings
                </div>

                {settingsItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-vps transition-all duration-200 ${isActive(item.href)
                            ? "bg-vpsPurple text-white shadow-md shadow-vpsPurple/20"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                    >
                        <span className={`material-symbols-outlined text-lg ${isActive(item.href) ? "text-white" : "text-slate-400"}`}>
                            {item.icon}
                        </span>
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left">
                    {/* Placeholder Avatar */}
                    <div className="size-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs" >
                        AR
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-slate-900 dark:text-white">Alex Rivera</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Pro Plan</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-lg">unfold_more</span>
                </button>
            </div>
        </aside>
    );
}
