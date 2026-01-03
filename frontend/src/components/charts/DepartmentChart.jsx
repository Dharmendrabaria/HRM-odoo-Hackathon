import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DepartmentChart = ({ data, keys = ["onTime", "late"] }) => {
  const colorMap = {
    onTime: "#3b82f6",  // Blue instead of green
    late: "#f59e0b",    // Amber
    absent: "#dc2626",  // Red
    value: "#4f46e5",   // Primary indigo for single values
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-semibold text-foreground mb-1">{payload[0].payload.name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis 
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#475569', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#475569', fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          iconType="circle"
          formatter={(value) => <span className="text-sm text-muted capitalize">{value}</span>}
        />
        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={colorMap[key] || "#4f46e5"}
            radius={key === keys[keys.length - 1] ? [6, 6, 0, 0] : [0, 0, 0, 0]}
            barSize={50}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentChart;
