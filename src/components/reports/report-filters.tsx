
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterField: string;
  onFilterChange: (value: string) => void;
  fields: any[];
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterField,
  onFilterChange,
  fields,
}) => {
  return (
    <div className="mb-6 flex gap-4 flex-wrap">
      <div className="relative flex-1 min-w-[250px]">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari berdasarkan nama atau tanggal..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select value={filterField} onValueChange={onFilterChange}>
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
  );
};

export default ReportFilters;
