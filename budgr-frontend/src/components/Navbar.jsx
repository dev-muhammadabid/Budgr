import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { toast } from 'react-toastify';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  DocumentChartBarIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Expenses', path: '/expenses', icon: <ArrowDownIcon className="w-5 h-5" /> },
    { name: 'Incomes', path: '/incomes', icon: <ArrowUpIcon className="w-5 h-5" /> },
    { name: 'Budgets', path: '/budgets', icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: 'Savings', path: '/savings', icon: <CurrencyDollarIcon className="w-5 h-5" /> },
    { name: 'Reports', path: '/reports', icon: <DocumentChartBarIcon className="w-5 h-5" /> },
  ];

  const authLinks = [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <img src='./budgr-logo.png' alt="Budgr Logo" className="h-24 w-24 mr-2 hidden md:block" />
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {token ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600/30 transition-all duration-200 group"
                  >
                    <span className="mr-2 text-indigo-200 group-hover:text-amber-300 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                ))}
                
                {/* User dropdown */}
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex text-sm rounded-full focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center text-indigo-900 font-bold">
                      <UserCircleIcon className="w-6 h-6" />
                    </div>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard"
                          className={`${
                            active ? 'bg-indigo-50' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <UserCircleIcon className="mr-3 h-5 w-5 text-indigo-600" />
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`${
                            active ? 'bg-indigo-50' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <CogIcon className="mr-3 h-5 w-5 text-indigo-600" />
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <div className="border-t my-1"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-indigo-50' : ''
                          } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-indigo-600" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </>
            ) : (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-600/30 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Menu>
              <Menu.Button 
                onClick={() => setIsOpen(!isOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Menu.Button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-4 top-16 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                  >
                    <div className="flex flex-col py-2">
                      {token ? (
                        <>
                          <div className="px-4 py-3 border-b">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center text-indigo-900 font-bold">
                                <UserCircleIcon className="w-6 h-6" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">john@example.com</p>
                              </div>
                            </div>
                          </div>
                          
                          {navLinks.map((link) => (
                            <Menu.Item key={link.name}>
                              {({ active }) => (
                                <Link
                                  to={link.path}
                                  onClick={() => setIsOpen(false)}
                                  className={`${
                                    active ? 'bg-indigo-50' : ''
                                  } flex items-center px-4 py-3 text-sm text-gray-700`}
                                >
                                  <span className="mr-3 text-indigo-600">
                                    {link.icon}
                                  </span>
                                  {link.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          
                          <div className="border-t my-1"></div>
                          
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                className={`${
                                  active ? 'bg-indigo-50' : ''
                                } flex items-center px-4 py-3 text-sm text-gray-700`}
                              >
                                <UserCircleIcon className="mr-3 h-5 w-5 text-indigo-600" />
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings"
                                onClick={() => setIsOpen(false)}
                                className={`${
                                  active ? 'bg-indigo-50' : ''
                                } flex items-center px-4 py-3 text-sm text-gray-700`}
                              >
                                <CogIcon className="mr-3 h-5 w-5 text-indigo-600" />
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => { setIsOpen(false); handleLogout(); }}
                                className={`${
                                  active ? 'bg-indigo-50' : ''
                                } flex items-center w-full text-left px-4 py-3 text-sm text-gray-700`}
                              >
                                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-indigo-600" />
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          {authLinks.map((link) => (
                            <Menu.Item key={link.name}>
                              {({ active }) => (
                                <Link
                                  to={link.path}
                                  onClick={() => setIsOpen(false)}
                                  className={`${
                                    active ? 'bg-indigo-50' : ''
                                  } px-4 py-3 text-sm text-gray-700`}
                                >
                                  {link.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className={`${
                                  active ? 'bg-amber-50' : 'bg-amber-500'
                                } mx-4 my-2 px-4 py-2.5 rounded-md text-sm font-medium text-center text-indigo-900 font-semibold shadow transition-all`}
                              >
                                Get Started
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;