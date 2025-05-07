
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'intern';
  password: string; // Normally, this would be hashed
  avatar?: string;
  university?: string;
  field?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  internId: string;
  timestamp: string;
  reportDate: string;
  reportLinks: string[];
  createdAt: string;
}

export interface InternStats {
  totalReports: number;
  submittedThisWeek: number;
  lastSubmission?: string;
  submissionRate: number;
}

export interface Field {
  id: string;
  name: string;
}

export type University = string;

export interface LoginCredentials {
  email: string;
  password: string;
}

// New interface for user registration
export interface RegisterUserData {
  name: string;
  email: string;
  university?: string;
  field?: string;
  role: 'admin' | 'intern';
}
