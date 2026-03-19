"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useWindowContext, WindowType } from '@/contexts/WindowContext';
import { DraggableWindow } from '../window/DraggableWindow';
import { MenuBar } from '../menubar/MenuBar';
import { Dock } from '../dock/Dock';
import { DesktopWidgets } from './DesktopWidgets';
import { ControlCenter } from '../overlays/ControlCenter';
import { TerminalWindow } from '../apps/TerminalWindow';
import { FinderWindow } from '../apps/FinderWindow';
import { SettingsWindow } from '../apps/SystemPreferencesWindow';
import { SafariWindow } from '../apps/SafariWindow';
import { NotesWindow } from '../apps/NotesWindow';
import { MailWindow } from '../apps/MailWindow';
import { CalendarWindow } from '../apps/CalendarWindow';
import { PhotosWindow } from '../apps/PhotosWindow';
import { AppStoreWindow } from '../apps/AppStoreWindow';
import { AboutThisMacWindow } from '../apps/AboutThisMacWindow';
import { Launchpad } from '../overlays/Launchpad';
import { SpotlightSearch } from '../overlays/SpotlightSearch';
import { SiriPanel } from '../overlays/SiriPanel';
import { NotificationBanner } from '../overlays/NotificationBanner';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, Code, Folder, User, Mail } from 'lucide-react';
import { FaceTimeWindow } from '@/components/apps/FaceTimeWindow';

