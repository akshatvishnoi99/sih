import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Target, Award, Activity, BookOpen, Plus, FileText, Eye, Download } from 'lucide-react';
import { schoolAPI } from '../../services/api';

const SchoolDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState('challenge'); // 'challenge' or 'quiz'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'water-conservation',
    points: 100,
    timeLimit: 30,
    difficulty: 'beginner',
    questions: [],
    startDate: '',
    endDate: ''
  });

  // Load school dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await schoolAPI.getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load school dashboard:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  // Prepare stats with real data
  const stats = [
    {
      title: 'Total Students',
      value: dashboardData?.totalStudents?.toLocaleString() || '0',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: `+${dashboardData?.percentageChanges?.totalStudents || 0}%`
    },
    {
      title: 'Active Participants',
      value: dashboardData?.activeParticipants?.toLocaleString() || '0',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: `+${dashboardData?.percentageChanges?.activeParticipants || 0}%`
    },
    {
      title: 'Challenges Completed',
      value: dashboardData?.totalChallengesCompleted?.toLocaleString() || '0',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: `+${dashboardData?.percentageChanges?.totalChallengesCompleted || 0}%`
    },
    {
      title: 'Total Points Earned',
      value: dashboardData?.totalPointsEarned?.toLocaleString() || '0',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      change: `+${dashboardData?.percentageChanges?.totalPointsEarned || 0}%`
    }
  ];

  const topStudents = dashboardData?.topStudents || [];
  const recentActivities = dashboardData?.recentActivities || [];

  const challengeCategories = dashboardData?.challengeCategories || [];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle question changes for quizzes
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      questions: newQuestions
    }));
  };

  // Add new question for quiz
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }]
    }));
  };

  // Remove question from quiz
  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (createType === 'challenge') {
        await schoolAPI.createChallenge(formData);
      } else {
        await schoolAPI.createQuiz(formData);
      }
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        category: 'water-conservation',
        points: 100,
        timeLimit: 30,
        difficulty: 'beginner',
        questions: [],
        startDate: '',
        endDate: ''
      });
      setShowCreateModal(false);
      
      // Refresh dashboard data
      const data = await schoolAPI.getDashboard();
      setDashboardData(data);
      
      alert(`${createType === 'challenge' ? 'Challenge' : 'Quiz'} created successfully!`);
    } catch (error) {
      console.error('Failed to create:', error);
      alert(`Failed to create ${createType}. Please try again.`);
    }
  };

  // Quick action handlers
  const handleCreateChallenge = () => {
    setCreateType('challenge');
    setShowCreateModal(true);
  };

  const handleCreateQuiz = () => {
    setCreateType('quiz');
    setFormData(prev => ({
      ...prev,
      questions: [{
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }]
    }));
    setShowCreateModal(true);
  };

  const handleGenerateReport = async () => {
    try {
      const report = await schoolAPI.generateReport();
      // This would typically trigger a download
      console.log('Report generated:', report);
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  const handleViewAllStudents = () => {
    // This would navigate to a students management page
    console.log('Navigate to students page');
    alert('Students management page would open here');
  };

  const handleExportData = () => {
    // This would export dashboard data
    console.log('Export data');
    alert('Data export would begin here');
  };

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
                const percentage = category.total > 0 ? (category.completed / category.total) * 100 : 0;
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
                const colorClass = colors[index % colors.length];
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-gray-600">{category.completed}/{category.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colorClass} h-2 rounded-full transition-all duration-300`}
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
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => {
                  // Dynamic colors based on activity type
                  const getActivityColor = (type) => {
                    switch (type) {
                      case 'registration': return 'bg-blue-500';
                      case 'participation': return 'bg-green-500';
                      case 'achievement': return 'bg-purple-500';
                      case 'points': return 'bg-yellow-500';
                      case 'leaderboard': return 'bg-orange-500';
                      default: return 'bg-gray-500';
                    }
                  };

                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full mt-2 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">No recent activities</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Activities will appear here as students engage with your school
                  </p>
                </div>
              )}
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
              {topStudents.length > 0 ? (
                topStudents.map((student) => (
                  <div key={student.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        student.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {student.rank}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.grade || 'N/A'}</p>
                        {student.studentIdNumber && student.studentIdNumber !== 'N/A' && (
                          <p className="text-xs text-gray-400">ID: {student.studentIdNumber}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-green-600">
                        {student.ecoPoints?.toLocaleString() || 0} pts
                      </span>
                      <p className="text-xs text-gray-500">
                        {student.challengesCompleted || 0} challenges
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">No students registered yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Students will appear here once they register for your school
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <button 
                onClick={handleCreateChallenge}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create New Challenge
              </button>
              <button 
                onClick={handleCreateQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Create New Quiz
              </button>
              <button 
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Generate Report
              </button>
              <button 
                onClick={handleViewAllStudents}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View All Students
              </button>
              <button 
                onClick={handleExportData}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Challenge/Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create New {createType === 'challenge' ? 'Challenge' : 'Quiz'}
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${createType} title`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Describe the ${createType}...`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="water-conservation">Water Conservation</option>
                      <option value="waste-management">Waste Management</option>
                      <option value="energy-efficiency">Energy Efficiency</option>
                      <option value="sustainable-transport">Sustainable Transport</option>
                      <option value="biodiversity">Biodiversity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                    <input
                      type="number"
                      name="points"
                      value={formData.points}
                      onChange={handleInputChange}
                      min="10"
                      max="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
                    <input
                      type="number"
                      name="timeLimit"
                      value={formData.timeLimit}
                      onChange={handleInputChange}
                      min="5"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Quiz Questions */}
              {createType === 'quiz' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Questions</h3>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Question
                    </button>
                  </div>

                  {formData.questions.map((question, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Question {qIndex + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        placeholder="Enter question..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Options:</label>
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                              className="text-blue-600"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options];
                                newOptions[oIndex] = e.target.value;
                                handleQuestionChange(qIndex, 'options', newOptions);
                              }}
                              placeholder={`Option ${oIndex + 1}...`}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create {createType === 'challenge' ? 'Challenge' : 'Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolDashboard;
