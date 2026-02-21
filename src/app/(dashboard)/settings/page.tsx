"use client";

import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SecurityActivityLog from "@/components/SecurityActivityLog";

export default function SettingsPage() {
    const [is2FASetupVisible, setIs2FASetupVisible] = useState(false);
    const [qrCode, setQrCode] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [verifyPin, setVerifyPin] = useState("");
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const generate2FA = async () => {
        try {
            const token = localStorage.getItem("vpsphere_token") || "";
            const res = await fetch("https://api.devtushar.uk/auth/2fa/generate", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setQrCode(data.qrcode);
                setSecretCode(data.secret);
                setIs2FASetupVisible(true);
            } else {
                toast.error(data.error || "Failed to generate 2FA");
            }
        } catch { toast.error("An error occurred mapping 2FA"); }
    };

    const verifySetup2FA = async () => {
        try {
            const token = localStorage.getItem("vpsphere_token");
            const res = await fetch("https://api.devtushar.uk/auth/2fa/verify-setup", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: verifyPin })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("2FA Successfully Enabled!");
                setIs2FAEnabled(true);
                setIs2FASetupVisible(false);
            } else {
                toast.error(data.error || "Invalid verification code");
            }
        } catch { toast.error("An error occurred verifying 2FA"); }
    };
    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide pb-32">
                {/* Page Title */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Account Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your profile, security preferences, and developer tools.</p>
                </div>

                {/* Profile Information */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal details and public profile.</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center">
                                    <span className="text-2xl font-bold text-slate-400">AR</span>
                                </div>
                                <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 shadow-md border border-slate-200 dark:border-slate-600 size-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <Button>Upload New Photo</Button>
                                <Button variant="secondary">Remove</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</label>
                                <Input defaultValue="Alex Thompson" type="text" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email Address</label>
                                <Input defaultValue="alex.thompson@vpsphere.dev" type="email" />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your password and account protection.</p>
                    </div>
                    <div className="p-6 space-y-8">
                        {/* Change Password */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                <span className="material-symbols-outlined text-primary text-lg">lock</span>
                                Change Password
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Current Password</label>
                                    <Input placeholder="••••••••" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">New Password</label>
                                    <Input placeholder="••••••••" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Confirm New Password</label>
                                    <Input placeholder="••••••••" type="password" />
                                </div>
                            </div>
                            <Button variant="secondary">Update Password</Button>
                        </div>
                        <hr className="border-slate-200 dark:border-slate-800" />
                        {/* 2FA */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-xl">verified_user</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">Two-Factor Authentication</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Secure your account with a mobile authenticator app.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {is2FAEnabled ? (
                                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">Enabled</span>
                                    ) : (
                                        <Button onClick={generate2FA}>Configure</Button>
                                    )}
                                </div>
                            </div>

                            {/* Setup Panel */}
                            {is2FASetupVisible && !is2FAEnabled && (
                                <div className="mt-4 p-6 bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-xl flex items-start flex-col md:flex-row gap-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {qrCode && <img src={qrCode} alt="2FA QR Code" className="w-32 h-32 rounded-lg object-contain bg-white p-2 border border-slate-200 shadow-sm" />}
                                    <div className="flex flex-col gap-3 flex-1">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Scan this QR Code</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Scan the QR code with Google Authenticator or your preferred 2FA app. If you can&apos;t scan it, enter this text code manually: <b className="tracking-widest font-mono text-primary bg-primary/10 px-2 py-1 rounded select-all">{secretCode}</b></p>
                                        <div className="flex gap-2 items-center mt-2 w-full max-w-[360px]">
                                            <Input
                                                className="max-w-[140px] text-center tracking-[0.5em] font-mono font-bold"
                                                placeholder="000000"
                                                maxLength={6}
                                                value={verifyPin}
                                                onChange={e => setVerifyPin(e.target.value.replace(/[^0-9]/g, ''))}
                                            />
                                            <Button onClick={verifySetup2FA}>Verify</Button>
                                            <Button variant="ghost" onClick={() => setIs2FASetupVisible(false)}>Cancel</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <SecurityActivityLog />

                {/* SSH Keys Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">SSH Keys</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Access your VPS instances securely via SSH.</p>
                        </div>
                        <Button size="sm">
                            <span className="material-symbols-outlined text-sm">add</span>
                            Add SSH Key
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    {["Name", "Fingerprint", "Added", "Action"].map((h, i) => (
                                        <th key={i} className={`px-6 py-3 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 ${h === "Action" ? "text-right" : ""}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-sm text-slate-900 dark:text-white">MacBook Pro M2</td>
                                    <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">SHA256:f7:71:0d:51...e3:11</td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Oct 24, 2023</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-sm text-slate-900 dark:text-white">Office Desktop</td>
                                    <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">SHA256:4a:c2:91:00...5a:22</td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Jan 12, 2024</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Spacer for fixed footer */}
                <div className="h-20"></div>
            </div>

            {/* Save/Reset Bar */}
            <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 fixed bottom-0 left-0 md:left-64 right-0 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] flex justify-end gap-3 z-10">
                <Button variant="ghost">Cancel</Button>
                <Button className="shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Save All Changes</Button>
            </div>
        </div>
    );
}
