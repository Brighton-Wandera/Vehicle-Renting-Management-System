import React, { useState, useEffect } from 'react';
// import { Plus, Search, Edit, Trash2, Car, Filter, MoreVertical } from 'lucide-react';
import { Plus, Search, Edit, Trash2, Car } from 'lucide-react';
import { adminApi } from '../../../api/admin.api';
import { getAllVehicles  } from '../../../api/vehicles.api';
import { Vehicle } from '../../../types';
import toast from 'react-hot-toast';
import VehicleModal from './VehicleModal';

const ManageVehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const data = await getAllVehicles ();
            setVehicles(data);
        } catch (error) {
            toast.error('Failed to load vehicles');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (vehicleData: Partial<Vehicle>) => {
        try {
            setModalLoading(true);
            if (editingVehicle) {
                await adminApi.updateVehicle(editingVehicle.vehicle_id, vehicleData);
                toast.success('Vehicle updated successfully');
            } else {
                await adminApi.createVehicle(vehicleData);
                toast.success('Vehicle created successfully');
            }
            setIsModalOpen(false);
            fetchVehicles();
        } catch (error) {
            toast.error(editingVehicle ? 'Failed to update vehicle' : 'Failed to create vehicle');
        } finally {
            setModalLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            await adminApi.deleteVehicle(id);
            toast.success('Vehicle deleted successfully');
            fetchVehicles();
        } catch (error) {
            toast.error('Failed to delete vehicle');
        }
    };

    const filteredVehicles = vehicles.filter(v =>
        v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center py-12 text-gray-400">Loading vehicles...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Fleet Management</h1>
                    <p className="text-gray-400">Manage your vehicle inventory</p>
                </div>
                <button
                    onClick={() => {
                        setEditingVehicle(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Vehicle
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                </div>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                    <div
                        key={vehicle.vehicle_id}
                        className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300"
                    >
                        <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
                            <Car className="w-16 h-16 text-gray-600" />
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => {
                                        setEditingVehicle(vehicle);
                                        setIsModalOpen(true);
                                    }}
                                    className="p-2 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 text-white transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(vehicle.vehicle_id)}
                                    className="p-2 bg-red-500/10 backdrop-blur-md rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${vehicle.availability
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {vehicle.availability ? 'Available' : 'Rented'}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{vehicle.manufacturer} {vehicle.model}</h3>
                                    <p className="text-gray-400 text-sm">{vehicle.year} • {vehicle.transmission}</p>
                                </div>
                                <p className="text-yellow-400 font-bold">
                                    ${vehicle.rental_rate}<span className="text-xs text-gray-500">/day</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                    {vehicle.fuel_type}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                    {vehicle.seating_capacity} Seats
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredVehicles.length === 0 && (
                <div className="text-center py-12">
                    <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No vehicles found matching your search.</p>
                </div>
            )}

            <VehicleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                vehicle={editingVehicle}
                isLoading={modalLoading}
            />
        </div>
    );
};

export default ManageVehicles;
