// Mock data for the application
// TODO: Replace with actual API calls when backend is ready

// Generate random date within last 30 days
const randomDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString();
};

// Mock expenses data
export const mockExpenses = [
    {
        id: 1,
        description: 'Grocery Shopping',
        amount: 4500,
        category: 'Food & Dining',
        date: randomDate(5),
        paymentMethod: 'Credit Card',
    },
    {
        id: 2,
        description: 'Uber Ride',
        amount: 350,
        category: 'Transportation',
        date: randomDate(3),
        paymentMethod: 'UPI',
    },
    {
        id: 3,
        description: 'Netflix Subscription',
        amount: 649,
        category: 'Entertainment',
        date: randomDate(10),
        paymentMethod: 'Credit Card',
    },
    {
        id: 4,
        description: 'Electricity Bill',
        amount: 2800,
        category: 'Bills & Utilities',
        date: randomDate(15),
        paymentMethod: 'Net Banking',
    },
    {
        id: 5,
        description: 'Restaurant Dinner',
        amount: 1850,
        category: 'Food & Dining',
        date: randomDate(2),
        paymentMethod: 'Credit Card',
    },
    {
        id: 6,
        description: 'Online Course',
        amount: 3999,
        category: 'Education',
        date: randomDate(20),
        paymentMethod: 'Debit Card',
    },
    {
        id: 7,
        description: 'Gym Membership',
        amount: 2500,
        category: 'Healthcare',
        date: randomDate(25),
        paymentMethod: 'UPI',
    },
    {
        id: 8,
        description: 'Shopping - Clothes',
        amount: 5600,
        category: 'Shopping',
        date: randomDate(12),
        paymentMethod: 'Credit Card',
    },
];

// Mock income data
export const mockIncome = [
    {
        id: 1,
        description: 'Monthly Salary',
        amount: 75000,
        source: 'Salary',
        date: randomDate(28),
        recurring: true,
    },
    {
        id: 2,
        description: 'Freelance Project',
        amount: 25000,
        source: 'Freelance',
        date: randomDate(15),
        recurring: false,
    },
    {
        id: 3,
        description: 'Stock Dividend',
        amount: 3500,
        source: 'Investment',
        date: randomDate(10),
        recurring: false,
    },
    {
        id: 4,
        description: 'Consulting Work',
        amount: 15000,
        source: 'Freelance',
        date: randomDate(5),
        recurring: false,
    },
];

// Mock budget data
export const mockBudgets = [
    {
        id: 1,
        category: 'Food & Dining',
        allocated: 15000,
        spent: 6350,
        color: '#00f0ff',
    },
    {
        id: 2,
        category: 'Transportation',
        allocated: 5000,
        spent: 350,
        color: '#a855f7',
    },
    {
        id: 3,
        category: 'Entertainment',
        allocated: 3000,
        spent: 649,
        color: '#10b981',
    },
    {
        id: 4,
        category: 'Bills & Utilities',
        allocated: 8000,
        spent: 2800,
        color: '#ec4899',
    },
    {
        id: 5,
        category: 'Shopping',
        allocated: 10000,
        spent: 5600,
        color: '#f59e0b',
    },
    {
        id: 6,
        category: 'Healthcare',
        allocated: 5000,
        spent: 2500,
        color: '#3b82f6',
    },
];

// Calculate totals
export const calculateTotals = () => {
    const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalIncome = mockIncome.reduce((sum, inc) => sum + inc.amount, 0);
    const monthlyBalance = totalIncome - totalExpenses;

    return {
        totalExpenses,
        totalIncome,
        monthlyBalance,
    };
};

// Get expense by category
export const getExpensesByCategory = () => {
    const categoryTotals = {};

    mockExpenses.forEach(expense => {
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

// Get recent transactions
export const getRecentTransactions = (limit = 5) => {
    const allTransactions = [
        ...mockExpenses.map(exp => ({ ...exp, type: 'expense' })),
        ...mockIncome.map(inc => ({ ...inc, type: 'income' })),
    ];

    return allTransactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
};
