import React, { useState, useEffect } from 'react';
import {
  User, Mail, Briefcase, Edit2, Camera, Lock, Bell, HelpCircle
} from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
  const [location, setLocation] = useState(localStorage.getItem('location') || 'San Francisco, CA');
  const [memberSince, setMemberSince] = useState(localStorage.getItem('memberSince') || 'June 2025');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  const [preview, setPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const getInitials = (fullName) => {
    const names = fullName.trim().split(' ');
    return names.length >= 2
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : fullName.substring(0, 2).toUpperCase();
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Token missing. Please log in again.');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await res.json();
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('role', data.role);
      if (data.avatar) {
        const avatarUrl = `http://localhost:5000${data.avatar}`;
        localStorage.setItem('avatar', avatarUrl);
        setAvatar(avatarUrl);
      }

      // Save editable static fields to localStorage
      localStorage.setItem('location', location);
      localStorage.setItem('memberSince', memberSince);
      localStorage.setItem('language', language);

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to update profile');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'help', label: 'Help', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            {preview || avatar ? (
              <img src={preview || avatar} alt="Avatar" className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-blue-600 shadow-lg border-4 border-white">
                {getInitials(name)}
              </div>
            )}
            <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-black/30 flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold mb-1">{name}</h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center text-blue-100">
              <div className="flex items-center"><Mail className="h-4 w-4 mr-1" /> <span>{email}</span></div>
              <div className="hidden md:block h-1 w-1 rounded-full bg-blue-200"></div>
              <div className="flex items-center"><Briefcase className="h-4 w-4 mr-1" /> <span>{role}</span></div>
            </div>
          </div>

          <div className="ml-auto flex gap-2">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center transition-colors shadow-sm backdrop-blur-sm">
                <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
              </button>
            ) : (
              <>
                <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Save</button>
                <button onClick={() => setIsEditing(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow p-1">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}>
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editable Form */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                {isEditing ? <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-lg" />
                : <div className="p-3 bg-gray-50 border rounded-lg">{name}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                {isEditing ? <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" />
                : <div className="p-3 bg-gray-50 border rounded-lg">{email}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                {isEditing ? <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border rounded-lg" />
                : <div className="p-3 bg-gray-50 border rounded-lg">{role}</div>}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                {isEditing ? <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border rounded-lg" />
                : <div className="p-3 bg-gray-50 border rounded-lg">{location}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                {isEditing ? <input value={memberSince} onChange={(e) => setMemberSince(e.target.value)} className="w-full p-3 border rounded-lg" />
                : <div className="p-3 bg-gray-50 border rounded-lg">{memberSince}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Language</label>
                {isEditing ? <input value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 border rounded-lg" />
                : <div className="p-3 bg-gray-50 border rounded-lg">{language}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
