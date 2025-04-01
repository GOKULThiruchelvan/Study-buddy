import React, { useState } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { getAnswerWithContext } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function QuestionAnswering() {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const result = await getAnswerWithContext(question, context);
      setAnswer(result);
      toast.success('Answer generated successfully!');
    } catch (error) {
      toast.error('Failed to generate answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">AI Question Answering</h1>
        <p className="mt-2 text-gray-600">Get detailed answers to your academic questions</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ask a Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                Context (Optional)
              </label>
              <textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full h-32 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add relevant context or background information..."
              />
            </div>
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., What is quantum entanglement?"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Generating Answer...
                </>
              ) : (
                <>
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Get Answer
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Answer</h2>
          {answer ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              Your answer will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}