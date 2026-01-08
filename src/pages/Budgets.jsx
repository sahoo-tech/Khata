import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, Plus, Trash2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import AnimatedModal from '../components/ui/AnimatedModal';
import useExpenseStore from '../store/useExpenseStore';
import { CHART_COLORS, EXPENSE_CATEGORIES } from '../constants';

function ProgressRing({ progress, color, size = 120 }) {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
        </div>
    );
}

export default function Budgets() {
    const { budgets, addBudget, deleteBudget } = useExpenseStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        category: EXPENSE_CATEGORIES[0],
        allocated: '',
        color: CHART_COLORS[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addBudget({
            ...formData,
            allocated: parseFloat(formData.allocated),
        });
        setIsModalOpen(false);
        setFormData({
            category: EXPENSE_CATEGORIES[0],
            allocated: '',
            color: CHART_COLORS[0],
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-violet to-neon-pink bg-clip-text text-transparent mb-2">
                        Budgets
                    </h1>
                    <p className="text-gray-400">Monitor your spending limits</p>
                </div>

                <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-violet to-neon-pink rounded-xl font-medium text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-5 h-5" />
                    Add Budget
                </motion.button>
            </motion.div>

            {/* Budget Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgets.map((budget, index) => {
                    const progress = (budget.spent / budget.allocated) * 100;
                    const isOverBudget = progress > 100;
                    const isNearLimit = progress > 80 && progress <= 100;

                    return (
                        <motion.div
                            key={budget.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="relative overflow-hidden">
                                {/* Over budget warning */}
                                {isOverBudget && (
                                    <motion.div
                                        className="absolute top-4 right-4"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                    </motion.div>
                                )}

                                <div className="flex flex-col items-center">
                                    {/* Category Icon */}
                                    <div
                                        className="p-3 rounded-xl mb-4"
                                        style={{
                                            backgroundColor: `${budget.color}20`,
                                            borderColor: `${budget.color}30`,
                                            borderWidth: 1
                                        }}
                                    >
                                        <Target className="w-6 h-6" style={{ color: budget.color }} />
                                    </div>

                                    {/* Category Name */}
                                    <h3 className="text-lg font-bold text-white mb-6">{budget.category}</h3>

                                    {/* Progress Ring */}
                                    <ProgressRing
                                        progress={Math.min(progress, 100)}
                                        color={isOverBudget ? '#ef4444' : isNearLimit ? '#f59e0b' : budget.color}
                                    />

                                    {/* Budget Details */}
                                    <div className="w-full mt-6 pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-400">Spent</span>
                                            <span className="text-sm font-bold text-white">
                                                ₹{budget.spent.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-400">Budget</span>
                                            <span className="text-sm font-bold text-white">
                                                ₹{budget.allocated.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Remaining</span>
                                            <span
                                                className={`text-sm font-bold ${isOverBudget ? 'text-red-400' : 'text-neon-emerald'
                                                    }`}
                                            >
                                                {isOverBudget ? '-' : ''}₹{Math.abs(budget.allocated - budget.spent).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Warning Messages */}
                                    {isOverBudget && (
                                        <motion.div
                                            className="w-full mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <p className="text-xs text-red-400 text-center font-medium">
                                                Over budget by ₹{(budget.spent - budget.allocated).toLocaleString('en-IN')}
                                            </p>
                                        </motion.div>
                                    )}

                                    {isNearLimit && !isOverBudget && (
                                        <motion.div
                                            className="w-full mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <p className="text-xs text-amber-400 text-center font-medium">
                                                Approaching budget limit
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                                {/* Delete Button */}
                                <motion.button
                                    className="absolute top-4 left-4 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => deleteBudget(budget.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </div>

            {/* Add Budget Modal */}
            <AnimatedModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Budget"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-violet/50"
                        >
                            {EXPENSE_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Budget Amount (₹)</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            value={formData.allocated}
                            onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-violet/50"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Color</label>
                        <div className="grid grid-cols-6 gap-2">
                            {CHART_COLORS.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color })}
                                    className={`w-10 h-10 rounded-lg border-2 ${formData.color === color ? 'border-white' : 'border-transparent'
                                        }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-neon-violet to-neon-pink rounded-xl font-medium text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Add Budget
                    </motion.button>
                </form>
            </AnimatedModal>
        </div>
    );
}
