import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdmin();

  if (loading) return null; // or loader

  if (!isAdminAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
