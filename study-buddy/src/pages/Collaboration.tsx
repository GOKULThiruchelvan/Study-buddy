import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, UserPlus, Search } from 'lucide-react';
import { getPeerRecommendations } from '../lib/gemini';
import toast from 'react-hot-toast';

export default function Collaboration() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const studyGroups = [
    {
      id: 1,
      name: 'Machine Learning Study Group',
      members: 8,
      nextMeeting: '2024-03-15T15:00:00',
      topics: ['Neural Networks', 'Deep Learning', 'Python'],
    },
    {
      id: 2,
      name: 'Web Development Workshop',
      members: 12,
      nextMeeting: '2024-03-16T18:00:00',
      topics: ['React', 'Node.js', 'TypeScript'],
    },
    {
      id: 3,
      name: 'Data Structures & Algorithms',
      members: 6,
      nextMeeting: '2024-03-17T14:00:00',
      topics: ['Arrays', 'Trees', 'Dynamic Programming'],
    },
  ];

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinGroup = (groupId: number) => {
    toast.success('Request sent to join the group!');
  };

  const handleCreateGroup = () => {
    toast.success('New study group created!');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Collaboration Hub</h1>
        <p className="mt-2 text-gray-600">Connect with peers and join study groups</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Study Groups</h2>
              <button
                onClick={handleCreateGroup}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Create Group
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search study groups..."
              />
            </div>

            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <div key={group.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{group.name}</h3>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{group.members} members</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          Next meeting: {new Date(group.nextMeeting).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                    >
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Discussions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Discussion Topic {i}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Latest message in the discussion...
                  </p>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>{Math.floor(Math.random() * 10) + 1} messages</span>
                    <span className="mx-1">•</span>
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}