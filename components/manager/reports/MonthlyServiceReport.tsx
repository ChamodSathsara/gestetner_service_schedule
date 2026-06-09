"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useApiConfig } from "@/hooks/apiconfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Calendar,
  CalendarSearch,
  ChartPie,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  Clock,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  FilterX,
  Loader2,
  Play,
  RefreshCw,
  Search,
  PenTool,
  Building,
  X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MonthlyServiceReportDto {
  t_ID: number;
  com_ID?: string | null;
  seriaL_NO?: string | null;
  cuS_ID?: string | null;
  cuS_NAME?: string | null;
  tecH_CODE?: string | null;
  tecH_NAME?: string | null;
  machinE_REF?: string | null;
  m_MODEL?: string | null;
  visitNo: number;
  expectedVisitDate?: string | null;
  serviceDate?: string | null;
  meterReading?: string | null;
  visitStatus?: string | null;
}

type StatusFilter = "ALL" | "Pending" | "Started" | "Completed";
const PAGE_SIZE = 12;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const safe = (v?: string | null): string => (v ?? "").trim();

function fmtDate(d?: string | null): string {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toCSV(rows: MonthlyServiceReportDto[]): string {
  const h = [
    "T ID",
    "Serial No",
    "Customer",
    "Machine Ref",
    "Model",
    "Tech Code",
    "Technician",
    "Visit No",
    "Expected Date",
    "Service Date",
    "Meter Reading",
    "Status",
  ];
  const d = rows.map((r) => [
    r.t_ID,
    safe(r.seriaL_NO),
    safe(r.cuS_NAME),
    safe(r.machinE_REF),
    safe(r.m_MODEL),
    safe(r.tecH_CODE),
    safe(r.tecH_NAME),
    r.visitNo,
    fmtDate(r.expectedVisitDate),
    fmtDate(r.serviceDate),
    safe(r.meterReading),
    safe(r.visitStatus),
  ]);
  return [h, ...d]
    .map((row) =>
      row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

function dlBlob(blob: Blob, name: string) {
  const u = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  URL.revokeObjectURL(u);
}

const STATUS_CONFIG: Record<
  string,
  {
    variant: "default" | "destructive" | "secondary" | "outline";
    color: string;
  }
> = {
  Pending: { variant: "destructive", color: "bg-red-500" },
  Started: { variant: "default", color: "bg-blue-500" },
  Completed: { variant: "secondary", color: "bg-green-500" },
};

const VISIT_COLORS = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-purple-500",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MonthlyServiceVisitReport() {
  const api = useApiConfig();
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const [startDate, setStartDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`,
  );
  const [endDate, setEndDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${lastDay}`,
  );
  const [data, setData] = useState<MonthlyServiceReportDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);
  const [serviceDateFrom, setServiceDateFrom] = useState("");
  const [serviceDateTo, setServiceDateTo] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [visitFilter, setVisitFilter] = useState<number | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] =
    useState<keyof MonthlyServiceReportDto>("expectedVisitDate");
  const [sortAsc, setSortAsc] = useState(true);
  const [dlType, setDlType] = useState<"excel" | "pdf" | null>(null);
  const [selectedRow, setSelectedRow] =
    useState<MonthlyServiceReportDto | null>(null);

  // ── Fetch ──
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getServiceVisitReportData(startDate, endDate);
      setData(res as MonthlyServiceReportDto[]);
      setFetched(true);
      setPage(1);
      setSearch("");
      setStatusFilter("ALL");
      setVisitFilter("ALL");
    } catch (e: any) {
      setError(e?.message ?? "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  // ── Download ──
  const handleDl = async (type: "excel" | "pdf") => {
    setDlType(type);
    try {
      const blob =
        type === "excel"
          ? await api.downloadServiceVisitReportExcel(startDate, endDate)
          : await api.downloadServiceVisitReportPdf(startDate, endDate);
      dlBlob(
        blob,
        `ServiceVisits_${startDate}_${endDate}.${type === "excel" ? "xlsx" : "pdf"}`,
      );
    } catch (e: any) {
      alert(`${type.toUpperCase()} download failed: ${e.message}`);
    } finally {
      setDlType(null);
    }
  };

  // ── Derived ──
  const visitNos = useMemo(
    () => [...new Set(data.map((r) => r.visitNo))].sort((a, b) => a - b),
    [data],
  );

  const filtered = useMemo(
    () =>
      data
        .filter((r) => {
          const q = search.toLowerCase();
          const sOk =
            !search ||
            [
              r.cuS_NAME,
              r.seriaL_NO,
              r.machinE_REF,
              r.tecH_NAME,
              r.tecH_CODE, // ← added
              r.m_MODEL,
              String(r.t_ID),
            ].some((v) => safe(v).toLowerCase().includes(q));
          const stOk =
            statusFilter === "ALL" || safe(r.visitStatus) === statusFilter;
          const vnOk = visitFilter === "ALL" || r.visitNo === visitFilter;

          // Service date range filter
          const sd = r.serviceDate ? new Date(r.serviceDate) : null;
          const sdFromOk =
            !serviceDateFrom || (sd && sd >= new Date(serviceDateFrom));
          const sdToOk =
            !serviceDateTo ||
            (sd && sd <= new Date(serviceDateTo + "T23:59:59"));

          return sOk && stOk && vnOk && !!sdFromOk && !!sdToOk;
        })
        .sort((a, b) => {
          const av = a[sortKey] as any,
            bv = b[sortKey] as any;
          if (av == null) return 1;
          if (bv == null) return -1;
          return sortAsc ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
        }),
    [
      data,
      search,
      statusFilter,
      visitFilter,
      sortKey,
      sortAsc,
      serviceDateFrom,
      serviceDateTo,
    ],
  );

  const stats = useMemo(() => {
    const total = filtered.length;
    const byStatus = { Pending: 0, Started: 0, Completed: 0 };
    const byVisit: Record<number, number> = {};
    const techMap = new Map<
      string,
      { name: string; count: number; done: number }
    >();

    filtered.forEach((r) => {
      const st = safe(r.visitStatus);
      if (st === "Pending" || st === "Started" || st === "Completed")
        byStatus[st]++;
      byVisit[r.visitNo] = (byVisit[r.visitNo] ?? 0) + 1;
      const key = safe(r.tecH_CODE) || safe(r.tecH_NAME) || "_";
      const e = techMap.get(key) ?? {
        name: safe(r.tecH_NAME),
        count: 0,
        done: 0,
      };
      techMap.set(key, {
        name: safe(r.tecH_NAME) || e.name,
        count: e.count + 1,
        done: e.done + (st === "Completed" ? 1 : 0),
      });
    });

    return {
      total,
      byStatus,
      byVisit,
      rate: total ? Math.round((byStatus.Completed / total) * 100) : 0,
      customers: new Set(
        filtered.map((r) => safe(r.cuS_ID) || safe(r.cuS_NAME)),
      ).size,
      techs: new Set(filtered.map((r) => safe(r.tecH_CODE))).size,
      topTechs: [...techMap.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    };
  }, [filtered]);

  function fmtDateTime(d?: string | null): string {
    if (!d) return "—";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pPages = useMemo(() => {
    const count = Math.min(5, totalPages);
    const s =
      page <= 3
        ? 1
        : page >= totalPages - 2
          ? Math.max(1, totalPages - 4)
          : page - 2;
    return Array.from({ length: count }, (_, i) => s + i);
  }, [page, totalPages]);

  const toggleSort = (k: keyof MonthlyServiceReportDto) => {
    if (sortKey === k) setSortAsc(!sortAsc);
    else {
      setSortKey(k);
      setSortAsc(true);
    }
    setPage(1);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ══ HEADER ══ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-6 pb-7">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-10 right-20 h-48 w-48 rounded-full bg-indigo-500/10" />
        <div className="pointer-events-none absolute -bottom-12 right-64 h-36 w-36 rounded-full bg-blue-500/10" />

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300">
              Operations · Reports
            </span>
            <h1 className="mt-1.5 text-[26px] font-bold tracking-tight text-white">
              Service Visit Report
            </h1>
            {fetched && (
              <span className="text-[13px] text-blue-200">
                {startDate} → {endDate} · {data.length.toLocaleString()} total
                records
              </span>
            )}
          </div>

          {fetched && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleDl("excel")}
                disabled={!!dlType}
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                {dlType === "excel" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                )}
                {dlType === "excel" ? "Exporting…" : "Excel"}
              </Button>
              <Button
                onClick={() => handleDl("pdf")}
                disabled={!!dlType}
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                {dlType === "pdf" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                {dlType === "pdf" ? "Exporting…" : "PDF"}
              </Button>
              <Button
                onClick={() =>
                  dlBlob(
                    new Blob([toCSV(filtered)], { type: "text/csv" }),
                    `ServiceVisits_${startDate}_${endDate}.csv`,
                  )
                }
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Download className="mr-2 h-4 w-4" />
                CSV
              </Button>
            </div>
          )}
        </div>

        {/* Date pickers */}
        <div className="relative mt-5 flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-blue-200">
              From
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setFetched(false);
              }}
              className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-blue-200">
              To
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setFetched(false);
              }}
              className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={fetchData}
            disabled={loading}
            className="bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-700"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            {loading ? "Loading…" : "Fetch data"}
          </Button>
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="px-8 py-5 pb-10">
        {/* Error */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Empty — not yet fetched */}
        {!fetched && !loading && (
          <Card className="shadow-sm">
            <CardContent className="py-20 text-center">
              <CalendarSearch className="mx-auto mb-4 h-14 w-14 text-slate-300" />
              <p className="mb-2 text-base font-semibold text-slate-600">
                Select a date range to get started
              </p>
              <p className="text-sm text-slate-400">
                Choose your start and end dates above, then click "Fetch data".
              </p>
            </CardContent>
          </Card>
        )}

        {/* Empty — fetched but no data */}
        {fetched && data.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="py-20 text-center">
              <Database className="mx-auto mb-4 h-14 w-14 text-slate-300" />
              <p className="mb-2 text-base font-semibold text-slate-600">
                No records found
              </p>
              <p className="text-sm text-slate-400">
                No service visits for this period. Try a different date range.
              </p>
            </CardContent>
          </Card>
        )}

        {fetched && data.length > 0 && (
          <>
            {/* ══ KPI CARDS ══ */}
            <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
              {[
                {
                  label: "Total visits",
                  val: stats.total,
                  icon: Calendar,
                  accent: "bg-indigo-100 text-indigo-600",
                },
                {
                  label: "Pending",
                  val: stats.byStatus.Pending,
                  icon: Clock,
                  accent: "bg-red-100 text-red-600",
                },
                {
                  label: "In progress",
                  val: stats.byStatus.Started,
                  icon: Play,
                  accent: "bg-blue-100 text-blue-600",
                },
                {
                  label: "Completed",
                  val: stats.byStatus.Completed,
                  icon: CircleCheck,
                  accent: "bg-green-100 text-green-600",
                },
                {
                  label: "Completion rate",
                  val: `${stats.rate}%`,
                  icon: ChartPie,
                  accent: "bg-purple-100 text-purple-600",
                },
                {
                  label: "Customers",
                  val: stats.customers,
                  icon: Building,
                  accent: "bg-cyan-100 text-cyan-600",
                },
                {
                  label: "Technicians",
                  val: stats.techs,
                  icon: PenTool,
                  accent: "bg-amber-100 text-amber-600",
                },
              ].map((c, i) => (
                <Card key={i} className="shadow-sm">
                  <CardContent className="flex flex-col gap-2.5 p-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.accent}`}
                    >
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        {c.val}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {c.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ══ ANALYTICS ROW ══ */}
            <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
              {/* Status breakdown */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Status breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(["Completed", "Started", "Pending"] as const).map((st) => {
                    const count = filtered.filter(
                      (r) => safe(r.visitStatus) === st,
                    ).length;
                    const pct = stats.total
                      ? Math.round((count / stats.total) * 100)
                      : 0;
                    const cfg = STATUS_CONFIG[st];
                    return (
                      <div key={st}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            <span
                              className={`h-2 w-2 rounded-full ${cfg.color}`}
                            />
                            {st}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {count}{" "}
                            <span className="text-xs font-normal text-slate-400">
                              ({pct}%)
                            </span>
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${cfg.color}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* By visit number */}
              {/* <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    By visit number
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {visitNos.map((vn, i) => {
                    const count = stats.byVisit[vn] ?? 0;
                    const pct = stats.total
                      ? Math.round((count / stats.total) * 100)
                      : 0;
                    const colorClass = VISIT_COLORS[i % VISIT_COLORS.length];
                    return (
                      <div key={vn}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full ${colorClass} text-[10px] font-bold text-white`}
                            >
                              {vn}
                            </span>
                            Visit {vn}
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {count}{" "}
                            <span className="text-xs font-normal text-slate-400">
                              ({pct}%)
                            </span>
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card> */}

              {/* Top technicians */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Top technicians
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.topTechs.length === 0 && (
                    <p className="text-sm text-slate-400">No data</p>
                  )}
                  <div className="space-y-3">
                    {stats.topTechs.map((t, i) => {
                      const pct = t.count
                        ? Math.round((t.done / t.count) * 100)
                        : 0;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                        >
                          <div
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${VISIT_COLORS[i % VISIT_COLORS.length]} text-sm font-bold text-white`}
                          >
                            {i + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-slate-900">
                              {t.name || "—"}
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-green-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="whitespace-nowrap text-xs text-slate-500">
                                {t.done}/{t.count} done
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ══ FILTERS BAR ══ */}
            <Card className="mb-3 shadow-sm">
              <CardContent className="flex flex-wrap items-center gap-3 p-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search customer, serial no, machine, technician…"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="pl-9 pr-9"
                  />
                  {search && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Service date range */}
                <div className="h-7 w-px bg-slate-200" />

                {/* Service date range */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                    Service date
                  </span>
                  <Input
                    type="date"
                    value={serviceDateFrom}
                    onChange={(e) => {
                      setServiceDateFrom(e.target.value);
                      setPage(1);
                    }}
                    className="h-9 w-36 text-xs"
                  />
                  <span className="text-xs text-slate-400">–</span>
                  <Input
                    type="date"
                    value={serviceDateTo}
                    onChange={(e) => {
                      setServiceDateTo(e.target.value);
                      setPage(1);
                    }}
                    className="h-9 w-36 text-xs"
                  />
                  {(serviceDateFrom || serviceDateTo) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setServiceDateFrom("");
                        setServiceDateTo("");
                        setPage(1);
                      }}
                      className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="h-7 w-px bg-slate-200" />

                {/* Status pills */}
                <div className="flex flex-wrap gap-1.5">
                  {(
                    ["ALL", "Pending", "Started", "Completed"] as StatusFilter[]
                  ).map((v) => {
                    const active = statusFilter === v;
                    return (
                      <Button
                        key={v}
                        onClick={() => {
                          setStatusFilter(v);
                          setPage(1);
                        }}
                        variant={active ? "default" : "outline"}
                        size="sm"
                        className={
                          active
                            ? v === "ALL"
                              ? "bg-slate-900"
                              : v === "Pending"
                                ? "bg-red-500 hover:bg-red-600"
                                : v === "Started"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : "bg-green-500 hover:bg-green-600"
                            : ""
                        }
                      >
                        {v === "ALL" ? "All status" : v}
                      </Button>
                    );
                  })}
                </div>

                <div className="h-7 w-px bg-slate-200" />

                <span className="ml-auto whitespace-nowrap text-xs text-slate-500">
                  <strong className="text-slate-900">{filtered.length}</strong>{" "}
                  records
                </span>
              </CardContent>
            </Card>

            {/* ══ TABLE ══ */}
            <Card className="shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-sky-50 ">
                      <TableHead className="w-11 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        #
                      </TableHead>
                      {(
                        [
                          ["t_ID", "T ID"],
                          ["serial_NO", "Serial No"],
                          ["cus_NAME", "Customer"],
                          ["machine_REF", "Machine ref"],
                          ["m_MODEL", "Model"],
                          ["tecH_CODE", "Tech Code"],
                          ["tech_NAME", "Technician"],
                          ["visitNo", "Visit"],
                          ["expectedVisitDate", "Expected date"],
                          ["serviceDate", "Service date"],
                          ["meterReading", "Meter reading"],
                          ["visitStatus", "Status"],
                        ] as [keyof MonthlyServiceReportDto, string][]
                      ).map(([col, label]) => (
                        <TableHead
                          key={col}
                          onClick={() => toggleSort(col)}
                          className="cursor-pointer select-none text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
                        >
                          <span className="flex items-center gap-1">
                            {label}
                            {sortKey === col ? (
                              sortAsc ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )
                            ) : (
                              <ChevronDown className="h-3 w-3 opacity-30" />
                            )}
                          </span>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageData.map((r, i) => {
                      const st = safe(r.visitStatus);
                      const cfg = STATUS_CONFIG[st] ?? {
                        variant: "outline" as const,
                        color: "bg-slate-400",
                      };
                      const idx = (page - 1) * PAGE_SIZE + i + 1;
                      return (
                        <TableRow
                          key={`${r.t_ID}-${r.visitNo}-${i}`}
                          onClick={() => setSelectedRow(r)}
                          className="hover:bg-sky-50 cursor-pointer"
                        >
                          <TableCell className="text-xs font-semibold text-slate-300">
                            {idx}
                          </TableCell>
                          <TableCell className="text-xs font-bold text-slate-800">
                            {r.t_ID}
                          </TableCell>
                          <TableCell className="font-mono text-[11px] text-slate-600">
                            {safe(r.seriaL_NO) || "—"}
                          </TableCell>
                          <TableCell
                            className="max-w-[180px] truncate text-sm font-semibold text-slate-900"
                            title={safe(r.cuS_NAME)}
                          >
                            {safe(r.cuS_NAME) || "—"}
                          </TableCell>
                          <TableCell className="text-xs font-semibold text-blue-600">
                            {safe(r.machinE_REF) || "—"}
                          </TableCell>
                          <TableCell className="text-[11px] text-slate-600">
                            {safe(r.m_MODEL) || "—"}
                          </TableCell>
                          <TableCell className="font-mono text-[11px] text-slate-500">
                            {safe(r.tecH_CODE) || "—"}
                          </TableCell>
                          <TableCell
                            className="max-w-[150px] truncate text-xs text-slate-700"
                            title={safe(r.tecH_NAME)}
                          >
                            {safe(r.tecH_NAME) || "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                                VISIT_COLORS[
                                  (r.visitNo - 1) % VISIT_COLORS.length
                                ]
                              }`}
                            >
                              {r.visitNo}
                            </span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-xs text-slate-600">
                            {fmtDate(r.expectedVisitDate)}
                          </TableCell>
                          <TableCell
                            className={`whitespace-nowrap text-xs font-semibold ${
                              r.serviceDate
                                ? "text-green-600"
                                : "font-normal text-slate-400"
                            }`}
                          >
                            {fmtDate(r.serviceDate)}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {safe(r.meterReading) || (
                              <span className="text-slate-300">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={cfg.variant} className="gap-1.5">
                              <span
                                className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${cfg.color}`}
                              />
                              {st || "—"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {pageData.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={13}
                          className="py-16 text-center text-slate-400"
                        >
                          <FilterX className="mx-auto mb-3 h-10 w-10 opacity-35" />
                          <span className="text-sm">
                            No records match the current filters.
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">
                    Showing{" "}
                    <strong className="text-slate-900">
                      {(page - 1) * PAGE_SIZE + 1}
                    </strong>
                    –
                    <strong className="text-slate-900">
                      {Math.min(page * PAGE_SIZE, filtered.length)}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-slate-900">
                      {filtered.length}
                    </strong>
                  </span>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {pPages.map((p) => (
                      <Button
                        key={p}
                        onClick={() => setPage(p)}
                        variant={p === page ? "default" : "outline"}
                        size="sm"
                        className={`h-8 min-w-[32px] ${
                          p === page ? "bg-slate-900" : ""
                        }`}
                      >
                        {p}
                      </Button>
                    ))}
                    <Button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Footer */}
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-[11px] text-slate-400">
              <span>
                Click column headers to sort · Hover rows to highlight
              </span>
              <span>V1–V6 = scheduled service sequence per machine</span>
            </div>
          </>
        )}

        {/* ══ DETAIL DRAWER ══ */}
        {/* Backdrop */}
        {selectedRow && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
            onClick={() => setSelectedRow(null)}
          />
        )}

        {/* Panel */}
        <div
          className={`fixed right-0 top-0 z-50 h-full w-[420px] max-w-full overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            selectedRow ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedRow && (
            <>
              {/* Drawer header */}
              <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-300">
                    Service Record
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-white">
                    T-{selectedRow.t_ID}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRow(null)}
                  className="h-8 w-8 p-0 text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Status badge */}
              <div className="border-b bg-slate-50 px-5 py-3">
                {(() => {
                  const st = safe(selectedRow.visitStatus);
                  const cfg = STATUS_CONFIG[st] ?? {
                    variant: "outline" as const,
                    color: "bg-slate-400",
                  };
                  return (
                    <Badge
                      variant={cfg.variant}
                      className="gap-1.5 text-sm px-3 py-1"
                    >
                      <span
                        className={`h-2 w-2 flex-shrink-0 rounded-full ${cfg.color}`}
                      />
                      {st || "Unknown"}
                    </Badge>
                  );
                })()}
              </div>

              <div className="space-y-5 p-5">
                {/* Dates section */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Dates & Times
                  </p>
                  <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    {[
                      {
                        label: "Expected Visit Date",
                        value: fmtDate(selectedRow.expectedVisitDate),
                        icon: Calendar,
                        highlight: false,
                      },
                      {
                        label: "Service Date & Time",
                        value: fmtDateTime(selectedRow.serviceDate),
                        icon: Clock,
                        highlight: !!selectedRow.serviceDate,
                      },
                    ].map(({ label, value, icon: Icon, highlight }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${highlight ? "bg-green-100 text-green-600" : "bg-slate-200 text-slate-500"}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-slate-400">
                            {label}
                          </p>
                          <p
                            className={`text-sm font-semibold ${highlight ? "text-green-600" : "text-slate-700"}`}
                          >
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer section */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Customer
                  </p>
                  <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <DrawerField
                      label="Customer ID"
                      value={safe(selectedRow.cuS_ID)}
                    />
                    <DrawerField
                      label="Customer Name"
                      value={safe(selectedRow.cuS_NAME)}
                      bold
                    />
                  </div>
                </div>

                {/* Machine section */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Machine
                  </p>
                  <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <DrawerField
                      label="Serial No"
                      value={safe(selectedRow.seriaL_NO)}
                      mono
                    />
                    <DrawerField
                      label="Machine Ref"
                      value={safe(selectedRow.machinE_REF)}
                      accent
                    />
                    <DrawerField
                      label="Model"
                      value={safe(selectedRow.m_MODEL)}
                    />
                    <DrawerField
                      label="Meter Reading"
                      value={safe(selectedRow.meterReading) || "—"}
                    />
                  </div>
                </div>

                {/* Technician section */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Technician
                  </p>
                  <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <DrawerField
                      label="Tech Code"
                      value={safe(selectedRow.tecH_CODE)}
                      mono
                    />
                    <DrawerField
                      label="Technician Name"
                      value={safe(selectedRow.tecH_NAME)}
                      bold
                    />
                  </div>
                </div>

                {/* Visit section */}
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Visit Info
                  </p>
                  <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Visit Number
                      </span>
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white ${VISIT_COLORS[(selectedRow.visitNo - 1) % VISIT_COLORS.length]}`}
                      >
                        {selectedRow.visitNo}
                      </span>
                    </div>
                    <DrawerField
                      label="Company ID"
                      value={safe(selectedRow.com_ID)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DrawerField({
  label,
  value,
  bold,
  mono,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs text-slate-500 flex-shrink-0">{label}</span>
      <span
        className={`text-right text-xs break-all ${
          bold
            ? "font-semibold text-slate-900"
            : mono
              ? "font-mono text-slate-600"
              : accent
                ? "font-semibold text-blue-600"
                : "text-slate-700"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
