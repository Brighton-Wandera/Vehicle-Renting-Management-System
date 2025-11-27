import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllVehicles } from '../api/vehicles.api';
import { Vehicle } from '../types';
import { VehicleCard } from '../components/vehicles';
import toast from 'react-hot-toast';
import heroImage from '../assets/hero.png'; // Import the background

const Vehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    
    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [transmissionFilter, setTransmissionFilter] = useState<string>('all');
    const [fuelFilter, setFuelFilter] = useState<string>('all');
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        filterVehicles();
    }, [searchQuery, transmissionFilter, fuelFilter, availabilityFilter, vehicles]);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const data = await getAllVehicles();
            setVehicles(data);
            setFilteredVehicles(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load vehicles');
            // If backend fails, we could load dummy data here for UI testing if you want
        } finally {
            setLoading(false);
        }
    };

    const filterVehicles = () => {
        let filtered = [...vehicles];

        if (searchQuery) {
            filtered = filtered.filter(vehicle =>
                `${vehicle.manufacturer} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vehicle.color.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (transmissionFilter !== 'all') {
            filtered = filtered.filter(vehicle =>
                vehicle.transmission.toLowerCase() === transmissionFilter.toLowerCase()
            );
        }

        if (fuelFilter !== 'all') {
            filtered = filtered.filter(vehicle =>
                vehicle.fuel_type.toLowerCase() === fuelFilter.toLowerCase()
            );
        }

        if (availabilityFilter === 'available') {
            filtered = filtered.filter(vehicle => vehicle.availability);
        } else if (availabilityFilter === 'rented') {
            filtered = filtered.filter(vehicle => !vehicle.availability);
        }

        setFilteredVehicles(filtered);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setTransmissionFilter('all');
        setFuelFilter('all');
        setAvailabilityFilter('all');
    };

    return (
        <div className="relative min-h-screen pt-24 pb-12">
            {/* Global Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="container-custom relative z-10">
                
                {/* Header & Search */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
                >
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white mb-2">Our Premium Fleet</h1>
                        <p className="text-gray-400">Select from our exclusive collection of luxury vehicles</p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search make, model..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
                            />
                        </div>
                        <button 
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar (Desktop) */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-2xl sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filters
                                </h3>
                                <button 
                                    onClick={clearFilters}
                                    className="text-xs text-primary-300 hover:text-primary-200 font-medium"
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Filter Groups */}
                                <FilterGroup 
                                    label="Transmission"
                                    value={transmissionFilter}
                                    onChange={setTransmissionFilter}
                                    options={[
                                        { value: 'all', label: 'All Types' },
                                        { value: 'automatic', label: 'Automatic' },
                                        { value: 'manual', label: 'Manual' }
                                    ]}
                                />
                                <FilterGroup 
                                    label="Fuel Type"
                                    value={fuelFilter}
                                    onChange={setFuelFilter}
                                    options={[
                                        { value: 'all', label: 'All Fuels' },
                                        { value: 'petrol', label: 'Petrol' },
                                        { value: 'diesel', label: 'Diesel' },
                                        { value: 'hybrid', label: 'Hybrid' },
                                        { value: 'electric', label: 'Electric' }
                                    ]}
                                />
                                <FilterGroup 
                                    label="Availability"
                                    value={availabilityFilter}
                                    onChange={setAvailabilityFilter}
                                    options={[
                                        { value: 'all', label: 'All Vehicles' },
                                        { value: 'available', label: 'Available Now' },
                                        { value: 'rented', label: 'Rented' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filters Drawer */}
                    <AnimatePresence>
                        {isMobileFiltersOpen && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="lg:hidden overflow-hidden bg-white/5 rounded-xl border border-white/10 mb-6"
                            >
                                <div className="p-4 space-y-4">
                                    <FilterGroup label="Transmission" value={transmissionFilter} onChange={setTransmissionFilter} options={[{value:'all', label:'All'}, {value:'automatic', label:'Automatic'}, {value:'manual', label:'Manual'}]} />
                                    {/* Add other mobile filters here similarly */}
                                    <button onClick={clearFilters} className="w-full py-2 text-sm text-center text-primary-300">Reset Filters</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Vehicles Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
                                ))}
                            </div>
                        ) : filteredVehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredVehicles.map((vehicle, index) => (
                                    <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No vehicles found</h3>
                                <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                                <button 
                                    onClick={clearFilters}
                                    className="mt-6 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Dark styled Select inputs
const FilterGroup = ({ label, value, onChange, options }: any) => (
    <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {label}
        </label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-white/30 cursor-pointer"
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                        {opt.label}
                    </option>
                ))}
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            </div>
        </div>
    </div>
);

export default Vehicles;