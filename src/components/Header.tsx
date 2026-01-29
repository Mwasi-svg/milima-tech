import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils';
import { GradientBeamButton } from './GradientBeamButton';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }} animate={{ y: 0 }}
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? 'glass py-3' : 'py-6 bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-auto flex items-center justify-center">
                        <img src="/logo.png" alt="Blitz Logo" className="h-full w-auto object-contain" />
                    </div>
                    <span className="font-semibold tracking-tight text-white text-lg"></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
                    <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
                    <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="#platforms" className="hover:text-blue-400 transition-colors">Platforms</a>
                    <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </div>
                <div className="flex items-center gap-4">
                    <GradientBeamButton href="#platforms">
                        Get Started Free
                    </GradientBeamButton>
                </div>
            </div>
        </motion.nav>
    );
};
