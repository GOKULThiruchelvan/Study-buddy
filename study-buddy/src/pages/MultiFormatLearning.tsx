import React, { useState } from 'react';
import { Video, FileText, Headphones, BookOpen } from 'lucide-react';

export default function MultiFormatLearning() {
  const [activeFormat, setActiveFormat] = useState<'text' | 'video' | 'audio'>('text');

  const learningMaterials = {
    text: [
      {
        title: 'Understanding Neural Networks',
        content: 'A comprehensive guide to neural networks and deep learning...',
        readTime: '15 mins',
        difficulty: 'Intermediate'
      },
      {
        title: 'Introduction to Algorithms',
        content: 'Basic concepts and fundamental algorithms in computer science...',
        readTime: '20 mins',
        difficulty: 'Beginner'
      }
    ],
    video: [
      {
        title: 'Data Structures Explained',
        duration: '12:30',
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&h=225',
        difficulty: 'Intermediate'
      },
      {
        title: 'Web Development Basics',
        duration: '15:45',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&h=225',
        difficulty: 'Beginner'
      }
    ],
    audio: [
      {
        title: 'Physics Concepts Explained',
        duration: '25:00',
        type: 'Podcast',
        difficulty: 'Advanced'
      },
      {
        title: 'History of Computing',
        duration: '18:30',
        type: 'Audiobook',
        difficulty: 'Beginner'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Multi-Format Learning</h1>
        <p className="mt-2 text-gray-600">Learn through different media formats</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveFormat('text')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeFormat === 'text'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="h-5 w-5 mr-2" />
            Text
          </button>
          <button
            onClick={() => setActiveFormat('video')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeFormat === 'video'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Video className="h-5 w-5 mr-2" />
            Video
          </button>
          <button
            onClick={() => setActiveFormat('audio')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeFormat === 'audio'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Headphones className="h-5 w-5 mr-2" />
            Audio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeFormat === 'text' && learningMaterials.text.map((material, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{material.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{material.content}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {material.readTime}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                      {material.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {activeFormat === 'video' && learningMaterials.video.map((material, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
              <img src={material.thumbnail} alt={material.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{material.title}</h3>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {material.duration}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                    {material.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {activeFormat === 'audio' && learningMaterials.audio.map((material, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <Headphones className="h-5 w-5 text-blue-600" />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{material.title}</h3>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {material.duration}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      {material.type}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                      {material.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}