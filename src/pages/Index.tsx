import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, MessageCircle, Activity, Calendar } from 'lucide-react';

// Sample data for charts
const userGrowthData = [
  { month: 'Jan', users: 2400, activeUsers: 1800 },
  { month: 'Feb', users: 3200, activeUsers: 2400 },
  { month: 'Mar', users: 4100, activeUsers: 3200 },
  { month: 'Apr', users: 5200, activeUsers: 4100 },
  { month: 'May', users: 6800, activeUsers: 5400 },
  { month: 'Jun', users: 8200, activeUsers: 6800 },
];

const messageData = [
  { date: 'Week 1', messages: 12000, avgLength: 45 },
  { date: 'Week 2', messages: 15200, avgLength: 48 },
  { date: 'Week 3', messages: 18900, avgLength: 52 },
  { date: 'Week 4', messages: 22100, avgLength: 55 },
];

const retentionData = [
  { week: 'W1', retention: 95, churn: 5 },
  { week: 'W2', retention: 92, churn: 8 },
  { week: 'W3', retention: 89, churn: 11 },
  { week: 'W4', retention: 87, churn: 13 },
];

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, positive = true }) => (
  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
        <p className={`text-sm mt-2 flex items-center gap-1 ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          <TrendingUp className="w-4 h-4" />
          {change}
        </p>
      </div>
      <div className="text-primary opacity-40">
        {icon}
      </div>
    </div>
  </div>
);

const Index = () => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">EasyChat KPI Dashboard</h1>
          <p className="text-muted-foreground">Real-time performance metrics and analytics</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {['24h', '7d', '30d', '6m', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value="8,200"
            change="+35% from last month"
            icon={<Users className="w-8 h-8" />}
            positive={true}
          />
          <MetricCard
            title="Active Users"
            value="6,800"
            change="+28% from last month"
            icon={<Activity className="w-8 h-8" />}
            positive={true}
          />
          <MetricCard
            title="Messages Sent"
            value="22.1K"
            change="+18.5% from last week"
            icon={<MessageCircle className="w-8 h-8" />}
            positive={true}
          />
          <MetricCard
            title="Retention Rate"
            value="87%"
            change="-8% from week 1"
            icon={<Calendar className="w-8 h-8" />}
            positive={false}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Messages Over Time */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">Messages Sent</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="messages" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Retention vs Churn */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">Retention Rate</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Bar dataKey="retention" fill="hsl(var(--primary))" />
                <Bar dataKey="churn" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Users Trend */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">Active Users</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="activeUsers" stroke="hsl(var(--accent-foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent-foreground))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Index;
