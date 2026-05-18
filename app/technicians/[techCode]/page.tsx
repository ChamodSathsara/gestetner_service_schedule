"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
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
  Loader2,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  User,
  Hash,
  CalendarDays,
  Tag,
  Building2,
  Activity,
} from "lucide-react";
import {
  Zone,
  Job,
  ServiceVisit,
  useApiConfig,
  TechnicianDetailsByTechCode,
  PendingJob,
} from "@/hooks/apiconfig";

// ── Types ─────────────────────────────────────────────────────────────────────

interface JobOrService {
  id: string;
  title: string;
  status: "completed" | "pending" | "started";
  customerName?: string;
  location?: string;
}

interface DailyRecord {
  date: string;
  jobs: JobOrService[];
  services: JobOrService[];
}

type FilterStatus = "all" | "pending" | "started" | "completed" | "cancelled";

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    dot: string;
    icon: React.ReactNode;
  }
> = {
  completed: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  started: {
    label: "In Progress",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-400",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const getStatusConfig = (status: string) =>
  STATUS_CONFIG[status?.toLowerCase()] ?? STATUS_CONFIG["pending"];

// ── Helpers ───────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const perfColor = (pct: number) => {
  if (pct >= 95) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (pct >= 88) return { bar: "bg-sky-500", text: "text-sky-600" };
  if (pct >= 80) return { bar: "bg-amber-500", text: "text-amber-600" };
  return { bar: "bg-rose-400", text: "text-rose-500" };
};

const normalizeZone = (zone: string): Zone => {
  const z = zone?.toUpperCase().trim() || "";
  if (
    [
      "EASTERN",
      "GALLE",
      "JAFFNA",
      "KURUNEGALA",
      "OTH",
      "OUT",
      "OUTSTATION",
      "PUTTLAM",
      "SABRAGAMUWA",
      "TRINCO",
      "TECHNICAL - OUTSTATION",
    ].includes(z)
  )
    return "OUTSTATION";
  if (["COL", "COLOMBO"].includes(z)) return "COLOMBO";
  if (["AVISSAWELLA", "SUB"].includes(z)) return "SUBURBS";
  if (["P2P OUT", "P2P COL", "P2P", "P2P SUB"].includes(z)) return "P2P";
  return "UNKNOWN";
};

const zoneIdentity: Record<Zone, { gradient: string; avatarBg: string }> = {
  OUTSTATION: {
    gradient: "from-blue-600 via-blue-700 to-indigo-800",
    avatarBg: "bg-blue-500/30",
  },
  COLOMBO: {
    gradient: "from-violet-600 via-violet-700 to-purple-800",
    avatarBg: "bg-violet-500/30",
  },
  SUBURBS: {
    gradient: "from-emerald-600 via-emerald-700 to-teal-800",
    avatarBg: "bg-emerald-500/30",
  },
  P2P: {
    gradient: "from-purple-600 via-purple-700 to-fuchsia-800",
    avatarBg: "bg-purple-500/30",
  },
  UNKNOWN: {
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    avatarBg: "bg-slate-500/30",
  },
};

const getZoneLabel = (zone: Zone) =>
  ({
    OUTSTATION: "Outstation",
    COLOMBO: "Colombo",
    SUBURBS: "Suburbs",
    P2P: "P2P",
    UNKNOWN: "Other",
  })[zone] ?? zone;

// ── Month helpers ─────────────────────────────────────────────────────────────

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthRange = (year: number, month: number) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastDate = new Date(year, month + 1, 0).getDate();
  return {
    firstday: `${year}-${pad(month + 1)}-01`,
    lastday: `${year}-${pad(month + 1)}-${pad(lastDate)}`,
  };
};

// ── Detail Dialog ─────────────────────────────────────────────────────────────

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
      <span className="text-slate-400 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-slate-800 font-medium break-words">
          {children}
        </p>
      </div>
    </div>
  );
}

