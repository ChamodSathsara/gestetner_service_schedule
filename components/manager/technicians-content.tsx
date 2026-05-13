"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, Briefcase, Wrench, Search, Users } from "lucide-react";
import { useApiConfig } from "@/hooks/apiconfig";

// ── Types ────────────────────────────────────────────────────────────────────

type Zone = "OUTSTATION" | "COLOMBO" | "SUBURBS";

interface Tech {
  id: string;
  name: string;
  email: string;
  phone: string;
  zone: Zone;
  allJobs: number;
  pendingJobs: number;
  jobPerformancePercentage: number;
  allServices: number;
  pendingServices: number;
  servicePerformancePercentage: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockTechnicians: Tech[] = [
  {
    id: "TECH001",
    name: "John Silva",
    email: "john@gestetner.com",
    phone: "+94-701234567",
    zone: "OUTSTATION",
    allJobs: 156,
    pendingJobs: 8,
    jobPerformancePercentage: 94.2,
    allServices: 142,
    pendingServices: 5,
    servicePerformancePercentage: 96.5,
  },
  {
    id: "TECH002",
    name: "Priya Sharma",
    email: "priya@gestetner.com",
    phone: "+94-701234568",
    zone: "COLOMBO",
    allJobs: 142,
    pendingJobs: 5,
    jobPerformancePercentage: 92.1,
    allServices: 130,
    pendingServices: 3,
    servicePerformancePercentage: 97.3,
  },
  {
    id: "TECH003",
    name: "Miguel Fernandez",
    email: "miguel@gestetner.com",
    phone: "+94-701234569",
    zone: "OUTSTATION",
    allJobs: 138,
    pendingJobs: 12,
    jobPerformancePercentage: 88.5,
    allServices: 120,
    pendingServices: 10,
    servicePerformancePercentage: 91.7,
  },
  {
    id: "TECH004",
    name: "Sarah Johnson",
    email: "sarah@gestetner.com",
    phone: "+94-701234570",
    zone: "SUBURBS",
    allJobs: 165,
    pendingJobs: 3,
    jobPerformancePercentage: 98.2,
    allServices: 158,
    pendingServices: 2,
    servicePerformancePercentage: 98.7,
  },
  {
    id: "TECH005",
    name: "Ahmed Hassan",
    email: "ahmed@gestetner.com",
    phone: "+94-701234571",
    zone: "OUTSTATION",
    allJobs: 121,
    pendingJobs: 15,
    jobPerformancePercentage: 87.6,
    allServices: 110,
    pendingServices: 14,
    servicePerformancePercentage: 87.3,
  },
  {
    id: "TECH006",
    name: "Li Wei",
    email: "liwei@gestetner.com",
    phone: "+94-701234572",
    zone: "COLOMBO",
    allJobs: 144,
    pendingJobs: 7,
    jobPerformancePercentage: 95.1,
    allServices: 135,
    pendingServices: 6,
    servicePerformancePercentage: 95.6,
  },
  {
    id: "TECH007",
    name: "Fatima Al-Rashid",
    email: "fatima@gestetner.com",
    phone: "+94-701234573",
    zone: "SUBURBS",
    allJobs: 99,
    pendingJobs: 18,
    jobPerformancePercentage: 81.8,
    allServices: 90,
    pendingServices: 16,
    servicePerformancePercentage: 82.2,
  },
  {
    id: "TECH008",
    name: "David Okonkwo",
    email: "david@gestetner.com",
    phone: "+94-701234574",
    zone: "OUTSTATION",
    allJobs: 177,
    pendingJobs: 4,
    jobPerformancePercentage: 97.7,
    allServices: 170,
    pendingServices: 3,
    servicePerformancePercentage: 98.2,
  },
  {
    id: "TECH009",
    name: "Elena Popescu",
    email: "elena@gestetner.com",
    phone: "+94-701234575",
    zone: "COLOMBO",
    allJobs: 133,
    pendingJobs: 9,
    jobPerformancePercentage: 93.2,
    allServices: 125,
    pendingServices: 8,
    servicePerformancePercentage: 93.6,
  },
  {
    id: "TECH010",
    name: "Raj Patel",
    email: "raj@gestetner.com",
    phone: "+94-701234576",
    zone: "SUBURBS",
    allJobs: 148,
    pendingJobs: 6,
    jobPerformancePercentage: 95.9,
    allServices: 140,
    pendingServices: 5,
    servicePerformancePercentage: 96.4,
  },
  {
    id: "TECH011",
    name: "Yuki Tanaka",
    email: "yuki@gestetner.com",
    phone: "+94-701234577",
    zone: "COLOMBO",
    allJobs: 112,
    pendingJobs: 11,
    jobPerformancePercentage: 90.2,
    allServices: 104,
    pendingServices: 9,
    servicePerformancePercentage: 91.3,
  },
  {
    id: "TECH012",
    name: "Carlos Rivera",
    email: "carlos@gestetner.com",
    phone: "+94-701234578",
    zone: "SUBURBS",
    allJobs: 189,
    pendingJobs: 2,
    jobPerformancePercentage: 98.9,
    allServices: 182,
    pendingServices: 1,
    servicePerformancePercentage: 99.5,
  },
  {
    id: "TECH013",
    name: "Amara Diallo",
    email: "amara@gestetner.com",
    phone: "+94-701234579",
    zone: "OUTSTATION",
    allJobs: 127,
    pendingJobs: 14,
    jobPerformancePercentage: 89.0,
    allServices: 115,
    pendingServices: 13,
    servicePerformancePercentage: 88.7,
  },
  {
    id: "TECH014",
    name: "Sven Larsson",
    email: "sven@gestetner.com",
    phone: "+94-701234580",
    zone: "COLOMBO",
    allJobs: 155,
    pendingJobs: 7,
    jobPerformancePercentage: 95.5,
    allServices: 148,
    pendingServices: 6,
    servicePerformancePercentage: 95.9,
  },
  {
    id: "TECH015",
    name: "Nadia Kowalski",
    email: "nadia@gestetner.com",
    phone: "+94-701234581",
    zone: "SUBURBS",
    allJobs: 140,
    pendingJobs: 10,
    jobPerformancePercentage: 92.9,
    allServices: 132,
    pendingServices: 9,
    servicePerformancePercentage: 93.2,
  },
  {
    id: "TECH016",
    name: "Omar Khalil",
    email: "omar@gestetner.com",
    phone: "+94-701234582",
    zone: "OUTSTATION",
    allJobs: 103,
    pendingJobs: 20,
    jobPerformancePercentage: 80.6,
    allServices: 95,
    pendingServices: 18,
    servicePerformancePercentage: 81.1,
  },
  {
    id: "TECH017",
    name: "Mei Lin",
    email: "meilin@gestetner.com",
    phone: "+94-701234583",
    zone: "COLOMBO",
    allJobs: 162,
    pendingJobs: 5,
    jobPerformancePercentage: 96.9,
    allServices: 155,
    pendingServices: 4,
    servicePerformancePercentage: 97.4,
  },
  {
    id: "TECH018",
    name: "Ivan Petrov",
    email: "ivan@gestetner.com",
    phone: "+94-701234584",
    zone: "SUBURBS",
    allJobs: 135,
    pendingJobs: 8,
    jobPerformancePercentage: 94.1,
    allServices: 128,
    pendingServices: 7,
    servicePerformancePercentage: 94.5,
  },
  {
    id: "TECH019",
    name: "Chioma Eze",
    email: "chioma@gestetner.com",
    phone: "+94-701234585",
    zone: "OUTSTATION",
    allJobs: 117,
    pendingJobs: 13,
    jobPerformancePercentage: 88.9,
    allServices: 108,
    pendingServices: 12,
    servicePerformancePercentage: 88.9,
  },
  {
    id: "TECH020",
    name: "Lucas Moreau",
    email: "lucas@gestetner.com",
    phone: "+94-701234586",
    zone: "COLOMBO",
    allJobs: 174,
    pendingJobs: 3,
    jobPerformancePercentage: 98.3,
    allServices: 167,
    pendingServices: 2,
    servicePerformancePercentage: 98.8,
  },
  {
    id: "TECH021",
    name: "Aisha Mbeki",
    email: "aisha@gestetner.com",
    phone: "+94-701234587",
    zone: "SUBURBS",
    allJobs: 130,
    pendingJobs: 11,
    jobPerformancePercentage: 91.5,
    allServices: 122,
    pendingServices: 10,
    servicePerformancePercentage: 91.8,
  },
  {
    id: "TECH022",
    name: "Haruto Yamamoto",
    email: "haruto@gestetner.com",
    phone: "+94-701234588",
    zone: "COLOMBO",
    allJobs: 146,
    pendingJobs: 6,
    jobPerformancePercentage: 95.9,
    allServices: 139,
    pendingServices: 5,
    servicePerformancePercentage: 96.4,
  },
  {
    id: "TECH023",
    name: "Sofia Andersson",
    email: "sofia@gestetner.com",
    phone: "+94-701234589",
    zone: "OUTSTATION",
    allJobs: 108,
    pendingJobs: 16,
    jobPerformancePercentage: 85.2,
    allServices: 100,
    pendingServices: 15,
    servicePerformancePercentage: 85.0,
  },
  {
    id: "TECH024",
    name: "Kwame Asante",
    email: "kwame@gestetner.com",
    phone: "+94-701234590",
    zone: "SUBURBS",
    allJobs: 159,
    pendingJobs: 4,
    jobPerformancePercentage: 97.5,
    allServices: 152,
    pendingServices: 3,
    servicePerformancePercentage: 98.0,
  },
  {
    id: "TECH025",
    name: "Valentina Cruz",
    email: "valentina@gestetner.com",
    phone: "+94-701234591",
    zone: "COLOMBO",
    allJobs: 125,
    pendingJobs: 9,
    jobPerformancePercentage: 92.8,
    allServices: 117,
    pendingServices: 8,
    servicePerformancePercentage: 93.2,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

function perfColor(pct: number) {
  if (pct >= 95) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (pct >= 88) return { bar: "bg-blue-500", text: "text-blue-600" };
  if (pct >= 80) return { bar: "bg-amber-500", text: "text-amber-600" };
  return { bar: "bg-red-400", text: "text-red-500" };
}

const zoneIdentity: Record<
  Zone,
  { strip: string; avatar: string; badge: string }
> = {
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
};

function ProgressBar({ value, barClass }: { value: number; barClass: string }) {
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${barClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type ZoneFilter = "ALL" | Zone;

export async function TechniciansContent() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { getTechnitianDetails } = useApiConfig();
  const [zoneFilter, setZoneFilter] = useState<ZoneFilter>("ALL");
  console.log(
    " Rendering TechniciansContent with search:",
    search,
    "and zoneFilter:",
    zoneFilter,
  );

  useEffect(() => {
    // Fetch technician details if needed
    const fetchTechnicianDetails = async () => {
      try {
        const details = await getTechnitianDetails(); // Example tech code
        console.log("Fetched Technician Details:", details);
      } catch (error) {
        console.error("Error fetching technician details:", error);
      }
    };
  }, []);

  const filtered = mockTechnicians.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchZone = zoneFilter === "ALL" || t.zone === zoneFilter;
    return matchSearch && matchZone;
  });

  const tabs: { key: ZoneFilter; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "OUTSTATION", label: "Outstation" },
    { key: "COLOMBO", label: "Colombo" },
    { key: "SUBURBS", label: "Suburbs" },
  ];

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
            placeholder="Search name or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setZoneFilter(t.key)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filtered.map((tech) => {
          const identity = zoneIdentity[tech.zone];
          const jc = perfColor(tech.jobPerformancePercentage);
          const sc = perfColor(tech.servicePerformancePercentage);
          const zoneLabel =
            tech.zone === "OUTSTATION"
              ? "Outstation"
              : tech.zone === "COLOMBO"
                ? "Colombo"
                : "Suburbs";

          return (
            <div
              key={tech.id}
              className="bg-slate-100 border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
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
                      {tech.jobPerformancePercentage}%
                    </span>
                  </div>
                  <ProgressBar
                    value={tech.jobPerformancePercentage}
                    barClass={jc.bar}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{tech.allJobs} total</span>
                    <span className="text-amber-500 font-semibold">
                      {tech.pendingJobs} pending
                    </span>
                  </div>
                </div>

                {/* Services metric */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <Wrench className="w-3 h-3" /> Services
                    </span>
                    <span className={`text-xs font-bold ${sc.text}`}>
                      {tech.servicePerformancePercentage}%
                    </span>
                  </div>
                  <ProgressBar
                    value={tech.servicePerformancePercentage}
                    barClass={sc.bar}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{tech.allServices} total</span>
                    <span className="text-amber-500 font-semibold">
                      {tech.pendingServices} pending
                    </span>
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
    </div>
  );
}
