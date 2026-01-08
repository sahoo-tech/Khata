import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingDown,
    TrendingUp,
    Target,
    Wallet,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import Scene3D from '../components/3d/Scene3D';
import GlassCard from '../components/ui/GlassCard';

export default function Home() {
    const navigate = useNavigate();

    const features = [
        {
            icon: LayoutDashboard,
            title: 'Dashboard',
            description: 'View your financial overview with beautiful charts and insights',
            color: 'cyan',
            path: '/dashboard',
            gradient: 'from-neon-cyan to-neon-violet',
        },
        {
            icon: TrendingDown,
            title: 'Expenses',
            description: 'Track and manage all your expenses in one place',
            color: 'violet',
            path: '/expenses',
            gradient: 'from-neon-violet to-neon-pink',
        },
        {
            icon: TrendingUp,
            title: 'Income',
            description: 'Monitor your income sources and track earnings',
            color: 'emerald',
            path: '/income',
            gradient: 'from-neon-emerald to-neon-cyan',
        },
        {
            icon: Target,
            title: 'Budgets',
            description: 'Set spending limits and stay on track with your goals',
            color: 'pink',
            path: '/budgets',
            gradient: 'from-neon-pink to-neon-violet',
        },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* 3D Background */}
            <Scene3D />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 lg:p-8">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16 max-w-4xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Logo/Icon */}
                    <motion.div
                        className="inline-flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-emerald relative">
                            <Wallet className="w-16 h-16 text-white" />
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-emerald opacity-50 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald bg-clip-text text-transparent">
                            Khata
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-3 sm:mb-4 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Your Personal Finance Manager
                    </motion.p>

                    <motion.p
                        className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Track expenses, manage income, set budgets, and visualize your financial journey with stunning 3D animations
                    </motion.p>
                </motion.div>

                {/* Feature Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.path}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                        >
                            <GlassCard
                                className="h-full cursor-pointer group relative overflow-hidden"
                                onClick={() => navigate(feature.path)}
                            >
                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} inline-block mb-4`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                                        {feature.title}
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Glow effect */}
                                <motion.div
                                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    style={{
                                        boxShadow: `0 0 30px rgba(0, 240, 255, 0.3)`,
                                    }}
                                />
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="mt-12 sm:mt-16 text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                >
                    <motion.button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald rounded-xl font-bold text-white text-base sm:text-lg inline-flex items-center gap-2 sm:gap-3 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                        Get Started
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <p className="text-gray-500 text-xs sm:text-sm mt-4">
                        No signup required • Free forever • Data stored locally
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
