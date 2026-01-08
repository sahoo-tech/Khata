import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
    children,
    className = '',
    hover = true,
    glow = false,
    glowColor = 'cyan',
    ...props
}) {
    const glowClasses = {
        cyan: 'hover:neon-glow-cyan',
        violet: 'hover:neon-glow-violet',
        emerald: 'hover:neon-glow-emerald',
    };

    return (
        <motion.div
            className={`
        glass-card
        ${hover ? 'glass-hover cursor-pointer' : ''}
        ${glow ? glowClasses[glowColor] : ''}
        ${className}
      `}
            whileHover={hover ? { scale: 1.02, y: -5 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
