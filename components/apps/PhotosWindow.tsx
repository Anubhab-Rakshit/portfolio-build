"use client";

import React, { useState } from 'react';
import { CERTIFICATIONS, HOBBIES, PIANO_PERFORMANCES } from '@/lib/data';
import { Sidebar, Image as ImageIcon, Heart, Search, Plus, Share, Expand, X, Award, PlayCircle, Folder, Code, Music, Book, Gamepad, Camera, Mountain, Palette, Soup } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'certificates' | 'hobbies' | 'videos' | 'gallery';

interface PhotosWindowProps {
    id: string;
}

export function PhotosWindow({ id }: PhotosWindowProps) {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('certificates');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(true);

    const getHobbyIcon = (iconName: string) => {
        switch (iconName) {
            case 'code': return <Code size={24} />;
            case 'music': return <Music size={24} />;
            case 'book': return <Book size={24} />;
            case 'gamepad': return <Gamepad size={24} />;
            case 'camera': return <Camera size={24} />;
            case 'mountain': return <Mountain size={24} />;
            case 'palette': return <Palette size={24} />;
            case 'soup': return <Soup size={24} />;
            default: return <Folder size={24} />;
        }
    };

    return (
        <div className="flex w-full h-full bg-transparent rounded-b-xl overflow-hidden text-gray-800 dark:text-gray-200">

            {/* Sidebar */}
            <div className={`${showMobileSidebar ? 'flex' : 'hidden md:flex'} w-full md:w-56 flex-shrink-0 bg-white/40 dark:bg-black/20 border-r border-gray-200/50 dark:border-white/10 flex-col pt-4 backdrop-blur-md`}>
                <div className="px-4 mb-2">
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                        Library
                    </span>
                    <ul className="flex flex-col px-2 gap-0.5 mb-6">
                        <li>
                            <button
                                onClick={() => { setActiveCategory('certificates'); setShowMobileSidebar(false); }}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === 'certificates' ? 'bg-blue-500/90 text-white shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'}`}
                            >
                                <Award size={16} />
                                Certifications
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => { setActiveCategory('hobbies'); setShowMobileSidebar(false); }}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === 'hobbies' ? 'bg-blue-500/90 text-white shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'}`}
                            >
                                <Heart size={16} />
                                Hobbies
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => { setActiveCategory('videos'); setShowMobileSidebar(false); }}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === 'videos' ? 'bg-blue-500/90 text-white shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'}`}
                            >
                                Piano Videos
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => { setActiveCategory('gallery'); setShowMobileSidebar(false); }}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === 'gallery' ? 'bg-blue-500/90 text-white shadow-sm' : 'text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'}`}
                            >
                                <ImageIcon size={16} />
                                Gallery
                            </button>
                        </li>
                    </ul>

                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                        Albums
                    </span>
                    <ul className="flex flex-col px-2 gap-0.5">
                        <li>
                            <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <div className="w-4 h-4 rounded-sm bg-blue-100/50 dark:bg-blue-900/50 border border-blue-200/50 dark:border-blue-700/50" />
                                Hackathons
                            </button>
                        </li>
                        <li>
                            <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <div className="w-4 h-4 rounded-sm bg-green-100/50 dark:bg-green-900/50 border border-green-200/50 dark:border-green-700/50" />
                                Courses
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className={`${!showMobileSidebar ? 'flex' : 'hidden md:flex'} flex-1 flex flex-col bg-white/20 dark:bg-black/10 backdrop-blur-sm`}>

                {/* Toolbar */}
                <div className="h-12 border-b border-gray-200/50 dark:border-white/10 flex items-center justify-between px-4 bg-white/30 dark:bg-black/20">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <button onClick={() => setShowMobileSidebar(true)} className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <Sidebar size={18} />
                        </button>
                        <div className="flex bg-white/50 dark:bg-black/40 p-0.5 rounded-md text-xs font-medium ml-2 border border-black/5 dark:border-white/5">
                            <button className="px-3 py-1 rounded-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Years</button>
                            <button className="px-3 py-1 rounded-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Months</button>
                            <button className="px-3 py-1 rounded-sm bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white transition-colors capitalize">
                                {activeCategory === 'certificates' ? 'All Certificates' : activeCategory}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="relative hidden @sm:block">
                            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-8 pr-3 py-1 bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-md text-xs w-32 focus:w-48 transition-all outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                        </div>
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <Plus size={18} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <Share size={18} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 @sm:p-6 pb-12">
                    {activeCategory === 'certificates' && (
                        <div className="space-y-8">
                            <div className="flex items-baseline justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Recent Certifications</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Various Institutions</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 @sm:gap-4">
                                {CERTIFICATIONS.map((cert, idx) => (
                                    <div
                                        key={idx}
                                        className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-700/50 rounded-xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
                                        onClick={() => setSelectedItem(cert)}
                                    >
                                        {cert.image ? (
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <>
                                                <Award size={40} className="text-blue-500/50 mb-3 group-hover:scale-110 transition-transform duration-300" />
                                                <div className="p-4">
                                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2">{cert.title}</h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cert.issuer}</p>
                                                </div>
                                            </>
                                        )}
                                        {/* Overlay info on hover for images */}
                                        {cert.image && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-3 text-white">
                                                <h4 className="font-bold text-xs line-clamp-1">{cert.title}</h4>
                                                <p className="text-[10px] opacity-80">{cert.issuer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeCategory === 'hobbies' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {HOBBIES.map((hobby, idx) => (
                                <div key={idx} className="bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 rounded-2xl flex flex-col gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                        {getHobbyIcon(hobby.icon || '')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{hobby.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{hobby.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeCategory === 'videos' && (
                        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-6">
                            {PIANO_PERFORMANCES.map((video, idx) => (
                                <div
                                    key={idx}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedItem({ ...video, type: 'video' })}
                                >
                                    <div className="aspect-video bg-black rounded-lg overflow-hidden relative border border-white/10 mb-2">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.youtube_url.split('/').pop()}/maxresdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
                                                <PlayCircle size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-sm tracking-tight">{video.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{video.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeCategory === 'gallery' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div
                                className="aspect-[4/5] sm:aspect-square bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden border border-black/5 dark:border-white/10 relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                                onClick={() => setSelectedItem({ title: 'Anubhab Rakshit', date: '2024', image: '/Images/Anubhab Rakshit Profile Pic.jpg', type: 'gallery' })}
                            >
                                <img src="/Images/Anubhab Rakshit Profile Pic.jpg" alt="Anubhab Rakshit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Heart size={16} className="text-white fill-white drop-shadow-md" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox / Video Player */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90 flex flex-col backdrop-blur-2xl"
                    >
                        {/* Player Toolbar */}
                        <div className="h-14 flex items-center justify-between px-4 bg-black/20 text-white z-10 border-b border-white/10">
                            <button
                                onClick={() => {
                                    setSelectedItem(null);
                                    setIsFullScreen(false);
                                }}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center">
                                <p className="font-semibold text-sm">{selectedItem.title}</p>
                                <p className="text-xs text-gray-400 tracking-tight">{selectedItem.type === 'video' ? 'QuickTime Player' : selectedItem.issuer || 'May 2024'}</p>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><Share size={16} /></button>
                                <button
                                    onClick={() => setIsFullScreen(!isFullScreen)}
                                    className={`p-2 rounded-full transition-colors ${isFullScreen ? 'bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
                                >
                                    <Expand size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 flex items-center justify-center p-4 sm:p-12 relative overflow-hidden">
                            {selectedItem.type === 'video' ? (
                                <div className={`w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden border border-white/20 shadow-2xl relative group transition-all duration-500 ${isFullScreen ? 'fixed inset-0 max-w-none z-[100] rounded-none' : ''}`}>
                                    <iframe
                                        src={`${selectedItem.youtube_url}?autoplay=1`}
                                        className="w-full h-full border-none"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    {isFullScreen && (
                                        <button
                                            onClick={() => setIsFullScreen(false)}
                                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{
                                        scale: isFullScreen ? 1.2 : 1,
                                        y: 0,
                                        width: isFullScreen ? '100vw' : 'auto',
                                        height: isFullScreen ? '100vh' : 'auto',
                                    }}
                                    className={`relative flex flex-col items-center ${isFullScreen ? 'fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0' : ''}`}
                                >
                                    {selectedItem.image ? (
                                        <div className={`relative w-full max-w-4xl max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 ${isFullScreen ? 'max-w-none max-h-none h-screen w-screen rounded-none border-none' : ''}`}>
                                            <img
                                                src={selectedItem.image}
                                                alt={selectedItem.title}
                                                className={`w-full h-full ${isFullScreen ? 'object-contain' : 'object-contain'}`}
                                            />
                                            {isFullScreen && (
                                                <button
                                                    onClick={() => setIsFullScreen(false)}
                                                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md"
                                                >
                                                    <X size={24} />
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-[300px] sm:w-[500px] aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20 flex flex-col items-center justify-center p-8 text-center shadow-2xl backdrop-blur-md">
                                            <Award size={80} className="text-blue-500 mb-6 drop-shadow-lg" />
                                            <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                                            <p className="text-blue-400 font-medium mb-1">{selectedItem.issuer}</p>
                                            <p className="text-gray-400 text-sm">Issued {selectedItem.date || 'May 2024'}</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
