"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TerminalProps {
    className?: string;
    logs?: string[];
    title?: string;
}

export function Terminal({ className, logs: externalLogs, title }: TerminalProps) {
    const [mounted, setMounted] = useState(false);
    const [internalLogs] = useState([
        { time: "14:30:01", type: "INFO", msg: "Docker engine heartbeat successful. All nodes responding.", color: "text-green-400" },
        { time: "14:30:05", type: "INFO", msg: "Pulling image 'node:18-alpine' for service auth-api-v2...", color: "text-green-400" },
        { time: "14:31:12", type: "WARN", msg: "High memory usage detected on node-east-01 (88%). Scaling recommended.", color: "text-amber-400" },
        { time: "14:32:00", type: "INFO", msg: "Auto-balancing fleet distribution across 3 availability zones.", color: "text-green-400" },
        { time: "14:32:45", type: "ERROR", msg: "Connection timeout to postgres-db-replica-01. Retrying in 5s...", color: "text-red-400" },
        { time: "14:33:10", type: "INFO", msg: "User 'dev-ops-02' updated limits for container 'worker-node-01'.", color: "text-green-400" },
    ]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [logsWithTimes, setLogsWithTimes] = useState<{ time: string; type: string; msg: string; color: string }[]>([]);

    useEffect(() => {
        if (!mounted) return;

        if (!externalLogs) {
            setLogsWithTimes(internalLogs);
            return;
        }

        // Only add times to new logs that aren't already processed
        if (externalLogs.length > logsWithTimes.length) {
            const currentTime = new Date().toLocaleTimeString();
            const newLogs = externalLogs.slice(logsWithTimes.length).map(msg => ({
                time: currentTime,
                type: msg.includes("ERROR") ? "ERROR" : "INFO",
                msg: msg.replace(/\[.*?\]\s*/, ""),
                color: msg.includes("ERROR") ? "text-red-400" : "text-green-400"
            }));
            setLogsWithTimes(prev => [...prev, ...newLogs]);
        }
    }, [externalLogs, mounted, internalLogs, logsWithTimes.length]);

    const displayLogs = logsWithTimes;

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayLogs]);

    return (
        <div className={cn("bg-[#111022] rounded-xl border border-white/10 overflow-hidden flex flex-col h-64 shadow-2xl", className)}>
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">terminal</span>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                        {title || "Global System Logs"}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 text-[10px]">
                        <span className="text-green-400">● INFO</span>
                        <span className="text-amber-400">● WARN</span>
                        <span className="text-red-400">● ERROR</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-lg cursor-pointer hover:text-white">close_fullscreen</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed bg-black/20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="space-y-1">
                    {displayLogs.map((log, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="text-slate-600 shrink-0 select-none">{log.time}</span>
                            <span className={`${log.color} font-bold shrink-0 w-12 text-center`}>[{log.type}]</span>
                            <span className="text-slate-300">{log.msg}</span>
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <span className="text-green-500 animate-pulse">_</span>
                    </div>
                    <div ref={bottomRef} />
                </div>
            </div>
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center gap-2">
                <span className="text-primary font-bold font-mono text-xs">&gt;</span>
                <input
                    className="bg-transparent border-none p-0 text-xs font-mono text-slate-300 focus:ring-0 w-full placeholder:text-slate-600 outline-none"
                    placeholder="Type a command (e.g. docker ps --all)"
                    type="text"
                />
            </div>
        </div>
    );
}
