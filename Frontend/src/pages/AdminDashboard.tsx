import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { dashboardApi, adminApi } from '../api/admin.api';
import { Users, Car, DollarSign, Calendar, TrendingUp, Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

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
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [statsData, vehiclesData, usersData] = await Promise.all([
                dashboardApi.getAdminStats(),
                adminApi.getAllUsers(),
                adminApi.getAllUsers(),
            ]);
            setStats(statsData);
            setUsers(usersData);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-white text-xl">Loading Admin Dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Admin <span className="text-yellow-400">Dashboard</span>
                        </h1>
                        <p className="text-gray-400">Manage your vehicle rental business</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex space-x-4 border-b border-white/10">
                        <TabButton
                            active={activeTab === 'overview'}
                            onClick={() => setActiveTab('overview')}
                            label="Overview"
                        />
                        <TabButton
                            active={activeTab === 'vehicles'}
                            onClick={() => setActiveTab('vehicles')}
                            label="Vehicles"
                        />
                        <TabButton
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                            label="Users"
                        />
                        <TabButton
                            active={activeTab === 'bookings'}
                            onClick={() => setActiveTab('bookings')}
                            label="Bookings"
                        />
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Recent Bookings */}
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
                            {stats?.recent_bookings && stats.recent_bookings.length > 0 ? (
                                <div className="space-y-3">
                                    {stats.recent_bookings.map((booking: any) => (
                                        <div key={booking.booking_id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                                            <div>
                                                <p className="font-semibold">{booking.customer_name}</p>
                                                <p className="text-sm text-gray-400">{booking.vehicle_name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-yellow-400">Ksh {booking.total_amount?.toLocaleString()}</p>
                                                <p className={`text-sm ${booking.booking_status === 'Confirmed' ? 'text-green-400' :
                                                        booking.booking_status === 'Pending' ? 'text-yellow-400' : 'text-gray-400'
                                                    }`}>{booking.booking_status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">No recent bookings</p>
                            )}
                        </div>

                        {/* Revenue Chart (Placeholder) */}
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
                            <div className="h-64 flex items-center justify-center text-gray-400">
                                <p>Revenue chart - {stats?.revenue_by_month?.length || 0} months data available</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'vehicles' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Vehicle Management</h2>
                            <button
                                onClick={() => setShowVehicleModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Add Vehicle
                            </button>
                        </div>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-gray-400">Vehicle management interface - Add, edit, and delete vehicles</p>
                            <div className="mt-4 text-center py-12">
                                <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">Vehicle CRUD interface coming soon...</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">User Management</h2>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            {users && users.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4">Name</th>
                                                <th className="text-left py-3 px-4">Email</th>
                                                <th className="text-left py-3 px-4">Role</th>
                                                <th className="text-left py-3 px-4">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user: any) => (
                                                <tr key={user.user_id} className="border-b border-white/10 hover:bg-white/5">
                                                    <td className="py-3 px-4">{user.first_name} {user.last_name}</td>
                                                    <td className="py-3 px-4 text-gray-400">{user.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                                            }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-400">
                                                        {new Date(user.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-400">No users found</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <p className="text-gray-400">Booking management interface</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatsCard = ({ icon, title, value, subtitle, gradient }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6"
    >
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
            {icon}
        </div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold mb-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </motion.div>
);

const TabButton = ({ active, onClick, label }: any) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-semibold transition-colors ${active ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'
            }`}
    >
        {label}
    </button>
);

export default AdminDashboard;
