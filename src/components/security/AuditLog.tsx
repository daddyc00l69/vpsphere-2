"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AuditEvent {
    id: string;
    event: string;
    desc: string;
    icon: string;
    color: string;
    ip: string;
    location: string;
    device: string;
    timestamp: string;
    status: "Success" | "Warning" | "Error";
}

export function AuditLog() {
    const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

    const events: AuditEvent[] = [
        { id: "1", event: "Successful Login", desc: "Account access granted", icon: "login", color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30", ip: "82.145.2.10", location: "London, UK", device: "Chrome on macOS", timestamp: "Oct 24, 2023, 14:22", status: "Success" },
        { id: "2", event: "API Key Generated", desc: "Production environment key", icon: "key", color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30", ip: "82.145.2.10", location: "London, UK", device: "VPSphere CLI v2.4", timestamp: "Oct 24, 2023, 11:05", status: "Success" },
        { id: "3", event: "Failed Login Attempt", desc: "Invalid credentials", icon: "lock_reset", color: "text-red-600 bg-red-100 dark:bg-red-900/30", ip: "103.44.112.9", location: "Mumbai, IN", device: "Firefox on Windows", timestamp: "Oct 23, 2023, 23:45", status: "Error" },
        { id: "4", event: "Password Changed", desc: "Security requirement", icon: "password", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30", ip: "82.145.2.10", location: "London, UK", device: "Safari on iPhone", timestamp: "Oct 22, 2023, 09:15", status: "Success" },
    ];

    return (
        <div className="relative flex h-full">
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Device / Browser</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {events.map((evt) => (
                            <tr key={evt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer" onClick={() => setSelectedEvent(evt)}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("size-8 rounded-full flex items-center justify-center", evt.color)}>
                                            <span className="material-symbols-outlined text-[18px]">{evt.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{evt.event}</p>
                                            <p className="text-xs text-slate-500">{evt.desc}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{evt.ip}</p>
                                        <p className="text-xs text-slate-500">{evt.location}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px] text-slate-400">laptop_mac</span>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{evt.device}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{evt.timestamp}</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:text-primary/80 font-semibold text-xs py-1 px-3 rounded-md hover:bg-primary/5 transition-colors">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Slide-out Panel */}
            <div
                className={cn(
                    "absolute inset-y-0 right-0 w-[400px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out z-20 overflow-hidden flex flex-col",
                    selectedEvent ? "translate-x-0" : "translate-x-full"
                )}
            >
                {selectedEvent && (
                    <>
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn("size-10 rounded-xl flex items-center justify-center", selectedEvent.color)}>
                                    <span className="material-symbols-outlined">{selectedEvent.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Event Metadata</h3>
                                    <p className="text-xs text-slate-500">EVT_{selectedEvent.id}_84729</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", selectedEvent.status === "Success" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300")}>{selectedEvent.status}</span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Auth Type</p>
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">MFA (TOTP)</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                                    Raw Payload
                                </h4>
                                <div className="bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-emerald-400 leading-relaxed overflow-x-auto shadow-inner">
                                    <pre>{`{
  "event_id": "${selectedEvent.id}-ae22",
  "client_ip": "${selectedEvent.ip}",
  "isp": "British Telecom",
  "user_agent": "Mozilla/5.0 ...",
  "security": {
    "suspicious": false,
    "vpn_detected": false,
    "mfa_verified": true
  }
}`}</pre>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <button className="w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                                Flag as Suspicious
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
