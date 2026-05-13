"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {
  Phone,
  Mail,
  Briefcase,
  Wrench,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  X,
  ArrowLeft,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type Zone = "OUTSTATION" | "COLOMBO" | "SUBURBS";

interface JobOrService {
  id: string;
  title: string;
  status: "completed" | "pending";
}

interface DailyRecord {
  date: string;
  jobs: JobOrService[];
  services: JobOrService[];
}

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
  dailyRecords: DailyRecord[];
}

// ── Mock data (same as parent) ────────────────────────────────────────────────

function generateDailyRecords(seed: number): DailyRecord[] {
  const records: DailyRecord[] = [];
  const today = new Date("2025-07-15");
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const jobCount = 2 + ((seed + i) % 4);
    const svcCount = 1 + ((seed + i) % 3);
    records.push({
      date: ds,
      jobs: Array.from({ length: jobCount }, (_, j) => ({
        id: `J-${ds}-${j + 1}`,
        title: ["Printer repair", "Copier install", "Drum replacement", "Toner refill", "Network setup"][(seed + i + j) % 5],
        status: j < Math.floor(jobCount * 0.8) ? "completed" : "pending",
      })),
      services: Array.from({ length: svcCount }, (_, j) => ({
        id: `S-${ds}-${j + 1}`,
        title: ["Annual service", "Emergency call", "Firmware update", "Parts delivery"][(seed + i + j) % 4],
        status: j < Math.floor(svcCount * 0.85) ? "completed" : "pending",
      })),
    });
  }
  return records;
}

