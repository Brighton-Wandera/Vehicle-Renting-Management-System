import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Award, ArrowRight, Fuel, Settings, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';
import heroImage from '../assets/hero.png';

const Home: React.FC = () => {
    // Mock Data for Home Page Showcase
    const featuredCars = [
        {
            name: "Mercedes-Benz S-Class",
            type: "Luxury Sedan",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
            price: 250,
            specs: { fuel: "Hybrid", trans: "Auto", seats: 5 }
        },
        {
            name: "Range Rover Sport",
            type: "Premium SUV",
            image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800",
            price: 320,
            specs: { fuel: "Diesel", trans: "Auto", seats: 7 }
        },
        {
            name: "Porsche 911 Carrera",
            type: "Sports",
            image: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800",
            price: 450,
            specs: { fuel: "Petrol", trans: "Auto", seats: 2 }
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            
            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroImage} alt="Luxury Car" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a]" />
                </div>

                <div className="relative z-10 container-custom flex flex-col items-center justify-center h-full pt-32 pb-40">
                    <motion.div
                        className="text-center text-white max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold mb-8 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Premium Rentals,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-500">
                                Tailored for You
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 font-light tracking-wide max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Experience unparalleled freedom with our curated fleet of luxury vehicles.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Link to="/vehicles">
                                <button className="px-8 py-3.5 text-base font-bold rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-lg">
                                    Browse Our Fleet
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-3.5 text-base font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 backdrop-blur-sm transition-colors">
                                    Contact Support
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="w-full px-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <BookingForm />
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="py-32 relative bg-[#0a0a0a] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="container-custom relative z-10">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">VeloRent</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            We don't just rent cars; we curate driving experiences designed for the uncompromising traveler.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Car className="w-8 h-8 text-black" />, title: 'Pristine Fleet', desc: 'Meticulously maintained vehicles.' },
                            { icon: <Shield className="w-8 h-8 text-black" />, title: 'Full Protection', desc: 'Comprehensive insurance coverage.' },
                            { icon: <Clock className="w-8 h-8 text-black" />, title: '24/7 Concierge', desc: 'Support whenever you need it.' },
                            { icon: <Award className="w-8 h-8 text-black" />, title: 'Flexible Terms', desc: 'Tailored to fit your schedule.' },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group relative p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FEATURED COLLECTION (NEW) --- */}
            <section className="py-24 bg-black/50 border-t border-white/5 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-12"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">The Collection</h2>
                            <p className="text-gray-400">Hand-picked for excellence</p>
                        </div>
                        <Link to="/vehicles" className="hidden md:flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
                            View All <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={car.image} 
                                        alt={car.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">{car.type}</p>
                                        <h3 className="text-xl font-bold text-white">{car.name}</h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex gap-4">
                                            <div className="flex items-center text-xs text-gray-400" title="Fuel">
                                                <Fuel className="w-3 h-3 mr-1" /> {car.specs.fuel}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-400" title="Transmission">
                                                <Settings className="w-3 h-3 mr-1" /> {car.specs.trans}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-400" title="Seats">
                                                <Users className="w-3 h-3 mr-1" /> {car.specs.seats}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                        <div>
                                            <span className="text-2xl font-bold text-white">${car.price}</span>
                                            <span className="text-sm text-gray-500">/day</span>
                                        </div>
                                        <Link to="/vehicles">
                                            <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-yellow-400 transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center md:hidden">
                        <Link to="/vehicles" className="inline-flex items-center text-yellow-400 hover:text-yellow-300">
                            View Full Fleet <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- BOTTOM CTA (Ready to Hit the Road) --- */}
            <section className="py-32 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                
                <div className="container-custom text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 tracking-tight">
                            Ready to Hit the Road?
                        </h2>
                        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-400 font-light">
                            Join thousands of satisfied customers who trust VeloRent for their vehicle rental needs.
                        </p>
                        <Link to="/auth/register">
                            <button className="px-12 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl">
                                Create Your Account
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;