"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ServiceTabsProps {
    id: string;
}

export function ServiceTabs({ id }: ServiceTabsProps) {
    const pathname = usePathname();
    const baseUrl = `/services/${id}`;

    const tabs = [
        { name: "Overview", path: `${baseUrl}/overview` },
        { name: "Logs", path: `${baseUrl}/logs` },
        { name: "Metrics", path: `${baseUrl}/metrics` },
        { name: "Settings", path: `${baseUrl}/settings` },
    ];

    return (
        <div className="bg-surface-light border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-8">
                <nav className="flex gap-8">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.path || (tab.name === "Overview" && pathname === baseUrl);
                        return (
                            <Link
                                key={tab.name}
                                href={tab.path}
                                className={`px-1 py-4 text-sm font-bold border-b-2 transition-all ${isActive
                                    ? "text-vpsPurple border-vpsPurple"
                                    : "text-slate-500 dark:text-slate-400 hover:text-vpsPurple dark:hover:text-vpsPurple border-transparent"
                                    }`}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
