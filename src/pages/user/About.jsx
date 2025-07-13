import React from 'react';
import { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Content Section */}
          <div 
            className={`w-full lg:w-1/2 bg-white shadow-lg rounded-2xl p-8 transition-all duration-700 transform ${isVisible ? 'translate-x-0' : '-translate-x-8'}`}
          >
            <div className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-medium text-blue-600">About Our Project</h2>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Text-Based Presentation Feedback System
            </h1>
            
            <div 
              className={`space-y-4 text-gray-600 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <p>
                Our advanced feedback system is designed to help presenters refine their content
                by providing instant feedback on clarity, grammar, structure, and tone.
              </p>
              
              <div className="flex items-center gap-3 my-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/api/placeholder/32/32" alt="Upload icon" className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Easy File Upload</h3>
                  <p className="text-sm text-gray-500">Upload text directly or submit presentation files (PDF/PPT)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 my-6">
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/api/placeholder/32/32" alt="AI icon" className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI-Powered Analysis</h3>
                  <p className="text-sm text-gray-500">Our system intelligently analyzes your material and returns actionable insights</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 my-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/api/placeholder/32/32" alt="Admin icon" className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Admin Controls</h3>
                  <p className="text-sm text-gray-500">Manage users, track uploads, and view all feedback history for performance reviews</p>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div 
            className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-lg">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Presentation Dashboard" 
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div 
                className={`bg-white p-2 rounded-xl shadow-md transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Feature illustration" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div 
                className={`bg-white p-2 rounded-xl shadow-md transition-all duration-700 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                <img 
                  src="/api/placeholder/300/200" 
                  alt="Feature illustration" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
            <div className="text-gray-600">Presentations Analyzed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;