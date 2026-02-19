import { DocsSidebar } from "@/components/docs/DocsSidebar";
// import Header from "@/components/header";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white">
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[65px] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-xl">cloud_queue</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">VPSphere <span className="text-slate-400 font-medium ml-1">Docs</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg group-focus-within:text-primary transition-colors">search</span>
                            <input className="bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Search documentation..." />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                <span className="text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">⌘</span>
                                <span className="text-[10px] font-bold text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">K</span>
                            </div>
                        </div>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                        <button className="text-sm font-bold text-primary hover:underline">Go to Dashboard</button>
                        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto flex items-start">
                <DocsSidebar />
                <main className="flex-1 min-w-0 px-8 py-10 md:px-12 md:py-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
