// src/pages/PlanPage.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlanPage = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [risk, setRisk] = useState("low");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/goals",
        { amount, duration, risk, purpose },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create goal:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-[#002B5B]">
      <h2 className="text-2xl font-bold mb-6 text-center">🎯 Set Your Investment Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Goal Purpose</label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 shadow-sm"
            placeholder="e.g., Retirement, Emergency Fund"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Duration (in months)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Risk Preference</label>
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 shadow-sm"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#002B5B] hover:bg-[#001F3F] text-white font-bold py-2 px-4 rounded-lg shadow-md"
        >
          {loading ? "Setting Goal..." : "Create Goal"}
        </button>
      </form>
    </div>
  );
};

export default PlanPage;
