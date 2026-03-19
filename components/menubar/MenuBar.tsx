/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useWindowContext, WindowType } from '@/contexts/WindowContext';
import { useAppTheme } from '@/contexts/AppThemeContext';
import { Search, Wifi, BatteryMedium, BatteryLow, BatteryFull, Mic, Cloud, Monitor, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuBarProps {
    onSpotlightClick?: () => void;
    onSiriClick?: () => void;
    onControlCenterClick?: () => void;
}

// Apple Menu Dropdown Items
const appleMenuItems = [
    { label: 'About This Mac', action: 'about' },
    { type: 'separator' },
    { label: 'System Preferences...', action: 'settings' },
    { label: 'Project Hub...', action: 'appstore' },
    { type: 'separator' },
    { label: 'Recent Items', action: null },
    { type: 'separator' },
    { label: 'Force Quit...', action: null },
    { type: 'separator' },
    { label: 'Sleep', action: null },
    { label: 'Restart...', action: null },
    { label: 'Shut Down...', action: null },
    { type: 'separator' },
    { label: 'Lock Screen', action: null },
    { label: 'Log Out Anubhab...', action: null },
];

const fileMenuItems = [
    { label: 'New Finder Window', action: 'finder' },
    { label: 'New Folder', action: null },
    { type: 'separator' },
    { label: 'Open...', action: null },
    { label: 'Open With', action: null },
    { type: 'separator' },
    { label: 'Close Window', action: 'close' },
    { type: 'separator' },
    { label: 'Get Info', action: null },
];

const editMenuItems = [
    { label: 'Undo', action: null, shortcut: '⌘Z' },
    { label: 'Redo', action: null, shortcut: '⇧⌘Z' },
    { type: 'separator' },
    { label: 'Cut', action: null, shortcut: '⌘X' },
    { label: 'Copy', action: null, shortcut: '⌘C' },
    { label: 'Paste', action: null, shortcut: '⌘V' },
    { label: 'Select All', action: null, shortcut: '⌘A' },
];

const viewMenuItems = [
    { label: 'as Icons', action: null, shortcut: '⌘1' },
    { label: 'as List', action: null, shortcut: '⌘2' },
    { label: 'as Columns', action: null, shortcut: '⌘3' },
    { label: 'as Gallery', action: null, shortcut: '⌘4' },
    { type: 'separator' },
    { label: 'Show Path Bar', action: null },
    { label: 'Show Status Bar', action: null },
    { label: 'Show Sidebar', action: null },
];

const goMenuItems = [
    { label: 'Back', action: null, shortcut: '⌘[' },
    { label: 'Forward', action: null, shortcut: '⌘]' },
    { type: 'separator' },
    { label: 'Computer', action: null, shortcut: '⇧⌘C' },
    { label: 'Home', action: null, shortcut: '⇧⌘H' },
    { label: 'Desktop', action: null, shortcut: '⇧⌘D' },
    { label: 'Downloads', action: null, shortcut: '⌥⌘L' },
    { label: 'Applications', action: null, shortcut: '⇧⌘A' },
];

const windowMenuItems = [
    { label: 'Minimize', action: null, shortcut: '⌘M' },
    { label: 'Zoom', action: null },
    { type: 'separator' },
    { label: 'Bring All to Front', action: null },
];

const helpMenuItems = [
    { label: 'macOS Help', action: null },
    { type: 'separator' },
    { label: 'About This Portfolio', action: 'about' },
];

interface DropdownMenuProps {
    items: any[];
    onAction: (action: string) => void;
    onClose: () => void;
}

function DropdownMenu({ items, onAction, onClose }: DropdownMenuProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [onClose]);

    return (
        <div
            ref={ref}
            className="absolute top-full left-0 mt-[2px] min-w-[220px] bg-white/80 dark:bg-[#2A2A2C]/95 backdrop-blur-[80px] rounded-lg border border-black/10 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] py-1 z-[99999] text-[13px] text-gray-800 dark:text-gray-200"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
        >
            {items.map((item: any, i: number) =>
                item.type === 'separator' ? (
                    <div key={i} className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />
                ) : (
                    <button
                        key={i}
                        className={`w-full text-left px-4 py-[3px] flex items-center justify-between hover:bg-[#0058D0] hover:text-white rounded-[4px] mx-1 transition-colors duration-75 ${!item.action ? 'text-gray-500 dark:text-gray-500' : ''}`}
                        style={{ width: 'calc(100% - 8px)' }}
                        onClick={() => {
                            if (item.action) onAction(item.action);
                            onClose();
                        }}
                    >
                        <span>{item.label}</span>
                        {item.shortcut && <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-8">{item.shortcut}</span>}
                    </button>
                )
            )}
        </div>
    );
}

export function MenuBar({ onSpotlightClick, onSiriClick, onControlCenterClick }: MenuBarProps) {
    const { windows, activeWindowId, openWindow, closeWindow } = useWindowContext();
    const { appTheme, toggleAppTheme } = useAppTheme();
    const [time, setTime] = useState<Date | null>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [batteryLevel, setBatteryLevel] = useState<number>(100);
    const [isCharging, setIsCharging] = useState<boolean>(false);

    useEffect(() => {
        // Battery Health API
        const updateBattery = (battery: any) => {
            setBatteryLevel(Math.round(battery.level * 100));
            setIsCharging(battery.charging);
        };

        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                updateBattery(battery);
                battery.addEventListener('levelchange', () => updateBattery(battery));
                battery.addEventListener('chargingchange', () => updateBattery(battery));
            });
        }
    }, []);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    let activeAppName = "About Me";
    if (activeWindowId) {
        const activeWin = windows.find(w => w.id === activeWindowId);
        if (activeWin) {
            if (activeWin.type === 'finder') activeAppName = 'About Me';
            else if (activeWin.type === 'notes') activeAppName = 'Define Me';
            else if (activeWin.type === 'settings') activeAppName = 'Customise Appearance';
            else if (activeWin.type === 'appstore') activeAppName = 'Project Hub';
            else activeAppName = activeWin.type.charAt(0).toUpperCase() + activeWin.type.slice(1);
        }
    }

    const formatTime = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    const handleAction = (action: string) => {
        if (action === 'close' && activeWindowId) {
            closeWindow(activeWindowId);
        } else if (action === 'about' || action === 'settings' || action === 'appstore' || action === 'finder') {
            openWindow(action as WindowType, action.charAt(0).toUpperCase() + action.slice(1));
        }
        setOpenMenu(null);
    };

    const menus: { label: string; id: string; items: any[] }[] = [
        { label: 'File', id: 'file', items: fileMenuItems },
        { label: 'Edit', id: 'edit', items: editMenuItems },
        { label: 'View', id: 'view', items: viewMenuItems },
        { label: 'Go', id: 'go', items: goMenuItems },
        { label: 'Window', id: 'window', items: windowMenuItems },
        { label: 'Help', id: 'help', items: helpMenuItems },
    ];

    return (
        <div
            className="absolute top-0 left-0 right-0 h-[32px] z-[9999] flex items-center justify-between px-2 select-none text-[13px] bg-white/10 dark:bg-black/15 backdrop-blur-[100px] backdrop-saturate-[200%] text-black/90 dark:text-white/90 border-b border-black/5 dark:border-white/5"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif", fontWeight: 450, WebkitFontSmoothing: "antialiased" }}
        >
            {/* MacBook Style Notch (Dynamic Island) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[10000] pointer-events-auto group">
                <motion.div
                    className="h-[32px] min-w-[140px] bg-black/90 backdrop-blur-xl rounded-b-[18px] flex justify-center items-center shadow-lg transition-all duration-500 ease-[0.23,1,0.32,1] cursor-default group-hover:h-[90px] group-hover:min-w-[320px] group-hover:mt-2 group-hover:rounded-[32px] overflow-hidden border border-white/5"
                >
                    <div className="flex items-center gap-3 px-4 w-full justify-center h-[32px] transition-opacity duration-300 group-hover:opacity-10">
                        {/* Resting State Indicators */}
                        <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222] shadow-[inset_0_0_2px_rgba(0,0,0,1)] relative flex-shrink-0">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#1a2d5c] rounded-full opacity-60"></div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#111] opacity-80 shadow-[inset_0_0_2px_rgba(0,0,0,1)] flex-shrink-0"></div>
                    </div>

                    {/* Expanded Content (Visible on hover) */}
                    <div className="absolute inset-x-0 bottom-0 top-0 hidden group-hover:flex items-center px-6 gap-4 animate-in fade-in zoom-in-95 duration-500">
                        <motion.div
                            className="w-14 h-14 rounded-xl overflow-hidden shadow-2xl border border-white/10"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                        >
                            <img src="/Images/perfect-cover.jpg" alt="" className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                            <div className="flex justify-between items-end">
                                <span className="text-[14px] font-bold text-white leading-tight truncate">Perfect</span>
                                <span className="text-[10px] text-white/40 mb-0.5">3:42</span>
                            </div>
                            <span className="text-[12px] text-white/60 font-medium truncate">Ed Sheeran</span>

                            {/* Animated Visualizer mockup */}
                            <div className="flex items-end gap-[2px] h-3 mt-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-[2px] bg-white rounded-full"
                                        animate={{ height: [4, 12, 6, 10, 4] }}
                                        transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Left side */}
            <div className="flex items-center h-full relative z-[10001]">
                {/* Apple Logo */}
                <div
                    className="relative flex items-center justify-center h-full px-3 hover:bg-black/10 dark:hover:bg-white/15 rounded-[4px] cursor-default transition-colors"
                    onClick={() => setOpenMenu(openMenu === 'apple' ? null : 'apple')}
                    onMouseEnter={() => openMenu && setOpenMenu('apple')}
                >
                    <svg className="w-[14px] h-[14px] fill-current opacity-90" viewBox="0 0 512 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 104.8-130.4-36.7-19.2-64.3-51.4-63.9-80.2z" />
                        <path d="M313.6 88.8c19.3-25.2 30.6-59.3 27.2-94.4-27 1.5-62 16.7-82.6 42.4-18.2 22.8-31 58.1-26.9 92.4 31.2 2.3 64.6-15.2 82.3-40.4z" />
                    </svg>
                    {openMenu === 'apple' && <DropdownMenu items={appleMenuItems} onAction={handleAction} onClose={() => setOpenMenu(null)} />}
                </div>

                {/* Active App Name (Bold) */}
                <div className="font-semibold px-2 h-full flex items-center hover:bg-black/10 dark:hover:bg-white/15 rounded-[4px] cursor-default transition-colors">
                    {activeAppName}
                </div>

                {/* Menus */}
                <div className="hidden sm:flex items-center h-full">
                    {menus.map(menu => (
                        <div
                            key={menu.id}
                            className="relative px-2 h-full flex items-center hover:bg-black/10 dark:hover:bg-white/15 rounded-[4px] cursor-default transition-colors"
                            onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
                            onMouseEnter={() => openMenu && setOpenMenu(menu.id)}
                        >
                            {menu.label}
                            {openMenu === menu.id && <DropdownMenu items={menu.items} onAction={handleAction} onClose={() => setOpenMenu(null)} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5 sm:gap-3 h-full pr-1">
                <button onClick={onSiriClick} className="hidden md:block opacity-80 hover:opacity-100 transition-opacity p-1">
                    <Mic size={13} className="fill-current" />
                </button>
                <div className="hidden lg:flex items-center gap-2 opacity-70">
                    <Cloud size={13} />
                    <Monitor size={13} />
                </div>
                <Wifi size={13} className="opacity-80" />
                <div className="flex items-center gap-1 opacity-80">
                    <span className="text-[10px] font-medium block">{batteryLevel}%</span>
                    {isCharging ? <BatteryFull size={13} className="text-green-500" /> : batteryLevel > 20 ? <BatteryMedium size={13} /> : <BatteryLow size={13} className="text-red-500" />}
                </div>
                <button onClick={toggleAppTheme} className="opacity-80 hover:opacity-100 transition-opacity p-1">
                    {appTheme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
                </button>
                <button onClick={onSpotlightClick} className="opacity-80 hover:opacity-100 transition-opacity p-1">
                    <Search size={13} />
                </button>
                <button onClick={onControlCenterClick} className="opacity-80 hover:opacity-100 transition-opacity p-1">
                    <SlidersHorizontal size={13} />
                </button>
                <div className="pl-1 h-full flex items-center whitespace-nowrap opacity-90 text-[12px] sm:text-[13px]">
                    {time ? (typeof window !== 'undefined' && window.innerWidth < 640 ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : formatTime(time)) : ''}
                </div>
            </div>
        </div>
    );
}
