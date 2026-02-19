"use client";

import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faqData = [
    {
        category: "General",
        items: [
            { q: "How do I deploy my first application?", a: "Navigate to the dashboard and click 'New Deployment'. You can connect your GitHub account or deploy from a template." },
            { q: "What regions are available?", a: "We currently support US East (N. Virginia), EU West (London), and Asia Pacific (Singapore)." },
        ]
    },
    {
        category: "Billing",
        items: [
            { q: "How does billing work?", a: "We bill hourly for resource usage. You are invoiced at the end of each month." },
            { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from the billing settings page without penalty." },
        ]
    },
    {
        category: "Technical",
        items: [
            { q: "How do I configure custom domains?", a: "Go to your project settings, select 'Domains', and follow the instructions to add your custom domain and configure DNS records." },
            { q: "Do you support Docker Compose?", a: "Yes, you can deploy multi-container applications using a generic docker-compose.yml file." },
        ]
    }
];

export function FAQSection() {
    const [search, setSearch] = useState("");

    const filteredFAQs = faqData.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="space-y-8">
            <div className="relative max-w-xl mx-auto">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <Input
                    placeholder="Search for help..."
                    className="pl-10 h-12 text-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid gap-6">
                {filteredFAQs.map((category, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                            {category.category}
                        </h3>
                        <Accordion type="single" collapsible className="w-full">
                            {category.items.map((item, i) => (
                                <AccordionItem key={i} value={`item-${idx}-${i}`}>
                                    <AccordionTrigger className="text-left font-medium text-slate-700 dark:text-slate-200 hover:no-underline hover:text-primary">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}

                {filteredFAQs.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        <span className="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span>
                        <p>No results found for &quot;{search}&quot;</p>
                    </div>
                )}
            </div>

            <div className="fixed bottom-8 right-8 z-50">
                <Button className="rounded-full shadow-2xl h-14 px-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg gap-2">
                    <span className="material-symbols-outlined">chat</span>
                    Contact Support
                </Button>
            </div>
        </div>
    );
}

