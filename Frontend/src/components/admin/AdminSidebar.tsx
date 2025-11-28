import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Car,
    Users,
    Calendar,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
    const { logout, user } = useAuthStore();

    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'vehicles', label: 'Fleet Management', icon: Car },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#0a0a0a] border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="h-20 flex items-center px-8 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-500">
                            VeloRent
                        </span>
                        <span className="text-xs text-gray-400 mt-1">Admin</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="ml-auto lg:hidden text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* User Profile */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold">
                            {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{user?.first_name} {user?.last_name}</p>
                            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;
