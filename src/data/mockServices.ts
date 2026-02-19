export interface Service {
    id: string;
    name: string;
    domain: string;
    status: "active" | "building" | "failed" | "stopped";
    runtime: "Node.js" | "Docker" | "Python" | "Go" | "Static";
    region: string;
    updatedAt: string;
    cpu: string;
    memory: string;
}

export const mockServices: Service[] = [
    {
        id: "vpsphere-api",
        name: "vpsphere-api",
        domain: "api.vpsphere.dev",
        status: "active",
        runtime: "Node.js",
        region: "US-East",
        updatedAt: "2 mins ago",
        cpu: "14%",
        memory: "256MB"
    },
    {
        id: "postgres-db",
        name: "postgres-db",
        domain: "db-prod-main",
        status: "active",
        runtime: "Docker",
        region: "EU-West",
        updatedAt: "14 hrs ago",
        cpu: "8%",
        memory: "1.2GB"
    },
    {
        id: "frontend-app",
        name: "vpsphere-web",
        domain: "vpsphere.app",
        status: "building",
        runtime: "Static",
        region: "Global",
        updatedAt: "Just now",
        cpu: "1%",
        memory: "45MB"
    },
    {
        id: "python-worker",
        name: "data-worker",
        domain: "worker.internal",
        status: "stopped",
        runtime: "Python",
        region: "US-West",
        updatedAt: "2 days ago",
        cpu: "0%",
        memory: "0MB"
    }
];
