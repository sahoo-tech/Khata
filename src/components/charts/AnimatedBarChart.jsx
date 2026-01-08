import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <motion.div
                className="glass-card p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="text-white font-medium">{payload[0].payload.name}</p>
                <p className="text-neon-violet">₹{payload[0].value.toLocaleString('en-IN')}</p>
            </motion.div>
        );
    }
    return null;
};

export default function AnimatedBarChart({ data }) {
    return (
        <motion.div
            className="w-full h-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        fill="#a855f7"
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
