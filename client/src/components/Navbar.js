import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/learn">Learn</Link>
      <Link to="/plan">Plan</Link>
      <Link to="/track">Track</Link>
    </nav>
  );
}

export default Navbar;
