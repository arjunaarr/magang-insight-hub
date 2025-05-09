
import { User, Report, Field, InternStats } from '@/types';

// Mock users (admin and interns)
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin Utama',
    email: 'admin@magangsemarang.id',
    password: 'admin123',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 'intern-1',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    password: 'password123',
    role: 'intern',
    university: 'Universitas Diponegoro',
    field: 'Teknologi Informasi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    createdAt: '2023-03-15T00:00:00.000Z'
  },
  {
    id: 'intern-2',
    name: 'Siti Aisyah',
    email: 'siti@example.com',
    password: 'password123',
    role: 'intern',
    university: 'Universitas Negeri Semarang',
    field: 'Hubungan Masyarakat',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
    createdAt: '2023-03-20T00:00:00.000Z'
  },
  {
    id: 'intern-3',
    name: 'Rudi Hermawan',
    email: 'rudi@example.com',
    password: 'password123',
    role: 'intern',
    university: 'Politeknik Negeri Semarang',
    field: 'Desain Grafis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi',
    createdAt: '2023-04-05T00:00:00.000Z'
  },
  {
    id: 'intern-4',
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    password: 'password123',
    role: 'intern',
    university: 'Universitas Diponegoro',
    field: 'Administrasi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi',
    createdAt: '2023-04-10T00:00:00.000Z'
  }
];

// Mock reports
export const mockReports: Report[] = [
  {
    id: 'report-1',
    internId: 'intern-1',
    timestamp: '2023-06-01 09:30:45',
    reportDate: '2023-06-01',
    reportPhotos: [
      'https://placehold.co/600x400/png?text=Report+Photo+1',
      'https://placehold.co/600x400/png?text=Report+Photo+2'
    ],
    createdAt: '2023-06-01T09:30:45.000Z'
  },
  {
    id: 'report-2',
    internId: 'intern-1',
    timestamp: '2023-06-02 10:15:30',
    reportDate: '2023-06-02',
    reportPhotos: [
      'https://placehold.co/600x400/png?text=Report+Photo+1'
    ],
    createdAt: '2023-06-02T10:15:30.000Z'
  },
  {
    id: 'report-3',
    internId: 'intern-2',
    timestamp: '2023-06-01 08:45:12',
    reportDate: '2023-06-01',
    reportPhotos: [
      'https://placehold.co/600x400/png?text=Report+Photo+1',
      'https://placehold.co/600x400/png?text=Report+Photo+2',
      'https://placehold.co/600x400/png?text=Report+Photo+3'
    ],
    createdAt: '2023-06-01T08:45:12.000Z'
  },
  {
    id: 'report-4',
    internId: 'intern-3',
    timestamp: '2023-06-01 11:20:05',
    reportDate: '2023-06-01',
    reportPhotos: [
      'https://placehold.co/600x400/png?text=Report+Photo+1'
    ],
    createdAt: '2023-06-01T11:20:05.000Z'
  },
  {
    id: 'report-5',
    internId: 'intern-3',
    timestamp: '2023-06-02 10:30:45',
    reportDate: '2023-06-02',
    reportPhotos: [
      'https://placehold.co/600x400/png?text=Report+Photo+1',
      'https://placehold.co/600x400/png?text=Report+Photo+2'
    ],
    createdAt: '2023-06-02T10:30:45.000Z'
  },
  {
    id: 'report-6',
    internId: 'intern-4',
    timestamp: '2023-06-01 13:40:22',
    reportDate: '2023-06-01',
    reportPhotos: [
      'https://placehold.co/600x400/png?text=Report+Photo+1',
      'https://placehold.co/600x400/png?text=Report+Photo+2'
    ],
    createdAt: '2023-06-01T13:40:22.000Z'
  }
];

// Mock fields/departments
export const mockFields: Field[] = [
  { id: 'field-1', name: 'Teknologi Informasi' },
  { id: 'field-2', name: 'Hubungan Masyarakat' },
  { id: 'field-3', name: 'Desain Grafis' },
  { id: 'field-4', name: 'Administrasi' },
  { id: 'field-5', name: 'Keuangan' }
];

// Mock universities
export const mockUniversities: string[] = [
  'Universitas Diponegoro',
  'Universitas Negeri Semarang',
  'Politeknik Negeri Semarang',
  'Universitas Dian Nuswantoro',
  'Universitas Islam Sultan Agung',
  'Universitas Katolik Soegijapranata'
];

// Function to get intern stats
export const getInternStats = (internId: string): InternStats => {
  const internReports = mockReports.filter(report => report.internId === internId);
  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const reportsThisWeek = internReports.filter(report => {
    const reportDate = new Date(report.createdAt);
    return reportDate >= oneWeekAgo && reportDate <= today;
  });
  
  let lastSubmission = null;
  if (internReports.length > 0) {
    // Get the most recent report
    const latestReport = [...internReports].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
    lastSubmission = latestReport.createdAt;
  }
  
  // Calculate submission rate (as percentage of days covered)
  const startDate = new Date(mockUsers.find(user => user.id === internId)?.createdAt || today);
  const daysSinceStart = Math.max(1, Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const submissionRate = (internReports.length / daysSinceStart) * 100;
  
  return {
    totalReports: internReports.length,
    submittedThisWeek: reportsThisWeek.length,
    lastSubmission,
    submissionRate: Math.min(100, submissionRate) // Cap at 100%
  };
};
