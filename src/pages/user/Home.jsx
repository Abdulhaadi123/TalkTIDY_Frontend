
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import React from 'react';

const Index = () => {
  const features = [
    {
      title: "Grammar Analysis",
      description: "Advanced AI detects and corrects grammar errors in real-time",
      icon: "📝",
    },
    {
      title: "Structure Optimization",
      description: "Optimize your presentation flow for maximum engagement",
      icon: "🔄",
    },
    {
      title: "Clarity Enhancement",
      description: "Simplify complex ideas with smart rewording suggestions",
      icon: "💡",
    },
    {
      title: "Tone Adjustment",
      description: "Perfect your message for your specific audience",
      icon: "🎯",
    },
  ];

  const testimonials = [
    {
      quote: "This platform transformed my presentation skills overnight. The AI feedback is incredibly accurate!",
      author: "Sarah Johnson",
      title: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      quote: "I used to spend hours perfecting my presentations. Now I can create professional decks in minutes!",
      author: "Michael Chen",
      title: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      quote: "The clarity suggestions have completely changed how I communicate complex ideas. Simply brilliant.",
      author: "Alex Rivera",
      title: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Abstract shapes background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-20 right-10 h-64 w-64 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -bottom-10 -left-10 h-80 w-80 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center relative z-10">
          {/* Left side - Text content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 lg:pr-10 mb-12 lg:mb-0"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-block px-3 py-1 mb-6 bg-blue-100 text-blue-800 rounded-full font-medium text-sm"
            >
              Presentation AI ✨
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Elevate Your Presentations to New Heights 🚀
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Upload your content and watch our AI transform your presentations with intelligent feedback on grammar, structure, clarity, and tone. Deliver with confidence every time!
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg flex items-center transition-all transform hover:scale-105 shadow-lg">
                Get Started 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/about" className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 flex items-center transition-all">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right side - Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-75 blur"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Person giving presentation" 
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform offers everything you need to create exceptional presentations
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Included</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it — hear from some of our satisfied users
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
              >
                <div className="flex mb-4 items-center">
                  <div className="mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="text-5xl text-blue-200 absolute -top-6 -left-3">"</div>
                  <p className="relative text-gray-700 italic z-10 pt-2">
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-2/3 mb-8 lg:mb-0"
            >
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Presentations?</h2>
              <p className="text-xl text-blue-100 max-w-2xl">
                Join thousands of professionals who are creating stunning presentations with our AI-powered platform. Get started today!
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/register" 
                className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg flex items-center transition-all hover:shadow-lg hover:shadow-blue-800/30 transform hover:scale-105"
              >
                Get Started Now 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div>
              <div className="text-4xl font-bold">10k+</div>
              <div className="text-blue-200">Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50k+</div>
              <div className="text-blue-200">Presentations</div>
            </div>
            <div>
              <div className="text-4xl font-bold">98%</div>
              <div className="text-blue-200">Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-blue-200">Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link to="/testimonials" className="hover:text-white transition">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
                <li><Link to="/guides" className="hover:text-white transition">Guides</Link></li>
                <li><Link to="/tutorials" className="hover:text-white transition">Tutorials</Link></li>
                <li><Link to="/updates" className="hover:text-white transition">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-white transition">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition">Cookies</Link></li>
                <li><Link to="/licenses" className="hover:text-white transition">Licenses</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-white">Presentation<span className="text-blue-500">AI</span></span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} PresentationAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;