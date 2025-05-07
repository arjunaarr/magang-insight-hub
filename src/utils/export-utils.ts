
export const exportReportsToCSV = (reports: any[]) => {
  const headers = ["Timestamp", "Nama", "Sekolah/Universitas", "Penempatan Bidang", "Tanggal Report", "Jumlah Foto"];
  
  const csvData = [
    headers.join(","),
    ...reports.map(report => {
      return [
        report.timestamp,
        report.intern?.name || "",
        report.intern?.university || "",
        report.intern?.field || "",
        report.reportDate,
        report.reportPhotos?.length || 0
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
