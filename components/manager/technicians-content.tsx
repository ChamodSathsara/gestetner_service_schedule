"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, Briefcase, Wrench, Search, Users, Loader2 } from "lucide-react";
import { Technician, useApiConfig } from "@/hooks/apiconfig";
import { Zone } from "@/hooks/apiconfig";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function perfColor(pct: number) {
  if (pct >= 95) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (pct >= 88) return { bar: "bg-blue-500", text: "text-blue-600" };
  if (pct >= 80) return { bar: "bg-amber-500", text: "text-amber-600" };
  return { bar: "bg-red-400", text: "text-red-500" };
}
const zoneIdentity: Record<Zone, { strip: string; avatar: string; badge: string }> = {
  OUTSTATION: {
    strip: "bg-blue-500",
    avatar: "bg-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  COLOMBO: {
    strip: "bg-violet-500",
    avatar: "bg-violet-600",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  SUBURBS: {
    strip: "bg-emerald-500",
    avatar: "bg-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  P2P: {
    strip: "bg-purple-500",
    avatar: "bg-purple-600",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  UNKNOWN: {
    strip: "bg-slate-500",
    avatar: "bg-slate-600",
    badge: "bg-slate-50 text-slate-700 border-slate-200",
  },
};

function ProgressBar({ value, barClass }: { value: number; barClass: string }) {
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-300 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type ZoneFilter = "ALL" | Zone;

export function TechniciansContent() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { getTechnitianDetails } = useApiConfig();
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoneFilter, setZoneFilter] = useState<ZoneFilter>("ALL");

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await getTechnitianDetails();
        console.log("Fetched Technician Details:", details);
        setTechnicians(details);
      } catch (error) {
        console.error("Error fetching technician details:", error);
        setError("Failed to load technician data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const filtered = technicians.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search);
    const matchZone = zoneFilter === "ALL" || t.zone === zoneFilter;
    return matchSearch && matchZone;
  });

  // Get unique zones from actual data for dynamic tabs
  const availableZones = Array.from(
    new Set(technicians.map((t) => t.zone))
  ).filter((zone) => zone !== "UNKNOWN");

  const tabs: { key: ZoneFilter; label: string }[] = [
    { key: "ALL", label: "All" },
    ...availableZones.map((zone) => ({
      key: zone as ZoneFilter,
      label: zone.charAt(0) + zone.slice(1).toLowerCase(),
    })),
  ];

  const getZoneLabel = (zone: Zone): string => {
    const labels: Record<Zone, string> = {
      OUTSTATION: "Outstation",
      COLOMBO: "Colombo",
      SUBURBS: "Suburbs",
      P2P: "P2P",
      UNKNOWN: "Other",
    };
    return labels[zone] || zone;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
          <p className="text-sm text-slate-500">Loading technicians...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Unable to Load Data
          </h3>
          <p className="text-sm text-slate-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (technicians.length === 0) {
    return (
      <div className="min-h-screen p-6 md:p-10">
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-1">
            Field Operations
          </p>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Technicians
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <Users className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-slate-500 text-sm">No technicians found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-1">
          Field Operations
        </p>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Technicians
        </h1>
        <p className="mt-1.5 text-slate-500 text-sm">
          Monitor performance and manage field technician records.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search name, ID or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setZoneFilter(t.key)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                zoneFilter === t.key
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium sm:ml-auto">
          <Users className="w-3.5 h-3.5" />
          {filtered.length} technician{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* No results state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Search className="w-12 h-12 text-slate-300 mb-3" />
          <p className="text-slate-500 text-sm">No technicians match your search</p>
          <button
            onClick={() => {
              setSearch("");
              setZoneFilter("ALL");
            }}
            className="mt-3 text-xs text-slate-600 hover:text-slate-800 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Cards Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filtered.map((tech) => {
            const identity = zoneIdentity[tech.zone];
            const jc = perfColor(tech.jobPerformancePercentage);
            const sc = perfColor(tech.servicePerformancePercentage);
            const zoneLabel = getZoneLabel(tech.zone);

            return (
              <div
                key={tech.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className={`h-[3px] w-full ${identity.strip}`} />
                <div className="p-5 flex flex-col gap-4 flex-1">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${identity.avatar} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    >
                      {getInitials(tech.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800 text-sm truncate leading-snug">
                        {tech.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {tech.id}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded border ${identity.badge}`}
                    >
                      {zoneLabel}
                    </span>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Jobs metric */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        <Briefcase className="w-3 h-3" /> Jobs
                      </span>
                      <span className={`text-xs font-bold ${jc.text}`}>
                        {tech.jobPerformancePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <ProgressBar
                      value={tech.jobPerformancePercentage}
                      barClass={jc.bar}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{tech.allJobs} total</span>
                      {tech.pendingJobs > 0 && (
                        <span className="text-amber-500 font-semibold">
                          {tech.pendingJobs} pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Services metric */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        <Wrench className="w-3 h-3" /> Services
                      </span>
                      <span className={`text-xs font-bold ${sc.text}`}>
                        {tech.servicePerformancePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <ProgressBar
                      value={tech.servicePerformancePercentage}
                      barClass={sc.bar}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{tech.allServices} total</span>
                      {tech.pendingServices > 0 && (
                        <span className="text-amber-500 font-semibold">
                          {tech.pendingServices} pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA — navigates to /technicians/[techCode] */}
                  <button
                    onClick={() => router.push(`/technicians/${tech.id}`)}
                    className="mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}