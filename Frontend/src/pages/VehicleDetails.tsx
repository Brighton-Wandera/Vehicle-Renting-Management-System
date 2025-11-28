import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Users, Gauge, Fuel, Settings, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVehicleById } from '../api/vehicles.api';
import { Vehicle } from '../types';
import { Navbar, Footer } from '../components/layout';
import { Button } from '../components/ui';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const VehicleDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchVehicle(parseInt(id));
        }
    }, [id]);

    const fetchVehicle = async (vehicleId: number) => {
        try {
            setLoading(true);
            const data = await getVehicleById(vehicleId);
            setVehicle(data);
        } catch (error) {
            toast.error('Failed to load vehicle details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (!isAuthenticated) {
            toast.error('Please login to book a vehicle');
            navigate('/auth/login', { state: { from: `/vehicles/${id}/book` } });
            return;
        }
        navigate(`/vehicles/${id}/book`);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-16 flex items-center justify-center bg-[#0a0a0a]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4" />
                        <p className="text-gray-400">Loading vehicle details...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!vehicle) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-16 flex items-center justify-center bg-[#0a0a0a]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Vehicle Not Found
                        </h2>
                        <p className="text-gray-400 mb-6">
                            The vehicle you're looking for doesn't exist.
                        </p>
                        <Link to="/vehicles">
                            <Button>Back to Vehicles</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const features = typeof vehicle.features === 'string'
        ? vehicle.features.split(',').map(f => f.trim())
        : vehicle.features || [];

    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen pt-16 bg-[#0a0a0a] text-white relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
                </div>

                {/* Content with higher z-index */}
                <div className="relative z-10">
                    {/* Breadcrumb */}
                    <div className="container-custom py-6">
                        <button
                            onClick={() => navigate('/vehicles')}
                            className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span>Back to Vehicles</span>
                        </button>
                    </div>

                    {/* Vehicle Details */}
                    <div className="container-custom pb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Images & Specs */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Main Image */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-black/40 to-black/60 flex items-center justify-center"
                                >
                                    <div className="text-center text-gray-400">
                                        <Gauge className="w-24 h-24 mx-auto mb-4 opacity-50" />
                                        <p>Image Coming Soon</p>
                                    </div>
                                </motion.div>

                                {/* Specifications */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl"
                                >
                                    <h2 className="text-2xl font-heading font-bold mb-6 text-white">
                                        Specifications
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                <Users className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Seating</p>
                                                <p className="font-semibold text-white">
                                                    {vehicle.seating_capacity} Seats
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                <Settings className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Transmission</p>
                                                <p className="font-semibold text-white">
                                                    {vehicle.transmission}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                <Fuel className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Fuel Type</p>
                                                <p className="font-semibold text-white">
                                                    {vehicle.fuel_type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                <Gauge className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Engine</p>
                                                <p className="font-semibold text-white">
                                                    {vehicle.engine_capacity}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                <Calendar className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Year</p>
                                                <p className="font-semibold text-white">
                                                    {vehicle.year}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                                                <div className="w-6 h-6 rounded-full border-4 border-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Color</p>
                                                <p className="font-semibold text-white capitalize">
                                                    {vehicle.color}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Features */}
                                {features.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl"
                                    >
                                        <h2 className="text-2xl font-heading font-bold mb-4 text-white">
                                            Features
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-black/40 border border-white/10 text-yellow-400 rounded-lg"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>{feature}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Right Column - Booking Card */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-xl sticky top-24"
                                >
                                    <div className="mb-6">
                                        <h1 className="text-3xl font-heading font-bold text-white mb-2">
                                            {vehicle.manufacturer} {vehicle.model}
                                        </h1>
                                        <p className="text-gray-400">
                                            {vehicle.year} • {vehicle.color}
                                        </p>
                                    </div>

                                    {/* Availability */}
                                    <div className="mb-6">
                                        {vehicle.availability ? (
                                            <div className="flex items-center space-x-2 text-green-400">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="font-semibold">Available for Rent</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2 text-red-400">
                                                <span className="font-semibold">Currently Rented</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pricing */}
                                    <div className="border-t border-white/10 pt-6 mb-6">
                                        <div className="mb-4">
                                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                                                ${vehicle.rental_rate}
                                            </span>
                                            <span className="text-gray-400 ml-2">/ day</span>
                                        </div>
                                        <p className="text-sm text-gray-400">
                                            * Price may vary based on rental duration
                                        </p>
                                    </div>

                                    {/* Book Button */}
                                    <Button
                                        size="lg"
                                        className="w-full"
                                        onClick={handleBookNow}
                                        disabled={!vehicle.availability}
                                    >
                                        {vehicle.availability ? 'Book Now' : 'Not Available'}
                                    </Button>

                                    {!isAuthenticated && (
                                        <p className="text-xs text-center text-gray-400 mt-4">
                                            You need to login to book this vehicle
                                        </p>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <Footer /> */}
        </>
    );
};

export default VehicleDetails;
