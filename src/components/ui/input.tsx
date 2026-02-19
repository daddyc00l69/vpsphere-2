import React from "react";

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`w-full border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm placeholder:text-slate-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-shadow outline-none py-2 px-3 ${className}`}
            {...props}
        />
    );
}
