import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const fakeProgress = [
  { month: 'Jan', invested: 1000, returns: 1050 },
  { month: 'Feb', invested: 2000, returns: 2100 },
  { month: 'Mar', invested: 3000, returns: 3150 },
  { month: 'Apr', invested: 4000, returns: 4300 },
  { month: 'May', invested: 5000, returns: 5600 },
];

function Track() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Your Investment Growth</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={fakeProgress}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="invested" stroke="#8884d8" name="Invested ₹" />
          <Line type="monotone" dataKey="returns" stroke="#82ca9d" name="Returns ₹" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Track;
