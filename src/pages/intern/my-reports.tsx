
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Image, Plus } from "lucide-react";

const MyReportsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      try {
        const data = await api.intern.getMyReports(user.id);
        setReports(data);
        setFilteredReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = reports.filter(
        (report) =>
          report.reportDate.includes(searchQuery) ||
          report.timestamp.includes(searchQuery)
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [searchQuery, reports]);

  // Export reports as CSV
  const exportToCSV = () => {
    const headers = ["Timestamp", "Tanggal Report", "Jumlah Foto"];
    
    const csvData = [
      headers.join(","),
      ...filteredReports.map(report => {
        return [
          report.timestamp,
          report.reportDate,
          report.reportPhotos?.length || 0
        ].join(",");
      })
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `my-reports-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Laporan Saya" description="Riwayat laporan yang telah disubmit">
        <div className="flex space-x-2">
          <Link to="/intern/submit-report">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Submit Laporan
            </Button>
          </Link>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </PageHeader>

      <div className="mb-6 flex items-center relative">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari berdasarkan tanggal..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.reportDate}</TableCell>
                  <TableCell>{report.timestamp.split(" ")[1]}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {report.reportPhotos?.map((photo: string, index: number) => (
                        <a
                          key={index}
                          href={photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center"
                        >
                          <Image className="h-3 w-3 mr-1" />
                          Foto {index + 1}
                        </a>
                      ))}
                      {!report.reportPhotos?.length && (
                        <span className="text-xs text-gray-500">Tidak ada foto</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Lihat Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Belum ada laporan yang disubmit
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyReportsPage;
