import React, { useState } from 'react';
import { Search, Book, Link as LinkIcon, Download, ExternalLink } from 'lucide-react';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const resources = [
    {
      title: 'Introduction to Machine Learning',
      type: 'Course',
      source: 'MIT OpenCourseWare',
      url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-867-machine-learning-fall-2006/',
      icon: Book
    },
    {
      title: 'Advanced Mathematics for Engineers',
      type: 'PDF',
      source: 'Stanford University',
      url: 'https://stanford.edu/class/ee103/lectures.html',
      icon: Download
    },
    {
      title: 'Physics Video Lectures',
      type: 'Video',
      source: 'Khan Academy',
      url: 'https://www.khanacademy.org/science/physics',
      icon: ExternalLink
    }
  ];

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Academic Resources</h1>
        <p className="mt-2 text-gray-600">Access curated learning materials and references</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search resources..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <resource.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.source}</p>
                  <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {resource.type}
                  </span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Access Resource
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}