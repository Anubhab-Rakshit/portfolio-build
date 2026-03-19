"use client";

import React, { ReactNode } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';

interface DesktopContextMenuProps {
    children: ReactNode;
    onOpen?: () => void;
    onQuickLook?: () => void;
    title: string;
}

export function DesktopContextMenu({ children, onOpen, onQuickLook, title }: DesktopContextMenuProps) {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>
                {children}
            </ContextMenu.Trigger>

            <ContextMenu.Portal>
                <ContextMenu.Content
                    className={`
            min-w-[220px] bg-white/70 dark:bg-[#1e1e1e]/70 backdrop-blur-3xl 
            rounded-xl overflow-hidden p-1.5 shadow-2xl border border-white/20 z-[9999]
          `}
                    sideOffset={5}
                >
                    {onOpen && (
                        <ContextMenu.Item
                            className="text-sm px-3 py-1.5 rounded-md cursor-default select-none outline-none focus:bg-blue-500 focus:text-white dark:text-gray-200"
                            onSelect={onOpen}
                        >
                            Open {title}
                        </ContextMenu.Item>
                    )}

                    {/* Divider */}
                    <ContextMenu.Separator className="h-px bg-gray-300 dark:bg-gray-700 my-1 mx-2" />

                    <ContextMenu.Item
                        className="text-sm px-3 py-1.5 rounded-md cursor-default select-none outline-none focus:bg-blue-500 focus:text-white dark:text-gray-200"
                        disabled
                    >
                        Get Info
                    </ContextMenu.Item>

                    <ContextMenu.Item
                        className="text-sm px-3 py-1.5 rounded-md cursor-default select-none outline-none focus:bg-blue-500 focus:text-white dark:text-gray-200"
                        disabled
                    >
                        Rename
                    </ContextMenu.Item>

                    {/* Divider */}
                    <ContextMenu.Separator className="h-px bg-gray-300 dark:bg-gray-700 my-1 mx-2" />

                    {onQuickLook && (
                        <ContextMenu.Item
                            className="text-sm px-3 py-1.5 rounded-md cursor-default select-none outline-none focus:bg-blue-500 focus:text-white dark:text-gray-200"
                            onSelect={onQuickLook}
                        >
                            Quick Look "{title}"
                        </ContextMenu.Item>
                    )}

                    {/* Divider */}
                    <ContextMenu.Separator className="h-px bg-gray-300 dark:bg-gray-700 my-1 mx-2" />

                    <ContextMenu.Item
                        className="text-sm px-3 py-1.5 rounded-md cursor-default select-none outline-none focus:bg-blue-500 focus:text-white text-red-500 dark:text-red-400"
                    >
                        Move to Trash
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
}
