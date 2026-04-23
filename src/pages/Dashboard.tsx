import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { SkeletonCard, Skeleton } from '../components/ui/Skeleton';
import { RevenueChart } from '../components/charts/RevenueChart';
import { TrafficChart } from '../components/charts/TrafficChart';
import { DataTable } from '../components/DataTable';
import { dashboardApi } from '../lib/api';
import { revenueData, trafficData } from '../lib/mockData';
import type { Stat, TableRow } from '../types';

const iconMap: Record<string, React.FC<any>> = { DollarSign, Users, TrendingUp, Clock };

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [users, setUsers] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dashboardApi.getStats(), dashboardApi.getUsers()])
      .then(([s, u]) => { setStats(s); setUsers(u); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((stat, i) => {
              const Icon = iconMap[stat.icon];
              const positive = stat.change >= 0;
              return (
                <motion.div key={stat.label} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.08 }}>
                  <Card className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                        {Icon && <Icon className="w-5 h-5 text-primary-500" />}
                      </div>
                      <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                        {positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {Math.abs(stat.change)}%
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </Card>
                </motion.div>
              );
            })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <p className="text-sm text-gray-500 mt-0.5">Monthly revenue vs expenses</p>
            </CardHeader>
            {loading ? <Skeleton className="h-72 w-full" /> : <RevenueChart data={revenueData} />}
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <p className="text-sm text-gray-500 mt-0.5">Where visitors come from</p>
            </CardHeader>
            {loading ? <Skeleton className="h-64 w-full" /> : <TrafficChart data={trafficData} />}
          </Card>
        </motion.div>
      </div>

      {/* Users table */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.5 }}>
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Users</h2>
          <p className="text-sm text-gray-500">Manage and monitor your user base</p>
        </div>
        {loading ? <Skeleton className="h-96 w-full rounded-2xl" /> : <DataTable data={users} />}
      </motion.div>
    </div>
  );
};
