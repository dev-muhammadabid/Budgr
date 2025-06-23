import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPieChart } from 'react-icons/fi';

const listVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const BudgetList = ({ budgets, onEdit, onDelete }) => {
  if (budgets.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 p-8 text-center bg-gray-50 rounded-xl border border-gray-200"
      >
        <FiPieChart className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-4 text-lg font-medium text-gray-500">No budget plans created</p>
        <p className="mt-1 text-gray-400">Set up your first budget to track spending</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="mt-6 overflow-hidden rounded-xl shadow-sm border border-gray-200"
      initial="hidden" 
      animate="visible" 
      variants={listVariants}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                Budget Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-purple-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgets.map((b) => (
              <motion.tr 
                key={b.id} 
                variants={itemVariants}
                whileHover={{ backgroundColor: 'rgba(250, 245, 255, 0.5)' }}
                className="transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {b.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-600">
                  ₹{parseFloat(b.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(0, b.month - 1).toLocaleString('default', { month: 'short' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {b.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit(b)}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(b.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BudgetList;