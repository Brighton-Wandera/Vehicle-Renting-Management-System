import React, { useState, useEffect } from 'react';
import { Search, Calendar, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { adminApi } from '../../../api/admin.api';
import { Booking } from '../../../types';
import toast from 'react-hot-toast';

const ManageBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getAllBookings();
            setBookings(data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            await adminApi.updateBookingStatus(id, newStatus);
            toast.success(`Booking status updated to ${newStatus}`);
            fetchBookings();
        } catch (error) {
            toast.error('Failed to update booking status');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'text-green-400 bg-green-500/20 border-green-500/20';
            case 'Pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/20';
            case 'Cancelled': return 'text-red-400 bg-red-500/20 border-red-500/20';
            case 'Completed': return 'text-blue-400 bg-blue-500/20 border-blue-500/20';
            default: return 'text-gray-400 bg-gray-500/20 border-gray-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Confirmed': return <CheckCircle className="w-4 h-4" />;
            case 'Pending': return <Clock className="w-4 h-4" />;
            case 'Cancelled': return <XCircle className="w-4 h-4" />;
            case 'Completed': return <CheckCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.vehicle?.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.booking_id.toString().includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || booking.booking_status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return <div className="text-center py-12 text-gray-400">Loading bookings...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Booking Management</h1>
                <p className="text-gray-400">Track and manage vehicle reservations</p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by vehicle or booking ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === status
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.map((booking) => (
                    <div
                        key={booking.booking_id}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10">
                                    <Calendar className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-white">
                                            Booking #{booking.booking_id}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${getStatusColor(booking.booking_status || 'Pending')}`}>
                                            {getStatusIcon(booking.booking_status || 'Pending')}
                                            {booking.booking_status || 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">
                                        {booking.vehicle?.manufacturer} {booking.vehicle?.model} ({booking.vehicle?.year})
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span>From: {new Date(booking.booking_date).toLocaleDateString()}</span>
                                        <span>To: {new Date(booking.return_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">Total Amount</p>
                                    <p className="text-2xl font-bold text-yellow-400">
                                        ${booking.total_amount}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    {booking.booking_status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.booking_id, 'Confirmed')}
                                                className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(booking.booking_id, 'Cancelled')}
                                                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {booking.booking_status === 'Confirmed' && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking.booking_id, 'Completed')}
                                            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                                        >
                                            Mark Completed
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredBookings.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No bookings found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageBookings;
