import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Presentation, MessageSquare, TrendingUp, Activity, CheckCircle } from 'lucide-react';
import { getAdminStats } from '../../services/adminService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    presentations: 0,
    feedbacks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getAdminStats();
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+12%',
    },
    {
      title: 'Total Presentations',
      value: stats.presentations,
      icon: <Presentation className="h-6 w-6 text-green-600" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+8%',
    },
    {
      title: 'Total Feedbacks',
      value: stats.feedbacks,
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+24%',
    },
  ];

  // Mock data for activity chart
  const activityData = [35, 55, 40, 70, 85, 60, 75, 60, 90, 80, 75, 85];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 max-w-7xl mx-auto p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-green-700"
        >
          Admin Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 sm:mt-0 text-sm text-slate-500 font-medium"
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 bg-green-500" />
            
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    {card.icon}
                  </div>
                  <p className="text-slate-500 font-medium">{card.title}</p>
                </div>
                <h2 className={`text-4xl font-bold ${card.color}`}>
                  {loading ? '-' : card.value.toLocaleString()}
                </h2>
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{card.trend}</span>
              <span className="ml-1 text-slate-500">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Activity Overview
          </h2>
          <div className="h-[240px] w-full">
            <div className="flex h-[200px] items-end gap-2">
              {activityData.map((value, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-green-500 to-green-400 rounded-t w-full"
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 50
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium text-slate-800">All systems operational</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm font-medium text-slate-500 mb-2">Server Load</div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
              </div>
              <div className="mt-1 text-xs text-slate-500">25% - Normal</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-sm font-medium text-slate-500 mb-2">Latest Update</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-slate-700">System updated successfully</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">Today at 9:30 AM</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;