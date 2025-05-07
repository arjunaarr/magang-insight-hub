
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api-service";
import PageHeader from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Download, Search, User } from "lucide-react";

interface SubmissionStatus {
  intern: any;
  hasSubmitted: boolean;
  lastSubmission: string | null;
}

const SubmissionStatusPage = () => {
  const [loading, setLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<SubmissionStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "submitted" | "not-submitted">("all");

  useEffect(() => {
    const fetchSubmissionStatus = async () => {
      try {
        const data = await api.admin.getSubmissionStatus();
        setSubmissionStatus(data);
        setFilteredStatus(data);
      } catch (error) {
        console.error("Error fetching submission status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubmissionStatus();
  }, []);
  
  useEffect(() => {
    let filtered = submissionStatus;
    
    if (searchQuery) {
      filtered = filtered.filter(
        (status) =>
          status.intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          status.intern.university?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          status.intern.field?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filter === "submitted") {
      filtered = filtered.filter((status) => status.hasSubmitted);
    } else if (filter === "not-submitted") {
      filtered = filtered.filter((status) => !status.hasSubmitted);
    }
    
    setFilteredStatus(filtered);
  }, [searchQuery, filter, submissionStatus]);
  
  const exportToCSV = () => {
    const headers = [
      "Nama", 
      "Email", 
      "Universitas", 
      "Bidang", 
      "Status Laporan Hari Ini", 
      "Terakhir Submit"
    ];
    
    const csvData = [
      headers.join(","),
      ...filteredStatus.map((status) => {
        return [
          status.intern.name,
          status.intern.email,
          status.intern.university || "-",
          status.intern.field || "-",
          status.hasSubmitted ? "Sudah Submit" : "Belum Submit",
          status.lastSubmission 
            ? new Date(status.lastSubmission).toLocaleDateString() + " " + 
              new Date(status.lastSubmission).toLocaleTimeString() 
            : "-"
        ].join(",");
      })
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `submission-status-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading submission status...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Status Submit Laporan"
        description="Pantau status submit laporan anak magang hari ini"
      >
        <Button onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </PageHeader>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari berdasarkan nama, universitas, atau bidang..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Semua
          </Button>
          <Button
            variant={filter === "submitted" ? "default" : "outline"}
            onClick={() => setFilter("submitted")}
          >
            Sudah Submit
          </Button>
          <Button
            variant={filter === "not-submitted" ? "default" : "outline"}
            onClick={() => setFilter("not-submitted")}
          >
            Belum Submit
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Nama</TableHead>
                <TableHead>Universitas</TableHead>
                <TableHead>Bidang</TableHead>
                <TableHead className="text-center w-[180px]">Status Hari Ini</TableHead>
                <TableHead>Terakhir Submit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStatus.length > 0 ? (
                filteredStatus.map((status) => (
                  <TableRow key={status.intern.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          {status.intern.avatar ? (
                            <AvatarImage
                              src={status.intern.avatar}
                              alt={status.intern.name}
                            />
                          ) : (
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="font-medium">{status.intern.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{status.intern.university || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{status.intern.field || "-"}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {status.hasSubmitted ? (
                        <div className="flex items-center justify-center text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          <span>Sudah Submit</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-red-500">
                          <XCircle className="mr-1 h-4 w-4" />
                          <span>Belum Submit</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {status.lastSubmission ? (
                        <div>
                          <div>{new Date(status.lastSubmission).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(status.lastSubmission).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Tidak ada data yang sesuai dengan filter
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionStatusPage;
