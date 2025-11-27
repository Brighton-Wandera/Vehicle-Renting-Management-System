import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send,} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input } from '../components/ui';
import toast from 'react-hot-toast';
import heroImage from '../assets/hero.png';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        toast.success('Message sent! We will contact you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <div className="relative min-h-screen pt-24 pb-12">
            {/* Background Image (Global Theme) */}
            <div className="fixed inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            <div className="container-custom relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        Have a question about our fleet or need a custom quote? Our premium support team is here to help 24/7.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Contact Info Cards */}
                    <div className="space-y-6">
                        {/* Info Card 1 */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-2xl shadow-lg flex items-start gap-4"
                        >
                            <div className="p-3 bg-white/10 rounded-full text-primary-400">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Call Us</h3>
                                <p className="text-gray-400 mb-2">Mon-Fri from 8am to 6pm</p>
                                <a href="tel:+254123456789" className="text-white hover:text-primary-300 transition-colors font-semibold">
                                    +254 712 345 678
                                </a>
                            </div>
                        </motion.div>

                        {/* Info Card 2 */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-2xl shadow-lg flex items-start gap-4"
                        >
                            <div className="p-3 bg-white/10 rounded-full text-primary-400">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Email Us</h3>
                                <p className="text-gray-400 mb-2">Our friendly team is here to help</p>
                                <a href="mailto:info@velorent.com" className="text-white hover:text-primary-300 transition-colors font-semibold">
                                    support@velorent.com
                                </a>
                            </div>
                        </motion.div>

                        {/* Info Card 3 */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="backdrop-blur-xl bg-black/40 border border-white/10 p-6 rounded-2xl shadow-lg flex items-start gap-4"
                        >
                            <div className="p-3 bg-white/10 rounded-full text-primary-400">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Visit Us</h3>
                                <p className="text-gray-400">
                                    123 Kenyatta Avenue,<br />
                                    Nairobi CBD, Kenya
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input 
                                    label="Your Name" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                />
                                <Input 
                                    label="Email Address" 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                />
                            </div>
                            
                            <Input 
                                label="Subject" 
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                                    placeholder="Tell us about your requirements..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                />
                            </div>

                            <Button 
                                type="submit" 
                                size="lg" 
                                isLoading={isSubmitting}
                                className="w-full bg-white text-black hover:bg-gray-200 font-bold"
                                rightIcon={<Send className="w-4 h-4" />}
                            >
                                Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;