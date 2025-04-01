import React, { useState } from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { generateStudyPlan } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function StudyPlan() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('1 week');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !duration) return;

    setLoading(true);
    try {
      const generatedPlan = await generateStudyPlan(topic, duration);
      setPlan(generatedPlan);
      toast.success('Study plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate study plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Study Plan Generator</h1>
        <p className="mt-2 text-gray-600">Create a personalized study plan with AI assistance</p>
      </header>

      <form onSubmit={handleGeneratePlan} className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              What would you like to study?
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., React Hooks, Machine Learning Basics"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Study Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1 week">1 Week</option>
              <option value="2 weeks">2 Weeks</option>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Generating Plan...' : 'Generate Study Plan'}
          </button>
        </div>
      </form>

      {plan && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Study Plan</h2>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-md font-medium text-gray-900 mb-3">Learning Objectives</h3>
              <ul className="space-y-2">
                {plan.objectives?.map((objective: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                    {objective}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-md font-medium text-gray-900 mb-3">Schedule</h3>
              <div className="space-y-3">
                {plan.schedule?.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-medium text-gray-900">{item.day}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{item.tasks}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}