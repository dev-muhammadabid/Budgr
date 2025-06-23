import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const SavingsList = ({ goals = [], onEdit, onDelete }) => {
  return (
    <ul className="space-y-4">
      <AnimatePresence>
        {goals.map((goal) => (
          <motion.li
            key={goal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-green-700">💰 ${goal.amount}</p>
                <p className="text-sm text-gray-600 mt-1">{goal.description || <i>No description</i>}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(goal)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default SavingsList;
