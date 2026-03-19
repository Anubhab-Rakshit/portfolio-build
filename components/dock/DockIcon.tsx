"use client";

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';

interface DockIconProps {
    title: string;
    iconPath: string;
    mouseX: MotionValue<number>;
    isActive: boolean;
    onClick: () => void;
}

export function DockIcon({ title, iconPath, mouseX, isActive, onClick }: DockIconProps) {
    const ref = useRef<HTMLImageElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isBouncing, setIsBouncing] = useState(false);

    const baseSize = 50;
    const magSize = 78;
    const distanceLimit = baseSize * 6;

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
        distance,
        [-distanceLimit, -distanceLimit / 1.4, -distanceLimit / 2.5, 0, distanceLimit / 2.5, distanceLimit / 1.4, distanceLimit],
        [baseSize, baseSize * 1.08, baseSize * 1.3, magSize, baseSize * 1.3, baseSize * 1.08, baseSize]
    );

    const width = useSpring(widthSync, {
        stiffness: 400,
        damping: 35,
        mass: 0.15,
    });

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isActive && !isBouncing) {
            setIsBouncing(true);
            setTimeout(() => setIsBouncing(false), 1600);
        }
        onClick();
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* Tooltip */}
            {isHovered && (
                <div
                    className="absolute -top-10 px-2.5 py-[3px] rounded-md text-[12px] font-medium whitespace-nowrap z-[99999] pointer-events-none shadow-lg"
                    style={{
                        background: 'rgba(40,40,40,0.85)',
                        backdropFilter: 'blur(20px)',
                        color: 'rgba(255,255,255,0.9)',
                        border: '0.5px solid rgba(255,255,255,0.1)',
                    }}
                >
                    {title}
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2"
                        style={{
                            width: 0, height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid rgba(40,40,40,0.85)',
                        }}
                    />
                </div>
            )}

            {/* Icon */}
            <motion.img
                ref={ref}
                src={iconPath}
                alt={title}
                draggable={false}
                style={{ width, height: width }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
                className={`cursor-pointer object-contain origin-bottom transition-[filter] duration-150 active:brightness-75 ${isBouncing ? 'animate-dock-bounce' : ''}`}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Don't loop on fallback
                    if (!target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = '/icons/finder.svg';
                    }
                }}
            />

            {/* Active Indicator */}
            <div className={`mt-[3px] w-1 h-1 rounded-full transition-opacity duration-300 ${isActive ? 'opacity-100 bg-white/80' : 'opacity-0 bg-white/0'}`} />
        </div>
    );
}