function DetailDialog({
  item,
  type,
  onClose,
}: {
  item: Job | ServiceVisit | PendingJob | null;
  type: "job" | "service" | "pendingJob";
  onClose: () => void;
}) {
  if (!item) return null;

  const isJob = type === "job";
  const isPendingJob = type === "pendingJob";
  const isService = type === "service";

  const job = isJob ? (item as Job) : null;
  const svc = isService ? (item as ServiceVisit) : null;
  const pj = isPendingJob ? (item as PendingJob) : null;

  const status = job?.status || svc?.status || "pending";
  const cfg = getStatusConfig(status);

  const daysLeft = svc?.daysLeft ?? pj?.daysLeft ?? 0;
  const daysAbs = Math.abs(daysLeft);
  const isOverdue = daysLeft < 0;

  // Collect all extra fields
  const knownKeys = new Set([
    "id",
    "jobId",
    "customerName",
    "location",
    "status",
    "date",
    "jobType",
    "description",
    "daysLeft",
    "expected_visit_no",
    "technician",
    "phone",
    "email",
    "branch",
  ]);
  const extraFields = Object.entries(item).filter(
    ([key, val]) =>
      !knownKeys.has(key) &&
      val !== null &&
      val !== undefined &&
      val !== "" &&
      val !== "-",
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Drag handle (mobile) */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Colored header */}
        <div
          className={`px-6 pt-5 pb-6 ${isJob || isPendingJob ? "bg-gradient-to-br from-slate-800 to-slate-900" : "bg-gradient-to-br from-indigo-700 to-violet-900"}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                {isJob || isPendingJob ? (
                  <Briefcase className="w-4 h-4 text-white" />
                ) : (
                  <Wrench className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                {isPendingJob
                  ? "Pending Job"
                  : isJob
                    ? "Job Details"
                    : "Service Visit"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xl font-bold text-white leading-tight truncate">
                {job?.customerName ||
                  svc?.customerName ||
                  pj?.technician ||
                  "—"}
              </p>
              <p className="text-sm text-white/50 font-mono mt-1">
                {job?.jobId ||
                  (svc ? `SV${svc.expected_visit_no}` : pj?.id) ||
                  "—"}
              </p>
            </div>

            {!isPendingJob && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}
              >
                {cfg.icon}
                {cfg.label}
              </span>
            )}
            {isPendingJob && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border shrink-0 ${isOverdue ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}
              >
                <Clock className="w-3.5 h-3.5" />
                {isOverdue
                  ? `${daysAbs}d overdue`
                  : daysLeft === 0
                    ? "Due today"
                    : `${daysLeft}d left`}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-2.5 max-h-[55vh] overflow-y-auto">
          {/* Location */}
          {(job?.location || svc?.location || pj?.location) && (
            <DetailRow icon={<MapPin className="w-4 h-4" />} label="Location">
              {job?.location || svc?.location || pj?.location}
            </DetailRow>
          )}

          {/* Job fields */}
          {job && (
            <>
              {job.date && (
                <DetailRow
                  icon={<CalendarDays className="w-4 h-4" />}
                  label="Date"
                >
                  {new Date(job.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </DetailRow>
              )}
              {(job as any).jobType && (
                <DetailRow icon={<Tag className="w-4 h-4" />} label="Job Type">
                  {(job as any).jobType}
                </DetailRow>
              )}
              {(job as any).description && (
                <DetailRow
                  icon={<ClipboardList className="w-4 h-4" />}
                  label="Description"
                >
                  {(job as any).description}
                </DetailRow>
              )}
              {(job as any).branch && (
                <DetailRow
                  icon={<Building2 className="w-4 h-4" />}
                  label="Branch"
                >
                  {(job as any).branch}
                </DetailRow>
              )}
              {(job as any).technician && (
                <DetailRow
                  icon={<User className="w-4 h-4" />}
                  label="Technician"
                >
                  {(job as any).technician}
                </DetailRow>
              )}
              {(job as any).phone && (
                <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone">
                  {(job as any).phone}
                </DetailRow>
              )}
              {(job as any).email && (
                <DetailRow icon={<Mail className="w-4 h-4" />} label="Email">
                  {(job as any).email}
                </DetailRow>
              )}
            </>
          )}

          {/* Service fields */}
          {svc && (
            <>
              <DetailRow
                icon={<Activity className="w-4 h-4" />}
                label="Visit No."
              >
                Service Visit #{svc.expected_visit_no}
              </DetailRow>
              <DetailRow
                icon={<Clock className="w-4 h-4" />}
                label="Due Status"
              >
                <span
                  className={
                    isOverdue
                      ? "text-rose-600 font-semibold"
                      : daysLeft === 0
                        ? "text-amber-600 font-semibold"
                        : ""
                  }
                >
                  {isOverdue
                    ? `${daysAbs} days overdue`
                    : daysLeft === 0
                      ? "Due today"
                      : `${daysAbs} days remaining`}
                </span>
              </DetailRow>
              {(svc as any).scheduledDate && (
                <DetailRow
                  icon={<CalendarDays className="w-4 h-4" />}
                  label="Scheduled"
                >
                  {new Date((svc as any).scheduledDate).toLocaleDateString(
                    "en-GB",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </DetailRow>
              )}
              {(svc as any).jobType && (
                <DetailRow icon={<Tag className="w-4 h-4" />} label="Type">
                  {(svc as any).jobType}
                </DetailRow>
              )}
              {(svc as any).description && (
                <DetailRow
                  icon={<ClipboardList className="w-4 h-4" />}
                  label="Notes"
                >
                  {(svc as any).description}
                </DetailRow>
              )}
              {(svc as any).phone && (
                <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone">
                  {(svc as any).phone}
                </DetailRow>
              )}
            </>
          )}

          {/* Pending job fields */}
          {pj && (
            <>
              {pj.jobType && (
                <DetailRow icon={<Tag className="w-4 h-4" />} label="Job Type">
                  {pj.jobType}
                </DetailRow>
              )}
              <DetailRow
                icon={<Activity className="w-4 h-4" />}
                label="Due Status"
              >
                <span
                  className={
                    isOverdue
                      ? "text-rose-600 font-semibold"
                      : daysLeft === 0
                        ? "text-amber-600 font-semibold"
                        : ""
                  }
                >
                  {isOverdue
                    ? `${daysAbs} days overdue`
                    : daysLeft === 0
                      ? "Due today"
                      : `${daysAbs} days remaining`}
                </span>
              </DetailRow>
              {(pj as any).phone && (
                <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone">
                  {(pj as any).phone}
                </DetailRow>
              )}
              {(pj as any).description && (
                <DetailRow
                  icon={<ClipboardList className="w-4 h-4" />}
                  label="Notes"
                >
                  {(pj as any).description}
                </DetailRow>
              )}
            </>
          )}

          {/* Extra fields fallback */}
          {extraFields.map(([key, val]) => (
            <DetailRow
              key={key}
              icon={<Hash className="w-4 h-4" />}
              label={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
            >
              {String(val)}
            </DetailRow>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(32px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Mini Calendar ─────────────────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MiniCalendar({
  availableDates,
  selectedDate,
  onSelect,
}: {
  availableDates: Set<string>;
  selectedDate: string;
  onSelect: (d: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };
  const pad = (n: number) => String(n).padStart(2, "0");
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const todayStr = today.toISOString().split("T")[0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold text-slate-700">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 px-3 pt-2 pb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-semibold text-slate-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const ds = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
          const hasData = availableDates.has(ds);
          const isSel = ds === selectedDate;
          const isToday = ds === todayStr;
          return (
            <button
              key={ds}
              disabled={!hasData}
              onClick={() => onSelect(isSel ? "" : ds)}
              className={`relative mx-auto w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all
                ${isSel ? "bg-slate-800 text-white" : hasData ? "text-slate-700 hover:bg-slate-100 cursor-pointer" : "text-slate-300 cursor-default"}
                ${isToday && !isSel ? "font-bold ring-2 ring-blue-400 ring-offset-1" : ""}`}
            >
              {day}
              {hasData && !isSel && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  cls,
}: {
  label: string;
  value: number;
  cls: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold ${cls}`}>{value}</p>
    </div>
  );
}

