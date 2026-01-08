import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { slideUp } from '../../utils/animations';

export default function KPICard({
    title,
    value,
    icon: Icon,
    color = 'cyan',
    trend,
    delay = 0
}) {
    const [displayValue, setDisplayValue] = useState(0);

    // Animate number counting
    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 1000; // 1 second
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    const colorClasses = {
        cyan: 'text-neon-cyan border-neon-cyan/30',
        violet: 'text-neon-violet border-neon-violet/30',
        emerald: 'text-neon-emerald border-neon-emerald/30',
        pink: 'text-neon-pink border-neon-pink/30',
    };

    const glowColors = {
        cyan: 'neon-glow-cyan',
        violet: 'neon-glow-violet',
        emerald: 'neon-glow-emerald',
    };

    return (
        <motion.div
            initial={slideUp.initial}
            animate={slideUp.animate}
            transition={{ ...slideUp.transition, delay }}
        >
            <GlassCard
                hover={true}
                glow={true}
                glowColor={color}
                className="relative overflow-hidden"
            >
                {/* Animated gradient background */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${color}/10 to-transparent opacity-0`}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-white/5 border ${colorClasses[color]}`}>
                            <Icon className={`w-6 h-6 ${colorClasses[color].split(' ')[0]}`} />
                        </div>

                        {trend && (
                            <motion.div
                                className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: delay + 0.3 }}
                            >
                                {trend > 0 ? '+' : ''}{trend}%
                            </motion.div>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                        {title}
                    </h3>

                    {/* Value */}
                    <motion.div
                        className={`text-3xl font-bold ${colorClasses[color].split(' ')[0]}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
                    >
                        ₹{displayValue.toLocaleString('en-IN')}
                    </motion.div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                    className={`absolute inset-0 rounded-2xl ${glowColors[color]} opacity-0 pointer-events-none`}
                    whileHover={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                />
            </GlassCard>
        </motion.div>
    );
}
