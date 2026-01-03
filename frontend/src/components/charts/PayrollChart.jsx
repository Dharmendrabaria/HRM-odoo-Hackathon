import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const PayrollChart = ({ type = 'breakdown', data = [], dataKey = 'value' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-[10px] font-black text-muted uppercase tracking-widest bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
        Disbursement Data Null
      </div>
    );
  }

  const COLORS = ["#5b5bd6", "#22c55e", "#fbbf24", "#ef4444", "#38bdf8"];

  if (type === 'breakdown') {
    return (
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={4}
              dataKey={dataKey}
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ 
                   borderRadius: '12px', 
                   border: 'none', 
                   boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                   fontSize: '12px',
                   fontWeight: '600',
                   padding: '8px 12px',
                   color: '#1e293b'
               }}
               itemStyle={{ color: '#5b5bd6' }}
            />
            <Legend 
                verticalAlign="bottom" 
                align="center" 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ 
                    paddingTop: '20px', 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    color: '#64748b'
                }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            tickFormatter={(value) => `$${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(15, 23, 42, 0.02)' }}
            contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '11px',
                fontWeight: '700'
            }}
          />
          <Bar dataKey={dataKey} fill="#5b5bd6" radius={[4, 4, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PayrollChart;
