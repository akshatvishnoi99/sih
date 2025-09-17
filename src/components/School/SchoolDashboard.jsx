import React from 'react';
import { Users, TrendingUp, Target, Award, Activity, BookOpen } from 'lucide-react';

const SchoolDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '+8.5%'
    },
    {
      title: 'Active Participants',
      value: '892',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: '+12.3%'
    },
    {
      title: 'Challenges Completed',
      value: '3,451',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: '+15.8%'
    },
    {
      title: 'Total Points Earned',
      value: '487,230',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      change: '+18.2%'
    }
  ];

  const topStudents = [
    { name: 'Raman', points: 2450, rank: 1, grade: '10th' },
    { name: 'Rahul Sharma', points: 2380, rank: 2, grade: '11th' },
    { name: 'Maya Patel', points: 2200, rank: 3, grade: '9th' },
    { name:'Sameer Kumar', points: 1980, rank: 4, grade: '12th' },
    { name: 'Anup Pandey', points: 1750, rank: 5, grade: '10th' }
  ];

  const recentActivities = [
    {
      id: '1',
      title: 'Water Conservation Week Challenge Launched',
      description: '245 students have enrolled',
      time: '2 hours ago',
      type: 'challenge'
    },
    {
      id: '2',
      title: 'Climate Change Quiz Results',
      description: 'Average score: 87% across 156 participants',
      time: '4 hours ago',
      type: 'quiz'
    },
    {
      id: '3',
      title: 'New Partnership with EcoFuture NGO',
      description: 'Green Transportation Campaign starting next week',
      time: '1 day ago',
      type: 'partnership'
    },
    {
      id: '4',
      title: 'Monthly Eco-Points Report Generated',
      description: 'Total points increased by 18.2% this month',
      time: '2 days ago',
      type: 'report'
    }
  ];

  const challengeCategories = [
    { name: 'Water Conservation', completed: 156, total: 200, color: 'bg-blue-500' },
    { name: 'Waste Reduction', completed: 134, total: 180, color: 'bg-green-500' },
    { name: 'Energy Saving', completed: 98, total: 150, color: 'bg-yellow-500' },
    { name: 'Transportation', completed: 67, total: 120, color: 'bg-purple-500' },
    { name: 'Biodiversity', completed: 45, total: 90, color: 'bg-pink-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">School Dashboard</h1>
        <p className="text-gray-600">
          Monitor student engagement and track environmental education progress across your institution.
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
                  <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charts and Activities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Challenge Categories Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Challenge Categories</h2>
              <BookOpen className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="space-y-4">
              {challengeCategories.map((category, index) => {
                const percentage = (category.completed / category.total) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-gray-600">{category.completed}/{category.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <Activity className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Students</h2>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            
            <div className="space-y-4">
              {topStudents.map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      student.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {student.rank}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.grade} Grade</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {student.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                Create New Challenge
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                Generate Report
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                View All Students
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg font-medium transition-colors duration-200 text-sm">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
