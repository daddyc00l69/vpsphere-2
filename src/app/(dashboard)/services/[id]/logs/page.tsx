"use client";

import { useState, useEffect } from "react";
import { Terminal } from "@/components/services/Terminal";
import { Button } from "@/components/ui/button";

const MOCK_LOGS = [
    "[INFO] Starting application vpsphere-api...",
    "[INFO] Loaded environment variables from .env",
    "[INFO] Connecting to database postgres-db:5432...",
    "[INFO] Database connection established successfully.",
    "[INFO] Server listening on port 3000",
    "[INFO] Request received: GET /health",
    "[INFO] Request received: GET /api/v1/projects",
    "[WARN] High memory usage detected: 85%",
    "[INFO] Garbage collection started...",
    "[INFO] Garbage collection completed. Memory usage: 45%",
    "[INFO] Request received: POST /api/v1/deploy",
    "[INFO] Starting deployment sequence...",
    "[INFO] Pulling latest image from registry...",
    "[INFO] Image pulled successfully.",
    "[INFO] Restarting container...",
    "[INFO] Container restarted. Health check passing.",
];

export default function ServiceLogsPage() {
    const [logs, setLogs] = useState<string[]>(MOCK_LOGS);
    const [isLive, setIsLive] = useState(true);

    // Simulate live logs
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            const newLog = `[INFO] Request received: GET /api/v1/ping [${new Date().toISOString()}]`;
            setLogs((prev) => [...prev, newLog]);
        }, 2000);

        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Logs</h3>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="gap-2">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Download
                    </Button>
                    <Button
                        size="sm"
                        variant={isLive ? "secondary" : "primary"}
                        onClick={() => setIsLive(!isLive)}
                    >
                        {isLive ? "Pause" : "Resume"}
                    </Button>
                </div>
            </div>
            <Terminal logs={logs} />
        </div>
    );
}
