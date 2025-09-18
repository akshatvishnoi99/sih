import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { studentAPI } from '../../services/api';
import { Trophy, Award, Calendar, TrendingUp, Target, Brain, Star } from 'lucide-react';

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [activityHistory, setActivityHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch detailed profile and activity data
  useEffect(() => {
    const fetchProfileAndActivity = async () => {
      try {
        setLoading(true);
        
        // Fetch detailed student profile
        const profileResponse = await studentAPI.getProfile();
        setUser(profileResponse.profile);
        
        // Fetch activity data
        const activityResponse = await studentAPI.getActivity(8); // Get last 8 activities
        setActivityHistory(activityResponse.activities || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching profile/activity data:', err);
        setError('Failed to load profile data');
        // Fallback to auth user and empty activity if API fails
        setUser(authUser);
        setActivityHistory([]);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchProfileAndActivity();
    }
  }, [authUser]);

  // Mock additional data - these could also be made dynamic later
  const achievements = [
    { id: '1', name: 'First Steps', description: 'Completed your first challenge', icon: '👣', earnedAt: '2025-01-10' },
    { id: '2', name: 'Eco Warrior', description: 'Completed 10 challenges', icon: '🌱', earnedAt: '2025-01-15' },
    { id: '3', name: 'Quiz Master', description: 'Scored 100% on 5 quizzes', icon: '🧠', earnedAt: '2025-01-20' },
    { id: '4', name: 'Water Guardian', description: 'Completed all water conservation challenges', icon: '💧', earnedAt: '2025-01-18' },
    { id: '5', name: 'Green Streak', description: 'Completed challenges for 7 consecutive days', icon: '🔥', earnedAt: '2025-01-22' },
    { id: '6', name: 'Knowledge Seeker', description: 'Completed 5 different quiz categories', icon: '📚', earnedAt: '2025-01-25' }
  ];

  const stats = [
    { label: 'Total Points', value: user?.ecoPoints?.toLocaleString() || '0', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Challenges Completed', value: user?.challengesCompleted?.toString() || '0', icon: Target, color: 'text-green-600' },
    { label: 'Quizzes Taken', value: user?.quizzesTaken?.toString() || '0', icon: Brain, color: 'text-blue-600' },
    { label: 'Badges Earned', value: user?.badges?.length?.toString() || '0', icon: Award, color: 'text-purple-600' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'challenge':
        return Target;
      case 'quiz':
        return Brain;
      default:
        return Star;
    }
  };

  // Use real joining date from user profile, fallback to current date if not available
  const joinDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const daysActive = Math.floor((new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  // Show loading state while fetching profile
  if (loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-48 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-200 rounded-xl h-64"></div>
              <div className="bg-gray-200 rounded-xl h-96"></div>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-200 rounded-xl h-64"></div>
              <div className="bg-gray-200 rounded-xl h-48"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {user?.name.charAt(0)}
            </span>
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
            <p className="text-green-100 mb-4">{user?.email}</p>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {joinDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>{daysActive} days active</span>
              </div>
            </div>
          </div>

          {/* Points Display */}
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">
                {user?.ecoPoints?.toLocaleString()}
              </div>
              <div className="text-green-100 text-sm">Eco Points</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            
            {error ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">⚠️ {error}</div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Try again
                </button>
              </div>
            ) : activityHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">📝 No recent activity</div>
                <p className="text-sm text-gray-400">Complete challenges and quizzes to see your activity here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activityHistory.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">
                          {activity.type === 'challenge' ? 'Challenge' : 'Quiz'} • {new Date(activity.date).toLocaleDateString()}
                          {activity.score && ` • ${activity.score}% score`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <Trophy className="h-4 w-4" />
                        <span className="font-semibold">+{activity.points}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Badges & Achievements */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Badges & Achievements</h2>
            <div className="space-y-4">
              {user?.badges && user.badges.length > 0 ? (
                user.badges.map((badge) => (
                  <div key={badge.id} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{badge.name}</h3>
                      <p className="text-xs text-gray-600 mb-1">{badge.description}</p>
                      <p className="text-xs text-yellow-700">
                        Earned {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No badges earned yet</p>
                  <p className="text-sm">Complete challenges and quizzes to earn your first badge!</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Overview</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>Challenges</span>
                  <span>{user?.challengesCompleted || 0}/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(((user?.challengesCompleted || 0) / 20) * 100, 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>Quizzes</span>
                  <span>{user?.quizzesTaken || 0}/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(((user?.quizzesTaken || 0) / 15) * 100, 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>Badges</span>
                  <span>{user?.badges?.length || 0}/12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${Math.min(((user?.badges?.length || 0) / 12) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
