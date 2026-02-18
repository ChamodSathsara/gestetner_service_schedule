import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, ChevronRight } from "lucide-react";
import { useApiConfig } from "@/hooks/apiconfig";
import { useEffect } from "react";
import UnauthorizedDialog from "./UnauthorizedDialog";

interface Job {
  id: string;
  jobId: string;
  date: string;
  location: string;
  description?: string;
  customerName?: string;
  daysLeft?: number;
  status: string;
  note?: string;
  expected_visit_no?: string;
  customer_agreement?: string;
  machineRefNo?: string;
}

interface JobCardProps {
  job: Job;
  onClick: () => void;
  variant?: "service" | "breakdown" | "Due_breakdown";
  type?: string;
}

export function JobCard({
  job,
  onClick,
  variant = "service",
  type,
}: JobCardProps) {
  const {
    getPreviousServiceLists,
    setShowUnauthorizedDialog,
    showUnauthorizedDialog,
  } = useApiConfig();
  const isBreakdown = variant === "breakdown";
  const isCompleted = job.status.toLowerCase() === "completed";

  const fetchPreviousServices = async () => {
    try {
      const previousServices = await getPreviousServiceLists(
        job.machineRefNo || "",
      );
      console.log(
        "Previous Services for job",
        job.jobId,
        ":",
        previousServices,
      );
    } catch (error) {
      console.error("Error fetching previous services:", error);
    }
  };

  // Helper function to get badge color based on days left
  const getDaysLeftBadgeColor = (daysLeft: number) => {
    if (isCompleted) {
      return "bg-gray-100 text-gray-500 border border-gray-200";
    }
    if (daysLeft < 0) {
      return "bg-red-100 text-red-700 border border-red-200";
    } else if (daysLeft <= 7) {
      return "bg-green-100 text-green-700 border border-green-200";
    } else if (daysLeft <= 14) {
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    } else {
      return "bg-pink-100 text-pink-700 border border-pink-200";
    }
  };

  return (
    <Card
      className={`border shadow-sm hover:shadow transition-all cursor-pointer  ${
        isCompleted
          ? "bg-gray-50 border-gray-200 opacity-70 hover:opacity-80"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <UnauthorizedDialog
        isOpen={showUnauthorizedDialog}
        onClose={() => setShowUnauthorizedDialog(false)}
      />
      <CardContent className="p-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-sm mb-0.5 ${
                isCompleted ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {job.machineRefNo}
            </h3>
            <p
              className={`text-xs truncate ${
                isCompleted ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {job.customerName || job.description}
            </p>
          </div>
          <ChevronRight
            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
              isCompleted ? "text-gray-300" : "text-gray-400"
            }`}
          />
        </div>

        {/* Location */}
        <div
          className={`flex items-center gap-1.5 text-xs mb-2 ${
            isCompleted ? "text-gray-500" : "text-gray-600"
          }`}
        >
          <MapPin
            className={`w-3.5 h-3.5 ${
              isCompleted ? "text-gray-300" : "text-gray-400"
            }`}
          />
          <span className="truncate">{job.location}</span>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {isBreakdown ? (
            <div
              className={`flex items-center gap-1.5 text-xs ${
                isCompleted ? "text-gray-500" : "text-gray-700"
              }`}
            >
              <Clock
                className={`w-3.5 h-3.5 ${
                  isCompleted ? "text-gray-300" : "text-gray-400"
                }`}
              />
              <span>{job.customer_agreement}</span>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 text-xs ${
                isCompleted ? "text-gray-500" : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-1">
                <Calendar
                  className={`w-3.5 h-3.5 ${
                    isCompleted ? "text-gray-300" : "text-gray-400"
                  }`}
                />
                <span>Visit {Number(job.expected_visit_no)}</span>
              </div>
              {job.daysLeft !== undefined && (
                <span className="text-gray-400">•</span>
              )}
              {job.daysLeft !== undefined && (
                <span
                  className={`text-[10px] font-medium px-2 py-1 rounded ${getDaysLeftBadgeColor(job.daysLeft)}`}
                >
                  {job.daysLeft} days left
                </span>
              )}
            </div>
          )}

          <span
            className={`
            text-[10px] font-medium px-2 py-1 rounded
            ${
              isCompleted
                ? "bg-gray-100 text-gray-600"
                : isBreakdown
                  ? "bg-red-50 text-red-600"
                  : "bg-blue-50 text-blue-600"
            }
          `}
          >
            {job.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
