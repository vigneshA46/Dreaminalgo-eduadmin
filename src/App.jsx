import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useAdmin } from './context/AdminContext';

import '@mantine/core/styles.css'

import Home from './Home.jsx';
import Login from './Login.jsx';
import Dashboard from './pages/Dashboard';
import Addcourse from './pages/Addcourse';
import Admins from './pages/Admins';
import Reports from './pages/Reports';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Announcements from './pages/Announcements';
import Notification from './pages/Notification';

export default function App() {
  const { admin , authenticated } = useAdmin();

  return (
    <MantineProvider>
      <Router>
        <Routes>
          {!authenticated ? (
            <>
             <Route path="*" element={<Login />} />
            </>
          ) : (
            <>
            <Route path="/" element={<Home />}>
              <Route index element={<Dashboard />} />
              <Route path="notification" element={<Notification />} />
              <Route path="courses" element={<Courses />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="addcourse" element={<Addcourse />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="admin" element={<Admins />} />
              </Route>
             
            </>
          )}
        </Routes>
      </Router>
    </MantineProvider>
  );
}
