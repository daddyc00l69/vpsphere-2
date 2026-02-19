"use client";

import Header from "@/components/header";
import { ColorPalette } from "@/components/design/ColorPalette";
import { TypographyScale } from "@/components/design/TypographyScale";
import { ComponentShowcase } from "@/components/design/ComponentShowcase";

export default function DesignSystemPage() {
    return (
        <div className="flex flex-col min-h-screen bg-vpsBackground dark:bg-background-dark">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 space-y-12 pb-32">
                <div className="space-y-4 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-vpsPurple/10 text-vpsPurple px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-vpsPurple/20">
                        <span className="material-symbols-outlined text-sm">palette</span>
                        Design System
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        Visual Source of Truth
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">
                        The core design tokens, components, and patterns that power the VPSphere interface.
                        Designed for clarity, performance, and aesthetic excellence.
                    </p>
                </div>

                <div className="grid gap-12">
                    <section id="colors">
                        <ColorPalette />
                    </section>

                    <section id="typography">
                        <TypographyScale />
                    </section>

                    <section id="components">
                        <ComponentShowcase />
                    </section>
                </div>
            </main>
        </div>
    );
}
