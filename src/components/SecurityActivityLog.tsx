"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AuditLog {
    id: number;
    ip_address: string;
    user_agent: string;
    event: string;
    created_at: string;
}

export default function SecurityActivityLog() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.devtushar.uk";
            const res = await fetch(`${apiUrl}/auth/audit-logs`, { credentials: "include" });
            const data = await res.json();
            if (res.ok) {
                setLogs(data);
            } else {
                toast.error("Failed to load audit logs");
            }
        } catch {
            toast.error("Error loading security history");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (ds: string) => {
        const d = new Date(ds);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const getIconDetails = (event: string) => {
        switch (event.toLowerCase()) {
            case 'success':
            case 'success_2fa':
                return { icon: 'login', color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30', label: 'Successful Login' };
            case 'failed':
            case 'failed_2fa':
            case 'failed_unverified':
                return { icon: 'lock_reset', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30', label: 'Failed Login Attempt' };
            case 'locked':
                return { icon: 'warning', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30', label: 'Account Locked' };
            case 'pending_2fa':
                return { icon: 'key', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30', label: '2FA Challenged' };
            default:
                return { icon: 'shield', color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-900/30', label: 'Security Event' };
        }
    };

    const parseDevice = (ua: string) => {
        if (!ua) return { icon: 'public', text: 'Unknown Browser' };
        const u = ua.toLowerCase();
        if (u.includes('mac') && u.includes('safari') && !u.includes('chrome')) return { icon: 'laptop_mac', text: 'Safari on macOS' };
        if (u.includes('mac') && u.includes('chrome')) return { icon: 'laptop_mac', text: 'Chrome on macOS' };
        if (u.includes('windows') && u.includes('chrome')) return { icon: 'laptop_windows', text: 'Chrome on Windows' };
        if (u.includes('iphone')) return { icon: 'smartphone', text: 'iPhone Browser' };
        if (u.includes('android')) return { icon: 'smartphone', text: 'Android Browser' };
        return { icon: 'public', text: ua.substring(0, 30) + '...' };
    };

    if (loading) return <div className="text-sm text-slate-500 p-6 flex justify-center"><div className="animate-spin size-6 border-b-2 border-primary rounded-full"></div></div>;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security Activity Audit Log</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Review all connection attempts and access logs for your account.</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Event</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">IP Location</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Device</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {logs.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 text-sm">No recent activity found.</td></tr>
                        ) : logs.map((log) => {
                            const ui = getIconDetails(log.event);
                            const device = parseDevice(log.user_agent);
                            return (
                                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`size-8 rounded-full flex items-center justify-center ${ui.bg} ${ui.color}`}>
                                                <span className="material-symbols-outlined text-[18px]">{ui.icon}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{ui.label}</p>
                                                <p className="text-xs text-slate-500 uppercase">{log.event}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{log.ip_address}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[20px] text-slate-400">{device.icon}</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{device.text}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{formatDate(log.created_at)}</p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 font-medium tracking-tight uppercase">Showing up to 20 recent events</p>
            </div>
        </div>
    );
}
