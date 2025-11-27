import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
    ];

    const services = [
        { name: 'Daily Rentals', path: '/vehicles?type=daily' },
        { name: 'Weekly Rentals', path: '/vehicles?type=weekly' },
        { name: 'Monthly Rentals', path: '/vehicles?type=monthly' },
        { name: 'Corporate Packages', path: '/corporate' },
        { name: 'Loyalty Program', path: '/loyalty' },
    ];

    const socialLinks = [
        { icon: Facebook, url: 'https://facebook.com', name: 'Facebook' },
        { icon: Twitter, url: 'https://twitter.com', name: 'Twitter' },
        { icon: Instagram, url: 'https://instagram.com', name: 'Instagram' },
        { icon: Linkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="p-2 bg-gradient-primary rounded-lg">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-white">
                                VehicleRental
                            </span>
                        </Link>
                        <p className="text-sm mb-4">
                            Your trusted partner for premium vehicle rentals. Experience the journey with comfort and style.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-primary-600 transition-colors"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.path}>
                                    <Link
                                        to={service.path}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">123 Main Street, Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a href="tel:+254123456789" className="text-sm hover:text-primary-400 transition-colors">
                                    +254 123 456 789
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                <a
                                    href="mailto:alfiejay881@gmail.com"
                                    className="text-sm hover:text-primary-400 transition-colors"
                                >
                                    alfiejay881@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {currentYear} VehicleRental. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/terms" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                                Terms
                            </Link>
                            <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                                Privacy
                            </Link>
                            <Link to="/cookies" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
