import React from 'react';
import { Clock, Target, TrendingUp, Award, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export default function Analytics() {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, topics: 3 },
    { day: 'Tue', hours: 3.0, topics: 4 },
    { day: 'Wed', hours: 1.5, topics: 2 },
    { day: 'Thu', hours: 4.0, topics: 5 },
    { day: 'Fri', hours: 2.0, topics: 3 },
    { day: 'Sat', hours: 3.5, topics: 4 },
    { day: 'Sun', hours: 1.0, topics: 1 },
  ];

  const progressData = [
    { week: 'Week 1', score: 75 },
    { week: 'Week 2', score: 82 },
    { week: 'Week 3', score: 78 },
    { week: 'Week 4', score: 85 },
    { week: 'Week 5', score: 90 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
        <p className="mt-2 text-gray-600">Track your progress and study patterns</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          title="Study Time"
          value="17.5 hrs"
          description="This week"
          trend="+2.5 hrs"
          trendUp={true}
        />
        <StatCard
          icon={Target}
          title="Topics Covered"
          value="22"
          description="This week"
          trend="+5"
          trendUp={true}
        />
        <StatCard
          icon={TrendingUp}
          title="Average Score"
          value="85%"
          description="All assessments"
          trend="+3%"
          trendUp={true}
        />
        <StatCard
          icon={Award}
          title="Achievements"
          value="8"
          description="Total earned"
          trend="+1"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Study Hours</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Progress Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Study Calendar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">
                    Study Session {i}
                  </span>
                </div>
                <span className="text-sm text-gray-600">2:00 PM</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Topic: Advanced Mathematics
              </p>
              <div className="mt-2 flex items-center">
                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">Duration: 1.5 hours</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, description, trend, trendUp }: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <div className="flex items-center mt-1">
            <span className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
            <span className="text-sm text-gray-600 ml-2">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}