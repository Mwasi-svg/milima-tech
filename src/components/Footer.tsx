import { motion } from 'framer-motion';
import { Icon } from './Icon';

export const Footer = () => {
    return (
        <footer id="contact" className="bg-black relative pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 overflow-hidden">
            {/* Top Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12 mb-16 sm:mb-24 lg:mb-32">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-6 sm:mb-8 leading-[1.1]">
                            Private. <span className="text-slate-500">Secure.</span> Anonymous.
                        </h2>
                        <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            <a href="#" className="hover:text-white transition-colors">Home</a>
                            <a href="#features" className="hover:text-white transition-colors">Features</a>
                            <a href="#platforms" className="hover:text-white transition-colors">Download</a>
                            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                        </div>
                        <div className="flex flex-col gap-2 mt-8 text-sm font-medium text-slate-500">
                            <a href="mailto:hello@blitz-chat.com" className="hover:text-white transition-colors flex items-center gap-2 w-fit">
                                <Icon icon="solar:letter-linear" className="text-lg" />
                                hello@blitz-chat.com
                            </a>
                            <a href="tel:+15550002548" className="hover:text-white transition-colors flex items-center gap-2 w-fit">
                                <Icon icon="solar:phone-calling-linear" className="text-lg" />
                                +1 (555) 000-BLITZ
                            </a>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <a href="https://www.instagram.com/accounts/login/?hl=en" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                <Icon icon="ri:instagram-line" className="text-xl" />
                            </a>
                            <a href="https://x.com/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                <Icon icon="ri:twitter-x-fill" className="text-xl" />
                            </a>
                            <a href="https://www.facebook.com/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                <Icon icon="ri:facebook-fill" className="text-xl" />
                            </a>
                        </div>
                    </div>


                </div>
            </div>

            {/* Massive BLITZ Typography with Fade Effect */}
            <div className="relative w-full overflow-hidden flex justify-center items-end" style={{ height: '20vh' }}>
                <h1 className="text-[20vw] sm:text-[18vw] md:text-[20vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#1C2330] to-transparent select-none absolute bottom-[-5vw] left-0 right-0 text-center pointer-events-none">
                    BLITZ
                </h1>
                <h1 className="text-[20vw] sm:text-[18vw] md:text-[20vw] font-black leading-none tracking-tighter text-[#111] select-none absolute bottom-[-5vw] left-0 right-0 text-center pointer-events-none z-0"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
                    }}>
                    <motion.span
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        BLITZ
                    </motion.span>
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex justify-center mt-8 sm:mt-12">
                <p className="text-[10px] text-slate-800 font-mono uppercase tracking-widest">
                    © 2026 Milima Technologies. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
