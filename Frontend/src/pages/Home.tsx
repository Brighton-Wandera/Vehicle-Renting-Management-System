import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';
import heroImage from '../assets/hero.png';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Premium Luxury Rental Vehicle"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 container-custom flex flex-col items-center justify-center h-full pt-32 pb-40">
                    <motion.div
                        className="text-center text-white max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Premium Vehicle Rentals,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                                Tailored for You
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Experience unparalleled freedom with our curated fleet of luxury vehicles.
                            Whether for business or pleasure, we provide exceptional service and flexible rental solutions.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Link to="/vehicles">
                                <button className="btn-primary px-8 py-3.5 text-base font-semibold rounded-full bg-white text-black hover:bg-gray-100 border-none shadow-xl">
                                    Browse Our Fleet
                                </button>
                            </Link>
                            <Link to="/vehicles">
                                <button className="px-8 py-3.5 text-base font-semibold text-white border-2 border-white/40 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                                    View Special Offers
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Booking Form - Floating */}
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

            {/* Features Section */}
            <section className="py-32 bg-background">
                <div className="container-custom">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Why Choose VeloRent
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                            Experience the difference with our premium rental services designed for discerning travelers
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Car className="w-10 h-10" />,
                                title: 'Diverse Fleet',
                                description: 'From luxury sedans to spacious SUVs - find the perfect vehicle for any occasion',
                            },
                            {
                                icon: <Shield className="w-10 h-10" />,
                                title: 'Comprehensive Coverage',
                                description: 'Every rental includes full insurance coverage for complete peace of mind',
                            },
                            {
                                icon: <Clock className="w-10 h-10" />,
                                title: '24/7 Customer Service',
                                description: 'Our dedicated support team is available anytime, anywhere',
                            },
                            {
                                icon: <Award className="w-10 h-10" />,
                                title: 'Flexible Terms',
                                description: 'Hourly, daily, or long-term rentals with transparent pricing',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group p-8 rounded-3xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-all duration-500 hover:-translate-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="mb-6 p-4 rounded-2xl bg-background w-fit group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-foreground text-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
                <div className="container-custom text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                            Ready to Hit the Road?
                        </h2>
                        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-400 font-light">
                            Join thousands of satisfied customers who trust VeloRent for their vehicle rental needs
                        </p>
                        <Link to="/auth/register">
                            <button className="px-12 py-5 bg-background text-foreground text-lg font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-2xl">
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
