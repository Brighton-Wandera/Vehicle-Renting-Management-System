import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Fleet', path: '/vehicles' },
        { name: 'Locations', path: '/locations' },
        { name: 'Customer Reviews', path: '/reviews' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-500">
                            VeloRent
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${scrolled
                                    ? 'text-muted-foreground hover:text-foreground'
                                    : 'text-white/80 hover:text-white'
                                    } ${isActive(link.path) ? (scrolled ? 'text-foreground font-semibold' : 'text-white font-semibold') : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${scrolled ? 'bg-secondary hover:bg-secondary/80' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {user?.firstName}
                                    </span>
                                </button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-xl border border-border overflow-hidden p-1"
                                        >
                                            <Link
                                                to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>{user?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}</span>
                                            </Link>
                                            <Link
                                                to="/dashboard/profile"
                                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </Link>
                                            <div className="h-px bg-border my-1" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-sm"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link to="/auth/login">
                                    <button className={`text-sm font-medium transition-colors ${scrolled ? 'text-foreground hover:text-muted-foreground' : 'text-white hover:text-white/80'}`}>
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/auth/register">
                                    <button className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${scrolled ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white text-black hover:bg-white/90'}`}>
                                        Get Started
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/10'}`}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-background border-t border-border"
                    >
                        <div className="container-custom py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${isActive(link.path)
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-muted-foreground hover:bg-accent/50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {/* Mobile Auth Buttons */}
                            {!isAuthenticated && (
                                <div className="pt-4 mt-4 border-t border-border flex flex-col gap-3">
                                    <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors border border-input">
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
