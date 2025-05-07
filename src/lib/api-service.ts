
import { mockUsers, mockReports, mockFields, mockUniversities, getInternStats } from './mock-data';
import { User, Report, Field, RegisterUserData } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth related APIs
  auth: {
    login: async (email: string, password: string) => {
      await delay(800); // Simulate API delay
      const user = mockUsers.find(u => u.email === email && u.password === password);
      return user || null;
    },
    
    resetPassword: async (userId: string, currentPassword: string, newPassword: string) => {
      await delay(800);
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      
      if (mockUsers[userIndex].password !== currentPassword) {
        throw new Error("Current password is incorrect");
      }
      
      // In a real app, this would hash the password
      mockUsers[userIndex].password = newPassword;
      
      return true;
    }
  },
  
  // Admin APIs
  admin: {
    getAllInterns: async () => {
      await delay(500);
      return mockUsers.filter(user => user.role === 'intern');
    },
    
    getAllReports: async () => {
      await delay(500);
      return mockReports;
    },
    
    getInternById: async (id: string) => {
      await delay(300);
      return mockUsers.find(user => user.id === id && user.role === 'intern') || null;
    },
    
    getReportsByInternId: async (internId: string) => {
      await delay(300);
      return mockReports.filter(report => report.internId === internId);
    },
    
    getFields: async () => {
      await delay(200);
      return mockFields;
    },
    
    getUniversities: async () => {
      await delay(200);
      return mockUniversities;
    },
    
    getInternStats: async (internId: string) => {
      await delay(300);
      return getInternStats(internId);
    },
    
    getAllInternsStats: async () => {
      await delay(500);
      const interns = mockUsers.filter(user => user.role === 'intern');
      return interns.map(intern => ({
        intern,
        stats: getInternStats(intern.id)
      }));
    },
    
    getDashboardSummary: async () => {
      await delay(600);
      const interns = mockUsers.filter(user => user.role === 'intern');
      const totalInterns = interns.length;
      const totalReports = mockReports.length;
      
      const today = new Date();
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const reportsThisWeek = mockReports.filter(report => {
        const reportDate = new Date(report.createdAt);
        return reportDate >= oneWeekAgo && reportDate <= today;
      });
      
      const activeInterns = new Set(reportsThisWeek.map(report => report.internId)).size;
      
      return {
        totalInterns,
        totalReports,
        activeInterns,
        reportsThisWeek: reportsThisWeek.length,
        submissionRate: totalInterns > 0 ? (activeInterns / totalInterns) * 100 : 0
      };
    },
    
    registerIntern: async (userData: RegisterUserData) => {
      await delay(800);
      
      const newUser: User = {
        id: `intern-${mockUsers.length + 1}`,
        name: userData.name,
        email: userData.email,
        role: 'intern',
        password: 'magang123', // Default password, in a real app this would be hashed
        university: userData.university,
        field: userData.field,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`, // Generate avatar
        createdAt: new Date().toISOString()
      };
      
      // In a real app, this would be stored in a database
      mockUsers.push(newUser);
      
      return newUser;
    },
    
    // Get submission status of interns
    getSubmissionStatus: async () => {
      await delay(500);
      const interns = mockUsers.filter(user => user.role === 'intern');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      return interns.map(intern => {
        const lastReport = mockReports
          .filter(report => report.internId === intern.id)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        
        const lastReportDate = lastReport ? new Date(lastReport.createdAt) : null;
        lastReportDate?.setHours(0, 0, 0, 0); // Start of report day
        
        const hasSubmittedToday = lastReportDate?.getTime() === today.getTime();
        
        return {
          intern,
          hasSubmitted: hasSubmittedToday,
          lastSubmission: lastReport?.createdAt || null
        };
      });
    }
  },
  
  // Intern APIs
  intern: {
    getProfile: async (id: string) => {
      await delay(300);
      return mockUsers.find(user => user.id === id && user.role === 'intern') || null;
    },
    
    getMyReports: async (internId: string) => {
      await delay(400);
      return mockReports.filter(report => report.internId === internId);
    },
    
    submitReport: async (internId: string, reportDate: string, reportLinks: string[]) => {
      await delay(800);
      
      const newReport: Report = {
        id: `report-${mockReports.length + 1}`,
        internId,
        timestamp: new Date().toLocaleString(),
        reportDate,
        reportLinks,
        createdAt: new Date().toISOString()
      };
      
      // In a real app, this would be stored in a database
      mockReports.push(newReport);
      
      return newReport;
    },
    
    updateProfile: async (userId: string, profileData: Partial<User>) => {
      await delay(600);
      
      const userIndex = mockUsers.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      
      // Update user data (excluding sensitive fields like role)
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        name: profileData.name || mockUsers[userIndex].name,
        email: profileData.email || mockUsers[userIndex].email,
        avatar: profileData.avatar || mockUsers[userIndex].avatar,
        university: profileData.university || mockUsers[userIndex].university,
        field: profileData.field || mockUsers[userIndex].field,
      };
      
      return mockUsers[userIndex];
    }
  }
};
