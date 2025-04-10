import React, { useState } from 'react';
import axios from 'axios';

const PortfolioGenerator = () => {
  const [query, setQuery] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePortfolio = async () => {
    if (!query) return alert("Please enter your investment preference");

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/portfolio', { prompt: query });
      setPortfolio(res.data.portfolio);
    } catch (err) {
      console.error(err);
      alert('❌ Error generating portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Portfolio Generator</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="4"
        placeholder="e.g. I want to invest in AI startups and green tech"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={generatePortfolio}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : '✨ Generate Portfolio'}
      </button>

      {portfolio && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📈 Suggested Portfolio</h3>
          <pre className="whitespace-pre-wrap">{portfolio}</pre>
        </div>
      )}
    </div>
  );
};

export default PortfolioGenerator;
