"use client";

import { Card } from "@/components/ui/card";

export function TypographyScale() {
    return (
        <Card className="p-6 space-y-8">
            <h3 className="text-xl font-bold dark:text-white mb-4">Typography</h3>

            <div className="space-y-8">
                <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Heading 1</span>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">The quick brown fox jumps over the lazy dog</h1>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Heading 2</span>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">The quick brown fox jumps over the lazy dog</h2>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Heading 3</span>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">The quick brown fox jumps over the lazy dog</h3>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Heading 4</span>
                        <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">The quick brown fox jumps over the lazy dog</h4>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Body Large</span>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Immersive interfaces require a delicate balance of typography. The quick brown fox jumps over the lazy dog.
                        </p>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Body</span>
                        <p className="text-base text-slate-600 dark:text-slate-300">
                            Immersive interfaces require a delicate balance of typography. The quick brown fox jumps over the lazy dog.
                        </p>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Small</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Immersive interfaces require a delicate balance of typography. The quick brown fox jumps over the lazy dog.
                        </p>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Tiny</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Immersive interfaces require a delicate balance of typography. The quick brown fox jumps over the lazy dog.
                        </p>
                    </div>
                    <div className="flex items-baseline gap-8">
                        <span className="w-24 text-xs font-mono text-slate-400">Mono</span>
                        <code className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-200">
                            const vps = new VPSphere();
                        </code>
                    </div>
                </div>
            </div>
        </Card>
    );
}
