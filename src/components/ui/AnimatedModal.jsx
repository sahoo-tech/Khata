import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { backdropAnimation, modalAnimation } from '../../utils/animations';

export default function AnimatedModal({ isOpen, onClose, title, children }) {
    // Close on escape key
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
                        onClick={onClose}
                        {...backdropAnimation}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="glass-card w-full max-w-md relative"
                            onClick={(e) => e.stopPropagation()}
                            {...modalAnimation}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">{title}</h2>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div>{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
