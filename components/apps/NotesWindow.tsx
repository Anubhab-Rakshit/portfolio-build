"use client";

import React, { useState } from 'react';
import { SKILLS, EDUCATION, HOBBIES } from '@/lib/data';
import { SquarePen, Trash2, Folder, LayoutGrid, List } from 'lucide-react';

type NoteCategory = 'bio' | 'skills' | 'education' | 'hobbies';

interface NotesWindowProps {
    id: string;
}

export function NotesWindow({ id }: NotesWindowProps) {
    const [activeNote, setActiveNote] = useState<NoteCategory>('bio');
    const [search, setSearch] = useState('');
    const [showMobileSidebar, setShowMobileSidebar] = useState(true);

    const notes = [
        { id: 'bio', title: 'About Me', date: 'Today', preview: 'Hi, I am Anubhab Rakshit...' },
        { id: 'skills', title: 'Technical Skills', date: 'Yesterday', preview: 'Frontend, Backend, Tools...' },
        { id: 'education', title: 'Education', date: 'Oct 12', preview: 'B.Tech in Computer Science...' },
        { id: 'hobbies', title: 'Hobbies & Interests', date: 'Sep 24', preview: 'Photography, Gaming...' },
    ];

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

    const renderContent = () => {
        switch (activeNote) {
            case 'bio':
                return (
                    <div className="prose dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Anubhab Rakshit</h1>
                        <p className="text-blue-500 font-semibold text-sm mb-6">Full Stack Developer & AI Enthusiast</p>
                        <p>
                            I'm a passionate developer with expertise in building modern web applications using cutting-edge technologies. With a strong foundation in both frontend and backend development, I create seamless, user-friendly experiences that solve real-world problems.
                        </p>
                        <p>
                            My journey in tech began with a fascination for how software can transform lives. Since then, I've worked on various projects ranging from e-commerce platforms to AI-powered applications, always striving to learn and implement the latest technologies.
                        </p>
                    </div>
                );
            case 'skills':
                return (
                    <div className="prose dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Technical Skills</h1>
                        <div className="flex flex-col gap-8">
                            {SKILLS.map((skillGroup, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">
                                        {skillGroup.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded-md text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'education':
                return (
                    <div className="prose dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Education</h1>
                        <div className="space-y-6">
                            {EDUCATION.map((edu, idx) => (
                                <div key={idx} className="border-l-4 border-yellow-400 pl-4 py-2">
                                    <h3 className="text-lg font-bold m-0">{edu.degree}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 m-0">{edu.institution}</p>
                                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-1">{edu.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'hobbies':
                return (
                    <div className="prose dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Hobbies & Interests</h1>
                        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4">
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
                                return (
                                    <div key={idx} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/20">
                                        <div className={`h-24 bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center`}>
                                            <span className="text-white text-4xl opacity-80">
                                                {hobby.icon === 'code' && '💻'}
                                                {hobby.icon === 'music' && '🎹'}
                                                {hobby.icon === 'book' && '📚'}
                                                {hobby.icon === 'gamepad' && '🎮'}
                                                {hobby.icon === 'camera' && '📷'}
                                                {hobby.icon === 'mountain' && '🏔️'}
                                                {hobby.icon === 'palette' && '🎨'}
                                                {hobby.icon === 'soup' && '🍜'}
                                            </span>
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-semibold m-0">{hobby.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1 m-0">{hobby.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex w-full h-full bg-white/50 dark:bg-[#1e1e1e]/50 rounded-b-xl overflow-hidden">

            {/* Sidebar - Folders & Notes List combined for simplicity */}
            <div className={`${showMobileSidebar ? 'flex' : 'hidden'} md:flex w-full md:w-64 flex-col border-r border-gray-200 dark:border-white/10 bg-[#f6f6f6] dark:bg-black/20`}>

                {/* Notes Toolbar */}
                <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-3">
                    <div className="flex items-center gap-2 text-gray-500">
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
                            <LayoutGrid size={16} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
                            <List size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10">
                            <Trash2 size={16} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-yellow-500">
                            <SquarePen size={16} />
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-md py-1 px-3 text-xs outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 dark:text-gray-200"
                    />
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => { setActiveNote(note.id as NoteCategory); setShowMobileSidebar(false); }}
                            className={`p-3 border-b border-gray-200 dark:border-white/10 cursor-pointer transition-colors ${activeNote === note.id
                                ? 'bg-yellow-100 dark:bg-yellow-900/30'
                                : 'hover:bg-black/5 dark:hover:bg-white/5'
                                }`}
                        >
                            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1 truncate">{note.title}</h4>
                            <div className="flex gap-2 text-xs text-gray-500 truncate">
                                <span className="font-medium whitespace-nowrap">{note.date}</span>
                                <span className="truncate">{note.preview}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-white/50 dark:bg-[#1e1e1e]/50 relative`}>

                {/* Mobile Back Button */}
                <div className="absolute top-4 left-4 md:hidden z-10">
                    <button onClick={() => setShowMobileSidebar(true)} className="flex items-center text-yellow-600 dark:text-yellow-500 gap-1 text-sm bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md active:bg-black/10 transition-colors shadow-sm backdrop-blur-md">
                        <span className="text-xl leading-none">&lsaquo;</span> Notes
                    </button>
                </div>

                {/* Date Header string */}
                <div className="absolute top-4 w-full text-center text-xs text-gray-400 font-medium pointer-events-none mt-1 md:mt-0">
                    {filteredNotes.find(n => n.id === activeNote)?.date} at 10:42 AM
                </div>

                {/* Note Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 pr-6 md:pr-12 pt-16">
                    {renderContent()}
                </div>

                {/* Paper texture overlay for Notes feel */}
                <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] dark:opacity-0"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='%23fff'/%3E%3Cpath d='M0 19h20v1H0z' fill='%23000' opacity='.2'/%3E%3C/svg%3E")` }}
                />
            </div>

        </div>
    );
}
