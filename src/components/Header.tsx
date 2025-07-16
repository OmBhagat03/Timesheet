// File: src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">ticktock</Link>
      <nav className="flex gap-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/list" className="text-gray-700 hover:text-blue-600">List</Link>
      </nav>
      <span className="text-gray-600 font-medium">
        {user?.name ? user.name : 'Guest'}
      </span>
    </header>
  );
};

export default Header;
