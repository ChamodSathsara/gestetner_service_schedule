"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Eye,
  Briefcase,
  Wrench,
  Search,
  Users,
  Loader2,
  Phone,
  ChevronRight,
} from "lucide-react";
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

// Performance colour — returns Tailwind classes for bar + percent text
function perfColor(pct: number): { bar: string; text: string } {
  if (pct >= 95) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (pct >= 88) return { bar: "bg-blue-500", text: "text-blue-600" };
  if (pct >= 80) return { bar: "bg-amber-500", text: "text-amber-600" };
  return { bar: "bg-red-400", text: "text-red-500" };
}

// Zone colors
const zoneIdentity: Record<
  Zone,
  {
    header: string;
    avatar: string;
    badge: string;
  }
> = {
  OUTSTATION: {
    header: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    avatar: "bg-emerald-700",
    badge: "bg-white/25 text-white border-white/30 backdrop-blur-sm",
  },
  COLOMBO: {
    header: "bg-gradient-to-br from-blue-500 to-blue-600",
    avatar: "bg-blue-700",
    badge: "bg-white/25 text-white border-white/30 backdrop-blur-sm",
  },
  SUBURBS: {
    header: "bg-gradient-to-br from-violet-500 to-violet-600",
    avatar: "bg-violet-700",
    badge: "bg-white/25 text-white border-white/30 backdrop-blur-sm",
  },
  P2P: {
    header: "bg-gradient-to-br from-purple-500 to-purple-600",
    avatar: "bg-purple-700",
    badge: "bg-white/25 text-white border-white/30 backdrop-blur-sm",
  },
  UNKNOWN: {
    header: "bg-gradient-to-br from-slate-500 to-slate-600",
    avatar: "bg-slate-700",
    badge: "bg-white/25 text-white border-white/30 backdrop-blur-sm",
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ value, barClass }: { value: number; barClass: string }) {
  return (
    <div className="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function StatBox({
  label,
  value,
  pending,
}: {
  label: string;
  value: number;
  pending: number;
}) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-[28px] font-bold text-slate-800 leading-none">
        {value}
      </p>
      <p
        className={`text-[11px] mt-1.5 font-medium ${
          pending > 0 ? "text-amber-600" : "text-slate-400"
        }`}
      >
        {pending > 0 ? `${pending} pending` : "All clear"}
      </p>
    </div>
  );
}

// ── Technician Card ───────────────────────────────────────────────────────────

function TechnicianCard({
  tech,
  onView,
}: {
  tech: Technician;
  onView: (id: string) => void;
}) {
  const identity = zoneIdentity[tech.zone];
  const jc = perfColor(tech.jobPerformancePercentage);
  const sc = perfColor(tech.servicePerformancePercentage);
  const zoneLabel = tech.zone.charAt(0) + tech.zone.slice(1).toLowerCase();

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-slate-100 cursor-pointer"
      onClick={() => onView(tech.id)}
    >
      {/* Main Card Content */}
      <div className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">
        {/* Colored Header Section */}
        <div className={`${identity.header} p-5 pb-4`}>
          {/* Header — avatar + name + zone badge */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-xl ${identity.avatar} flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg`}
            >
              {getInitials(tech.name)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-bold text-white text-base leading-snug truncate drop-shadow-sm">
                {tech.name}
              </p>
              <p className="text-[11px] text-white/80 font-medium mt-0.5">
                {tech.id}
              </p>
            </div>

            <span
              className={`shrink-0 text-[10px] font-bold px-3 py-1 rounded-full border ${identity.badge}`}
            >
              {zoneLabel}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-[13px] text-white/90 font-medium">
            <Phone className="w-4 h-4 shrink-0 text-white/80" />
            <span className="truncate">{tech.phone || "—"}</span>
          </div>
        </div>

        {/* White Body Section */}
        <div className="p-5 flex flex-col gap-4 flex-1 bg-white">
          {/* Stat boxes */}
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="Jobs"
              value={tech.allJobs}
              pending={tech.pendingJobs}
            />
            <StatBox
              label="Services"
              value={tech.allServices}
              pending={tech.pendingServices}
            />
          </div>

          {/* Job performance bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <Briefcase className="w-3.5 h-3.5" />
                Job rate
              </span>
              <span className={`text-[14px] font-bold ${jc.text}`}>
                {tech.jobPerformancePercentage.toFixed(1)}%
              </span>
            </div>
            <ProgressBar
              value={tech.jobPerformancePercentage}
              barClass={jc.bar}
            />
          </div>

          {/* Service performance bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <Wrench className="w-3.5 h-3.5" />
                Service rate
              </span>
              <span className={`text-[14px] font-bold ${sc.text}`}>
                {tech.servicePerformancePercentage.toFixed(1)}%
              </span>
            </div>
            <ProgressBar
              value={tech.servicePerformancePercentage}
              barClass={sc.bar}
            />
          </div>
        </div>
      </div>

      {/* Hover Overlay - White with centered button */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
        <button
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white text-[14px] font-bold hover:bg-slate-700 transition-colors shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onView(tech.id);
          }}
        >
          <Eye className="w-5 h-5" />
          View details
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
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
        setTechnicians(details);
      } catch (err) {
        console.error("Error fetching technician details:", err);
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

  const availableZones = Array.from(
    new Set(technicians.map((t) => t.zone)),
  ).filter((z) => z !== "UNKNOWN");

  const tabs: { key: ZoneFilter; label: string }[] = [
    { key: "ALL", label: "All" },
    ...availableZones.map((z) => ({
      key: z as ZoneFilter,
      label: z.charAt(0) + z.slice(1).toLowerCase(),
    })),
  ];

  // ── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
          <p className="text-sm text-slate-500">Loading technicians…</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────

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
            Unable to load data
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

  // ── Empty state ──────────────────────────────────────────────────────────

  if (technicians.length === 0) {
    return (
      <div className="min-h-screen p-6 md:p-10">
        <PageHeader />
        <div className="flex flex-col items-center justify-center py-20">
          <Users className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-slate-500 text-sm">No technicians found</p>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen p-6 md:p-10">
      <PageHeader />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Search */}
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

        {/* Zone tabs */}
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

        {/* Count */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium sm:ml-auto">
          <Users className="w-3.5 h-3.5" />
          {filtered.length} technician{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Search className="w-12 h-12 text-slate-300 mb-3" />
          <p className="text-slate-500 text-sm">
            No technicians match your search
          </p>
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

      {/* Cards grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filtered.map((tech) => (
            <TechnicianCard
              key={tech.id}
              tech={tech}
              onView={(id) => router.push(`/technicians/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Shared page header ────────────────────────────────────────────────────────

function PageHeader() {
  return (
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
  );
}
