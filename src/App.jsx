import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/user/Home';
import About from './pages/user/About';

import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

import UserDashboard from './pages/user/Dashboard';
import Upload from './pages/user/Upload';
// import Feedback from './pages/user/Feedback';
import MyPresentations from './pages/user/MyPresentations';
import Profile from './pages/user/Profile';

import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
// import FeedbackLogs from './pages/admin/FeedbackLogs';
import FileManager from './pages/admin/FileManager';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route element={<UserLayout />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/upload" element={<Upload />} />
          <Route path="/user/my-presentations" element={<MyPresentations />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          {/* <Route path="/admin/feedback" element={<FeedbackLogs />} /> */}
          <Route path="/admin/files" element={<FileManager />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
