
import { User, Report, Field } from "@/types";

export const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    password: "admin123", // In a real app, this would be hashed
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    createdAt: new Date(2023, 0, 1).toISOString(),
  },
  {
    id: "intern-1",
    name: "Hannisa Ada Fitria",
    email: "hannisa@example.com",
    role: "intern",
    password: "intern123",
    university: "Universitas Gadjah Mada",
    field: "Bidang 4 - Pengelolaan Infrastruktur",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hannisa",
    createdAt: new Date(2023, 1, 15).toISOString(),
  },
  {
    id: "intern-2",
    name: "Chantika Mutiara Pratami",
    email: "chantika@example.com",
    role: "intern",
    password: "intern123",
    university: "Universitas Negeri Semarang",
    field: "Bidang 2 - Sistem Pemerintahan Berbasis Elektronik",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chantika",
    createdAt: new Date(2023, 2, 5).toISOString(),
  },
  {
    id: "intern-3",
    name: "Syiffa Dea Rizkiansyah",
    email: "syiffa@example.com",
    role: "intern",
    password: "intern123",
    university: "Universitas Negeri Semarang",
    field: "Bidang 2 - Sistem Pemerintahan Berbasis Elektronik",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Syiffa",
    createdAt: new Date(2023, 3, 10).toISOString(),
  },
  {
    id: "intern-4",
    name: "Haikal Rijaldi Hidayat P.",
    email: "haikal@example.com",
    role: "intern",
    password: "intern123",
    university: "Universitas Negeri Semarang",
    field: "Bidang 2 - Sistem Pemerintahan Berbasis Elektronik",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haikal",
    createdAt: new Date(2023, 4, 20).toISOString(),
  },
  {
    id: "intern-5",
    name: "Anugrah Ridho Afriadi",
    email: "anugrah@example.com",
    role: "intern",
    password: "intern123",
    university: "UNIVERSITAS NEGERI SEMARANG",
    field: "Bidang 2 - Sistem Pemerintahan Berbasis Elektronik",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anugrah",
    createdAt: new Date(2023, 5, 1).toISOString(),
  }
];

export const mockReports: Report[] = [
  {
    id: "report-1",
    internId: "intern-1",
    timestamp: "06/05/2025 11:15:59",
    reportDate: "06/05/2025",
    reportLinks: [
      "https://drive.google.com/file1",
      "https://drive.google.com/file2",
      "https://drive.google.com/file3",
      "https://drive.google.com/file4",
      "https://drive.google.com/file5"
    ],
    createdAt: new Date(2025, 4, 6, 11, 15, 59).toISOString(),
  },
  {
    id: "report-2",
    internId: "intern-2",
    timestamp: "06/05/2025 15:11:28",
    reportDate: "06/05/2025",
    reportLinks: [
      "https://drive.google.com/file1",
      "https://drive.google.com/file2",
      "https://drive.google.com/file3"
    ],
    createdAt: new Date(2025, 4, 6, 15, 11, 28).toISOString(),
  },
  {
    id: "report-3",
    internId: "intern-3",
    timestamp: "06/05/2025 19:50:15",
    reportDate: "06/05/2025",
    reportLinks: [
      "https://drive.google.com/file1",
      "https://drive.google.com/file2",
      "https://drive.google.com/file3"
    ],
    createdAt: new Date(2025, 4, 6, 19, 50, 15).toISOString(),
  },
  {
    id: "report-4",
    internId: "intern-4",
    timestamp: "07/05/2025 0:01:18",
    reportDate: "07/05/2025",
    reportLinks: [
      "https://drive.google.com/file1",
      "https://drive.google.com/file2",
      "https://drive.google.com/file3"
    ],
    createdAt: new Date(2025, 4, 7, 0, 1, 18).toISOString(),
  },
  {
    id: "report-5",
    internId: "intern-4",
    timestamp: "07/05/2025 0:08:46",
    reportDate: "07/05/2025",
    reportLinks: [
      "https://drive.google.com/file1",
      "https://drive.google.com/file2",
      "https://drive.google.com/file3"
    ],
    createdAt: new Date(2025, 4, 7, 0, 8, 46).toISOString(),
  },
  {
    id: "report-6",
    internId: "intern-5",
    timestamp: "07/05/2025 0:16:23",
    reportDate: "07/05/2025",
    reportLinks: [
      "https://drive.google.com/file1",
      "https://drive.google.com/file2",
      "https://drive.google.com/file3"
    ],
    createdAt: new Date(2025, 4, 7, 0, 16, 23).toISOString(),
  }
];

export const mockFields: Field[] = [
  {
    id: "field-1",
    name: "Bidang 1 - Umum"
  },
  {
    id: "field-2",
    name: "Bidang 2 - Sistem Pemerintahan Berbasis Elektronik"
  },
  {
    id: "field-3",
    name: "Bidang 3 - Pengembangan Aplikasi"
  },
  {
    id: "field-4",
    name: "Bidang 4 - Pengelolaan Infrastruktur"
  },
  {
    id: "field-5",
    name: "Bidang 5 - Keamanan Informasi"
  }
];

export const mockUniversities: string[] = [
  "Universitas Gadjah Mada",
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Negeri Semarang",
  "Universitas Diponegoro",
  "Universitas Brawijaya",
  "Institut Teknologi Sepuluh Nopember",
  "Universitas Airlangga",
  "Universitas Padjadjaran"
];

// Helper function to get intern statistics
export const getInternStats = (internId: string): InternStats => {
  const internReports = mockReports.filter(report => report.internId === internId);
  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const reportsThisWeek = internReports.filter(report => {
    const reportDate = new Date(report.createdAt);
    return reportDate >= oneWeekAgo && reportDate <= today;
  });
  
  const lastReport = internReports.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
  
  return {
    totalReports: internReports.length,
    submittedThisWeek: reportsThisWeek.length,
    lastSubmission: lastReport?.reportDate,
    submissionRate: internReports.length > 0 ? 100 : 0 // Simplified calculation
  };
};
