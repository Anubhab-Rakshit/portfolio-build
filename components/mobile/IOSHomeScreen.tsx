/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

export function IOSHomeScreen() {
    const [currentTime, setCurrentTime] = useState<string>('9:41');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes: string | number = now.getMinutes();
            hours = hours % 12 || 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    const apps = [
        { title: 'About Me', icon: '/icons/finder.svg' },
        { title: 'Safari', icon: '/icons/safari.svg' },
        { title: 'Terminal', icon: '/icons/terminal.svg' },
        { title: 'Project Hub', icon: '/icons/appstore.svg' },
        { title: 'Define Me', icon: '/icons/notes.svg' },
        { title: 'Mail', icon: '/icons/mail.svg' },
        { title: 'Calendar', icon: '/icons/calendar.svg' },
        { title: 'Photos', icon: '/icons/photos.svg' },
    ];

    const dockApps = [
        { title: 'Customise Appearance', icon: '/icons/settings.svg' },
        { title: 'Launchpad', icon: '/icons/launchpad.svg' },
        { title: 'About Me', icon: '/icons/finder.svg' },
        { title: 'Messages', icon: '/icons/appstore.svg' },
    ];

    return (
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col items-center justify-between overflow-hidden"
            style={{
                backgroundImage: 'url(/Images/mac-black-wallpaper-alt.png)',
                backgroundColor: '#0a192f'
            }}
        >

            {/* Status Bar */}
            <div className="w-full flex justify-between items-center px-6 py-3 text-white z-10 text-[13px] font-semibold">
                <span>{currentTime}</span>
                <div className="flex items-center gap-1.5">
                    <Signal size={12} />
                    <Wifi size={14} />
                    <Battery size={18} className="rotate-90" />
                </div>
            </div>

            {/* Banner */}
            <div className="absolute top-20 left-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl z-20 text-center border border-white/20">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Desktop Recommended</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    This interactive macOS portfolio is best viewed on a larger screen. Please visit from a Mac or PC to experience the full draggable window system!
                </p>
            </div>

            {/* Icon Grid */}
            <div className="flex-1 w-full pt-44 px-6 grid grid-cols-4 gap-y-6 gap-x-4 content-start relative z-10">
                {apps.map(app => (
                    <div key={app.title} className="flex flex-col items-center gap-1">
                        <div className="w-14 h-14 bg-white/20 rounded-[14px] shadow-sm flex items-center justify-center overflow-hidden backdrop-blur-sm border border-white/10">
                            <img src={app.icon} alt="" className="w-10 h-10 object-contain drop-shadow-md" onError={e => e.currentTarget.style.display = 'none'} />
                        </div>
                        <span className="text-white text-[11px] drop-shadow-md font-medium tracking-wide">{app.title}</span>
                    </div>
                ))}
            </div>

            {/* iOS Dock */}
            <div className="w-[90%] h-[84px] mb-6 bg-white/30 dark:bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-around px-3 mx-auto relative z-10 border border-white/20 shadow-2xl">
                {dockApps.map(app => (
                    <div key={app.title} className="w-[56px] h-[56px] bg-white/10 hover:bg-white/20 transition-colors rounded-[12px] flex items-center justify-center overflow-hidden cursor-pointer shadow-sm">
                        <img src={app.icon} alt="" className="w-10 h-10 object-contain drop-shadow-md" onError={e => e.currentTarget.style.display = 'none'} />
                    </div>
                ))}
            </div>

            {/* Dark overlay slightly dimming wallpaper */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
    );
}
