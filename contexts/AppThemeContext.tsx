"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AppTheme = 'light' | 'dark';

interface AppThemeContextType {
    appTheme: AppTheme;
    toggleAppTheme: () => void;
    setAppTheme: (theme: AppTheme) => void;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
    const [appTheme, setAppThemeState] = useState<AppTheme>('dark');

    // Initialize from localStorage if available
    useEffect(() => {
        const savedTheme = localStorage.getItem('macos-app-theme') as AppTheme;
        if (savedTheme) {
            setAppThemeState(savedTheme);
        }
    }, []);

    const toggleAppTheme = () => {
        const newTheme = appTheme === 'light' ? 'dark' : 'light';
        setAppThemeState(newTheme);
        localStorage.setItem('macos-app-theme', newTheme);
    };

    const setAppTheme = (theme: AppTheme) => {
        setAppThemeState(theme);
        localStorage.setItem('macos-app-theme', theme);
    };

    return (
        <AppThemeContext.Provider value={{ appTheme, toggleAppTheme, setAppTheme }}>
            {children}
        </AppThemeContext.Provider>
    );
}

export function useAppTheme() {
    const context = useContext(AppThemeContext);
    if (context === undefined) {
        throw new Error('useAppTheme must be used within an AppThemeProvider');
    }
    return context;
}
