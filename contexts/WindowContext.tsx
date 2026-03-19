"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type WindowType =
    | 'finder'
    | 'terminal'
    | 'safari'
    | 'notes'
    | 'mail'
    | 'calendar'
    | 'photos'
    | 'appstore'
    | 'settings'
    | 'about'
    | 'facetime';

export interface WindowState {
    id: string; // unique instance ID, allows multiple finder windows if wanted
    type: WindowType;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    props?: any; // Additional props like path for finder, url for safari
}

interface WindowContextType {
    windows: WindowState[];
    activeWindowId: string | null;
    openWindow: (type: WindowType, title: string, props?: any) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

let highestZIndex = 10;

export function WindowProvider({ children }: { children: ReactNode }) {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

    const focusWindow = useCallback((id: string) => {
        highestZIndex += 1;
        setWindows((prev) =>
            prev.map((win) => {
                if (win.id === id) {
                    return { ...win, zIndex: highestZIndex, isMinimized: false };
                }
                return win;
            })
        );
        setActiveWindowId(id);
    }, []);

    const openWindow = useCallback((type: WindowType, title: string, props?: any) => {
        // Check if a window of this type is already open
        // For some apps like Safari or Finder, we might want multiple, but keeping it simple for now
        setWindows((prev) => {
            const existingWindow = prev.find(w => w.type === type);

            if (existingWindow) {
                // If it exists, just focus it and un-minimize it
                focusWindow(existingWindow.id);
                return prev;
            }

            highestZIndex += 1;
            const newId = `${type}-${Date.now()}`;
            const newWindow: WindowState = {
                id: newId,
                type,
                title,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: highestZIndex,
                props
            };

            setActiveWindowId(newId);
            return [...prev, newWindow];
        });
    }, [focusWindow]);

    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => prev.filter((win) => win.id !== id));

        // Update active window if the closed one was active
        setActiveWindowId((currentActive) => {
            if (currentActive === id) {
                // Find the window with the next highest z-index
                const remaining = windows.filter(w => w.id !== id && !w.isMinimized);
                if (remaining.length > 0) {
                    const nextActive = remaining.reduce((prev, current) =>
                        (prev.zIndex > current.zIndex) ? prev : current
                    );
                    return nextActive.id;
                }
                return null;
            }
            return currentActive;
        });
    }, [windows]);

    const minimizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((win) => win.id === id ? { ...win, isMinimized: true } : win)
        );

        // Focus next available window
        const remaining = windows.filter(w => w.id !== id && !w.isMinimized);
        if (remaining.length > 0) {
            const nextActive = remaining.reduce((prev, current) =>
                (prev.zIndex > current.zIndex) ? prev : current
            );
            setActiveWindowId(nextActive.id);
            focusWindow(nextActive.id);
        } else {
            setActiveWindowId(null);
        }
    }, [windows, focusWindow]);

    const maximizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((win) => win.id === id ? { ...win, isMaximized: !win.isMaximized } : win)
        );
        focusWindow(id);
    }, [focusWindow]);

    return (
        <WindowContext.Provider value={{
            windows,
            activeWindowId,
            openWindow,
            closeWindow,
            minimizeWindow,
            maximizeWindow,
            focusWindow
        }}>
            {children}
        </WindowContext.Provider>
    );
}

export function useWindowContext() {
    const context = useContext(WindowContext);
    if (context === undefined) {
        throw new Error('useWindowContext must be used within a WindowProvider');
    }
    return context;
}
