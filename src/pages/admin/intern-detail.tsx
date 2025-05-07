
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/lib/api-service";
import { User } from "@/types";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User as UserIcon, Calendar, FileText, CheckCircle, Image } from "lucide-react";
import DashboardCard from "@/components/ui/dashboard-card";

const InternDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [intern, setIntern] = useState<User | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    const fetchInternData = async () => {
      if (!id) return;

      try {
        const internData = await api.admin.getInternById(id);
        const reportsData = await api.admin.getReportsByInternId(id);
        const statsData = await api.admin.getInternStats(id);

        setIntern(internData);
        setReports(reportsData);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching intern data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading intern data...</p>
      </div>
    );
  }

  if (!intern) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Anak magang tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={intern.name} description={intern.university || ""}>
        <Button variant="outline">Edit Profil</Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-magang-light flex items-center justify-center text-magang-primary mb-4">
                {intern.avatar ? (
                  <img
                    src={intern.avatar}
                    alt={intern.name}
                    className="h-24 w-24 rounded-full"
                  />
                ) : (
                  <UserIcon className="h-12 w-12" />
                )}
              </div>
              <h3 className="font-bold text-lg">{intern.name}</h3>
              <p className="text-gray-500 text-sm">{intern.email}</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Universitas</p>
                <p className="font-medium">{intern.university || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bidang</p>
                <p className="font-medium">{intern.field || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bergabung Sejak</p>
                <p className="font-medium">
                  {new Date(intern.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
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

          <Tabs defaultValue="reports">
            <TabsList className="mb-6">
              <TabsTrigger value="reports">Laporan</TabsTrigger>
              <TabsTrigger value="activity">Aktivitas</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Tanggal Laporan</TableHead>
                    <TableHead className="w-[180px]">Waktu Submit</TableHead>
                    <TableHead>Foto Laporan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.reportDate}</TableCell>
                        <TableCell>{report.timestamp.split(" ")[1]}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {report.reportPhotos && report.reportPhotos.length > 0 ? (
                              <>
                                <div className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  <Image className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{report.reportPhotos.length} foto</span>
                                </div>
                                <div className="flex gap-1">
                                  {report.reportPhotos.slice(0, 2).map((photo: string, index: number) => (
                                    <img 
                                      key={index} 
                                      src={photo} 
                                      alt={`Thumbnail ${index}`} 
                                      className="h-8 w-8 object-cover rounded border"
                                    />
                                  ))}
                                  {report.reportPhotos.length > 2 && (
                                    <div className="h-8 w-8 bg-gray-100 flex items-center justify-center rounded border text-xs text-gray-600">
                                      +{report.reportPhotos.length - 2}
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">Tidak ada foto</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.location.href = `/reports/${report.id}`}
                          >
                            Lihat Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-6 text-gray-500"
                      >
                        Belum ada laporan yang disubmit
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="activity" className="p-4 bg-white rounded-lg shadow">
              <div className="text-center py-12 text-gray-500">
                Fitur aktivitas akan segera hadir
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="p-4 bg-white rounded-lg shadow">
              <div className="text-center py-12 text-gray-500">
                Fitur feedback akan segera hadir
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InternDetailPage;
