// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Button, Input } from '../../components/ui';
// import { useAuthStore } from '../../store/authStore';
// // import { Navbar, Footer } from '../../components/layout';

// const Login: React.FC = () => {
//     const navigate = useNavigate();
//     const { login, isLoading } = useAuthStore();

//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//     const [showPassword, setShowPassword] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const success = await login(formData.email, formData.password);
//         if (success) {
//             navigate('/');
//         }
//     };

//     return (
//         <>
//             {/* <Navbar /> */}
//             <div className="min-h-screen flex items-center justify-center p-4 particle-bg pt-24">
//                 {/* Background Gradient */}
//                 <div className="absolute inset-0 bg-gradient-hero opacity-90" />

//                 {/* Login Card */}
//                 <motion.div
//                     className="relative z-10 w-full max-w-md"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="glass-strong rounded-2xl shadow-glass-lg p-8">
//                         {/* Logo/Header */}
//                         <div className="text-center mb-8">
//                             <h1 className="text-3xl font-heading font-bold text-white mb-2">
//                                 Welcome Back
//                             </h1>
//                             <p className="text-gray-200">Sign in to your account</p>
//                         </div>

//                         {/* Form */}
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <Input
//                                 type="email"
//                                 label="Email"
//                                 placeholder="you@example.com"
//                                 value={formData.email}
//                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                 leftIcon={<Mail className="w-5 h-5" />}
//                                 required
//                                 className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
//                             />

//                             <div>
//                                 <Input
//                                     type={showPassword ? 'text' : 'password'}
//                                     label="Password"
//                                     placeholder="••••••••"
//                                     value={formData.password}
//                                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                     leftIcon={<Lock className="w-5 h-5" />}
//                                     rightIcon={
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="text-gray-300 hover:text-white cursor-pointer"
//                                         >
//                                             {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                         </button>
//                                     }
//                                     required
//                                     className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
//                                 />
//                             </div>

//                             <div className="flex items-center justify-between">
//                                 <label className="flex items-center text-sm text-gray-200">
//                                     <input
//                                         type="checkbox"
//                                         className="mr-2 rounded border-gray-300"
//                                     />
//                                     Remember me
//                                 </label>
//                                 <Link
//                                     to="/auth/forgot-password"
//                                     className="text-sm text-yellow-300 hover:text-yellow-200 transition-colors"
//                                 >
//                                     Forgot password?
//                                 </Link>
//                             </div>

//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 size="lg"
//                                 isLoading={isLoading}
//                                 className="bg-white text-primary-700 hover:bg-gray-100"
//                             >
//                                 Sign In
//                             </Button>
//                         </form>

//                         {/* Divider */}
//                         <div className="relative my-6">
//                             <div className="absolute inset-0 flex items-center">
//                                 <div className="w-full border-t border-white/20" />
//                             </div>
//                             <div className="relative flex justify-center text-sm">
//                                 <span className="px-2 bg-transparent text-gray-200">Or</span>
//                             </div>
//                         </div>

//                         {/* Register Link */}
//                         <div className="text-center">
//                             <p className="text-gray-200">
//                                 Don't have an account?{' '}
//                                 <Link
//                                     to="/auth/register"
//                                     className="text-yellow-300 hover:text-yellow-200 font-semibold transition-colors"
//                                 >
//                                     Sign up
//                                 </Link>
//                             </p>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//             {/* <Footer /> */}
//         </>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';
// Import the same image used in Home
import heroImage from '../../assets/hero.png';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(formData.email, formData.password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* 1. Background Image (Same as Home) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay for contrast */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            </div>

            {/* 2. Login Card */}
            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Dark Glass Card Style */}
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-heading font-bold text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-300 font-light">
                            Sign in to continue your journey
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            leftIcon={<Mail className="w-5 h-5" />}
                            required
                            // Dark Input Styling
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-primary-500"
                        />

                        <div>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                leftIcon={<Lock className="w-5 h-5" />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                }
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-primary-500"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
                                <input
                                    type="checkbox"
                                    className="mr-2 rounded border-gray-600 bg-transparent checked:bg-primary-500"
                                />
                                Remember me
                            </label>
                            <Link
                                to="/auth/forgot-password"
                                className="text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                            className="bg-white text-black hover:bg-gray-200 font-bold border-none"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-gray-300">
                            Don't have an account?{' '}
                            <Link
                                to="/auth/register"
                                className="text-white font-bold hover:underline transition-all"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;