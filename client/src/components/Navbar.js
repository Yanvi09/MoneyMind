import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-black text-white flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/">💰 MoneyMind</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/plan">Plan</Link>
        <Link to="/track">Track</Link>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
