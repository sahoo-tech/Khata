import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import Scene3D from '../components/3d/Scene3D';
import KPICard from '../components/cards/KPICard';
import GlassCard from '../components/ui/GlassCard';
import AnimatedPieChart from '../components/charts/AnimatedPieChart';
import AnimatedBarChart from '../components/charts/AnimatedBarChart';
import useExpenseStore from '../store/useExpenseStore';
import { staggerContainer } from '../utils/animations';

export default function Dashboard() {
    const navigate = useNavigate();
    const { expenses, income, getTotalExpenses, getTotalIncome, getMonthlyBalance } = useExpenseStore();

    const totalExpenses = getTotalExpenses();
    const totalIncome = getTotalIncome();
    const monthlyBalance = getMonthlyBalance();

    // Get expenses by category from actual user data
    const getExpensesByCategory = () => {
        const categoryTotals = {};

        expenses.forEach(expense => {
            if (categoryTotals[expense.category]) {
                categoryTotals[expense.category] += expense.amount;
            } else {
                categoryTotals[expense.category] = expense.amount;
            }
        });

        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
        }));
    };

    // Get recent transactions from actual user data
    const getRecentTransactions = (limit = 5) => {
        const allTransactions = [
            ...expenses.map(exp => ({ ...exp, type: 'expense' })),
            ...income.map(inc => ({ ...inc, type: 'income' })),
        ];

        return allTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    };

    const expensesByCategory = getExpensesByCategory();
    const recentTransactions = getRecentTransactions(5);

    const hasData = totalExpenses > 0 || totalIncome > 0;

    return (
        <div className="min-h-screen relative">
            {/* 3D Background */}
            <Scene3D />

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8">
                {/* Header */}
                <motion.div
                    className="mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald bg-clip-text text-transparent mb-2">
                        Dashboard
                    </h1>
                    <p className="text-sm sm:text-base text-gray-400">Welcome back! Here's your financial overview.</p>
                </motion.div>

                {/* KPI Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <KPICard
                        title="Total Expenses"
                        value={totalExpenses}
                        icon={TrendingDown}
                        color="cyan"
                        trend={-5.2}
                        delay={0}
                    />
                    <KPICard
                        title="Total Income"
                        value={totalIncome}
                        icon={TrendingUp}
                        color="emerald"
                        trend={12.5}
                        delay={0.1}
                    />
                    <KPICard
                        title="Monthly Balance"
                        value={monthlyBalance}
                        icon={Wallet}
                        color="violet"
                        trend={8.3}
                        delay={0.2}
                    />
                </motion.div>

                {/* Welcome Message for New Users */}
                {!hasData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <GlassCard className="text-center py-12">
                            <h2 className="text-2xl font-bold text-white mb-4">Welcome to Khata! 🎉</h2>
                            <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                Start tracking your finances by adding your first expense or income.
                                Click on the navigation menu to get started!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <motion.button
                                    onClick={() => navigate('/expenses')}
                                    className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-violet rounded-xl font-medium text-white"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Add Expense
                                </motion.button>
                                <motion.button
                                    onClick={() => navigate('/income')}
                                    className="px-6 py-3 bg-gradient-to-r from-neon-emerald to-neon-cyan rounded-xl font-medium text-white"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Add Income
                                </motion.button>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {/* Charts Section */}
                {hasData && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Pie Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <GlassCard>
                                <h2 className="text-xl font-bold text-white mb-4">Expenses by Category</h2>
                                <AnimatedPieChart data={expensesByCategory} />
                            </GlassCard>
                        </motion.div>

                        {/* Bar Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlassCard>
                                <h2 className="text-xl font-bold text-white mb-4">Category Breakdown</h2>
                                <AnimatedBarChart data={expensesByCategory} />
                            </GlassCard>
                        </motion.div>
                    </div>
                )}

                {/* Recent Transactions */}
                {hasData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <GlassCard>
                            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
                            <div className="space-y-3">
                                {recentTransactions.map((transaction, index) => (
                                    <motion.div
                                        key={transaction.id}
                                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${transaction.type === 'expense'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                {transaction.type === 'expense' ? (
                                                    <TrendingDown className="w-5 h-5" />
                                                ) : (
                                                    <TrendingUp className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{transaction.description}</p>
                                                <p className="text-sm text-gray-400">
                                                    {transaction.category || transaction.source} • {new Date(transaction.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={`text-lg font-bold ${transaction.type === 'expense' ? 'text-red-400' : 'text-green-400'
                                            }`}>
                                            {transaction.type === 'expense' ? '-' : '+'}₹{transaction.amount.toLocaleString('en-IN')}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
