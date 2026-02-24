'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.devtushar.uk';

export interface User {
    id: string;
    username: string;
    email?: string;
    plan_id?: string | number;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUserData: (userData: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const setUserData = useCallback((userData: User | null) => {
        if (!userData) {
            localStorage.removeItem('vpsphere_user');
            setUser(null);
            return;
        }
        localStorage.setItem('vpsphere_user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch {
            // ignore; we still clear local state and redirect
        } finally {
            localStorage.removeItem('vpsphere_user');
            setUser(null);
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        // Cookie-based session: hydrate user from backend (/auth/me).
        const hydrate = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
                if (!res.ok) {
                    if (!cancelled) setUser(null);
                    return;
                }
                const data = await res.json();
                const u = data?.user || null;
                if (!cancelled) setUser(u);
                if (u) localStorage.setItem('vpsphere_user', JSON.stringify(u));
            } catch {
                if (!cancelled) setUser(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        hydrate();

        // Listen to global 401 unauth ejects from the api-client interceptor
        const handleUnauthorized = () => {
            logout();
        };

        window.addEventListener('vpsphere_unauthorized', handleUnauthorized);
        return () => {
            cancelled = true;
            window.removeEventListener('vpsphere_unauthorized', handleUnauthorized);
        };
    }, [logout]);

    const value = useMemo(() => ({ user, loading, setUserData, logout }), [user, loading, setUserData, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
