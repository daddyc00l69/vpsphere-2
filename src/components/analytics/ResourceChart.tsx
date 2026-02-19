"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DataPoint {
    date: string;
    cpu: number;
    ram: number;
    bandwidth: number;
}

// Mock data generator
const generateData = (days: number): DataPoint[] => {
    const data: DataPoint[] = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            cpu: Math.floor(Math.random() * 60) + 20, // 20-80%
            ram: Math.floor(Math.random() * 40) + 30, // 30-70%
            bandwidth: Math.floor(Math.random() * 100) + 50, // 50-150 Mbps
        });
    }
    return data;
};

export function ResourceChart() {
    const [range, setRange] = useState<7 | 30 | 90>(7);
    const [data, setData] = useState<DataPoint[]>(generateData(7));

    const handleRangeChange = (newRange: 7 | 30 | 90) => {
        setRange(newRange);
        setData(generateData(newRange));
    };

    const downloadCSV = () => {
        const headers = ["Date,CPU (%),RAM (%),Bandwidth (Mbps)"];
        const csvContent = data.map(row => `${row.date},${row.cpu},${row.ram},${row.bandwidth}`).join("\n");
        const blob = new Blob([headers + "\n" + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `vpsphere_usage_${range}d.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card className="col-span-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Resource Usage History</CardTitle>
                        <CardDescription>
                            Review your server&apos;s performance over the last {range} days.
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                            {[7, 30, 90].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => handleRangeChange(r as 7 | 30 | 90)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${range === r
                                        ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                        }`}
                                >
                                    {r}d
                                </button>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" onClick={downloadCSV}>
                            <span className="material-symbols-outlined text-sm mr-2">download</span>
                            Export CSV
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-0">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--tooltip-bg, #fff)',
                                    borderColor: 'var(--tooltip-border, #e2e8f0)',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cpu"
                                name="CPU Usage"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorCpu)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="ram"
                                name="RAM Usage"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#colorRam)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
