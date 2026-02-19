"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    // Breadcrumb logic
    const breadcrumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');

        return (
            <div key={href} className="flex items-center">
                <span className="mx-2 text-slate-300">/</span>
                {isLast ? (
                    <span className="text-slate-900 dark:text-white font-semibold">{name}</span>
                ) : (
                    <Link href={href} className="hover:text-vpsPurple transition-colors">
                        {name}
                    </Link>
                )}
            </div>
        );
    });

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-4">
                <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                    <Link href="/dashboard" className="hover:text-vpsPurple transition-colors">Workspace</Link>
                    {breadcrumbs}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-64 hidden sm:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-vpsPurple/20 focus:outline-none transition-shadow"
                        placeholder="Search... (Cmd+K)"
                        type="text"
                        readOnly // Prevent typing, use modal instead
                        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                    />
                </div>
                <Link href="/new-service">
                    <Button size="sm" className="hidden sm:flex bg-vpsPurple hover:bg-vpsPurple/90 text-white rounded-vps font-bold shadow-lg shadow-vpsPurple/20">
                        <span className="material-symbols-outlined text-lg mr-1">add</span>
                        New Service
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Link href="/docs">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-vpsPurple hover:bg-vpsPurple/10 rounded-full" title="Documentation">
                            <span className="material-symbols-outlined text-xl">menu_book</span>
                        </Button>
                    </Link>
                    <Link href="/support">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-vpsPurple hover:bg-vpsPurple/10 rounded-full" title="Support">
                            <span className="material-symbols-outlined text-xl">help</span>
                        </Button>
                    </Link>
                    <Link href="/status">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-full" title="System Status">
                            <span className="material-symbols-outlined text-xl">monitor_heart</span>
                        </Button>
                    </Link>
                </div>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2"></div>
                <button className="material-symbols-outlined p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    notifications
                </button>
            </div>
        </header>
    );
}
