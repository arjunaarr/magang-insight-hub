
import React from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReportsTableProps {
  reports: any[];
  getSubmissionPercentage: (internId: string) => number;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  getSubmissionPercentage,
}) => {
  const navigate = useNavigate();

  const viewReportDetails = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Tanggal & Waktu</TableHead>
            <TableHead className="w-[200px]">Nama</TableHead>
            <TableHead>Universitas</TableHead>
            <TableHead>Bidang</TableHead>
            <TableHead>Laporan</TableHead>
            <TableHead>Tingkat Keaktifan</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{report.reportDate}</div>
                    <div className="text-xs text-gray-500">
                      {report.timestamp.split(" ")[1]}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{report.intern?.name || "-"}</TableCell>
                <TableCell>{report.intern?.university || "-"}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {report.intern?.field || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {report.reportPhotos && report.reportPhotos.length > 0 ? (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                        <Image className="h-3 w-3 mr-1" />
                        {report.reportPhotos.length} foto
                      </Badge>
                    ) : (
                      <span className="text-xs text-gray-500">Tidak ada foto</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {report.intern?.id ? (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${getSubmissionPercentage(report.intern.id)}%` }}
                      ></div>
                      <span className="text-xs mt-1 block">{getSubmissionPercentage(report.intern.id)}%</span>
                    </div>
                  ) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewReportDetails(report.id)}
                  >
                    Lihat Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Tidak ada data laporan yang sesuai dengan filter
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportsTable;
