import React, { useState } from "react";
import axios from "axios";

const PlanPage = () => {
  const [goal, setGoal] = useState({
    name: "",
    amount: "",
    duration: "",
  });

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // assuming JWT is stored here
      const response = await axios.post(
        "http://localhost:5000/api/goals",
        goal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Goal saved! 💰");
      setGoal({ name: "", amount: "", duration: "" });
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Failed to save goal 😥");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📈 Your Investment Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Amount (e.g. 5000)"
          type="number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="duration"
          value={goal.duration}
          onChange={handleChange}
          placeholder="Duration in months"
          type="number"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Save Goal
        </button>
      </form>
    </div>
  );
};

export default PlanPage;
