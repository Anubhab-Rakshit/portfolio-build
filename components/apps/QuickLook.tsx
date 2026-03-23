"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    github?: string;
    demo?: string;
    image: string;
}

interface QuickLookProps {
    project: Project | null;
    onClose: () => void;
}

export function QuickLook({ project, onClose }: QuickLookProps) {
    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === ' ') {
                e.preventDefault();
                onClose();
            }
        };
        if (project) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[99999] flex items-center justify-center p-4 sm:p-12 pointer-events-auto"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-full bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
                    >
                        {/* Toolbar */}
                        <div className="h-12 border-b border-black/10 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50/30 dark:bg-black/10 shrink-0">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onClose}
                                    className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#ff4b42] focus:outline-none flex items-center justify-center group"
                                >
                                    <X size={8} className="text-[#4C0000] opacity-0 group-hover:opacity-100" />
                                </button>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Quick Look - {project.title}
                            </span>
                            <div className="w-10"></div> {/* Spacer for centering */}
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-4 @sm:p-6 flex flex-col @md:flex-row gap-6 @md:gap-8 min-h-0">
                            {/* Left col - Image */}
                            <div className="w-full @md:w-1/2 flex-shrink-0">
                                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1e1e1e/4DA5F7?text=Project+Image' }}
                                    />
                                </div>

                                <div className="mt-6 flex gap-3">
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <ExternalLink size={16} /> Open App
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <Github size={16} /> Source Code
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right col - Info */}
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {project.title}
                                </h1>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                    <p>{project.description}</p>

                                    {/* Detailed mock content if longDescription missing from data layer */}
                                    <h3 className="text-gray-800 dark:text-gray-200 font-semibold mt-6 mb-2">Key Features</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Cross-platform desktop native app architecture</li>
                                        <li>End-to-end encryption for security</li>
                                        <li>Real-time websocket synchronization</li>
                                        <li>Modern, responsive, pixel-perfect user interface</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