// ── Job Row (clickable) ───────────────────────────────────────────────────────

function JobRow({ job, onClick }: { job: Job; onClick: () => void }) {
  const cfg = getStatusConfig(job.status);
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {job.customerName ?? "—"}
            </p>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              {job.jobId}
            </span>
          </div>
          {job.location && (
            <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {job.location}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${cfg.bg} ${cfg.text} ${cfg.border}`}
        >
          {cfg.icon}
          {cfg.label}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>
    </button>
  );
}

// ── Service Row (clickable) ───────────────────────────────────────────────────

function ServiceRow({
  svc,
  onClick,
}: {
  svc: ServiceVisit;
  onClick: () => void;
}) {
  const cfg = getStatusConfig(svc.status);
  const daysAbs = Math.abs(svc.daysLeft);
  const isOverdue = svc.daysLeft < 0;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {svc.customerName ?? "—"}
            </p>
            <span className="text-[10px] text-slate-400 shrink-0">
              SV{svc.expected_visit_no}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {svc.location && (
              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {svc.location}
              </p>
            )}
            <span
              className={`text-[11px] font-medium shrink-0 ${isOverdue ? "text-rose-500" : "text-slate-400"}`}
            >
              {isOverdue
                ? `${daysAbs}d overdue`
                : svc.daysLeft === 0
                  ? "Due today"
                  : `${daysAbs}d left`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${cfg.bg} ${cfg.text} ${cfg.border}`}
        >
          {cfg.icon}
          {cfg.label}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>
    </button>
  );
}

// ── Pending Job Row (clickable) ───────────────────────────────────────────────

