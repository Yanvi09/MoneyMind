import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Learn from './pages/Learn'; // AI explainer
import LearnPage from './pages/LearnPage'; // Quiz page
import Track from './pages/Track';
import Plan from './pages/Plan';
import Login from './pages/Login';
import Register from './pages/Register';
import PortfolioGenerator from './pages/PortfolioGenerator';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/learn/ai" element={<Learn />} />
        <Route path="/learn/quiz" element={<LearnPage />} />
        <Route path="/track" element={<Track />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<PortfolioGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
