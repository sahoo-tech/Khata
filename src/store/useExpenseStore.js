import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Load data from localStorage or use empty arrays
const loadFromStorage = (key, defaultValue = []) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

// Save data to localStorage
const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

const useExpenseStore = create(
    persist(
        (set, get) => ({
            // State - Start with empty data
            expenses: [],
            income: [],
            budgets: [],
            selectedCategory: 'All',
            selectedTimeRange: '30days',

            // Actions
            addExpense: (expense) => {
                set((state) => {
                    const newExpenses = [...state.expenses, { ...expense, id: Date.now() }];
                    saveToStorage('expenses', newExpenses);
                    return { expenses: newExpenses };
                });
            },

            deleteExpense: (id) => {
                set((state) => {
                    const newExpenses = state.expenses.filter(exp => exp.id !== id);
                    saveToStorage('expenses', newExpenses);
                    return { expenses: newExpenses };
                });
            },

            updateExpense: (id, updatedExpense) => {
                set((state) => {
                    const newExpenses = state.expenses.map(exp =>
                        exp.id === id ? { ...exp, ...updatedExpense } : exp
                    );
                    saveToStorage('expenses', newExpenses);
                    return { expenses: newExpenses };
                });
            },

            addIncome: (income) => {
                set((state) => {
                    const newIncome = [...state.income, { ...income, id: Date.now() }];
                    saveToStorage('income', newIncome);
                    return { income: newIncome };
                });
            },

            deleteIncome: (id) => {
                set((state) => {
                    const newIncome = state.income.filter(inc => inc.id !== id);
                    saveToStorage('income', newIncome);
                    return { income: newIncome };
                });
            },

            addBudget: (budget) => {
                set((state) => {
                    const newBudgets = [...state.budgets, { ...budget, id: Date.now(), spent: 0 }];
                    saveToStorage('budgets', newBudgets);
                    return { budgets: newBudgets };
                });
            },

            updateBudget: (id, updatedBudget) => {
                set((state) => {
                    const newBudgets = state.budgets.map(budget =>
                        budget.id === id ? { ...budget, ...updatedBudget } : budget
                    );
                    saveToStorage('budgets', newBudgets);
                    return { budgets: newBudgets };
                });
            },

            deleteBudget: (id) => {
                set((state) => {
                    const newBudgets = state.budgets.filter(budget => budget.id !== id);
                    saveToStorage('budgets', newBudgets);
                    return { budgets: newBudgets };
                });
            },

            // Recalculate budget spent amounts based on expenses
            recalculateBudgets: () => {
                set((state) => {
                    const newBudgets = state.budgets.map(budget => {
                        const spent = state.expenses
                            .filter(exp => exp.category === budget.category)
                            .reduce((sum, exp) => sum + exp.amount, 0);
                        return { ...budget, spent };
                    });
                    saveToStorage('budgets', newBudgets);
                    return { budgets: newBudgets };
                });
            },

            setSelectedCategory: (category) => set({ selectedCategory: category }),

            setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),

            // Clear all data
            clearAllData: () => {
                set({ expenses: [], income: [], budgets: [] });
                localStorage.removeItem('expenses');
                localStorage.removeItem('income');
                localStorage.removeItem('budgets');
            },

            // Computed values
            getTotalExpenses: () => {
                const state = get();
                return state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            },

            getTotalIncome: () => {
                const state = get();
                return state.income.reduce((sum, inc) => sum + inc.amount, 0);
            },

            getMonthlyBalance: () => {
                const state = get();
                const totalIncome = state.income.reduce((sum, inc) => sum + inc.amount, 0);
                const totalExpenses = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
                return totalIncome - totalExpenses;
            },
        }),
        {
            name: 'khata-storage',
            partialize: (state) => ({
                expenses: state.expenses,
                income: state.income,
                budgets: state.budgets,
            }),
        }
    )
);

export default useExpenseStore;
