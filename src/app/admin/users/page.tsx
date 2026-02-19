"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_USERS = [
    { id: "usr_1", name: "Alex Rivera", email: "alex@example.com", plan: "Pro", status: "Active", joined: "2 days ago", role: "Admin" },
    { id: "usr_2", name: "Sarah Connor", email: "sarah@skynet.com", plan: "Free", status: "Active", joined: "5 days ago", role: "User" },
    { id: "usr_3", name: "John Doe", email: "john@doe.com", plan: "Enterprise", status: "Suspended", joined: "1 week ago", role: "User" },
    { id: "usr_4", name: "Jane Smith", email: "jane@smith.com", plan: "Pro", status: "Active", joined: "2 weeks ago", role: "User" },
    { id: "usr_5", name: "Mike Ross", email: "mike@pearson.com", plan: "Free", status: "Active", joined: "1 month ago", role: "User" },
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSuspend = (id: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">View and manage all registered users.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                    Invite User
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Filter: All
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Sort: Newest
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">User</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Role</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Plan</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Status</th>
                                <th className="py-3 px-6 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Joined</th>
                                <th className="py-3 px-6 text-right text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">
                                                {user.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border",
                                            user.role === "Admin"
                                                ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                                                : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                                        )}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.plan}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                            user.status === "Active"
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                        )}>
                                            <span className={cn("size-1.5 rounded-full", user.status === "Active" ? "bg-emerald-500" : "bg-red-500")}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-slate-500 dark:text-slate-400">{user.joined}</div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleSuspend(user.id)}
                                                className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors" title={user.status === "Active" ? "Suspend" : "Activate"}>
                                                <span className="material-symbols-outlined text-[18px]">{user.status === "Active" ? "block" : "check_circle"}</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Edit">
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <div>Showing {filteredUsers.length} users</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
