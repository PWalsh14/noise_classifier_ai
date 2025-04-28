import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;
