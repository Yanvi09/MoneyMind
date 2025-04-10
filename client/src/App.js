import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Learn from './pages/Learn';
import Track from './pages/Track';
import Plan from './pages/Plan';
import Login from './pages/Login';
import Register from './pages/Register';
import PortfolioGenerator from './pages/PortfolioGenerator'; // ✅ Added

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/track" element={<Track />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<PortfolioGenerator />} /> {/* ✅ Added */}
      </Routes>
    </Router>
  );
}

export default App;
