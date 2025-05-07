
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, Building, Briefcase } from "lucide-react";

const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any | null>(null);
  const [intern, setIntern] = useState<any | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!id) return;

      try {
        // In a real app, you'd have a specific endpoint for fetching a single report
        const allReports = await api.admin.getAllReports();
        const reportData = allReports.find(r => r.id === id);
        
        if (reportData) {
          setReport(reportData);
          
          // Get intern data
          const internData = await api.admin.getInternById(reportData.internId);
          setIntern(internData);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading report data...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg mb-4">Laporan tidak ditemukan</p>
        <Link to="/reports">
          <Button>Kembali ke Daftar Laporan</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Laporan: ${report.reportDate}`}
        description={intern?.name || ""}
      >
        <Link to="/reports">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Informasi Pelapor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {intern && (
              <>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                    {intern.avatar ? (
                      <img
                        src={intern.avatar}
                        alt={intern.name}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{intern.name}</h3>
                    <p className="text-sm text-gray-500">{intern.email}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{intern.university || "-"}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{intern.field || "-"}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Detail Laporan</CardTitle>
            <CardDescription>
              Submitted pada {report.timestamp}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>Tanggal Laporan: {report.reportDate}</span>
            </div>

            <Separator className="my-4" />

            <h3 className="font-medium mb-3">Foto Laporan</h3>
            {report.reportPhotos && report.reportPhotos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {report.reportPhotos.map((photo: string, index: number) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <img
                      src={photo}
                      alt={`Report photo ${index + 1}`}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => window.open(photo, "_blank")}
                    />
                    <div className="p-2 bg-gray-50 border-t">
                      <Badge>Foto {index + 1}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada foto yang dilampirkan</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportDetailPage;
