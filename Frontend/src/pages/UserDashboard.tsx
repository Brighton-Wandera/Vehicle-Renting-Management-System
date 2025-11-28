import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { dashboardApi } from '../api/admin.api';
import { motion } from 'framer-motion';
import { Calendar, Car, DollarSign, Clock, TrendingUp, Award } from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardStats {
    total_bookings: number;
    pending_bookings: number;
    active_bookings: number;
    completed_bookings: number;
    total_spent: number;
    active_bookings: any[];
    booking_history: any[];
}

const UserDashboard = () => {
    const { user } = useAuthStore();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await dashboardApi.getUserStats();
            setStats(data);
        } catch (error: any) {
            toast.error('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome back, <span className="text-yellow-400">{user?.firstName}</span>!
                    </h1>
                    <p className="text-gray-400">Here's what's happening with your rentals</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        icon={<Car className="w-6 h-6" />}
                        title="Total Bookings"
                        value={stats?.total_bookings || 0}
                        gradient="from-blue-500 to-blue-600"
                    />
                    <StatsCard
                        icon={<Clock className="w-6 h-6" />}
                        title="Active Rentals"
                        value={stats?.active_bookings || 0}
                        gradient="from-green-500 to-green-600"
                    />
                    <StatsCard
                        icon={<DollarSign className="w-6 h-6" />}
                        title="Total Spent"
                        value={`Ksh ${stats?.total_spent?.toLocaleString() || 0}`}
                        gradient="from-yellow-400 to-yellow-600"
                    />
                    <StatsCard
                        icon={<Award className="w-6 h-6" />}
                        title="Completed"
                        value={stats?.completed_bookings || 0}
                        gradient="from-purple-500 to-purple-600"
                    />
                </div>

                {/* Active Bookings */}
                {stats?.active_bookings && stats.active_bookings.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Active Rentals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats.active_bookings.map((booking: any) => (
                                <BookingCard key={booking.booking_id} booking={booking} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Booking History */}
                {stats?.booking_history && stats.booking_history.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Recent History</h2>
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="space-y-4">
                                {stats.booking_history.map((booking: any) => (
                                    <HistoryItem key={booking.booking_id} booking={booking} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {stats?.total_bookings === 0 && (
                    <div className="text-center py-12">
                        <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                        <p className="text-gray-400 mb-6">Start exploring our fleet to make your first rental</p>
                        <a
                            href="/vehicles"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                        >
                            Browse Vehicles
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatsCard = ({ icon, title, value, gradient }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6"
    >
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
            {icon}
        </div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
    </motion.div>
);

const BookingCard = ({ booking }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
    >
        <div className="flex gap-4">
            <img
                src={booking.image_url || 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=300'}
                alt={booking.model}
                className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                    {booking.manufacturer} {booking.model}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                    {new Date(booking.booking_date).toLocaleDateString()} - {new Date(booking.return_date).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-semibold">Ksh {booking.total_amount?.toLocaleString()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.booking_status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        {booking.booking_status}
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
);

const HistoryItem = ({ booking }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
        <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${booking.booking_status === 'Completed' ? 'bg-green-500' : 'bg-gray-500'
                }`} />
            <div>
                <p className="font-semibold">{booking.manufacturer} {booking.model}</p>
                <p className="text-sm text-gray-400">
                    {new Date(booking.booking_date).toLocaleDateString()}
                </p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-semibold">Ksh {booking.total_amount?.toLocaleString()}</p>
            <p className="text-sm text-gray-400">{booking.booking_status}</p>
        </div>
    </div>
);

export default UserDashboard;
