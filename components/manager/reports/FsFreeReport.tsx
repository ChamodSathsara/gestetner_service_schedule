"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useApiConfig } from "@/hooks/apiconfig";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FsRow {
  // DB column names come back camelCased from the C# DTO
  comId?: string;
  serialNo?: string;
  cusCode?: string;
  cusName?: string;
  invAdd1?: string;
  invAdd2?: string;
  invAdd3?: string;
  telNo?: string;
  cusGrade?: string;
  machineRefCode?: string;
  machineCode?: string;
  machineDesc?: string;
  mLocContactName?: string;
  mLocContactNo?: string;
  mfpCity?: string;
  tOfficerCode?: string;
  tOfficerName?: string;
  mInvNo?: string;
  mInvDate?: string;
  mInsDate?: string;
  mWarrantyEndDate?: string;
  laborWarranty?: string;
  partsWarranty?: string;
  cusStatus?: string;
  visitsPerYear?: number;
  invNoTc?: string;
  team?: string;
  maPeriodStart?: string;
  maPeriodEnd?: string;
  repCode?: string;
  repName?: string;
  toCode?: string;
  toName?: string;
  dealerName?: string;
  serviceDate?: string;
  visitCode?: string;
  warrantyTypeDesc?: string;
  machineType?: string;
  cusType?: string;
  consComment?: string;
  cusEmail?: string;
  warrantyYears?: number;
  cnNo?: string;
  mLocTelephone?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns the M_WARRANTY_END_DATE for FS report */
function getEffectiveDate(row: FsRow): string {
  return row.mWarrantyEndDate?.trim() || "";
}

/** Team → display label + zone key */
const TEAM_MAP: Record<
  string,
  { label: string; zone: "COL" | "OUT" | "SUB" | "P2P" | "UNKNOWN" }
> = {
  SUB: { label: "Suburbs", zone: "SUB" },
  OUT: { label: "Outstation", zone: "OUT" },
  "E COL": { label: "Unknown", zone: "UNKNOWN" },
  "P2P SUB": { label: "P2P", zone: "P2P" },
  "-": { label: "Unknown", zone: "UNKNOWN" },
  "`": { label: "Unknown", zone: "UNKNOWN" },
  PCS: { label: "Technical Electronic", zone: "UNKNOWN" },
  "P2P OUT": { label: "P2P", zone: "P2P" },
  EXM: { label: "Unknown", zone: "UNKNOWN" },
  COL: { label: "Colombo", zone: "COL" },
  NO: { label: "Unknown", zone: "UNKNOWN" },
  NULL: { label: "Unknown", zone: "UNKNOWN" },
  NAS: { label: "Unknown", zone: "UNKNOWN" },
  "AC SUB": { label: "Unknown", zone: "UNKNOWN" },
  C: { label: "Unknown", zone: "UNKNOWN" },
  POS: { label: "Unknown", zone: "UNKNOWN" },
  "P2P COL": { label: "P2P", zone: "P2P" },
  P2P: { label: "P2P", zone: "P2P" },
};

function resolveTeam(team?: string): {
  label: string;
  zone: "COL" | "OUT" | "SUB" | "P2P" | "UNKNOWN";
} {
  if (!team) return { label: "Unknown", zone: "UNKNOWN" };
  return TEAM_MAP[team.trim()] ?? { label: "Unknown", zone: "UNKNOWN" };
}

function getAddress(row: FsRow): string {
  return [row.invAdd1, row.invAdd2, row.invAdd3]
    .filter((a) => a && a.trim() && a.trim() !== "-")
    .join(", ");
}

