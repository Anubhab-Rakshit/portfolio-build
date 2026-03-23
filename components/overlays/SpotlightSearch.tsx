"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, CornerDownLeft, FileText, Code, Award } from 'lucide-react';
import { PROJECTS, SKILLS, ACHIEVEMENTS } from '@/lib/data';
import { useWindowContext } from '@/contexts/WindowContext';

interface SpotlightSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { openWindow } = useWindowContext();

    // Aggregate searchable items
    const searchableItems = [
        ...PROJECTS.map(p => ({ type: 'project', title: p.title, desc: p.description, icon: <FileText size={16} />, action: () => openWindow('finder', 'Finder') })), // Would ideally open QuickLook
        ...SKILLS.flatMap(s => s.items.map(item => ({ type: 'skill', title: item, desc: `Skill under ${s.category}`, icon: <Code size={16} />, action: () => openWindow('notes', 'Notes') }))),
        ...ACHIEVEMENTS.map(a => ({ type: 'achievement', title: a.title, desc: `Achieved ${a.date}`, icon: <Award size={16} />, action: () => openWindow('finder', 'Finder') }))
    ];

    const results = query.trim() === ''
        ? []
        : searchableItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.desc.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Handle keyboard navigation within the prompt
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            results[selectedIndex].action();
            onClose();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="absolute inset-0 z-[8500] flex items-start justify-center pt-32 bg-transparent"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="w-full max-w-2xl bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur-3xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-white/10 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input Area */}
                        <div className="flex items-center px-4 py-3 border-b border-gray-200/50 dark:border-white/10">
                            <Search size={24} className="text-gray-400 dark:text-gray-300 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Spotlight Search"
                                className="w-full bg-transparent text-2xl outline-none ml-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-light"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 transition-colors"
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M3 3L11 11M11 3L3 11" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Results Area */}
                        {query.trim() !== '' && (
                            <div className="flex flex-col sm:flex-row bg-white/50 dark:bg-black/20 overflow-y-auto max-h-[70vh]">
                                {/* Result List */}
                                <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-200/50 dark:border-white/10 p-2 min-h-[200px] sm:min-h-[300px] flex flex-col">
                                    {results.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                            {results.map((result, idx) => (
                                                <div
                                                    key={idx}
                                                    onMouseEnter={() => setSelectedIndex(idx)}
                                                    onClick={() => {
                                                        result.action();
                                                        onClose();
                                                    }}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${idx === selectedIndex
                                                        ? 'bg-blue-500 text-white'
                                                        : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200'
                                                        }`}
                                                >
                                                    <div className={`p-1.5 rounded-md ${idx === selectedIndex ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/10'} shrink-0`}>
                                                        {result.icon}
                                                    </div>
                                                    <div className="flex flex-col overflow-hidden">
                                                        <span className="text-sm font-medium truncate">{result.title}</span>
                                                        {result.type !== 'skill' && (
                                                            <span className={`text-xs truncate ${idx === selectedIndex ? 'text-blue-100' : 'text-gray-500'}`}>
                                                                {result.desc}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                                            No Results
                                        </div>
                                    )}
                                </div>

                                {/* Result Preview Panel */}
                                <div className="hidden sm:flex w-1/2 p-6 flex-col items-center justify-center text-center bg-transparent relative">
                                    {results[selectedIndex] && (
                                        <>
                                            <div className="w-24 h-24 mb-6 text-gray-300 dark:text-gray-600 flex items-center justify-center">
                                                {results[selectedIndex].type === 'project' ? <FileText size={80} strokeWidth={1} /> :
                                                    results[selectedIndex].type === 'skill' ? <Code size={80} strokeWidth={1} /> :
                                                        <Award size={80} strokeWidth={1} />}
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                                {results[selectedIndex].title}
                                            </h2>
                                            <p className="text-sm text-gray-500 line-clamp-4">
                                                {results[selectedIndex].desc}
                                            </p>

                                            <div className="absolute bottom-4 inset-x-0 flex justify-center text-xs text-gray-400 gap-4 opacity-50">
                                                <span className="flex items-center gap-1"><Command size={10} /> O to open</span>
                                                <span className="flex items-center gap-1"><CornerDownLeft size={10} /> to select</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
