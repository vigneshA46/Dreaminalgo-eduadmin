// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Addcourse from './pages/Addcourse';
import Admins from './pages/Admins';
import Reports from './pages/Reports';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Announcements from './pages/Announcements';
import Home from './Home';
import Notification from './pages/Notification';


export default function App() {
  return <MantineProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} >
        <Route index element={<Dashboard />} />
        <Route path='notification' element={<Notification />} />
        <Route path='courses' element={<Courses />} />
        <Route path='announcements' element={<Announcements />} />
        <Route path='addcourse' element={<Addcourse />} />
        <Route path='users' element={<Users />} />
        <Route path='reports' element={<Reports />} />
        <Route path='admin' element={<Admins />} />
        </Route>
      </Routes>
    </Router>
  </MantineProvider>;
}