"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useWindowContext } from '@/contexts/WindowContext';

interface TerminalWindowProps {
    id: string; // The WindowContext ID
}

interface CommandHistory {
    cmd: string;
    output: React.ReactNode;
    path: string;
}

export function TerminalWindow({ id }: TerminalWindowProps) {
    const { openWindow } = useWindowContext();
    const [history, setHistory] = useState<CommandHistory[]>([
        {
            cmd: '',
            output: (
                <div className="mb-4">
                    Last login: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} {new Date().toLocaleTimeString('en-US')} on ttys000
                    <br />
                    Type <span className="text-green-400">'help'</span> to see available commands.
                </div>
            ),
            path: '~'
        }
    ]);
    const [input, setInput] = useState('');
    const [commandQueue, setCommandQueue] = useState<string[]>([]);
    const [queueIndex, setQueueIndex] = useState(-1);

    // Virtual File System State
    const [cwd, setCwd] = useState<string[]>([]);
    const [fileSystem, setFileSystem] = useState<Record<string, any>>({
        'about': {
            'bio.txt': 'Computer Science student with strong expertise in Web Development, Web3 systems, Artificial Intelligence, and scalable full-stack architectures.\n\nProficient in React, Next.js, and Python.',
            'interests.txt': 'Photography, Gaming, Open-source contributions',
            'contact.txt': 'Email: anubhabrakshit.06@gmail.com\nPhone: +91 89187 28467'
        },
        'projects': {
            'zync.app': 'ZYNC - Decentralized Content Platform\nDemo: https://zyncit.vercel.app/',
            'mareye.app': 'MarEye - AI Marine Security Platform\nDemo: https://mareye.vercel.app/',
            'hostelhub.app': 'HostelHub - Smart Issue Tracking System',
            'vendorsaathi.app': 'VendorSaathi - AI Marketplace'
        },
        'skills': {
            'programming.txt': 'React, Next.js, Python, HTML, CSS, JavaScript, TypeScript, Node.js, PHP, MySQL, C, C++, Java',
            'expertise.txt': 'Web Development, Web3 Development, Artificial Intelligence, Machine Learning, Database Management, Data Analytics, Data Structures and Algorithms'
        },
        'experience.txt': 'Founder — Anubhab Tea Shop (2025–Present)\nContributor — GSSOC (Jul 2025–Present)',
        'resume.pdf': '[PDF Document - Double click in Finder or run `resume` command to open]'
    });

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const resolveNode = (fs: any, pathStr: string, current: string[]) => {
        let newPath = [...current];
        if (pathStr.startsWith('/')) {
            newPath = [];
        } else if (pathStr.startsWith('~')) {
            newPath = [];
            pathStr = pathStr.slice(1);
            if (pathStr.startsWith('/')) pathStr = pathStr.slice(1);
        }

        const parts = pathStr.split('/').filter(Boolean);
        for (const p of parts) {
            if (p === '.') continue;
            if (p === '..') {
                newPath.pop();
            } else {
                newPath.push(p);
            }
        }

        let node: any = fs;
        for (const p of newPath) {
            if (typeof node !== 'object' || !(p in node)) return null;
            node = node[p];
        }
        return { node, path: newPath };
    };

    const execCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return null;

        const parts = trimmedCmd.split(' ');
        const baseCmd = parts[0].toLowerCase();

        const getParentNode = (pathStr: string) => {
            const pParts = pathStr.split('/');
            const target = pParts.pop() || '';
            const parentPathStr = pParts.length > 0 ? pParts.join('/') : '.';
            const resolvedParent = resolveNode(fileSystem, parentPathStr, cwd);
            return { resolvedParent, target };
        };

        switch (baseCmd) {
            case 'ls': {
                const searchStr = parts[1] || '.';
                const resolved = resolveNode(fileSystem, searchStr, cwd);
                if (!resolved || resolved.node === null || resolved.node === undefined) return `ls: ${searchStr}: No such file or directory`;
                if (typeof resolved.node === 'string') return searchStr;
                const keys = Object.keys(resolved.node);
                return keys.length > 0 ? (
                    <div className="flex gap-4 flex-wrap">
                        {keys.map(k => (
                            <span key={k} className={typeof resolved.node[k] === 'object' ? 'text-blue-400 font-bold' : 'text-gray-300'}>{k}</span>
                        ))}
                    </div>
                ) : '';
            }

            case 'cd': {
                const searchStr = parts[1] || '~';
                const resolved = resolveNode(fileSystem, searchStr, cwd);
                if (!resolved || resolved.node === null || resolved.node === undefined) return `cd: no such file or directory: ${searchStr}`;
                if (typeof resolved.node === 'string') return `cd: not a directory: ${searchStr}`;
                setCwd(resolved.path);
                return null;
            }

            case 'cat':
            case 'view':
            case 'less': {
                if (!parts[1]) return `${baseCmd}: missing filename parameter`;
                const searchStr = parts[1];
                const resolved = resolveNode(fileSystem, searchStr, cwd);
                if (!resolved || resolved.node === null || resolved.node === undefined) return `${baseCmd}: ${searchStr}: No such file or directory`;
                if (typeof resolved.node === 'object') return `${baseCmd}: ${searchStr}: Is a directory`;
                return resolved.node;
            }

            case 'pwd': {
                return `~${cwd.length > 0 ? '/' + cwd.join('/') : ''}`;
            }

            case 'touch': {
                if (!parts[1]) return `touch: missing file operand`;
                const { resolvedParent, target } = getParentNode(parts[1]);
                if (!resolvedParent || !resolvedParent.node || typeof resolvedParent.node !== 'object') {
                    return `touch: cannot touch '${parts[1]}': No such file or directory`;
                }
                if (!(target in resolvedParent.node)) {
                    setFileSystem((prev: any) => {
                        const newFs = JSON.parse(JSON.stringify(prev));
                        const r = resolveNode(newFs, parts[1].split('/').slice(0, -1).join('/') || '.', cwd);
                        if (r && typeof r.node === 'object') {
                            r.node[target] = '';
                        }
                        return newFs;
                    });
                }
                return null;
            }

            case 'mkdir': {
                if (!parts[1]) return `mkdir: missing operand`;
                const { resolvedParent, target } = getParentNode(parts[1]);
                if (!resolvedParent || !resolvedParent.node || typeof resolvedParent.node !== 'object') {
                    return `mkdir: cannot create directory '${parts[1]}': No such file or directory`;
                }
                if (target in resolvedParent.node) {
                    return `mkdir: cannot create directory '${parts[1]}': File exists`;
                }
                setFileSystem((prev: any) => {
                    const newFs = JSON.parse(JSON.stringify(prev));
                    const r = resolveNode(newFs, parts[1].split('/').slice(0, -1).join('/') || '.', cwd);
                    if (r && typeof r.node === 'object') {
                        r.node[target] = {};
                    }
                    return newFs;
                });
                return null;
            }

            case 'help':
                return (
                    <div className="text-gray-300">
                        Available commands:
                        <ul className="list-disc ml-6 mt-2 grid grid-cols-1 @sm:grid-cols-2 gap-x-4">
                            <li><span className="text-green-400">ls [dir]</span> - List directory contents</li>
                            <li><span className="text-green-400">cd [dir]</span> - Change directory</li>
                            <li><span className="text-green-400">cat/view [file]</span> - View file contents</li>
                            <li><span className="text-green-400">touch [file]</span> - Create empty file</li>
                            <li><span className="text-green-400">mkdir [dir]</span> - Create empty directory</li>
                            <li><span className="text-green-400">pwd</span> - Print working directory</li>
                            <li><span className="text-green-400">about</span> - Open About Me</li>
                            <li><span className="text-green-400">projects</span> - Open projects folder</li>
                            <li><span className="text-green-400">skills</span> - Open technical skills</li>
                            <li><span className="text-green-400">contact</span> - Open email compose</li>
                            <li><span className="text-green-400">resume</span> - Open resume</li>
                            <li><span className="text-green-400">clear</span> - Clear terminal output</li>
                            <li><span className="text-green-400">echo [text]</span> - Print text</li>
                            <li><span className="text-green-400">whoami</span> - Print current user</li>
                            <li><span className="text-green-400">date</span> - Print current date/time</li>
                            <li><span className="text-green-400">neofetch</span> - View system info</li>
                        </ul>
                    </div>
                );

            case 'clear':
                return '__CLEAR__';

            case 'whoami':
                return 'anubhab';

            case 'date':
                return new Date().toString();

            case 'echo':
                return parts.slice(1).join(' ');

            case 'about':
                openWindow('notes', 'Notes');
                return 'Opening About Me...';

            case 'projects':
                openWindow('finder', 'Finder');
                return 'Opening Projects folder...';

            case 'skills':
            case 'skill':
                openWindow('notes', 'Notes');
                return 'Opening Skills...';

            case 'contact':
            case 'email':
            case 'mail':
                openWindow('mail', 'Mail');
                return 'Opening Mail...';

            case 'resume':
            case 'cv':
                return 'Opening Resume.pdf... (Not yet implemented)';

            case 'sudo':
                return "anubhab is not in the sudoers file. This incident will be reported.";

            case 'neofetch':
                return (
                    <div className="flex flex-col @sm:flex-row gap-6 my-4">
                        <pre className="text-blue-400 font-bold hidden @sm:block">
                            {`       _    _
      (o)--(o)
     /.______.\\
     \\________/
    ./        \\.
   ( .        , )
    \\ \\_\\\\//_/ /
     ~~  ~~  ~~`}
                        </pre>
                        <div className="text-gray-300">
                            <span className="text-green-400 font-bold whitespace-nowrap">anubhab</span><span className="text-white">@</span><span className="text-green-400 font-bold whitespace-nowrap">MacBook-Pro</span><br />
                            <span className="text-gray-500">----------------------</span><br />
                            <span className="text-green-400 font-bold">OS</span>: macOS Sequoia 15.0<br />
                            <span className="text-green-400 font-bold">Host</span>: Web Browser Simulator<br />
                            <span className="text-green-400 font-bold">Kernel</span>: Next.js 15.0.0<br />
                            <span className="text-green-400 font-bold">Uptime</span>: Since page load<br />
                            <span className="text-green-400 font-bold">Shell</span>: zsh 5.9<br />
                            <span className="text-green-400 font-bold">Resolution</span>: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080'}<br />
                            <span className="text-green-400 font-bold">DE</span>: Aqua (React)<br />
                            <span className="text-green-400 font-bold">WM</span>: Framer Motion Elements<br />
                            <span className="text-green-400 font-bold">Theme</span>: Greninja Dark [Dark]<br />
                            <span className="text-green-400 font-bold">Terminal</span>: devty<br />
                            <span className="text-green-400 font-bold">CPU</span>: Apple M3 Max<br />
                            <span className="text-green-400 font-bold">Memory</span>: 64GB
                        </div>
                    </div>
                );

            default:
                return `zsh: command not found: ${parts[0]}`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const promptPath = cwd.length === 0 ? '~' : cwd[cwd.length - 1];
            const output = execCommand(input);

            if (output === '__CLEAR__') {
                setHistory([]);
            } else if (input.trim() !== '') {
                setHistory(prev => [...prev, { cmd: input, output, path: promptPath }]);
            } else if (input.trim() === '') {
                setHistory(prev => [...prev, { cmd: '', output: null, path: promptPath }]);
            }

            if (input.trim()) {
                setCommandQueue(prev => [...prev, input]);
                setQueueIndex(-1);
            }

            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandQueue.length > 0) {
                setQueueIndex(prev => {
                    const next = prev === -1 ? commandQueue.length - 1 : Math.max(0, prev - 1);
                    setInput(commandQueue[next]);
                    return next;
                });
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (queueIndex !== -1) {
                setQueueIndex(prev => {
                    const next = prev + 1;
                    if (next >= commandQueue.length) {
                        setInput('');
                        return -1;
                    }
                    setInput(commandQueue[next]);
                    return next;
                });
            }
        }
    };

    return (
        <div
            className="w-full h-full bg-[#1e1e1e]/95 backdrop-blur-md text-[#d4d4d4] font-mono text-sm p-4 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((hist, i) => (
                <div key={i} className="mb-2">
                    {hist.cmd !== undefined && (
                        <div className="flex gap-2">
                            <span className="text-green-400">anubhab@MacBook-Pro {hist.path} %</span>
                            <span>{hist.cmd}</span>
                        </div>
                    )}
                    {hist.output && <div className="mt-1 break-words whitespace-pre-wrap">{hist.output}</div>}
                </div>
            ))}

            <div className="flex gap-2 relative">
                <span className="text-green-400">anubhab@MacBook-Pro {cwd.length === 0 ? '~' : cwd[cwd.length - 1]} %</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-[#d4d4d4] caret-[#d4d4d4]"
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
            <div ref={bottomRef} className="h-4" />
        </div>
    );
}
