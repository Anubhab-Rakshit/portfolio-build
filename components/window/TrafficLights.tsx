"use client";

import React, { useState } from 'react';
import { useWindowContext } from '@/contexts/WindowContext';
import { X, Minus, Maximize2 } from 'lucide-react';

interface TrafficLightsProps {
    windowId: string;
}

export function TrafficLights({ windowId }: TrafficLightsProps) {
    const { closeWindow, minimizeWindow, maximizeWindow } = useWindowContext();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex items-center gap-[8px] px-4 py-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Close button (Red) */}
            <button
                onClick={(e) => { e.stopPropagation(); closeWindow(windowId); }}
                className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center transition-colors group relative overflow-hidden focus:outline-none"
                aria-label="Close"
            >
                <span className={`text-[#4C0000] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center`}>
                    <X size={8} strokeWidth={3} />
                </span>
            </button>

            {/* Minimize button (Yellow) */}
            <button
                onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId); }}
                className="w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center transition-colors group relative overflow-hidden focus:outline-none"
                aria-label="Minimize"
            >
                <span className={`text-[#995700] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center`}>
                    <Minus size={8} strokeWidth={3} />
                </span>
            </button>

            {/* Maximize button (Green) */}
            <button
                onClick={(e) => { e.stopPropagation(); maximizeWindow(windowId); }}
                className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center transition-colors group relative overflow-hidden focus:outline-none"
                aria-label="Maximize"
            >
                <span className={`text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center`}>
                    <Maximize2 size={7} strokeWidth={3} />
                </span>
            </button>
        </div>
    );
}
