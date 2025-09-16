import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Trophy, Target, Brain, TrendingUp, Award, Users } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  // Mock data
  const recentChallenges = [
    {
      id: '1',
      title: 'Water Conservation Week',
      description: 'Track your daily water usage and implement conservation techniques',
      points: 150,
      difficulty: 'medium',
      category: 'Water',
      status: 'completed',
      completedAt: '2024-01-20',
      progress: 100
    },
    {
      id: '2',
      title: 'Plastic-Free Day',
      description: 'Go one full day without using single-use plastics',
      points: 100,
      difficulty: 'easy',
      category: 'Waste',
      status: 'in-progress',
      progress: 75
    }
  ];

  const leaderboard = [
    { userId: '2', name: 'Alex Chen', ecoPoints: 2850, rank: 1 },
    { userId: '1', name: 'Emma Green', ecoPoints: 2450, rank: 2 },
    { userId: '3', name: 'Maya Patel', ecoPoints: 2200, rank: 3 },
    { userId: '4', name: 'Sam Johnson', ecoPoints: 1980, rank: 4 },
    { userId: '5', name: 'Zoe Williams', ecoPoints: 1750, rank: 5 }
  ];

  const stats = [
    {
      title: 'Total Eco-Points',
      value: user?.ecoPoints?.toLocaleString() || '0',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Challenges Completed',
      value: '12',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Quizzes Passed',
      value: '8',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Current Rank',
      value: '#2',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 🌱
        </h1>
        <p className="text-gray-600">
          Keep up the great work protecting our planet. You're making a real difference!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 transition-transform duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Challenges */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Challenges</h2>
              <Target className="h-5 w-5 text-green-600" />
            </div>
            
            <div className="space-y-4">
              {recentChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">+{challenge.points} points</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        challenge.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {challenge.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                  
                  {challenge.status !== 'completed' && challenge.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Latest Badges</h3>
              <Award className="h-5 w-5 text-yellow-600" />
            </div>
            
            <div className="space-y-3">
              {user?.badges?.slice(0, 3).map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{badge.name}</p>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((entry) => (
                <div 
                  key={entry.userId} 
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    entry.userId === user?.id ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      entry.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {entry.rank}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {entry.name} {entry.userId === user?.id && '(You)'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {entry.ecoPoints.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
