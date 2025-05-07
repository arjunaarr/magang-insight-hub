
import { mockUsers, mockReports, mockFields, mockUniversities, getInternStats } from './mock-data';
import { User, Report, Field } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Auth related APIs
  auth: {
    login: async (email: string, password: string) => {
      await delay(800); // Simulate API delay
      const user = mockUsers.find(u => u.email === email && u.password === password);
      return user || null;
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
    }
  }
};
