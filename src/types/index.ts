export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'school' | 'ngo';
  avatar?: string;
  ecoPoints?: number;
  badges?: Badge[];
  schoolId?: string;
  ngoId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  status: 'available' | 'in-progress' | 'completed';
  completedAt?: string;
  progress?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  totalPoints: number;
  completedAt?: string;
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  ngoId: string;
  startDate: string;
  endDate: string;
  targetParticipants: number;
  currentParticipants: number;
  status: 'active' | 'completed' | 'upcoming';
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  ecoPoints: number;
  rank: number;
  avatar?: string;
}