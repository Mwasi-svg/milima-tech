import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

// nice little chat animation to show the 2-way messaging flow
export const InstantMessagingAnimation = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [showTyping, setShowTyping] = useState<string | boolean>(false);

    const conversation = [
        { id: 1, text: "Hey! Schedule a brief meeting?", sender: "them", delay: 500 },
        { id: 2, text: "Yeah! What time works for you?", sender: "me", delay: 2300, readDelay: 3500 },
        { id: 3, text: "How about 7pm?", sender: "them", delay: 4700 },
        { id: 4, text: "Sounds good!", sender: "me", delay: 6500, readDelay: 7800 },
        { id: 5, text: "Perfect! I'll be there", sender: "them", delay: 8800 }
    ];

    useEffect(() => {
        const timers: any[] = [];

        conversation.forEach((msg) => {
            // Show typing indicator
            timers.push(setTimeout(() => {
                setShowTyping(msg.sender);
            }, msg.delay - 200));

            // Add message
            timers.push(setTimeout(() => {
                setMessages(prev => [...prev, { ...msg, status: 'sent' }]);
                setShowTyping(false);
            }, msg.delay));

            // Update to delivered (for "me" messages)
            if (msg.sender === 'me') {
                timers.push(setTimeout(() => {
                    setMessages(prev => prev.map(m =>
                        m.id === msg.id ? { ...m, status: 'delivered' } : m
                    ));
                }, msg.delay + 150));

                // Update to read
                if (msg.readDelay) {
                    timers.push(setTimeout(() => {
                        setMessages(prev => prev.map(m =>
                            m.id === msg.id ? { ...m, status: 'read' } : m
                        ));
                    }, msg.readDelay));
                }
            }
        });

        // Reset animation
        timers.push(setTimeout(() => {
            setMessages([]);
        }, 9500));

        return () => timers.forEach(clearTimeout);
    }, []);

    // shows sent/delivered/read ticks
    const StatusIndicator = ({ status }: { status: string }) => {
        if (!status || status === 'sent') {
            return (
                <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <motion.path
                        d="M3 8L6 11L13 4"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.15 }}
                    />
                </motion.svg>
            );
        }

        if (status === 'delivered' || status === 'read') {
            const color = status === 'read' ? '#22D3EE' : '#94A3B8';
            return (
                <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <motion.path
                        d="M2 8L4.5 10.5L8 6"
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.15 }}
                    />
                    <motion.path
                        d="M6 8L8.5 10.5L14 5"
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.15, delay: 0.08 }}
                    />
                </motion.svg>
            );
        }
        return null;
    };

    // simple '...' bubble when someone is typing
    const TypingIndicator = () => (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="flex gap-1 px-3 py-2.5 bg-white/[0.07] rounded-2xl rounded-bl-md border border-white/10"
        >
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -4, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                />
            ))}
        </motion.div>
    );

    return (
        <div className="h-full flex items-center justify-center relative px-6">
            {/* the actual message bubbles */}
            <div className="w-full max-w-[340px] space-y-3">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            layout
                            initial={{
                                opacity: 0,
                                y: 15,
                                scale: 0.9
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                layout: { duration: 0.3 }
                            }}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <motion.div
                                layout
                                className={`
                                    max-w-[75%] px-4 py-2.5 rounded-2xl relative
                                    ${msg.sender === 'me'
                                        ? 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-br-md shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                        : 'bg-white/[0.07] text-slate-100 rounded-bl-md border border-white/10'
                                    }
                                `}
                            >
                                <span className="text-[13px] leading-relaxed font-medium">
                                    {msg.text}
                                </span>

                                {/* Time and status for sent messages */}
                                {msg.sender === 'me' && (
                                    <div className="flex items-center gap-1 mt-1 justify-end">
                                        <span className="text-[9px] text-white/60">
                                            {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
                                        </span>
                                        <StatusIndicator status={msg.status} />
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {showTyping && (
                        <motion.div
                            key="typing"
                            layout
                            className={`flex ${showTyping === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <TypingIndicator />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* just a bit of extra glow behind everything */}
            <motion.div
                animate={{
                    opacity: [0.03, 0.08, 0.03],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-500/10 blur-3xl pointer-events-none -z-10 rounded-full"
            />
        </div>
    );
};

// shows the text scrambler/encryption effect visually
export const EncryptionAnimation = () => {
    const [phase, setPhase] = useState(0); // 0: plaintext, 1: encrypting, 2: encrypted

    const plaintext = "Brief Meeting";
    const [displayText, setDisplayText] = useState(plaintext);

    useEffect(() => {
        const scrambleChars = "!@#$%^&*0123456789ABCDEFabcdef";
        let scrambleInterval: any;
        let currentIndex = 0;

        // Phase 1: Start encryption after delay
        const startEncrypt = setTimeout(() => {
            setPhase(1);
            scrambleInterval = setInterval(() => {
                if (currentIndex <= plaintext.length) {
                    setDisplayText(_ => {
                        const encrypted = plaintext.split('').map((char, i) => {
                            if (i < currentIndex) {
                                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                            }
                            return char;
                        }).join('');
                        return encrypted;
                    });
                    currentIndex++;
                } else {
                    clearInterval(scrambleInterval);
                    setPhase(2);
                }
            }, 80);
        }, 800);

        // Phase 2: Reset after showing encrypted
        const resetTimer = setTimeout(() => {
            setPhase(0);
            setDisplayText(plaintext);
            currentIndex = 0;
        }, 9500);

        return () => {
            clearTimeout(startEncrypt);
            clearTimeout(resetTimer);
            clearInterval(scrambleInterval);
        };
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center text-center relative">
            {/* Shield with Lock */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative mb-8"
            >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <motion.div
                        animate={{ rotateY: phase === 1 ? [0, 180, 360] : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <Icon icon={phase === 2 ? "solar:lock-keyhole-bold" : "solar:lock-keyhole-unlocked-linear"} className="text-3xl text-blue-400" />
                    </motion.div>
                </div>

                {/* Orbiting particles during encryption */}
                {phase === 1 && (
                    <>
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-cyan-400"
                                style={{ top: '50%', left: '50%' }}
                                animate={{
                                    x: [0, Math.cos(i * 2.09) * 40, 0],
                                    y: [0, Math.sin(i * 2.09) * 40, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                            />
                        ))}
                    </>
                )}
            </motion.div>

            {/* Text transformation display */}
            <div className="w-full max-w-[220px] space-y-3">
                <motion.div
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm"
                    animate={{ borderColor: phase === 1 ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)' }}
                >
                    <span className={phase === 2 ? 'text-cyan-400' : 'text-slate-300'}>
                        {displayText}
                    </span>
                </motion.div>

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono inline-flex items-center gap-2 ${phase === 2
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : phase === 1
                            ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                            : 'bg-white/5 border border-white/10 text-slate-400'
                        }`}
                >
                    <div className={`w-1.5 h-1.5 rounded-full ${phase === 2 ? 'bg-green-400' : phase === 1 ? 'bg-yellow-400 animate-pulse' : 'bg-slate-400'}`}></div>
                    {phase === 2 ? 'MESSAGE ENCRYPTED' : phase === 1 ? 'ENCRYPTING...' : 'READY'}
                </motion.div>
            </div>
        </div>
    );
};

// morphing avatar to show identity protection/masking
export const IdentityProtectionAnimation = () => {
    const [activeHandle, setActiveHandle] = useState(0);
    const handles = ['user_x92a', 'delta_v4', 'echo_7z', 'ghost_k8'];
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-cyan-500'];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHandle(prev => (prev + 1) % handles.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center relative">
            {/* Central Avatar with Morphing Effect */}
            <motion.div
                className="relative mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center relative overflow-hidden">
                    {/* Glitch/Morph effect */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeHandle}
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl text-white/80"
                        >
                            <Icon icon="solar:user-circle-linear" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Scanning line effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Status indicator */}
                <motion.div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${colors[activeHandle]} flex items-center justify-center`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <Icon icon="solar:check-circle-bold" className="text-xs text-white" />
                </motion.div>
            </motion.div>

            {/* Handle Display */}
            <div className="w-full max-w-[200px] space-y-3">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeHandle}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25 }}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-center flex items-center justify-center gap-2"
                    >
                        <div className={`w-2 h-2 rounded-full ${colors[activeHandle]}`}></div>
                        <span className="text-slate-200">{handles[activeHandle]}</span>
                    </motion.div>
                </AnimatePresence>

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono inline-flex items-center gap-2">
                        <Icon icon="solar:incognito-linear" className="text-sm" />
                        IDENTITY MASKED
                    </span>
                </motion.div>
            </div>
        </div>
    );
};
// simple mobile frame visual
export const MobileAppAnimation = () => {
    return (
        <div className="h-full w-full flex items-center justify-center relative p-8">
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
            >
                <div className="relative w-full max-w-[320px] h-full flex items-center justify-center">
                    <img
                        src="/images/device_template.png"
                        alt="Mobile App"
                        className="max-h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    />
                </div>
            </motion.div>

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10"></div>
        </div>
    );
};
