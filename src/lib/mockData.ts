import type { TableRow } from '../types';

export const revenueData = [
  { month: 'Jan', revenue: 42000, users: 1200, expenses: 28000 },
  { month: 'Feb', revenue: 58000, users: 1800, expenses: 32000 },
  { month: 'Mar', revenue: 51000, users: 1600, expenses: 29000 },
  { month: 'Apr', revenue: 74000, users: 2400, expenses: 38000 },
  { month: 'May', revenue: 68000, users: 2100, expenses: 35000 },
  { month: 'Jun', revenue: 89000, users: 2900, expenses: 42000 },
  { month: 'Jul', revenue: 95000, users: 3200, expenses: 45000 },
  { month: 'Aug', revenue: 112000, users: 3800, expenses: 51000 },
  { month: 'Sep', revenue: 98000, users: 3400, expenses: 48000 },
  { month: 'Oct', revenue: 124000, users: 4100, expenses: 56000 },
  { month: 'Nov', revenue: 138000, users: 4600, expenses: 62000 },
  { month: 'Dec', revenue: 156000, users: 5200, expenses: 70000 },
];

export const trafficData = [
  { name: 'Organic', value: 4200, color: '#0ea5e9' },
  { name: 'Direct', value: 2800, color: '#d946ef' },
  { name: 'Social', value: 1900, color: '#f59e0b' },
  { name: 'Referral', value: 1200, color: '#10b981' },
];

export const mockUsers: TableRow[] = Array.from({ length: 20 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Eva Martinez',
         'Frank Lee', 'Grace Kim', 'Henry Wilson', 'Iris Chen', 'Jack Taylor',
         'Karen Davis', 'Liam Moore', 'Mia Anderson', 'Noah Thomas', 'Olivia Jackson',
         'Paul Harris', 'Quinn Martin', 'Rachel Garcia', 'Sam Rodriguez', 'Tina Lewis'][i],
  email: `user${i + 1}@example.com`,
  status: (['active', 'inactive', 'pending'] as const)[i % 3],
  role: (['Admin', 'Editor', 'Viewer', 'Manager', 'Developer'] as const)[i % 5],
  joined: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  revenue: Math.floor(Math.random() * 50000) + 5000,
}));

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at TechFlow',
    avatar: 'https://i.pravatar.cc/80?img=1',
    content: 'This platform transformed how our team manages data. The dashboard is incredibly intuitive and the performance is outstanding.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    role: 'Product Lead at Nexus',
    avatar: 'https://i.pravatar.cc/80?img=3',
    content: 'We cut our reporting time by 70%. The analytics are powerful yet easy to understand. Best investment we made this year.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'CEO at DataSync',
    avatar: 'https://i.pravatar.cc/80?img=5',
    content: 'The UI is stunning and the feature set is exactly what growing startups need. Our team adopted it in days, not weeks.',
    rating: 5,
  },
];

export const features = [
  {
    icon: 'BarChart3',
    title: 'Advanced Analytics',
    description: 'Real-time insights with beautiful charts and customizable dashboards that help you make data-driven decisions.',
  },
  {
    icon: 'Shield',
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SSO, and granular permissions keep your data safe and compliant.',
  },
  {
    icon: 'Zap',
    title: 'Lightning Fast',
    description: 'Optimized for performance with sub-second load times and real-time data synchronization.',
  },
  {
    icon: 'Users',
    title: 'Team Collaboration',
    description: 'Invite your team, assign roles, and collaborate in real-time with built-in communication tools.',
  },
  {
    icon: 'Globe',
    title: 'Global Scale',
    description: 'Deploy across multiple regions with 99.99% uptime SLA and automatic failover.',
  },
  {
    icon: 'Puzzle',
    title: '200+ Integrations',
    description: 'Connect with your favorite tools — Slack, Salesforce, HubSpot, and hundreds more.',
  },
];
