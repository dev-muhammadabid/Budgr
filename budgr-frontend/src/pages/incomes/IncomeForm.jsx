import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiCalendar, FiTag, FiAlignLeft } from 'react-icons/fi';

const formVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const IncomeForm = ({ onAdd, editing, onUpdate, cancelEdit }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editing) {
      setCategory(editing.category);
      setDescription(editing.description);
      setAmount(editing.amount);
      setDate(editing.date);
    } else {
      setCategory(''); setDescription(''); setAmount(''); setDate('');
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { category, description, amount: parseFloat(amount), date };
    if (editing) {
      onUpdate(editing.id, data);
    } else {
      onAdd(data);
    }
    setCategory(''); setDescription(''); setAmount(''); setDate('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      initial="hidden" 
      animate="visible" 
      variants={formVariants} 
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <FiDollarSign className="text-green-500" />
        {editing ? 'Edit Income Entry' : 'Record New Income'}
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
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Salary, Freelance, etc."
              required
            />
            <FiTag className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiCalendar className="text-gray-500" />
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              required
            />
            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
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
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiAlignLeft className="text-gray-500" />
            Description
          </label>
          <div className="relative">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Additional details (optional)"
            />
            <FiAlignLeft className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <button 
          type="submit" 
          className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-sm flex items-center gap-2"
        >
          {editing ? (
            <>
              <FiDollarSign className="h-4 w-4" />
              Update Income
            </>
          ) : (
            <>
              <FiDollarSign className="h-4 w-4" />
              Add Income
            </>
          )}
        </button>
        
        {editing && (
          <button 
            type="button" 
            onClick={cancelEdit} 
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default IncomeForm;