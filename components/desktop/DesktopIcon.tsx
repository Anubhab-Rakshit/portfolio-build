"use client";

import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { DesktopContextMenu } from './DesktopContextMenu';
import Image from 'next/image';

interface DesktopIconProps {
    id: string;
    title: string;
    iconPath: string; // URL to the image inside /Images or similar
    x: number;
    y: number;
    onOpen: () => void;
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function DesktopIcon({ id, title, iconPath, x, y, onOpen, selectedId, onSelect }: DesktopIconProps) {
    const isSelected = selectedId === id;
    const dragControls = useDragControls();

    // Custom double click detection to prevent conflict with dragging/selection
    const [lastClickTime, setLastClickTime] = useState(0);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < 300) {
            // It's a double click!
            onOpen();
        } else {
            // Single click - select it
            onSelect(id);
        }
        setLastClickTime(currentTime);
    };

    return (
        <DesktopContextMenu title={title} onOpen={onOpen}>
            <motion.div
                drag
                dragMomentum={false}
                dragControls={dragControls}
                initial={{ x, y }}
                onClick={handleClick}
                className={`
          absolute flex flex-col items-center justify-start w-[80px] p-2 rounded-md
          transition-colors duration-100 cursor-default
          ${isSelected ? 'bg-black/20 dark:bg-white/20 backdrop-blur-sm' : 'hover:bg-black/10 dark:hover:bg-white/10'}
        `}
                style={{ zIndex: isSelected ? 10 : 1 }}
            >
                <div className="w-12 h-12 relative drop-shadow-md mb-1 pointer-events-none">
                    <Image
                        src={iconPath}
                        alt={title}
                        fill
                        sizes="48px"
                        className="object-contain"
                        priority
                    />
                </div>

                <span
                    className={`
            text-xs font-medium text-center leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] text-white
            ${isSelected ? 'bg-[#0058D0] rounded px-1' : ''}
          `}
                >
                    {title}
                </span>
            </motion.div>
        </DesktopContextMenu>
    );
}
