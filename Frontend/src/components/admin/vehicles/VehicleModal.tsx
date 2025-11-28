import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vehicle } from '../../../types';
import { Button, Input } from '../../ui';

interface VehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vehicle: Partial<Vehicle>) => Promise<void>;
    vehicle?: Vehicle | null;
    isLoading?: boolean;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ isOpen, onClose, onSave, vehicle, isLoading }) => {
    const [formData, setFormData] = useState<Partial<Vehicle>>({
        manufacturer: '',
        model: '',
        year: new Date().getFullYear(),
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: 4,
        color: '',
        features: '',
        rental_rate: 0,
        availability: true,
    });

    useEffect(() => {
        if (vehicle) {
            setFormData(vehicle);
        } else {
            setFormData({
                manufacturer: '',
                model: '',
                year: new Date().getFullYear(),
                fuel_type: '',
                engine_capacity: '',
                transmission: '',
                seating_capacity: 4,
                color: '',
                features: '',
                rental_rate: 0,
                availability: true,
            });
        }
    }, [vehicle, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between z-10">
                                <h2 className="text-2xl font-bold text-white">
                                    {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Manufacturer"
                                        value={formData.manufacturer}
                                        onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Model"
                                        value={formData.model}
                                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Year"
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Color"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Fuel Type"
                                        value={formData.fuel_type}
                                        onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Engine Capacity"
                                        value={formData.engine_capacity}
                                        onChange={(e) => setFormData({ ...formData, engine_capacity: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Transmission"
                                        value={formData.transmission}
                                        onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Seating Capacity"
                                        type="number"
                                        value={formData.seating_capacity}
                                        onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                    <Input
                                        label="Rental Rate (Per Day)"
                                        type="number"
                                        value={formData.rental_rate}
                                        onChange={(e) => setFormData({ ...formData, rental_rate: parseFloat(e.target.value) })}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Features (comma separated)</label>
                                    <textarea
                                        value={formData.features}
                                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400 min-h-[100px]"
                                        placeholder="GPS, Bluetooth, Leather Seats, etc."
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <input
                                        type="checkbox"
                                        id="availability"
                                        checked={formData.availability}
                                        onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-600 bg-transparent checked:bg-yellow-400 text-black focus:ring-yellow-400"
                                    />
                                    <label htmlFor="availability" className="text-white font-medium cursor-pointer select-none">
                                        Available for Rent
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                    <Button
                                        type="button"
                                        onClick={onClose}
                                        className="bg-transparent border border-white/20 text-white hover:bg-white/10"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        isLoading={isLoading}
                                        className="bg-yellow-400 text-black hover:bg-yellow-300"
                                        rightIcon={<Save className="w-4 h-4" />}
                                    >
                                        {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VehicleModal;