function formatDate(d?: string): string {
  if (!d) return "—";
  return d.slice(0, 10);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ZONE_COLORS: Record<string, { bg: string; color: string }> = {
  COL: { bg: "#dbeafe", color: "#1d4ed8" },
  OUT: { bg: "#d1fae5", color: "#065f46" },
  SUB: { bg: "#fef3c7", color: "#92400e" },
  P2P: { bg: "#ede9fe", color: "#5b21b6" },
  UNKNOWN: { bg: "#f1f5f9", color: "#64748b" },
};

const PAGE_SIZE = 20;

// ── Component ─────────────────────────────────────────────────────────────────

export default function FsBaseReport() {
  const { getFSReportData, downloadFSReportExcel, downloadFSReportPdf } =
    useApiConfig();

  // ── State ──────────────────────────────────────────────────────────────────
  const [data, setData] = useState<FsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dlLoading, setDlLoading] = useState<"excel" | "pdf" | null>(null);

  // Filter state
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState(`${currentYear}-01-01`);
  const [lastDate, setLastDate] = useState(`${currentYear}-12-31`);
  const [zoneFilter, setZoneFilter] = useState<
    "ALL" | "COL" | "OUT" | "SUB" | "P2P" | "UNKNOWN"
  >("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");

  // Chart state — year filter + selected month drilldown
  const [chartYear, setChartYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // 0-based

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getFSReportData(startDate, lastDate);
      setData(Array.isArray(res) ? res : []);
      setPage(1);
      setSelectedMonth(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load report data");
    } finally {
      setLoading(false);
    }
  }, [startDate, lastDate, getFSReportData]);

  useEffect(() => {
    fetchData();
  }, []);

  // ── Downloads ──────────────────────────────────────────────────────────────
  const handleExcelDownload = async () => {
    setDlLoading("excel");
    try {
      const blob: Blob = await downloadFSReportExcel(startDate, lastDate);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `FS_Report_${startDate}_to_${lastDate}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("Excel download failed: " + (e?.message ?? "Unknown error"));
    } finally {
      setDlLoading(null);
    }
  };

  const handlePdfDownload = async () => {
    setDlLoading("pdf");
    try {
      const blob: Blob = await downloadFSReportPdf(startDate, lastDate);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `FS_Report_${startDate}_to_${lastDate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("PDF download failed: " + (e?.message ?? "Unknown error"));
    } finally {
      setDlLoading(null);
    }
  };

  // ── Filtered table data ────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return data.filter((row) => {
      // Zone filter
      if (zoneFilter !== "ALL" && resolveTeam(row.team).zone !== zoneFilter)
        return false;
      // Search
      if (search) {
        const q = search.toLowerCase();
        const hit =
          (row.cusName ?? "").toLowerCase().includes(q) ||
          (row.machineRefCode ?? "").toLowerCase().includes(q) ||
          (row.tOfficerName ?? "").toLowerCase().includes(q) ||
          (row.machineDesc ?? "").toLowerCase().includes(q) ||
          (row.serialNo ?? "").toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [data, zoneFilter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Chart data ─────────────────────────────────────────────────────────────
  // All unique years present in the dataset
  const availableYears = useMemo(() => {
    const ys = new Set<number>();
    data.forEach((row) => {
      const d = getEffectiveDate(row);
      if (d) {
        const y = parseInt(d.slice(0, 4), 10);
        if (!isNaN(y)) ys.add(y);
      }
    });
    const arr = Array.from(ys).sort();
    return arr.length > 0 ? arr : [currentYear];
  }, [data]);

  // Monthly counts for the selected chart year (respects zone filter)
  const monthlyData = useMemo(() => {
    const counts = Array(12).fill(0);
    data.forEach((row) => {
      if (zoneFilter !== "ALL" && resolveTeam(row.team).zone !== zoneFilter)
        return;
      const d = getEffectiveDate(row);
      if (!d) return;
      const y = parseInt(d.slice(0, 4), 10);
      if (y !== chartYear) return;
      const m = parseInt(d.slice(5, 7), 10) - 1;
      if (m >= 0 && m < 12) counts[m]++;
    });
    return counts;
  }, [data, chartYear, zoneFilter]);

  // Rows for the selected month drilldown
  const monthDrilldown = useMemo(() => {
    if (selectedMonth === null) return [];
    return data.filter((row) => {
      if (zoneFilter !== "ALL" && resolveTeam(row.team).zone !== zoneFilter)
        return false;
      const d = getEffectiveDate(row);
      if (!d) return false;
      const y = parseInt(d.slice(0, 4), 10);
      const m = parseInt(d.slice(5, 7), 10) - 1;
      return y === chartYear && m === selectedMonth;
    });
  }, [data, chartYear, selectedMonth, zoneFilter]);

  const maxCount = Math.max(...monthlyData, 1);

  // ── Zone summary ───────────────────────────────────────────────────────────
  const zoneSummary = useMemo(() => {
    const counts: Record<string, number> = {
      COL: 0,
      OUT: 0,
      SUB: 0,
      P2P: 0,
      UNKNOWN: 0,
    };
    filtered.forEach((row) => {
      counts[resolveTeam(row.team).zone]++;
    });
    return counts;
  }, [filtered]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        background: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #065f46 0%, #047857 60%, #10b981 100%)",
          padding: "18px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        <div>
          <div
            style={{
              color: "#86efac",
              fontSize: "10px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Service Management
          </div>
          <h1
            style={{
              color: "white",
              margin: "4px 0 0",
              fontSize: "20px",
              fontWeight: 800,
              letterSpacing: "0.3px",
            }}
          >
            FS Base Report
          </h1>
          <div style={{ color: "#bbf7d0", fontSize: "11px", marginTop: "2px" }}>
            {loading
              ? "Loading…"
              : `${filtered.length.toLocaleString()} records`}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={handleExcelDownload}
            disabled={dlLoading !== null || loading}
            style={{
              background: dlLoading === "excel" ? "#166534" : "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "9px 18px",
              cursor: dlLoading !== null ? "wait" : "pointer",
              fontWeight: 700,
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: dlLoading !== null ? 0.75 : 1,
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(22,163,74,0.35)",
            }}
          >
            {dlLoading === "excel" ? "⏳" : "⬇"} Excel
          </button>
          <button
            onClick={handlePdfDownload}
            disabled={dlLoading !== null || loading}
            style={{
              background: dlLoading === "pdf" ? "#991b1b" : "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "9px 18px",
              cursor: dlLoading !== null ? "wait" : "pointer",
              fontWeight: 700,
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: dlLoading !== null ? 0.75 : 1,
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(220,38,38,0.35)",
            }}
          >
            {dlLoading === "pdf" ? "⏳" : "⬇"} PDF
          </button>
        </div>
      </div>

      {/* ── Date Range + Fetch ── */}
      <div
        style={{
          background: "white",
          padding: "12px 28px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>
          Date Range:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "12px",
            outline: "none",
          }}
        />
        <span style={{ color: "#94a3b8", fontWeight: 700 }}>→</span>
        <input
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "12px",
            outline: "none",
          }}
        />
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            background: "#047857",
            color: "white",
            border: "none",
            borderRadius: "7px",
            padding: "8px 18px",
            cursor: loading ? "wait" : "pointer",
            fontWeight: 700,
            fontSize: "12px",
          }}
        >
          {loading ? "Loading…" : "🔍 Fetch"}
        </button>
        {error && (
          <span style={{ color: "#dc2626", fontSize: "12px", fontWeight: 600 }}>
            ⚠ {error}
          </span>
        )}
      </div>

      {/* ── Zone Filter + Search + Summary ── */}
      <div
        style={{
          background: "white",
          padding: "10px 28px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        {/* Zone pills */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {(["ALL", "COL", "OUT", "SUB", "P2P", "UNKNOWN"] as const).map(
            (z) => {
              const col =
                z === "ALL"
                  ? { bg: "#047857", color: "white" }
                  : ZONE_COLORS[z];
              const active = zoneFilter === z;
              const count = z === "ALL" ? filtered.length : zoneSummary[z];
              return (
                <button
                  key={z}
                  onClick={() => {
                    setZoneFilter(z);
                    setPage(1);
                  }}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "11px",
                    background: active
                      ? z === "ALL"
                        ? "#047857"
                        : col.bg
                      : "#f1f5f9",
                    color: active
                      ? z === "ALL"
                        ? "white"
                        : col.color
                      : "#64748b",
                    transition: "all 0.18s",
                    outline: active
                      ? `2px solid ${z === "ALL" ? "#047857" : col.color}`
                      : "none",
                  }}
                >
                  {z === "ALL" ? "All" : z === "UNKNOWN" ? "Unknown" : z}{" "}
                  {count > 0 && (
                    <span style={{ opacity: 0.75 }}>({count})</span>
                  )}
                </button>
              );
            },
          )}
        </div>

        {/* Search */}
        <div style={{ marginLeft: "auto" }}>
          <input
            placeholder="Search name, serial, model, technician…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: "7px",
              padding: "7px 14px",
              fontSize: "12px",
              width: "260px",
              outline: "none",
            }}
          />
        </div>

        {/* Zone chips summary */}
        <div style={{ display: "flex", gap: "6px" }}>
          {(["COL", "OUT", "SUB", "P2P"] as const).map((z) => (
            <div
              key={z}
              style={{
                background: ZONE_COLORS[z].bg,
                color: ZONE_COLORS[z].color,
                borderRadius: "6px",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {z}: {zoneSummary[z]}
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          background: "white",
          borderBottom: "2px solid #e2e8f0",
          padding: "0 28px",
          display: "flex",
        }}
      >
        {(
          [
            ["table", "📋 Report Table"],
            ["chart", "📊 Monthly Chart"],
          ] as const
        ).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              padding: "11px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
              color: activeTab === tab ? "#047857" : "#94a3b8",
              borderBottom:
                activeTab === tab
                  ? "3px solid #047857"
                  : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div style={{ padding: "40px 28px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>
            Fetching report data…
          </div>
          <div
            style={{
              margin: "16px auto",
              width: "200px",
              height: "4px",
              background: "#e2e8f0",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "40%",
                background: "#047857",
                borderRadius: "2px",
                animation: "slide 1.2s ease-in-out infinite",
              }}
            />
          </div>
          <style>{`@keyframes slide { 0%{transform:translateX(-250%)} 100%{transform:translateX(600%)} }`}</style>
        </div>
      )}

      <div style={{ padding: "18px 28px" }}>
        {/* ════════════ TABLE TAB ════════════ */}
        {!loading && activeTab === "table" && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "11.5px",
                  minWidth: "1200px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #065f46, #047857)",
                    }}
                  >
                    {[
                      "#",
                      "Customer",
                      "Model",
                      "Serial No",
                      "Q.No / Inv",
                      "Zone",
                      "Grade",
                      "Warranty End",
                      "MA Start",
                      "MA End",
                      "Technician",
                      "Type",
                      "Address",
                      "Mobile",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 10px",
                          color: "white",
                          fontWeight: 700,
                          textAlign: "left",
                          fontSize: "10.5px",
                          whiteSpace: "nowrap",
                          letterSpacing: "0.4px",
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
                        colSpan={14}
                        style={{
                          padding: "48px",
                          textAlign: "center",
                          color: "#94a3b8",
                          fontSize: "14px",
                        }}
                      >
                        {data.length === 0
                          ? "No data — click Fetch to load."
                          : "No records match the current filters."}
                      </td>
                    </tr>
                  )}
                  {pageData.map((row, i) => {
                    const effDate = getEffectiveDate(row);
                    const zone = resolveTeam(row.team);
                    const zoneStyle = ZONE_COLORS[zone.zone];
                    const idx = (page - 1) * PAGE_SIZE + i + 1;

                    return (
                      <tr
                        key={`${row.serialNo}-${i}`}
                        style={{
                          background: i % 2 === 0 ? "white" : "#f8fafc",
                          borderBottom: "1px solid #f1f5f9",
                          transition: "background 0.12s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#ecfdf5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            i % 2 === 0 ? "white" : "#f8fafc")
                        }
                      >
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#94a3b8",
                            fontWeight: 600,
                            fontSize: "11px",
                          }}
                        >
                          {idx}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontWeight: 700,
                            color: "#1e293b",
                            maxWidth: "180px",
                            lineHeight: 1.3,
                          }}
                        >
                          {row.cusName || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.machineDesc || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#64748b",
                            fontSize: "10.5px",
                            fontFamily: "monospace",
                          }}
                        >
                          {row.serialNo || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#2563eb",
                            fontWeight: 700,
                          }}
                        >
                          {row.machineRefCode || row.mInvNo || "—"}
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "10px",
                              fontWeight: 700,
                              background: zoneStyle.bg,
                              color: zoneStyle.color,
                            }}
                          >
                            {zone.zone}
                          </span>
                        </td>
                        <td
                          style={{ padding: "8px 10px", textAlign: "center" }}
                        >
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "10px",
                              fontWeight: 700,
                              background:
                                row.cusGrade === "A" ? "#dcfce7" : "#fee2e2",
                              color:
                                row.cusGrade === "A" ? "#166534" : "#991b1b",
                            }}
                          >
                            {row.cusGrade || "—"}
                          </span>
                        </td>
                        <td
                          style={{ padding: "8px 10px", whiteSpace: "nowrap" }}
                        >
                          {effDate ? (
                            <span
                              style={{
                                color: "#047857",
                                fontWeight: 700,
                                fontSize: "11px",
                              }}
                            >
                              {formatDate(effDate)}
                            </span>
                          ) : (
                            <span style={{ color: "#cbd5e1" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#64748b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatDate(row.maPeriodStart)}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#64748b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatDate(row.maPeriodEnd)}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#475569",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.tOfficerName || row.repName || "—"}
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          {row.machineType ? (
                            <span
                              style={{
                                background: "#ede9fe",
                                color: "#5b21b6",
                                padding: "2px 7px",
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: 700,
                              }}
                            >
                              {row.machineType}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#64748b",
                            maxWidth: "160px",
                          }}
                        >
                          {getAddress(row) || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#2563eb",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.mLocTelephone && row.mLocTelephone !== "-"
                            ? row.mLocTelephone
                            : row.telNo && row.telNo !== "-"
                              ? row.telNo
                              : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #f1f5f9",
                  background: "#fafbfc",
                }}
              >
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length}
                </span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <PaginationBtn
                    label="‹"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  />
                  {paginationRange(page, totalPages).map((p, i) =>
                    p === "…" ? (
                      <span
                        key={`e${i}`}
                        style={{ padding: "6px 4px", color: "#94a3b8" }}
                      >
                        …
                      </span>
                    ) : (
                      <PaginationBtn
                        key={p}
                        label={String(p)}
                        onClick={() => setPage(Number(p))}
                        active={p === page}
                      />
                    ),
                  )}
                  <PaginationBtn
                    label="›"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════ CHART TAB ════════════ */}
        {!loading && activeTab === "chart" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Year selector */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "16px 22px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}
              >
                Year:
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {availableYears.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setChartYear(y);
                      setSelectedMonth(null);
                    }}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "13px",
                      background: chartYear === y ? "#047857" : "#f1f5f9",
                      color: chartYear === y ? "white" : "#475569",
                      transition: "all 0.15s",
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>
              {selectedMonth !== null && (
                <button
                  onClick={() => setSelectedMonth(null)}
                  style={{
                    marginLeft: "auto",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    background: "white",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  ← Back to Year View
                </button>
              )}
            </div>

            {/* Bar chart */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ marginBottom: "4px" }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#065f46",
                    fontSize: "15px",
                    fontWeight: 800,
                  }}
                >
                  {selectedMonth !== null
                    ? `${MONTHS[selectedMonth]} ${chartYear} — ${monthDrilldown.length} records`
                    : `Monthly Warranty End Distribution — ${chartYear}`}
                </h3>
                <p
                  style={{
                    margin: "4px 0 20px",
                    color: "#94a3b8",
                    fontSize: "11px",
                  }}
                >
                  Based on M_WARRANTY_END_DATE.
                  {selectedMonth === null &&
                    " Click a bar to drill into that month."}
                </p>
              </div>

              {selectedMonth === null ? (
                /* ── Year view: bar chart ── */
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "8px",
                      height: "240px",
                      paddingBottom: "0",
                    }}
                  >
                    {MONTHS.map((m, i) => {
                      const count = monthlyData[i];
                      const height =
                        count === 0
                          ? 4
                          : Math.max(18, (count / maxCount) * 210);
                      const isHot =
                        count === Math.max(...monthlyData) && count > 0;
                      return (
                        <div
                          key={m}
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              color: count > 0 ? "#047857" : "#cbd5e1",
                              minHeight: "16px",
                            }}
                          >
                            {count || ""}
                          </div>
                          <div
                            onClick={() => count > 0 && setSelectedMonth(i)}
                            style={{
                              width: "100%",
                              height: `${height}px`,
                              background: isHot
                                ? "linear-gradient(180deg, #f59e0b 0%, #d97706 100%)"
                                : count > 0
                                  ? "linear-gradient(180deg, #10b981 0%, #047857 100%)"
                                  : "#f1f5f9",
                              borderRadius: "5px 5px 0 0",
                              cursor: count > 0 ? "pointer" : "default",
                              transition: "filter 0.15s, transform 0.15s",
                              boxShadow:
                                count > 0
                                  ? "0 2px 6px rgba(4,120,87,0.2)"
                                  : "none",
                            }}
                            onMouseEnter={(e) => {
                              if (count > 0) {
                                (e.target as HTMLElement).style.filter =
                                  "brightness(1.15)";
                                (e.target as HTMLElement).style.transform =
                                  "scaleY(1.03)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLElement).style.filter = "";
                              (e.target as HTMLElement).style.transform = "";
                            }}
                            title={`${m} ${chartYear}: ${count} records — click to view`}
                          />
                          <div
                            style={{
                              fontSize: "10.5px",
                              color: "#64748b",
                              fontWeight: 600,
                            }}
                          >
                            {m}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Legend */}
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {MONTHS.map(
                      (m, i) =>
                        monthlyData[i] > 0 && (
                          <div
                            key={m}
                            onClick={() => setSelectedMonth(i)}
                            style={{
                              background: "#ecfdf5",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              fontSize: "11.5px",
                              cursor: "pointer",
                              border: "1px solid #a7f3d0",
                            }}
                          >
                            <span style={{ fontWeight: 700, color: "#047857" }}>
                              {m}:
                            </span>{" "}
                            <span style={{ color: "#334155" }}>
                              {monthlyData[i]} record
                              {monthlyData[i] !== 1 ? "s" : ""}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </>
              ) : (
                /* ── Month drilldown: mini table ── */
                <div style={{ overflowX: "auto" }}>
                  {monthDrilldown.length === 0 ? (
                    <div
                      style={{
                        padding: "32px",
                        textAlign: "center",
                        color: "#94a3b8",
                      }}
                    >
                      No records for this month.
                    </div>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "11.5px",
                        minWidth: "900px",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            background: "#ecfdf5",
                            borderBottom: "2px solid #a7f3d0",
                          }}
                        >
                          {[
                            "#",
                            "Customer",
                            "Model",
                            "Serial No",
                            "Zone",
                            "Warranty End",
                            "Technician",
                            "Type",
                            "Mobile",
                          ].map((h) => (
                            <th
                              key={h}
                              style={{
                                padding: "8px 10px",
                                color: "#047857",
                                fontWeight: 700,
                                textAlign: "left",
                                fontSize: "10.5px",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {monthDrilldown.map((row, i) => {
                          const zone = resolveTeam(row.team);
                          const zs = ZONE_COLORS[zone.zone];
                          const eff = getEffectiveDate(row);
                          return (
                            <tr
                              key={`${row.serialNo}-${i}`}
                              style={{
                                background: i % 2 === 0 ? "white" : "#f8fafc",
                                borderBottom: "1px solid #f1f5f9",
                              }}
                            >
                              <td
                                style={{
                                  padding: "7px 10px",
                                  color: "#94a3b8",
                                  fontWeight: 600,
                                }}
                              >
                                {i + 1}
                              </td>
                              <td
                                style={{
                                  padding: "7px 10px",
                                  fontWeight: 700,
                                  color: "#1e293b",
                                }}
                              >
                                {row.cusName || "—"}
                              </td>
                              <td
                                style={{
                                  padding: "7px 10px",
                                  color: "#475569",
                                }}
                              >
                                {row.machineDesc || "—"}
                              </td>
                              <td
                                style={{
                                  padding: "7px 10px",
                                  color: "#64748b",
                                  fontFamily: "monospace",
                                  fontSize: "10.5px",
                                }}
                              >
                                {row.serialNo || "—"}
                              </td>
                              <td style={{ padding: "7px 10px" }}>
                                <span
                                  style={{
                                    padding: "2px 7px",
                                    borderRadius: "9px",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    background: zs.bg,
                                    color: zs.color,
                                  }}
                                >
                                  {zone.zone}
                                </span>
                              </td>
                              <td
                                style={{
                                  padding: "7px 10px",
                                  fontWeight: 700,
                                  color: "#047857",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {formatDate(eff)}
                              </td>
                              <td
                                style={{
                                  padding: "7px 10px",
                                  color: "#475569",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.tOfficerName || "—"}
                              </td>
                              <td style={{ padding: "7px 10px" }}>
                                {row.machineType ? (
                                  <span
                                    style={{
                                      background: "#ede9fe",
                                      color: "#5b21b6",
                                      padding: "2px 6px",
                                      borderRadius: "7px",
                                      fontSize: "10px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {row.machineType}
                                  </span>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td
                                style={{
                                  padding: "7px 10px",
                                  fontSize: "11px",
                                  color: "#2563eb",
                                }}
                              >
                                {row.mLocTelephone && row.mLocTelephone !== "-"
                                  ? row.mLocTelephone
                                  : row.telNo && row.telNo !== "-"
                                    ? row.telNo
                                    : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        style={{ padding: "6px 28px 20px", fontSize: "11px", color: "#94a3b8" }}
      >
        Effective Date: M_WARRANTY_END_DATE (Warranty End Date)
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PaginationBtn({
  label,
  onClick,
  disabled,
  active,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        background: active ? "#047857" : "white",
        color: active ? "white" : disabled ? "#cbd5e1" : "#334155",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 700,
        minWidth: "32px",
        fontSize: "12px",
        transition: "all 0.12s",
      }}
    >
      {label}
    </button>
  );
}

function paginationRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  )
    pages.push(p);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}
