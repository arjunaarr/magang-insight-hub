
import React from "react";
import { Download } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import ReportFilters from "@/components/reports/report-filters";
import ReportsTable from "@/components/reports/reports-table";
import { useReports } from "@/hooks/use-reports";
import { exportReportsToCSV } from "@/utils/export-utils";

const ReportsPage = () => {
  const {
    loading,
    filteredReports,
    searchQuery,
    setSearchQuery,
    filterField,
    setFilterField,
    fields,
    getSubmissionPercentage
  } = useReports();

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
        <Button onClick={() => exportReportsToCSV(filteredReports)}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </PageHeader>

      <ReportFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterField={filterField}
        onFilterChange={setFilterField}
        fields={fields}
      />

      <ReportsTable
        reports={filteredReports}
        getSubmissionPercentage={getSubmissionPercentage}
      />
    </div>
  );
};

export default ReportsPage;
