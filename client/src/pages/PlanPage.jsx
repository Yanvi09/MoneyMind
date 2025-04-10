
import React, { useState } from 'react';
import axios from 'axios';

const PlanPage = () => {
  const [plan, setPlan] = useState({
    goal: '',
    amount: '',
    duration: '',
    riskLevel: ''
  });

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/plan/save', plan, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('✅ Plan saved successfully!');
      setPlan({ goal: '', amount: '', duration: '', riskLevel: '' });
    } catch (error) {
      console.error(error);
      alert('❌ Error saving plan');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🧠 Your Investment Plan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="goal" placeholder="Goal (e.g. Buy a Car)" value={plan.goal} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="amount" placeholder="Amount to Invest" value={plan.amount} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="duration" placeholder="Duration (e.g. 5 years)" value={plan.duration} onChange={handleChange} className="border p-2 rounded" required />
        <select name="riskLevel" value={plan.riskLevel} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Risk Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">💾 Save Plan</button>
      </form>
    </div>
  );
};

export default PlanPage;
