"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ServiceType = "web" | "static" | "worker" | "private";

export interface ServiceTypeSelectionProps {
  value: ServiceType;
  onChange: (value: ServiceType) => void;
}

type ServiceTypeCard = {
  id: ServiceType;
  title: string;
  description: string;
  icon: string; // material-symbols name (project already uses these)
  badge?: string;
  enabled?: boolean;
};

const CARDS: ServiceTypeCard[] = [
  {
    id: "web",
    title: "Web Service",
    description:
      "Node.js, Python, Go, Ruby, Java, or PHP apps. Automatically builds and deploys your code with a public URL.",
    icon: "public",
    badge: "Popular",
    enabled: true,
  },
  {
    id: "static",
    title: "Static Site",
    description:
      "Fast hosting for React, Vue, Svelte, Vite, and static HTML. Best for front-end performance.",
    icon: "language",
    enabled: false,
  },
  {
    id: "worker",
    title: "Background Worker",
    description:
      "Continuous processes, cron jobs, and task queues. Runs persistently without a public HTTP endpoint.",
    icon: "settings_applications",
    enabled: false,
  },
  {
    id: "private",
    title: "Private Service",
    description:
      "Secure internal services reachable only within your private network. Ideal for internal APIs and microservices.",
    icon: "lock",
    enabled: false,
  },
];

export function ServiceTypeSelection({ value, onChange }: ServiceTypeSelectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          What are you deploying?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Choose the type of service that best fits your needs. You can always change configuration settings later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map((c) => {
          const isSelected = value === c.id;
          const isEnabled = c.enabled !== false;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => isEnabled && onChange(c.id)}
              className={cn(
                "text-left group relative bg-white dark:bg-background-dark border rounded-xl p-6 transition-all",
                isEnabled
                  ? "hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                  : "opacity-60 cursor-not-allowed",
                isSelected
                  ? "border-primary ring-1 ring-primary/25"
                  : "border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary",
              )}
              aria-disabled={!isEnabled}
              title={!isEnabled ? "Coming soon" : undefined}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "size-12 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
                  )}
                >
                  <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{c.title}</h3>
                    {c.badge && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {c.badge}
                      </span>
                    )}
                    {!isEnabled && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

