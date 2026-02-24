"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Eye,
  Phone,
  Mail,
  Briefcase,
  Wrench,
  Search,
  Users,
} from "lucide-react";

const mockTechnicians = [
  {
    id: "TECH001",
    name: "John Silva",
    email: "john@gestetner.com",
    phone: "+94-701234567",
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
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
    team: "IN",
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
    team: "OUT",
    allJobs: 125,
    pendingJobs: 9,
    jobPerformancePercentage: 92.8,
    allServices: 117,
    pendingServices: 8,
    servicePerformancePercentage: 93.2,
  },
];

type Tech = (typeof mockTechnicians)[0];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

// Performance color scale — same palette used everywhere
function perfColor(pct: number) {
  if (pct >= 95)
    return {
      bar: "bg-emerald-500",
      text: "text-emerald-600",
      light: "bg-emerald-50 border-emerald-200 text-emerald-700",
    };
  if (pct >= 88)
    return {
      bar: "bg-blue-500",
      text: "text-blue-600",
      light: "bg-blue-50 border-blue-200 text-blue-700",
    };
  if (pct >= 80)
    return {
      bar: "bg-amber-500",
      text: "text-amber-600",
      light: "bg-amber-50 border-amber-200 text-amber-700",
    };
  return {
    bar: "bg-red-400",
    text: "text-red-500",
    light: "bg-red-50 border-red-200 text-red-600",
  };
}

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

function MiniStat({
  label,
  value,
  cls,
}: {
  label: string;
  value: number;
  cls: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
        {label}
      </p>
      <p className={`text-lg font-bold ${cls}`}>{value}</p>
    </div>
  );
}

export function TechniciansContent() {
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null);
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState<"ALL" | "IN" | "OUT">("ALL");

  const filtered = mockTechnicians.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchTeam = teamFilter === "ALL" || t.team === teamFilter;
    return matchSearch && matchTeam;
  });

  return (
    <div className="min-h-screen  p-6 md:p-10">
      {/* ── Page Header ── */}
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

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        {/* Search */}
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

        {/* Team filter pill group */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
          {(["ALL", "OUT", "IN"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTeamFilter(t)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                teamFilter === t
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              {t === "ALL" ? "All" : t === "OUT" ? "Outdoor" : "Indoor"}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium sm:ml-auto">
          <Users className="w-3.5 h-3.5" />
          {filtered.length} technician{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filtered.map((tech) => {
          const isOut = tech.team === "OUT";
          const jc = perfColor(tech.jobPerformancePercentage);
          const sc = perfColor(tech.servicePerformancePercentage);
          // Outdoor → blue identity, Indoor → emerald identity
          const identity = isOut
            ? {
                strip: "bg-blue-500",
                avatar: "bg-blue-600",
                badge: "bg-blue-50 text-blue-700 border-blue-200",
              }
            : {
                strip: "bg-emerald-500",
                avatar: "bg-emerald-600",
                badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
              };

          return (
            <div
              key={tech.id}
              className="  bg-slate-100 border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              {/* Top colour strip */}
              <div className={`h-[3px] w-full `} />

              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Avatar + name row */}
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
                    {tech.team}
                  </span>
                </div>

                {/* Separator */}
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

                {/* CTA */}
                <button
                  onClick={() => setSelectedTech(tech)}
                  className="mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Detail Dialog ── */}
      <Dialog
        open={!!selectedTech}
        onOpenChange={(open) => !open && setSelectedTech(null)}
      >
        <DialogContent className="bg-white border-slate-200 max-w-md p-0 overflow-hidden rounded-2xl gap-0">
          {selectedTech &&
            (() => {
              const isOut = selectedTech.team === "OUT";
              const jc = perfColor(selectedTech.jobPerformancePercentage);
              const sc = perfColor(selectedTech.servicePerformancePercentage);
              const headerBg = isOut ? "bg-blue-600" : "bg-emerald-600";
              const avatarBg = isOut ? "bg-blue-700" : "bg-emerald-700";

              return (
                <>
                  {/* Coloured header */}
                  <div className={`${headerBg} px-6 pt-6 pb-5`}>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl ${avatarBg} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                      >
                        {getInitials(selectedTech.name)}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white leading-tight">
                          {selectedTech.name}
                        </h2>
                        <p className="text-xs font-mono text-white/60 mt-0.5">
                          {selectedTech.id}
                        </p>
                        <span className="inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/25">
                          {isOut ? "Outdoor Team" : "Indoor Team"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 space-y-5">
                    {/* hidden for a11y */}
                    <DialogHeader className="sr-only">
                      <DialogTitle>Technician Details</DialogTitle>
                      <DialogDescription>
                        Full profile and performance metrics
                      </DialogDescription>
                    </DialogHeader>

                    {/* Contact */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Contact
                      </p>
                      <div className="bg-slate-50 border border-slate-100 rounded-xl divide-y divide-slate-100">
                        <div className="flex items-center gap-3 px-4 py-3">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-sm text-slate-700">
                            {selectedTech.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3">
                          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-sm text-slate-700">
                            {selectedTech.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job performance */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          <Briefcase className="w-3.5 h-3.5" /> Job Performance
                        </p>
                        <span className={`text-sm font-bold ${jc.text}`}>
                          {selectedTech.jobPerformancePercentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                        <div
                          className={`h-full rounded-full ${jc.bar}`}
                          style={{
                            width: `${selectedTech.jobPerformancePercentage}%`,
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <MiniStat
                          label="Total"
                          value={selectedTech.allJobs}
                          cls="text-slate-800"
                        />
                        <MiniStat
                          label="Pending"
                          value={selectedTech.pendingJobs}
                          cls="text-amber-500"
                        />
                        <MiniStat
                          label="Completed"
                          value={
                            selectedTech.allJobs - selectedTech.pendingJobs
                          }
                          cls="text-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Service performance */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          <Wrench className="w-3.5 h-3.5" /> Service Performance
                        </p>
                        <span className={`text-sm font-bold ${sc.text}`}>
                          {selectedTech.servicePerformancePercentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                        <div
                          className={`h-full rounded-full ${sc.bar}`}
                          style={{
                            width: `${selectedTech.servicePerformancePercentage}%`,
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <MiniStat
                          label="Total"
                          value={selectedTech.allServices}
                          cls="text-slate-800"
                        />
                        <MiniStat
                          label="Pending"
                          value={selectedTech.pendingServices}
                          cls="text-amber-500"
                        />
                        <MiniStat
                          label="Completed"
                          value={
                            selectedTech.allServices -
                            selectedTech.pendingServices
                          }
                          cls="text-emerald-600"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTech(null)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
