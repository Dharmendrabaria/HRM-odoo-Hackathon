import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const LeaveChart = ({ data }) => {
  const COLORS = {
    // Employee Dashboard Categories
    "Paid": "#5b5bd6",   // Primary Brand
    "Sick": "#ef4444",   // Error/Red
    "Casual": "#22c55e", // Success/Green
    
    // Admin Dashboard Categories
    "Approved": "#22c55e",
    "Pending": "#fbbf24",
    "Rejected": "#ef4444",
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface px-3 py-2 rounded-lg shadow-none border border-border">
          <p className="text-sm font-bold text-text-heading">{payload[0].name}</p>
          <p className="text-sm text-primary font-medium">{payload[0].value} Days</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#cbd5e1"} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span className="text-xs font-bold text-text-muted ml-1">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LeaveChart;
