
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download } from "lucide-react";

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterField, setFilterField] = useState("");
  const [fields, setFields] = useState<any[]>([]);
  const [interns, setInterns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allReports = await api.admin.getAllReports();
        const allInterns = await api.admin.getAllInterns();
        const allFields = await api.admin.getFields();

        // Combine reports with intern data
        const reportsWithInterns = await Promise.all(
          allReports.map(async (report) => {
            const intern = allInterns.find((i) => i.id === report.internId);
            return {
              ...report,
              intern,
            };
          })
        );

        setReports(reportsWithInterns);
        setFilteredReports(reportsWithInterns);
        setInterns(allInterns);
        setFields(allFields);
      } catch (error) {
        console.error("Error fetching reports data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = reports;

    if (searchQuery) {
      filtered = filtered.filter((report) =>
        report.intern?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reportDate.includes(searchQuery)
      );
    }

    if (filterField) {
      filtered = filtered.filter((report) =>
        report.intern?.field?.includes(filterField)
      );
    }

    setFilteredReports(filtered);
  }, [searchQuery, filterField, reports]);

  // Function to export reports as CSV
  const exportToCSV = () => {
    const headers = ["Timestamp", "Nama", "Sekolah/Universitas", "Penempatan Bidang", "Tanggal Report", "Report Links"];
    
    const csvData = [
      headers.join(","),
      ...filteredReports.map(report => {
        const reportLinks = report.reportLinks.join("|");
        return [
          report.timestamp,
          report.intern?.name || "",
          report.intern?.university || "",
          report.intern?.field || "",
          report.reportDate,
          `"${reportLinks}"`
        ].join(",");
      })
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reports-${new Date().toISOString().split("T")[0]}.csv`);
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
      <PageHeader
        title="Daftar Laporan"
        description="Semua laporan yang disubmit oleh anak magang"
      >
        <Button onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </PageHeader>

      <div className="mb-6 flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari berdasarkan nama atau tanggal..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={filterField} onValueChange={setFilterField}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Filter Bidang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Bidang</SelectItem>
            {fields.map((field) => (
              <SelectItem key={field.id} value={field.name}>
                {field.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Tanggal & Waktu</TableHead>
              <TableHead className="w-[200px]">Nama</TableHead>
              <TableHead>Universitas</TableHead>
              <TableHead>Bidang</TableHead>
              <TableHead>Laporan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
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
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Lihat Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Tidak ada data laporan yang sesuai dengan filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReportsPage;
