"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Phone,
  Mail,
  Briefcase,
  Wrench,
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
  User,
  Hash,
  CalendarDays,
  Tag,
  Building2,
  Activity,
  TrendingUp,
  Star,
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
    pill: string;
    icon: React.ReactNode;
  }
> = {
  completed: {
    label: "Completed",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
    pill: "bg-green-100 text-green-700 border-green-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  started: {
    label: "In Progress",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
    pill: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
    pill: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-400",
    pill: "bg-red-100 text-red-600 border-red-200",
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

const perfLabel = (pct: number) => {
  if (pct >= 95)
    return {
      color: "text-green-600",
      bar: "bg-green-500",
      badge: "Excellent",
      badgeCls: "bg-green-100 text-green-700",
    };
  if (pct >= 88)
    return {
      color: "text-blue-600",
      bar: "bg-blue-500",
      badge: "Good",
      badgeCls: "bg-blue-100 text-blue-700",
    };
  if (pct >= 80)
    return {
      color: "text-amber-600",
      bar: "bg-amber-400",
      badge: "Fair",
      badgeCls: "bg-amber-100 text-amber-700",
    };
  return {
    color: "text-red-500",
    bar: "bg-red-400",
    badge: "Needs Attention",
    badgeCls: "bg-red-100 text-red-600",
  };
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

const zoneStyle: Record<
  Zone,
  { gradient: string; accentColor: string; avatarBg: string; badge: string }
> = {
  OUTSTATION: {
    gradient: "from-indigo-500 to-blue-600",
    accentColor: "text-indigo-600",
    avatarBg: "bg-indigo-100 text-indigo-700",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  COLOMBO: {
    gradient: "from-violet-500 to-purple-600",
    accentColor: "text-violet-600",
    avatarBg: "bg-violet-100 text-violet-700",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
  },
  SUBURBS: {
    gradient: "from-emerald-500 to-teal-600",
    accentColor: "text-emerald-600",
    avatarBg: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  P2P: {
    gradient: "from-purple-500 to-fuchsia-600",
    accentColor: "text-purple-600",
    avatarBg: "bg-purple-100 text-purple-700",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
  },
  UNKNOWN: {
    gradient: "from-slate-500 to-slate-600",
    accentColor: "text-slate-600",
    avatarBg: "bg-slate-100 text-slate-700",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
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
    <div className="flex items-start gap-3 py-3 border-b border-stone-100 last:border-0">
      <span className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 shrink-0 mt-0.5">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm text-stone-800 font-medium break-words leading-relaxed">
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

  const headerBg =
    isJob || isPendingJob
      ? "from-stone-700 to-stone-900"
      : "from-indigo-600 to-violet-700";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        style={{ animation: "dialogIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Mobile drag handle */}
        <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Header */}
        <div className={`bg-gradient-to-br ${headerBg} px-6 pt-5 pb-7`}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                {isJob || isPendingJob ? (
                  <Briefcase className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Wrench className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
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

          <h2 className="text-xl font-bold text-white mb-1 truncate">
            {job?.customerName || svc?.customerName || pj?.technician || "—"}
          </h2>
          <p className="text-sm text-white/50 font-mono">
            {job?.jobId ||
              (svc ? `Service Visit #${svc.expected_visit_no}` : pj?.id) ||
              "—"}
          </p>

          <div className="mt-4">
            {!isPendingJob && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border bg-white/15 text-white border-white/20`}
              >
                {cfg.icon} {cfg.label}
              </span>
            )}
            {isPendingJob && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${isOverdue ? "bg-red-100 text-red-700 border border-red-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}
              >
                <Clock className="w-3.5 h-3.5" />
                {isOverdue
                  ? `${daysAbs} days overdue`
                  : daysLeft === 0
                    ? "Due today"
                    : `${daysLeft} days left`}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[50vh] overflow-y-auto">
          {(job?.location || svc?.location || pj?.location) && (
            <DetailRow
              icon={<MapPin className="w-3.5 h-3.5" />}
              label="Location"
            >
              {job?.location || svc?.location || pj?.location}
            </DetailRow>
          )}

          {job && (
            <>
              {job.date && (
                <DetailRow
                  icon={<CalendarDays className="w-3.5 h-3.5" />}
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
                <DetailRow
                  icon={<Tag className="w-3.5 h-3.5" />}
                  label="Job Type"
                >
                  {(job as any).jobType}
                </DetailRow>
              )}
              {(job as any).description && (
                <DetailRow
                  icon={<ClipboardList className="w-3.5 h-3.5" />}
                  label="Description"
                >
                  {(job as any).description}
                </DetailRow>
              )}
              {(job as any).branch && (
                <DetailRow
                  icon={<Building2 className="w-3.5 h-3.5" />}
                  label="Branch"
                >
                  {(job as any).branch}
                </DetailRow>
              )}
              {(job as any).technician && (
                <DetailRow
                  icon={<User className="w-3.5 h-3.5" />}
                  label="Technician"
                >
                  {(job as any).technician}
                </DetailRow>
              )}
              {(job as any).phone && (
                <DetailRow
                  icon={<Phone className="w-3.5 h-3.5" />}
                  label="Phone"
                >
                  {(job as any).phone}
                </DetailRow>
              )}
              {(job as any).email && (
                <DetailRow
                  icon={<Mail className="w-3.5 h-3.5" />}
                  label="Email"
                >
                  {(job as any).email}
                </DetailRow>
              )}
            </>
          )}

          {svc && (
            <>
              <DetailRow
                icon={<Activity className="w-3.5 h-3.5" />}
                label="Visit Number"
              >
                Service Visit #{svc.expected_visit_no}
              </DetailRow>
              <DetailRow
                icon={<Clock className="w-3.5 h-3.5" />}
                label="Due Status"
              >
                <span
                  className={
                    isOverdue
                      ? "text-red-600 font-semibold"
                      : daysLeft === 0
                        ? "text-amber-600 font-semibold"
                        : "text-stone-700"
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
                  icon={<CalendarDays className="w-3.5 h-3.5" />}
                  label="Scheduled"
                >
                  {new Date((svc as any).scheduledDate).toLocaleDateString(
                    "en-GB",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </DetailRow>
              )}
              {(svc as any).jobType && (
                <DetailRow icon={<Tag className="w-3.5 h-3.5" />} label="Type">
                  {(svc as any).jobType}
                </DetailRow>
              )}
              {(svc as any).description && (
                <DetailRow
                  icon={<ClipboardList className="w-3.5 h-3.5" />}
                  label="Notes"
                >
                  {(svc as any).description}
                </DetailRow>
              )}
              {(svc as any).phone && (
                <DetailRow
                  icon={<Phone className="w-3.5 h-3.5" />}
                  label="Phone"
                >
                  {(svc as any).phone}
                </DetailRow>
              )}
            </>
          )}

          {pj && (
            <>
              {pj.jobType && (
                <DetailRow
                  icon={<Tag className="w-3.5 h-3.5" />}
                  label="Job Type"
                >
                  {pj.jobType}
                </DetailRow>
              )}
              <DetailRow
                icon={<Activity className="w-3.5 h-3.5" />}
                label="Due Status"
              >
                <span
                  className={
                    isOverdue
                      ? "text-red-600 font-semibold"
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
                <DetailRow
                  icon={<Phone className="w-3.5 h-3.5" />}
                  label="Phone"
                >
                  {(pj as any).phone}
                </DetailRow>
              )}
              {(pj as any).description && (
                <DetailRow
                  icon={<ClipboardList className="w-3.5 h-3.5" />}
                  label="Notes"
                >
                  {(pj as any).description}
                </DetailRow>
              )}
            </>
          )}

          {extraFields.map(([key, val]) => (
            <DetailRow
              key={key}
              icon={<Hash className="w-3.5 h-3.5" />}
              label={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
            >
              {String(val)}
            </DetailRow>
          ))}
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dialogIn {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to   { transform: translateY(0) scale(1);       opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Mini Stat ─────────────────────────────────────────────────────────────────

function MiniStat({
  label,
  value,
  valueClass,
  icon,
}: {
  label: string;
  value: number;
  valueClass: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-stone-100 shadow-sm p-3 gap-1">
      <span className={`text-stone-300 mb-0.5`}>{icon}</span>
      <p className={`text-2xl font-bold leading-none ${valueClass}`}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
        {label}
      </p>
    </div>
  );
}

// ── Performance Card ──────────────────────────────────────────────────────────

function PerformanceCard({
  title,
  icon,
  pct,
  total,
  done,
  active,
  pending,
}: {
  title: string;
  icon: React.ReactNode;
  pct: number;
  total: number;
  done: number;
  active: number;
  pending: number;
}) {
  const p = perfLabel(pct);
  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500">
              {icon}
            </span>
            <span className="text-sm font-bold text-stone-700">{title}</span>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold leading-none ${p.color}`}>
              {pct.toFixed(1)}%
            </p>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badgeCls}`}
            >
              {p.badge}
            </span>
          </div>
        </div>

        {/* Progress track */}
        <div className="relative h-3 bg-stone-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full ${p.bar} transition-all duration-700`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <MiniStat
            label="Total"
            value={total}
            valueClass="text-stone-800"
            icon={<ClipboardList className="w-3.5 h-3.5" />}
          />
          <MiniStat
            label="Done"
            value={done}
            valueClass="text-green-600"
            icon={<CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
          />
          <MiniStat
            label="Active"
            value={active}
            valueClass="text-blue-600"
            icon={<Clock className="w-3.5 h-3.5 text-blue-400" />}
          />
          <MiniStat
            label="Pending"
            value={pending}
            valueClass="text-amber-600"
            icon={<AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
          />
        </div>
      </div>
    </div>
  );
}

// ── Job Row ───────────────────────────────────────────────────────────────────

function JobRow({ job, onClick }: { job: Job; onClick: () => void }) {
  const cfg = getStatusConfig(job.status);
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-stone-50 active:bg-stone-100 transition-colors text-left group"
    >
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-stone-800 truncate">
            {job.customerName ?? "—"}
          </p>
          <span className="text-[10px] font-mono text-stone-400 shrink-0 bg-stone-100 px-1.5 py-0.5 rounded">
            {job.jobId}
          </span>
        </div>
        {job.location && (
          <p className="text-xs text-stone-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" />
            {job.location}
          </p>
        )}
      </div>
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.pill} shrink-0`}
      >
        {cfg.icon}
        {cfg.label}
      </span>
      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-400 transition-colors shrink-0" />
    </button>
  );
}

// ── Service Row ───────────────────────────────────────────────────────────────

function ServiceRow({
  svc,
  onClick,
}: {
  svc: ServiceVisit;
  onClick: () => void;
}) {
  const cfg = getStatusConfig(svc.status);
  const isOverdue = svc.daysLeft < 0;
  const daysAbs = Math.abs(svc.daysLeft);
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-stone-50 active:bg-stone-100 transition-colors text-left group"
    >
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-stone-800 truncate">
            {svc.customerName ?? "—"}
          </p>
          <span className="text-[10px] text-stone-400 shrink-0">
            SV#{svc.expected_visit_no}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {svc.location && (
            <span className="text-xs text-stone-400 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {svc.location}
            </span>
          )}
          <span
            className={`text-xs font-medium shrink-0 ${isOverdue ? "text-red-500" : svc.daysLeft === 0 ? "text-amber-600" : "text-stone-400"}`}
          >
            {isOverdue
              ? `${daysAbs}d overdue`
              : svc.daysLeft === 0
                ? "Due today"
                : `${daysAbs}d left`}
          </span>
        </div>
      </div>
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.pill} shrink-0`}
      >
        {cfg.icon}
        {cfg.label}
      </span>
      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-400 transition-colors shrink-0" />
    </button>
  );
}

// ── Pending Job Row ───────────────────────────────────────────────────────────

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
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-stone-50 active:bg-stone-100 transition-colors text-left group"
    >
      <div
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${isOverdue ? "bg-red-400" : "bg-amber-400"}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-stone-800 truncate">
            {job.technician || "—"}
          </p>
          <span className="text-[10px] font-mono text-stone-400 shrink-0 bg-stone-100 px-1.5 py-0.5 rounded">
            {job.id}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {job.location && (
            <span className="text-xs text-stone-400 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {job.location}
            </span>
          )}
          {job.jobType && (
            <span className="text-xs text-stone-400 shrink-0">
              {job.jobType}
            </span>
          )}
        </div>
      </div>
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${isOverdue ? "bg-red-50 text-red-600 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}
      >
        <Clock className="w-3 h-3" />
        {isOverdue
          ? `${Math.abs(job.daysLeft)}d overdue`
          : job.daysLeft === 0
            ? "Due today"
            : `${job.daysLeft}d left`}
      </span>
      <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-400 transition-colors shrink-0" />
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
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500">
            {icon}
          </span>
          <span className="text-sm font-bold text-stone-800">{title}</span>
          {count !== undefined && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              {count}
            </span>
          )}
          {loading && (
            <Loader2 className="w-3.5 h-3.5 text-stone-400 animate-spin" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {headerExtra}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${open ? "bg-stone-800" : "bg-stone-100"}`}
          >
            {open ? (
              <ChevronUp className="w-4 h-4 text-white" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-500" />
            )}
          </div>
        </div>
      </button>

      {open && <div className="border-t border-stone-100">{children}</div>}
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
    <div className="flex items-center gap-1.5 px-4 py-3 flex-wrap border-b border-stone-100 bg-stone-50/60">
      {filters.map((f) => {
        const cfg = f !== "all" ? getStatusConfig(f) : null;
        const isActive = active === f;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all capitalize
              ${
                isActive
                  ? f === "all"
                    ? "bg-stone-800 text-white border-stone-800 shadow-sm"
                    : `${cfg!.bg} ${cfg!.text} ${cfg!.border} shadow-sm`
                  : "bg-white text-stone-400 border-stone-200 hover:border-stone-300 hover:text-stone-600"
              }`}
          >
            {f === "started" ? "In Progress" : f}
          </button>
        );
      })}
    </div>
  );
}

// ── Month Filter ──────────────────────────────────────────────────────────────

function ServiceMonthFilter({
  selectedMonth,
  selectedYear,
  onMonthChange,
}: {
  selectedMonth: number | null;
  selectedYear: number;
  onMonthChange: (year: number, month: number) => void;
}) {
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  return (
    <div className="p-4 bg-stone-50/60 space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPickerYear((y) => y - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-stone-200 text-stone-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold text-stone-700">{pickerYear}</span>
        <button
          onClick={() => setPickerYear((y) => y + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-stone-200 text-stone-500 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {MONTHS.map((m, idx) => {
          const isActive = selectedMonth === idx && selectedYear === pickerYear;
          return (
            <button
              key={m}
              onClick={() => onMonthChange(pickerYear, idx)}
              className={`py-1.5 rounded-xl text-[11px] font-bold transition-colors border
                ${isActive ? "bg-stone-800 text-white border-stone-800 shadow-sm" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50"}`}
            >
              {m.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Empty / Loading ───────────────────────────────────────────────────────────

const EmptyState = ({ message }: { message: string }) => (
  <div className="py-14 text-center">
    <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
      <ClipboardList className="w-6 h-6 text-stone-300" />
    </div>
    <p className="text-sm text-stone-400 font-medium">{message}</p>
  </div>
);

const LoadingRows = () => (
  <div className="py-14 flex flex-col items-center gap-2">
    <Loader2 className="w-6 h-6 text-stone-300 animate-spin" />
    <p className="text-xs text-stone-400">Loading...</p>
  </div>
);

// ── Contact Info ──────────────────────────────────────────────────────────────

function ContactCard({ email, phone }: { email?: string; phone?: string }) {
  const hasEmail = email && email !== "-";
  const hasPhone = !!phone;
  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-stone-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
          Contact Information
        </p>
      </div>
      <div className="divide-y divide-stone-100">
        <div className="flex items-center gap-3 px-5 py-3.5">
          <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 text-stone-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
              Email
            </p>
            <p
              className={`text-sm font-medium ${hasEmail ? "text-stone-800" : "text-stone-400 italic"}`}
            >
              {hasEmail ? email : "Not provided"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-5 py-3.5">
          <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-stone-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-0.5">
              Phone
            </p>
            <p
              className={`text-sm font-medium ${hasPhone ? "text-stone-800" : "text-stone-400 italic"}`}
            >
              {hasPhone ? phone : "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const [dialogItem, setDialogItem] = useState<{
    item: Job | ServiceVisit | PendingJob;
    type: "job" | "service" | "pendingJob";
  } | null>(null);

  const today = new Date();
  const [svcMonth, setSvcMonth] = useState<number | null>(today.getMonth());
  const [svcYear, setSvcYear] = useState<number>(today.getFullYear());

  const [allJobFilter, setAllJobFilter] = useState<FilterStatus>("all");
  const [pendingSvcFilter, setPendingSvcFilter] = useState<FilterStatus>("all");
  const [allSvcFilter, setAllSvcFilter] = useState<FilterStatus>("all");

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

  const currentRange = useMemo(
    () => getMonthRange(svcYear, svcMonth ?? today.getMonth()),
    [svcMonth, svcYear],
  );

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
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
          </div>
          <p className="text-sm text-stone-500 font-semibold">
            Loading technician…
          </p>
        </div>
      </div>
    );
  }

  if (error || !tech) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 p-10 bg-stone-50">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-stone-800 text-base font-bold mb-1">
            {error ?? `Technician ${techCode} not found.`}
          </p>
          <p className="text-stone-400 text-sm">
            Please check the technician code and try again.
          </p>
        </div>
        <button
          onClick={() => router.push("/technicians")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 text-white text-sm font-bold hover:bg-stone-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Technicians
        </button>
      </div>
    );
  }

  const zone = normalizeZone(tech.zone);
  const zs = zoneStyle[zone];
  const svcRangeLabel =
    svcMonth !== null ? `${MONTHS[svcMonth]} ${svcYear}` : "All";

  return (
    <div className="min-h-screen bg-stone-50">
      {dialogItem && (
        <DetailDialog
          item={dialogItem.item}
          type={dialogItem.type}
          onClose={() => setDialogItem(null)}
        />
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        className={`relative bg-gradient-to-br ${zs.gradient} overflow-hidden`}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative px-5 md:px-10 pt-6 pb-16 max-w-5xl mx-auto">
          {/* Back nav */}
          <button
            onClick={() => router.push("/technicians")}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-semibold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />{" "}
            Back to Technicians
          </button>

          {/* Profile */}
          <div className="flex items-start gap-5">
            <div
              className={`w-20 h-20 rounded-3xl ${zs.avatarBg} flex items-center justify-center text-2xl font-black shrink-0 shadow-lg`}
            >
              {getInitials(tech.name)}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-1">
                Field Technician
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight truncate mb-2">
                {tech.name}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-white/60 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  {tech.techCode}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${zs.badge}`}
                >
                  {getZoneLabel(zone)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-10 -mt-8 pb-12 max-w-5xl mx-auto space-y-4">
        {/* Contact */}
        <ContactCard email={tech.email} phone={tech.phone} />

        {/* Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PerformanceCard
            title="Job Performance"
            icon={<Briefcase className="w-4 h-4" />}
            pct={tech.jobPerformancePercentage}
            total={tech.allJobs}
            done={tech.completeJobs}
            active={tech.startedJobs}
            pending={tech.pendingJobs}
          />
          <PerformanceCard
            title="Service Performance"
            icon={<Wrench className="w-4 h-4" />}
            pct={tech.servicePerformancePercentage}
            total={tech.allServices}
            done={tech.completeServices}
            active={tech.startedServices}
            pending={tech.pendingServices}
          />
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
            <div className="divide-y divide-stone-100">
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
            <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
              {svcRangeLabel}
            </span>
          }
        >
          <div className="border-b border-stone-100">
            <ServiceMonthFilter
              selectedMonth={svcMonth}
              selectedYear={svcYear}
              onMonthChange={handleMonthChange}
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
              message={`No ${pendingSvcFilter !== "all" ? pendingSvcFilter + " " : ""}services for ${svcRangeLabel}.`}
            />
          ) : (
            <div className="divide-y divide-stone-100">
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
              message={`No ${allJobFilter !== "all" ? allJobFilter + " " : ""}jobs found.`}
            />
          ) : (
            <div className="divide-y divide-stone-100">
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
            <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
              {svcRangeLabel}
            </span>
          }
        >
          <div className="border-b border-stone-100">
            <ServiceMonthFilter
              selectedMonth={svcMonth}
              selectedYear={svcYear}
              onMonthChange={handleMonthChange}
            />
          </div>
          <StatusFilterBar active={allSvcFilter} onChange={setAllSvcFilter} />
          {allServicesLoading ? (
            <LoadingRows />
          ) : filteredAllServices.length === 0 ? (
            <EmptyState
              message={`No ${allSvcFilter !== "all" ? allSvcFilter + " " : ""}services for ${svcRangeLabel}.`}
            />
          ) : (
            <div className="divide-y divide-stone-100">
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
