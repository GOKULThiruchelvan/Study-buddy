import { Link } from 'react-router-dom';
import { Brain, BookOpen, Users, BarChart2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Transform Your Learning with AI
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Personalized study plans, intelligent summaries, and AI-powered tutoring to help you achieve your academic goals.
        </p>
        <div className="mt-10">
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={Brain}
          title="AI-Powered Learning"
          description="Get personalized study recommendations and instant answers to your questions."
        />
        <FeatureCard
          icon={BookOpen}
          title="Smart Summaries"
          description="Transform lengthy materials into concise, easy-to-understand summaries."
        />
        <FeatureCard
          icon={Users}
          title="Collaborative Study"
          description="Connect with peers and form study groups based on shared interests."
        />
        <FeatureCard
          icon={BarChart2}
          title="Progress Tracking"
          description="Monitor your learning progress with detailed analytics and insights."
        />
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Start Your Learning Journey
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Create Your Profile"
            description="Set up your academic goals and preferences"
          />
          <StepCard
            number="2"
            title="Choose Your Subjects"
            description="Select the topics you want to master"
          />
          <StepCard
            number="3"
            title="Start Learning"
            description="Get personalized study plans and AI assistance"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}