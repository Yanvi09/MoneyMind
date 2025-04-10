import React, { useState } from 'react';
import axios from 'axios';

function Plan() {
  const [form, setForm] = useState({
    amount: '',
    duration: '',
    risk: 'low',
    goal: ''
  });
  const [plan, setPlan] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const prompt = `Make a simple personalized investing plan for:
    Amount: ₹${form.amount}
    Goal: ${form.goal}
    Duration: ${form.duration} years
    Risk level: ${form.risk}.
    
    Use simple words, and explain how much to invest where (SIP, gold, stocks etc).`;

    const res = await axios.post('http://localhost:5000/api/ai', {
      question: prompt
    });

    setPlan(res.data.answer);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧠 Get Your Personalized Plan</h2>

      <input className="border p-2 w-full mb-3" type="number" name="amount" placeholder="Total amount (₹)" onChange={handleChange} />
      
      <input className="border p-2 w-full mb-3" type="text" name="goal" placeholder="Goal (e.g. buy a car)" onChange={handleChange} />

      <input className="border p-2 w-full mb-3" type="number" name="duration" placeholder="Duration (in years)" onChange={handleChange} />

      <select className="border p-2 w-full mb-3" name="risk" onChange={handleChange}>
        <option value="low">Low Risk</option>
        <option value="medium">Medium Risk</option>
        <option value="high">High Risk</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Get Plan from AI
      </button>

      <div className="mt-4 whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {plan}
      </div>
    </div>
  );
}

export default Plan;
