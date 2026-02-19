"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <div className="flex h-screen bg-vpsBackground dark:bg-slate-950">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
                <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-2 font-black text-white tracking-tight">
                        <span className="bg-vpsPurple text-white p-1 rounded">VP</span>
                        <span>ADMIN</span>
                    </div>
                </div>

                <div className="p-4 space-y-1 overflow-y-auto flex-1">
                    <div className="px-2 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Management
                    </div>
                    <Link href="/admin/plans">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${isActive('/admin/plans') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <span className="material-symbols-outlined mr-3">payments</span>
                            Plans & Pricing
                        </Button>
                    </Link>
                    <Link href="/admin/users">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${isActive('/admin/users') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <span className="material-symbols-outlined mr-3">group</span>
                            Users
                        </Button>
                    </Link>
                    <Link href="/admin/audit">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${isActive('/admin/audit') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <span className="material-symbols-outlined mr-3">manage_search</span>
                            Audit Logs
                        </Button>
                    </Link>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-950">
                    <Link href="/dashboard">
                        <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                            <span className="material-symbols-outlined mr-2">logout</span>
                            Exit Admin
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {pathname === '/admin/plans' ? 'Plan Management' : 'Admin Console'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">Administrator Access</span>
                        <div className="size-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
