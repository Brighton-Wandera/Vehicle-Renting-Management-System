import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';

const BookingForm: React.FC = () => {
    const [bookingType, setBookingType] = useState<'oneway' | 'hourly'>('oneway');
    const [departureLocation, setDepartureLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');

    const handleBookNow = () => {
        console.log('Booking:', {
            bookingType,
            departureLocation,
            destinationLocation,
            pickupDate,
            pickupTime
        });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="glass-dark backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl border border-white/10">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setBookingType('oneway')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${bookingType === 'oneway'
                            ? 'bg-white text-black shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        One Way
                    </button>
                    <button
                        onClick={() => setBookingType('hourly')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${bookingType === 'hourly'
                            ? 'bg-white text-black shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        Hourly
                    </button>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                    {/* Departure */}
                    <div className="lg:col-span-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors group">
                        <label className="block text-xs font-medium text-white/60 mb-1 ml-1">Departure</label>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-white/80 group-focus-within:text-white" />
                            <input
                                type="text"
                                value={departureLocation}
                                onChange={(e) => setDepartureLocation(e.target.value)}
                                placeholder="From where?"
                                className="bg-transparent border-none text-white placeholder:text-white/40 text-sm w-full focus:ring-0 p-0"
                            />
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="lg:col-span-3 bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors group">
                        <label className="block text-xs font-medium text-white/60 mb-1 ml-1">Destination</label>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-white/80 group-focus-within:text-white" />
                            <input
                                type="text"
                                value={destinationLocation}
                                onChange={(e) => setDestinationLocation(e.target.value)}
                                placeholder="To where?"
                                className="bg-transparent border-none text-white placeholder:text-white/40 text-sm w-full focus:ring-0 p-0"
                            />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors group">
                            <label className="block text-xs font-medium text-white/60 mb-1 ml-1">Pickup</label>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-white/80 group-focus-within:text-white" />
                                <input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    className="bg-transparent border-none text-white placeholder:text-white/40 text-sm w-full focus:ring-0 p-0 [color-scheme:dark]"
                                />
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-colors group">
                            <label className="block text-xs font-medium text-white/60 mb-1 ml-1">Time</label>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-white/80 group-focus-within:text-white" />
                                <input
                                    type="time"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    className="bg-transparent border-none text-white placeholder:text-white/40 text-sm w-full focus:ring-0 p-0 [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="lg:col-span-2">
                        <button
                            onClick={handleBookNow}
                            className="w-full h-[72px] bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-white/10"
                        >
                            <span>Book Now</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
