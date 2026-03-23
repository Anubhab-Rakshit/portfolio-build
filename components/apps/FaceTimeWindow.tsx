"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Maximize2, Minimize2, Grid, User, Settings, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaceTimeWindowProps {
    id: string;
}

export function FaceTimeWindow({ id }: FaceTimeWindowProps) {
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [callActive, setCallActive] = useState(false);
    const [calling, setCalling] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setError(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Camera access denied or not available");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    useEffect(() => {
        if (callActive && isVideoOn) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [callActive, isVideoOn]);

    const handleToggleVideo = () => {
        setIsVideoOn(!isVideoOn);
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !isVideoOn;
            });
        }
    };

    const handleToggleMic = () => {
        setIsMicOn(!isMicOn);
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !isMicOn;
            });
        }
    };

    const startCall = () => {
        setCalling(true);
        setTimeout(() => {
            setCalling(false);
            setCallActive(true);
        }, 2000);
    };

    const endCall = () => {
        setCallActive(false);
        setCalling(false);
        stopCamera();
    };

    return (
        <div className="flex flex-col h-full bg-[#1c1c1e] text-white rounded-b-xl overflow-hidden font-sans">
            {/* Sidebar / List */}
            {!callActive && !calling && (
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-64 bg-black/30 border-r border-white/10 flex flex-col p-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">FaceTime</h2>
                            <div className="flex gap-2">
                                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                                    <Settings size={18} />
                                </button>
                                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                                    <User size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2">
                            <button
                                onClick={startCall}
                                className="w-full h-12 bg-green-500 hover:bg-green-600 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors shadow-lg"
                            >
                                <Video size={20} />
                                New FaceTime
                            </button>

                            <div className="mt-8">
                                <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-widest px-2 mb-2">Recent</h3>
                                <div className="space-y-1">
                                    {[
                                        { name: 'Anubhab Rakshit', time: 'Yesterday', type: 'Video' },
                                        { name: 'Mac Portfolio Admin', time: 'Monday', type: 'Audio' },
                                        { name: 'Test User', time: 'Feb 20', type: 'Video' }
                                    ].map((contact, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg group cursor-pointer transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-sm font-bold">
                                                    {contact.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{contact.name}</span>
                                                    <span className="text-xs text-white/40">{contact.time}</span>
                                                </div>
                                            </div>
                                            <Video size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center bg-black/20 p-8 text-center">
                        <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-2xl">
                            <Video size={64} className="text-white/20" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">FaceTime Anywhere</h2>
                        <p className="text-white/50 max-w-md">
                            Connect with friends and family using your camera and microphone. Start a new call or select a recent contact.
                        </p>
                    </div>
                </div>
            )}

            {/* Calling State */}
            {calling && (
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#2c3e50] to-[#000000]">
                    <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-8 animate-pulse shadow-2xl">
                        <User size={64} className="text-white/40" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Anubhab Rakshit</h2>
                    <p className="text-xl text-white/60 animate-pulse">FaceTime...</p>

                    <div className="absolute bottom-16 flex items-center gap-12">
                        <button
                            onClick={endCall}
                            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
                        >
                            <PhoneOff size={32} />
                        </button>
                    </div>
                </div>
            )}

            {/* Active Call State */}
            {callActive && (
                <div className="flex-1 relative bg-black">
                    {/* Main Video feed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {isVideoOn ? (
                            error ? (
                                <div className="text-white/50 flex flex-col items-center gap-4">
                                    <Info size={48} className="text-red-500" />
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted={!isMicOn}
                                    className="w-full h-full object-cover"
                                />
                            )
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#1c1c1e]">
                                <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <User size={64} className="text-white/20" />
                                </div>
                                <h3 className="text-xl font-medium text-white/40">Camera is off</h3>
                            </div>
                        )}
                    </div>

                    {/* Controls Overlay */}
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={handleToggleMic}
                                className={`p-3 rounded-full transition-all ${isMicOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500'}`}
                            >
                                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
                            </button>
                            <button
                                onClick={handleToggleVideo}
                                className={`p-3 rounded-full transition-all ${isVideoOn ? 'bg-white/10 hover:bg-white/20 shadow-lg' : 'bg-red-500'}`}
                            >
                                {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                            </button>
                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                                <Grid size={24} />
                            </button>
                            <button
                                onClick={endCall}
                                className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-all shadow-lg hover:scale-105"
                            >
                                <PhoneOff size={24} />
                            </button>
                        </motion.div>
                    </AnimatePresence>

                    {/* Mini Self Preview (Small overlay) */}
                    <div className="absolute top-6 right-6 w-48 h-32 bg-gray-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full flex items-center justify-center opacity-40">
                            <User size={32} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
