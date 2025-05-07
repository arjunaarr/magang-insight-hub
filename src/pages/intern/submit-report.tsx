
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api-service";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, X } from "lucide-react";

const MAX_REPORTS = 5;

const SubmitReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [reportDate, setReportDate] = useState("");
  const [reportLinks, setReportLinks] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Set default date to today's date
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setReportDate(formattedDate);
  }, []);
  
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...reportLinks];
    newLinks[index] = value;
    setReportLinks(newLinks);
  };
  
  const addLinkField = () => {
    if (reportLinks.length < MAX_REPORTS) {
      setReportLinks([...reportLinks, ""]);
    } else {
      toast({
        title: "Batas maksimum",
        description: `Maksimum ${MAX_REPORTS} link laporan per submit`,
        variant: "default",
      });
    }
  };
  
  const removeLinkField = (index: number) => {
    if (reportLinks.length > 1) {
      const newLinks = reportLinks.filter((_, i) => i !== index);
      setReportLinks(newLinks);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate non-empty links
    const validLinks = reportLinks.filter(link => link.trim() !== "");
    if (validLinks.length === 0) {
      toast({
        title: "Error",
        description: "Masukkan minimal 1 link laporan",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the date as DD/MM/YYYY for consistency with the mock data
      const parts = reportDate.split("-");
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      
      await api.intern.submitReport(user!.id, formattedDate, validLinks);
      
      toast({
        title: "Sukses",
        description: "Laporan berhasil disubmit",
        variant: "default",
      });
      
      navigate("/my-reports");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Gagal mengirim laporan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <PageHeader title="Submit Laporan" description="Kirim laporan kegiatan magang" />
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Form Laporan</CardTitle>
          <CardDescription>
            Masukkan tanggal dan link Google Drive laporan Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="reportDate" className="text-sm font-medium">
                Tanggal Laporan
              </label>
              <Input
                id="reportDate"
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]} // Can't select future dates
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Link Laporan</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLinkField}
                  disabled={reportLinks.length >= MAX_REPORTS}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Link
                </Button>
              </div>
              
              {reportLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={`Link Laporan ${index + 1}`}
                      className="pl-10"
                      value={link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      required={index === 0} // Only the first link is required
                    />
                  </div>
                  {reportLinks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLinkField(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Submit Laporan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReportPage;
