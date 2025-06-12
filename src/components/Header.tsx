// src/components/Header.tsx
import React from 'react';
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Project Management Title */}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-gray-800">Project Management Dashboard</h1>
        </div>

        {/* User Icon */}
        <div className="flex items-center space-x-2 p-2">
          <User className="h-6 w-6 text-gray-600" />
          <span className="text-gray-800 font-medium">User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;