import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SavingsForm = ({ onAdd, onUpdate, editing, cancelEdit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editing) {
      setAmount(editing.amount);
      setDescription(editing.description);
    } else {
      setAmount('');
      setDescription('');
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      amount: parseFloat(amount),
      description: description.trim(),
    };

    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onAdd(payload);
    }

    setAmount('');
    setDescription('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-xl shadow-md space-y-4 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">
            Amount <span className="text-red-500">*</span>
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="e.g. Vacation fund, Emergency savings..."
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition"
        >
          {editing ? 'Update Goal' : 'Add Goal'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded transition"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default SavingsForm;
