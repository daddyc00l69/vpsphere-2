"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LogEntry {
    id: string;
    time: string;
    level: "INFO" | "WARN" | "ERROR" | "CRIT" | "DEBUG";
    node: string;
    message: string;
}

const logs: LogEntry[] = [
    { id: "1", time: "2023-11-24 14:02:11", level: "INFO", node: "[NODE-A-12]", message: "System daemon check: all services operational." },
    { id: "2", time: "2023-11-24 14:02:15", level: "INFO", node: "[NODE-B-04]", message: "Ingress controller successfully reloaded configuration hash 0x77ae." },
    { id: "3", time: "2023-11-24 14:03:02", level: "WARN", node: "[NODE-A-12]", message: "Resource usage alert: CPU core #3 exceeding 85% threshold (currently 89.2%)." },
    { id: "4", time: "2023-11-24 14:03:10", level: "INFO", node: "[NODE-C-01]", message: "Docker daemon event: container 'app-worker-primary' health check passed." },
    { id: "5", time: "2023-11-24 14:03:45", level: "INFO", node: "[NODE-A-09]", message: "SSL certificate rotation initiated for domain *.vpsphere.cloud." },
    { id: "6", time: "2023-11-24 14:04:12", level: "CRIT", node: "[NODE-B-07]", message: "Storage partition /var/lib/docker reached 98% capacity. Immediate cleanup required." },
    { id: "7", time: "2023-11-24 14:04:22", level: "INFO", node: "[NODE-A-12]", message: "Automatic resource balancing: migrating container workload 'cache-node-1' to Cluster-B." },
    { id: "8", time: "2023-11-24 14:04:55", level: "INFO", node: "[NODE-C-01]", message: "Kubernetes scheduler: pod 'api-v2-774df' successfully assigned to worker-3." },
    { id: "9", time: "2023-11-24 14:05:01", level: "DEBUG", node: "[SYSTEM]", message: "Heartbeat packet received from gateway-main-vip." },
];

export function SystemLogConsole() {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Moved logs to top level variable


    const getLevelColor = (level: string) => {
        switch (level) {
            case "INFO": return "text-blue-400";
            case "WARN": return "text-amber-500";
            case "ERROR": return "text-red-400";
            case "CRIT": return "text-red-500 font-bold";
            case "DEBUG": return "text-slate-400";
            default: return "text-slate-300";
        }
    };

    const getRowStyle = (level: string) => {
        if (level === "WARN") return "bg-amber-500/10 -mx-4 px-4 border-l-2 border-amber-500";
        if (level === "CRIT") return "bg-red-500/10 -mx-4 px-4 border-l-2 border-red-500";
        return "";
    };

    useEffect(() => {
        if (!isPaused && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [isPaused]);

    return (
        <div className="flex-1 bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-sm relative h-full">
            {/* Console Header */}
            <div className="bg-[#242424] px-4 py-2 flex items-center justify-between border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="size-2.5 rounded-full bg-red-500/50"></div>
                        <div className="size-2.5 rounded-full bg-amber-500/50"></div>
                        <div className="size-2.5 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-[11px] text-slate-500 ml-2 font-medium tracking-tight uppercase">root@vps-fleet-01:~/infrastructure</span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                    <span>Encoding: UTF-8</span>
                    <span>Lines: 1,492</span>
                </div>
            </div>

            {/* Log Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-slate-300 leading-relaxed">
                {logs.map((log) => (
                    <div key={log.id} className={cn("flex gap-4 mb-1", getRowStyle(log.level))}>
                        <span className="text-slate-600 flex-shrink-0 select-none">{log.time}</span>
                        <span className={cn("font-bold w-12 flex-shrink-0", getLevelColor(log.level))}>{log.level}</span>
                        <span className="text-slate-500 w-24 flex-shrink-0">{log.node}</span>
                        <p>{log.message}</p>
                    </div>
                ))}
                <div className="flex gap-4 mt-2" ref={scrollRef}>
                    <span className="text-primary font-bold">_</span>
                    <p className="text-primary animate-pulse">{isPaused ? "Stream paused" : "Streaming live events..."}</p>
                </div>
            </div>

            {/* Sticky Bottom Control */}
            {!isPaused && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <button
                        onClick={() => setIsPaused(true)}
                        className="bg-primary hover:bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-sm">pause</span>
                        Pause Stream
                    </button>
                </div>
            )}
            {isPaused && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <button
                        onClick={() => setIsPaused(false)}
                        className="bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-sm">play_arrow</span>
                        Resume Stream
                    </button>
                </div>
            )}
        </div>
    );
}
