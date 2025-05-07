
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import DashboardCard from "@/components/ui/dashboard-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockReports } from "@/lib/mock-data";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [recentReports, setRecentReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const summary = await api.admin.getDashboardSummary();
        const allInterns = await api.admin.getAllInternsStats();
        
        // Get recent reports
        const sortedReports = [...mockReports]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        const reportsWithDetails = await Promise.all(
          sortedReports.map(async (report) => {
            const intern = await api.admin.getInternById(report.internId);
            return {
              ...report,
              intern,
            };
          })
        );
        
        setDashboardData({ summary, interns: allInterns });
        setRecentReports(reportsWithDetails);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Prepare data for charts
  const reportsByFieldData = dashboardData?.interns?.reduce((acc: any, curr: any) => {
    const field = curr.intern.field;
    const existingField = acc.find((item: any) => item.field === field);
    
    if (existingField) {
      existingField.reports += curr.stats.totalReports;
    } else {
      acc.push({
        field: field || "Unknown",
        reports: curr.stats.totalReports,
      });
    }
    
    return acc;
  }, []) || [];

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
        title="Dashboard Admin"
        description="Ringkasan aktivitas anak magang"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Total Anak Magang"
          value={dashboardData?.summary?.totalInterns || 0}
          icon={<Users className="h-4 w-4" />}
        />
        <DashboardCard
          title="Total Laporan"
          value={dashboardData?.summary?.totalReports || 0}
          icon={<FileText className="h-4 w-4" />}
        />
        <DashboardCard
          title="Laporan Minggu Ini"
          value={dashboardData?.summary?.reportsThisWeek || 0}
          icon={<Activity className="h-4 w-4" />}
          trend={{
            value: 12,
            isPositive: true,
          }}
        />
        <DashboardCard
          title="Tingkat Keaktifan"
          value={`${Math.round(dashboardData?.summary?.submissionRate || 0)}%`}
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Laporan per Bidang</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportsByFieldData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 100,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="field" 
                  angle={-45} 
                  textAnchor="end"
                  tick={{ fontSize: 10 }}
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reports" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Laporan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report: any) => (
                <div
                  key={report.id}
                  className="flex items-start space-x-3 border-b pb-3 last:border-0"
                >
                  <div className="h-8 w-8 rounded-full bg-magang-light flex items-center justify-center text-magang-primary font-medium">
                    {report.intern?.name.charAt(0) || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {report.intern?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {report.reportDate} ({report.timestamp.split(" ")[1]})
                    </p>
                    <p className="text-xs text-gray-700 mt-1">
                      {report.intern?.university}
                    </p>
                  </div>
                </div>
              ))}
              
              {recentReports.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Belum ada laporan terbaru
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
