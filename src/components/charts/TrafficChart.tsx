import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props { data: Array<{ name: string; value: number; color: string }> }

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card rounded-xl p-3 shadow-xl text-sm">
      <p className="font-semibold" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
      <p className="text-gray-600 dark:text-gray-400">{payload[0].value.toLocaleString()} visits</p>
    </div>
  );
};

export const TrafficChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie data={data} cx="50%" cy="45%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
        {data.map((entry, i) => (
          <Cell key={i} fill={entry.color} stroke="transparent" />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ fontSize: '12px' }} />
    </PieChart>
  </ResponsiveContainer>
);