function PendingJobRow({
  job,
  onClick,
}: {
  job: PendingJob;
  onClick: () => void;
}) {
  const isOverdue = job.daysLeft < 0;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group cursor-pointer"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${isOverdue ? "bg-rose-400" : "bg-amber-400"}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {job.technician || "—"}
            </p>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              {job.id}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {job.location && (
              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {job.location}
              </p>
            )}
            {job.jobType && (
              <span className="text-[11px] text-slate-400 shrink-0">
                {job.jobType}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${isOverdue ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}
        >
          <Clock className="w-3.5 h-3.5" />
          {isOverdue
            ? `${Math.abs(job.daysLeft)}d overdue`
            : job.daysLeft === 0
              ? "Due today"
              : `${job.daysLeft}d left`}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </div>
    </button>
  );
}

// ── Expandable Section ────────────────────────────────────────────────────────

function ExpandableSection({
  title,
  icon,
  count,
  loading,
  children,
  headerExtra,
  onOpen,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  loading?: boolean;
  children: React.ReactNode;
  headerExtra?: React.ReactNode;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [fetched, setFetched] = useState(false);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && !fetched) {
      setFetched(true);
      onOpen?.();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-slate-500">{icon}</span>
          <span className="text-sm font-semibold text-slate-800">{title}</span>
          {count !== undefined && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {count}
            </span>
          )}
          {loading && (
            <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />
          )}
        </div>
        <div className="flex items-center gap-2.5">
          {headerExtra}
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${open ? "bg-slate-800" : "bg-slate-100"}`}
          >
            {open ? (
              <ChevronUp className="w-3.5 h-3.5 text-white" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </div>
        </div>
      </button>
      {open && <div className="border-t border-slate-100">{children}</div>}
    </div>
  );
}

// ── Status Filter Bar ─────────────────────────────────────────────────────────

function StatusFilterBar({
  active,
  onChange,
}: {
  active: FilterStatus;
  onChange: (s: FilterStatus) => void;
}) {
  const filters: FilterStatus[] = [
    "all",
    "pending",
    "started",
    "completed",
    "cancelled",
  ];
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 flex-wrap border-b border-slate-100 bg-slate-50/50">
      {filters.map((f) => {
        const cfg = f === "all" ? null : getStatusConfig(f);
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all capitalize
              ${
                active === f
                  ? f === "all"
                    ? "bg-slate-800 text-white border-slate-800"
                    : `${cfg!.bg} ${cfg!.text} ${cfg!.border}`
                  : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"
              }`}
          >
            {f === "started" ? "In Progress" : f}
          </button>
        );
      })}
    </div>
  );
}

// ── Service Date Filter ───────────────────────────────────────────────────────

