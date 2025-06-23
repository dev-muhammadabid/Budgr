import React, { useState, useEffect } from 'react';
import SavingsList from './savings/SavingsList';
import SavingsForm from './savings/SavingForm';
import API from '../services/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Savings = () => {
  const [goals, setGoals] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const res = await API.get('/savings');
      setGoals(res.data);
    } catch (err) {
      toast.error('Failed to load savings goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGoals(); }, []);

  const handleAdd = async (data) => {
    try {
      await API.post('/savings', data);
      toast.success('Savings goal added');
      fetchGoals();
    } catch (err) {}
  };

  const handleUpdate = async (id, data) => {
    try {
      await API.put(`/savings/${id}`, data);
      toast.success('Savings goal updated');
      setEditing(null);
      fetchGoals();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/savings/${id}`);
      toast.success('Savings goal deleted');
      fetchGoals();
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Savings Goals</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Savings Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1"
        >
          <h3 className="text-xl font-semibold mb-4">{editing ? 'Edit Goal' : 'Add New Goal'}</h3>
          <SavingsForm
            onAdd={handleAdd}
            editing={editing}
            onUpdate={handleUpdate}
            cancelEdit={() => setEditing(null)}
          />
        </motion.div>

        {/* Savings List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">Your Goals</h3>
          {goals.length === 0 ? (
            <p className="text-gray-500 text-sm">No savings goals set. Start planning your future!</p>
          ) : (
            <SavingsList goals={goals} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Savings;
