import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const serviceId = 'service_5teq11e';
        const publicKey = '_-8JNO8FxnE7ekwmB';

        try {
            // 1st template: Support team receives the inquiry
            await emailjs.send(
                serviceId,
                'template_mgimyiq',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone_number: formData.phone,
                    message: formData.message,
                },
                publicKey
            );

            // 2nd template: User receives an auto-reply
            await emailjs.send(
                serviceId,
                'template_wild9dd',
                {
                    to_name: formData.name,
                    to_email: formData.email,
                },
                publicKey
            );

            setStatus('success');
            setTimeout(() => {
                onClose();
                resetForm();
            }, 3000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative overflow-hidden bg-neutral-900 w-full max-w-5xl rounded-3xl shadow-2xl pointer-events-auto"
                        >
                            {/* Background */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/60668e31-2150-424e-b292-05bfdda254e0_1600w.jpg"
                                    alt="Abstract minimal background"
                                    className="h-full w-full object-cover opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent"></div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-all backdrop-blur-md"
                            >
                                <Icon icon="solar:close-circle-linear" className="text-2xl" />
                            </button>

                            {/* Content */}
                            <div className="relative z-10 p-6 sm:p-8 md:p-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                    {/* Form card */}
                                    <div className="lg:col-span-5">
                                        <div className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-black/10 shadow-lg p-4 sm:p-5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-[11px] text-neutral-500">Milima Support</p>
                                                    <h3 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">Have a question?</h3>
                                                </div>
                                                <div className="h-9 w-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                                                    <Icon icon="solar:chat-line-linear" className="text-lg" />
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <AnimatePresence>
                                                    {status === 'success' && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl text-center p-6 border border-emerald-500/20"
                                                        >
                                                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                                                                <Icon icon="solar:check-circle-linear" className="text-3xl" />
                                                            </div>
                                                            <h4 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h4>
                                                            <p className="text-sm text-neutral-600">Thank you for reaching out. We've sent a confirmation to your email.</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <form onSubmit={handleSubmit} className={`mt-4 space-y-3 transition-opacity duration-300 ${status === 'loading' ? 'opacity-50' : 'opacity-100'}`}>
                                                    <div>
                                                        <label htmlFor="ct-name" className="block text-xs text-neutral-600">Your name<span className="text-neutral-400"> *</span></label>
                                                        <input
                                                            id="ct-name"
                                                            name="name"
                                                            type="text"
                                                            required
                                                            disabled={status === 'loading'}
                                                            placeholder="Jane Doe"
                                                            className="mt-1 w-full pl-3 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white/50 placeholder:text-neutral-400 text-neutral-900"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ct-email" className="block text-xs text-neutral-600">E‑mail<span className="text-neutral-400"> *</span></label>
                                                        <div className="relative mt-1">
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                                                <Icon icon="solar:letter-linear" />
                                                            </div>
                                                            <input
                                                                id="ct-email"
                                                                name="email"
                                                                type="email"
                                                                required
                                                                disabled={status === 'loading'}
                                                                placeholder=" Email Address"
                                                                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white/50 placeholder:text-neutral-400 text-neutral-900"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ct-phone" className="block text-xs text-neutral-600">Phone</label>
                                                        <div className="relative mt-1">
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                                                <Icon icon="solar:phone-calling-linear" />
                                                            </div>
                                                            <input
                                                                id="ct-phone"
                                                                name="phone"
                                                                type="tel"
                                                                disabled={status === 'loading'}
                                                                placeholder="+1 234 567 890"
                                                                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white/50 placeholder:text-neutral-400 text-neutral-900"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ct-msg" className="block text-xs text-neutral-600">Message</label>
                                                        <textarea
                                                            id="ct-msg"
                                                            name="message"
                                                            rows={4}
                                                            disabled={status === 'loading'}
                                                            placeholder="How can we help?"
                                                            className="mt-1 w-full resize-y pl-3 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white/50 placeholder:text-neutral-400 text-neutral-900"
                                                            value={formData.message}
                                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        ></textarea>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={status === 'loading'}
                                                        className="w-full inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {status === 'loading' ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                                Sending...
                                                            </div>
                                                        ) : (
                                                            <>
                                                                Send message
                                                                <Icon icon="solar:arrow-right-linear" />
                                                            </>
                                                        )}
                                                    </button>
                                                    {status === 'error' && (
                                                        <p className="text-[11px] text-red-500 text-center font-medium">Failed to send. Please try again.</p>
                                                    )}
                                                    <p className="text-[11px] text-neutral-500 text-center">By submitting, you agree to our Terms and Privacy Policy.</p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Copy + highlights */}
                                    <div className="lg:col-span-7 pt-4 lg:pt-12">
                                        <h2 className="text-white tracking-tight text-5xl sm:text-6xl font-semibold leading-[1.05]">Let's talk.</h2>
                                        <p className="sm:text-lg max-w-2xl text-base text-neutral-200 mt-4">
                                            Tell us about your setup—support, bulk orders, or partnerships. We reply within one business day.
                                        </p>

                                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="flex items-start gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-emerald-300">
                                                    <Icon icon="solar:clock-circle-linear" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">Quick response</p>
                                                    <p className="text-neutral-300 text-xs">Most messages receive a reply in under 24h.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-emerald-300">
                                                    <Icon icon="solar:route-linear" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">Clear next steps</p>
                                                    <p className="text-neutral-300 text-xs">We'll follow up with a concise plan and timeline.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Direct contact card */}

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
