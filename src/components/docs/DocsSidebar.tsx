"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const docsNav = [
    {
        title: "Getting Started",
        items: [
            { name: "Introduction", href: "/docs" },
            { name: "Quick Start", href: "/docs/quick-start" },
            { name: "Authentication", href: "/docs/authentication" },
        ],
    },
    {
        title: "Core Concepts",
        items: [
            { name: "Projects & Environments", href: "/docs/projects" },
            { name: "Services", href: "/docs/services" },
            { name: "Networking", href: "/docs/networking" },
            { name: "Variables & Secrets", href: "/docs/variables" },
        ],
    },
    {
        title: "API Reference",
        items: [
            { name: "Deployments API", href: "/docs/api/deployments" },
            { name: "Domains API", href: "/docs/api/domains" },
            { name: "Databases API", href: "/docs/api/databases" },
        ],
    },
];

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto sticky top-[65px] h-[calc(100vh-65px)]">
            <div className="p-6 space-y-8">
                {docsNav.map((section) => (
                    <div key={section.title}>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">{section.title}</h4>
                        <ul className="space-y-2 border-l border-slate-100 dark:border-slate-800 ml-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block pl-4 py-1 text-sm border-l -ml-[1px] transition-colors",
                                                isActive
                                                    ? "border-primary text-primary font-bold"
                                                    : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
}
