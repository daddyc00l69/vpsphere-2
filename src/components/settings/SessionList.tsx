"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Session {
    id: string;
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    isCurrent: boolean;
    icon: string;
}

const MOCK_SESSIONS: Session[] = [
    {
        id: "1",
        device: "MacBook Pro",
        browser: "Chrome 120.0",
        location: "San Francisco, US",
        ip: "192.168.1.1",
        lastActive: "Now",
        isCurrent: true,
        icon: "laptop_mac"
    },
    {
        id: "2",
        device: "iPhone 15 Pro",
        browser: "Safari Mobile",
        location: "San Francisco, US",
        ip: "192.168.1.5",
        lastActive: "2 hours ago",
        isCurrent: false,
        icon: "smartphone"
    },
    {
        id: "3",
        device: "Windows Desktop",
        browser: "Firefox 121.0",
        location: "New York, US",
        ip: "10.0.0.42",
        lastActive: "3 days ago",
        isCurrent: false,
        icon: "desktop_windows"
    }
];

export function SessionList() {
    const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
    const [revokingId, setRevokingId] = useState<string | null>(null);

    const handleRevoke = async (id: string) => {
        setRevokingId(id);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setSessions(prev => prev.filter(s => s.id !== id));
        setRevokingId(null);
    };

    return (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.map((session) => (
                    <div key={session.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`size-10 rounded-full flex items-center justify-center ${session.isCurrent ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                <span className="material-symbols-outlined">{session.icon}</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{session.device}</h4>
                                    {session.isCurrent && (
                                        <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider">
                                            Current Device
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                                    <span>{session.browser}</span>
                                    <span>•</span>
                                    <span>{session.location}</span>
                                    <span>•</span>
                                    <span className="font-mono">{session.ip}</span>
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Active: {session.lastActive}
                                </p>
                            </div>
                        </div>

                        {!session.isCurrent && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                                onClick={() => handleRevoke(session.id)}
                                disabled={!!revokingId}
                            >
                                {revokingId === session.id ? (
                                    <span className="material-symbols-outlined animate-spin text-lg">refresh</span>
                                ) : (
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-lg">block</span>
                                        <span className="text-xs font-bold">Revoke</span>
                                    </div>
                                )}
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            {sessions.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No active sessions found.
                </div>
            )}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 text-center border-t border-slate-200 dark:border-slate-800">
                Revoking a session will immediately sign out the user from that device.
            </div>
        </Card>
    );
}
