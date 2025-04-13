// src/pages/Track.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Track = () => {
  const [goals, setGoals] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sorted = response.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setGoals(sorted);
        setLineData(
          sorted.map((goal) => ({
            name: goal.name || goal.title,
            amount: goal.amount,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const totalInvestment = goals.reduce((sum, g) => sum + g.amount, 0);
  const topGoal = goals.reduce((prev, current) =>
    prev.amount > current.amount ? prev : current,
    { amount: 0 }
  );

  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#002B5B]">📈 Track Your Progress</h1>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#E9D8A6] p-4 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-[#002B5B]">Total Invested</h2>
          <p className="text-2xl mt-2 font-bold">₹{totalInvestment}</p>
        </div>
        <div className="bg-[#94D2BD] p-4 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-[#002B5B]">Goals Set</h2>
          <p className="text-2xl mt-2 font-bold">{goals.length}</p>
        </div>
        <div className="bg-[#005F73] p-4 rounded-2xl shadow-md text-center text-white">
          <h2 className="text-xl font-semibold">Top Goal</h2>
          <p className="text-lg mt-2">{topGoal.name || "N/A"}</p>
          <p className="font-bold text-lg">₹{topGoal.amount || 0}</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-[#0A9396] mb-4 text-center">📊 Investment Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#002B5B"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Track;
