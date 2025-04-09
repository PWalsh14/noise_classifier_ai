import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full bg-white rounded-xl shadow-sm">
        {children}
      </main>
    </div>
  );
};

export default Layout;