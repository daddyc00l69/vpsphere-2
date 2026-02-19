"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
    // const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300",
            isScrolled
                ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-primary/10 shadow-sm py-2"
                : "bg-transparent border-transparent py-4"
        )}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-white text-xl">deployed_code</span>
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">VPSphere</span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-primary">Features</Link>
                    <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-primary">Pricing</Link>
                    <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-primary">Docs</Link>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors dark:text-slate-300 dark:hover:text-primary">Login</Link>
                    <Link href="/signup" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
