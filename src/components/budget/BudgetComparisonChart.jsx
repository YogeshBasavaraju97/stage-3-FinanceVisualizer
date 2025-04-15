"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function BudgetComparisonChart({ data }) {
  const getStatusColor = (spent, budget) => {
    return spent <= budget ? "text-green-600" : "text-red-600";
  };

  const getStatusText = (spent, budget) => {
    return spent <= budget ? "Under Budget" : "Over Budget";
  };

  const getPercentage = (spent, budget) => {
    return budget === 0 ? "—" : `${Math.min(((spent / budget) * 100).toFixed(0), 999)}%`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#60A5FA" name="Budget" />
          <Bar dataKey="spent" fill="#F87171" name="Actual Spent" />
        </BarChart>
      </ResponsiveContainer>

      {/* Status Summary Below Chart */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-3 rounded-lg bg-gray-50"
          >
            <div>
              <p className="font-medium">{item.category}</p>
              <p className={`text-sm ${getStatusColor(item.spent, item.budget)}`}>
                {getStatusText(item.spent, item.budget)} • {getPercentage(item.spent, item.budget)} used
              </p>
            </div>
            <div className="text-right text-sm">
              <p>💰 Budget: ₹{item.budget}</p>
              <p>💸 Spent: ₹{item.spent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