function ServiceDateFilter({
  selectedMonth,
  selectedYear,
  customFrom,
  customTo,
  onMonthChange,
  onCustomRange,
  onReset,
}: {
  selectedMonth: number | null;
  selectedYear: number;
  customFrom: string;
  customTo: string;
  onMonthChange: (year: number, month: number) => void;
  onCustomRange: (from: string, to: string) => void;
  onReset: () => void;
}) {
  const [mode, setMode] = useState<"month" | "custom">("month");
  const [fromVal, setFromVal] = useState(customFrom);
  const [toVal, setToVal] = useState(customTo);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());

  return (
    <div className="p-4 space-y-3 bg-slate-50/50">
      <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold bg-white">
        <button
          onClick={() => setMode("month")}
          className={`flex-1 py-2 transition-colors ${mode === "month" ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-50"}`}
        >
          By month
        </button>
        <button
          onClick={() => setMode("custom")}
          className={`flex-1 py-2 transition-colors ${mode === "custom" ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-50"}`}
        >
          Custom range
        </button>
      </div>

      {mode === "month" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setPickerYear((y) => y - 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-700">
              {pickerYear}
            </span>
            <button
              onClick={() => setPickerYear((y) => y + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {MONTHS.map((m, idx) => {
              const isActive =
                selectedMonth === idx && selectedYear === pickerYear;
              return (
                <button
                  key={m}
                  onClick={() => onMonthChange(pickerYear, idx)}
                  className={`py-1.5 rounded-lg text-[11px] font-semibold transition-colors border
                    ${isActive ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
                >
                  {m.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === "custom" && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                From
              </label>
              <input
                type="date"
                value={fromVal}
                onChange={(e) => setFromVal(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 bg-white focus:outline-none focus:border-slate-400"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] text-slate-400 font-semibold block mb-1">
                To
              </label>
              <input
                type="date"
                value={toVal}
                onChange={(e) => setToVal(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 bg-white focus:outline-none focus:border-slate-400"
              />
            </div>
          </div>
          <button
            onClick={() => {
              if (fromVal && toVal) onCustomRange(fromVal, toVal);
            }}
            disabled={!fromVal || !toVal}
            className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white disabled:opacity-40 hover:bg-slate-700 transition-colors"
          >
            Apply range
          </button>
        </div>
      )}

      {(selectedMonth !== null || customFrom) && (
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 transition-colors py-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset filter
        </button>
      )}
    </div>
  );
}

// ── Empty / Loading ───────────────────────────────────────────────────────────

const EmptyState = ({ message }: { message: string }) => (
  <div className="py-12 text-center">
    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
      <ClipboardList className="w-5 h-5 text-slate-300" />
    </div>
    <p className="text-sm text-slate-400 font-medium">{message}</p>
  </div>
);

const LoadingRows = () => (
  <div className="py-12 flex justify-center">
    <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TechnicianDetailPage() {
  const params = useParams();
  const router = useRouter();
  const techCode = (params?.techCode as string)?.toUpperCase();

  const {
    GetTechnitianDetailsByTechCode,
    GetTechnitianPendingJobs,
    GetTechnitianPendingServices,
    getTechnitianAllJobs,
    getTechnitianAllServices,
  } = useApiConfig();

  const [tech, setTech] = useState<TechnicianDetailsByTechCode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pendingJobs, setPendingJobs] = useState<PendingJob[]>([]);
  const [pendingJobsLoading, setPendingJobsLoading] = useState(false);
  const [pendingJobsFetched, setPendingJobsFetched] = useState(false);

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [allJobsLoading, setAllJobsLoading] = useState(false);
  const [allJobsFetched, setAllJobsFetched] = useState(false);

  const [pendingServices, setPendingServices] = useState<ServiceVisit[]>([]);
  const [pendingServicesLoading, setPendingServicesLoading] = useState(false);
  const [pendingServicesFetched, setPendingServicesFetched] = useState(false);

  const [allServices, setAllServices] = useState<ServiceVisit[]>([]);
  const [allServicesLoading, setAllServicesLoading] = useState(false);
  const [allServicesFetched, setAllServicesFetched] = useState(false);

  // ── Dialog state ──────────────────────────────────────────────────────────
  const [dialogItem, setDialogItem] = useState<{
    item: Job | ServiceVisit | PendingJob;
    type: "job" | "service" | "pendingJob";
  } | null>(null);

  const today = new Date();
  const [svcMonth, setSvcMonth] = useState<number | null>(today.getMonth());
  const [svcYear, setSvcYear] = useState<number>(today.getFullYear());
  const [svcCustomFrom, setSvcCustomFrom] = useState<string>("");
  const [svcCustomTo, setSvcCustomTo] = useState<string>("");

  const [allJobFilter, setAllJobFilter] = useState<FilterStatus>("all");
  const [pendingSvcFilter, setPendingSvcFilter] = useState<FilterStatus>("all");
  const [allSvcFilter, setAllSvcFilter] = useState<FilterStatus>("all");

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [calOpen, setCalOpen] = useState(false);

  useEffect(() => {
    if (!techCode) return;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetTechnitianDetailsByTechCode(techCode);
        const item = Array.isArray(data) ? data[0] : data;
        if (!item) throw new Error("Technician not found");
        setTech(item);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load technician data");
      } finally {
        setLoading(false);
      }
    })();
  }, [techCode]);

  const currentRange = useMemo(() => {
    if (svcCustomFrom && svcCustomTo)
      return { firstday: svcCustomFrom, lastday: svcCustomTo };
    if (svcMonth !== null) return getMonthRange(svcYear, svcMonth);
    return getMonthRange(today.getFullYear(), today.getMonth());
  }, [svcMonth, svcYear, svcCustomFrom, svcCustomTo]);

  const fetchPendingJobs = useCallback(async () => {
    if (!techCode || pendingJobsFetched) return;
    setPendingJobsFetched(true);
    setPendingJobsLoading(true);
    try {
      setPendingJobs(await GetTechnitianPendingJobs(techCode));
    } catch (e) {
      console.error(e);
    } finally {
      setPendingJobsLoading(false);
    }
  }, [techCode, pendingJobsFetched]);

  const fetchAllJobs = useCallback(async () => {
    if (!techCode || allJobsFetched) return;
    setAllJobsFetched(true);
    setAllJobsLoading(true);
    try {
      setAllJobs(await getTechnitianAllJobs(techCode));
    } catch (e) {
      console.error(e);
    } finally {
      setAllJobsLoading(false);
    }
  }, [techCode, allJobsFetched]);

  const fetchPendingServices = useCallback(
    async (firstday: string, lastday: string) => {
      if (!techCode) return;
      setPendingServicesLoading(true);
      try {
        setPendingServices(
          await GetTechnitianPendingServices(techCode, firstday, lastday),
        );
      } catch (e) {
        console.error(e);
      } finally {
        setPendingServicesLoading(false);
      }
    },
    [techCode],
  );

  const fetchAllServices = useCallback(
    async (firstday: string, lastday: string) => {
      if (!techCode) return;
      setAllServicesLoading(true);
      try {
        setAllServices(
          await getTechnitianAllServices(techCode, firstday, lastday),
        );
      } catch (e) {
        console.error(e);
      } finally {
        setAllServicesLoading(false);
      }
    },
    [techCode],
  );

  useEffect(() => {
    if (pendingServicesFetched)
      fetchPendingServices(currentRange.firstday, currentRange.lastday);
  }, [currentRange]);
  useEffect(() => {
    if (allServicesFetched)
      fetchAllServices(currentRange.firstday, currentRange.lastday);
  }, [currentRange]);

  const handleMonthChange = (year: number, month: number) => {
    setSvcMonth(month);
    setSvcYear(year);
    setSvcCustomFrom("");
    setSvcCustomTo("");
  };
  const handleCustomRange = (from: string, to: string) => {
    setSvcCustomFrom(from);
    setSvcCustomTo(to);
    setSvcMonth(null);
  };
  const handleSvcReset = () => {
    setSvcMonth(today.getMonth());
    setSvcYear(today.getFullYear());
    setSvcCustomFrom("");
    setSvcCustomTo("");
  };

  const onOpenPendingJobs = useCallback(
    () => fetchPendingJobs(),
    [fetchPendingJobs],
  );
  const onOpenPendingServices = useCallback(() => {
    if (!pendingServicesFetched) {
      setPendingServicesFetched(true);
      fetchPendingServices(currentRange.firstday, currentRange.lastday);
    }
  }, [pendingServicesFetched, currentRange, fetchPendingServices]);
  const onOpenAllJobs = useCallback(() => fetchAllJobs(), [fetchAllJobs]);
  const onOpenAllServices = useCallback(() => {
    if (!allServicesFetched) {
      setAllServicesFetched(true);
      fetchAllServices(currentRange.firstday, currentRange.lastday);
    }
  }, [allServicesFetched, currentRange, fetchAllServices]);

  const dailyRecordsMap = useMemo(() => new Map<string, DailyRecord>(), []);
  const availableDatesSet = useMemo(
    () => new Set(Array.from(dailyRecordsMap.keys())),
    [dailyRecordsMap],
  );
  const handleDateSelect = (d: string) => {
    setSelectedDate(d);
    if (d) setCalOpen(false);
  };

  const filteredPendingServices = useMemo(
    () =>
      pendingSvcFilter === "all"
        ? pendingServices
        : pendingServices.filter(
            (s) => s.status?.toLowerCase() === pendingSvcFilter,
          ),
    [pendingServices, pendingSvcFilter],
  );

  const filteredAllJobs = useMemo(
    () =>
      allJobFilter === "all"
        ? allJobs
        : allJobs.filter((j) => j.status?.toLowerCase() === allJobFilter),
    [allJobs, allJobFilter],
  );

  const filteredAllServices = useMemo(
    () =>
      allSvcFilter === "all"
        ? allServices
        : allServices.filter((s) => s.status?.toLowerCase() === allSvcFilter),
    [allServices, allSvcFilter],
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Loading technician…
          </p>
        </div>
      </div>
    );
  }

  if (error || !tech) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 bg-slate-50">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center">
          <XCircle className="w-7 h-7 text-rose-500" />
        </div>
        <p className="text-slate-600 text-base font-semibold">
          {error ?? `Technician ${techCode} not found.`}
        </p>
        <button
          onClick={() => router.push("/technicians")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technicians
        </button>
      </div>
    );
  }

  const zone = normalizeZone(tech.zone);
  const identity = zoneIdentity[zone];
  const dayRecord = selectedDate ? dailyRecordsMap.get(selectedDate) : null;

  const jobStats = dayRecord
    ? {
        total: dayRecord.jobs.length,
        pending: dayRecord.jobs.filter((j) => j.status === "pending").length,
        completed: dayRecord.jobs.filter((j) => j.status === "completed")
          .length,
        started: dayRecord.jobs.filter((j) => j.status === "started").length,
      }
    : {
        total: tech.allJobs,
        pending: tech.pendingJobs,
        completed: tech.completeJobs,
        started: tech.startedJobs,
      };

  const svcStats = dayRecord
    ? {
        total: dayRecord.services.length,
        pending: dayRecord.services.filter((s) => s.status === "pending")
          .length,
        completed: dayRecord.services.filter((s) => s.status === "completed")
          .length,
        started: dayRecord.services.filter((s) => s.status === "started")
          .length,
      }
    : {
        total: tech.allServices,
        pending: tech.pendingServices,
        completed: tech.completeServices,
        started: tech.startedServices,
      };

  const displayJobPerf =
    selectedDate && jobStats.total > 0
      ? Math.round((jobStats.completed / jobStats.total) * 100)
      : tech.jobPerformancePercentage;
  const displaySvcPerf =
    selectedDate && svcStats.total > 0
      ? Math.round((svcStats.completed / svcStats.total) * 100)
      : tech.servicePerformancePercentage;
  const jc = perfColor(displayJobPerf);
  const sc = perfColor(displaySvcPerf);

  const displayDate = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const svcRangeLabel =
    svcCustomFrom && svcCustomTo
      ? `${new Date(svcCustomFrom).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${new Date(svcCustomTo).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
      : svcMonth !== null
        ? `${MONTHS[svcMonth]} ${svcYear}`
        : "All";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Detail dialog */}
      {dialogItem && (
        <DetailDialog
          item={dialogItem.item}
          type={dialogItem.type}
          onClose={() => setDialogItem(null)}
        />
      )}

      {/* Hero header */}
      <div
        className={`bg-gradient-to-br ${identity.gradient} px-6 md:px-10 pt-8 pb-14 relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <button
          onClick={() => router.push("/technicians")}
          className="relative flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technicians
        </button>
        <div className="relative flex items-center gap-5">
          <div
            className={`w-[4.5rem] h-[4.5rem] rounded-2xl ${identity.avatarBg} border border-white/20 flex items-center justify-center text-white font-bold text-xl shrink-0`}
          >
            {getInitials(tech.name)}
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 mb-1">
              Field Technician
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {tech.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-xs font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded-md">
                {tech.techCode}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                {getZoneLabel(zone)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content (pulled up to overlap hero) */}
      <div className="px-4 md:px-10 -mt-6 pb-10 max-w-5xl mx-auto space-y-4">
        {/* Contact + Date filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Contact
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <span className="text-sm text-slate-700">
                  {tech.email && tech.email !== "-"
                    ? tech.email
                    : "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <span className="text-sm text-slate-700">
                  {tech.phone || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Calendar className="w-3 h-3" /> Filter by Date
              </p>
            </div>
            <div className="p-5">
              <button
                onClick={() => setCalOpen((v) => !v)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${selectedDate ? "border-slate-800 bg-slate-800 text-white" : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"}`}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  {selectedDate ? displayDate : "Select a date…"}
                </span>
                <span className="flex items-center gap-1.5">
                  {selectedDate && (
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDateSelect("");
                        setCalOpen(false);
                      }}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </span>
                  )}
                  {calOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>
              {calOpen && (
                <div className="mt-3">
                  <MiniCalendar
                    availableDates={availableDatesSet}
                    selectedDate={selectedDate}
                    onSelect={handleDateSelect}
                  />
                  <p className="mt-2 text-[11px] text-amber-500 text-center font-medium">
                    Daily breakdown unavailable — showing totals.
                  </p>
                </div>
              )}
              {!calOpen && (
                <p className="mt-2 text-[11px] text-slate-400 text-center">
                  {selectedDate
                    ? `Showing data for ${displayDate}`
                    : "Showing all-time totals"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Briefcase className="w-3.5 h-3.5" /> Job Performance
              </p>
              <span className={`text-lg font-bold ${jc.text}`}>
                {displayJobPerf.toFixed(1)}%
              </span>
            </div>
            <div className="p-5 space-y-4">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${jc.bar} transition-all duration-700`}
                  style={{ width: `${displayJobPerf}%` }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <StatCard
                  label="Total"
                  value={jobStats.total}
                  cls="text-slate-800"
                />
                <StatCard
                  label="Done"
                  value={jobStats.completed}
                  cls="text-emerald-600"
                />
                <StatCard
                  label="Active"
                  value={jobStats.started}
                  cls="text-sky-500"
                />
                <StatCard
                  label="Pending"
                  value={jobStats.pending}
                  cls="text-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Wrench className="w-3.5 h-3.5" /> Service Performance
              </p>
              <span className={`text-lg font-bold ${sc.text}`}>
                {displaySvcPerf.toFixed(1)}%
              </span>
            </div>
            <div className="p-5 space-y-4">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${sc.bar} transition-all duration-700`}
                  style={{ width: `${displaySvcPerf}%` }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <StatCard
                  label="Total"
                  value={svcStats.total}
                  cls="text-slate-800"
                />
                <StatCard
                  label="Done"
                  value={svcStats.completed}
                  cls="text-emerald-600"
                />
                <StatCard
                  label="Active"
                  value={svcStats.started}
                  cls="text-sky-500"
                />
                <StatCard
                  label="Pending"
                  value={svcStats.pending}
                  cls="text-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Jobs */}
        <ExpandableSection
          title="Pending Jobs"
          icon={<Briefcase className="w-4 h-4" />}
          count={pendingJobsFetched ? pendingJobs.length : undefined}
          loading={pendingJobsLoading}
          onOpen={onOpenPendingJobs}
        >
          {pendingJobsLoading ? (
            <LoadingRows />
          ) : pendingJobs.length === 0 ? (
            <EmptyState message="No pending jobs found." />
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingJobs.map((job) => (
                <PendingJobRow
                  key={job.id}
                  job={job}
                  onClick={() =>
                    setDialogItem({ item: job, type: "pendingJob" })
                  }
                />
              ))}
            </div>
          )}
        </ExpandableSection>

        {/* Pending Services */}
        <ExpandableSection
          title="Pending Services"
          icon={<Wrench className="w-4 h-4" />}
          count={
            pendingServicesFetched ? filteredPendingServices.length : undefined
          }
          loading={pendingServicesLoading}
          onOpen={onOpenPendingServices}
          headerExtra={
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {svcRangeLabel}
            </span>
          }
        >
          <div className="border-b border-slate-100">
            <ServiceDateFilter
              selectedMonth={svcMonth}
              selectedYear={svcYear}
              customFrom={svcCustomFrom}
              customTo={svcCustomTo}
              onMonthChange={handleMonthChange}
              onCustomRange={handleCustomRange}
              onReset={handleSvcReset}
            />
          </div>
          <StatusFilterBar
            active={pendingSvcFilter}
            onChange={setPendingSvcFilter}
          />
          {pendingServicesLoading ? (
            <LoadingRows />
          ) : filteredPendingServices.length === 0 ? (
            <EmptyState
              message={`No ${pendingSvcFilter === "all" ? "" : pendingSvcFilter + " "}services for ${svcRangeLabel}.`}
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredPendingServices.map((svc) => (
                <ServiceRow
                  key={svc.id}
                  svc={svc}
                  onClick={() => setDialogItem({ item: svc, type: "service" })}
                />
              ))}
            </div>
          )}
        </ExpandableSection>

        {/* All Jobs */}
        <ExpandableSection
          title="All Jobs"
          icon={<ClipboardList className="w-4 h-4" />}
          count={allJobsFetched ? filteredAllJobs.length : undefined}
          loading={allJobsLoading}
          onOpen={onOpenAllJobs}
        >
          <StatusFilterBar active={allJobFilter} onChange={setAllJobFilter} />
          {allJobsLoading ? (
            <LoadingRows />
          ) : filteredAllJobs.length === 0 ? (
            <EmptyState
              message={`No ${allJobFilter === "all" ? "" : allJobFilter + " "}jobs found.`}
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredAllJobs.map((job) => (
                <JobRow
                  key={job.jobId}
                  job={job}
                  onClick={() => setDialogItem({ item: job, type: "job" })}
                />
              ))}
            </div>
          )}
        </ExpandableSection>

        {/* All Services */}
        <ExpandableSection
          title="All Services"
          icon={<ClipboardList className="w-4 h-4" />}
          count={allServicesFetched ? filteredAllServices.length : undefined}
          loading={allServicesLoading}
          onOpen={onOpenAllServices}
          headerExtra={
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {svcRangeLabel}
            </span>
          }
        >
          <div className="border-b border-slate-100">
            <ServiceDateFilter
              selectedMonth={svcMonth}
              selectedYear={svcYear}
              customFrom={svcCustomFrom}
              customTo={svcCustomTo}
              onMonthChange={handleMonthChange}
              onCustomRange={handleCustomRange}
              onReset={handleSvcReset}
            />
          </div>
          <StatusFilterBar active={allSvcFilter} onChange={setAllSvcFilter} />
          {allServicesLoading ? (
            <LoadingRows />
          ) : filteredAllServices.length === 0 ? (
            <EmptyState
              message={`No ${allSvcFilter === "all" ? "" : allSvcFilter + " "}services for ${svcRangeLabel}.`}
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredAllServices.map((svc) => (
                <ServiceRow
                  key={svc.id}
                  svc={svc}
                  onClick={() => setDialogItem({ item: svc, type: "service" })}
                />
              ))}
            </div>
          )}
        </ExpandableSection>
      </div>
    </div>
  );
}
