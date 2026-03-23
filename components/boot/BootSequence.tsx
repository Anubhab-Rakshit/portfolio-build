"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BootSequenceProps {
    onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
    const [stage, setStage] = useState<'booting' | 'login' | 'done'>('booting');

    // Boot screen timing
    useEffect(() => {
        if (stage === 'booting') {
            const timer = setTimeout(() => {
                setStage('login');
            }, 3500); // 3.5 seconds of Apple log
            return () => clearTimeout(timer);
        }
    }, [stage]);

    // Auto-login timing for better UX
    useEffect(() => {
        if (stage === 'login') {
            const timer = setTimeout(() => {
                handleLogin();
            }, 2500); // Auto login after 2.5 seconds
            return () => clearTimeout(timer);
        }
    }, [stage]);

    const handleLogin = () => {
        setStage('done');
        // Store in session so refreshes skip this
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('macBootDone', 'true');
        }
        setTimeout(onComplete, 500); // Wait for flash animation
    };

    return (
        <AnimatePresence mode="wait">
            {stage === 'booting' && (
                <motion.div
                    key="boot"
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Apple Logo SVG */}
                    <motion.svg
                        className="w-24 h-24 mb-16 text-white"
                        viewBox="0 0 512 512"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 104.8-130.4-36.7-19.2-64.3-51.4-63.9-80.2z" />
                        <path fill="currentColor" d="M313.6 88.8c19.3-25.2 30.6-59.3 27.2-94.4-27 1.5-62 16.7-82.6 42.4-18.2 22.8-31 58.1-26.9 92.4 31.2 2.3 64.6-15.2 82.3-40.4z" />
                    </motion.svg>

                    {/* Progress Bar */}
                    <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1, duration: 2, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}

            {stage === 'login' && (
                <motion.div
                    key="login"
                    className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: 'url(/Images/mac-black-wallpaper-alt.png)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Blur Overlay */}
                    <div className="absolute inset-0 backdrop-blur-2xl bg-black/20" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Profile AR Circle */}
                        <motion.div
                            className="flex items-center justify-center w-[120px] h-[120px] rounded-full mt-10 mb-4 mx-auto bg-gradient-to-b from-[#A5A5A5] to-[#757575] shadow-[inset_0_-2px_10px_rgba(0,0,0,0.2),0_10px_30px_rgba(0,0,0,0.3)] border-2 border-white/10"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-white text-5xl font-medium tracking-tighter">AR</span>
                        </motion.div>

                        <motion.h1
                            className="text-white font-semibold text-2xl tracking-wide mb-6 drop-shadow-md"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Anubhab Rakshit
                        </motion.h1>

                        <motion.form
                            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                            className="relative flex items-center"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <input
                                autoFocus
                                type="password"
                                placeholder="Enter Password"
                                className="w-48 h-[28px] rounded-full bg-white/20 border border-white/20 pl-4 pr-8 text-[13px] text-white placeholder:text-white/70 focus:outline-none backdrop-blur-3xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] select-all"
                                style={{ WebkitAppRegion: 'no-drag' } as any}
                            />
                            <div className="absolute right-1 w-[20px] h-[20px] rounded-full border-[1.5px] border-white/40 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                                <span className="text-white/80 text-[10px] font-bold">?</span>
                            </div>
                        </motion.form>

                        <motion.p
                            className="text-white/60 text-xs mt-6 mt-[15vh] fixed bottom-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Click or press Enter to login
                        </motion.p>
                    </div>
                </motion.div>
            )}

            {/* Flash Effect on Login */}
            {stage === 'done' && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white pointer-events-none"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            )}
        </AnimatePresence>
    );
}
