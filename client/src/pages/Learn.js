//AI se puchhne wala page (Ask AI) in Navbar click

import React, { useState } from 'react';
import axios from 'axios';

function Learn() {
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleExplain = async () => {
    const res = await axios.post('http://localhost:5000/api/ai', {
      question: `Explain in simple words: ${topic}`
    });
    setExplanation(res.data.answer);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📘 Ask AI to Learn Investment Concepts</h2>
      <input
        className="border w-full p-2 mb-3"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. What is SIP?"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleExplain}>
        Ask AI
      </button>
      <div className="mt-4 whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {explanation}
      </div>
    </div>
  );
}

export default Learn;
