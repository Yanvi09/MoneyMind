import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Learn from './pages/Learn';
import Track from './pages/Track';
import Plan from './pages/Plan';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/learn" element={<Learn />} />
        <Route path="/track" element={<Track />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </Router>
  );
}

export default App;
