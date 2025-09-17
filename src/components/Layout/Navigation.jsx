import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Target, 
  Brain, 
  User, 
  Users, 
  BarChart3, 
  Settings, 
  Globe, 
  FileText,
  LogOut,
  Leaf
} from 'lucide-react';

const Navigation = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'challenges', label: 'Challenges', icon: Target },
          { id: 'quizzes', label: 'Quizzes', icon: Brain },
          { id: 'profile', label: 'Profile', icon: User }
        ];
      case 'school':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'activities', label: 'Manage Activities', icon: Settings },
          { id: 'reports', label: 'Reports', icon: BarChart3 }
        ];
      case 'ngo':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'campaigns', label: 'Campaigns', icon: Globe },
          { id: 'resources', label: 'Resources', icon: FileText }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EcoPlay</h1>
              <p className="text-xs text-green-600 capitalize">{user?.role} Portal</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user?.role === 'student' && (
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">
                  {user.ecoPoints?.toLocaleString()} points
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-green-100">
          <div className="flex justify-around py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-green-700 bg-green-50'
                      : 'text-gray-600 hover:text-green-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
