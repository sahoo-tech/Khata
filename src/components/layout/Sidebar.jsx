import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    LayoutDashboard,
    TrendingDown,
    TrendingUp,
    Target,
    Settings,
    Menu,
    X,
    Wallet
} from 'lucide-react';
import { NAV_ITEMS } from '../../constants';

const iconMap = {
    Home,
    LayoutDashboard,
    TrendingDown,
    TrendingUp,
    Target,
    Settings,
};

export default function Sidebar() {
    const [isOpen, setIsOpen] = React.useState(false);

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '-100%' },
    };

    return (
        <>
            {/* Mobile menu button */}
            <motion.button
                className="lg:hidden fixed top-4 left-4 z-50 p-3 glass-card"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <Menu className="w-6 h-6 text-white" />
                )}
            </motion.button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <motion.div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 z-40 lg:translate-x-0"
                variants={sidebarVariants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center gap-3 mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="p-2 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-violet">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent">
                            Khata
                        </h1>
                    </motion.div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {NAV_ITEMS.map((item, index) => {
                            const Icon = iconMap[item.icon];

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${isActive
                                            ? 'bg-white/10 text-neon-cyan'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* Active indicator */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan to-neon-violet rounded-r-full"
                                                    layoutId="activeIndicator"
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                />
                                            )}

                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: 'spring', stiffness: 400 }}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.div>

                                            {/* Label */}
                                            <span className="font-medium">{item.name}</span>

                                            {/* Hover glow */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-xl neon-glow-cyan opacity-50 -z-10"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.5 }}
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <motion.div
                        className="pt-6 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="text-xs text-gray-500 text-center">
                            © 2026 Khata
                        </p>
                    </motion.div>
                </div>
            </motion.aside>
        </>
    );
}
