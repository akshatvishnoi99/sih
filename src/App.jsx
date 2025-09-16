import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Navigation from './components/Layout/Navigation';

// Student Components
import StudentDashboard from './components/Student/StudentDashboard';
import ChallengesPage from './components/Student/ChallengesPage';
import QuizzesPage from './components/Student/QuizzesPage';
import ProfilePage from './components/Student/ProfilePage';

// School Components
import SchoolDashboard from './components/School/SchoolDashboard';
import ManageActivitiesPage from './components/School/ManageActivitiesPage';

// NGO Components
import NGODashboard from './components/NGO/NGODashboard';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderPage = () => {
    switch (user.role) {
      case 'student':
        switch (currentPage) {
          case 'dashboard':
            return <StudentDashboard />;
          case 'challenges':
            return <ChallengesPage />;
          case 'quizzes':
            return <QuizzesPage />;
          case 'profile':
            return <ProfilePage />;
          default:
            return <StudentDashboard />;
        }

      case 'school':
        switch (currentPage) {
          case 'dashboard':
            return <SchoolDashboard />;
          case 'activities':
            return <ManageActivitiesPage />;
          case 'reports':
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports</h1>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-gray-600">Reports functionality coming soon...</p>
                </div>
              </div>
            );
          default:
            return <SchoolDashboard />;
        }

      case 'ngo':
        switch (currentPage) {
          case 'dashboard':
            return <NGODashboard />;
          case 'campaigns':
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Campaign Management</h1>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-gray-600">Campaign management functionality coming soon...</p>
                </div>
              </div>
            );
          case 'resources':
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Resources</h1>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-gray-600">Resource management functionality coming soon...</p>
                </div>
              </div>
            );
          default:
            return <NGODashboard />;
        }

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
