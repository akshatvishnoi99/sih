import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, Target, Award } from 'lucide-react';

const ManageActivitiesPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activities, setActivities] = useState([
    {
      id: '1',
      title: 'Water Conservation Week',
      description: 'Students track daily water usage and implement conservation techniques',
      category: 'Water',
      difficulty: 'medium',
      points: 150,
      startDate: '2024-02-01',
      endDate: '2024-02-07',
      enrolledStudents: 245,
      maxStudents: 300,
      status: 'active'
    },
    {
      id: '2',
      title: 'Plastic-Free Challenge',
      description: 'One-week challenge to eliminate single-use plastics',
      category: 'Waste',
      difficulty: 'easy',
      points: 100,
      startDate: '2024-02-10',
      endDate: '2024-02-16',
      enrolledStudents: 189,
      maxStudents: 250,
      status: 'draft'
    },
    {
      id: '3',
      title: 'Energy Audit Project',
      description: 'Comprehensive home energy audit with improvement recommendations',
      category: 'Energy',
      difficulty: 'hard',
      points: 250,
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      enrolledStudents: 156,
      status: 'completed'
    }
  ]);

  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    category: 'Water',
    difficulty: 'easy',
    points: 100,
    startDate: '',
    endDate: '',
    maxStudents: 200,
    status: 'draft'
  });

  const categories = ['Water', 'Waste', 'Energy', 'Transportation', 'Nature', 'Food'];
  
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  const handleCreateActivity = (e) => {
    e.preventDefault();
    
    const activity = {
      ...newActivity,
      id: Date.now().toString(),
      enrolledStudents: 0
    };

    setActivities([activity, ...activities]);
    setNewActivity({
      title: '',
      description: '',
      category: 'Water',
      difficulty: 'easy',
      points: 100,
      startDate: '',
      endDate: '',
      maxStudents: 200,
      status: 'draft'
    });
    setShowCreateForm(false);
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, status: newStatus } : activity
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Activities</h1>
          <p className="text-gray-600">
            Create and manage environmental challenges and activities for your students.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Activity</span>
        </button>
      </div>

      {/* Create Activity Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleCreateActivity} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Create New Activity</h2>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Title
                  </label>
                  <input
                    type="text"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newActivity.category}
                      onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={newActivity.difficulty}
                      onChange={(e) => setNewActivity({ ...newActivity, difficulty: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Points Reward
                    </label>
                    <input
                      type="number"
                      value={newActivity.points}
                      onChange={(e) => setNewActivity({ ...newActivity, points: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Students
                    </label>
                    <input
                      type="number"
                      value={newActivity.maxStudents}
                      onChange={(e) => setNewActivity({ ...newActivity, maxStudents: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newActivity.startDate}
                      onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newActivity.endDate}
                      onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                >
                  Create Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activities List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Activities</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[activity.difficulty]}`}>
                        {activity.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[activity.status]}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{activity.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{activity.points} points</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {activity.enrolledStudents}
                        {activity.maxStudents && `/${activity.maxStudents}`} students
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Status Change Buttons */}
                  {activity.status === 'draft' && (
                    <button
                      onClick={() => handleStatusChange(activity.id, 'active')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Launch
                    </button>
                  )}
                  
                  {activity.status === 'active' && (
                    <button
                      onClick={() => handleStatusChange(activity.id, 'completed')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    title="Edit Activity"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Delete Activity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar for Active Activities */}
              {activity.status === 'active' && activity.maxStudents && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Enrollment</span>
                    <span>{Math.round((activity.enrolledStudents / activity.maxStudents) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(activity.enrolledStudents / activity.maxStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first environmental challenge to get started.
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Create Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageActivitiesPage;
