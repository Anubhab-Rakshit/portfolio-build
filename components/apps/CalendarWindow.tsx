"use client";

import React, { useState, useEffect } from 'react';
import { EDUCATION, ACHIEVEMENTS } from '@/lib/data';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, AlignLeft } from 'lucide-react';

interface CalendarWindowProps {
    id: string;
}

export function CalendarWindow({ id }: CalendarWindowProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    // No mock events – clean calendar with only today highlighted
    const events: { day: number; title: string; type: string; data: any; color: string }[] = [];

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const jumpToToday = () => {
        setCurrentDate(new Date());
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const startDayOfWeek = getFirstDayOfMonth(currentDate);

    const blanks = Array.from({ length: startDayOfWeek }).map((_, i) => i);
    const days = Array.from({ length: daysInMonth }).map((_, i) => i + 1);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

    return (
        <div className="flex flex-col w-full h-full liquid-glass rounded-b-xl overflow-hidden relative text-gray-800 dark:text-gray-200" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>

            {/* Toolbar */}
            <div className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50/30 dark:bg-black/10">
                <div className="flex items-center gap-4">
                    <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block">
                        <AlignLeft size={18} />
                    </button>

                    <div className="flex items-center gap-1">
                        <button onClick={prevMonth} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextMonth} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <span className="font-semibold text-lg hover:text-blue-500 cursor-pointer transition-colors" onClick={jumpToToday}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex bg-black/5 dark:bg-white/10 rounded-md p-1 border border-black/5 dark:border-white/5 text-xs font-medium">
                        <button className="px-3 py-1 rounded-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Day</button>
                        <button className="px-3 py-1 rounded-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Week</button>
                        <button className="px-3 py-1 rounded-sm bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white transition-colors">Month</button>
                        <button className="px-3 py-1 rounded-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Year</button>
                    </div>

                    <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="flex flex-1 overflow-hidden">
                {/* Calendar Grid */}
                <div className="flex-1 flex flex-col bg-transparent">
                    {/* Days of Week Header */}
                    <div className="grid grid-cols-7 border-b border-gray-200 dark:border-white/10 bg-white/30 dark:bg-black/10">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                            <div key={day} className={`py-2 text-right pr-2 text-[11px] font-semibold tracking-wide ${idx === 0 || idx === 6 ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid Cells */}
                    <div className="flex-1 grid grid-cols-7 auto-rows-fr gap-px border-l border-gray-200 dark:border-white/10 bg-gray-200/50 dark:bg-white/10">
                        {blanks.map(b => (
                            <div key={`blank-${b}`} className="bg-white/50 dark:bg-black/20 p-1 pointer-events-none" />
                        ))}

                        {days.map(d => {
                            const dayEvents = events.filter(e => e.day === d);
                            const isToday = isCurrentMonth && d === today.getDate();

                            return (
                                <div
                                    key={d}
                                    className={`bg-white/80 dark:bg-[#1e1e1e]/80 p-1 flex flex-col border-b border-r border-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group relative cursor-default ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                                >
                                    <div className="flex justify-end pr-1">
                                        <span className={`text-right text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-red-500 text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {d}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-[2px] mt-1 px-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
                                        {dayEvents.map((evt, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedEvent(evt)}
                                                className={`${evt.color} text-white shadow-sm text-[10px] font-medium px-1.5 py-[3px] rounded-[4px] truncate cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all`}
                                            >
                                                {evt.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Fill the remainder of the last row if needed */}
                        {Array.from({ length: (7 - ((blanks.length + days.length) % 7)) % 7 }).map((_, i) => (
                            <div key={`end-blank-${i}`} className="bg-white/50 dark:bg-black/20 p-1 pointer-events-none" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Event Details Popover (Simulated) */}
            {selectedEvent && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
                    <div className="liquid-glass-strong p-6 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col relative transform transition-all scale-100">

                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                        >
                            <svg width="12" height="12" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-600 dark:text-gray-300">
                                <line x1="2" y1="2" x2="8" y2="8" />
                                <line x1="8" y1="2" x2="2" y2="8" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-3 mb-4 mt-2">
                            <div className={`w-3 h-3 rounded-full shadow-sm ${selectedEvent.color}`} />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{selectedEvent.title}</h3>
                        </div>

                        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-start gap-3">
                                <CalendarIcon size={18} className="mt-0.5 flex-shrink-0 text-gray-400" />
                                <span className="font-medium">
                                    {selectedEvent.type === 'edu'
                                        ? selectedEvent.data.duration
                                        : (selectedEvent.data.date || `${monthNames[currentDate.getMonth()]} ${selectedEvent.day}, ${currentDate.getFullYear()}`)}
                                </span>
                            </div>

                            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl shadow-inner border border-black/5 dark:border-white/5 leading-relaxed text-[13px]">
                                {selectedEvent.type === 'edu' ? (
                                    <>
                                        <span className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">{selectedEvent.data.institution}</span>
                                        <span className="text-gray-500 dark:text-gray-400">Score: {selectedEvent.data.score}</span>
                                    </>
                                ) : (
                                    selectedEvent.data.description
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
