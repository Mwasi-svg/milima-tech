import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { ContactModal } from './ContactModal';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSection {
    title: string;
    items: FAQItem[];
}

const faqData: FAQSection[] = [
    {
        title: "Security",
        items: [
            {
                question: "What does security level mean?",
                answer: "Every dialog has different security level and it depends on how your contact was initially established. The most secure way to make a contact and prevent any spoofing is personal contact, when one person scans QR-key from the screen of the other user. When you send your QR-key to another user using e-mail or other messaging app there is a chance that hackers may use your QR-key to add himself to your contact and give oneself away as one of your friends."
            },
            {
                question: "What encryption algorithms are used?",
                answer: "Message encryption is done using AES CBC method with 256 bit key length, with separate pair of keys for every message dialog — one key for each direction. For initial contact negotiation an asymmetric ECDH 521 algorithm with public key is used. In every QR-key only public key is embedded, corresponding private key is securely stored on your device."
            },
            {
                question: "What's embedded in QR-key?",
                answer: "In QR-key that you send out to your friends the following information is stored: your nickname, unique user number, new public encryption key, protocol version and some additional information to speed up negotiation process."
            },
            {
                question: "How authorization is made?",
                answer: "Your device will generate unique random string after you launch it for the first time. That string will be stored on your device and sent to the server each time you open the app. The server will give you a unique number in return and that number will be used as your public address for other users."
            },
            {
                question: "How secure are these random encryption keys?",
                answer: "Random number generator in our application not only uses default system entropy settings, but also uses all available sensors (accelerometer and gyroscope) to make encryption keys more random and unpredictable."
            },
            {
                question: "Why does application require permission to my camera?",
                answer: "Application uses built-in camera to scan QR-keys as a primary method to add other people to the contacts list."
            }
        ]
    },
    {
        title: "Main Functions",
        items: [
            {
                question: "How to add a new contact?",
                answer: "To add a new contact tap (+) sign on the main screen and follow the instructions on the screen. Decide who will generate QR-key and who will scan it, the particular order is not very important and will not affect security level and encryption strength in any way. After somebody scans a QR-key of another user, both applications will start exchanging encryption keys, avatars and names. You will see a detailed schematic description of every step of this process."
            },
            {
                question: "How to tell if my message was read/received?",
                answer: "Each message undergoes several states: is sending, sent to the server, read by recipient. Because message could not be delivered to the recipient until he or she launches the application, there is no distinct 'delivered to device' status. After each message is delivered and read, it will be deleted from server and will only be stored on the two devices — yours and recipient's."
            },
            {
                question: "I've received an error 'Message couldn't be decrypted'. What does it mean?",
                answer: "It means that a recipient's device could not find a proper decryption to decipher your message. It may happen when the recipient's database was wiped or application was re-installed."
            },
            {
                question: "How to wipe message history on another user's device?",
                answer: "You may delete every message individually or wipe out all messages in one step. There is also an auto-deletion option in application settings that will automatically delete old messages after certain amount of time. If message was deleted on one device it will also be simultaneously deleted on the other device, regardless of who deleted and sent it."
            }
        ]
    },
    {
        title: "Settings",
        items: [
            {
                question: "How auto-deletion works and how to use it?",
                answer: "You may set different intervals for message auto-deletion — from 24 hours to one month. Each time you launch the application it will automatically delete messages on both devices that exceed the set time interval. Please note that if the other user has set shorter auto-deletion interval than yours, all messages in your application will be deleted according to his or hers interval, not yours."
            },
            {
                question: "What is the key expiration lifetime and what does it mean?",
                answer: "Key lifetime is an optional security setting, that will remind you to renew your encryption keys with those who have highest security level in your contacts list. When expiration time will be reached, nothing will be changed or deleted, there will be just a small 'faded lock' icon near user's name that will remind you to renew encryption keys with that person."
            },
            {
                question: "Why Touch ID is considered less safe than regular pin-code?",
                answer: "While activating Touch ID option, the PIN-code is stored on the device, what makes the user's database and message history more vulnerable in compare with every session PIN-code enter."
            }
        ]
    }
];

const FAQAccordionItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => {
    return (
        <motion.div
            initial={false}
            className="border-b border-white/5 last:border-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-start justify-between gap-4 text-left group"
            >
                <span className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors flex-1">
                    {item.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                >
                    <Icon icon="solar:alt-arrow-down-linear" className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-400 leading-relaxed pr-12">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const FAQ = () => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (sectionIndex: number, itemIndex: number) => {
        const key = `${sectionIndex}-${itemIndex}`;
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <section className="py-32 px-6 bg-blitz-bg relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6"
                    >
                        <Icon icon="solar:question-circle-linear" className="text-base" />
                        FAQ
                    </motion.div>
                    <h2 className="text-5xl lg:text-6xl font-semibold tracking-tighter text-white leading-tight mb-6">
                        Frequently Asked <span className="text-slate-500">Questions</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Find answers to common questions about security, features, and settings.
                    </p>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-12">
                    {faqData.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sectionIndex * 0.1 }}
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                                <h3 className="text-2xl font-semibold text-white tracking-tight">
                                    {section.title}
                                </h3>
                            </div>

                            {/* Accordion Items */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                                {section.items.map((item, itemIndex) => (
                                    <FAQAccordionItem
                                        key={itemIndex}
                                        item={item}
                                        isOpen={openItems[`${sectionIndex}-${itemIndex}`] || false}
                                        onToggle={() => toggleItem(sectionIndex, itemIndex)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center p-10 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-3xl"
                >
                    <h3 className="text-2xl font-semibold text-white mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Our team is here to help. Reach out anytime.
                    </p>
                    <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                    >
                        Email Us
                        <Icon icon="solar:arrow-right-linear" className="text-base" />
                    </button>
                </motion.div>
            </div>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </section>
    );
};
