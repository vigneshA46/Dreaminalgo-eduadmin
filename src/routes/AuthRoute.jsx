import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AuthRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdmin();

  if (loading) return null;

  if (isAdminAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
