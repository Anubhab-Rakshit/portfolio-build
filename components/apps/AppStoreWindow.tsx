"use client";

import React, { useState } from 'react';
import { PROJECTS } from '@/lib/data';
import { useWindowContext } from '@/contexts/WindowContext';
import { ChevronLeft, ChevronRight, Search, DownloadCloud, Star } from 'lucide-react';
import { QuickLook } from './QuickLook'; // Re-use the modal from Finder

interface AppStoreWindowProps {
    id: string;
}

export function AppStoreWindow({ id }: AppStoreWindowProps) {
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const [currentTab, setCurrentTab] = useState('Discover');

    const featured = PROJECTS.slice(0, 3);
    const gridProjects = PROJECTS.slice(3);

    const tabs = ['Discover', 'Arcade', 'Create', 'Work', 'Play', 'Develop', 'Categories', 'Updates'];

    return (
        <div className="flex w-full h-full bg-white/50 dark:bg-[#1e1e1e]/50 rounded-b-xl overflow-hidden text-gray-800 dark:text-gray-200">

            {/* Sidebar */}
            <div className="hidden md:flex w-56 flex-shrink-0 bg-gray-50/80 dark:bg-white/5 border-r border-gray-200 dark:border-white/10 flex-col pt-4 backdrop-blur-xl">

                {/* Search */}
                <div className="px-4 mb-4">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-8 pr-3 py-1.5 bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />
                    </div>
                </div>

                <ul className="flex flex-col px-2 gap-1 overflow-y-auto pb-4">
                    {tabs.map(tab => (
                        <li key={tab}>
                            <button
                                onClick={() => setCurrentTab(tab)}
                                className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm transition-colors font-medium ${currentTab === tab
                                    ? 'bg-blue-500 text-white shadow-sm'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                            >
                                {/* Minimal Icons based on tab type for visuals */}
                                {tab === 'Discover' && <Star size={16} />}
                                {tab === 'Updates' && <DownloadCloud size={16} />}
                                {tab !== 'Discover' && tab !== 'Updates' && <div className="w-4 h-4" />}
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* User Account bottom area */}
                <div className="mt-auto p-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold truncate">Anubhab Rakshit</span>
                            <span className="text-[10px] text-gray-500 truncate">Account</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-white/50 dark:bg-[#1e1e1e]/50">

                {/* Invisible Toolbar for drag region & back buttons */}
                <div className="absolute top-0 inset-x-0 h-12 z-20 flex items-center px-4 pointer-events-none">
                    <div className="flex items-center gap-1 text-gray-400 pointer-events-auto">
                        <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed bg-white/50 dark:bg-black/50 backdrop-blur-md">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-50 cursor-not-allowed bg-white/50 dark:bg-black/50 backdrop-blur-md">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Flow */}
                <div className="flex-1 overflow-y-auto">
                    {currentTab === 'Discover' ? (
                        <div className="pb-12">

                            {/* Featured Hero Carousel section */}
                            <div className="w-full overflow-x-auto flex snap-x snap-mandatory pt-14 pb-8 px-8 gap-6 no-scrollbar">
                                {featured.map(proj => (
                                    <div
                                        key={proj.id}
                                        onClick={() => setSelectedProject(proj)}
                                        className="shrink-0 w-full sm:w-[600px] h-80 rounded-2xl overflow-hidden relative shadow-lg cursor-pointer group snap-center border border-black/5 dark:border-white/10"
                                    >
                                        <img
                                            src={proj.image}
                                            alt={proj.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />

                                        {/* Dark gradient overlay for text readability */}
                                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

                                        <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1 block">Featured App</span>
                                                <h2 className="text-3xl font-bold mb-2">{proj.title}</h2>
                                                <p className="text-sm opacity-90 line-clamp-2">{proj.description}</p>
                                            </div>
                                            <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-sm font-semibold transition-colors">
                                                GET
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Grid Section */}
                            <div className="px-8 mt-6">
                                <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                                    <h2 className="text-2xl font-bold">Great Apps for Developers</h2>
                                    <button className="text-blue-500 text-sm hover:underline">See All</button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                                    {gridProjects.map(proj => (
                                        <div
                                            key={proj.id}
                                            className="flex gap-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 p-3 rounded-xl transition-colors -ml-3"
                                            onClick={() => setSelectedProject(proj)}
                                        >
                                            <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                                                <img
                                                    src={proj.image}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center border-b border-gray-100 dark:border-white/5 group-last:border-0 pb-3 min-w-0">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="min-w-0">
                                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{proj.title}</h3>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 md:line-clamp-1 pr-4">{proj.description}</p>
                                                    </div>

                                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                                        <button className="px-4 py-1 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-blue-600 dark:text-blue-400 text-xs font-bold transition-colors">
                                                            GET
                                                        </button>
                                                        {proj.tags[0] && <span className="text-[9px] text-gray-400">In-App Purchases</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4 mt-20">
                            <DownloadCloud size={48} className="opacity-20" />
                            <p>Section "{currentTab}" is under construction</p>
                        </div>
                    )}
                </div>

                {/* Quick Look overlay bound within this window */}
                <QuickLook
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />

            </div>
        </div>
    );
}
