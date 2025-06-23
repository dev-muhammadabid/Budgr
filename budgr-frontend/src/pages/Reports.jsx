import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Reports = () => {
  const [data, setData] = useState({ expenses: [], incomes: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, incRes] = await Promise.all([
          api.get('/expenses'),
          api.get('/incomes'),
        ]);
        setData({ expenses: expRes.data, incomes: incRes.data });
      } catch (err) {
        console.error('Error fetching report data:', err);
      }
    };
    fetchData();
  }, []);

  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncomes = data.incomes.reduce((sum, i) => sum + i.amount, 0);

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Monthly Report',
        data: [totalIncomes, totalExpenses],
        backgroundColor: ['#3b82f6', '#ef4444'],
        borderRadius: 5,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800">Financial Report</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold">Total Income</h4>
          <p className="text-2xl font-bold mt-2">₹ {totalIncomes.toLocaleString()}</p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
          <h4 className="text-lg font-semibold">Total Expenses</h4>
          <p className="text-2xl font-bold mt-2">₹ {totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow border mt-4">
        <h3 className="text-xl font-semibold mb-4">Income vs Expenses Chart</h3>
        <div className="w-full overflow-x-auto">
          <Bar data={chartData} />
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;
