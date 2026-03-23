"use client";

import React, { useState } from 'react';
import {
    Inbox, Send, Archive, Trash2, Mail, Edit,
    CornerUpLeft, ReplyAll, Forward, X
} from 'lucide-react';

interface MailWindowProps {
    id: string;
}

export function MailWindow({ id }: MailWindowProps) {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const [selectedMail, setSelectedMail] = useState<number | null>(1);
    const [isComposing, setIsComposing] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Add pane switching state for mobile
    const [mobilePane, setMobilePane] = useState<'mailboxes' | 'list' | 'viewer'>('list');

    const folders = [
        { id: 'inbox', label: 'Inbox', icon: <Inbox size={16} /> },
        { id: 'sent', label: 'Sent', icon: <Send size={16} /> },
        { id: 'archive', label: 'Archive', icon: <Archive size={16} /> },
        { id: 'trash', label: 'Trash', icon: <Trash2 size={16} /> },
    ];

    const emails = [
        {
            id: 1,
            sender: 'Anubhab Rakshit',
            subject: 'Welcome to my Portfolio!',
            preview: 'Hi there! I am inviting you to explore my...',
            date: '10:42 AM',
            body: `Hi there,\n\nWelcome to my interactive macOS-themed portfolio! I built this to showcase my skills in React, Next.js, and Tailwind CSS.\n\nFeel free to explore the apps, check out my projects in the Project Hub, read about me in Define Me, or open Terminal to run some commands.\n\nI hope you enjoy exploring it as much as I enjoyed building it!\n\nBest regards,\nAnubhab Rakshit`,
            folder: 'inbox',
            unread: true
        },
        {
            id: 2,
            sender: 'System Admin',
            subject: 'Portfolio Security Update',
            preview: 'Your connection is secure and encrypted...',
            date: 'Yesterday',
            body: `Hello,\n\nJust a quick note to let you know that your connection to this portfolio is secure. Feel free to use the Mail app to send me a direct message.\n\nRegards,\nSystem Admin`,
            folder: 'inbox',
            unread: false
        },
        {
            id: 3,
            sender: 'Anubhab Rakshit',
            subject: 'Re: Hello World',
            preview: 'Thanks for reaching out! I will get back to you...',
            date: 'Oct 15',
            body: `Thanks for reaching out! I will get back to you as soon as possible.`,
            folder: 'sent',
            unread: false
        }
    ];

    const folderEmails = emails.filter(e => e.folder === selectedFolder);
    const activeEmail = emails.find(e => e.id === selectedMail);

    return (
        <div className="flex w-full h-full bg-white/50 dark:bg-[#1e1e1e]/50 rounded-b-xl overflow-hidden text-gray-800 dark:text-gray-200">

            {/* 1st Pane: Sidebar (Mailboxes) */}
            <div className={`${mobilePane === 'mailboxes' ? 'flex w-full' : 'hidden lg:flex w-48'} flex-shrink-0 bg-gray-50/50 dark:bg-white/5 border-r border-gray-200 dark:border-white/10 flex-col pt-4 backdrop-blur-md`}>
                <div className="px-4 mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Mailboxes
                    </span>
                    <button
                        onClick={() => setIsComposing(true)}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md text-gray-500 transition-colors"
                    >
                        <Edit size={14} />
                    </button>
                </div>

                <ul className="flex flex-col px-2 gap-1">
                    {folders.map(folder => (
                        <li key={folder.id}>
                            <button
                                onClick={() => {
                                    setSelectedFolder(folder.id);
                                    setSelectedMail(null);
                                    setMobilePane('list');
                                }}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors ${selectedFolder === folder.id
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'
                                    }`}
                            >
                                <span className={`${selectedFolder === folder.id ? 'text-white' : 'text-blue-500'}`}>
                                    {folder.icon}
                                </span>
                                {folder.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 2nd Pane: Message List */}
            <div className={`${mobilePane === 'list' ? 'flex w-full' : 'hidden md:flex w-72'} flex-shrink-0 border-r border-gray-200 dark:border-white/10 flex-col bg-white/50 dark:bg-[#1e1e1e]/50`}>
                {/* Search */}
                <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center px-4 bg-gray-50/30 dark:bg-black/10 gap-2">
                    <button onClick={() => setMobilePane('mailboxes')} className="lg:hidden p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-blue-500">
                        <CornerUpLeft size={16} />
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-md py-1 px-3 text-xs outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                    />
                    <button onClick={() => { setIsComposing(true); setMobilePane('viewer'); }} className="lg:hidden p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 transition-colors">
                        <Edit size={16} />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {folderEmails.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-xs text-gray-400">
                            No Messages
                        </div>
                    ) : (
                        folderEmails.map(email => (
                            <div
                                key={email.id}
                                onClick={() => { setSelectedMail(email.id); setMobilePane('viewer'); }}
                                className={`p-3 border-b border-gray-100 dark:border-white/5 cursor-pointer flex flex-col gap-1 transition-colors ${selectedMail === email.id
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex justify-between items-baseline">
                                    <span className={`font-semibold text-sm truncate ${selectedMail === email.id ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                                        {email.sender}
                                    </span>
                                    <span className={`text-[11px] flex-shrink-0 ml-2 ${selectedMail === email.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {email.date}
                                    </span>
                                </div>
                                <span className={`text-xs font-medium truncate ${selectedMail === email.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                    {email.subject}
                                </span>
                                <span className={`text-xs truncate ${selectedMail === email.id ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {email.preview}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 3rd Pane: Message Viewer */}
            <div className={`${mobilePane === 'viewer' ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white/50 dark:bg-[#1e1e1e]/50 relative`}>
                {activeEmail ? (
                    <>
                        {/* Viewer Toolbar */}
                        <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50/30 dark:bg-black/10">
                            <div className="flex items-center gap-2 text-gray-500">
                                <button onClick={() => setMobilePane('list')} className="md:hidden p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-blue-500 flex items-center">
                                    <span className="text-lg leading-none mr-1">&lsaquo;</span> Back
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <Archive size={16} />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <button
                                    onClick={() => setIsComposing(true)}
                                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                >
                                    <CornerUpLeft size={16} />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <ReplyAll size={16} />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                    <Forward size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Viewer Content */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 font-bold">
                                        {activeEmail.sender[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{activeEmail.sender}</span>
                                        <span className="text-xs text-gray-500">To: Anubhab Rakshit</span>
                                    </div>
                                    <div className="ml-auto text-xs text-gray-500">{activeEmail.date}</div>
                                </div>

                                <h1 className="text-xl font-bold mt-4 mb-2">{activeEmail.subject}</h1>

                                <div className="prose dark:prose-invert text-sm max-w-none whitespace-pre-wrap">
                                    {activeEmail.body}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                        <Mail size={48} className="opacity-20" />
                        <p>No Message Selected</p>
                    </div>
                )}
            </div>

            {/* Compose Overlay Modal */}
            {isComposing && (
                <div className="absolute inset-x-0 bottom-0 top-12 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-md">
                    <div className="w-[90%] max-w-2xl h-[85%] bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10 relative">
                        {/* Compose Header */}
                        <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-gray-50/80 dark:bg-black/20 backdrop-blur-sm">
                            <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">New Message</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        const fromEmail = (document.getElementById('compose-from') as HTMLInputElement).value;
                                        const subject = (document.getElementById('compose-subject') as HTMLInputElement).value;
                                        const body = (document.getElementById('compose-body') as HTMLTextAreaElement).value;

                                        if (!fromEmail) {
                                            alert("Please enter your email address so I can get back to you.");
                                            return;
                                        }

                                        // Simple client-side sanitization attempt for basic security reassurance
                                        if (body.includes('<script>') || body.includes('javascript:')) {
                                            alert("Security Warning: Malicious content detected. Message blocked.");
                                            return;
                                        }

                                        setIsSending(true);

                                        // Real API integration using Web3Forms
                                        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

                                        if (!accessKey) {
                                            alert("Email service isn't configured yet! Please add your Web3Forms Access Key to your .env file.");
                                            setIsSending(false);
                                            return;
                                        }

                                        fetch("https://api.web3forms.com/submit", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Accept: "application/json",
                                            },
                                            body: JSON.stringify({
                                                access_key: accessKey,
                                                email: fromEmail,
                                                subject: subject,
                                                message: `Sender Email: ${fromEmail}\n\n${body}`,
                                            }),
                                        })
                                            .then(async (response) => {
                                                if (response.status === 200) {
                                                    setIsSuccess(true);
                                                    setTimeout(() => {
                                                        setIsSuccess(false);
                                                        setIsComposing(false);
                                                    }, 2000);
                                                } else {
                                                    const err = await response.json();
                                                    alert(err.message || "Failed to send email. Please try again.");
                                                }
                                            })
                                            .catch((error) => {
                                                console.error("Mail Error:", error);
                                                alert("An error occurred while sending the email.");
                                            })
                                            .finally(() => {
                                                setIsSending(false);
                                            });
                                    }}
                                    disabled={isSending || isSuccess}
                                    className={`p-1 px-3 ${isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white text-[12px] font-medium rounded-md transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {isSending ? (
                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : isSuccess ? (
                                        "Sent!"
                                    ) : (
                                        <><Send size={12} /> Send</>
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsComposing(false)}
                                    className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] hover:bg-[#ff4b42] flex items-center justify-center group border border-[#e33e32] dark:border-transparent"
                                >
                                    <X size={8} className="text-[#4C0000] opacity-0 group-hover:opacity-100" />
                                </button>
                            </div>
                        </div>

                        {/* Compose Fields */}
                        <div className="flex flex-col flex-1 overflow-hidden bg-white dark:bg-[#1e1e1e]">
                            <div className="flex items-center px-6 py-3 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1e1e1e] focus-within:bg-blue-50/30 dark:focus-within:bg-blue-900/10 transition-colors">
                                <span className="text-[13px] text-gray-400 w-12 font-medium">From:</span>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="flex-1 bg-transparent text-[13px] outline-none text-gray-900 dark:text-gray-100"
                                    id="compose-from"
                                />
                            </div>
                            <div className="flex items-center px-6 py-3 border-b border-gray-100 dark:border-white/5">
                                <span className="text-[13px] text-gray-400 w-12 font-medium">To:</span>
                                <input
                                    type="text"
                                    value="coder.anubhab26@gmail.com"
                                    readOnly
                                    className="flex-1 bg-transparent text-[13px] outline-none text-gray-900 dark:text-gray-100 focus:ring-0"
                                />
                            </div>
                            <div className="flex items-center px-6 py-3 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1e1e1e] focus-within:bg-blue-50/30 dark:focus-within:bg-blue-900/10 transition-colors">
                                <span className="text-[13px] text-gray-400 w-12 font-medium">Subj:</span>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="flex-1 bg-transparent text-[13px] font-semibold outline-none text-gray-900 dark:text-gray-100"
                                    autoFocus
                                    id="compose-subject"
                                    autoComplete="off"
                                />
                            </div>

                            <textarea
                                className="w-full flex-1 p-6 bg-transparent outline-none resize-none text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed font-sans"
                                placeholder="Write your message here..."
                                id="compose-body"
                            ></textarea>

                            {/* Privacy Text */}
                            <div className="py-2 px-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#1a1a1a]">
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 stroke-current stroke-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Secure connection. No attachments or scripts allowed.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