const mockTechnicians: Tech[] = [
  { id: "TECH001", name: "John Silva", email: "john@gestetner.com", phone: "+94-701234567", zone: "OUTSTATION", allJobs: 156, pendingJobs: 8, jobPerformancePercentage: 94.2, allServices: 142, pendingServices: 5, servicePerformancePercentage: 96.5, dailyRecords: generateDailyRecords(1) },
  { id: "TECH002", name: "Priya Sharma", email: "priya@gestetner.com", phone: "+94-701234568", zone: "COLOMBO", allJobs: 142, pendingJobs: 5, jobPerformancePercentage: 92.1, allServices: 130, pendingServices: 3, servicePerformancePercentage: 97.3, dailyRecords: generateDailyRecords(2) },
  { id: "TECH003", name: "Miguel Fernandez", email: "miguel@gestetner.com", phone: "+94-701234569", zone: "OUTSTATION", allJobs: 138, pendingJobs: 12, jobPerformancePercentage: 88.5, allServices: 120, pendingServices: 10, servicePerformancePercentage: 91.7, dailyRecords: generateDailyRecords(3) },
  { id: "TECH004", name: "Sarah Johnson", email: "sarah@gestetner.com", phone: "+94-701234570", zone: "SUBURBS", allJobs: 165, pendingJobs: 3, jobPerformancePercentage: 98.2, allServices: 158, pendingServices: 2, servicePerformancePercentage: 98.7, dailyRecords: generateDailyRecords(4) },
  { id: "TECH005", name: "Ahmed Hassan", email: "ahmed@gestetner.com", phone: "+94-701234571", zone: "OUTSTATION", allJobs: 121, pendingJobs: 15, jobPerformancePercentage: 87.6, allServices: 110, pendingServices: 14, servicePerformancePercentage: 87.3, dailyRecords: generateDailyRecords(5) },
  { id: "TECH006", name: "Li Wei", email: "liwei@gestetner.com", phone: "+94-701234572", zone: "COLOMBO", allJobs: 144, pendingJobs: 7, jobPerformancePercentage: 95.1, allServices: 135, pendingServices: 6, servicePerformancePercentage: 95.6, dailyRecords: generateDailyRecords(6) },
  { id: "TECH007", name: "Fatima Al-Rashid", email: "fatima@gestetner.com", phone: "+94-701234573", zone: "SUBURBS", allJobs: 99, pendingJobs: 18, jobPerformancePercentage: 81.8, allServices: 90, pendingServices: 16, servicePerformancePercentage: 82.2, dailyRecords: generateDailyRecords(7) },
  { id: "TECH008", name: "David Okonkwo", email: "david@gestetner.com", phone: "+94-701234574", zone: "OUTSTATION", allJobs: 177, pendingJobs: 4, jobPerformancePercentage: 97.7, allServices: 170, pendingServices: 3, servicePerformancePercentage: 98.2, dailyRecords: generateDailyRecords(8) },
  { id: "TECH009", name: "Elena Popescu", email: "elena@gestetner.com", phone: "+94-701234575", zone: "COLOMBO", allJobs: 133, pendingJobs: 9, jobPerformancePercentage: 93.2, allServices: 125, pendingServices: 8, servicePerformancePercentage: 93.6, dailyRecords: generateDailyRecords(9) },
  { id: "TECH010", name: "Raj Patel", email: "raj@gestetner.com", phone: "+94-701234576", zone: "SUBURBS", allJobs: 148, pendingJobs: 6, jobPerformancePercentage: 95.9, allServices: 140, pendingServices: 5, servicePerformancePercentage: 96.4, dailyRecords: generateDailyRecords(10) },
  { id: "TECH011", name: "Yuki Tanaka", email: "yuki@gestetner.com", phone: "+94-701234577", zone: "COLOMBO", allJobs: 112, pendingJobs: 11, jobPerformancePercentage: 90.2, allServices: 104, pendingServices: 9, servicePerformancePercentage: 91.3, dailyRecords: generateDailyRecords(11) },
  { id: "TECH012", name: "Carlos Rivera", email: "carlos@gestetner.com", phone: "+94-701234578", zone: "SUBURBS", allJobs: 189, pendingJobs: 2, jobPerformancePercentage: 98.9, allServices: 182, pendingServices: 1, servicePerformancePercentage: 99.5, dailyRecords: generateDailyRecords(12) },
  { id: "TECH013", name: "Amara Diallo", email: "amara@gestetner.com", phone: "+94-701234579", zone: "OUTSTATION", allJobs: 127, pendingJobs: 14, jobPerformancePercentage: 89.0, allServices: 115, pendingServices: 13, servicePerformancePercentage: 88.7, dailyRecords: generateDailyRecords(13) },
  { id: "TECH014", name: "Sven Larsson", email: "sven@gestetner.com", phone: "+94-701234580", zone: "COLOMBO", allJobs: 155, pendingJobs: 7, jobPerformancePercentage: 95.5, allServices: 148, pendingServices: 6, servicePerformancePercentage: 95.9, dailyRecords: generateDailyRecords(14) },
  { id: "TECH015", name: "Nadia Kowalski", email: "nadia@gestetner.com", phone: "+94-701234581", zone: "SUBURBS", allJobs: 140, pendingJobs: 10, jobPerformancePercentage: 92.9, allServices: 132, pendingServices: 9, servicePerformancePercentage: 93.2, dailyRecords: generateDailyRecords(15) },
  { id: "TECH016", name: "Omar Khalil", email: "omar@gestetner.com", phone: "+94-701234582", zone: "OUTSTATION", allJobs: 103, pendingJobs: 20, jobPerformancePercentage: 80.6, allServices: 95, pendingServices: 18, servicePerformancePercentage: 81.1, dailyRecords: generateDailyRecords(16) },
  { id: "TECH017", name: "Mei Lin", email: "meilin@gestetner.com", phone: "+94-701234583", zone: "COLOMBO", allJobs: 162, pendingJobs: 5, jobPerformancePercentage: 96.9, allServices: 155, pendingServices: 4, servicePerformancePercentage: 97.4, dailyRecords: generateDailyRecords(17) },
  { id: "TECH018", name: "Ivan Petrov", email: "ivan@gestetner.com", phone: "+94-701234584", zone: "SUBURBS", allJobs: 135, pendingJobs: 8, jobPerformancePercentage: 94.1, allServices: 128, pendingServices: 7, servicePerformancePercentage: 94.5, dailyRecords: generateDailyRecords(18) },
  { id: "TECH019", name: "Chioma Eze", email: "chioma@gestetner.com", phone: "+94-701234585", zone: "OUTSTATION", allJobs: 117, pendingJobs: 13, jobPerformancePercentage: 88.9, allServices: 108, pendingServices: 12, servicePerformancePercentage: 88.9, dailyRecords: generateDailyRecords(19) },
  { id: "TECH020", name: "Lucas Moreau", email: "lucas@gestetner.com", phone: "+94-701234586", zone: "COLOMBO", allJobs: 174, pendingJobs: 3, jobPerformancePercentage: 98.3, allServices: 167, pendingServices: 2, servicePerformancePercentage: 98.8, dailyRecords: generateDailyRecords(20) },
  { id: "TECH021", name: "Aisha Mbeki", email: "aisha@gestetner.com", phone: "+94-701234587", zone: "SUBURBS", allJobs: 130, pendingJobs: 11, jobPerformancePercentage: 91.5, allServices: 122, pendingServices: 10, servicePerformancePercentage: 91.8, dailyRecords: generateDailyRecords(21) },
  { id: "TECH022", name: "Haruto Yamamoto", email: "haruto@gestetner.com", phone: "+94-701234588", zone: "COLOMBO", allJobs: 146, pendingJobs: 6, jobPerformancePercentage: 95.9, allServices: 139, pendingServices: 5, servicePerformancePercentage: 96.4, dailyRecords: generateDailyRecords(22) },
  { id: "TECH023", name: "Sofia Andersson", email: "sofia@gestetner.com", phone: "+94-701234589", zone: "OUTSTATION", allJobs: 108, pendingJobs: 16, jobPerformancePercentage: 85.2, allServices: 100, pendingServices: 15, servicePerformancePercentage: 85.0, dailyRecords: generateDailyRecords(23) },
  { id: "TECH024", name: "Kwame Asante", email: "kwame@gestetner.com", phone: "+94-701234590", zone: "SUBURBS", allJobs: 159, pendingJobs: 4, jobPerformancePercentage: 97.5, allServices: 152, pendingServices: 3, servicePerformancePercentage: 98.0, dailyRecords: generateDailyRecords(24) },
  { id: "TECH025", name: "Valentina Cruz", email: "valentina@gestetner.com", phone: "+94-701234591", zone: "COLOMBO", allJobs: 125, pendingJobs: 9, jobPerformancePercentage: 92.8, allServices: 117, pendingServices: 8, servicePerformancePercentage: 93.2, dailyRecords: generateDailyRecords(25) },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

function perfColor(pct: number) {
  if (pct >= 95) return { bar: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50 border-emerald-200" };
  if (pct >= 88) return { bar: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50 border-blue-200" };
  if (pct >= 80) return { bar: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50 border-amber-200" };
  return { bar: "bg-red-400", text: "text-red-500", light: "bg-red-50 border-red-200" };
}

const zoneIdentity: Record<Zone, { strip: string; avatar: string; badge: string; headerBg: string; avatarHdr: string }> = {
  OUTSTATION: { strip: "bg-blue-500", avatar: "bg-blue-600", badge: "bg-blue-50 text-blue-700 border-blue-200", headerBg: "bg-blue-600", avatarHdr: "bg-blue-700" },
  COLOMBO:    { strip: "bg-violet-500", avatar: "bg-violet-600", badge: "bg-violet-50 text-violet-700 border-violet-200", headerBg: "bg-violet-600", avatarHdr: "bg-violet-700" },
  SUBURBS:    { strip: "bg-emerald-500", avatar: "bg-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", headerBg: "bg-emerald-600", avatarHdr: "bg-emerald-700" },
};

// ── Mini Calendar ─────────────────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function MiniCalendar({ availableDates, selectedDate, onSelect }: { availableDates: Set<string>; selectedDate: string; onSelect: (d: string) => void }) {
  const today = new Date("2025-07-15");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const pad = (n: number) => String(n).padStart(2, "0");
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold text-slate-700">{MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 px-3 pt-2 pb-1">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-semibold text-slate-400 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const ds = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
          const hasData = availableDates.has(ds);
          const isSelected = ds === selectedDate;
          const isToday = ds === "2025-07-15";
          return (
            <button
              key={ds}
              disabled={!hasData}
              onClick={() => onSelect(isSelected ? "" : ds)}
              className={`relative mx-auto w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all
                ${isSelected ? "bg-slate-800 text-white" : hasData ? "text-slate-700 hover:bg-slate-100 cursor-pointer" : "text-slate-300 cursor-default"}
                ${isToday && !isSelected ? "font-bold" : ""}`}
            >
              {day}
              {hasData && !isSelected && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${cls}`}>{value}</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TechnicianDetailPage() {
  const params = useParams();
  const router = useRouter();
  const techCode = (params?.techCode as string)?.toUpperCase();

  const tech = mockTechnicians.find(t => t.id === techCode);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [calOpen, setCalOpen] = useState(false);
  const [jobsExpanded, setJobsExpanded] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const availableDatesSet = useMemo(() => new Set(tech?.dailyRecords.map(r => r.date) ?? []), [tech]);

  const handleDateSelect = (d: string) => {
    setSelectedDate(d);
    if (d) setCalOpen(false);
    setJobsExpanded(false);
    setServicesExpanded(false);
  };

  if (!tech) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10">
        <p className="text-slate-500 text-lg font-medium">Technician <span className="font-mono text-slate-800">{techCode}</span> not found.</p>
        <button onClick={() => router.push("/technicians")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Technicians
        </button>
      </div>
    );
  }

  const identity = zoneIdentity[tech.zone];
  const dayRecord = selectedDate ? tech.dailyRecords.find(r => r.date === selectedDate) : null;

  const jobStats = dayRecord
    ? { total: dayRecord.jobs.length, pending: dayRecord.jobs.filter(j => j.status === "pending").length, completed: dayRecord.jobs.filter(j => j.status === "completed").length, pendingList: dayRecord.jobs.filter(j => j.status === "pending") }
    : { total: tech.allJobs, pending: tech.pendingJobs, completed: tech.allJobs - tech.pendingJobs, pendingList: [] };

  const svcStats = dayRecord
    ? { total: dayRecord.services.length, pending: dayRecord.services.filter(s => s.status === "pending").length, completed: dayRecord.services.filter(s => s.status === "completed").length, pendingList: dayRecord.services.filter(s => s.status === "pending") }
    : { total: tech.allServices, pending: tech.pendingServices, completed: tech.allServices - tech.pendingServices, pendingList: [] };

  const jobPerf = jobStats.total > 0 ? Math.round((jobStats.completed / jobStats.total) * 100) : 0;
  const svcPerf = svcStats.total > 0 ? Math.round((svcStats.completed / svcStats.total) * 100) : 0;

  const displayJobPerf = selectedDate ? jobPerf : tech.jobPerformancePercentage;
  const displaySvcPerf = selectedDate ? svcPerf : tech.servicePerformancePercentage;
  const jc = perfColor(displayJobPerf);
  const sc = perfColor(displaySvcPerf);

  const zoneLabel = tech.zone === "OUTSTATION" ? "Outstation" : tech.zone === "COLOMBO" ? "Colombo" : "Suburbs";
  const displayDate = selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Coloured hero header */}
      <div className={`${identity.headerBg} px-6 md:px-10 pt-8 pb-10`}>
        {/* Back button */}
        <button
          onClick={() => router.push("/technicians")}
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technicians
        </button>

        <div className="flex items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl ${identity.avatarHdr} flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg`}>
            {getInitials(tech.name)}
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-0.5">Field Technician</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{tech.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-mono text-white/60">{tech.id}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 text-white border border-white/25">{zoneLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto space-y-8">

        {/* Contact + Date filter row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contact card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contact Information</p>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="flex items-center gap-3 px-5 py-3.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-700">{tech.email}</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-700">{tech.phone}</span>
              </div>
            </div>
          </div>

          {/* Date filter card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> Filter by Date
              </p>
            </div>
            <div className="p-5">
              <button
                onClick={() => setCalOpen(v => !v)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  selectedDate
                    ? "border-slate-800 bg-slate-800 text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  {selectedDate ? displayDate : "Select a date…"}
                </span>
                <span className="flex items-center gap-1.5">
                  {selectedDate && (
                    <span role="button" onClick={e => { e.stopPropagation(); handleDateSelect(""); setCalOpen(false); }}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <X className="w-3 h-3" />
                    </span>
                  )}
                  {calOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {calOpen && (
                <div className="mt-3">
                  <MiniCalendar availableDates={availableDatesSet} selectedDate={selectedDate} onSelect={handleDateSelect} />
                  <p className="mt-2 text-[11px] text-slate-400 text-center">Highlighted dates have recorded data</p>
                </div>
              )}

              {!calOpen && selectedDate && (
                <p className="mt-2 text-[11px] text-slate-400 text-center">Showing data for {displayDate}</p>
              )}
              {!calOpen && !selectedDate && (
                <p className="mt-2 text-[11px] text-slate-400 text-center">Showing all-time totals</p>
              )}
            </div>
          </div>
        </div>

        {/* Performance cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Jobs */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Briefcase className="w-3.5 h-3.5" /> Job Performance
              </p>
              <span className={`text-sm font-bold ${jc.text}`}>{displayJobPerf}%</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${jc.bar} transition-all duration-500`} style={{ width: `${displayJobPerf}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Total" value={jobStats.total} cls="text-slate-800" />
                <StatCard label="Pending" value={jobStats.pending} cls="text-amber-500" />
                <StatCard label="Done" value={jobStats.completed} cls="text-emerald-600" />
              </div>

              {selectedDate && jobStats.pendingList.length > 0 && (
                <div className="border border-amber-200 rounded-xl overflow-hidden mt-2">
                  <button
                    onClick={() => setJobsExpanded(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-amber-50 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <ClipboardList className="w-3.5 h-3.5" />
                      {jobStats.pendingList.length} Pending Job{jobStats.pendingList.length !== 1 ? "s" : ""}
                    </span>
                    {jobsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {jobsExpanded && (
                    <div className="divide-y divide-amber-100 bg-white">
                      {jobStats.pendingList.map(j => (
                        <div key={j.id} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{j.title}</p>
                            <p className="text-[10px] font-mono text-slate-400">{j.id}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">Pending</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <Wrench className="w-3.5 h-3.5" /> Service Performance
              </p>
              <span className={`text-sm font-bold ${sc.text}`}>{displaySvcPerf}%</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${sc.bar} transition-all duration-500`} style={{ width: `${displaySvcPerf}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Total" value={svcStats.total} cls="text-slate-800" />
                <StatCard label="Pending" value={svcStats.pending} cls="text-amber-500" />
                <StatCard label="Done" value={svcStats.completed} cls="text-emerald-600" />
              </div>

              {selectedDate && svcStats.pendingList.length > 0 && (
                <div className="border border-amber-200 rounded-xl overflow-hidden mt-2">
                  <button
                    onClick={() => setServicesExpanded(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-amber-50 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <ClipboardList className="w-3.5 h-3.5" />
                      {svcStats.pendingList.length} Pending Service{svcStats.pendingList.length !== 1 ? "s" : ""}
                    </span>
                    {servicesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {servicesExpanded && (
                    <div className="divide-y divide-amber-100 bg-white">
                      {svcStats.pendingList.map(s => (
                        <div key={s.id} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{s.title}</p>
                            <p className="text-[10px] font-mono text-slate-400">{s.id}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">Pending</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}