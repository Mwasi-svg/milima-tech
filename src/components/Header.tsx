import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';
import { Icon } from './Icon';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // kill mobile menu if user resizes back up to desktop width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // don't let the background scroll if the menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#platforms', label: 'Platforms' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }} animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 w-full z-50 transition-all duration-300",
                    scrolled ? 'glass py-3' : 'py-4 md:py-6 bg-transparent'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* brand logo */}
                    <div className="flex items-center gap-3">
                        <div className="h-7 sm:h-8 w-auto flex items-center justify-center">
                            <img src="/images/logo.png" alt="Blitz Logo" className="h-full w-auto object-contain" />
                        </div>
                    </div>

                    {/* links for desktop */}
                    <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="hover:text-blue-400 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA + Mobile Hamburger */}
                    <div className="flex items-center gap-3">

                        {/* Hamburger Button - visible on mobile only */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Icon icon={mobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="text-xl" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-[#0B0F14] border-l border-white/10 p-6 pt-20 flex flex-col"
                        >
                            {/* Nav Links */}
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-white hover:bg-white/5 transition-colors"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Mobile CTA */}
                            <div className="mt-auto pt-6 border-t border-white/10">
                                <a
                                    href="#platforms"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl text-base font-semibold transition-all"
                                >
                                    Get Started Free
                                    <Icon icon="solar:arrow-right-linear" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
