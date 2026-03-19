"use client";

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useAnimation, useDragControls } from 'framer-motion';
import { useWindowContext, WindowState } from '@/contexts/WindowContext';
import { useAppTheme } from '@/contexts/AppThemeContext';
import { TrafficLights } from './TrafficLights';

interface DraggableWindowProps {
    windowData: WindowState;
    children: ReactNode;
    defaultWidth?: number;
    defaultHeight?: number;
    minWidth?: number;
    minHeight?: number;
}

export function DraggableWindow({
    windowData,
    children,
    defaultWidth = 800,
    defaultHeight = 500,
    minWidth = 400,
    minHeight = 300
}: DraggableWindowProps) {
    const { focusWindow, activeWindowId, maximizeWindow } = useWindowContext();
    const { appTheme } = useAppTheme();
    const windowRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();
    const controls = useAnimation();

    const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 600;

    const initialWidth = Math.min(defaultWidth, vw * 0.95);
    const initialHeight = Math.min(defaultHeight, vh * 0.85);
    const minW = Math.min(minWidth, vw * 0.9);

    const [size, setSize] = useState({
        width: vw < 640 ? vw : initialWidth,
        height: vw < 640 ? vh - 60 - 28 : initialHeight // account for dock and menu on mobile
    });

    // Start maxmized automatically on tiny screens
    const isActuallyMaximized = windowData.isMaximized || vw < 640;

    const [position] = useState({
        x: Math.max(0, (vw - initialWidth) / 2 + (Math.random() * 20 - 10)),
        y: Math.max(28, (vh - initialHeight) / 2 + (Math.random() * 20 - 10))
    });

    const isActive = activeWindowId === windowData.id;

    // Handle open animation
    useEffect(() => {
        if (windowData.isOpen && !windowData.isMinimized) {
            controls.start({
                scale: windowData.isMaximized ? 1 : 1,
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }
            });
        }
    }, [windowData.isOpen, windowData.isMinimized, windowData.isMaximized, controls]);

    // Handle minimize (genie effect approximation)
    useEffect(() => {
        if (windowData.isMinimized) {
            controls.start({
                scale: 0.2,
                opacity: 0,
                y: window.innerHeight / 2, // Head towards bottom dock
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                }
            });
        }
    }, [windowData.isMinimized, controls]);

    function startDrag(event: React.PointerEvent) {
        focusWindow(windowData.id);
        if (!windowData.isMaximized) {
            dragControls.start(event);
        }
    }

    // Handle z-index and active state CSS
    const activeShadow = isActive
        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.05) inset";



    // Don't render if completely closed and animation finished
    // For now we just return null if minimized so it's removed from dom, 
    // but framer motion AnimatePresence would be better for exit animations
    if (windowData.isMinimized) {
        return (
            <motion.div
                animate={controls}
                initial={{ scale: 1, opacity: 1, y: 0 }}
                className="pointer-events-none fixed z-0"
            />
        );
    }

    return (
        <motion.div
            ref={windowRef}
            drag={!isActuallyMaximized}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={controls}
            onPointerDown={() => focusWindow(windowData.id)}
            style={{
                position: 'absolute',
                zIndex: windowData.zIndex,
                width: isActuallyMaximized ? '100vw' : size.width,
                height: isActuallyMaximized ? 'calc(100dvh - 28px)' : size.height,
                left: isActuallyMaximized ? 0 : position.x,
                top: isActuallyMaximized ? 28 : position.y,
                boxShadow: activeShadow,
            }}
            className={`
        flex flex-col overflow-hidden bg-white/80 dark:bg-[#1c1c1e]/80 
        backdrop-blur-[60px] backdrop-saturate-[180%] border border-white/20 dark:border-white/10
        ${isActuallyMaximized ? 'rounded-none' : 'rounded-xl'}
        ${!isActive ? 'opacity-90' : 'opacity-100'}
        transition-opacity duration-200
      `}
        >
            {/* Title Bar (Custom Drag Handle) */}
            <div
                className={`
          flex items-center justify-between h-7 w-full select-none
          ${!isActuallyMaximized ? 'cursor-grab active:cursor-grabbing' : ''}
          ${isActive ? 'bg-black/5 dark:bg-white/5' : 'bg-transparent'}
        `}
                onPointerDown={startDrag}
                onDoubleClick={() => maximizeWindow(windowData.id)}
            >
                <TrafficLights windowId={windowData.id} />
            </div>

            {/* Window Content */}
            <div className={`@container flex-1 overflow-hidden relative ${appTheme === 'dark' ? 'dark' : ''}`}>
                <div className="w-full h-full bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
                    {children}
                </div>
            </div>

            {/* Resize Handle (Bottom Right) */}
            {!isActuallyMaximized && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const startWidth = size.width;
                        const startHeight = size.height;
                        const onPointerMove = (moveEvent: PointerEvent) => {
                            setSize({
                                width: Math.max(minW, Math.min(vw, startWidth + (moveEvent.clientX - startX))),
                                height: Math.max(Math.min(minHeight, vh * 0.4), Math.min(vh, startHeight + (moveEvent.clientY - startY)))
                            });
                        };

                        const onPointerUp = () => {
                            document.removeEventListener('pointermove', onPointerMove);
                            document.removeEventListener('pointerup', onPointerUp);
                        };

                        document.addEventListener('pointermove', onPointerMove);
                        document.addEventListener('pointerup', onPointerUp);
                    }}
                />
            )}
        </motion.div>
    );
}
