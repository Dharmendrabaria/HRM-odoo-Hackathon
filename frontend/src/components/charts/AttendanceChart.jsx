import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AttendanceChart = ({ data, metrics = ["present"], layout = "horizontal" }) => {
  const colorMap = {
    present: "#5b5bd6", // Brand 
    late: "#fbbf24",    // Warning
    absent: "#ef4444",  // Error
    onTime: "#5b5bd6",  // Brand
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface px-3 py-2 rounded-lg shadow-none border border-border">
          <p className="text-sm font-bold text-text-heading mb-1">{payload[0].payload.name}</p>
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
      <BarChart 
        data={data} 
        layout={layout}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e6e8f0" vertical={false} />
        {layout === "horizontal" ? (
          <>
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
          </>
        ) : (
          <>
            <XAxis 
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              type="category" 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
          </>
        )}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
        {metrics.map((metric) => (
          <Bar
            key={metric}
            dataKey={metric}
            fill={colorMap[metric] || "#5b5bd6"}
            radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
            barSize={layout === "horizontal" ? 32 : 16}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
