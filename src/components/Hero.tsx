import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { InstantMessagingAnimation, MobileAppAnimation } from './HeroAnimations';

export const Hero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
        {
            id: 3,
            tag: "On-hands protection",
            title: "Mobile App \nProtection.",
            description: "Protect your data with passcodes, biometrics, and more.",
            visual: "mobile",
            color: "bg-cyan-500"
        },
        {
            id: 2,
            tag: "Built on trust. Backed by encryption.",
            title: "Privacy is not\noptional.",
            description: "Real time end-to-end encryption. Your data stays yours.",
            visual: "security",
            color: "bg-indigo-500"
        },
        {
            id: 1,
            tag: "Real-time Messaging",
            title: "Messaging at blitz \nspeed.",
            description: "Low latency communication for teams that move fast.",
            visual: "speed",
            color: "bg-blue-500"
        }
    ];

    // Handle visibility change to prevent animation glitches when tab is inactive
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setActiveSlide(prev => prev);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [activeSlide]);

    return (
        <section id="home" className="relative min-h-[850px] lg:h-screen pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-blitz-bg">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Primary Linear Gradient (Base) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14] via-[#0E1623] to-[#0B0F14] opacity-100"></div>

                {/* Hero Image Background - Now after the base gradient */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.43] mix-blend-screen scale-105"
                    style={{ backgroundImage: 'url("/hero.png")' }}
                ></div>

                {/* Subtle mask to fade the image at the edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14] opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-transparent to-[#0B0F14] opacity-60"></div>

                {/* Secondary Linear Accents */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(59,130,246,0.05)_40%,transparent_60%)]"></div>

                {/* Ambient Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[130px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

                {/* Text Content */}
                <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 relative z-20">

                    {/* Carousel Text Area - Fixed minimum height to prevent shifts */}
                    <div className="relative min-h-[400px] w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="w-full"
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                        {slides[activeSlide].tag}
                                    </span>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.05] mb-6">
                                    {slides[activeSlide].title.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line}</span>
                                    ))}
                                </h1>

                                <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                                    {slides[activeSlide].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Static Actions (Outside Carousel) */}
                    <div className="flex items-center gap-4 mb-16 mt-4">
                        <a href="#platforms" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] inline-block">
                            Get Started Free
                        </a>
                        <a href="#features" className="group px-8 py-4 rounded-full text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 inline-block">
                            Features
                            <Icon icon="solar:arrow-right-linear" className="transition-transform duration-300 group-hover:translate-x-1 text-lg" />
                        </a>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex gap-4">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group relative"
                            >
                                <div className={`absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors`}></div>
                                {index === activeSlide && (
                                    <motion.div
                                        layoutId="activeProgress"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 10, ease: "linear" }}
                                        className="h-full bg-blue-500 rounded-full"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Visual Canvas */}
                <div className="lg:col-span-6 h-[400px] lg:h-[600px] relative order-1 lg:order-2 perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, x: 50, rotateY: 5 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -50, rotateY: -5 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {slides[activeSlide].visual === 'mobile' ? (
                                <MobileAppAnimation key={activeSlide} />
                            ) : slides[activeSlide].visual === 'security' ? (
                                <div className="relative w-full h-full flex items-center justify-center p-4">
                                    <img
                                        src="/privacy.png"
                                        alt="Privacy Protection"
                                        className="w-full max-w-4xl aspect-square object-contain scale-125 lg:scale-150 transition-transform duration-700"
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full max-w-md aspect-[3/4] lg:aspect-square bg-[#0E1623] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5">
                                    {/* Mockup Header */}
                                    <div className="h-12 border-b border-white/5 flex items-center px-4 gap-3 bg-white/[0.02]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                                        </div>
                                        <div className="ml-auto w-24 h-1.5 rounded-full bg-white/5"></div>
                                    </div>

                                    {/* Dynamic Slide Content */}
                                    <div className="flex-1 p-6 relative overflow-hidden">
                                        {/* Slide 1: Instant Messaging Animation */}
                                        {slides[activeSlide].visual === 'speed' && (
                                            <InstantMessagingAnimation key={activeSlide} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Decorative Blur behind visual */}
                            <div className={`absolute inset-0 bg-blue-500 blur-[100px] opacity-20 -z-10`}></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
