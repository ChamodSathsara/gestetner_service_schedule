"use client";

import { useState, useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReportRow {
  customer: string;
  model: string;
  serialNo: string;
  qNo: string;
  date: string;
  tOfficer: string;
  grade: string;
  team: string;
  status: string;
  maStart: string;
  maEnd: string;
  installDate: string;
  toCode: string;
  toName: string;
  vcType: string;
  mInvNo: string;
}
type TeamOption = "ALL" | "Colombo" | "Outstation" | "Suburbs";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SAMPLE_DATA: ReportRow[] = [
  {
    customer: "VARNERS",
    model: "MPC2004SP",
    serialNo: "G746RC50405",
    qNo: "Q11636",
    date: "",
    tOfficer: "3092",
    grade: "A",
    team: "Colombo",
    status: "NS",
    maStart: "2025-03-02",
    maEnd: "2026-03-01",
    installDate: "2017-03-28",
    toCode: "3092",
    toName: "SUGATH SILVA",
    vcType: "-",
    mInvNo: "MC003979",
  },
  {
    customer: "CARGILLS",
    model: "MPC2500",
    serialNo: "H821AB60112",
    qNo: "Q11820",
    date: "2025-01-10",
    tOfficer: "2041",
    grade: "B",
    team: "Suburbs",
    status: "FS",
    maStart: "2025-01-10",
    maEnd: "2026-01-09",
    installDate: "2019-06-15",
    toCode: "2041",
    toName: "ROHAN PERERA",
    vcType: "VCT1",
    mInvNo: "MC004010",
  },
  {
    customer: "HEMAS",
    model: "MP3500",
    serialNo: "K933CD70231",
    qNo: "Q12005",
    date: "2024-11-20",
    tOfficer: "1750",
    grade: "A",
    team: "Outstation",
    status: "FS",
    maStart: "2024-11-20",
    maEnd: "2025-11-19",
    installDate: "2020-02-10",
    toCode: "1750",
    toName: "NIMAL JAYASURIYA",
    vcType: "-",
    mInvNo: "MC003810",
  },
  {
    customer: "JOHN KEELLS",
    model: "MPC2004SP",
    serialNo: "G900EF80344",
    qNo: "Q12300",
    date: "2025-02-01",
    tOfficer: "3092",
    grade: "A",
    team: "Colombo",
    status: "NS",
    maStart: "2025-02-01",
    maEnd: "2026-01-31",
    installDate: "2018-09-20",
    toCode: "3092",
    toName: "SUGATH SILVA",
    vcType: "-",
    mInvNo: "MC004100",
  },
  {
    customer: "MAS HOLDINGS",
    model: "IR3500",
    serialNo: "L112GH90457",
    qNo: "Q12410",
    date: "2025-03-15",
    tOfficer: "2200",
    grade: "C",
    team: "Suburbs",
    status: "FS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2021-07-05",
    toCode: "2200",
    toName: "CHAMINDA W.",
    vcType: "VCT2",
    mInvNo: "MC004220",
  },
  {
    customer: "AITKEN SPENCE",
    model: "MPC2500",
    serialNo: "M223IJ01568",
    qNo: "Q12550",
    date: "2025-04-01",
    tOfficer: "1750",
    grade: "B",
    team: "Outstation",
    status: "NS",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2016-12-01",
    toCode: "1750",
    toName: "NIMAL JAYASURIYA",
    vcType: "-",
    mInvNo: "MC004330",
  },
  {
    customer: "DIALOG",
    model: "MP3500",
    serialNo: "N334KL12679",
    qNo: "Q12700",
    date: "2025-05-10",
    tOfficer: "3092",
    grade: "A",
    team: "Colombo",
    status: "FS",
    maStart: "2025-05-10",
    maEnd: "2026-05-09",
    installDate: "2022-03-18",
    toCode: "3092",
    toName: "SUGATH SILVA",
    vcType: "VCT1",
    mInvNo: "MC004450",
  },
  {
    customer: "SLT MOBITEL",
    model: "MPC2004SP",
    serialNo: "O445MN23780",
    qNo: "Q12860",
    date: "2025-06-20",
    tOfficer: "2041",
    grade: "B",
    team: "Colombo",
    status: "NS",
    maStart: "2025-06-20",
    maEnd: "2026-06-19",
    installDate: "2023-01-09",
    toCode: "2041",
    toName: "ROHAN PERERA",
    vcType: "-",
    mInvNo: "MC004560",
  },
  {
    customer: "NESTLE LANKA",
    model: "IR3500",
    serialNo: "P556NO34891",
    qNo: "Q13010",
    date: "2025-07-05",
    tOfficer: "2200",
    grade: "A",
    team: "Suburbs",
    status: "FS",
    maStart: "2025-07-05",
    maEnd: "2026-07-04",
    installDate: "2021-11-22",
    toCode: "2200",
    toName: "CHAMINDA W.",
    vcType: "VCT1",
    mInvNo: "MC004700",
  },
  {
    customer: "UNILEVER SL",
    model: "MPC2500",
    serialNo: "Q667PQ45902",
    qNo: "Q13120",
    date: "2025-08-18",
    tOfficer: "1750",
    grade: "B",
    team: "Outstation",
    status: "NS",
    maStart: "2025-08-18",
    maEnd: "2026-08-17",
    installDate: "2019-04-30",
    toCode: "1750",
    toName: "NIMAL JAYASURIYA",
    vcType: "-",
    mInvNo: "MC004810",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtDate = (s: string) => {
  if (!s) return "-";
  const d = new Date(s);
  return isNaN(d.getTime())
    ? s
    : d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};
const monthKey = (s: string) => {
  if (!s) return "Unknown";
  const d = new Date(s);
  return isNaN(d.getTime())
    ? "Unknown"
    : d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};
const COLS = [
  "Customer",
  "Model",
  "Serial No",
  "Q.No",
  "Date",
  "T.Officer",
  "Grade",
  "Team",
  "Status",
  "MA Start",
  "MA End",
  "Install Date",
  "TO Code",
  "TO Name",
  "VC Type",
  "M_INV_NO",
];
const COL_KEYS: (keyof ReportRow)[] = [
  "customer",
  "model",
  "serialNo",
  "qNo",
  "date",
  "tOfficer",
  "grade",
  "team",
  "status",
  "maStart",
  "maEnd",
  "installDate",
  "toCode",
  "toName",
  "vcType",
  "mInvNo",
];
const CHART_PALETTE = [
  "#3b82f6",
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#f97316",
  "#ec4899",
  "#84cc16",
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: "10px 16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 11,
          marginBottom: 4,
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#f1f5f9",
          fontSize: 22,
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {payload[0].value}
        <span
          style={{
            fontSize: 12,
            color: "#64748b",
            fontWeight: 400,
            marginLeft: 6,
          }}
        >
          records
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FsFreeReport() {
  const [team, setTeam] = useState<TeamOption>("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortCol, setSortCol] = useState<keyof ReportRow | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // ── Filter
  const filtered = useMemo(() => {
    return SAMPLE_DATA.filter((r) => {
      if (team !== "ALL" && r.team !== team) return false;
      const me = r.maEnd ? new Date(r.maEnd) : null;
      if (startDate && me && me < new Date(startDate)) return false;
      if (endDate && me && me > new Date(endDate)) return false;
      return true;
    });
  }, [team, startDate, endDate]);

  // ── Sort
  const sorted = useMemo(() => {
    if (!sortCol) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortCol] ?? "";
      const bv = b[sortCol] ?? "";
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortCol, sortDir]);

  // ── Chart data
  const chartData = useMemo(() => {
    const c: Record<string, number> = {};
    filtered.forEach((r) => {
      const k = monthKey(r.maEnd);
      c[k] = (c[k] || 0) + 1;
    });
    return Object.entries(c)
      .map(([month, count]) => ({ month, count }))
      .sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
      );
  }, [filtered]);

  // ── Stats
  const stats = useMemo(
    () => ({
      total: filtered.length,
      ns: filtered.filter((r) => r.status === "NS").length,
      fs: filtered.filter((r) => r.status === "FS").length,
      gradeA: filtered.filter((r) => r.grade === "A").length,
    }),
    [filtered],
  );

  const handleSort = (col: keyof ReportRow) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  // ── Export Excel (TSV → .xls)
  const downloadExcel = () => {
    const header = COLS.join("\t");
    const rows = filtered.map((r) =>
      [
        r.customer,
        r.model,
        r.serialNo,
        r.qNo,
        r.date,
        r.tOfficer,
        r.grade,
        r.team,
        r.status,
        r.maStart,
        r.maEnd,
        r.installDate,
        r.toCode,
        r.toName,
        r.vcType,
        r.mInvNo,
      ].join("\t"),
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "FsFreeReport.xls";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Export PDF (print window)
  const downloadPDF = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>FS Report</title>
    <style>
      @page { margin: 15mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Segoe UI', sans-serif; font-size: 10.5px; color: #1e293b; background: #fff; }
      .hdr { background: linear-gradient(135deg,#0f172a,#1d4ed8); color: #fff; padding: 20px 24px 18px; margin-bottom: 18px; border-radius: 0; }
      .hdr h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
      .hdr .sub { font-size: 11px; opacity: 0.55; margin-top: 3px; }
      .stats { display: flex; gap: 10px; margin-bottom: 18px; padding: 0 24px; }
      .stat { flex: 1; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 16px; }
      .stat-v { font-size: 24px; font-weight: 800; color: #0f172a; line-height: 1; }
      .stat-l { font-size: 9px; color: #94a3b8; font-weight: 700; letter-spacing: 1.2px; margin-top: 3px; text-transform: uppercase; }
      .section-title { font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 24px 8px; }
      table { width: calc(100% - 48px); margin: 0 24px; border-collapse: collapse; font-size: 9px; }
      thead tr { background: #0f172a; }
      th { color: #cbd5e1; padding: 8px 9px; text-align: left; font-weight: 700; letter-spacing: 0.5px; font-size: 8.5px; }
      td { padding: 6px 9px; border-bottom: 1px solid #f1f5f9; }
      tr:nth-child(even) td { background: #f8fafc; }
      .badge { display: inline-block; padding: 1px 7px; border-radius: 20px; font-weight: 700; font-size: 8.5px; }
      .gr-a { background:#dcfce7;color:#15803d; } .gr-b { background:#fef9c3;color:#a16207; } .gr-c { background:#fee2e2;color:#dc2626; }
      .st-ns { background:#fef3c7;color:#b45309; } .st-fs { background:#dcfce7;color:#15803d; }
      .footer { margin: 16px 24px 0; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 9px; color: #94a3b8; display: flex; justify-content: space-between; }
    </style></head><body>
    <div class="hdr">
      <h1>FS Report</h1>
      <div class="sub">Generated ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} &nbsp;•&nbsp; ${filtered.length} Records &nbsp;•&nbsp; Team: ${team}</div>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-v">${stats.total}</div><div class="stat-l">Total Records</div></div>
      <div class="stat"><div class="stat-v">${stats.ns}</div><div class="stat-l">NS Status</div></div>
      <div class="stat"><div class="stat-v">${stats.fs}</div><div class="stat-l">FS Status</div></div>
      <div class="stat"><div class="stat-v">${stats.gradeA}</div><div class="stat-l">Grade A</div></div>
    </div>
    <div class="section-title">Report Data</div>
    <table>
      <thead><tr>${COLS.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>
        ${filtered
          .map(
            (r) => `<tr>
          <td><strong>${r.customer}</strong></td>
          <td style="font-family:monospace;color:#2563eb">${r.model}</td>
          <td style="font-family:monospace;font-size:8px">${r.serialNo}</td>
          <td>${r.qNo || "-"}</td><td>${fmtDate(r.date)}</td><td>${r.tOfficer}</td>
          <td><span class="badge gr-${r.grade.toLowerCase()}">${r.grade}</span></td>
          <td>${r.team}</td>
          <td><span class="badge st-${r.status.toLowerCase()}">${r.status}</span></td>
          <td>${fmtDate(r.maStart)}</td><td><strong>${fmtDate(r.maEnd)}</strong></td>
          <td>${fmtDate(r.installDate)}</td><td>${r.toCode}</td><td>${r.toName}</td>
          <td>${r.vcType}</td><td style="font-family:monospace;font-size:8px">${r.mInvNo}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>
    <div class="footer">
      <span>FS Report — Confidential</span>
      <span>${new Date().toLocaleString("en-GB")}</span>
    </div>
    </body></html>`;
    const w = window.open("", "_blank", "width=1280,height=900");
    if (!w) {
      alert("Pop-up blocked. Please allow pop-ups and try again.");
      return;
    }
    w.document.write(html);
    w.document.close();
    w.onload = () => {
      w.focus();
      w.print();
    };
  };

  const teams: { key: TeamOption; icon: string; label: string }[] = [
    { key: "ALL", icon: "🌐", label: "All" },
    { key: "Colombo", icon: "🏙", label: "Colombo" },
    { key: "Outstation", icon: "🌿", label: "Outstation" },
    { key: "Suburbs", icon: "🏘", label: "Suburbs" },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        minHeight: "100vh",
        background: "#f0f4f8",
      }}
    >
      {/* ══ HEADER ══ */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#1d4ed8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -70,
            right: -70,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 100,
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "rgba(59,130,246,0.13)",
            pointerEvents: "none",
          }}
        />

        {/* Title row */}
        <div
          style={{
            padding: "28px 40px 24px",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
              }}
            >
              📊
            </div>
            <div>
              <div
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Report 02
              </div>
              <h1
                style={{
                  color: "#f1f5f9",
                  margin: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                FS Report
              </h1>
            </div>
          </div>

          {/* Download buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={downloadExcel}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg,#059669,#10b981)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 2px 14px rgba(16,185,129,0.4)",
                fontFamily: "inherit",
                letterSpacing: 0.2,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Excel
            </button>
            <button
              onClick={downloadPDF}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg,#dc2626,#ef4444)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 2px 14px rgba(239,68,68,0.4)",
                fontFamily: "inherit",
                letterSpacing: 0.2,
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              PDF
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.22)",
            display: "flex",
            overflowX: "auto",
          }}
        >
          {[
            {
              label: "TOTAL RECORDS",
              value: stats.total,
              icon: "📋",
              color: "#60a5fa",
            },
            {
              label: "NS STATUS",
              value: stats.ns,
              icon: "🔔",
              color: "#fbbf24",
            },
            {
              label: "FS STATUS",
              value: stats.fs,
              icon: "✅",
              color: "#34d399",
            },
            {
              label: "GRADE A",
              value: stats.gradeA,
              icon: "⭐",
              color: "#c084fc",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: "16px 36px",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                flex: "1 0 140px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <div>
                  <div
                    style={{
                      color: s.color,
                      fontSize: 24,
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.38)",
                      fontSize: 9.5,
                      letterSpacing: 1.5,
                      marginTop: 4,
                      fontWeight: 700,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 40px", maxWidth: 1800, margin: "0 auto" }}>
        {/* ══ FILTERS ══ */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px 26px",
            marginBottom: 22,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            border: "1px solid #e2e8f0",
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          {/* Team */}
          <div>
            <div style={labelSt}>Team</div>
            <div style={{ display: "flex", gap: 7 }}>
              {teams.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTeam(t.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 16px",
                    borderRadius: 9,
                    border: "1.5px solid",
                    borderColor: team === t.key ? "#3b82f6" : "#e2e8f0",
                    background: team === t.key ? "#3b82f6" : "#fff",
                    color: team === t.key ? "#fff" : "#64748b",
                    fontWeight: team === t.key ? 700 : 500,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s",
                  }}
                >
                  <span>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div>
            <div style={labelSt}>MA End — From</div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={inputSt}
            />
          </div>
          <div>
            <div style={labelSt}>MA End — To</div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={inputSt}
            />
          </div>

          {/* Count + Reset */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 13, color: "#64748b" }}>
              Showing{" "}
              <strong style={{ color: "#1e3a5f", fontSize: 15 }}>
                {filtered.length}
              </strong>
              <span style={{ color: "#cbd5e1" }}> / {SAMPLE_DATA.length}</span>
            </div>
            <button
              onClick={() => {
                setTeam("ALL");
                setStartDate("");
                setEndDate("");
              }}
              style={{
                padding: "7px 16px",
                borderRadius: 9,
                border: "1.5px solid #e2e8f0",
                background: "#f8fafc",
                color: "#64748b",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* ══ CHART ══ */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "24px 28px 20px",
            marginBottom: 22,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 20,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.3px",
                }}
              >
                MA End Expiry Distribution
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>
                Contracts expiring per month — based on MA End date
              </p>
            </div>
            <div
              style={{
                background: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: 8,
                padding: "5px 14px",
                fontSize: 12,
                color: "#0284c7",
                fontWeight: 700,
              }}
            >
              {chartData.reduce((s, d) => s + d.count, 0)} total expiring
            </div>
          </div>
          {chartData.length === 0 ? (
            <div
              style={{
                height: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
                fontSize: 14,
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 32 }}>🔍</span>
              No data matches selected filters
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 16, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 12,
                    fill: "#94a3b8",
                    fontFamily: "inherit",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 12,
                    fill: "#94a3b8",
                    fontFamily: "inherit",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(59,130,246,0.05)" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={54}>
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={CHART_PALETTE[i % CHART_PALETTE.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ══ TABLE ══ */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              padding: "18px 24px 16px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0f172a",
                }}
              >
                Report Data
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
                Click column headers to sort · Scroll horizontally for all
                columns
              </p>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12.5,
              }}
            >
              <thead>
                <tr style={{ background: "#0f172a" }}>
                  {COLS.map((col, i) => (
                    <th
                      key={col}
                      onClick={() => handleSort(COL_KEYS[i])}
                      style={{
                        padding: "11px 13px",
                        textAlign: "left",
                        color: "#94a3b8",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.6,
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        {col}
                        {sortCol === COL_KEYS[i] && (
                          <span style={{ color: "#60a5fa", fontSize: 10 }}>
                            {sortDir === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td
                      colSpan={16}
                      style={{
                        textAlign: "center",
                        padding: "56px 0",
                        color: "#94a3b8",
                        fontSize: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span style={{ fontSize: 36 }}>📭</span>
                        No records match the selected filters
                      </div>
                    </td>
                  </tr>
                ) : (
                  sorted.map((r, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0 ? "#fff" : "#f8fafc",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#eff6ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          i % 2 === 0 ? "#fff" : "#f8fafc")
                      }
                    >
                      {/* Customer */}
                      <td style={tdSt}>
                        <span style={{ fontWeight: 600, color: "#1e293b" }}>
                          {r.customer}
                        </span>
                      </td>
                      {/* Model */}
                      <td style={tdSt}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 11.5,
                            color: "#2563eb",
                            fontWeight: 600,
                          }}
                        >
                          {r.model}
                        </span>
                      </td>
                      {/* Serial */}
                      <td style={tdSt}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: "#475569",
                          }}
                        >
                          {r.serialNo}
                        </span>
                      </td>
                      {/* Q.No */}
                      <td style={tdSt}>{r.qNo || "—"}</td>
                      {/* Date */}
                      <td style={tdSt}>{fmtDate(r.date)}</td>
                      {/* T.Officer */}
                      <td style={tdSt}>{r.tOfficer}</td>
                      {/* Grade */}
                      <td style={tdSt}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            background:
                              r.grade === "A"
                                ? "#dcfce7"
                                : r.grade === "B"
                                  ? "#fef9c3"
                                  : "#fee2e2",
                            color:
                              r.grade === "A"
                                ? "#15803d"
                                : r.grade === "B"
                                  ? "#a16207"
                                  : "#dc2626",
                          }}
                        >
                          {r.grade}
                        </span>
                      </td>
                      {/* Team */}
                      <td style={tdSt}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "2px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 600,
                            background:
                              r.team === "Colombo"
                                ? "#dbeafe"
                                : r.team === "Suburbs"
                                  ? "#fae8ff"
                                  : "#ecfdf5",
                            color:
                              r.team === "Colombo"
                                ? "#1d4ed8"
                                : r.team === "Suburbs"
                                  ? "#7e22ce"
                                  : "#065f46",
                          }}
                        >
                          {r.team === "Colombo"
                            ? "🏙"
                            : r.team === "Suburbs"
                              ? "🏘"
                              : "🌿"}{" "}
                          {r.team}
                        </span>
                      </td>
                      {/* Status */}
                      <td style={tdSt}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            background:
                              r.status === "NS" ? "#fef3c7" : "#dcfce7",
                            color: r.status === "NS" ? "#b45309" : "#15803d",
                          }}
                        >
                          {r.status}
                        </span>
                      </td>
                      {/* MA Start */}
                      <td style={tdSt}>{fmtDate(r.maStart)}</td>
                      {/* MA End */}
                      <td
                        style={{ ...tdSt, fontWeight: 700, color: "#1e3a5f" }}
                      >
                        {fmtDate(r.maEnd)}
                      </td>
                      {/* Install Date */}
                      <td style={tdSt}>{fmtDate(r.installDate)}</td>
                      {/* TO Code */}
                      <td style={tdSt}>{r.toCode}</td>
                      {/* TO Name */}
                      <td style={tdSt}>{r.toName}</td>
                      {/* VC Type */}
                      <td style={tdSt}>{r.vcType}</td>
                      {/* M_INV_NO */}
                      <td style={tdSt}>
                        <span style={{ fontFamily: "monospace", fontSize: 11 }}>
                          {r.mInvNo}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div
            style={{
              padding: "12px 24px",
              borderTop: "1px solid #f1f5f9",
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              {sorted.length} record{sorted.length !== 1 ? "s" : ""} displayed
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#cbd5e1",
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              FS REPORT • {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared micro-styles ────────────────────────────────────────────────────────
const labelSt: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "#64748b",
  letterSpacing: 0.8,
  textTransform: "uppercase",
  marginBottom: 7,
};
const inputSt: React.CSSProperties = {
  padding: "8px 13px",
  borderRadius: 9,
  border: "1.5px solid #e2e8f0",
  fontSize: 13,
  color: "#1e293b",
  fontFamily: "inherit",
  outline: "none",
  background: "#fff",
};
const tdSt: React.CSSProperties = {
  padding: "10px 13px",
  borderBottom: "1px solid #f1f5f9",
  color: "#334155",
  whiteSpace: "nowrap",
};
