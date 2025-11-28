

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, Hash, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import heroImage from '../../assets/hero.png';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register, isLoading } = useAuthStore();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactPhone: '',
        nationalId: '',
        address: '',
        referralCode: '',
    });

    // Validation Helpers
    const handleNext = () => {
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.email) {
                toast.error('Please fill in all required fields');
                return;
            }
        }
        if (step === 2) {
            if (!formData.password || !formData.confirmPassword) {
                toast.error('Please fill in password fields');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
        }
        setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await register({ ...formData, nationalId: parseInt(formData.nationalId) });
        if (success) {
            toast.success('Account created! Logging in...');
            const loginSuccess = await useAuthStore.getState().login(formData.email, formData.password);
            if (loginSuccess) navigate('/');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* 1. Background Image */}
            <div className="absolute inset-0 z-0">
                <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            {/* 2. Register Card */}
            <motion.div
                className="relative z-10 w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Dark Glass Container */}
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-300 font-light">Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-500 font-semibold">VeloRent</span> exclusive club</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${s <= step ? 'bg-white text-black' : 'bg-white/10 text-white/50 border border-white/20'
                                    }`}>
                                    {s}
                                </div>
                            </div>
                        ))}
                        {/* Connecting Line */}
                        <div className="absolute left-0 right-0 top-[110px] h-[2px] bg-white/10 -z-10 mx-16" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<User className="w-4 h-4" />} />
                                    <Input label="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                                </div>
                                <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<Mail className="w-4 h-4" />} />

                                <Button type="button" onClick={handleNext} fullWidth className="bg-white text-black mt-4 hover:bg-gray-200">
                                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        )}

                        {/* Step 2: Security */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<Lock className="w-4 h-4" />} />
                                <Input label="Confirm Password" type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<Lock className="w-4 h-4" />} />

                                <div className="flex gap-3 mt-6">
                                    <Button type="button" onClick={handleBack} className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10">Back</Button>
                                    <Button type="button" onClick={handleNext} className="flex-1 bg-white text-black hover:bg-gray-200">Next</Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Details */}
                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                <Input label="Phone" type="tel" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<Phone className="w-4 h-4" />} />
                                <Input label="National ID" type="number" value={formData.nationalId} onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<Hash className="w-4 h-4" />} />
                                <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" leftIcon={<MapPin className="w-4 h-4" />} />

                                <div className="flex gap-3 mt-6">
                                    <Button type="button" onClick={handleBack} className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10">Back</Button>
                                    <Button type="submit" isLoading={isLoading} className="flex-1 bg-white text-black hover:bg-gray-200">Create Account</Button>
                                </div>
                            </motion.div>
                        )}
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">Already have an account? <Link to="/auth/login" className="text-white font-bold hover:underline">Sign in</Link></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;