import React, { useState } from 'react';
import { FileText, Loader } from 'lucide-react';
import { generateSummary } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function Summarization() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      const result = await generateSummary(text);
      setSummary(result);
      toast.success('Text summarized successfully!');
    } catch (error) {
      toast.error('Failed to summarize text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">AI Text Summarization</h1>
        <p className="mt-2 text-gray-600">Get concise summaries of your study materials</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Text</h2>
          <form onSubmit={handleSummarize}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Paste your text here..."
            />
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Summarizing...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Summarize Text
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
          {summary ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              Your summary will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}