export function Desktop() {
    const { windows, focusWindow, openWindow, closeWindow, activeWindowId } = useWindowContext();
    const desktopRef = useRef<HTMLDivElement>(null);
    const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
    const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
    const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
    const [isSiriOpen, setIsSiriOpen] = useState(false);
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    useKonamiCode(() => {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
    });

    // Handle deep links from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const windowType = params.get('window');

        if (windowType) {
            let props: any = {};
            if (windowType === 'safari') {
                props.url = params.get('url');
            } else if (windowType === 'finder') {
                props.folder = params.get('folder');
                props.project = params.get('project');
            }

            const title = windowType.charAt(0).toUpperCase() + windowType.slice(1);

            // Open window with slight delay to ensure UI is ready
            setTimeout(() => {
                openWindow(windowType as WindowType, title, props);
                // Clear URL so refreshing doesn't duplicate
                window.history.replaceState({}, '', '/');
            }, 600);
        }
    }, []); // Run only once

    // Global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Launchpad: F4
            if (e.key === 'F4') {
                e.preventDefault();
                setIsLaunchpadOpen(prev => !prev);
            }
            // Spotlight: Cmd/Ctrl + Space
            if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
                e.preventDefault();
                setIsSpotlightOpen(prev => !prev);
            }
            // Escape to close active window or overlay
            if (e.key === 'Escape') {
                if (isLaunchpadOpen) { setIsLaunchpadOpen(false); return; }
                if (isSpotlightOpen) { setIsSpotlightOpen(false); return; }
                if (isSiriOpen) { setIsSiriOpen(false); return; }
                if (isControlCenterOpen) { setIsControlCenterOpen(false); return; }

                if (activeWindowId) {
                    closeWindow(activeWindowId);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLaunchpadOpen, isSpotlightOpen, isSiriOpen, isControlCenterOpen, activeWindowId, closeWindow]);

    // Deselect things or focus background when clicking desktop itself
    const handleDesktopClick = (e: React.MouseEvent) => {
        if (e.target === desktopRef.current) {
            setSelectedIconId(null);
        }
    };

    return (
        <div
            ref={desktopRef}
            className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-500"
            style={{
                backgroundColor: '#000',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif"
            }}
            onClick={handleDesktopClick}
        >
            {/* Desktop Wallpaper */}
            <img
                src="/Images/mac-black-wallpaper.png"
                alt=""
                className="hidden sm:block absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
                draggable={false}
            />

            {/* Mobile Wallpaper */}
            <img
                src="/Images/iphone_defaultwallpaper.png"
                alt=""
                className="block sm:hidden absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
            />

            <MenuBar
                onSpotlightClick={() => setIsSpotlightOpen(prev => !prev)}
                onSiriClick={() => setIsSiriOpen(prev => !prev)}
                onControlCenterClick={() => setIsControlCenterOpen(prev => !prev)}
            />

            <DesktopWidgets />

            {/* Desktop Shortcuts */}
            <div className="absolute top-[340px] min-[400px]:top-[360px] sm:top-10 left-2 sm:left-auto right-2 sm:right-4 bottom-[110px] sm:bottom-[100px] flex flex-row sm:flex-col flex-wrap sm:flex-wrap-reverse gap-4 sm:gap-4 z-10 select-none py-2 sm:py-0 justify-center sm:justify-start items-start sm:items-center sm:content-start">
                <a
                    href="https://www.linkedin.com/in/anubhab-rakshit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                        <Linkedin size={24} className="text-white md:w-[28px] md:h-[28px]" />
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">LinkedIn</span>
                </a>
                <a
                    href="https://github.com/Anubhab-Rakshit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#24292e] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                        <Github size={24} className="text-white md:w-[28px] md:h-[28px]" />
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">GitHub</span>
                </a>
                <a
                    href="https://www.instagram.com/dauntless._.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-white shrink-0">
                        <Instagram size={24} className="md:w-[28px] md:h-[28px]" />
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">Instagram</span>
                </a>
                <a
                    href="https://www.youtube.com/@theallmasteranubhab7686"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-white shrink-0">
                        <Youtube size={24} className="md:w-[28px] md:h-[28px]" />
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">YouTube</span>
                </a>
                <a
                    href="https://www.geeksforgeeks.org/profile/anubhabrakshit06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-[#2f8d46] shrink-0 p-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GFG" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">GeeksforGeeks</span>
                </a>
                <a
                    href="https://leetcode.com/u/Anubhab_Rakshit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#282828] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-[#ffa116] shrink-0">
                        <Code size={24} className="md:w-[28px] md:h-[28px]" />
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">LeetCode</span>
                </a>

                {/* Local Folder Shortcuts */}
                <div
                    onClick={() => openWindow('finder', 'Finder')}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                        <div className="absolute inset-0 bg-[#4DA5F7] rounded-lg opacity-20" />
                        <Folder size={36} className="text-[#4DA5F7] fill-current" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-white">
                            <Code size={12} />
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">Projects</span>
                </div>

                <div
                    onClick={() => openWindow('notes', 'Notes')}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                        <div className="absolute inset-0 bg-[#34C759] rounded-lg opacity-20" />
                        <Folder size={36} className="text-[#34C759] fill-current" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-white">
                            <User size={12} />
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">About Me</span>
                </div>

                <div
                    onClick={() => openWindow('mail', 'Mail')}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer w-20"
                >
                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                        <div className="absolute inset-0 bg-[#FF9500] rounded-lg opacity-20" />
                        <Folder size={36} className="text-[#FF9500] fill-current" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-white">
                            <Mail size={12} />
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-white text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] leading-tight">Contact</span>
                </div>

            </div>

            {/* Render open windows */}
            {windows.map((win) => (
                <DraggableWindow
                    key={win.id}
                    windowData={win}
                >
                    {win.type === 'terminal' ? (
                        <TerminalWindow id={win.id} />
                    ) : win.type === 'finder' ? (
                        <FinderWindow id={win.id} initialFolder={win.props?.folder} initialProject={win.props?.project} />
                    ) : win.type === 'settings' ? (
                        <SettingsWindow />
                    ) : win.type === 'safari' ? (
                        <SafariWindow id={win.id} initialUrl={win.props?.url} />
                    ) : win.type === 'notes' ? (
                        <NotesWindow id={win.id} />
                    ) : win.type === 'mail' ? (
                        <MailWindow id={win.id} />
                    ) : win.type === 'calendar' ? (
                        <CalendarWindow id={win.id} />
                    ) : win.type === 'photos' ? (
                        <PhotosWindow id={win.id} />
                    ) : win.type === 'facetime' ? (
                        <FaceTimeWindow id={win.id} />
                    ) : win.type === 'appstore' ? (
                        <AppStoreWindow id={win.id} />
                    ) : win.type === 'about' ? (
                        <AboutThisMacWindow id={win.id} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#1e1e1e]">
                            <p className="text-black dark:text-white">App: {win.type}</p>
                        </div>
                    )}
                </DraggableWindow>
            ))}

            {/* Overlays */}
            <Launchpad isOpen={isLaunchpadOpen} onClose={() => setIsLaunchpadOpen(false)} />
            <SpotlightSearch isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
            <SiriPanel isOpen={isSiriOpen} onClose={() => setIsSiriOpen(false)} />
            <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />

            <Dock onLaunchpadClick={() => setIsLaunchpadOpen(prev => !prev)} />

            {/* Konami Code Easter Egg */}
            {showEasterEgg && (
                <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-3xl shadow-2xl text-center border-4 border-white/20">
                        <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg tracking-tighter">CHEAT CODE UNLOCKED!</h1>
                        <p className="text-xl text-white/90 font-medium">You found the Konami Code secret. Have a great day!</p>
                        <div className="mt-8 text-8xl animate-bounce">🚀</div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
