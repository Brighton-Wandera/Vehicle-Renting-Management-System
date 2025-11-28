import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (requireAdmin && user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};
