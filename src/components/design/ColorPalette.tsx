"use client";

import { Card } from "@/components/ui/card";

export function ColorPalette() {
    const colors = [
        {
            name: "Primary (Purple)",
            shades: [
                { name: "50", class: "bg-vpsPurple/5" },
                { name: "100", class: "bg-vpsPurple/10" },
                { name: "200", class: "bg-vpsPurple/20" },
                { name: "500", class: "bg-vpsPurple" },
                { name: "600", class: "bg-vpsPurple/90" },
                { name: "900", class: "bg-vpsIndigo" },
            ]
        },
        {
            name: "Secondary (Slate)",
            shades: [
                { name: "50", class: "bg-slate-50" },
                { name: "100", class: "bg-slate-100" },
                { name: "200", class: "bg-slate-200" },
                { name: "500", class: "bg-slate-500" },
                { name: "800", class: "bg-slate-800" },
                { name: "900", class: "bg-slate-900" },
            ]
        },
        {
            name: "Status",
            shades: [
                { name: "Success", class: "bg-emerald-500" },
                { name: "Warning", class: "bg-amber-500" },
                { name: "Error", class: "bg-red-500" },
                { name: "Info", class: "bg-blue-500" },
            ]
        }
    ];

    return (
        <Card className="p-6 space-y-8">
            <h3 className="text-xl font-bold dark:text-white mb-4">Color Palette</h3>
            <div className="space-y-8">
                {colors.map((color) => (
                    <div key={color.name}>
                        <h4 className="font-medium text-sm text-slate-500 uppercase tracking-wider mb-3">{color.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {color.shades.map((shade) => (
                                <div key={shade.name} className="space-y-2">
                                    <div className={`h-16 w-full rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 ${shade.class}`}></div>
                                    <div className="text-xs">
                                        <p className="font-bold text-slate-900 dark:text-white">{shade.name}</p>
                                        <p className="text-slate-400 font-mono">{shade.class.replace('bg-', '')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
