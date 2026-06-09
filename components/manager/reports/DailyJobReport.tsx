"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useApiConfig } from "@/hooks/apiconfig";

// ─── Current-year defaults ────────────────────────────────────────────────────


const CURRENT_YEAR  = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth(); // 0-indexed

const DEFAULT_START = new Date(CURRENT_YEAR, CURRENT_MONTH, 1)
  .toISOString()
  .split("T")[0];                             // e.g. "2026-06-01"

const DEFAULT_END = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0)
  .toISOString()
  .split("T")[0];  

// ─── Types ────────────────────────────────────────────────────────────────────
type JobStatus =
  | "Completed"
  | "Started"
  | "Pending"
  | "Pending Estimate"
  | "Cancelled"
  | string;
type AgreementStatus = "MA" | "FS" | "NS" | "EX" | string;
type TeamLabel =
  | "Colombo"
  | "Outstation"
  | "Suburb"
  | "P2P"
  | "Laptop Repair"
  | "Electronic"
  | "POS"
  | "Unknown"
  | string;

interface MappedJob {
  djId: string;
  date: string;
  serialNo: string;
  machineRef: string;
  model: string;
  techCode: string;
  techMobile: string;
  cusName: string;
  cusStatus: AgreementStatus;
  cusType: string;
  jobStatus: JobStatus;
  team: TeamLabel;
  addr: string;
  tel: string;
  note: string;
  crBy: string;
  crDate: string;
  completedDate: string;
  completeBy: string;
  cancelledBy: string;
  cancelledDate: string;
  startedDate: string;
  startedBy: string;
  cancelReason: string;
  solutionCat: string;
  solution: string;
  recallId: string;
}

// ─── Mapping helpers ──────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, string> = {
  CANCELLED: "Cancelled",
  COMPLETE: "Completed",
  COMPLETED: "Completed",
  "PENDING ESTIMATE": "Pending Estimate",
  STARTED: "Started",
  started: "Started",
  "TECH ALLOCATED": "Pending",
  COMPLET: "Completed",
};

const TEAM_MAP: Record<string, TeamLabel> = {
  COL: "Colombo",
  OUT: "Outstation",
  SUB: "Suburb",
  "ELE OUT": "Electronic",
  "LPR COL": "Laptop Repair",
  "LPR OUT": "Laptop Repair",
  "LPR SUB": "Laptop Repair",
  our: "Unknown",
  P2P: "P2P",
  "P2P COL": "P2P",
  "P2P OUT": "P2P",
  "P2P SUB": "P2P",
  PC: "Unknown",
  PCS: "Unknown",
  POS: "POS",
  PP: "Unknown",
  CONSUMABLE: "Unknown",
  DEL: "Unknown",
  WS: "Unknown",
  WORKSHOP: "Unknown",
  "-": "Unknown",
  "0": "Unknown",
  "": "Unknown",
};

const AGREE_LABEL: Record<string, string> = {
  MA: "Maintenance Agreement",
  FS: "Free Service",
  NS: "No Service",
  EX: "Extended Service",
};

