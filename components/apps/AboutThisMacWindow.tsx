"use client";

import React, { useState } from 'react';

interface AboutThisMacWindowProps {
    id: string;
}

export function AboutThisMacWindow({ id }: AboutThisMacWindowProps) {
    const [activeTab, setActiveTab] = useState('Overview');
    const tabs = ['Overview', 'Displays', 'Storage', 'Support', 'Resources'];

    return (
        <div className="flex flex-col w-full h-full bg-white/50 dark:bg-[#1e1e1e]/50 rounded-b-xl overflow-hidden text-gray-800 dark:text-gray-200">

            {/* Top Tabs */}
            <div className="flex justify-center pt-2 pb-1 bg-gray-100 dark:bg-black/20 border-b border-gray-200 dark:border-white/10">
                <div className="flex gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeTab === tab
                                ? 'bg-white dark:bg-white/20 shadow-sm text-gray-900 dark:text-gray-100'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                {activeTab === 'Overview' && (
                    <div className="flex flex-col items-center text-center max-w-sm">
                        {/* Profile Picture */}
                        <div className="mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-xl flex items-center justify-center">
                            <img src="/Images/Anubhab Rakshit Profile Pic.jpg" alt="Anubhab Rakshit" className="w-full h-full object-cover" />
                        </div>

                        <h1 className="text-3xl font-bold mb-1">Anubhab Rakshit</h1>
                        <p className="text-gray-500 text-sm mb-6">Web Developer • UI/UX Designer</p>

                        <div className="flex flex-col gap-2 text-sm text-center border-t border-b border-gray-200 dark:border-white/10 py-4 w-full">
                            <div className="grid grid-cols-[100px_1fr] gap-x-2 text-left">
                                <span className="font-semibold text-right">Role</span>
                                <span>Frontend / Full Stack</span>

                                <span className="font-semibold text-right">Location</span>
                                <span>Kolkata, India</span>

                                <span className="font-semibold text-right">Experience</span>
                                <span>2+ Years</span>

                                <span className="font-semibold text-right">Education</span>
                                <span>Jadavpur University</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 mt-6">
                            © 2026 Anubhab Rakshit. All Rights Reserved. <br />
                            Designed & Built with React, Next.js & Tailwind CSS.
                        </p>
                    </div>
                )}

                {activeTab !== 'Overview' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm mt-12">
                        <p>{activeTab} information is currently unavailable.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
