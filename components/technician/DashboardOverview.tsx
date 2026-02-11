import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
} from "lucide-react";
import { JobCard } from "./JobCard";

interface Job {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  status: string;
  note?: string;
  customer_agreement?: string;
  machineRefNo?: string;
  daysLeft?: number;
}

interface DashboardOverviewProps {
  recentServices: Job[];
  recentBreakdowns: Job[];
  onJobClick: (job: Job) => void;
}

type SortOption = "date-desc" | "date-asc" | "days-desc" | "days-asc";

export function DashboardOverview({
  recentServices,
  recentBreakdowns,
  onJobClick,
}: DashboardOverviewProps) {
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [breakdownsExpanded, setBreakdownsExpanded] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  // Sort services based on selected option
  const sortedServices = [...recentServices].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "days-desc":
        return (b.daysLeft || 0) - (a.daysLeft || 0);
      case "days-asc":
        return (a.daysLeft || 0) - (b.daysLeft || 0);
      default:
        return 0;
    }
  });

  const getSortLabel = () => {
    switch (sortBy) {
      case "date-desc":
        return "Recent Date ↓";
      case "date-asc":
        return "Recent Date ↑";
      case "days-desc":
        return "Days Left ↓";
      case "days-asc":
        return "Days Left ↑";
      default:
        return "Sort";
    }
  };

  const cycleSortOption = () => {
    const options: SortOption[] = [
      "date-desc",
      "date-asc",
      "days-desc",
      "days-asc",
    ];
    const currentIndex = options.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortBy(options[nextIndex]);
  };

  return (
    <div className="space-y-3 md:space-y-5">
      {/* Colorful KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {/* Monthly Pending Service */}
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">
              {
                recentServices.filter((service) => service.status === "pending")
                  .length
              }
            </p>
            <p className="text-[9px] md:text-xs text-blue-100 font-semibold">
              Monthly Pending Service
            </p>
          </CardContent>
        </Card>

        {/* Today Pending Breakdowns */}
        <Card className="bg-gradient-to-br from-red-500 to-red-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">
              {
                recentBreakdowns.filter((job) => job.status === "pending")
                  .length
              }
            </p>
            <p className="text-[9px] md:text-xs text-red-100 font-semibold">
              Today Pending Jobs
            </p>
          </CardContent>
        </Card>

        {/* Monthly Completed Services  */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">
              {recentServices.length}
            </p>
            <p className="text-[9px] md:text-xs text-green-100 font-semibold">
              Monthly All Services
            </p>
          </CardContent>
        </Card>

        {/* Today Completed Jobs */}
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-none shadow-md hover:shadow-lg transition-all">
          <CardContent className="p-2.5 md:p-3 text-center">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 text-white" />
            <p className="text-2xl md:text-3xl font-bold text-white">
              {recentBreakdowns.length}
            </p>
            <p className="text-[9px] md:text-xs text-purple-100 font-semibold">
              Today All Jobs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Section */}
      <div className="border-2 border-blue-200 rounded-lg bg-blue-50/30">
        {/* Section Header with Collapse */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-blue-100/50 transition-colors rounded-t-lg"
          onClick={() => setServicesExpanded(!servicesExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h2 className="text-base md:text-lg font-bold text-blue-900">
              Services
            </h2>
            <span className="text-xs text-white bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-1 rounded-full font-semibold shadow-sm">
              {recentServices.length}
            </span>
          </div>
          {servicesExpanded ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600" />
          )}
        </div>

        {/* Collapsible Content */}
        {servicesExpanded && (
          <div className="p-3 pt-0 space-y-4">
            {/* Sort Button */}
            <div className="flex justify-end">
              <button
                onClick={cycleSortOption}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-xs md:text-sm font-semibold shadow-sm"
              >
                <ArrowUpDown className="w-4 h-4" />
                {getSortLabel()}
              </button>
            </div>

            {/* Monthly Services */}
            <div>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <span>All Monthly Services</span>
                </h3>
                <span className="text-[10px] md:text-xs text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full font-semibold">
                  {sortedServices.length}
                </span>
              </div>
              <div className="space-y-2">
                {sortedServices.length > 0 ? (
                  sortedServices.map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      onClick={() => onJobClick(job)}
                      variant="service"
                    />
                  ))
                ) : (
                  <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">
                        No service jobs
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Recall Services */}
            <div>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <span>Recall Services</span>
                </h3>
                <span className="text-[10px] md:text-xs text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full font-semibold">
                  {sortedServices.length}
                </span>
              </div>
              <div className="space-y-2">
                {sortedServices.length > 0 ? (
                  sortedServices.map((job, index) => (
                    <JobCard
                      key={index}
                      job={job}
                      onClick={() => onJobClick(job)}
                      variant="service"
                    />
                  ))
                ) : (
                  <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">
                        No services
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Breakdowns Section */}
      <div className="border-2 border-red-200 rounded-lg bg-red-50/30">
        {/* Section Header with Collapse */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-red-100/50 transition-colors rounded-t-lg"
          onClick={() => setBreakdownsExpanded(!breakdownsExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
            <h2 className="text-base md:text-lg font-bold text-red-900">
              Jobs / Breakdowns
            </h2>
            <span className="text-xs text-white bg-gradient-to-r from-red-500 to-red-600 px-2.5 py-1 rounded-full font-semibold shadow-sm">
              {recentBreakdowns.length}
            </span>
          </div>
          {breakdownsExpanded ? (
            <ChevronUp className="w-5 h-5 text-red-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-red-600" />
          )}
        </div>

        {/* Collapsible Content */}
        {breakdownsExpanded && (
          <div className="p-3 pt-0 space-y-4">
            {/* Today Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <span>All Jobs</span>
                </h3>
                <span className="text-[10px] md:text-xs text-red-700 bg-red-100 px-2.5 py-1 rounded-full font-semibold">
                  {recentBreakdowns.length}
                </span>
              </div>
              <div className="space-y-2">
                {recentBreakdowns.length > 0 ? (
                  recentBreakdowns.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => onJobClick(job)}
                      variant="breakdown"
                    />
                  ))
                ) : (
                  <Card className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <p className="text-sm text-green-700 font-medium">
                        No Assign Jobs Today!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* All Due Jobs */}
            <div>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <span>Recall Jobs</span>
                </h3>
                <span className="text-[10px] md:text-xs text-red-700 bg-red-100 px-2.5 py-1 rounded-full font-semibold">
                  {recentBreakdowns.length}
                </span>
              </div>
              <div className="space-y-2">
                {recentBreakdowns.length > 0 ? (
                  recentBreakdowns.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => onJobClick(job)}
                      variant="breakdown"
                    />
                  ))
                ) : (
                  <Card className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-4 text-center">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <p className="text-sm text-green-700 font-medium">
                        No Recall Jobs Today!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