function mapStatus(s: string | null | undefined): string {
  if (!s) return "Pending";
  return STATUS_MAP[s] ?? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
function mapTeam(t: string | null | undefined): TeamLabel {
  if (!t) return "Unknown";
  return TEAM_MAP[t.trim()] ?? TEAM_MAP[t.trim().toUpperCase()] ?? "Unknown";
}
function mapRow(r: any): MappedJob {
  return {
    djId: r.dJ_ID ?? r.DJ_ID ?? "",
    date: r.dJ_DATE ?? r.DJ_DATE ?? "",
    serialNo: r.seriaL_NO ?? r.SERIAL_NO ?? "",
    machineRef: r.machinE_REF_NO ?? r.MACHINE_REF_NO ?? "",
    model: r.machinE_MODEL_NAME ?? r.MACHINE_MODEL_NAME ?? "",
    techCode: r.tecH_CODE ?? r.TECH_CODE ?? "",
    techMobile: r.tecH_MOBILE ?? r.TECH_MOBILE ?? "",
    cusName: r.cuS_NAME ?? r.CUS_NAME ?? "",
    cusStatus: r.cuS_STATUS ?? r.CUS_STATUS ?? "",
    cusType: r.cuS_TYPE ?? r.CUS_TYPE ?? "",
    jobStatus: mapStatus(r.joB_STATUS ?? r.JOB_STATUS),
    team: mapTeam(r.teaM_NAME ?? r.TEAM_NAME),
    addr: [
      r.cuS_ADD1 ?? r.CUS_ADD1,
      r.cuS_ADD2 ?? r.CUS_ADD2,
      r.cuS_ADD3 ?? r.CUS_ADD3,
    ]
      .filter((a) => a && a !== "-")
      .join(", "),
    tel: r.cuS_TEL_NO ?? r.CUS_TEL_NO ?? "",
    note: r.note ?? r.NOTE ?? "",
    crBy: r.cR_BY ?? r.CR_BY ?? "",
    crDate: r.cR_DATE ?? r.CR_DATE ?? "",
    completedDate: r.completeD_DATE ?? r.COMPLETED_DATE ?? "",
    completeBy: r.completE_BY ?? r.COMPLETE_BY ?? "",
    cancelledBy: r.cancelleD_BY ?? r.CANCELLED_BY ?? "",
    cancelledDate: r.cancelleD_DATE ?? r.CANCELLED_DATE ?? "",
    startedDate: r.starteD_DATE ?? r.STARTED_DATE ?? "",
    startedBy: r.starteD_BY ?? r.STARTED_BY ?? "",
    cancelReason: r.cancelleD_REASON ?? r.CANCELLED_REASON ?? "",
    solutionCat: r.solutioN_CATEGORY ?? r.SOLUTION_CATEGORY ?? "",
    solution: r.completE_SOLUTION ?? r.COMPLETE_SOLUTION ?? "",
    recallId: r.recalL_ID ?? r.RECALL_ID ?? "",
  };
}

// ─── Duration helpers ─────────────────────────────────────────────────────────

/** Returns diff in minutes between two ISO date strings, or null */
function diffMinutes(
  from: string | null | undefined,
  to: string | null | undefined,
): number | null {
  if (!from || !to) return null;
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  if (isNaN(a) || isNaN(b) || b <= a) return null;
  return Math.round((b - a) / 60000);
}

/** Format minutes → "Xh Ym" or "Ym" */
function fmtMins(mins: number | null): string {
  if (mins === null) return "—";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/**
 * Duration badge colour rules:
 *  ≤ 120 min  → green
 *  121–180    → blue
 *  > 180      → red
 */
function durationCfg(
  mins: number | null,
): { bg: string; color: string; border: string } | null {
  if (mins === null) return null;
  if (mins <= 120)
    return { bg: "#F0FDF4", color: "#166534", border: "#BBF7D0" };
  if (mins <= 180)
    return { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" };
  return { bg: "#FEF2F2", color: "#991B1B", border: "#FECACA" };
}

// ─── Style configs ────────────────────────────────────────────────────────────
const STATUS_CFG: Record<
  string,
  { bg: string; color: string; dot: string; border: string }
> = {
  Completed: {
    bg: "#F0FDF4",
    color: "#166534",
    dot: "#22C55E",
    border: "#BBF7D0",
  },
  Started: {
    bg: "#EFF6FF",
    color: "#1D4ED8",
    dot: "#3B82F6",
    border: "#BFDBFE",
  },
  Pending: {
    bg: "#FFFBEB",
    color: "#92400E",
    dot: "#F59E0B",
    border: "#FDE68A",
  },
  "Pending Estimate": {
    bg: "#FFFBEB",
    color: "#92400E",
    dot: "#F59E0B",
    border: "#FDE68A",
  },
  Cancelled: {
    bg: "#FEF2F2",
    color: "#991B1B",
    dot: "#EF4444",
    border: "#FECACA",
  },
};

const AGREE_CFG: Record<string, { bg: string; color: string; border: string }> =
  {
    MA: { bg: "#F0FDF4", color: "#166534", border: "#BBF7D0" },
    FS: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
    NS: { bg: "#F8FAFC", color: "#475569", border: "#E2E8F0" },
    EX: { bg: "#F5F3FF", color: "#5B21B6", border: "#DDD6FE" },
  };

const TEAM_CFG: Record<string, { bg: string; color: string; border: string }> =
  {
    Colombo: { bg: "#F5F3FF", color: "#5B21B6", border: "#DDD6FE" },
    Outstation: { bg: "#F0FDF4", color: "#166534", border: "#BBF7D0" },
    Suburb: { bg: "#FFFBEB", color: "#92400E", border: "#FDE68A" },
    P2P: { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
    "Laptop Repair": { bg: "#FDF2F8", color: "#9D174D", border: "#FBCFE8" },
    Electronic: { bg: "#ECFDF5", color: "#065F46", border: "#A7F3D0" },
    POS: { bg: "#FFF7ED", color: "#9A3412", border: "#FED7AA" },
    Unknown: { bg: "#F8FAFC", color: "#475569", border: "#E2E8F0" },
  };

const STAT_COUNT_CFG = [
  { key: "ALL", label: "Total", darkColor: "#94A3B8" },
  { key: "Completed", label: "Completed", darkColor: "#4ADE80" },
  { key: "Started", label: "Started", darkColor: "#60A5FA" },
  { key: "Pending", label: "Pending", darkColor: "#FCD34D" },
  { key: "Cancelled", label: "Cancelled", darkColor: "#F87171" },
];

const PAGE_SIZE = 15;

// ─── Utility ──────────────────────────────────────────────────────────────────
function fmtDate(d: string | null | undefined): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}
function fmtDateTime(d: string | null | undefined): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function toCSV(data: MappedJob[]): string {
  const headers = [
    "DJ ID",
    "Date",
    "Serial No",
    "Machine Ref",
    "Model",
    "Tech Code",
    "Customer",
    "Agreement",
    "Team",
    "Job Status",
    "Tel No",
    "Address",
    "Created By",
    "Created Date",
    "Completed By",
    "Completed Date",
    "Started By",
    "Started Date",
    "Cancelled By",
    "Cancelled Date",
    "Cancel Reason",
    "Solution Category",
    "Solution",
  ];
  const rows = data.map((r) => [
    r.djId,
    r.date,
    r.serialNo,
    r.machineRef,
    r.model,
    r.techCode,
    r.cusName,
    r.cusStatus,
    r.team,
    r.jobStatus,
    r.tel,
    r.addr,
    r.crBy,
    r.crDate,
    r.completeBy,
    r.completedDate,
    r.startedBy,
    r.startedDate,
    r.cancelledBy,
    r.cancelledDate,
    r.cancelReason,
    r.solutionCat,
    r.solution,
  ]);
  return [headers, ...rows]
    .map((row) =>
      row.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

// ─── Small badge ──────────────────────────────────────────────────────────────
function Badge({
  children,
  bg,
  color,
  border,
  dot,
}: {
  children: React.ReactNode;
  bg: string;
  color: string;
  border: string;
  dot?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: bg,
        color,
        border: `1px solid ${border}`,
        whiteSpace: "nowrap",
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: dot,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status];
  if (!cfg)
    return (
      <span style={{ fontSize: 11, color: "#64748B" }}>{status || "—"}</span>
    );
  return (
    <Badge bg={cfg.bg} color={cfg.color} border={cfg.border} dot={cfg.dot}>
      {status}
    </Badge>
  );
}
function AgreeBadge({ status }: { status: string }) {
  const cfg = AGREE_CFG[status];
  if (!cfg)
    return (
      <span style={{ fontSize: 11, color: "#64748B" }}>{status || "—"}</span>
    );
  return (
    <Badge bg={cfg.bg} color={cfg.color} border={cfg.border}>
      {status}
    </Badge>
  );
}
function TeamBadge({ team }: { team: string }) {
  const cfg = TEAM_CFG[team] ?? TEAM_CFG["Unknown"];
  return (
    <Badge bg={cfg.bg} color={cfg.color} border={cfg.border}>
      {team}
    </Badge>
  );
}
function DurationBadge({
  mins,
  label,
}: {
  mins: number | null;
  label: string;
}) {
  const cfg = durationCfg(mins);
  if (!cfg || mins === null)
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>
          {label}
        </div>
        <span style={{ fontSize: 11, color: "#CBD5E1" }}>—</span>
      </div>
    );
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>
        {label}
      </div>
      <Badge bg={cfg.bg} color={cfg.color} border={cfg.border}>
        {fmtMins(mins)}
      </Badge>
    </div>
  );
}

function Chip({
  label,
  selected,
  cfg,
  onClick,
}: {
  label: string;
  selected: boolean;
  cfg?: { bg: string; color: string; border: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 13px",
        borderRadius: 20,
        border:
          selected && cfg ? `1px solid ${cfg.border}` : "1px solid #E2E8F0",
        background: selected ? (cfg?.bg ?? "#0F172A") : "white",
        color: selected ? (cfg?.color ?? "white") : "#475569",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ─── Timeline section in drawer ───────────────────────────────────────────────
function TimelineSection({ job }: { job: MappedJob }) {
  const goSiteMins = diffMinutes(job.crDate, job.startedDate);
  const completeMins = diffMinutes(job.startedDate, job.completedDate);

  const Step = ({
    dot,
    title,
    by,
    date,
    active,
  }: {
    dot: string;
    title: string;
    by?: string;
    date?: string;
    active: boolean;
  }) => (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: active ? dot : "#E2E8F0",
            border: `2px solid ${active ? dot : "#E2E8F0"}`,
            flexShrink: 0,
            marginTop: 2,
          }}
        />
        <div
          style={{ width: 2, flex: 1, background: "#F1F5F9", marginTop: 3 }}
        />
      </div>
      <div style={{ paddingBottom: 4 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: active ? "#0F172A" : "#94A3B8",
          }}
        >
          {title}
        </div>
        {by && (
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}>
            {by}
          </div>
        )}
        {date && (
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>
            {fmtDateTime(date)}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1,
          color: "#94A3B8",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Timeline
      </div>

      {/* Steps */}
      <Step
        dot="#3B82F6"
        title="Job Created"
        by={job.crBy}
        date={job.crDate}
        active={!!job.crDate}
      />
      <Step
        dot="#F59E0B"
        title="On-Site / Started"
        by={job.startedBy}
        date={job.startedDate}
        active={!!job.startedDate}
      />
      {job.completeBy && (
        <Step
          dot="#22C55E"
          title="Completed"
          by={job.completeBy}
          date={job.completedDate}
          active={!!job.completedDate}
        />
      )}
      {job.cancelledBy && (
        <Step
          dot="#EF4444"
          title="Cancelled"
          by={job.cancelledBy}
          date={job.cancelledDate}
          active={!!job.cancelledDate}
        />
      )}

      {/* Duration summary */}
      {(goSiteMins !== null || completeMins !== null) && (
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 8,
            paddingTop: 12,
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <DurationBadge mins={goSiteMins} label="Go-Site Time" />
          <DurationBadge mins={completeMins} label="Complete Time" />
        </div>
      )}

      {/* Legend */}
      <div
        style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {[
          { label: "≤ 2h", bg: "#F0FDF4", color: "#166534", border: "#BBF7D0" },
          { label: "2–3h", bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
          { label: "> 3h", bg: "#FEF2F2", color: "#991B1B", border: "#FECACA" },
        ].map((l) => (
          <span
            key={l.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              padding: "2px 7px",
              borderRadius: 10,
              background: l.bg,
              color: l.color,
              border: `1px solid ${l.border}`,
            }}
          >
            {l.label}
          </span>
        ))}
        <span style={{ fontSize: 10, color: "#94A3B8", alignSelf: "center" }}>
          — duration colour guide
        </span>
      </div>
    </div>
  );
}

// ─── Detail drawer ────────────────────────────────────────────────────────────
function JobDetailDrawer({
  job,
  onClose,
}: {
  job: MappedJob;
  onClose: () => void;
}) {
  const acfg = AGREE_CFG[job.cusStatus];

  const Field = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            fontSize: 11,
            color: "#94A3B8",
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 13, color: "#1E293B" }}>{value}</div>
      </div>
    ) : null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15,23,42,0.35)",
          zIndex: 40,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 440,
          background: "white",
          zIndex: 50,
          overflowY: "auto",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            background: "#F8FAFC",
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>
              {job.djId}
            </div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>
              {fmtDate(job.date)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <StatusBadge status={job.jobStatus} />
            <button
              onClick={onClose}
              style={{
                border: "1px solid #E2E8F0",
                background: "white",
                borderRadius: 8,
                padding: "5px 10px",
                cursor: "pointer",
                fontSize: 16,
                color: "#64748B",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ padding: "20px", flex: 1 }}>
          {/* Customer */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#94A3B8",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Customer
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#0F172A",
                marginBottom: 4,
              }}
            >
              {job.cusName || "—"}
            </div>
            {job.addr && (
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>
                {job.addr}
              </div>
            )}
            {job.tel && job.tel !== "-" && (
              <div style={{ fontSize: 12, color: "#2563EB" }}>{job.tel}</div>
            )}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <AgreeBadge status={job.cusStatus} />
              {acfg && (
                <span
                  style={{
                    fontSize: 11,
                    color: "#64748B",
                    alignSelf: "center",
                  }}
                >
                  {AGREE_LABEL[job.cusStatus] ?? job.cusStatus}
                </span>
              )}
              <TeamBadge team={job.team} />
            </div>
          </div>

          {/* Machine */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#94A3B8",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Machine
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 16px",
              }}
            >
              <Field label="Machine Ref" value={job.machineRef} />
              <Field label="Model" value={job.model} />
              <Field label="Serial No" value={job.serialNo} />
              <Field label="Cus Type" value={job.cusType} />
            </div>
          </div>

          {/* Technician */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                color: "#94A3B8",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Technician
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 16px",
              }}
            >
              <Field label="Tech Code" value={job.techCode} />
              <Field label="Mobile" value={job.techMobile} />
            </div>
          </div>

          {/* ── Timeline with durations ── */}
          <TimelineSection job={job} />

          {/* Notes */}
          {(job.note ||
            job.cancelReason ||
            job.solutionCat ||
            job.solution) && (
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Notes & Resolution
              </div>
              <Field label="Note" value={job.note} />
              <Field label="Cancel Reason" value={job.cancelReason} />
              <Field label="Solution Category" value={job.solutionCat} />
              <Field label="Solution" value={job.solution} />
              {job.recallId && <Field label="Recall ID" value={job.recallId} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DailyJobReport() {
  const api = useApiConfig();

  const [data, setData] = useState<MappedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dlLoading, setDlLoading] = useState<"excel" | "pdf" | null>(null);
  const [selectedJob, setSelectedJob] = useState<MappedJob | null>(null);

  const [startDate, setStartDate] = useState(DEFAULT_START);
  const [lastDate, setLastDate] = useState(DEFAULT_END);

  // Filters
  const [teamF, setTeamF] = useState("ALL");
  const [statusF, setStatusF] = useState("ALL");
  const [agreeF, setAgreeF] = useState("ALL");
  const [qnoSearch, setQnoSearch] = useState(""); // Q. No search
  const [techSearch, setTechSearch] = useState(""); // Tech Code search
  const [dateF, setDateF] = useState(""); // single date filter
  const [page, setPage] = useState(1);

  // ── Load ──────────────────────────────────────────────────────────────────
  const loadData = useCallback(
    async (sd: string, ld: string) => {
      if (!sd || !ld) return;
      setLoading(true);
      setError(null);
      try {
        const raw = await api.GetDailyJobReportData(sd, ld);
        setData(raw.map(mapRow));
        setPage(1);
      } catch (e: any) {
        setError(e.message ?? "Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [api],
  );

  useEffect(() => {
    loadData(DEFAULT_START, DEFAULT_END);
  }, []); // eslint-disable-line

  // ── Downloads ──────────────────────────────────────────────────────────────
  const handleExcel = useCallback(async () => {
    if (!startDate || !lastDate) {
      setError("Please load data first.");
      return;
    }
    setDlLoading("excel");
    try {
      const blob = await api.downloadDailyJobReportExcel(startDate, lastDate);
      downloadBlob(blob, `DailyJobReport_${startDate}_to_${lastDate}.xlsx`);
    } catch (e: any) {
      setError(`Excel download failed: ${e.message}`);
    } finally {
      setDlLoading(null);
    }
  }, [startDate, lastDate, api]);

  const handlePdf = useCallback(async () => {
    if (!startDate || !lastDate) {
      setError("Please load data first.");
      return;
    }
    setDlLoading("pdf");
    try {
      const blob = await api.downloadDailyReportReportPdf(startDate, lastDate);
      downloadBlob(blob, `DailyJobReport_${startDate}_to_${lastDate}.pdf`);
    } catch (e: any) {
      setError(`PDF download failed: ${e.message}`);
    } finally {
      setDlLoading(null);
    }
  }, [startDate, lastDate, api]);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      data.filter((r) => {
        if (teamF !== "ALL" && r.team !== teamF) return false;
        if (agreeF !== "ALL" && r.cusStatus !== agreeF) return false;
        if (statusF !== "ALL") {
          if (statusF === "Pending") {
            if (r.jobStatus !== "Pending" && r.jobStatus !== "Pending Estimate")
              return false;
          } else {
            if (r.jobStatus !== statusF) return false;
          }
        }
        if (dateF && !r.date.startsWith(dateF)) return false;
        if (
          qnoSearch &&
          !r.machineRef.toLowerCase().includes(qnoSearch.toLowerCase())
        )
          return false;
        if (
          techSearch &&
          !r.techCode.toLowerCase().includes(techSearch.toLowerCase())
        )
          return false;
        return true;
      }),
    [data, teamF, agreeF, statusF, dateF, qnoSearch, techSearch],
  );

  const counts = useMemo(
    () => ({
      total: filtered.length,
      Completed: filtered.filter((r) => r.jobStatus === "Completed").length,
      Started: filtered.filter((r) => r.jobStatus === "Started").length,
      Pending: filtered.filter(
        (r) => r.jobStatus === "Pending" || r.jobStatus === "Pending Estimate",
      ).length,
      Cancelled: filtered.filter((r) => r.jobStatus === "Cancelled").length,
    }),
    [filtered],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageData = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const pgNums = useMemo(() => {
    const start = Math.max(1, Math.min(safePage - 2, totalPages - 4));
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);
  }, [safePage, totalPages]);

  const teams = useMemo(
    () => [...new Set(data.map((r) => r.team).filter(Boolean))].sort(),
    [data],
  );
  const statuses = useMemo(
    () => [...new Set(data.map((r) => r.jobStatus).filter(Boolean))].sort(),
    [data],
  );

  const hasFilters =
    teamF !== "ALL" ||
    statusF !== "ALL" ||
    agreeF !== "ALL" ||
    !!qnoSearch ||
    !!techSearch ||
    !!dateF;

  const clearAll = () => {
    setTeamF("ALL");
    setStatusF("ALL");
    setAgreeF("ALL");
    setQnoSearch("");
    setTechSearch("");
    setDateF("");
    setPage(1);
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    border: "1px solid #F1F5F9",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#94A3B8",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
  };
  const inputStyle: React.CSSProperties = {
    border: "1px solid #E2E8F0",
    borderRadius: 8,
    padding: "6px 10px",
    fontSize: 12,
    outline: "none",
    color: "#1E293B",
    background: "white",
  };

  return (
    <div
      style={{
        fontFamily:
          "'DM Sans','Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#0F172A 0%,#1E293B 100%)",
          padding: "20px 28px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div>
            <p
              style={{
                color: "#475569",
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 700,
                margin: "0 0 4px",
              }}
            >
              Field Operations
            </p>
            <h1
              style={{
                color: "white",
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Daily Job Report
            </h1>
            <p style={{ color: "#475569", fontSize: 11, margin: "4px 0 0" }}>
              {CURRENT_YEAR}
              {data.length > 0
                ? ` · ${data.length.toLocaleString()} jobs loaded`
                : ""}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <div>
              <span style={{ ...labelStyle, color: "#64748B" }}>From</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  borderRadius: 8,
                  padding: "7px 10px",
                  fontSize: 13,
                  outline: "none",
                  colorScheme: "dark",
                }}
              />
            </div>
            <div>
              <span style={{ ...labelStyle, color: "#64748B" }}>To</span>
              <input
                type="date"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  borderRadius: 8,
                  padding: "7px 10px",
                  fontSize: 13,
                  outline: "none",
                  colorScheme: "dark",
                }}
              />
            </div>
            <button
              onClick={() => loadData(startDate, lastDate)}
              disabled={loading || !startDate || !lastDate}
              style={{
                background: loading ? "#334155" : "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                height: 36,
              }}
            >
              {loading ? "⟳ Loading…" : "⟳ Load"}
            </button>
            <button
              onClick={handleExcel}
              disabled={dlLoading === "excel" || data.length === 0}
              style={{
                background:
                  dlLoading === "excel" || data.length === 0
                    ? "#334155"
                    : "#16A34A",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor:
                  dlLoading === "excel" || data.length === 0
                    ? "not-allowed"
                    : "pointer",
                height: 36,
              }}
            >
              {dlLoading === "excel" ? "…" : "↓ Excel"}
            </button>
            <button
              onClick={handlePdf}
              disabled={dlLoading === "pdf" || data.length === 0}
              style={{
                background:
                  dlLoading === "pdf" || data.length === 0
                    ? "#334155"
                    : "#DC2626",
                color: "white",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor:
                  dlLoading === "pdf" || data.length === 0
                    ? "not-allowed"
                    : "pointer",
                height: 36,
              }}
            >
              {dlLoading === "pdf" ? "…" : "↓ PDF"}
            </button>
            <button
              onClick={() =>
                downloadBlob(
                  new Blob([toCSV(filtered)], {
                    type: "text/csv;charset=utf-8;",
                  }),
                  `DailyJobs_${startDate}_${lastDate}.csv`,
                )
              }
              disabled={filtered.length === 0}
              style={{
                background: "rgba(255,255,255,0.08)",
                color: filtered.length === 0 ? "#334155" : "#94A3B8",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: filtered.length === 0 ? "not-allowed" : "pointer",
                height: 36,
              }}
            >
              ↓ CSV
            </button>
          </div>
        </div>

        {/* Stat cards */}
        {data.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {STAT_COUNT_CFG.map((c) => {
              const val =
                c.key === "ALL"
                  ? counts.total
                  : (counts[c.key as keyof typeof counts] ?? 0);
              const isActive =
                c.key === "ALL" ? statusF === "ALL" : statusF === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => {
                    setStatusF(c.key === "ALL" ? "ALL" : c.key);
                    setPage(1);
                  }}
                  style={{
                    background: isActive
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(255,255,255,0.05)",
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.25)"
                      : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "8px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    minWidth: 80,
                  }}
                >
                  <div
                    style={{
                      color: c.darkColor,
                      fontSize: 20,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {val.toLocaleString()}
                  </div>
                  <div
                    style={{
                      color: "#64748B",
                      fontSize: 10,
                      marginTop: 2,
                      fontWeight: 600,
                    }}
                  >
                    {c.label}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div
          style={{
            margin: "16px 28px",
            background: "white",
            borderRadius: 12,
            padding: "32px",
            textAlign: "center",
            color: "#94A3B8",
            fontSize: 13,
            border: "1px solid #F1F5F9",
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 8 }}>⟳</div>Loading{" "}
          {CURRENT_YEAR} jobs…
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <div
          style={{
            margin: "12px 28px",
            padding: "10px 16px",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 8,
            color: "#991B1B",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>⚠ {error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              background: "none",
              border: "none",
              color: "#991B1B",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Filters + Table ── */}
      {data.length > 0 && !loading && (
        <>
          {/* Row 1 — Team / Agreement / Status */}
          <div
            style={{
              background: "white",
              borderBottom: "1px solid #F1F5F9",
              padding: "12px 28px",
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <div>
              <span style={labelStyle}>Team</span>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Chip
                  label="All"
                  selected={teamF === "ALL"}
                  onClick={() => {
                    setTeamF("ALL");
                    setPage(1);
                  }}
                />
                {teams.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    selected={teamF === t}
                    cfg={TEAM_CFG[t] ?? TEAM_CFG["Unknown"]}
                    onClick={() => {
                      setTeamF(t);
                      setPage(1);
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <span style={labelStyle}>Agreement</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["ALL", "MA", "FS", "NS", "EX"].map((a) => (
                  <Chip
                    key={a}
                    label={a === "ALL" ? "All" : a}
                    selected={agreeF === a}
                    cfg={a !== "ALL" ? AGREE_CFG[a] : undefined}
                    onClick={() => {
                      setAgreeF(a);
                      setPage(1);
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <span style={labelStyle}>Job Status</span>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <Chip
                  label="All"
                  selected={statusF === "ALL"}
                  onClick={() => {
                    setStatusF("ALL");
                    setPage(1);
                  }}
                />
                {statuses.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    selected={
                      statusF === s ||
                      (statusF === "Pending" && s === "Pending Estimate")
                    }
                    cfg={
                      STATUS_CFG[s]
                        ? {
                            bg: STATUS_CFG[s].bg,
                            color: STATUS_CFG[s].color,
                            border: STATUS_CFG[s].border,
                          }
                        : undefined
                    }
                    onClick={() => {
                      setStatusF(s);
                      setPage(1);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — Q.No search / Tech Code search / Date / count */}
          <div
            style={{
              background: "white",
              borderBottom: "1px solid #F1F5F9",
              padding: "10px 28px",
              display: "flex",
              gap: 16,
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {/* Q. No */}
            <div>
              <span style={labelStyle}>Q. No</span>
              <input
                type="search"
                value={qnoSearch}
                onChange={(e) => {
                  setQnoSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Q. No…"
                style={{ ...inputStyle, width: 160 }}
              />
            </div>
            {/* Tech Code */}
            <div>
              <span style={labelStyle}>Tech Code</span>
              <input
                type="search"
                value={techSearch}
                onChange={(e) => {
                  setTechSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search tech code…"
                style={{ ...inputStyle, width: 160 }}
              />
            </div>
            {/* Single date filter */}
            <div>
              <span style={labelStyle}>Date</span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  type="date"
                  value={dateF}
                  onChange={(e) => {
                    setDateF(e.target.value);
                    setPage(1);
                  }}
                  style={inputStyle}
                />
                {dateF && (
                  <button
                    onClick={() => {
                      setDateF("");
                      setPage(1);
                    }}
                    style={{
                      background: "#FEF2F2",
                      color: "#991B1B",
                      border: "1px solid #FECACA",
                      borderRadius: 7,
                      padding: "5px 9px",
                      fontSize: 12,
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  background: "#0F172A",
                  color: "white",
                  padding: "4px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {filtered.length.toLocaleString()} records
              </span>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  style={{
                    background: "#FEF2F2",
                    color: "#991B1B",
                    border: "1px solid #FECACA",
                    borderRadius: 8,
                    padding: "5px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ✕ Clear All
                </button>
              )}
            </div>
          </div>

          {/* Active chips */}
          {hasFilters && (
            <div
              style={{
                padding: "8px 28px",
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                background: "white",
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              {[
                teamF !== "ALL" && {
                  label: `Team: ${teamF}`,
                  clr: () => {
                    setTeamF("ALL");
                    setPage(1);
                  },
                },
                statusF !== "ALL" && {
                  label: `Status: ${statusF}`,
                  clr: () => {
                    setStatusF("ALL");
                    setPage(1);
                  },
                },
                agreeF !== "ALL" && {
                  label: `Agr: ${agreeF}`,
                  clr: () => {
                    setAgreeF("ALL");
                    setPage(1);
                  },
                },
                qnoSearch && {
                  label: `Q.No: ${qnoSearch}`,
                  clr: () => {
                    setQnoSearch("");
                    setPage(1);
                  },
                },
                techSearch && {
                  label: `Tech: ${techSearch}`,
                  clr: () => {
                    setTechSearch("");
                    setPage(1);
                  },
                },
                dateF && {
                  label: `Date: ${fmtDate(dateF)}`,
                  clr: () => {
                    setDateF("");
                    setPage(1);
                  },
                },
              ]
                .filter(Boolean)
                .map((chip: any, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      padding: "3px 10px 3px 12px",
                      borderRadius: 12,
                      background: "#F1F5F9",
                      color: "#475569",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    {chip.label}
                    <button
                      onClick={chip.clr}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#94A3B8",
                        fontSize: 13,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          )}

          {/* Table */}
          <div style={{ margin: "16px 28px 0" }}>
            <div style={cardStyle}>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                    minWidth: 1100,
                  }}
                >
                  <thead>
                    <tr style={{ background: "#0F172A" }}>
                      {[
                        "#",
                        "DJ ID",
                        "Date",
                        "Serial No",
                        "Q. No",
                        "Model",
                        "Tech",
                        "Customer",
                        "Agreement",
                        "Team",
                        "Job Status",
                        "Tel No",
                        "Address",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "11px 10px",
                            color: "#64748B",
                            fontWeight: 600,
                            textAlign: "left",
                            fontSize: 11,
                            whiteSpace: "nowrap",
                            letterSpacing: 0.3,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.length === 0 && (
                      <tr>
                        <td
                          colSpan={13}
                          style={{
                            padding: "60px",
                            textAlign: "center",
                            color: "#94A3B8",
                            fontSize: 13,
                          }}
                        >
                          <div style={{ fontSize: 32, marginBottom: 8 }}>
                            🔍
                          </div>
                          No jobs match the current filters.
                          <br />
                          <button
                            onClick={clearAll}
                            style={{
                              marginTop: 10,
                              background: "#0F172A",
                              color: "white",
                              border: "none",
                              borderRadius: 8,
                              padding: "7px 16px",
                              cursor: "pointer",
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            Clear Filters
                          </button>
                        </td>
                      </tr>
                    )}
                    {pageData.map((r, i) => (
                      <tr
                        key={r.djId + i}
                        onClick={() => setSelectedJob(r)}
                        style={{
                          background: i % 2 === 0 ? "white" : "#FAFBFD",
                          borderBottom: "1px solid #F1F5F9",
                          cursor: "pointer",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#F0F9FF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            i % 2 === 0 ? "white" : "#FAFBFD")
                        }
                      >
                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#CBD5E1",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {(safePage - 1) * PAGE_SIZE + i + 1}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontWeight: 700,
                            color: "#0F172A",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.djId}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#475569",
                            whiteSpace: "nowrap",
                            fontSize: 11,
                          }}
                        >
                          {fmtDate(r.date)}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontFamily: "monospace",
                            fontSize: 10,
                            color: "#94A3B8",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.serialNo || "—"}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#2563EB",
                            fontWeight: 600,
                          }}
                        >
                          {r.machineRef || "—"}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: 11,
                            color: "#334155",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.model || "—"}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: 11,
                            color: "#64748B",
                          }}
                        >
                          {r.techCode || "—"}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontWeight: 600,
                            color: "#0F172A",
                            maxWidth: 160,
                            fontSize: 11,
                          }}
                        >
                          {r.cusName || "—"}
                        </td>
                        <td style={{ padding: "9px 10px" }}>
                          <AgreeBadge status={r.cusStatus} />
                        </td>
                        <td style={{ padding: "9px 10px" }}>
                          <TeamBadge team={r.team} />
                        </td>
                        <td style={{ padding: "9px 10px" }}>
                          <StatusBadge status={r.jobStatus} />
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: 11,
                            color: "#2563EB",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.tel && r.tel !== "-" ? r.tel : "—"}
                        </td>
                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: 11,
                            color: "#64748B",
                            maxWidth: 150,
                          }}
                        >
                          {r.addr || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F1F5F9",
                    background: "#FAFBFD",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>
                    Showing{" "}
                    <strong style={{ color: "#0F172A" }}>
                      {(safePage - 1) * PAGE_SIZE + 1}
                    </strong>
                    –
                    <strong style={{ color: "#0F172A" }}>
                      {Math.min(safePage * PAGE_SIZE, filtered.length)}
                    </strong>{" "}
                    of{" "}
                    <strong style={{ color: "#0F172A" }}>
                      {filtered.length.toLocaleString()}
                    </strong>
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      style={{
                        padding: "5px 11px",
                        borderRadius: 7,
                        border: "1px solid #E2E8F0",
                        background: "white",
                        cursor: safePage === 1 ? "not-allowed" : "pointer",
                        color: safePage === 1 ? "#CBD5E1" : "#0F172A",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      ‹
                    </button>
                    {pgNums.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          padding: "5px 10px",
                          minWidth: 32,
                          borderRadius: 7,
                          border: "1px solid #E2E8F0",
                          background: p === safePage ? "#0F172A" : "white",
                          color: p === safePage ? "white" : "#0F172A",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={safePage === totalPages}
                      style={{
                        padding: "5px 11px",
                        borderRadius: 7,
                        border: "1px solid #E2E8F0",
                        background: "white",
                        cursor:
                          safePage === totalPages ? "not-allowed" : "pointer",
                        color: safePage === totalPages ? "#CBD5E1" : "#0F172A",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px 28px 24px",
              fontSize: 11,
              color: "#94A3B8",
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <span>
              MA = Maintenance Agreement · FS = Free Service · NS = No Service ·
              EX = Extended Service
            </span>
            <span style={{ marginLeft: "auto" }}>
              Click any row to view full job details & timeline
            </span>
          </div>
        </>
      )}

      {/* Detail drawer */}
      {selectedJob && (
        <JobDetailDrawer
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
