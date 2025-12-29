import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AdminProvider } from './context/AdminContext';

createRoot(document.getElementById('root')).render(
    <AdminProvider>
      <App />
    </AdminProvider>
);
