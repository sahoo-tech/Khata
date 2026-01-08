import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { CHART_COLORS } from '../../constants';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <motion.div
                className="glass-card p-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <p className="text-white font-medium">{payload[0].name}</p>
                <p className="text-neon-cyan">₹{payload[0].value.toLocaleString('en-IN')}</p>
            </motion.div>
        );
    }
    return null;
};

export default function AnimatedPieChart({ data }) {
    const [animationComplete, setAnimationComplete] = React.useState(false);

    return (
        <motion.div
            className="w-full h-80"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => setAnimationComplete(true)}
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1000}
                        animationEasing="ease-out"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
