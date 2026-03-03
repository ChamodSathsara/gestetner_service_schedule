import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle2, Search, X } from "lucide-react";
import { JobCard } from "./JobCard";

interface Job {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  daysLeft: number;
  status: string;
  note?: string;
  machineRefNo: string;
}

interface ServiceTabProps {
  services: Job[];
  onJobClick: (job: Job) => void;
}

export function ServiceTab({ services, onJobClick }: ServiceTabProps) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? services.filter((job) =>
        job.machineRefNo.toLowerCase().includes(search.toLowerCase()),
      )
    : services;

  return (
    <div className="space-y-3">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 md:p-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-white" />
          <h2 className="text-sm md:text-base font-bold text-white">
            Service Schedule
          </h2>
        </div>
        <p className="text-xs md:text-sm text-blue-100 ml-7">
          {services.length} scheduled maintenance{" "}
          {services.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by machine ref no..."
          className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Result count when searching */}
      {search.trim() && (
        <p className="text-xs text-gray-500 px-1">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
          <span className="font-semibold text-gray-700">"{search}"</span>
        </p>
      )}

      {/* Service Cards */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onClick={() => onJobClick(job)}
              variant="service"
            />
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200">
          <CardContent className="p-6 md:p-8 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-700 font-bold">
              {search.trim() ? "No Matching Jobs" : "No Scheduled Services"}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {search.trim()
                ? `No jobs found for ref "${search}"`
                : "All maintenance up to date"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
