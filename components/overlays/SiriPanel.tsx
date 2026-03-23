"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiriPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SiriPanel({ isOpen, onClose }: SiriPanelProps) {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setQuery('');
            setResponse('What can I help you with?');
            setIsListening(true);
        } else {
            setIsListening(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const lowerQuery = query.toLowerCase();
        setIsListening(false);

        // Mock Siri responses based on keyword matching
        if (lowerQuery.includes('who') || lowerQuery.includes('anubhab')) {
            setResponse("Anubhab Rakshit is a talented Frontend Engineer specializing in React, Next.js, and creating beautiful user interfaces.");
        } else if (lowerQuery.includes('project') || lowerQuery.includes('built')) {
            setResponse("Anubhab has built several impressive projects including ZYNC, FitHub, and NexChat. You can view them all in the About Me or Project Hub!");
        } else if (lowerQuery.includes('contact') || lowerQuery.includes('email')) {
            setResponse("You can contact him at coder.anubhab26@gmail.com. Would you like me to open the Mail app for you?");
        } else if (lowerQuery.includes('skill') || lowerQuery.includes('know')) {
            setResponse("He is highly proficient in Frontend exactly like React and Next.js, Backend with Node.js and Python, and uses tools like Git and Docker.");
        } else if (lowerQuery.includes('resume') || lowerQuery.includes('cv')) {
            setResponse("His resume is available. You can view it by going to the Finder and looking in the Resume folder.");
        } else if (lowerQuery.includes('joke')) {
            setResponse("Why do programmers prefer dark mode? Because light attracts bugs.");
        } else if (lowerQuery.includes('weather')) {
            setResponse("It's always sunny when you're writing good code.");
        } else {
            setResponse("I'm not sure how to answer that yet, but Anubhab is always learning new things!");
        }

        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-[8600] pointer-events-none flex justify-end items-start p-4 pt-10 pr-4">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="w-80 bg-black/40 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative"
                    >
                        {/* Close Button invisible overlay */}
                        <div className="absolute top-2 right-2 z-10">
                            <button
                                onClick={onClose}
                                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white/70 transition-colors"
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <line x1="2" y1="2" x2="8" y2="8" />
                                    <line x1="8" y1="2" x2="2" y2="8" />
                                </svg>
                            </button>
                        </div>

                        {/* Siri Orb Animation */}
                        <div className="h-32 flex items-center justify-center relative bg-gradient-to-b from-white/5 to-transparent">
                            <motion.div
                                animate={{
                                    scale: isListening ? [1, 1.2, 1] : [1, 1.05, 1],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{
                                    scale: { repeat: Infinity, duration: isListening ? 1.5 : 3, ease: "easeInOut" },
                                    rotate: { repeat: Infinity, duration: 8, ease: "linear" }
                                }}
                                className="w-16 h-16 rounded-full relative overflow-hidden blur-[2px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-80 mix-blend-screen" />
                                <div className="absolute inset-0 bg-gradient-to-bl from-cyan-400 via-indigo-500 to-red-500 opacity-80 mix-blend-overlay rotate-45" />
                                <div className="absolute inset-1 bg-black/20 rounded-full backdrop-blur-sm" />
                            </motion.div>
                        </div>

                        {/* Conversation Area */}
                        <div className="flex-1 px-5 pb-5 flex flex-col gap-4">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={response}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-white text-lg font-medium leading-snug drop-shadow-md"
                                >
                                    {response}
                                </motion.div>
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="mt-4 relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Ask Siri..."
                                    className="w-full bg-white/10 border border-white/10 rounded-xl py-2 px-4 text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all shadow-inner text-sm"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
