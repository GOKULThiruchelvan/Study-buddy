import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Award, 
  Brain,
  BarChart,
  BookMarked,
  MessageSquare
} from 'lucide-react';
import { useStudyStore } from '../store/studyStore';
import { AITutor } from './AITutor';
import { Flashcards } from './Flashcards';

export function Dashboard() {
  const { user, currentPlan } = useStudyStore();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600 mt-1">
            Keep up the great work! You're on a {user?.progress.streak} day streak.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn-primary">
            <Brain className="w-5 h-5 mr-2" />
            Start Learning
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BookOpen className="w-6 h-6 text-blue-500" />}
          title="Study Progress"
          value={`${Math.round(currentPlan?.progress || 0)}%`}
          description="Current plan completion"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-green-500" />}
          title="Study Time"
          value="12.5 hrs"
          description="This week"
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-purple-500" />}
          title="Achievements"
          value="15"
          description="Badges earned"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6 text-red-500" />}
          title="Next Session"
          value="2h 30m"
          description="Time until next study session"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Plan */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Study Plan</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {currentPlan?.schedule.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{session.title}</h3>
                  <p className="text-sm text-gray-600">
                    {session.duration} minutes • {session.materials.length} materials
                  </p>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg ${
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

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionCard
              icon={<BarChart className="w-5 h-5" />}
              title="Analytics"
              description="Track your progress"
            />
            <QuickActionCard
              icon={<BookMarked className="w-5 h-5" />}
              title="Materials"
              description="Access study content"
            />
            <QuickActionCard
              icon={<MessageSquare className="w-5 h-5" />}
              title="Discussion"
              description="Join study groups"
            />
            <QuickActionCard
              icon={<Brain className="w-5 h-5" />}
              title="AI Tutor"
              description="Get instant help"
            />
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <AITutor />
        <Flashcards />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, description }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="p-2 bg-white rounded-lg shadow-sm mb-2">
        {icon}
      </div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}