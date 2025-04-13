// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { filterGoalsByTime } from "../utils/filterGoalsByTime";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");
  const COLORS = ["#002B5B", "#005F73", "#0A9396", "#94D2BD", "#E9D8A6"];

  const filteredGoals = filterGoalsByTime(goals, filter);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/goals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const totalAmount = filteredGoals.reduce((sum, g) => sum + g.amount, 0);
  const averageAmount = filteredGoals.length
    ? Math.round(totalAmount / filteredGoals.length)
    : 0;
  const latestGoalDate = filteredGoals.length
    ? new Date(filteredGoals[0].createdAt).toLocaleDateString()
    : "N/A";

  const goalChartData = filteredGoals.map((goal) => ({
    date: new Date(goal.createdAt).toLocaleDateString(),
    amount: goal.amount,
  }));

  return (
    <div className="p-8 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#002B5B]">
        📊 Your Dashboard
      </h1>

      {/* 🔎 Filter Selector */}
      <div className="flex justify-center mb-6">
        <select
          className="border text-sm rounded-lg px-3 py-2 text-[#002B5B] shadow"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Goals</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* 📌 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#002B5B] text-white rounded-xl p-4 text-center shadow-md">
          <h2 className="text-lg font-semibold">Total Goals</h2>
          <p className="text-2xl font-bold">{filteredGoals.length}</p>
        </div>
        <div className="bg-[#005F73] text-white rounded-xl p-4 text-center shadow-md">
          <h2 className="text-lg font-semibold">Total Invested</h2>
          <p className="text-2xl font-bold">₹{totalAmount}</p>
        </div>
        <div className="bg-[#0A9396] text-white rounded-xl p-4 text-center shadow-md">
          <h2 className="text-lg font-semibold">Average Goal</h2>
          <p className="text-2xl font-bold">₹{averageAmount}</p>
        </div>
        <div className="bg-[#94D2BD] text-[#002B5B] rounded-xl p-4 text-center shadow-md">
          <h2 className="text-lg font-semibold">Latest Goal</h2>
          <p className="text-2xl font-bold">{latestGoalDate}</p>
        </div>
      </div>

      {/* 🎯 Goals Pie Chart */}
      {filteredGoals.length === 0 ? (
        <p className="text-center text-lg">
          No goals for this range. Try another filter or set a new one. 💼
        </p>
      ) : (
        <>
          {/* 🥧 Pie Chart */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2 text-[#005F73]">
              🎯 Goals Overview (by amount)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredGoals}
                  dataKey="amount"
                  nameKey="purpose"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {filteredGoals.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📈 Bar Chart */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2 text-[#005F73]">
              📅 Goal Growth Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={goalChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#0A9396" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 📝 All Goals List */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-bold mb-2 text-[#0A9396]">📝 Your Goals</h3>
            <ul className="space-y-2">
              {filteredGoals.map((goal) => (
                <li
                  key={goal._id}
                  className="border rounded-lg p-3 shadow-sm flex justify-between items-center"
                >
                  <span className="font-medium">
                    {goal.purpose || goal.title}
                  </span>
                  <span className="text-gray-600">₹{goal.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
