import React, { useState, useEffect } from 'react';
import IncomeList from './incomes/IncomeList';
import IncomeForm from './incomes/IncomeForm';
import API from '../services/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const res = await API.get('/incomes');
      setIncomes(res.data);
    } catch (err) {
      toast.error('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIncomes(); }, []);

  const handleAdd = async (data) => {
    try {
      await API.post('/incomes', data);
      toast.success('Income added');
      fetchIncomes();
    } catch (err) {}
  };

  const handleUpdate = async (id, data) => {
    try {
      await API.put(`/incomes/₹{id}`, data);
      toast.success('Income updated');
      setEditing(null);
      fetchIncomes();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/incomes/₹{id}`);
      toast.success('Income deleted');
      fetchIncomes();
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
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Your Incomes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1"
        >
          <h3 className="text-xl font-semibold mb-4">{editing ? 'Edit Income' : 'Add New Income'}</h3>
          <IncomeForm
            onAdd={handleAdd}
            editing={editing}
            onUpdate={handleUpdate}
            cancelEdit={() => setEditing(null)}
          />
        </motion.div>

        {/* Income List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg border col-span-1 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">Recent Incomes</h3>
          {incomes.length === 0 ? (
            <p className="text-gray-500 text-sm">No incomes added yet. Start by adding one!</p>
          ) : (
            <IncomeList incomes={incomes} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Incomes;
