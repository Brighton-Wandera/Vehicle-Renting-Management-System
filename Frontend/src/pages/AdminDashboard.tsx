import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardApi } from '../api/admin.api';
import { Users, Car, DollarSign, Calendar, TrendingUp, Moon, Sun, Monitor } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { useThemeStore } from '../store/themeStore';
// import { useSettingsStore } from '../store/settingsStore';
import ManageVehicles from '../components/admin/vehicles/ManageVehicles';
import ManageUsers from '../components/admin/users/ManageUsers';
import ManageBookings from '../components/admin/bookings/ManageBookings';

interface AdminStats {
    total_users: number;
    total_vehicles: number;
    total_bookings: number;
    pending_bookings: number;
    total_revenue: number;
    available_vehicles: number;
    recent_bookings: any[];
    revenue_by_month: any[];
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    // Theme Store
    const { theme, setTheme } = useThemeStore();
    // Settings Store
    // const { emailNotifications, maintenanceMode, toggleEmailNotifications, toggleMaintenanceMode } = useSettingsStore();
    const emailNotifications = true;
    const maintenanceMode = false;
    const toggleEmailNotifications = () => { };
    const toggleMaintenanceMode = () => { };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const statsData = await dashboardApi.getAdminStats();
            setStats(statsData);
        } catch (error) {
            console.error('Failed to load dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                    <div className="text-white text-xl font-light">Loading Dashboard...</div>
                </div>
            </div>
        );
    }

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                        <p className="text-gray-400">Welcome back, here's what's happening today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatsCard
                            icon={<Users className="w-6 h-6" />}
                            title="Total Users"
                            value={stats?.total_users || 0}
                            gradient="from-blue-500 to-blue-600"
                        />
                        <StatsCard
                            icon={<Car className="w-6 h-6" />}
                            title="Total Vehicles"
                            value={stats?.total_vehicles || 0}
                            subtitle={`${stats?.available_vehicles || 0} available`}
                            gradient="from-green-500 to-green-600"
                        />
                        <StatsCard
                            icon={<Calendar className="w-6 h-6" />}
                            title="Total Bookings"
                            value={stats?.total_bookings || 0}
                            subtitle={`${stats?.pending_bookings || 0} pending`}
                            gradient="from-purple-500 to-purple-600"
                        />
                        <StatsCard
                            icon={<DollarSign className="w-6 h-6" />}
                            title="Total Revenue"
                            value={`Ksh ${stats?.total_revenue?.toLocaleString() || 0}`}
                            gradient="from-yellow-400 to-yellow-600"
                        />
                        <StatsCard
                            icon={<TrendingUp className="w-6 h-6" />}
                            title="Avg. Booking Value"
                            value={`Ksh ${stats?.total_bookings ? Math.round((stats.total_revenue || 0) / stats.total_bookings).toLocaleString() : 0}`}
                            gradient="from-pink-500 to-pink-600"
                        />
                        <StatsCard
                            icon={<Car className="w-6 h-6" />}
                            title="Rented Vehicles"
                            value={(stats?.total_vehicles || 0) - (stats?.available_vehicles || 0)}
                            gradient="from-orange-500 to-orange-600"
                        />
                    </div>

                    {/* Recent Bookings */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                        {stats?.recent_bookings && stats.recent_bookings.length > 0 ? (
                            <div className="space-y-4">
                                {stats.recent_bookings.map((booking: any) => (
                                    <div key={booking.booking_id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{booking.customer_name}</p>
                                                <p className="text-sm text-gray-400">{booking.vehicle_name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-yellow-400">Ksh {booking.total_amount?.toLocaleString()}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${booking.booking_status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                                                booking.booking_status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {booking.booking_status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No recent bookings found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && <ManageVehicles />}

            {/* Users Tab */}
            {activeTab === 'users' && <ManageUsers />}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && <ManageBookings />}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                        <p className="text-gray-400">Manage your dashboard preferences</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Theme Settings */}
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Appearance</h2>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-400 mb-4">Choose your preferred theme interface</p>

                                <div className="grid grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${theme === 'light'
                                            ? 'bg-white text-black border-white'
                                            : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                                            }`}
                                    >
                                        <Sun className="w-6 h-6" />
                                        <span className="text-sm font-medium">Light</span>
                                    </button>

                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${theme === 'dark'
                                            ? 'bg-white text-black border-white'
                                            : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                                            }`}
                                    >
                                        <Moon className="w-6 h-6" />
                                        <span className="text-sm font-medium">Dark</span>
                                    </button>

                                    <button
                                        onClick={() => setTheme('system')}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${theme === 'system'
                                            ? 'bg-white text-black border-white'
                                            : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5'
                                            }`}
                                    >
                                        <Monitor className="w-6 h-6" />
                                        <span className="text-sm font-medium">System</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* General Settings */}
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">General</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="font-medium text-white">Email Notifications</p>
                                        <p className="text-xs text-gray-400">Receive updates about new bookings</p>
                                    </div>
                                    <div
                                        onClick={toggleEmailNotifications}
                                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${emailNotifications ? 'bg-green-500/20' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${emailNotifications ? 'right-1 bg-green-500' : 'left-1 bg-gray-400'}`} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="font-medium text-white">Maintenance Mode</p>
                                        <p className="text-xs text-gray-400">Disable bookings temporarily</p>
                                    </div>
                                    <div
                                        onClick={toggleMaintenanceMode}
                                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${maintenanceMode ? 'bg-green-500/20' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${maintenanceMode ? 'right-1 bg-green-500' : 'left-1 bg-gray-400'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

const StatsCard = ({ icon, title, value, subtitle, gradient }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
    >
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg`}>
            {icon}
        </div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold mb-1 text-white">{value}</p>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </motion.div>
);

export default AdminDashboard;
