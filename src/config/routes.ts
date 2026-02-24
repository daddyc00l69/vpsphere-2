export const ROUTES = {
    // Public
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/register",
    PRICING: "/pricing",
    DOCS: "/docs",

    // Dashboard
    DASHBOARD: "/dashboard",
    SERVICES: "/services",
    DEPLOYMENTS: "/deployments",
    DATABASES: "/databases",
    ENV_GROUPS: "/env-groups",
    NEW_SERVICE: "/new-service",

    // Service Details (Dynamic)
    SERVICE_DETAILS: (id: string) => `/services/${id}`,
    SERVICE_LOGS: (id: string) => `/services/${id}/logs`,
    SERVICE_METRICS: (id: string) => `/services/${id}/metrics`,
    SERVICE_SETTINGS: (id: string) => `/services/${id}/settings`,

    // Settings & Billing
    BILLING: "/billing",
    SETTINGS: "/settings",
    SETTINGS_CONNECTIONS: "/settings/connections",
    SETTINGS_ALERTS: "/settings/alerts",
    PROFILE: "/settings/profile",
    TEAM: "/settings/team",

    // Security
    API_TOKENS: "/security/api-tokens",
    AUDIT_LOG: "/security/audit-log",
    SSH_KEYS: "/settings/keys",
    SESSIONS: "/settings/sessions",

    // Admin (Protected)
    ADMIN_DASHBOARD: "/admin",
    ADMIN_SYSTEM_LOGS: "/admin/system-logs",
    ADMIN_RATE_LIMITS: "/admin/rate-limits",
    ADMIN_USERS: "/admin/users",
    ADMIN_ALERTS: "/admin/alerts",
    ADMIN_PLANS: "/admin/plans",

    // New Modules
    ANALYTICS: "/analytics",
    SUPPORT: "/support",
    REFERRALS: "/referrals",
    STATUS: "/status",
    DESIGN_SYSTEM: "/design-system",
};
