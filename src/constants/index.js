// Animation timing constants
export const ANIMATION_DURATION = {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
    VERY_SLOW: 0.8,
};

export const SPRING_CONFIG = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
};

export const SPRING_SOFT = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
};

// 3D Scene constants
export const SCENE_CONFIG = {
    CAMERA_FOV: 75,
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 1000,
    PARALLAX_STRENGTH: 0.02,
    OBJECT_COUNT: 15,
    FLOAT_SPEED: 0.001,
    ROTATION_SPEED: 0.002,
};

// Color constants
export const COLORS = {
    NEON_CYAN: '#00f0ff',
    NEON_VIOLET: '#a855f7',
    NEON_EMERALD: '#10b981',
    NEON_PINK: '#ec4899',
    DARK_900: '#0a0a0f',
    DARK_800: '#13131a',
    DARK_700: '#1a1a24',
    DARK_600: '#24243a',
};

// Chart colors
export const CHART_COLORS = [
    '#00f0ff', // cyan
    '#a855f7', // violet
    '#10b981', // emerald
    '#ec4899', // pink
    '#f59e0b', // amber
    '#3b82f6', // blue
];

// Navigation items
export const NAV_ITEMS = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Expenses', path: '/expenses', icon: 'TrendingDown' },
    { name: 'Income', path: '/income', icon: 'TrendingUp' },
    { name: 'Budgets', path: '/budgets', icon: 'Target' },
    { name: 'Settings', path: '/settings', icon: 'Settings' },
];

// Expense categories
export const EXPENSE_CATEGORIES = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other',
];

// Income sources
export const INCOME_SOURCES = [
    'Salary',
    'Freelance',
    'Investment',
    'Business',
    'Gift',
    'Other',
];
