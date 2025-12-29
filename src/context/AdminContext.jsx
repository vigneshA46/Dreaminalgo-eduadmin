import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authenticated , setauthenticated] = useState(false)

  // 🔑 Restore session on refresh
/*   useEffect(() => {
    const restore = async () => {
      try {
        const res = await apiRequest('POST', '/api/admin/auth/me');
        setAdmin(res.admin ?? res);
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false); // ✅ IMPORTANT
      }
    };

    restore();
  }, []); */

  const logout = async () => {
    await apiRequest('POST', '/api/admin/auth/logout');
    setauthenticated(false)
    window.location.href = '/login';
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, loading, logout,authenticated,setauthenticated,setLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
};
