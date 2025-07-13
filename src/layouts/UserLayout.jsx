"use client"

import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Upload,
  BarChart2,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  PanelTop,
  Bell,
  Search,
  Sparkles,
} from "lucide-react"

const UserLayout = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const name = localStorage.getItem("userName") || "John Doe"
  const email = localStorage.getItem("userEmail") || "john.doe@example.com"

  const getInitials = (name) => {
    const names = name.split(" ")
    return names.length >= 2 ? `${names[0][0]}${names[1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase()
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    window.location.href = "/login"
  }

  const navLinks = [
    { label: "Dashboard", to: "/user/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Upload", to: "/user/upload", icon: <Upload className="h-5 w-5" /> },
    { label: "Analytics", to: "/user/my-presentations", icon: <BarChart2 className="h-5 w-5" /> },
    { label: "Profile", to: "/user/profile", icon: <User className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-violet-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Modern Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Modern Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <PanelTop className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Presentation
                  </span>
                  <span className="text-2xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent ml-1">
                    AI
                  </span>
                  <Sparkles className="w-4 h-4 text-violet-500 ml-2 animate-pulse" />
                </div>
                <div className="text-xs text-slate-500 font-medium">Professional Suite</div>
              </div>
            </Link>

            {/* Modern Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group ${
                      isActive ? "text-white" : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg"></div>
                    )}
                    <span className="relative mr-3 group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    <span className="relative">{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Modern User Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-white/60 rounded-2xl transition-all duration-200 group">
                <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </button>

              {/* Notifications */}
              <button className="relative p-3 text-slate-400 hover:text-slate-600 hover:bg-white/60 rounded-2xl transition-all duration-200 group">
                <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
              </button>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 p-2 hover:bg-white/60 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative h-10 w-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {getInitials(name)}
                    </div>
                  </div>
                  <div className="ml-3 text-left hidden sm:block">
                    <p className="text-sm font-bold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-500">Online now</p>
                  </div>
                  <ChevronDown
                    className={`ml-3 h-4 w-4 text-slate-400 transition-all duration-300 ${
                      userMenuOpen ? "rotate-180 text-violet-500" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-3 w-72 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                  >
                    <div className="p-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                          {getInitials(name)}
                        </div>
                        <div className="ml-4">
                          <p className="font-bold">{name}</p>
                          <p className="text-violet-100 text-sm truncate">{email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/user/profile"
                        className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-violet-50 rounded-2xl transition-all duration-200 group m-1"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="mr-3 h-4 w-4 text-slate-400 group-hover:text-violet-500 transition-colors duration-200" />
                        Account Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                        className="flex w-full items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 group m-1"
                      >
                        <LogOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-all duration-200"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/20"
          >
            <div className="px-6 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center px-4 py-4 rounded-2xl text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-4">{link.icon}</span>
                    {link.label}
                  </Link>
                )
              })}
              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="flex w-full items-center px-4 py-4 rounded-2xl text-base font-semibold text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="mr-4 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Content */}
      <main className="relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Modern Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <PanelTop className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <span className="text-xl font-black text-white">PresentationAI</span>
                  <p className="text-slate-400 text-sm flex items-center mt-1">
                    <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                    Professional Suite
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex space-x-8 mb-6 md:mb-0">
              {["Privacy", "Terms", "Support", "API"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="text-sm text-slate-500 flex items-center">
              <span>© {new Date().getFullYear()} PresentationAI</span>
              <div className="ml-3 w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UserLayout
