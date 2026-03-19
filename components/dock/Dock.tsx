"use client";

import React, { useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { useWindowContext, WindowType } from '@/contexts/WindowContext';
import { DockIcon } from './DockIcon';

interface DockProps {
    onLaunchpadClick?: () => void;
}

export function Dock({ onLaunchpadClick }: DockProps) {
    const { windows, openWindow, activeWindowId, focusWindow } = useWindowContext();
    const mouseX = useMotionValue(Infinity);
    const dockRef = useRef<HTMLDivElement>(null);

    const apps = [
        { id: 'finder', title: 'About Me', icon: '/Images/finderlogo_projectmac.png', type: 'finder' as WindowType },
        { id: 'facetime', title: 'FaceTime', icon: '/Images/facetimelogo_projectmac.png', type: 'facetime' as WindowType },
        { id: 'launchpad', title: 'Launchpad', icon: '/Images/launchpadlogo_projectmac.png', type: 'system' },
        { id: 'safari', title: 'Safari', icon: '/Images/safarilogo_projectmac.png', type: 'safari' as WindowType },
        { id: 'notes', title: 'Define Me', icon: '/Images/noteslogo_projectmac.png', type: 'notes' as WindowType },
        { id: 'appstore', title: 'Project Hub', icon: '/Images/appstorelogo_projectmac.png', type: 'appstore' as WindowType },
        { id: 'settings', title: 'Customise Appearance', icon: '/Images/systemsettingslogo_projectmac.png', type: 'settings' as WindowType },
        { id: 'terminal', title: 'Terminal', icon: '/Images/terminallogo_projectmac.png', type: 'terminal' as WindowType },
        { id: 'mail', title: 'Mail', icon: '/Images/maillogo_projectmac.png', type: 'mail' as WindowType },
        { id: 'calendar', title: 'Calendar', icon: 'https://img.icons8.com/color/256/calendar--v1.png', type: 'calendar' as WindowType },
        { id: 'photos', title: 'Photos', icon: '/Images/photoslogo_projectmac.png', type: 'photos' as WindowType },
    ];

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max origin-bottom flex justify-center pointer-events-none z-[9990] transition-transform duration-300 transform scale-[0.45] min-[400px]:scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100">
            <div
                ref={dockRef}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end px-2 pb-[6px] pt-1 gap-[3px] rounded-2xl pointer-events-auto overflow-visible no-scrollbar"
                style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(50px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(50px) saturate(180%)',
                    border: '0.5px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1), 0 8px 40px rgba(0,0,0,0.35), inset 0 0.5px 0 rgba(255,255,255,0.15)',
                }}
            >
                {apps.map((app) => {
                    const isOpen = app.type !== 'system' && windows.some(w => w.type === app.type && !('isClosed' in w && w.isClosed));

                    return (
                        <DockIcon
                            key={app.id}
                            title={app.title}
                            iconPath={app.icon}
                            mouseX={mouseX}
                            isActive={isOpen}
                            onClick={() => {
                                if (app.id === 'launchpad' && onLaunchpadClick) {
                                    onLaunchpadClick();
                                    return;
                                }

                                const existingWindow = windows.find(w => w.type === app.type && !('isClosed' in w && w.isClosed));
                                if (existingWindow) {
                                    focusWindow(existingWindow.id);
                                } else if (app.type !== 'system') {
                                    openWindow(app.type as WindowType, app.title);
                                }
                            }}
                        />
                    );
                })}

                {/* Separator */}
                <div className="h-8 w-px bg-white/15 mx-0.5 mb-1 self-end" />

                {/* Trash Icon */}
                <DockIcon
                    title="Trash"
                    iconPath="/Images/trashbinlogo_projectmac.png"
                    mouseX={mouseX}
                    isActive={false}
                    onClick={() => { }}
                />
            </div>
        </div>
    );
}
