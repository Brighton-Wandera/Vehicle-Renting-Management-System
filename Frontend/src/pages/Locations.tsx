import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui';
import heroImage from '../assets/hero.png';

const Locations: React.FC = () => {
    const locations = [
        {
            name: 'Nairobi HQ - CBD',
            address: '123 Kenyatta Avenue, Nairobi CBD',
            phone: '+254 712 345 678',
            email: 'cbd@velorent.com',
            hours: 'Mon-Sun: 24 Hours',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
        },
        {
            name: 'Westlands Hub',
            address: '456 Waiyaki Way, Westlands',
            phone: '+254 713 456 789',
            email: 'westlands@velorent.com',
            hours: 'Mon-Sat: 7:00 AM - 9:00 PM',
            image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800'
        },
        {
            name: 'Mombasa Road Branch',
            address: '789 Mombasa Road, Next to Nextgen',
            phone: '+254 714 567 890',
            email: 'mombasa@velorent.com',
            hours: 'Mon-Sun: 6:00 AM - 10:00 PM',
            image: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&q=80&w=800'
        },
    ];

    return (
        <div className="relative min-h-screen pt-24 pb-12">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 mt-20"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Find Us Near You
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        With multiple strategic locations across the city, your premium ride is never far away. Visit us for a seamless pickup experience.
                    </p>
                </motion.div>

                {/* Locations Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {locations.map((location, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-white/30 transition-all duration-300"
                        >
                            {/* Card Image */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-xl font-heading font-bold text-white">
                                        {location.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <MapPin className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Address</p>
                                        <p className="text-white text-sm">{location.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Phone className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                                        <a href={`tel:${location.phone}`} className="text-white text-sm hover:text-primary-300 transition-colors">
                                            {location.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Mail className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Email</p>
                                        <a href={`mailto:${location.email}`} className="text-white text-sm hover:text-primary-300 transition-colors">
                                            {location.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Clock className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Opening Hours</p>
                                        <p className="text-white text-sm">{location.hours}</p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-white/10">
                                    <Button
                                        variant="secondary"
                                        fullWidth
                                        className="bg-white/10 text-white hover:bg-white hover:text-black border-none"
                                        leftIcon={<Navigation className="w-4 h-4" />}
                                    >
                                        Get Directions
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Locations;