import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { useUIStore } from '../../store/useUIStore';

interface Props { data: Array<{ month: string; revenue: number; expenses: number }> }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-xl p-3 shadow-xl text-sm">
      <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ${(p.value / 1000).toFixed(0)}K
        </p>
      ))}
    </div>
  );
};

export const RevenueChart: React.FC<Props> = ({ data }) => {
  const { theme } = useUIStore();
  const gridColor = theme === 'dark' ? '#374151' : '#f3f4f6';
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#colorRevenue)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
        <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#d946ef" strokeWidth={2.5} fill="url(#colorExpenses)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
