import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Removed useLocation
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { Navbar, Footer } from './components/layout';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Vehicles from './pages/Vehicles';
import VehicleDetails from './pages/VehicleDetails';
import Contact from './pages/Contact'; // Import this
import Reviews from './pages/Reviews'; // Import this
import Locations from './pages/Locations';

// Create query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

// --- UPDATED LAYOUT WRAPPER ---
// This now wraps EVERYTHING in the Navbar and Footer
const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {/* Added pt-16 to push content down because Navbar is fixed */}
            <div className="min-h-screen">{children}</div>
            <Footer />
        </>
    );
};

function App() {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppLayout>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/vehicles" element={<Vehicles />} />
                        <Route path="/vehicles/:id" element={<VehicleDetails />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/locations" element={<Locations />} />
                        
                        {/* Auth Routes - Now they will have Navbar/Footer automatically */}
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/verify-email" element={<VerifyEmail />} />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <div className="container-custom py-20 pt-24">
                                        <h1 className="text-4xl font-bold gradient-text">Dashboard Coming Soon!</h1>
                                        <p className="mt-4 text-gray-600">Stay tuned for amazing features...</p>
                                    </div>
                                </ProtectedRoute>
                            }
                        />

                        {/* Catch all */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AppLayout>

                {/* Global Chatbot */}
                <Chatbot />

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#333',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '16px',
                        },
                        success: {
                            iconTheme: { primary: '#10b981', secondary: '#fff' },
                        },
                        error: {
                            iconTheme: { primary: '#ef4444', secondary: '#fff' },
                        },
                    }}
                />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;