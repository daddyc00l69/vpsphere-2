"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TEAM_MEMBERS = [
    { id: 1, name: "Alex Rivera", email: "alex@example.com", role: "Owner", avatar: "AR" },
    { id: 2, name: "Sarah Connor", email: "sarah@skynet.com", role: "Admin", avatar: "SC" },
];

export default function TeamPage() {
    const [members] = useState(TEAM_MEMBERS);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Invite and manage team members.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                    Invite Member
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                {/* Header */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                    <span>Member</span>
                    <span>Role</span>
                </div>

                {/* List */}
                {members.map((member) => (
                    <div key={member.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                                {member.avatar}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">{member.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{member.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={cn(
                                "text-xs font-bold px-2 py-0.5 rounded border",
                                member.role === "Owner"
                                    ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                                    : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                            )}>
                                {member.role}
                            </span>
                            {member.role !== "Owner" && (
                                <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors opacity-0 group-hover:opacity-100">
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-slate-500">link</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Invite Link</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Share this link to let people join your team automatically.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <code className="text-xs bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 font-mono">
                            vpsphere.dev/join/t-x7z9...
                        </code>
                        <button className="p-1.5 text-slate-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
