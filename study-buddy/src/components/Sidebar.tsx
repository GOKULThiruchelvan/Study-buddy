import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  FileText,
  HelpCircle,
  Library,
  Film,
  Users,
  BarChart2,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Study Plan', icon: Calendar, path: '/study-plan' },
  { name: 'Summarization', icon: FileText, path: '/summarize' },
  { name: 'Ask Questions', icon: HelpCircle, path: '/ask' },
  { name: 'Resources', icon: Library, path: '/resources' },
  { name: 'Multi-Format', icon: Film, path: '/multi-format' },
  { name: 'Collaborate', icon: Users, path: '/collaborate' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' }
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}