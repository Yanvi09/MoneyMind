// src/pages/Plan.jsx

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Plan = () => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    targetDate: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/goals",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("🎯 Goal saved successfully!");
      setFormData({ title: "", amount: "", targetDate: "", notes: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save goal");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">💡 Plan Your Investment</h2>
      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Goal Title (e.g. Emergency Fund)"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Target Amount (e.g. 100000)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />
        <input
          type="date"
          name="targetDate"
          value={formData.targetDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        />
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />
        <button
          type="submit"
          className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900"
        >
          Save Goal
        </button>
      </form>
    </div>
  );
};

export default Plan;
