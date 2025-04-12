
//It's your main user-facing goal form + displays saved goals = CORE Plan Page

import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanPage = () => {
  const [goal, setGoal] = useState({
    name: "",
    amount: "",
    duration: "",
  });

  const [goals, setGoals] = useState([]); // for saved goals

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGoals(response.data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/goals", goal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Goal saved! 🎯");
      setGoal({ name: "", amount: "", duration: "" });
      fetchGoals(); // refresh goals
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Failed to save goal 😥");
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📈 Your Investment Goal</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="name"
          value={goal.name}
          onChange={handleChange}
          placeholder="Goal Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="amount"
          value={goal.amount}
          onChange={handleChange}
          placeholder="Amount"
          type="number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="duration"
          value={goal.duration}
          onChange={handleChange}
          placeholder="Duration (months)"
          type="number"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
        >
          Save Goal
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">🎯 Saved Goals:</h3>
        {goals.length > 0 ? (
          <ul className="space-y-2">
            {goals.map((g) => (
              <li key={g._id} className="border p-2 rounded shadow-sm">
                <strong>{g.name}</strong> - ₹{g.amount} over {g.duration} months
              </li>
            ))}
          </ul>
        ) : (
          <p>No goals yet. Set your first goal now! 🫶</p>
        )}
      </div>
    </div>
  );
};

export default PlanPage;
