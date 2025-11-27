import React from 'react';
import { Star, Quote,} from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';

// Mock Data
const reviews = [
    {
        id: 1,
        name: "James Mwangi",
        role: "Business Traveler",
        rating: 5,
        date: "2 days ago",
        text: "The Mercedes C-Class was in pristine condition. The pickup process at JKIA was seamless, and the staff was incredibly professional. VeloRent defines luxury.",
        vehicle: "Mercedes-Benz C-Class"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Tourist",
        rating: 5,
        date: "1 week ago",
        text: "We rented the Land Rover Defender for a safari trip. It handled the terrain perfectly. Best rental experience I've had in Kenya!",
        vehicle: "Land Rover Defender"
    },
    {
        id: 3,
        name: "David Ochieng",
        role: "Regular Client",
        rating: 4,
        date: "2 weeks ago",
        text: "Great service as always. The car was clean and fueled up. Deducted one star because I had to wait 10 mins for the paperwork, but otherwise perfect.",
        vehicle: "Toyota Corolla"
    },
    {
        id: 4,
        name: "Emily Clark",
        role: "Business Executive",
        rating: 5,
        date: "3 weeks ago",
        text: "I needed a reliable car for a week of meetings in Nairobi. The driver option was a lifesaver. Highly recommended for corporate needs.",
        vehicle: "Mercedes-Benz E-Class"
    },
    {
        id: 5,
        name: "Michael Mutua",
        role: "Wedding Planner",
        rating: 5,
        date: "1 month ago",
        text: "Booked a fleet for a wedding party. Every single car was spotless and arrived on time. You guys made the day special.",
        vehicle: "Multiple Vehicles"
    },
    {
        id: 6,
        name: "Anita Patel",
        role: "Weekend Trip",
        rating: 5,
        date: "1 month ago",
        text: "Smooth booking process via the app. The transparency in pricing is refreshing compared to other rental companies.",
        vehicle: "Toyota Rav4"
    }
];

const Reviews: React.FC = () => {
    return (
        <div className="relative min-h-screen pt-24 pb-12">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header Stats */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                        Client Testimonials
                    </h1>
                    
                    <div className="inline-flex items-center gap-6 backdrop-blur-md bg-white/10 border border-white/20 px-8 py-4 rounded-full">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">4.9</div>
                            <div className="text-xs text-gray-300 uppercase tracking-wide">Average Rating</div>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">12k+</div>
                            <div className="text-xs text-gray-300 uppercase tracking-wide">Happy Clients</div>
                        </div>
                    </div>
                </motion.div>

                {/* Reviews Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-2xl hover:bg-black/60 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{review.name}</h3>
                                    <p className="text-xs text-gray-400">{review.role}</p>
                                </div>
                                <Quote className="w-8 h-8 text-white/10 group-hover:text-white/30 transition-colors" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`} 
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                "{review.text}"
                            </p>

                            {/* Footer */}
                            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                <span className="text-xs font-medium text-primary-200 bg-primary-900/30 px-2 py-1 rounded">
                                    {review.vehicle}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {review.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all font-semibold backdrop-blur-sm">
                        Load More Reviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;