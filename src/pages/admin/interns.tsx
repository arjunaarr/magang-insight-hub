
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api-service";
import { User as UserType } from "@/types";
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
import { Search, User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const InternsPage = () => {
  const [loading, setLoading] = useState(true);
  const [interns, setInterns] = useState<UserType[]>([]);
  const [filteredInterns, setFilteredInterns] = useState<UserType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const data = await api.admin.getAllInterns();
        setInterns(data);
        setFilteredInterns(data);
      } catch (error) {
        console.error("Error fetching interns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = interns.filter(
        (intern) =>
          intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          intern.university?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          intern.field?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInterns(filtered);
    } else {
      setFilteredInterns(interns);
    }
  }, [searchQuery, interns]);

  const getFieldShortName = (field: string | undefined) => {
    if (!field) return "N/A";
    
    if (field.includes("-")) {
      return field.split("-")[0].trim();
    }
    
    return field;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading interns...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Daftar Anak Magang"
        description="Kelola dan pantau seluruh anak magang"
      >
        <Link to="/register-intern">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Tambah Anak Magang
          </Button>
        </Link>
      </PageHeader>

      <div className="mb-6 flex items-center relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari berdasarkan nama, universitas, atau bidang..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nama</TableHead>
              <TableHead>Universitas</TableHead>
              <TableHead>Bidang</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInterns.length > 0 ? (
              filteredInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        {intern.avatar ? (
                          <AvatarImage
                            src={intern.avatar}
                            alt={intern.name}
                          />
                        ) : (
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span>{intern.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{intern.university || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getFieldShortName(intern.field)}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/interns/${intern.id}`}>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Tidak ada data anak magang yang sesuai dengan pencarian
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InternsPage;
