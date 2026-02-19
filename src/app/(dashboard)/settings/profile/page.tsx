"use client";

import { useState } from "react";

export default function UserProfilePage() {
    const [name, setName] = useState("Alex Rivera");
    const [email, setEmail] = useState("alex@example.com");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage your account details and preferences.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
                {/* Avatar Section */}
                <div className="p-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Profile Picture</h3>
                    <div className="flex items-center gap-8">
                        <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer group relative overflow-hidden">
                            {/* Mock Avatar for now */}
                            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-slate-300">AR</div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined">upload</span>
                            </div>
                        </div>
                        <div>
                            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors mb-2">
                                Upload New Picture
                            </button>
                            <p className="text-xs text-slate-500 max-w-[200px]">
                                JPG, GIF or PNG. Max size of 800K.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="p-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">person</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3 rounded-b-xl">
                    <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center gap-2"
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                                Saving...
                            </>
                        ) : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Delete Account Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-1">Delete Account</h3>
                    <p className="text-sm text-red-600/80 dark:text-red-400/70">Permanently delete your account and all associated data. This action cannot be undone.</p>
                </div>
                <button className="px-5 py-2.5 bg-white dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap">
                    Delete Account
                </button>
            </div>
        </div>
    );
}
