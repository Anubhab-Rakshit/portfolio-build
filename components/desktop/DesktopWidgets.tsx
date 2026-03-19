"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export function DesktopWidgets() {
    const [now, setNow] = useState<Date | null>(null);
    const [forecast, setForecast] = useState<Array<{ time: string; temp: number; icon: string }>>([]);

    useEffect(() => {
        const current = new Date();
        setNow(current);

        // Generate forecast once on mount
        const hours = current.getHours();
        const fc = [];
        for (let i = 0; i < 6; i++) {
            const h = (hours + i) % 24;
            const isN = h >= 19 || h < 6;
            fc.push({
                time: i === 0 ? 'Now' : `${h.toString().padStart(2, '0')}`,
                temp: isN ? 20 + Math.floor(Math.random() * 3) : 25 + Math.floor(Math.random() * 5),
                icon: isN ? '🌙' : (h >= 15 ? '⛅' : '☀️'),
            });
        }
        setForecast(fc);

        // Update every second for live clock
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!now) return null;

    const dayNumber = now.getDate();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const todayStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase();

    // Live clock hands
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const secondDeg = seconds * 6;

    const isNight = hours >= 19 || hours < 6;
    const currentTemp = forecast.length > 0 ? forecast[0].temp : 22;

    return (
        <div className="absolute top-9 left-4 right-4 flex flex-col md:flex-row gap-3 pointer-events-none select-none z-[1]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>

            {/* Calendar Widget */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[300px] liquid-glass liquid-glass-shimmer rounded-[18px] overflow-hidden flex shrink-0"
            >
                {/* Left: Day Number */}
                <div className="w-[42%] p-4 flex flex-col justify-center">
                    <div className="text-[#FF3B30] text-[11px] font-bold tracking-[0.06em] mb-0.5">{dayName}</div>
                    <div className="text-white text-[54px] font-extralight leading-none -ml-0.5">{dayNumber}</div>
                    <div className="text-white/50 text-[10px] font-medium mt-2">No Events Today</div>
                </div>

                {/* Divider */}
                <div className="w-px bg-gradient-to-b from-transparent via-white/15 to-transparent my-4" />

                {/* Right: Events */}
                <div className="flex-1 p-4 pl-4">
                    <div className="text-white/50 text-[10px] font-bold tracking-[0.06em] mb-3">{todayStr}</div>
                    <div className="flex items-start gap-2">
                        <div className="w-[3px] h-9 rounded-full bg-[#34C759] shrink-0 mt-0.5" />
                        <div>
                            <div className="text-white text-[12px] font-medium leading-tight">Portfolio Launch</div>
                            <div className="text-white/40 text-[10px] mt-0.5">All Day</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-row gap-3">
                {/* Live Clock Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-[140px] h-auto liquid-glass liquid-glass-shimmer rounded-[18px] flex flex-col items-center justify-center p-3 shrink-0"
                >
                    {/* Analog Clock Face */}
                    <div className="relative w-[86px] h-[86px]">
                        <div className="absolute inset-0 rounded-full bg-white/5 border border-white/15">
                            {/* Hour markers */}
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-[1.5px] h-[5px] bg-white/50 left-1/2 -ml-[0.75px]"
                                    style={{ top: '4px', transformOrigin: '50% 39px', transform: `rotate(${i * 30}deg)` }}
                                />
                            ))}
                            {/* Hour hand */}
                            <div
                                className="absolute w-[2px] h-[22px] bg-white rounded-full left-1/2 -ml-[1px] origin-bottom"
                                style={{ bottom: '50%', transform: `rotate(${hourDeg}deg)` }}
                            />
                            {/* Minute hand */}
                            <div
                                className="absolute w-[1.5px] h-[28px] bg-white/80 rounded-full left-1/2 -ml-[0.75px] origin-bottom"
                                style={{ bottom: '50%', transform: `rotate(${minuteDeg}deg)` }}
                            />
                            {/* Second hand */}
                            <div
                                className="absolute w-[0.5px] h-[30px] bg-[#FF9500] rounded-full left-1/2 -ml-[0.25px] origin-bottom"
                                style={{ bottom: '50%', transform: `rotate(${secondDeg}deg)` }}
                            />
                            {/* Center dot */}
                            <div className="absolute w-[4px] h-[4px] rounded-full bg-[#FF9500] left-1/2 top-1/2 -ml-[2px] -mt-[2px]" />
                        </div>
                    </div>
                    <div className="text-white/50 text-[10px] font-medium mt-1.5 tracking-wide">
                        {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </motion.div>

                {/* Weather Widget (Hidden on very small screens to avoid overflow) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="hidden sm:flex w-[290px] liquid-glass liquid-glass-shimmer rounded-[18px] p-3.5 flex-col justify-between overflow-hidden relative shrink-0"
                >
                    <div className="flex justify-between items-start z-10">
                        <div>
                            <div className="text-white font-medium flex items-center gap-1 text-[13px]">
                                Kolkata <span className="text-[9px] opacity-60">📍</span>
                            </div>
                            <div className="text-white text-[38px] font-extralight leading-none mt-0.5">{currentTemp}°</div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span className="text-2xl">{isNight ? '🌙' : '☀️'}</span>
                            <div className="text-white text-[11px] font-medium mt-0.5">{isNight ? 'Clear' : 'Sunny'}</div>
                            <div className="text-white/60 text-[10px] mt-0.5">H:{currentTemp + 3}° L:{currentTemp - 4}°</div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/10 my-2 z-10" />

                    <div className="flex justify-between items-end z-10 w-full px-0.5">
                        {forecast.map((hour, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <span className="text-white/70 text-[11px] font-medium">{hour.time}</span>
                                <span className="text-[13px]">{hour.icon}</span>
                                <span className="text-white text-[12px] font-medium">{hour.temp}°</span>
                            </div>
                        ))}
                    </div>

                    {/* Ambient glow */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/15 rounded-full blur-[40px] pointer-events-none" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/10 rounded-full blur-[30px] pointer-events-none" />
                </motion.div>
            </div>
        </div>
    );
}
