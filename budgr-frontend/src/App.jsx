import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Pages
import IntroPage from './pages/IntroPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Expenses from './pages/Expenses.jsx';
import Incomes from './pages/Incomes.jsx';
import Budgets from './pages/Budgets.jsx';
import Savings from './pages/Savings.jsx';
import Reports from './pages/Reports.jsx';

function App() {
  const location = useLocation();

  // Animation config
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  // Hide Navbar only on IntroPage
  const isIntroPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isIntroPage && <Navbar />}

      <main className={`flex-grow ${!isIntroPage ? 'container mx-auto p-4' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Routes location={location} key={location.pathname}>
              {/* Intro landing page */}
              <Route path="/" element={<IntroPage />} />

              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Private routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/savings" element={<Savings />} />
                <Route path="/reports" element={<Reports />} />
              </Route>

              {/* Catch-all: redirect to IntroPage */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
