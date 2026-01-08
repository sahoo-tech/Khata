import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Moon, Globe, Shield } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function Settings() {
    return (
        <div className="min-h-screen p-6 lg:p-8">
            {/* Header */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent mb-2">
                    Settings
                </h1>
                <p className="text-gray-400">Manage your preferences</p>
            </motion.div>

            <div className="max-w-2xl space-y-6">
                {/* Profile Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <GlassCard>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/30">
                                <User className="w-6 h-6 text-neon-cyan" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Profile</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue="john@example.com"
                                    className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                                />
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <GlassCard>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-neon-violet/20 border border-neon-violet/30">
                                <Bell className="w-6 h-6 text-neon-violet" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Budget alerts</span>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Weekly summary</span>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Transaction notifications</span>
                                <input type="checkbox" className="w-5 h-5" />
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <GlassCard>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-neon-emerald/20 border border-neon-emerald/30">
                                <Moon className="w-6 h-6 text-neon-emerald" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Appearance</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
                                <select className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-emerald/50">
                                    <option value="dark">Dark (Current)</option>
                                    <option value="light">Light</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300">Reduce animations</span>
                                <input type="checkbox" className="w-5 h-5" />
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Language & Region */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <GlassCard>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-neon-pink/20 border border-neon-pink/30">
                                <Globe className="w-6 h-6 text-neon-pink" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Language & Region</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Currency</label>
                                <select className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-pink/50">
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                                <select className="w-full px-4 py-3 glass-card text-white focus:outline-none focus:ring-2 focus:ring-neon-pink/50">
                                    <option value="en">English</option>
                                    <option value="hi">हिन्दी</option>
                                    <option value="es">Español</option>
                                </select>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Save Button */}
                <motion.button
                    className="w-full py-4 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-emerald rounded-xl font-medium text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Save Changes
                </motion.button>
            </div>
        </div>
    );
}
