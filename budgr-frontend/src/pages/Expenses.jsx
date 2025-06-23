import React, { useState, useEffect } from 'react';
import ExpenseList from './expenses/ExpenseList';
import ExpenseForm from './expenses/ExpenseForm';
import API from '../services/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await API.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleAdd = async (data) => {
    try {
      await API.post('/expenses', data);
      toast.success('Expense added');
      fetchExpenses();
    } catch (err) {}
  };

  const handleUpdate = async (id, data) => {
    try {
      await API.put(`/expenses/${id}`, data);
      toast.success('Expense updated');
      setEditing(null);
      fetchExpenses();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      toast.success('Expense deleted');
      fetchExpenses();
    } catch (err) {}
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Your Expenses</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1"
        >
          <h3 className="text-xl font-semibold mb-4">{editing ? 'Edit Expense' : 'Add New Expense'}</h3>
          <ExpenseForm
            onAdd={handleAdd}
            editing={editing}
            onUpdate={handleUpdate}
            cancelEdit={() => setEditing(null)}
          />
        </motion.div>

        {/* Expense List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-sm">No expenses found. Start adding some!</p>
          ) : (
            <ExpenseList expenses={expenses} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Expenses;
