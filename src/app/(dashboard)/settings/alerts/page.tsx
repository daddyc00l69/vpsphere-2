"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AlertsSettingsPage() {
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [slackEnabled, setSlackEnabled] = useState(false);
    const [webhookEnabled, setWebhookEnabled] = useState(true);

    return (
        <div className="flex flex-col h-full font-display max-w-5xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Alerts & Notifications</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage how and when you receive critical system updates.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Notification Channels */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Contact Methods */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                            <h3 className="font-bold text-slate-900 dark:text-white">Notification Channels</h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {/* Email */}
                            <div className="p-6 flex items-start gap-4">
                                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">mail</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">Email Notifications</h4>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input checked={emailEnabled} onChange={() => setEmailEnabled(!emailEnabled)} className="peer sr-only" type="checkbox" />
                                            <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Receive digests and critical alerts to your registered email address.</p>
                                    <div className="flex items-center gap-2">
                                        <input disabled={!emailEnabled} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 disabled:opacity-50" value="admin@vpsphere.cloud" readOnly />
                                        <button disabled={!emailEnabled} className="text-sm font-bold text-primary hover:underline disabled:opacity-50">Change</button>
                                    </div>
                                </div>
                            </div>

                            {/* Slack */}
                            <div className="p-6 flex items-start gap-4">
                                <div className="size-10 rounded-full bg-[#4A154B]/10 dark:bg-[#4A154B]/30 flex items-center justify-center shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-slack-logo-icon-download-in-svg-png-gif-file-formats--new-company-brand-brands-pack-logos-icons-2752057.png?f=webp&w=128" alt="Slack" className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">Slack Integration</h4>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input checked={slackEnabled} onChange={() => setSlackEnabled(!slackEnabled)} className="peer sr-only" type="checkbox" />
                                            <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Post messages to a specific Slack channel when incidents occur.</p>
                                    {!slackEnabled ? (
                                        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                            <span className="material-symbols-outlined text-sm">add_link</span>
                                            Connect Workspace
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 text-sm text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg inline-flex">
                                            <span className="material-symbols-outlined text-sm">check_circle</span>
                                            Connected to #ops-alerts
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Webhook */}
                            <div className="p-6 flex items-start gap-4">
                                <div className="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">webhook</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">Custom Webhook</h4>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input checked={webhookEnabled} onChange={() => setWebhookEnabled(!webhookEnabled)} className="peer sr-only" type="checkbox" />
                                            <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                        </label>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Send JSON payloads to an external URL for specific events.</p>
                                    <div className={cn("transition-opacity", !webhookEnabled && "opacity-50 pointer-events-none")}>
                                        <div className="flex gap-2">
                                            <input className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-slate-600 dark:text-slate-300" placeholder="https://api.your-domain.com/webhooks/vps" defaultValue="https://hooks.zapier.com/v1/..." />
                                            <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700">Test</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alert Rules */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 dark:text-white">Global Alert Rules</h3>
                            <button className="text-xs font-bold text-primary hover:underline">+ Add New Rule</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-amber-500">memory</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">High CPU Usage</p>
                                        <p className="text-xs text-slate-500">Trigger when load {'>'} 90% for 5m</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Critical</span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input defaultChecked className="peer sr-only" type="checkbox" />
                                        <div className="peer h-5 w-9 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-red-500">storage</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Low Disk Space</p>
                                        <p className="text-xs text-slate-500">Trigger when free space {'<'} 10GB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Warning</span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input defaultChecked className="peer sr-only" type="checkbox" />
                                        <div className="peer h-5 w-9 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-blue-500">payments</span>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Billing Threshold</p>
                                        <p className="text-xs text-slate-500">Trigger when monthly spend {'>'} $500</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">Info</span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input className="peer sr-only" type="checkbox" />
                                        <div className="peer h-5 w-9 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Alert History */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm h-fit">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                        <h3 className="font-bold text-slate-900 dark:text-white">Recent Alerts</h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {[
                            { time: '2m ago', title: 'High CPU on Node-01', desc: 'CPU usage spiked to 94% for 5 minutes.', type: 'critical' },
                            { time: '1h ago', title: 'Backup Successful', desc: 'Daily snapshot completed for all volumes.', type: 'success' },
                            { time: '3h ago', title: 'Deployment Failed', desc: 'Service "api-gateway" failed health check.', type: 'error' },
                            { time: '1d ago', title: 'New Login', desc: 'Login from new IP 192.168.1.1', type: 'info' }
                        ].map((alert, i) => (
                            <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">{alert.title}</span>
                                    <span className="text-[10px] text-slate-400">{alert.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{alert.desc}</p>
                                <div className="flex">
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                                        alert.type === 'critical' && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                                        alert.type === 'success' && "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                                        alert.type === 'error' && "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                                        alert.type === 'info' && "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                                    )}>
                                        {alert.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-center">
                        <button className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">View Alert History</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
