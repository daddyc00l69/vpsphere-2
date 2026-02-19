"use client";

export function TableOfContents() {
    return (
        <aside className="hidden xl:block w-64 shrink-0 p-6 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
            <h5 className="font-bold text-slate-900 dark:text-white mb-4 text-xs uppercase tracking-wider">On this page</h5>
            <ul className="space-y-3 text-sm">
                <li>
                    <a href="#introduction" className="text-primary font-medium block">Introduction</a>
                </li>
                <li>
                    <a href="#base-url" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 block">Base URL</a>
                </li>
                <li>
                    <a href="#authentication" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 block">Authentication</a>
                </li>
                <li>
                    <a href="#rate-limits" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 block">Rate Limits</a>
                </li>
                <li>
                    <a href="#pagination" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 block">Pagination</a>
                </li>
                <li>
                    <a href="#errors" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 block">Errors</a>
                </li>
            </ul>
        </aside>
    );
}
