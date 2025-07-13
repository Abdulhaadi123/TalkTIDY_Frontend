import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardListIcon,
  FolderOpenIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: HomeIcon },
  { label: 'Users', path: '/admin/users', icon: UserGroupIcon },
  { label: 'Feedback Logs', path: '/admin/feedback', icon: ClipboardListIcon },
  { label: 'File Manager', path: '/admin/files', icon: FolderOpenIcon },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-white shadow-md p-6 space-y-8"
      >
        <div className="text-2xl font-extrabold text-green-700">Admin Panel</div>

        <nav className="flex flex-col space-y-4">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;

            // Highlight dashboard in green, others in blue
            const activeStyle =
              path === '/admin/dashboard'
                ? 'bg-green-100 text-green-700 font-semibold'
                : 'bg-blue-100 text-blue-700 font-semibold';

            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? activeStyle
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold mt-10"
        >
          <LogoutIcon className="h-5 w-5" />
          Logout
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
