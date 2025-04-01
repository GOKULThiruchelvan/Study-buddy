import React, { useState } from 'react';
import { BookOpen, RefreshCw, Loader2 } from 'lucide-react';
import { generateFlashcards } from '../lib/gemini';
import toast from 'react-hot-toast';

interface Flashcard {
  question: string;
  answer: string;
}

export function Flashcards() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const cards = await generateFlashcards(topic);
      setFlashcards(cards);
      setCurrentCard(0);
      setShowAnswer(false);
    } catch (error) {
      toast.error('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold text-gray-900">Flashcards</h2>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Enter a topic
          </label>
          <div className="relative">
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="e.g., JavaScript Promises"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 p-2 text-green-600 hover:text-green-700 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>

      {flashcards.length > 0 && (
        <div className="mt-6">
          <div
            className="bg-gray-50 rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <p className="text-gray-800 text-center font-medium">
              {showAnswer ? flashcards[currentCard].answer : flashcards[currentCard].question}
            </p>
            <p className="text-sm text-gray-500 mt-4">Click to {showAnswer ? 'show question' : 'reveal answer'}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Card {currentCard + 1} of {flashcards.length}
            </p>
            <button
              onClick={nextCard}
              className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700"
            >
              Next Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}