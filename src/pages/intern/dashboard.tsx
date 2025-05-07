
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, FileText, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InternDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any | null>(null);
  const [recentReports, setRecentReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        const statsData = await api.admin.getInternStats(user.id);
        const reportsData = await api.intern.getMyReports(user.id);

        setStats(statsData);
        setRecentReports(
          reportsData
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard Magang"
        description={`Selamat datang, ${user?.name}`}
      >
        <Link to="/submit-report">
          <Button>Submit Laporan Baru</Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <DashboardCard
          title="Total Laporan"
          value={stats?.totalReports || 0}
          icon={<FileText className="h-4 w-4" />}
        />
        <DashboardCard
          title="Laporan Minggu Ini"
          value={stats?.submittedThisWeek || 0}
          icon={<Calendar className="h-4 w-4" />}
        />
        <DashboardCard
          title="Tingkat Keaktifan"
          value={`${Math.round(stats?.submissionRate || 0)}%`}
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Laporan Terbaru</CardTitle>
            <Link to="/my-reports">
              <Button variant="ghost" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Tanggal Laporan</TableHead>
                  <TableHead className="w-[180px]">Waktu Submit</TableHead>
                  <TableHead>Link Laporan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.length > 0 ? (
                  recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reportDate}</TableCell>
                      <TableCell>{report.timestamp.split(" ")[1]}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {report.reportLinks.slice(0, 3).map((link: string, index: number) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                            >
                              Report {index + 1}
                            </a>
                          ))}
                          {report.reportLinks.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                              +{report.reportLinks.length - 3} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-6 text-gray-500"
                    >
                      Belum ada laporan yang disubmit
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pengumuman & Informasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-1">
                  Pengumpulan Laporan Mingguan
                </h3>
                <p className="text-gray-700">
                  Jangan lupa untuk mengumpulkan laporan mingguan setiap hari Jumat
                  sebelum pukul 16.00 WIB.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-medium text-green-700 mb-1">
                  Update Format Laporan
                </h3>
                <p className="text-gray-700">
                  Format laporan telah diperbarui. Silakan gunakan template terbaru
                  yang dapat diakses melalui link di grup WhatsApp.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InternDashboard;
