import React, { useState } from 'react';
import { Brain, Send, Loader2 } from 'lucide-react';
import { getAITutorResponse } from '../lib/gemini';
import toast from 'react-hot-toast';

export function AITutor() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const answer = await getAITutorResponse(question);
      setResponse(answer);
    } catch (error) {
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900">AI Tutor</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Ask your question
          </label>
          <div className="relative">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Can you explain quantum computing?"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 p-2 text-blue-600 hover:text-blue-700 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>

      {response && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Answer:</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
}