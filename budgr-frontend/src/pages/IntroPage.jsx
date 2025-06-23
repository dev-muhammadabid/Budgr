import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const IntroPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Stats data for the dashboard preview
  const stats = [
    { value: '92%', label: 'Budget Efficiency' },
    { value: '$1,240', label: 'Monthly Savings' },
    { value: '34%', label: 'Cost Reduction' },
    { value: '4.8★', label: 'User Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-700/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 py-6 px-6 flex justify-between items-center max-w-7xl mx-auto">
         {/* Logo/Brand */}
        <img src='./budgr-logo.png' alt="Budgr Logo" className="h-32 w-32 mr-2 hidden md:block" />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/login" 
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-indigo-900 font-semibold shadow-lg transition-all duration-300"
          >
            Sign In
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Take Control of Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-400">Financial Future</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-indigo-200 max-w-2xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Budgr helps you effortlessly track expenses, set budgets, and achieve your financial goals. Start your journey to financial freedom today.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            to="/register" 
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-indigo-900 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
        
        {/* Dashboard Preview */}
        <motion.div 
          className="w-full max-w-5xl bg-gradient-to-br from-indigo-800/30 to-purple-800/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="p-6 border-b border-white/10 flex justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-sm text-indigo-300">Your Financial Dashboard</div>
            <div className="w-12"></div>
          </div>
          
          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-indigo-800/30 backdrop-blur rounded-xl p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-amber-300">{stat.value}</div>
                  <div className="text-indigo-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Chart */}
            <div className="bg-indigo-800/30 backdrop-blur rounded-xl p-6 border border-white/10 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Monthly Spending</h3>
                <div className="text-sm text-indigo-300">June 2023</div>
              </div>
              <div className="h-48 flex items-end space-x-4">
                {[40, 70, 60, 90, 80, 50, 75, 65, 85, 60, 70, 95].map((height, index) => (
                  <motion.div
                    key={index}
                    className="w-6 md:w-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: 1 + index * 0.05, ease: "easeOut" }}
                  />
                ))}
              </div>
            </div>
            
            {/* Budget Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Housing', 'Food', 'Entertainment'].map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-indigo-800/30 backdrop-blur rounded-xl p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{category}</div>
                    <div className="text-sm text-indigo-300">$450/$600</div>
                  </div>
                  <div className="w-full bg-indigo-700/50 rounded-full h-2.5">
                    <motion.div 
                      className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2.5 rounded-full"
                      style={{ width: `${(index + 1) * 25}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(index + 1) * 25}%` }}
                      transition={{ duration: 1, delay: 1.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Everything you need to manage your finances effectively
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Expense Tracking",
              description: "Automatically categorize and track all your expenses with smart algorithms."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Budget Planning",
              description: "Create custom budgets for different categories and track your progress."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Financial Security",
              description: "Bank-level security to keep your financial data safe and private."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-indigo-800/30 to-purple-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9 + index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-indigo-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have taken control of their financial future with Budgr
          </p>
          <Link 
            to="/register" 
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-indigo-900 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Free Today
          </Link>
        </motion.div>
      </div>
      
      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 py-8 text-center text-indigo-300">
        <div className="max-w-7xl mx-auto px-6">
          <p>© 2025 Budgr. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;