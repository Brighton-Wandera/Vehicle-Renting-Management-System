import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Gauge, Fuel, Settings, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Vehicle } from '../../types';

interface VehicleCardProps {
    vehicle: Vehicle;
    index?: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index = 0 }) => {
    // Parse features if it's a string
    const features = typeof vehicle.features === 'string'
        ? vehicle.features.split(',').map(f => f.trim())
        : vehicle.features || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Vehicle Image Area */}
            <div className="relative h-48 overflow-hidden bg-gray-900">
                {/* 
                   NOTE: If you have images in assets, you would import them or 
                   map them here. For now, we use the URL or a dark placeholder.
                */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-black/50">
                   <Gauge className="w-16 h-16 opacity-20" />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                    {vehicle.availability ? (
                        <div className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
                            <CheckCircle className="w-3 h-3" />
                            <span>Available</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-md">
                            <XCircle className="w-3 h-3" />
                            <span>Rented</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                        {vehicle.manufacturer} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {vehicle.year} • {vehicle.color}
                    </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Users className="w-4 h-4 text-primary-400" />
                        <span>{vehicle.seating_capacity} Seats</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Settings className="w-4 h-4 text-primary-400" />
                        <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Fuel className="w-4 h-4 text-primary-400" />
                        <span>{vehicle.fuel_type}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Gauge className="w-4 h-4 text-primary-400" />
                        <span>{vehicle.engine_capacity}</span>
                    </div>
                </div>

                {/* Features Tags (Show max 3) */}
                {features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {features.slice(0, 3).map((feature, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer (Price & Action) - Pushed to bottom */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-white">
                            ${vehicle.rental_rate}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">/day</span>
                    </div>
                    <Link to={`/vehicles/${vehicle.vehicle_id}`}>
                        <button className="px-5 py-2 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all">
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default VehicleCard;