import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ChartComponent from '../components/ChartComponent';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

/**
 * Dashboard: shows summary pie chart and stats.
 */
const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get('/reports/summary');
        setSummary(res.data);
      } catch (err) {
        toast.error('Failed to load summary');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <Loader />;
  if (!summary) return <div className="text-center mt-10 text-gray-600">No data available.</div>;

  const labels = ['Income', 'Expense'];
  const values = [summary.totalIncome, summary.totalExpense];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center drop-shadow-sm">
          Dashboard Overview
        </h2>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 transition duration-300">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-1/2">
              <ChartComponent
                labels={labels}
                values={values}
                type="pie"
                label="Amount"
              />
            </div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full md:w-1/2 space-y-6"
            >
              <div className="bg-indigo-50 rounded-lg p-4 shadow-sm border border-indigo-100">
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-semibold text-green-600">
                  ₹ {summary.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 shadow-sm border border-red-100">
                <p className="text-sm text-gray-500">Total Expense</p>
                <p className="text-2xl font-semibold text-red-500">
                  ₹ {summary.totalExpense.toLocaleString()}
                </p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4 shadow-sm border border-emerald-100">
                <p className="text-sm text-gray-500">Net Savings</p>
                <p className="text-2xl font-semibold text-emerald-600">
                  ₹ {summary.netSavings.toLocaleString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
