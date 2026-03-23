"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { useAppTheme } from '@/contexts/AppThemeContext';
import { Monitor, Moon, Sun, Image as ImageIcon } from 'lucide-react';

export function SettingsWindow() {
    const { theme, setTheme } = useTheme();
    const { appTheme, setAppTheme } = useAppTheme();

    // Array of available wallpapers to choose from
    const wallpapers = [
        { id: 'mac-dark', name: 'macOS Dark', src: '/Images/mac-black-wallpaper.png', color: 'bg-gray-900' },
        { id: 'mac-dark-alt', name: 'macOS Dark Alt', src: '/Images/mac-black-wallpaper-alt.png', color: 'bg-black' },
        { id: 'sequoia-light', name: 'Sequoia Light', src: '/Images/sequoia-light.jpg', color: 'bg-green-100' },
        { id: 'sequoia-dark', name: 'Sequoia Dark', src: '/Images/sequoia-dark.jpg', color: 'bg-green-900' },
    ];

    const handleWallpaperChange = (id: string) => {
        // Basic local storage update for now; Desktop.tsx should ideally listen to this.
        // In a real app we'd use Context, but for a simple demo dispatching an event works.
        localStorage.setItem('macWallpaper', id);
        window.dispatchEvent(new Event('wallpaper-change'));
    };

    return (
        <div className="flex w-full h-full bg-white/50 dark:bg-[#1e1e1e]/50 rounded-b-xl overflow-hidden text-gray-800 dark:text-gray-200">
            {/* Sidebar */}
            <div className="hidden md:flex w-1/3 max-w-[200px] border-r border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 flex-col p-4 overflow-y-auto shrink-0">
                <div className="flex items-center gap-3 mb-6 p-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden">
                        {/* User Profile placeholder */}
                        <UserIcon />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Anubhab</h3>
                        <p className="text-xs text-gray-500">Apple ID</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavItem icon={<Monitor size={16} />} label="Appearance" active />
                    <NavItem icon={<ImageIcon size={16} />} label="Wallpaper" />
                    {/* Add more fake sections as needed */}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Appearance</h2>

                {/* Theme Toggle */}
                <div className="mb-10">
                    <p className="text-sm mb-4">Choose between light and dark themes.</p>
                    <div className="flex gap-6">
                        <button
                            onClick={() => setTheme('light')}
                            className={`flex flex-col items-center gap-2 group`}
                        >
                            <div className={`p-1 rounded-lg border-2 transition-colors ${theme === 'light' ? 'border-blue-500' : 'border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-600'}`}>
                                <div className="w-24 h-16 bg-gray-100 rounded shadow-inner flex items-center justify-center">
                                    <Sun className="text-yellow-500" />
                                </div>
                            </div>
                            <span className="text-xs font-medium">Light</span>
                        </button>

                        <button
                            onClick={() => setTheme('dark')}
                            className={`flex flex-col items-center gap-2 group`}
                        >
                            <div className={`p-1 rounded-lg border-2 transition-colors ${theme === 'dark' ? 'border-blue-500' : 'border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-600'}`}>
                                <div className="w-24 h-16 bg-gray-800 rounded shadow-inner flex items-center justify-center">
                                    <Moon className="text-blue-400" />
                                </div>
                            </div>
                            <span className="text-xs font-medium">Dark</span>
                        </button>

                        <button
                            onClick={() => setTheme('system')}
                            className={`flex flex-col items-center gap-2 group`}
                        >
                            <div className={`p-1 rounded-lg border-2 transition-colors ${theme === 'system' ? 'border-blue-500' : 'border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-600'}`}>
                                <div className="w-24 h-16 bg-gradient-to-r from-gray-100 to-gray-800 rounded shadow-inner flex items-center justify-center gap-2">
                                    <Sun size={12} className="text-yellow-500" />
                                    <Moon size={12} className="text-blue-400" />
                                </div>
                            </div>
                            <span className="text-xs font-medium">Auto</span>
                        </button>
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-white/10 w-full mb-8" />

                <h2 className="text-xl font-bold mb-6">App Theme</h2>
                <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 flex items-center justify-between mb-8 shadow-sm">
                    <div>
                        <p className="text-sm font-semibold">Separate App Mode</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This only applies to window content, independent of the macOS system theme.</p>
                    </div>
                    <div className="flex bg-gray-100 dark:bg-white/10 p-1 rounded-lg border border-black/5 dark:border-white/5 scale-110">
                        <button
                            onClick={() => setAppTheme('light')}
                            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${appTheme === 'light' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                        >
                            Light
                        </button>
                        <button
                            onClick={() => setAppTheme('dark')}
                            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${appTheme === 'dark' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-500' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}
                        >
                            Dark
                        </button>
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-white/10 w-full mb-8" />

                <h2 className="text-xl font-bold mb-6">Wallpaper</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wallpapers.map(wp => (
                        <div
                            key={wp.id}
                            onClick={() => handleWallpaperChange(wp.id)}
                            className="cursor-pointer group flex flex-col items-center gap-2"
                        >
                            <div className={`w-full aspect-video rounded-lg ${wp.color} shadow-sm border-2 border-transparent group-hover:border-blue-400 transition-colors overflow-hidden flex items-center justify-center relative`}>
                                <ImageIcon className="text-white/50 z-10" />
                                {/* Fallback color box for dev before images added */}
                            </div>
                            <span className="text-xs text-center">{wp.name}</span>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-gray-200 dark:bg-white/10 w-full my-8" />

                <h2 className="text-xl font-bold mb-6">Display & Brightness</h2>
                <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 flex flex-col gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        <Sun size={16} className="text-gray-400 shrink-0" />
                        <input
                            type="range"
                            min="20"
                            max="100"
                            defaultValue="100"
                            onChange={(e) => {
                                const val = parseInt(e.target.value) / 100;
                                document.documentElement.style.filter = `brightness(${val})`;
                            }}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <Sun size={24} className="text-gray-400 shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors ${active ? 'bg-blue-500 text-white shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>
            <span className={active ? 'text-white' : 'text-blue-500 dark:text-gray-400'}>{icon}</span>
            {label}
        </div>
    );
}

function UserIcon() {
    return (
        <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    );
}
