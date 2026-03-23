/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowContext, WindowType } from '@/contexts/WindowContext';
import { Search } from 'lucide-react';

interface LaunchpadProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Launchpad({ isOpen, onClose }: LaunchpadProps) {
    const { openWindow } = useWindowContext();
    const [searchQuery, setSearchQuery] = useState('');

    const apps = [
        { title: 'About Me', icon: '/Images/finderlogo_projectmac.png', type: 'finder' },
        { title: 'Safari', icon: '/Images/safarilogo_projectmac.png', type: 'safari' },
        { title: 'Terminal', icon: '/Images/terminallogo_projectmac.png', type: 'terminal' },
        { title: 'Project Hub', icon: '/Images/appstorelogo_projectmac.png', type: 'appstore' },
        { title: 'Define Me', icon: '/Images/noteslogo_projectmac.png', type: 'notes' },
        { title: 'Mail', icon: '/Images/maillogo_projectmac.png', type: 'mail' },
        { title: 'Calendar', icon: 'https://img.icons8.com/color/256/calendar--v1.png', type: 'calendar' },
        { title: 'Photos', icon: '/Images/photoslogo_projectmac.png', type: 'photos' },
        { title: 'Customise Appearance', icon: '/Images/systemsettingslogo_projectmac.png', type: 'settings' },
        { title: 'About Portfolio', icon: '/Images/finderlogo_projectmac.png', type: 'about' },
    ];

    const filteredApps = apps.filter(app => app.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleOpenApp = (type: WindowType, title: string) => {
        openWindow(type, title);
        onClose();
        setSearchQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 z-[8000] flex flex-col items-center"
                    onClick={onClose}
                    style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
                >
                    {/* Background with scale+blur effect like real macOS */}
                    <motion.div
                        initial={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
                        animate={{ scale: 1, filter: 'blur(40px) brightness(0.4)' }}
                        exit={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60"
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center w-full h-full pt-12 pb-10">

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                            className="w-52 relative mb-10"
                            onClick={e => e.stopPropagation()}
                        >
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                autoFocus
                                className="w-full bg-white/10 border border-white/15 rounded-lg py-1.5 pl-8 pr-4 text-[13px] text-white/90 placeholder:text-white/40 outline-none focus:bg-white/15 focus:border-white/25 transition-all"
                            />
                        </motion.div>

                        {/* App Grid */}
                        <div className="flex-1 w-full max-w-4xl px-16 overflow-y-auto">
                            <div className="grid grid-cols-4 min-[420px]:grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8 justify-items-center">
                                {filteredApps.map((app, index) => (
                                    <motion.div
                                        key={app.title}
                                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                        transition={{
                                            delay: index * 0.03,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                        className="flex flex-col items-center gap-[6px] cursor-pointer group w-[80px]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenApp(app.type as WindowType, app.title);
                                        }}
                                    >
                                        {/* Icon with macOS rounded rect shape */}
                                        <div className="w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] transition-all duration-150 group-hover:scale-110 group-active:scale-90 group-active:brightness-75">
                                            <img
                                                src={app.icon}
                                                alt={app.title}
                                                className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                                                draggable={false}
                                            />
                                        </div>
                                        <span className="text-white/90 text-[11px] font-medium text-center leading-tight max-w-[80px] truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                                            {app.title}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-[6px] mt-4"
                        >
                            <div className="w-[6px] h-[6px] rounded-full bg-white/90" />
                            <div className="w-[6px] h-[6px] rounded-full bg-white/30" />
                            <div className="w-[6px] h-[6px] rounded-full bg-white/30" />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
