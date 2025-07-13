"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ChatBot from "../../components/ChatBot"
import Loader from "../../components/Loader"
import { getUserUploads } from "../../services/uploadService"

import {
  Presentation,
  MessageSquare,
  FileUp,
  Award,
  BarChart3,
  Clock,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Star,
  Activity,
} from "lucide-react"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [uploads, setUploads] = useState([])

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await getUserUploads()
        setUploads(response.data || [])
      } catch (error) {
        console.error("Failed to fetch uploads:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUploads()
  }, [])

  const averageScore = 8.7
  const feedbackCount = 12
  const timeSaved = "4h"

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm border border-violet-200/50 rounded-full text-violet-700 font-medium text-sm animate-fade-in">
            <Star className="w-4 h-4 mr-2 animate-spin-slow" />
            Welcome to your command center
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 bg-clip-text text-transparent leading-tight animate-slide-up">
            Presentation
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Transform your presentations with AI-powered insights and analytics that drive real results.
          </p>
        </div>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Presentations",
              value: uploads.length.toString(),
              icon: Presentation,
              gradient: "from-violet-500 to-purple-600",
              bgGradient: "from-violet-50 to-purple-50",
              change: "+12%",
              delay: "delay-100",
              iconColor: "text-violet-500",
            },
            {
              label: "Average Score",
              value: averageScore.toString(),
              icon: Award,
              gradient: "from-amber-500 to-orange-500",
              bgGradient: "from-amber-50 to-orange-50",
              change: "+0.3",
              delay: "delay-200",
              iconColor: "text-amber-500",
            },
            {
              label: "Total Feedback",
              value: feedbackCount.toString(),
              icon: MessageSquare,
              gradient: "from-emerald-500 to-teal-500",
              bgGradient: "from-emerald-50 to-teal-50",
              change: "+8",
              delay: "delay-300",
              iconColor: "text-emerald-500",
            },
            {
              label: "Time Saved",
              value: timeSaved,
              icon: Clock,
              gradient: "from-blue-500 to-indigo-500",
              bgGradient: "from-blue-50 to-indigo-50",
              change: "+2h",
              delay: "delay-500",
              iconColor: "text-blue-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-up ${stat.delay}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bgGradient} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {/* Fixed: use a visible color instead of text-transparent */}
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center text-emerald-600 font-semibold text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-1 hover:scale-[1.02] transition-all duration-500 animate-slide-up delay-600">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400/50 to-purple-600/50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-300">
                    <FileUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Upload & Analyze</h3>
                    <p className="text-violet-100">AI-powered insights</p>
                  </div>
                </div>
                <p className="text-violet-50 mb-8 leading-relaxed text-lg">
                  Drop your presentations and watch our AI transform them into actionable insights that elevate your
                  performance.
                </p>
                <Link
                  to="/user/upload"
                  className="inline-flex items-center bg-white text-violet-700 px-8 py-4 rounded-2xl font-bold hover:bg-violet-50 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Upload
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-1 hover:scale-[1.02] transition-all duration-500 animate-slide-up delay-700">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/50 to-teal-600/50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl mr-4 group-hover:rotate-12 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Deep Analytics</h3>
                    <p className="text-emerald-100">Performance insights</p>
                  </div>
                </div>
                <p className="text-emerald-50 mb-8 leading-relaxed text-lg">
                  Dive deep into comprehensive analytics and discover patterns that unlock your presentation potential.
                </p>
                <Link
                  to="/user/feedback"
                  className="inline-flex items-center bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Analytics
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Presentations */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl animate-slide-up delay-800">
          <div className="p-8 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mr-4">
                  <Calendar className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Recent Work</h3>
                  <p className="text-slate-600">Your latest presentations</p>
                </div>
              </div>
              <Link
                to="/user/uploads"
                className="inline-flex items-center text-violet-600 font-semibold hover:text-violet-700 transition-colors duration-200 group"
              >
                View All
                <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          <div className="p-8">
            {uploads.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Presentation className="w-12 h-12 text-slate-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Ready to get started?</h4>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Upload your first presentation and unlock the power of AI-driven insights.
                </p>
                <Link
                  to="/user/upload"
                  className="inline-flex items-center bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Upload Now
                  <Zap className="ml-2 w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {uploads.slice(0, 4).map((item, index) => {
                  const dateObj = new Date(item.dateUploaded || item.createdAt)
                  const date = dateObj.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  const time = dateObj.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })

                  const isFile = !!item.fileName
                  const title = isFile ? item.fileName : item.textContent?.slice(0, 40) || "Untitled"

                  return (
                    <div
                      key={item._id}
                      className="group flex items-center justify-between p-6 bg-gradient-to-r from-white/50 to-slate-50/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                    >
                      <div className="flex items-center flex-1">
                        <div
                          className={`p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300 ${
                            isFile
                              ? "bg-gradient-to-br from-purple-100 to-violet-100"
                              : "bg-gradient-to-br from-blue-100 to-indigo-100"
                          }`}
                        >
                          {isFile ? (
                            <FileUp className="w-6 h-6 text-purple-600" />
                          ) : (
                            <Presentation className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-bold text-slate-900 text-lg mr-3 truncate">{title}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                isFile ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {isFile ? "File" : "Text"}
                            </span>
                          </div>
                          <div className="flex items-center text-slate-500 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="mr-4">{date}</span>
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-xl">
                        <Activity className="w-4 h-4 text-amber-600 mr-2 animate-pulse" />
                        <span className="text-amber-700 font-medium text-sm">Processing</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white animate-slide-up delay-1000">
          <div className="flex items-center mb-8">
            <div className="p-4 bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl mr-4">
              <Zap className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Pro Tips</h3>
              <p className="text-slate-400">Master your presentations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[  
              { title: "Structure First", description: "Build a clear narrative flow that guides your audience through your key points", icon: Presentation },  
              { title: "Perfect Timing", description: "Practice your delivery to match your allocated time and maintain engagement", icon: Clock },  
              { title: "Visual Impact", description: "Use compelling visuals and consistent design to reinforce your message", icon: BarChart3 },  
            ].map((tip, i) => (  
              <div key={i} className="group">  
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">  
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">  
                    <tip.icon className="w-6 h-6 text-violet-400" />  
                  </div>  
                  <h4 className="font-bold text-lg mb-3">{tip.title}</h4>  
                  <p className="text-slate-300 leading-relaxed">{tip.description}</p>  
                </div>  
              </div>  
            ))}  
          </div>
        </div>
      </div>

      <ChatBot />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.2s both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  )
}

export default Dashboard
