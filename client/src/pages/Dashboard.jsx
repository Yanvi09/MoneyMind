import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [quote, setQuote] = useState("");
  const [userName, setUserName] = useState("");

  const COLORS = ["#002B5B", "#005F73", "#0A9396", "#94D2BD", "#E9D8A6"];

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

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://zenquotes.io/api/random");
      setQuote(response.data[0].q + " — " + response.data[0].a);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  const fetchUserName = () => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUserName(storedName);
  };

  useEffect(() => {
    fetchUserName();
    fetchQuote();
    fetchGoals();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#002B5B]">
        📊 Your Dashboard
      </h1>

      {/* 🌟 Welcome Message + Quote */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-[#005F73]">
          Welcome back, {userName || "Investor"}! 👋
        </h2>
        <p className="italic text-gray-600 mt-2 max-w-2xl mx-auto">“{quote}”</p>
      </div>

      {goals.length === 0 ? (
        <p className="text-center text-lg">
          No goals yet. Set one to begin your wealth journey. 💼
        </p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#005F73]">
              🎯 Goals Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={goals}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {goals.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-bold mb-2 text-[#0A9396]">📝 All Goals</h3>
            <ul className="space-y-2">
              {goals.map((goal) => (
                <li
                  key={goal._id}
                  className="border rounded-lg p-3 shadow-sm flex justify-between items-center"
                >
                  <span className="font-medium">{goal.name || goal.title}</span>
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
