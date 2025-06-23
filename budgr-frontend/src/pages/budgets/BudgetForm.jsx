import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiCalendar, FiTag, FiSave, FiX } from 'react-icons/fi';

const formVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const BudgetForm = ({ onAdd, editing, onUpdate, cancelEdit }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (editing) {
      setCategory(editing.category);
      setAmount(editing.amount);
      setMonth(editing.month);
      setYear(editing.year);
    } else {
      setCategory(''); setAmount(''); setMonth(''); setYear('');
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { 
      category, 
      amount: parseFloat(amount), 
      month: parseInt(month), 
      year: parseInt(year) 
    };
    if (editing) {
      onUpdate(editing.id, data);
    } else {
      onAdd(data);
    }
    setCategory(''); setAmount(''); setMonth(''); setYear('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      initial="hidden" 
      animate="visible" 
      variants={formVariants} 
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FiDollarSign className="text-purple-500" />
        {editing ? 'Edit Budget Plan' : 'Create New Budget'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiTag className="text-gray-500" />
            Category
          </label>
          <div className="relative">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="e.g. Groceries, Rent"
              required
            />
            <FiTag className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiDollarSign className="text-gray-500" />
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">₹</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiCalendar className="text-gray-500" />
            Month
          </label>
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all appearance-none"
              required
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i+1} value={i+1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiCalendar className="text-gray-500" />
            Year
          </label>
          <div className="relative">
            <input
              type="number"
              min="2000"
              max="2100"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              placeholder="2023"
              required
            />
            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <button 
          type="submit" 
          className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-sm flex items-center gap-2"
        >
          {editing ? (
            <>
              <FiSave className="h-4 w-4" />
              Update Budget
            </>
          ) : (
            <>
              <FiSave className="h-4 w-4" />
              Create Budget
            </>
          )}
        </button>
        
        {editing && (
          <button 
            type="button" 
            onClick={cancelEdit} 
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center gap-2"
          >
            <FiX className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default BudgetForm;