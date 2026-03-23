"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Share, Sidebar, Plus, Copy, ExternalLink, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';

interface SafariWindowProps {
    id: string; // WindowContext ID
    initialUrl?: string;
}

interface Tab {
    id: string;
    url: string;
    title: string;
    selectedPost: any | null;
}

export function SafariWindow({ id, initialUrl = 'anubhabrakshit.xyz' }: SafariWindowProps) {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: 'tab-1', url: initialUrl, title: initialUrl, selectedPost: null }
    ]);
    const [activeTabId, setActiveTabId] = useState('tab-1');
    const [inputUrl, setInputUrl] = useState(initialUrl);

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    useEffect(() => {
        setInputUrl(activeTab.url);
    }, [activeTabId, activeTab.url]);

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let finalUrl = inputUrl.trim();

        if (!finalUrl) return;

        // If it looks like a search query
        if (!finalUrl.includes('.') && !finalUrl.startsWith('http') && !finalUrl.startsWith('localhost')) {
            // Bing allows iframe embedding for search, while Google often blocks it with X-Frame-Options
            finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(finalUrl)}`;
        } else if (!finalUrl.startsWith('http') && !finalUrl.startsWith('localhost')) {
            finalUrl = 'https://' + finalUrl;
        }

        updateTab(activeTabId, { url: finalUrl, title: finalUrl, selectedPost: null });
    };

    const updateTab = (tabId: string, updates: Partial<Tab>) => {
        setTabs(prev => prev.map(t => t.id === tabId ? { ...t, ...updates } : t));
    };

    const createTab = () => {
        const newId = `tab-${Date.now()}`;
        const newTab = { id: newId, url: 'https://www.google.com/webhp?igu=1', title: 'New Tab', selectedPost: null };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
    };

    const closeTab = (e: React.MouseEvent, tabId: string) => {
        e.stopPropagation();
        if (tabs.length === 1) return;
        const newTabs = tabs.filter(t => t.id !== tabId);
        setTabs(newTabs);
        if (activeTabId === tabId) {
            setActiveTabId(newTabs[newTabs.length - 1].id);
        }
    };

    return (
        <div className="flex flex-col w-full h-full bg-white dark:bg-[#1e1e1e] rounded-b-xl overflow-hidden font-sans">
            {/* Safari Title/Toolbar Area */}
            <div className="flex flex-col bg-gray-100/80 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
                {/* Top Row: Toolbar */}
                <div className="h-12 flex items-center px-4 gap-4">
                    <button className="hidden md:block p-1.5 rounded-md text-gray-500 hover:bg-black/5 dark:hover:bg-white/10">
                        <Sidebar size={18} />
                    </button>

                    <div className="flex items-center gap-1 text-gray-400">
                        <button
                            onClick={() => updateTab(activeTabId, { selectedPost: null })}
                            disabled={!activeTab.selectedPost}
                            className={`p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 ${!activeTab.selectedPost ? 'opacity-30' : ''}`}
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 opacity-30">
                            <ChevronRight size={22} />
                        </button>
                    </div>

                    <div className="flex-1 max-w-2xl mx-auto flex items-center relative group">
                        <form onSubmit={handleUrlSubmit} className="w-full relative">
                            <input
                                type="text"
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                className="w-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-md py-1.5 px-8 text-sm text-center focus:text-left focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-200 transition-all"
                            />
                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                                    <path d="M9.5 5.5V4.5C9.5 2.567 7.933 1 6 1C4.067 1 2.5 2.567 2.5 4.5V5.5H2C1.448 5.5 1 5.948 1 6.5V12.5C1 13.052 1.448 13.5 2 13.5H10C10.552 13.5 11 13.052 11 12.5V6.5C11 5.948 10.552 5.5 10 5.5H9.5ZM4 4.5C4 3.395 4.895 2.5 6 2.5C7.105 2.5 8 3.395 8 4.5V5.5H4V4.5ZM6 8.5C6.552 8.5 7 8.948 7 9.5C7 10.052 6.552 10.5 6 10.5C5.448 10.5 5 10.052 5 9.5C5 8.948 5.448 8.5 6 8.5Z" />
                                </svg>
                            </div>
                        </form>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={() => updateTab(activeTabId, { url: inputUrl, selectedPost: null })}
                        >
                            <RotateCw size={14} />
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-gray-500">
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
                            <Share size={18} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10" onClick={createTab}>
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Tab Bar */}
                <div className="h-9 flex px-2 overflow-x-auto select-none space-x-1 no-scrollbar items-end">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`flex items-center justify-between px-3 h-8 text-[11px] font-medium transition-all cursor-default group relative rounded-t-lg border-t border-l border-r ${activeTabId === tab.id
                                ? 'bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white border-black/10 dark:border-white/10 shadow-sm z-10'
                                : 'bg-black/5 dark:bg-white/5 text-gray-500 border-transparent hover:bg-black/10 dark:hover:bg-white/10'
                                } min-w-[120px] max-w-[200px]`}
                        >
                            <span className="truncate pr-4">{tab.url}</span>
                            <button
                                onClick={(e) => closeTab(e, tab.id)}
                                className={`absolute right-1.5 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity ${activeTabId === tab.id ? 'opacity-100' : ''}`}
                            >
                                <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <line x1="2" y1="2" x2="8" y2="8" />
                                    <line x1="8" y1="2" x2="2" y2="8" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={createTab}
                        className="p-1.5 mb-1 rounded-md text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Web Content Render Area */}
            <div className="flex-1 bg-white dark:bg-[#1e1e1e] relative overflow-y-auto">
                {(activeTab.url.includes('anubhabrakshit.xyz') || activeTab.url.includes('localhost') || activeTab.url.includes('127.0.0.1')) ? (
                    <div className="max-w-3xl mx-auto p-4 sm:p-8 text-gray-800 dark:text-gray-200">
                        {!activeTab.selectedPost ? (
                            <>
                                <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Blog</h1>
                                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 sm:mb-12">Thoughts, tutorials, and deep dives into software engineering.</p>
                                <div className="flex flex-col gap-6 sm:gap-8">
                                    {BLOG_POSTS.map(post => (
                                        <article
                                            key={post.id}
                                            onClick={() => updateTab(activeTabId, { selectedPost: post })}
                                            className="border-b border-gray-200 dark:border-white/10 pb-6 sm:pb-8 hover:bg-black/5 dark:hover:bg-white/5 p-3 sm:p-4 rounded-xl transition-colors cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="text-blue-500 font-semibold text-xs sm:text-sm">{post.category}</span>
                                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-bold mt-2 mb-2 sm:mb-3 group-hover:text-blue-500 transition-colors">{post.title}</h2>
                                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                                            <div className="mt-4 text-xs sm:text-sm text-gray-400 flex items-center gap-2">
                                                {post.date} • {post.readTime}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <button
                                    onClick={() => updateTab(activeTabId, { selectedPost: null })}
                                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-6 group text-sm font-medium"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to Blogs
                                </button>
                                <span className="text-blue-500 font-semibold text-sm">{activeTab.selectedPost.category}</span>
                                <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 leading-tight">{activeTab.selectedPost.title}</h1>
                                <div className="flex items-center gap-3 mb-8 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/10">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs uppercase">AR</div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{activeTab.selectedPost.author}</span>
                                        <span>{activeTab.selectedPost.date} • {activeTab.selectedPost.readTime}</span>
                                    </div>
                                </div>
                                <div
                                    className="prose dark:prose-invert prose-blue max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
                                    dangerouslySetInnerHTML={{ __html: activeTab.selectedPost.content }}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <iframe
                        src={activeTab.url.startsWith('http') ? activeTab.url : `https://${activeTab.url}`}
                        className="w-full h-full border-none bg-white"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        title="Safari Browser Window"
                    />
                )}
            </div>
        </div>
    );
}

