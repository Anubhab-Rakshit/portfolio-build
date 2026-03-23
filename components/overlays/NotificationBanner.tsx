/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Using a module-level variable to act as a simple event bus for demo purposes
// In a real app, this would be a context or a state manager like Zustand
type Notification = {
    id: string;
    title: string;
    message: string;
    icon: string | React.ReactNode;
};

let notificationListeners: ((n: Notification) => void)[] = [];

export const showNotification = (title: string, message: string, icon: string | React.ReactNode) => {
    const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        message,
        icon
    };
    notificationListeners.forEach(listener => listener(notification));
};

export function NotificationBanner() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const handleNewNotification = (n: Notification) => {
            setNotifications(prev => [...prev, n]);

            // Auto-dismiss after 4 seconds
            setTimeout(() => {
                setNotifications(prev => prev.filter(p => p.id !== n.id));
            }, 4000);
        };

        notificationListeners.push(handleNewNotification);

        // Demonstrate feature on initial load
        setTimeout(() => {
            showNotification("GitHub", "anubhabrakshit pushed to Portfolio-Windows", "gh");
        }, 5000);

        return () => {
            notificationListeners = notificationListeners.filter(l => l !== handleNewNotification);
        };
    }, []);

    const dismiss = (id: string) => {
        setNotifications(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="absolute top-12 right-2 w-80 z-[9000] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
                        className="w-full bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-2xl p-4 shadow-lg border border-white/40 dark:border-white/10 pointer-events-auto cursor-pointer relative overflow-hidden group"
                        onClick={() => dismiss(n.id)}
                    >
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center bg-gray-100 dark:bg-white/10 overflow-hidden shadow-sm">
                                {typeof n.icon === 'string' && n.icon === 'gh' ? (
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-800 dark:text-gray-200"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                ) : typeof n.icon === 'string' ? (
                                    <img src={n.icon} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    n.icon
                                )}
                            </div>
                            <div className="flex flex-col flex-1 pb-1">
                                <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{n.title}</span>
                                <span className="text-gray-600 dark:text-gray-300 text-xs mt-0.5 leading-snug">{n.message}</span>
                            </div>
                        </div>

                        <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="2" y1="2" x2="8" y2="8" />
                                <line x1="8" y1="2" x2="2" y2="8" />
                            </svg>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
