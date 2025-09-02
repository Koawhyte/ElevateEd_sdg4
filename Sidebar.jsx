import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Search, 
  MessageSquare, 
  Camera, 
  Brain,
  Trophy,
  Download
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'library', label: 'Resource Library', icon: BookOpen },
    { id: 'search', label: 'Search & Filter', icon: Search },
    { id: 'community', label: 'Community Forum', icon: MessageSquare },
    { id: 'lens', label: 'Lens Feature', icon: Camera },
    { id: 'quiz', label: 'Interactive Quiz', icon: Brain },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <nav className="mt-8">
        <div className="px-4 mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Learning Tools
          </h2>
        </div>
        
        <div className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 px-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Download className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Offline Access</span>
            </div>
            <p className="text-xs text-blue-700 mb-3">Download resources for offline study</p>
            <button className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-700 transition-colors">
              Manage Downloads
            </button>
          </div>
        </div>

        <div className="mt-4 px-4">
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Learning Streak</span>
            </div>
            <p className="text-xs text-green-700 mb-2">7 days in a row! 🔥</p>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;