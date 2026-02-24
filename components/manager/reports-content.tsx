"use client";

import { useRouter } from "next/navigation";
import {
  Search,
  Star,
  Wrench,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

const reports = [
  {
    id: "ns",
    title: "NS Base Report",
    subtitle: "No Service Machines",
    description:
      "Find all machines that have not received any service. Identify gaps in coverage and unserviced units across all regions.",
    icon: Search,
    route: "/dailyReports/ns",
    accent: "#ef4444",
    tag: "No Service",
  },
  {
    id: "fs",
    title: "FS Free Report",
    subtitle: "Free Service Due Next Month",
    description:
      "Locate machines whose free service period ends next month. Plan ahead and schedule timely service visits before expiry.",
    icon: Star,
    route: "/dailyReports/fs",
    accent: "#3b82f6",
    tag: "Free Service",
  },
  {
    id: "ma",
    title: "MA Base Report",
    subtitle: "Maintenance Agreement Expiry",
    description:
      "Discover machines under maintenance agreements expiring next month. Ensure renewals and continued coverage are handled proactively.",
    icon: Wrench,
    route: "/dailyReports/ma",
    accent: "#10b981",
    tag: "Maintenance",
  },
  {
    id: "job",
    title: "Daily Job Report",
    subtitle: "Technician Job Completion",
    description:
      "Review completed jobs per technician with timestamps and durations. Justify daily productivity and measure field performance.",
    icon: ClipboardList,
    route: "/dailyReports/job",
    accent: "#f59e0b",
    tag: "Daily Jobs",
  },
  {
    id: "back",
    title: "Back Lock Report",
    subtitle: "Uncompleted Jobs & Services",
    description:
      "Track all pending and incomplete jobs across technicians. Surface backlogs before they escalate into service failures.",
    icon: AlertTriangle,
    route: "/dailyReports/back",
    accent: "#a855f7",
    tag: "Backlog",
  },
];

export function ReportsContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
          Daily Reports
        </h1>
        <div className="mt-3 h-px w-16 bg-gradient-to-r from-slate-800 to-transparent" />
        <p className="mt-4 text-slate-500 text-sm max-w-xl">
          Select a report to view detailed data. Each report is scoped to a
          specific operational area for focused analysis.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => router.push(report.route)}
              className="group relative text-left rounded-2xl border border-slate-200 bg-white p-6 overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-300"
              style={
                {
                  "--accent": report.accent,
                } as React.CSSProperties
              }
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at top left, ${report.accent}, transparent 60%)`,
                }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${report.accent}20`,
                    border: `1px solid ${report.accent}40`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: report.accent }} />
                </div>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color: report.accent,
                    backgroundColor: `${report.accent}15`,
                    border: `1px solid ${report.accent}30`,
                  }}
                >
                  {report.tag}
                </span>
              </div>

              {/* Text */}
              <h2 className="text-lg font-bold text-slate-800 mb-0.5 transition-colors">
                {report.title}
              </h2>
              <p
                className="text-xs font-medium mb-3"
                style={{ color: report.accent }}
              >
                {report.subtitle}
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                {report.description}
              </p>

              {/* Bottom arrow */}
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                <span>View Report</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, transparent, ${report.accent}, transparent)`,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
