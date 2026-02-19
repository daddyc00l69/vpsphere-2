import React from "react";
import { Sidebar } from "@/components/sidebar";
import { GlobalSearch } from "@/components/GlobalSearch";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-vpsBackground dark:bg-background-dark">
            <GlobalSearch />
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden relative transition-all duration-200 ease-in-out">
                {children}
            </main>
        </div>
    );
}
