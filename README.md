# Khata - Home Expense Management System

A modern, 3D-enhanced expense management application built with React, Three.js, and Framer Motion.

## Features

- 🎨 **Stunning 3D Visuals**: Interactive 3D background with floating objects
- ✨ **Smooth Animations**: Framer Motion powered animations throughout
- 💳 **Expense Tracking**: Comprehensive expense management with categories
- 💰 **Income Management**: Track multiple income sources
- 🎯 **Budget Monitoring**: Visual budget tracking with progress rings
- 📊 **Interactive Charts**: Animated pie and bar charts
- 🌙 **Dark-First UI**: Beautiful glassmorphism design with neon accents
- 📱 **Responsive**: Works seamlessly on desktop and mobile

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── 3d/          # Three.js 3D components
│   ├── cards/       # Card components
│   ├── charts/      # Chart components
│   ├── layout/      # Layout components
│   └── ui/          # UI components
├── pages/           # Page components
├── store/           # Zustand store
├── utils/           # Utility functions
├── constants/       # Constants and config
└── App.jsx          # Main app component
```

## Features Overview

### Dashboard
- 3D animated background
- KPI cards showing total expenses, income, and balance
- Expense breakdown charts
- Recent transactions list

### Expenses
- Add, edit, and delete expenses
- Filter by category
- Search functionality
- Animated table with smooth transitions

### Income
- Track income from multiple sources
- Mark recurring income
- Visual income breakdown

### Budgets
- Set budgets for different categories
- Animated progress rings
- Over-budget warnings with pulse animations

### Settings
- Profile management
- Notification preferences
- Theme customization
- Language and currency settings

## Performance

- Lazy loading for 3D assets
- Optimized animations
- Efficient rendering with React Three Fiber
- Responsive design for all devices

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT

## Author

Built with ❤️ using modern web technologies