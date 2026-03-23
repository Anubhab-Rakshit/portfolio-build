/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useAppTheme } from '@/contexts/AppThemeContext';
import { Wifi, Bluetooth, Airplay, Moon, Sun, Volume2, Play, SkipBack, SkipForward, Pause } from 'lucide-react';

interface ControlCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ControlCenter({ isOpen, onClose }: ControlCenterProps) {
    const { theme, setTheme } = useTheme();
    const { appTheme, toggleAppTheme } = useAppTheme();

    // Audio State
    const [audio] = useState(() => typeof Audio !== 'undefined' ? new Audio('/Songs/Perfect.mp3') : null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audio) {
            audio.loop = true;
            const handleEnded = () => setIsPlaying(false);
            audio.addEventListener('ended', handleEnded);
            return () => {
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [audio]);

    const togglePlay = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Invisible backdrop to catch clicks */}
                    <div className="fixed inset-0 z-[9997]" onClick={onClose} />

                    <motion.div
                        className="absolute top-9 right-2 w-[calc(100vw-16px)] sm:w-[320px] bg-white/60 dark:bg-[#1d1d1f]/70 backdrop-blur-3xl border border-white/30 dark:border-white/10 rounded-[28px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9998] flex flex-col gap-3 font-sans text-sm select-none"
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Top row: Connectivity & Music Player */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Connectivity Block */}
                            <div className="bg-white/50 dark:bg-white/5 rounded-[22px] p-3 flex flex-col gap-3 border border-white/20 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-2 px-1">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Wifi size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-black dark:text-white text-[12px] leading-tight">Wi-Fi</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Anubhab</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Bluetooth size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-black dark:text-white text-[12px] leading-tight">Bluetooth</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">On</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <Airplay size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-black dark:text-white text-[12px] leading-tight">AirDrop</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Everyone</span>
                                    </div>
                                </div>
                            </div>

                            {/* Music Player Block */}
                            <div className="bg-white/50 dark:bg-white/5 rounded-[22px] p-3 flex flex-col justify-between border border-white/20 dark:border-white/5 shadow-sm overflow-hidden">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                                        <img src="/Images/perfect-cover.jpg" alt="Perfect - Ed Sheeran" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col min-w-0 pr-1">
                                        <span className="font-bold text-black dark:text-white text-[13px] leading-tight truncate">Perfect</span>
                                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate">Ed Sheeran</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-4 mt-2">
                                    <SkipBack size={14} className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white cursor-pointer transition-colors" />
                                    <div
                                        className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                                        onClick={togglePlay}
                                    >
                                        {isPlaying ? <Pause size={14} fill="currentColor" className="text-black dark:text-white" /> : <Play size={14} fill="currentColor" className="text-black dark:text-white ml-0.5" />}
                                    </div>
                                    <SkipForward size={14} className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Mid Row: Focus & Screen Mirroring & Display/Sound */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-3">
                                <div className="bg-white/50 dark:bg-white/5 rounded-[20px] p-3 flex items-center gap-3 border border-white/20 dark:border-white/5 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
                                        <Moon size={16} fill="currentColor" />
                                    </div>
                                    <span className="font-bold text-black dark:text-white text-[13px]">Focus</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div
                                        className="bg-white/50 dark:bg-white/5 rounded-[20px] flex flex-col items-center justify-center py-2.5 cursor-pointer hover:bg-white/70 dark:hover:bg-white/15 transition-colors border border-white/20 dark:border-white/5 shadow-sm"
                                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    >
                                        {theme === 'dark' ? <Moon size={18} className="text-black dark:text-white mb-1" /> : <Sun size={18} className="text-black dark:text-white mb-1" />}
                                        <span className="text-[9px] text-black/80 dark:text-white/80 font-bold uppercase tracking-tight">Dark</span>
                                    </div>
                                    <div
                                        className="bg-white/50 dark:bg-white/5 rounded-[20px] flex flex-col items-center justify-center py-2.5 cursor-pointer hover:bg-white/70 dark:hover:bg-white/15 transition-colors border border-white/20 dark:border-white/5 shadow-sm font-bold"
                                        onClick={toggleAppTheme}
                                    >
                                        {appTheme === 'dark' ? <Sun size={18} className="text-blue-500 mb-1" /> : <Moon size={18} className="text-black dark:text-white mb-1" />}
                                        <span className="text-[9px] text-black/80 dark:text-white/80 uppercase tracking-tight">Theme</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Sliders moved here for better balance in Sequoia style */}
                                <div className="bg-white/50 dark:bg-white/5 rounded-[20px] p-3 flex flex-col gap-3 border border-white/20 dark:border-white/5 shadow-sm">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[10px] font-bold text-black/60 dark:text-white/60 uppercase tracking-wider">Display</span>
                                            <Sun size={10} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <div className="w-full h-[6px] bg-black/5 dark:bg-white/10 rounded-full relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 bg-white dark:bg-blue-500 w-[85%] rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-[10px] font-bold text-black/60 dark:text-white/60 uppercase tracking-wider">Sound</span>
                                            <Volume2 size={10} className="text-black/40 dark:text-white/40" />
                                        </div>
                                        <div className="w-full h-[6px] bg-black/5 dark:bg-white/10 rounded-full relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 bg-white dark:bg-blue-500 w-[60%] rounded-full shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Controls */}
                        <div className="flex justify-center bg-white/30 dark:bg-white/5 rounded-[20px] py-1.5 border border-white/10 mt-1 cursor-pointer hover:bg-white/40 dark:hover:bg-white/10 transition-colors">
                            <span className="text-[10px] font-bold text-black/50 dark:text-white/50 tracking-wide uppercase">Edit Controls</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
