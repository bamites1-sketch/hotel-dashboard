import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { revenueData, trafficData } from '../lib/mockData';
import { TrafficChart } from '../components/charts/TrafficChart';
import { useUIStore } from '../store/useUIStore';

export const Analytics: React.FC = () => {
  const { theme } = useUIStore();
  const gridColor = theme === 'dark' ? '#374151' : '#f3f4f6';
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Deep dive into your metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader><CardTitle>Monthly Users</CardTitle></CardHeader>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                <Tooltip formatter={(v) => [`${(Number(v) / 1000).toFixed(1)}K`, 'Users']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
                <Bar dataKey="users" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader><CardTitle>Traffic Sources</CardTitle></CardHeader>
            <TrafficChart data={trafficData} />
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader><CardTitle>Revenue Breakdown</CardTitle></CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {['Month', 'Revenue', 'Expenses', 'Profit', 'Margin'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 dark:text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {revenueData.map(row => {
                  const profit = row.revenue - row.expenses;
                  const margin = ((profit / row.revenue) * 100).toFixed(1);
                  return (
                    <tr key={row.month} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{row.month}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">${(row.revenue / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">${(row.expenses / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">${(profit / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${margin}%` }} />
                          </div>
                          <span className="text-xs text-gray-500 w-10">{margin}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
