import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { schoolAPI } from '../../services/api';
import { Leaf, User, Building, Globe, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  
  // Role-specific fields
  const [grade, setGrade] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState(''); // Student's personal ID/roll number
  const [ngoId, setNgoId] = useState('');
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(false);

  const { login, register, backendConnected } = useAuth();

  // Load schools when component mounts
  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoadingSchools(true);
        const schoolList = await schoolAPI.getRegisteredSchools();
        setSchools(schoolList);
      } catch (error) {
        console.error('Failed to load schools:', error);
      } finally {
        setLoadingSchools(false);
      }
    };

    loadSchools();
  }, []);

  // Clear role-specific fields when role changes
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setGrade('');
    setSelectedSchoolId('');
    setStudentIdNumber('');
    setNgoId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        // Prepare additional fields based on role
        const additionalFields = {};
        if (role === 'student') {
          if (grade) additionalFields.grade = grade;
          if (selectedSchoolId) additionalFields.studentId = selectedSchoolId; // School they belong to
          if (studentIdNumber) additionalFields.studentIdNumber = studentIdNumber; // Their personal student ID
        } else if (role === 'ngo' && ngoId) {
          additionalFields.ngoId = ngoId;
        }
        // Note: Schools don't need additional fields
        
        await register(name, email, password, role, additionalFields);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'student@example.com', name: 'Demo Student Account' },
    { email: 'school@example.com', name: 'Demo School Account' },
    { email: 'ngo@example.com', name: 'Demo NGO Account' }
  ];

  const fillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setIsRegistering(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-2xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EcoPLay Platform</h1>
          <p className="text-gray-600">Gamified Environmental Education</p>
          {!backendConnected && (
            <div className="mt-3 px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-lg text-sm text-yellow-700">
              ⚠️ Backend connection issue. Some features may not work.
            </div>
          )}
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  !isRegistering ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isRegistering ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection - Only show during registration */}
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'student', label: 'Student', icon: User, color: 'green' },
                    { value: 'school', label: 'School', icon: Building, color: 'blue' },
                    { value: 'ngo', label: 'NGO', icon: Globe, color: 'purple' }
                  ].map(({ value, label, icon: Icon, color }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRoleChange(value)}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                        role === value
                          ? `border-${color}-500 bg-${color}-50 text-${color}-700`
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Name field - Show for all roles during registration */}
            {isRegistering && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {role === 'school' ? 'School Name' : 'Full Name'}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  placeholder={role === 'school' ? 'Enter your school name' : 'Enter your full name'}
                  required={isRegistering}
                />
              </div>
            )}

            {/* Student-specific fields */}
            {isRegistering && role === 'student' && (
              <>
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your School
                  </label>
                  {loadingSchools ? (
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                      Loading schools...
                    </div>
                  ) : (
                    <select
                      id="school"
                      value={selectedSchoolId}
                      onChange={(e) => setSelectedSchoolId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                      required={isRegistering && role === 'student'}
                    >
                      <option value="">Select your school</option>
                      {schools.map((school) => (
                        <option key={school._id} value={school._id}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {schools.length === 0 && !loadingSchools && (
                    <p className="text-sm text-gray-500 mt-1">
                      No schools registered yet. Please ask your school to register first.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="studentIdNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID / Roll Number *
                  </label>
                  <input
                    id="studentIdNumber"
                    type="text"
                    value={studentIdNumber}
                    onChange={(e) => setStudentIdNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your student ID or roll number"
                    required={isRegistering && role === 'student'}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your official student ID or roll number. Your school will use this to verify and approve your account.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                    Grade/Class (Optional)
                  </label>
                  <select
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select your grade</option>
                    <option value="6th">6th Grade</option>
                    <option value="7th">7th Grade</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                    <option value="college">College</option>
                  </select>
                </div>
              </>
            )}

            {/* NGO-specific fields */}
            {isRegistering && role === 'ngo' && (
              <div>
                <label htmlFor="ngoId" className="block text-sm font-medium text-gray-700 mb-2">
                  NGO Registration ID (Optional)
                </label>
                <input
                  id="ngoId"
                  type="text"
                  value={ngoId}
                  onChange={(e) => setNgoId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your NGO registration ID"
                />
              </div>
            )}

            {/* Note: Schools only need name and email - no additional fields */}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {loading 
                ? (isRegistering ? 'Creating Account...' : 'Signing in...') 
                : (isRegistering ? 'Create Account' : 'Sign In')
              }
            </button>
          </form>

          {/* Demo Credentials - Only show for login */}
          {!isRegistering && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Try demo accounts:</p>
              <div className="space-y-2">
                {demoCredentials.map((demo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillDemo(demo.email)}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    {demo.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
