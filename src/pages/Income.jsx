import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, TrendingUp, Trash2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import AnimatedModal from '../components/ui/AnimatedModal';
import useExpenseStore from '../store/useExpenseStore';
import { INCOME_SOURCES } from '../constants';
import { listItemAnimation } from '../utils/animations';

export default function Income() {
    const { income, addIncome, deleteIncome, getTotalIncome } = useExpenseStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        source: INCOME_SOURCES[0],
        date: new Date().toISOString().split('T')[0],
        recurring: false,
    });

    const totalIncome = getTotalIncome();

    const handleSubmit = (e) => {
        e.preventDefault();
        addIncome({
            ...formData,
            amount: parseFloat(formData.amount),
            date: new Date(formData.date).toISOString(),
        });
        setIsModalOpen(false);
        setFormData({
            description: '',
            amount: '',
            source: INCOME_SOURCES[0],
            date: new Date().toISOString().split('T')[0],
            recurring: false,
        });
    };

    return (
        <div className="min-h-screen p-6 lg:p-8">
            {/* Header */}
            <motion.div
                className="mb-8 flex items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-emerald to-neon-cyan bg-clip-text text-transparent mb-2">
                        Income
                    </h1>
                    <p className="text-gray-400">Track your income sources</p>
                </div>

                <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-emerald to-neon-cyan rounded-xl font-medium text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-5 h-5" />
                    Add Income
                </motion.button>
            </motion.div>

            {/* Total Income Card */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <GlassCard glow={true} glowColor="emerald">
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-neon-emerald/20 border border-neon-emerald/30">
                            <TrendingUp className="w-8 h-8 text-neon-emerald" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm mb-1">Total Income</p>
                            <motion.p
                                className="text-4xl font-bold text-neon-emerald"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                ₹{totalIncome.toLocaleString('en-IN')}
                            </motion.p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Income List */}
            <GlassCard>
                <h2 className="text-xl font-bold text-white mb-6">Income History</h2>
                <div className="space-y-4">
                    <AnimatePresence>
                        {income.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                {...listItemAnimation}
                                custom={index}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-neon-emerald/20 border border-neon-emerald/30">
                                        <TrendingUp className="w-6 h-6 text-neon-emerald" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{item.description}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-sm text-gray-400">{item.source}</p>
                                            <span className="text-gray-600">•</span>
                                            <p className="text-sm text-gray-400">
                                                {new Date(item.date).toLocaleDateString()}
                                            </p>
                                            {item.recurring && (
                                                <>
                                                    <span className="text-gray-600">•</span>
                                                    <span className="text-xs px-2 py-1 rounded-full bg-neon-emerald/20 text-neon-emerald">
                                                        Recurring
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-2xl font-bold text-neon-emerald">
                                        +₹{item.amount.toLocaleString('en-IN')}
                                    </p>
                                    <motion.button
                                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => deleteIncome(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </GlassCard>

            {/* Add Income Modal */}
            <AnimatedModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Income"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <input
                            type="text"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-emerald/50"
                            placeholder="e.g., Monthly Salary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Amount (₹)</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-emerald/50"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Source</label>
                        <select
                            value={formData.source}
                            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-emerald/50"
                        >
                            {INCOME_SOURCES.map(source => (
                                <option key={source} value={source}>{source}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-emerald/50"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="recurring"
                            checked={formData.recurring}
                            onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                            className="w-5 h-5 rounded bg-white/5 border-white/10 text-neon-emerald focus:ring-neon-emerald/50"
                        />
                        <label htmlFor="recurring" className="text-sm text-gray-400">
                            This is a recurring income
                        </label>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-neon-emerald to-neon-cyan rounded-xl font-medium text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Add Income
                    </motion.button>
                </form>
            </AnimatedModal>
        </div>
    );
}
