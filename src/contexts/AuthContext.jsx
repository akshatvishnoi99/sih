import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@student.edu',
    role: 'student',
    ecoPoints: 2450,
    badges: [
      { id: '1', name: 'Eco Warrior', description: 'Completed 10 challenges', icon: '🌱', earnedAt: '2025-01-15' },
      { id: '2', name: 'Quiz Master', description: 'Scored 100% on 5 quizzes', icon: '🧠', earnedAt: '2025-01-20' }
    ]
  },
  {
    id: '2',
    name: 'XYZ Public School',
    email: 'admin@xyz.edu',
    role: 'school',
    schoolId: 'school-1'
  },
  {
    id: '3',
    name: 'EcoFuture NGO',
    email: 'contact@ecofuture.org',
    role: 'ngo',
    ngoId: 'ngo-1'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('eco-platform-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);

    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('eco-platform-user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }

    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eco-platform-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
