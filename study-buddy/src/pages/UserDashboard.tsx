import React from 'react';
import { Clock, Target, Book, Trophy } from 'lucide-react';
import { useStudyStore } from '../store/studyStore';

export default function UserDashboard() {
  const { user, currentPlan } = useStudyStore();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <p className="mt-2 text-gray-600">Track your progress and manage your studies</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          title="Study Time"
          value={`${user?.progress.completedSessions || 0} hrs`}
          description="This week"
          color="blue"
        />
        <StatCard
          icon={Target}
          title="Goals Completed"
          value={`${user?.goals.length || 0}`}
          description="Total goals"
          color="green"
        />
        <StatCard
          icon={Book}
          title="Current Streak"
          value={`${user?.progress.streak || 0} days`}
          description="Keep it up!"
          color="purple"
        />
        <StatCard
          icon={Trophy}
          title="Completion Rate"
          value={`${Math.round((user?.progress.completedSessions || 0) / (user?.progress.totalSessions || 1) * 100)}%`}
          description="Overall progress"
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Study Plan</h2>
          <div className="space-y-4">
            {currentPlan?.schedule.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{session.title}</h3>
                  <p className="text-sm text-gray-600">{session.duration} minutes</p>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    session.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {session.completed ? 'Completed' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Goals</h2>
          <div className="space-y-4">
            {user?.goals.map((goal, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-900">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, description, color }: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center">
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}