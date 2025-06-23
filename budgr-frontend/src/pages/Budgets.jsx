import React, { useState, useEffect } from 'react';
import BudgetList from './budgets/BudgetList';
import BudgetForm from './budgets/BudgetForm';
import API from '../services/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await API.get('/budgets');
      setBudgets(res.data);
    } catch (err) {
      toast.error('Failed to load budgets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBudgets(); }, []);

  const handleAdd = async (data) => {
    try {
      await API.post('/budgets', data);
      toast.success('Budget added');
      fetchBudgets();
    } catch (err) {}
  };

  const handleUpdate = async (id, data) => {
    try {
      await API.put(`/budgets/${id}`, data);
      toast.success('Budget updated');
      setEditing(null);
      fetchBudgets();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/budgets/${id}`);
      toast.success('Budget deleted');
      fetchBudgets();
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Your Budgets</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1"
        >
          <h3 className="text-xl font-semibold mb-4">{editing ? 'Edit Budget' : 'Add New Budget'}</h3>
          <BudgetForm
            onAdd={handleAdd}
            editing={editing}
            onUpdate={handleUpdate}
            cancelEdit={() => setEditing(null)}
          />
        </motion.div>

        {/* Budget List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">Your Budget Plans</h3>
          {budgets.length === 0 ? (
            <p className="text-gray-500 text-sm">No budgets created yet. Start by adding one!</p>
          ) : (
            <BudgetList budgets={budgets} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Budgets;
