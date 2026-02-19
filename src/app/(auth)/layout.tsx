import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] animate-fade-in">
                {children}
            </div>

            {/* Abstract Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-50 dark:opacity-20">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
}
