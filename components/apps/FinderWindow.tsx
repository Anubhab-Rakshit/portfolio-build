"use client";

import React, { useState } from 'react';
import { PROJECTS, SKILLS, ACHIEVEMENTS, EDUCATION, HOBBIES, CERTIFICATIONS, EXPERIENCE } from '@/lib/data';
import {
    Folder, User, LayoutGrid, Award, BookOpen,
    ChevronLeft, ChevronRight, Search, List, Layout, Image as ImageIcon,
    FileText, Medal, ExternalLink
} from 'lucide-react';
import { QuickLook } from './QuickLook';

type FolderType = 'projects' | 'skills' | 'achievements' | 'certifications' | 'education' | 'hobbies' | 'resume' | 'about' | 'experience';

interface FinderWindowProps {
    id: string;
    initialFolder?: string;
    initialProject?: string;
}

export function FinderWindow({ id, initialFolder, initialProject }: FinderWindowProps) {
    const [currentFolder, setCurrentFolder] = useState<FolderType>((initialFolder as FolderType) || 'projects');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    // Auto-open Quick Look if initialProject is passed
    React.useEffect(() => {
        if (initialProject) {
            const proj = PROJECTS.find(p => p.slug === initialProject || p.id === initialProject);
            if (proj) {
                setSelectedProject(proj);
            }
        }
    }, [initialProject]);

    const folders: { id: FolderType; label: string; icon: React.ReactNode }[] = [
        { id: 'projects', label: 'Projects', icon: <LayoutGrid size={16} className="text-blue-500" /> },
        { id: 'experience', label: 'Experience', icon: <LayoutGrid size={16} className="text-blue-500" /> },
        { id: 'skills', label: 'Skills', icon: <BookOpen size={16} className="text-blue-500" /> },
        { id: 'achievements', label: 'Achievements', icon: <Award size={16} className="text-blue-500" /> },
        { id: 'certifications', label: 'Certifications', icon: <Medal size={16} className="text-blue-500" /> },
        { id: 'education', label: 'Education', icon: <User size={16} className="text-blue-500" /> },
        { id: 'hobbies', label: 'Hobbies', icon: <ImageIcon size={16} className="text-blue-500" /> },
        { id: 'resume', label: 'Resume.pdf', icon: <FileText size={16} className="text-red-500" /> },
        { id: 'about', label: 'About Me.txt', icon: <FileText size={16} className="text-gray-500" /> },
    ];

    const renderContent = () => {
        switch (currentFolder) {
            case 'projects':
                return (
                    <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-4 p-4">
                        {PROJECTS.map((proj) => (
                            <div
                                key={proj.id}
                                onClick={() => setSelectedProject(proj)}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                            >
                                {/* Folder icon simulation */}
                                <div className="relative w-16 h-16 @sm:w-20 @sm:h-20 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#4DA5F7] rounded-lg opacity-20" />
                                    <Folder size={48} className="text-[#4DA5F7] fill-current" />
                                    {/* Small app icon inside folder */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm w-6 h-6 shadow overflow-hidden">
                                        <img src={proj.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-center text-gray-800 dark:text-gray-200 line-clamp-2">
                                    {proj.title}
                                </span>
                            </div>
                        ))}
                    </div>
                );

            case 'achievements':
                return (
                    <div className="flex flex-col p-4 gap-2 text-sm text-gray-800 dark:text-gray-200">
                        {ACHIEVEMENTS.map((ach, i) => (
                            <div key={i} className="flex justify-between items-center py-3 px-4 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                                        <Award size={20} />
                                    </div>
                                    <span className="font-medium">{ach.title}</span>
                                </div>
                                <span className="text-gray-500 text-xs font-semibold">{ach.date}</span>
                            </div>
                        ))}
                    </div>
                );

            case 'certifications':
                return (
                    <div className="flex flex-col p-4 gap-2 text-sm text-gray-800 dark:text-gray-200">
                        {CERTIFICATIONS.map((cert, i) => (
                            <div key={i} className="flex justify-between items-center py-3 px-4 rounded-xl border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <Medal size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{cert.title}</span>
                                        <span className="text-xs text-gray-500">{cert.issuer}</span>
                                    </div>
                                </div>
                                <span className="text-gray-500 text-xs font-semibold">{cert.date}</span>
                            </div>
                        ))}
                    </div>
                );

            case 'education':
                return (
                    <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4 p-4 text-sm text-gray-800 dark:text-gray-200">
                        {EDUCATION.map((edu, i) => (
                            <div key={i} className="flex flex-col bg-white/50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div className="h-28 overflow-hidden relative">
                                    <img src={edu.image} alt={edu.institution} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-2 left-3 text-white">
                                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{edu.duration}</div>
                                        <div className="font-bold truncate max-w-[150px]">{edu.institution}</div>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg">
                                            <BookOpen size={14} />
                                        </div>
                                        <span className="font-bold text-[13px]">{edu.degree}</span>
                                    </div>
                                    {edu.score && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-between">
                                            <span>Academic Performance:</span>
                                            <span className="font-bold text-blue-500">{edu.score}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'skills':
                return (
                    <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4 p-4 text-sm text-gray-800 dark:text-gray-200">
                        {SKILLS.map((skillGroup, i) => (
                            <div key={i} className="bg-white/50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 p-4">
                                <h3 className="font-bold mb-3 text-blue-500 dark:text-blue-400 border-b border-black/5 dark:border-white/10 pb-2">{skillGroup.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill, j) => (
                                        <span key={j} className="px-2.5 py-1 bg-black/5 dark:bg-white/10 rounded-md text-xs font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'experience':
                return (
                    <div className="flex flex-col p-4 gap-4 text-sm text-gray-800 dark:text-gray-200">
                        {EXPERIENCE.map((exp, i) => (
                            <div key={i} className="flex flex-col bg-white/50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 p-4 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center justify-between mb-3 border-b border-black/5 dark:border-white/10 pb-3">
                                    <div className="flex items-center gap-3">
                                        {exp.logo && exp.logo.startsWith('/') ? (
                                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-black/5 dark:border-white/10 bg-white shadow-sm flex items-center justify-center p-0.5">
                                                <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover rounded-md" />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-black/5 dark:border-white/10 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                                                <Folder size={20} />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-base leading-tight">{exp.role}</span>
                                            <span className="text-gray-500 font-medium text-xs flex mt-0.5 gap-1.5 items-center">
                                                {exp.company}
                                                {exp.url && (
                                                    <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                                        <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 bg-black/5 dark:bg-white/10 px-2 py-1 rounded border border-black/5 dark:border-white/10 mt-1 md:mt-0 shadow-sm shrink-0 whitespace-nowrap hidden @sm:block">{exp.duration}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-400 block @sm:hidden mb-2">{exp.duration}</span>
                                <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-300">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                );

            case 'hobbies':
                return (
                    <div className="grid grid-cols-2 @sm:grid-cols-3 gap-4 p-4 text-sm text-gray-800 dark:text-gray-200">
                        {HOBBIES.map((hobby, idx) => {
                            const gradients = [
                                'from-blue-500 to-cyan-400',
                                'from-purple-500 to-pink-400',
                                'from-emerald-500 to-teal-400',
                                'from-orange-500 to-yellow-400',
                                'from-rose-500 to-red-400',
                                'from-indigo-500 to-violet-400',
                                'from-sky-500 to-blue-400',
                                'from-amber-500 to-orange-400',
                            ];
                            const emojis: Record<string, string> = { code: '💻', music: '🎹', book: '📚', gamepad: '🎮', camera: '📷', mountain: '🏔️', palette: '🎨', soup: '🍜' };
                            return (
                                <div key={idx} className="rounded-xl overflow-hidden border border-black/5 dark:border-white/10 hover:shadow-md transition-shadow">
                                    <div className={`h-20 bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center`}>
                                        <span className="text-4xl">{emojis[hobby.icon || ''] || '⭐'}</span>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-black/20">
                                        <h4 className="font-semibold text-sm">{hobby.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{hobby.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'resume':
                return (
                    <div className="h-full w-full flex flex-col p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold dark:text-white text-black">Anubhab Rakshit Resume</h3>
                            <a href="/resume.pdf" download className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
                                <ExternalLink size={14} />
                                Download PDF
                            </a>
                        </div>
                        <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
                            <iframe
                                src="/resume.pdf"
                                className="w-full h-full border-none"
                                title="Resume PDF"
                            />
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="p-6 h-full bg-[#fdf5e6] dark:bg-[#2C2C2E] font-sans text-sm leading-relaxed text-gray-800 dark:text-gray-200 overflow-y-auto shadow-inner">
                        <h2 className="text-2xl font-bold mb-1">Anubhab Rakshit</h2>
                        <p className="text-blue-500 font-semibold text-sm mb-4">Full Stack Developer & AI Enthusiast</p>
                        <p className="mb-4 leading-relaxed">
                            I'm a passionate developer with expertise in building modern web applications using cutting-edge technologies. With a strong foundation in both frontend and backend development, I create seamless, user-friendly experiences that solve real-world problems.
                        </p>
                        <p className="mb-6 leading-relaxed">
                            My journey in tech began with a fascination for how software can transform lives. Since then, I've worked on various projects ranging from e-commerce platforms to AI-powered applications, always striving to learn and implement the latest technologies.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="https://www.linkedin.com/in/anubhab-rakshit/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">LinkedIn →</a>
                            <a href="https://github.com/Anubhab-Rakshit/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">GitHub →</a>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                            <Folder size={48} className="opacity-20" />
                            <p>Folder contents will appear here</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col h-full bg-white/50 dark:bg-[#1e1e1e]/50 rounded-b-xl overflow-hidden">

            {/* Finder Toolbar */}
            <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50/30 dark:bg-black/10 backdrop-blur-md">

                <div className="flex items-center gap-4">
                    {/* Back/Forward Controls */}
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 opacity-50 cursor-not-allowed">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <h2 className="font-semibold text-gray-800 dark:text-gray-200 text-sm hidden @sm:block">
                        {folders.find(f => f.id === currentFolder)?.label || 'Finder'}
                    </h2>
                </div>

                {/* View Controls & Search */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-200/50 dark:bg-white/10 rounded-md p-1 border border-black/5 dark:border-white/10">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-black/40 shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-500'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1 rounded-sm transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-black/40 shadow-sm' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-500'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>

                    <div className="relative hidden md:block">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-8 pr-3 py-1 bg-gray-200/50 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-md text-xs w-32 focus:w-48 transition-all outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <div className="hidden md:flex w-48 bg-gray-50/50 dark:bg-white/5 border-r border-gray-200 dark:border-white/10 flex-col pt-4 overflow-y-auto backdrop-blur-md">
                    <div className="px-4 mb-2">
                        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            Favorites
                        </span>
                    </div>

                    <ul className="flex flex-col gap-0.5 px-2">
                        {folders.map((folder) => (
                            <li key={folder.id}>
                                <button
                                    onClick={() => setCurrentFolder(folder.id)}
                                    className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors ${currentFolder === folder.id
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'
                                        }`}
                                >
                                    <span className={`${currentFolder === folder.id ? 'text-white' : ''}`}>
                                        {folder.icon}
                                    </span>
                                    {folder.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Browser Content */}
                <div className="flex-1 overflow-y-auto bg-white/50 dark:bg-[#1e1e1e]/50">
                    {renderContent()}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 border-t border-gray-200 dark:border-white/10 flex items-center px-4 bg-gray-50/30 dark:bg-black/10 text-[11px] text-gray-500">
                {currentFolder === 'projects' ? `${PROJECTS.length} items` : ''}
                {currentFolder === 'achievements' ? `${ACHIEVEMENTS.length} items` : ''}
            </div>

            {/* Quick Look overlay */}
            <QuickLook
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}
