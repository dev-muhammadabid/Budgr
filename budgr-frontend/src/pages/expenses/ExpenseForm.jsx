import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const formVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Form to add or edit an expense with animation.
 */
const ExpenseForm = ({ onAdd, editing, onUpdate, cancelEdit }) => {
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
      className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-100"
      initial="hidden" 
      animate="visible" 
      variants={formVariants} 
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {editing ? '✏️ Edit Expense' : '➕ Add New Expense'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="e.g. Groceries, Rent"
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">₹</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Any additional details"
          />
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm"
        >
          {editing ? 'Update Expense' : 'Add Expense'}
        </button>
        
        {editing && (
          <button 
            type="button" 
            onClick={cancelEdit} 
            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default ExpenseForm;