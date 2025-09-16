import React, { useState } from 'react';
import { Target, Clock, Award, Filter, Search } from 'lucide-react';

const ChallengesPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const challenges = [
    {
      id: '1',
      title: 'Water Conservation Week',
      description: 'Track your daily water usage and implement conservation techniques for a full week',
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
    },
    {
      id: '3',
      title: 'Energy Audit Challenge',
      description: 'Conduct a comprehensive energy audit of your home and implement 5 improvements',
      points: 250,
      difficulty: 'hard',
      category: 'Energy',
      status: 'available'
    },
    {
      id: '4',
      title: 'Green Transportation Month',
      description: 'Use eco-friendly transportation methods for an entire month',
      points: 300,
      difficulty: 'hard',
      category: 'Transportation',
      status: 'available'
    },
    {
      id: '5',
      title: 'Urban Garden Starter',
      description: 'Create a small urban garden with at least 3 different plants',
      points: 200,
      difficulty: 'medium',
      category: 'Nature',
      status: 'available'
    },
    {
      id: '6',
      title: 'Eco-Friendly Meal Prep',
      description: 'Plan and prepare sustainable meals for a week using local ingredients',
      points: 120,
      difficulty: 'easy',
      category: 'Food',
      status: 'in-progress',
      progress: 40
    }
  ];

  const categories = ['all', 'Water', 'Waste', 'Energy', 'Transportation', 'Nature', 'Food'];

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    available: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800'
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesFilter = filter === 'all' || challenge.status === filter;
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;

    return matchesFilter && matchesSearch && matchesCategory;
  });

  const handleStartChallenge = (challengeId) => {
    console.log('Starting challenge:', challengeId);
    // In a real app, this would update the challenge status
  };

  const handleContinueChallenge = (challengeId) => {
    console.log('Continuing challenge:', challengeId);
    // In a real app, this would navigate to challenge details
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Eco Challenges</h1>
        <p className="text-gray-600">
          Take on challenges to earn points, learn new skills, and make a positive environmental impact!
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Challenges</option>
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}`}
                  >
                    {challenge.difficulty}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[challenge.status]}`}
                  >
                    {challenge.status.replace('-', ' ')}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {challenge.category}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-1 text-green-600 mb-2">
                  <Award className="h-4 w-4" />
                  <span className="font-semibold">{challenge.points}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar (for in-progress challenges) */}
            {challenge.status === 'in-progress' && challenge.progress !== undefined && (
              <div className="mb-4">
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

            {/* Action Button */}
            <div className="flex justify-end">
              {challenge.status === 'available' && (
                <button
                  onClick={() => handleStartChallenge(challenge.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <Target className="h-4 w-4" />
                  <span>Start Challenge</span>
                </button>
              )}

              {challenge.status === 'in-progress' && (
                <button
                  onClick={() => handleContinueChallenge(challenge.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4" />
                  <span>Continue</span>
                </button>
              )}

              {challenge.status === 'completed' && (
                <div className="flex items-center text-green-600 font-medium">
                  <Award className="h-4 w-4 mr-2" />
                  <span>Completed!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find more challenges.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
