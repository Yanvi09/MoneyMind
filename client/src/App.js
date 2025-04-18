import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Learn from './pages/Learn'; // AI explainer
import LearnPage from './pages/LearnPage'; // Quiz page
import Track from './pages/Track';
import PlanAI from './pages/PlanAI'; // 🔄 was Plan.js (AI-based planning)
import PlanPage from './pages/PlanPage'; // 🔥 new route to save goals
import Login from './pages/Login';
import Register from './pages/Register';
import PortfolioGenerator from './pages/PortfolioGenerator';

import Dashboard from './pages/Dashboard'; //Dashboard ke liye

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/learn/ai" element={<Learn />} />
        <Route path="/learn/quiz" element={<LearnPage />} />
        <Route path="/track" element={<Track />} />
        <Route path="/plan" element={<PlanPage />} />         {/* 📈 Save financial goals */}
        <Route path="/ai-plan" element={<PlanAI />} />        {/* 🧠 Get AI-based plan */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<PortfolioGenerator />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
