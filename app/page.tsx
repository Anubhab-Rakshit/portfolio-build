"use client";

import { useState, useEffect } from 'react';
import { WindowProvider } from '@/contexts/WindowContext';
import { AppThemeProvider } from '@/contexts/AppThemeContext';
import { BootSequence } from '@/components/boot/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';
import { IOSHomeScreen } from '@/components/mobile/IOSHomeScreen';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if they've already "booted" this session
    if (sessionStorage.getItem('macBootDone') === 'true') {
      setBooted(true);
    }
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch on initial render

  return (
    <WindowProvider>
      <AppThemeProvider>
        <main className="h-[100dvh] w-screen overflow-hidden bg-black text-foreground antialiased font-sans flex flex-col select-none">
          {/* Main Desktop Environment - active on all devices */}
          <div className="flex-1 relative w-full h-full">
            <Desktop />
          </div>
          {/* Boot Sequence Overlay */}
          {!booted && (
            <div className="absolute inset-0 z-[99999]">
              <BootSequence onComplete={() => setBooted(true)} />
            </div>
          )}
        </main>
      </AppThemeProvider>
    </WindowProvider>
  );
}
