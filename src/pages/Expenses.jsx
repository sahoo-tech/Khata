import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Search, Trash2, Edit } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import AnimatedModal from '../components/ui/AnimatedModal';
import useExpenseStore from '../store/useExpenseStore';
import { EXPENSE_CATEGORIES } from '../constants';
import { listItemAnimation } from '../utils/animations';

export default function Expenses() {
    const { expenses, deleteExpense, addExpense, selectedCategory, setSelectedCategory, recalculateBudgets } = useExpenseStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: EXPENSE_CATEGORIES[0],
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'Credit Card',
    });

    const filteredExpenses = expenses.filter(expense => {
        const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense({
            ...formData,
            amount: parseFloat(formData.amount),
            date: new Date(formData.date).toISOString(),
        });
        recalculateBudgets(); // Recalculate budgets after adding expense
        setIsModalOpen(false);
        setFormData({
            description: '',
            amount: '',
            category: EXPENSE_CATEGORIES[0],
            date: new Date().toISOString().split('T')[0],
            paymentMethod: 'Credit Card',
        });
    };

    const handleDelete = (id) => {
        deleteExpense(id);
        recalculateBudgets(); // Recalculate budgets after deleting expense
    };

    return (
        <div className="min-h-screen p-6 lg:p-8">
            {/* Header */}
            <motion.div
                className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent mb-2">
                        Expenses
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400">Track and manage your expenses</p>
                </div>

                <motion.button
                    className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-xl font-medium text-white text-sm sm:text-base w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add Expense
                </motion.button>
            </motion.div>

            {/* Filters */}
            <motion.div
                className="mb-6 flex flex-col md:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 glass-card text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                    />
                </div>

                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 cursor-pointer"
                >
                    <option value="All">All Categories</option>
                    {EXPENSE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </motion.div>

            {/* Expenses Table */}
            <GlassCard>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">Description</th>
                                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">Category</th>
                                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm hidden sm:table-cell">Date</th>
                                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm hidden md:table-cell">Payment</th>
                                        <th className="text-right py-3 sm:py-4 px-3 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">Amount</th>
                                        <th className="text-right py-3 sm:py-4 px-3 sm:px-4 text-gray-400 font-medium text-xs sm:text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredExpenses.map((expense, index) => (
                                            <motion.tr
                                                key={expense.id}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                                {...listItemAnimation}
                                                custom={index}
                                            >
                                                <td className="py-3 sm:py-4 px-3 sm:px-4 text-white font-medium text-sm sm:text-base">{expense.description}</td>
                                                <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-400 text-xs sm:text-sm">{expense.category}</td>
                                                <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-400 text-xs sm:text-sm hidden sm:table-cell">
                                                    {new Date(expense.date).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 sm:py-4 px-3 sm:px-4 text-gray-400 text-xs sm:text-sm hidden md:table-cell">{expense.paymentMethod}</td>
                                                <td className="py-3 sm:py-4 px-3 sm:px-4 text-right text-neon-cyan font-bold text-sm sm:text-base whitespace-nowrap">
                                                    ₹{expense.amount.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-3 sm:py-4 px-3 sm:px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                                                        <motion.button
                                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </motion.button>
                                                        <motion.button
                                                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => handleDelete(expense.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Add Expense Modal */}
            <AnimatedModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Expense"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <input
                            type="text"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                            placeholder="e.g., Grocery Shopping"
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
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                        >
                            {EXPENSE_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
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
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Payment Method</label>
                        <select
                            value={formData.paymentMethod}
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                        >
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Net Banking">Net Banking</option>
                        </select>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-xl font-medium text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Add Expense
                    </motion.button>
                </form>
            </AnimatedModal>
        </div>
    );
}
