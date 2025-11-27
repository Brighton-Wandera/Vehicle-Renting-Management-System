import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';
import { authApi } from '../../api/auth.api';
import toast from 'react-hot-toast';

const VerifyEmail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all filled
        if (newOtp.every((digit) => digit) && index === 5) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (code?: string) => {
        const otpCode = code || otp.join('');
        if (otpCode.length !== 6) {
            toast.error('Please enter all 6 digits');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authApi.verifyEmail(email, otpCode);
            if (response.success) {
                toast.success('Email verified successfully!');
                navigate('/auth/login');
            }
        } catch (error) {
            toast.error('Invalid or expired OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await authApi.resendOtp(email);
            toast.success('OTP resent to your email');
            setTimeLeft(600);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            toast.error('Failed to resend OTP');
        } finally {
            setIsResending(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 particle-bg">
            <div className="absolute inset-0 bg-gradient-hero opacity-90" />

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="glass-strong rounded-2xl shadow-glass-lg p-8 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-10 h-10 text-white" />
                    </div>

                    {/* Header */}
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-200 mb-8">
                        We've sent a 6-digit code to<br />
                        <span className="font-semibold text-yellow-300">{email}</span>
                    </p>

                    {/* OTP Input */}
                    <div className="flex justify-center gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/30 rounded-lg text-white focus:border-yellow-300 focus:outline-none transition-colors"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {/* Timer */}
                    <div className="mb-6">
                        <p className="text-gray-200">
                            Time remaining:{' '}
                            <span className={`font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-yellow-300'}`}>
                                {formatTime(timeLeft)}
                            </span>
                        </p>
                    </div>

                    {/* Verify Button */}
                    <Button
                        onClick={() => handleVerify()}
                        fullWidth
                        size="lg"
                        isLoading={isLoading}
                        className="bg-white text-primary-700 mb-4"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                        Verify Email
                    </Button>

                    {/* Resend */}
                    <div className="text-gray-200">
                        Didn't receive the code?{' '}
                        <button
                            onClick={handleResend}
                            disabled={isResending || timeLeft > 540}
                            className="text-yellow-300 hover:text-yellow-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isResending ? 'Sending...' : 'Resend'}
                        </button>
                    </div>

                    {/* Back Link */}
                    <div className="mt-6">
                        <Link to="/auth/register" className="text-sm text-gray-300 hover:text-white transition-colors">
                            ← Back to Registration
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
