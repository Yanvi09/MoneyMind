import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-rich-bg text-rich-text font-serif shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-2xl font-extrabold text-rich-dark tracking-wide">
        💰 MoneyMind
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-lg">
        <Link to="/" className="hover:text-rich-gold transition">Home</Link>
        
        {/* Learn Dropdown Simulation */}
        <div className="relative group">
          <span className="cursor-pointer hover:text-rich-gold transition">Learn</span>
          <div className="absolute hidden group-hover:flex flex-col bg-white text-rich-dark shadow-lg mt-2 p-2 rounded z-10">
            <Link to="/learn/ai" className="px-4 py-2 hover:bg-rich-gold hover:text-white rounded">With AI</Link>
            <Link to="/learn/quiz" className="px-4 py-2 hover:bg-rich-gold hover:text-white rounded">With Quiz</Link>
          </div>
        </div>

        <Link to="/plan" className="hover:text-rich-gold transition">Plan</Link>
        <Link to="/track" className="hover:text-rich-gold transition">Track</Link>

        {/* Auth Section */}
        {user ? (
          <>
            <span className="ml-4 text-rich-dark">Hello, <strong>{user.name}</strong></span>
            <button
              onClick={logout}
              className="ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-rich-gold transition">Login</Link>
            <Link to="/register" className="hover:text-rich-gold transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
