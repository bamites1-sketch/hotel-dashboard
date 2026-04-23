export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Stat {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface TableRow {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  joined: string;
  revenue: number;
}
