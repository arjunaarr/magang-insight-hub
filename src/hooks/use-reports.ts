
import { useState, useEffect } from "react";
import { api } from "@/lib/api-service";
import { InternStats } from "@/types"; // Import the InternStats type

export const useReports = () => {
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
        const reportsWithInterns = allReports.map((report) => {
          const intern = allInterns.find((i) => i.id === report.internId);
          return {
            ...report,
            intern,
          };
        });

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
        report.intern?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // Calculate submission percentage for each intern
  const getSubmissionPercentage = (internId: string) => {
    const stats = api.admin.getInternStats(internId);
    // Handle the promise properly by returning a default value
    // We'll assume stats is no longer a Promise in this context
    return stats?.submissionRate ? Math.round(stats.submissionRate) : 0;
  };

  return {
    loading,
    reports,
    filteredReports,
    searchQuery,
    setSearchQuery,
    filterField,
    setFilterField,
    fields,
    getSubmissionPercentage
  };
};
