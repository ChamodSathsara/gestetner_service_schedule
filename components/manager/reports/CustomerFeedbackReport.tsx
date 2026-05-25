import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useApiConfig } from "@/hooks/apiconfig";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// ─── Types ────────────────────────────────────────────────────────────────────

type Rating = 1 | 2 | 3 | 4 | 5;

interface Feedback {
  tid: number;
  comId: string;
  fbDate: string;
  mobileNo: string;
  cusCode: string;
  cusName: string;
  rating: Rating;
  fullMsg: string;
  jobId: number | null;
  serialNo: string;
  machineRefNo: string;
  customerReview: string;
  type: string;
  visitNo: number | null;
  techCode: string;
}

// ─── API shape — keys come back as camelCase with caps embedded ───────────────
// e.g. cuS_NAME, fB_DATE, joB_ID, seriaL_NO, machinE_REF_NO etc.

interface ApiFeedback {
  tid?: number;
  coM_ID?: string;
  fB_DATE?: string;
  mobilE_NO?: string;
  cuS_CODE?: string;
  cuS_NAME?: string;
  rating?: number;
  fulL_MSG?: string;
  joB_ID?: number | null;
  seriaL_NO?: string;
  machinE_REF_NO?: string;
  customeR_REVIEW?: string;
  type?: string;
  visiT_NO?: number | null;
  tecH_CODE?: string;
}

function mapApiFeedback(item: ApiFeedback): Feedback {
  const raw = item.rating ?? 3;
  const clamped = Math.min(5, Math.max(1, Math.round(raw))) as Rating;
  return {
    tid: item.tid ?? 0,
    comId: item.coM_ID ?? "",
    fbDate: item.fB_DATE ?? "",
    mobileNo: item.mobilE_NO ?? "",
    cusCode: item.cuS_CODE ?? "",
    cusName: item.cuS_NAME ?? "",
    rating: clamped,
    fullMsg: item.fulL_MSG ?? "",
    jobId: item.joB_ID ?? null,
    serialNo: item.seriaL_NO ?? "",
    machineRefNo: item.machinE_REF_NO ?? "",
    customerReview: item.customeR_REVIEW ?? "",
    type: item.type ?? "",
    visitNo: item.visiT_NO ?? null,
    techCode: item.tecH_CODE ?? "",
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toYMD(d: Date) {
  return d.toISOString().slice(0, 10);
}

function getDefaultRange() {
  const end = new Date();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  return { start: toYMD(start), end: toYMD(end) };
}

function fmt(d: string) {
  if (!d) return "—";
  const s = d.slice(0, 10);
  const [y, m, day] = s.split("-");
  if (!y || !m || !day) return d;
  return `${day}/${m}/${y}`;
}

function fmtDateTime(d: string) {
  if (!d) return "—";
  const date = fmt(d);
  const time = d.length > 10 ? d.slice(11, 16) : "";
  return time ? `${date} ${time}` : date;
}

function dlBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSV(rows: Feedback[]) {
  const headers = [
    "TID","COM ID","FB Date","Mobile","Cus Code","Customer Name",
    "Rating","Message","Job ID","Serial No","Machine Ref",
    "Review","Type","Visit No","Tech Code",
  ];
  const escape = (v: string | number | null) =>
    `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [
    headers.map(escape).join(","),
    ...rows.map((r) =>
      [
        r.tid, r.comId, r.fbDate, r.mobileNo, r.cusCode, r.cusName,
        r.rating, r.fullMsg, r.jobId, r.serialNo, r.machineRefNo,
        r.customerReview, r.type, r.visitNo, r.techCode,
      ]
        .map(escape)
        .join(",")
    ),
  ].join("\n");
}

// ─── Rating config ────────────────────────────────────────────────────────────

const RATING_CFG: Record<
  Rating,
  { label: string; barClass: string; badgeClass: string; textClass: string; sideClass: string }
> = {
  5: {
    label: "Excellent",
    barClass: "bg-green-500",
    badgeClass: "bg-green-100 text-green-800",
    textClass: "text-green-700",
    sideClass: "bg-green-50 border-green-200",
  },
  4: {
    label: "Good",
    barClass: "bg-blue-500",
    badgeClass: "bg-blue-100 text-blue-800",
    textClass: "text-blue-700",
    sideClass: "bg-blue-50 border-blue-200",
  },
  3: {
    label: "Average",
    barClass: "bg-yellow-400",
    badgeClass: "bg-yellow-100 text-yellow-800",
    textClass: "text-yellow-700",
    sideClass: "bg-yellow-50 border-yellow-200",
  },
  2: {
    label: "Poor",
    barClass: "bg-orange-500",
    badgeClass: "bg-orange-100 text-orange-800",
    textClass: "text-orange-700",
    sideClass: "bg-orange-50 border-orange-200",
  },
  1: {
    label: "Bad",
    barClass: "bg-red-500",
    badgeClass: "bg-red-100 text-red-800",
    textClass: "text-red-700",
    sideClass: "bg-red-50 border-red-200",
  },
};

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating, size = "text-sm" }: { rating: Rating; size?: string }) {
  return (
    <span className="inline-flex gap-0.5">
      {([1, 2, 3, 4, 5] as Rating[]).map((s) => (
        <span
          key={s}
          className={`${size} ${s <= rating ? RATING_CFG[rating].textClass : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomerFeedbackReport() {
  const api = useApiConfig();

  const { start: defaultStart, end: defaultEnd } = getDefaultRange();

  // Data
  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API date range
  const [apiStart, setApiStart] = useState(defaultStart);
  const [apiEnd, setApiEnd] = useState(defaultEnd);
  const [pendingStart, setPendingStart] = useState(defaultStart);
  const [pendingEnd, setPendingEnd] = useState(defaultEnd);

  // Download loading
  const [dlExcel, setDlExcel] = useState(false);
  const [dlPdf, setDlPdf] = useState(false);

  // Filters
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [techFilter, setTechFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async (start: string, end: string) => {
    setLoading(true);
    setError(null);
    try {
      const raw: ApiFeedback[] = await api.getFeedbackReportData(start, end);
      setData(raw.map(mapApiFeedback));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load feedback data.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData(defaultStart, defaultEnd);
  }, []);

  const handleApply = () => {
    setApiStart(pendingStart);
    setApiEnd(pendingEnd);
    fetchData(pendingStart, pendingEnd);
    setPage(1);
  };

  // ── Derived lists ─────────────────────────────────────────────────────────
  const techCodes = useMemo(
    () => Array.from(new Set(data.map((d) => d.techCode).filter(Boolean))).sort(),
    [data]
  );

  const types = useMemo(
    () => Array.from(new Set(data.map((d) => d.type).filter(Boolean))).sort(),
    [data]
  );

  // ── Filtered ──────────────────────────────────────────────────────────────
  const filtered = useMemo<Feedback[]>(() => {
    const q = search.toLowerCase().trim();
    return data.filter((r) => {
      const rOk = ratingFilter === 0 || r.rating === ratingFilter;
      const tOk = typeFilter === "ALL" || r.type.toLowerCase() === typeFilter.toLowerCase();
      const tcOk = techFilter === "ALL" || r.techCode === techFilter;
      const sOk =
        !q ||
        r.cusName.toLowerCase().includes(q) ||
        r.mobileNo.includes(q) ||
        String(r.jobId ?? "").includes(q) ||
        r.serialNo.toLowerCase().includes(q) ||
        r.machineRefNo.toLowerCase().includes(q) ||
        r.fullMsg.toLowerCase().includes(q) ||
        r.techCode.toLowerCase().includes(q);
      return rOk && tOk && tcOk && sOk;
    });
  }, [data, ratingFilter, typeFilter, techFilter, search]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    if (!filtered.length) return { avg: 0, dist: [0, 0, 0, 0, 0] };
    const avg = filtered.reduce((s, r) => s + r.rating, 0) / filtered.length;
    const dist = ([5, 4, 3, 2, 1] as Rating[]).map(
      (star) => filtered.filter((r) => r.rating === star).length
    );
    return { avg, dist };
  }, [filtered]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePages = Math.min(page, totalPages);
  const pageData = filtered.slice((safePages - 1) * PAGE_SIZE, safePages * PAGE_SIZE);

  const pageNumbers = useMemo<number[]>(() => {
    const range: number[] = [];
    const delta = 2;
    for (
      let i = Math.max(1, safePages - delta);
      i <= Math.min(totalPages, safePages + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  }, [safePages, totalPages]);

  const resetPage = () => setPage(1);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Spinner className="h-10 w-10 text-blue-600" />
        <p className="text-sm font-medium text-gray-500">Loading feedback report…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold text-red-600">{error}</p>
        <Button onClick={() => fetchData(apiStart, apiEnd)}>Retry</Button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 px-6 py-5">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Customer Insights
        </p>
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-white">
          Customer Feedback Report
        </h1>

        <div className="flex flex-wrap items-start gap-6">

          {/* Average rating box */}
          <div className="flex items-start gap-5 rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-4xl font-black leading-none text-amber-400">
                {stats.avg > 0 ? stats.avg.toFixed(1) : "—"}
              </p>
              <Stars
                rating={Math.round(stats.avg || 1) as Rating}
                size="text-base"
              />
              <p className="mt-1 text-xs text-slate-400">{filtered.length} reviews</p>
            </div>

            {/* Rating bars */}
            <div className="flex flex-col gap-1.5">
              {([5, 4, 3, 2, 1] as Rating[]).map((star, si) => {
                const count = stats.dist[si];
                const pct = filtered.length
                  ? Math.round((count / filtered.length) * 100)
                  : 0;
                const cfg = RATING_CFG[star];
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className={`w-3 text-right text-xs font-bold ${cfg.textClass}`}>
                      {star}
                    </span>
                    <span className={`text-xs ${cfg.textClass}`}>★</span>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all ${cfg.barClass}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-5 text-xs text-slate-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Type count pills */}
          <div className="flex gap-3 self-center">
            {types.map((t) => {
              const count = filtered.filter(
                (r) => r.type.toLowerCase() === t.toLowerCase()
              ).length;
              return (
                <div
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center"
                >
                  <p className="text-2xl font-black text-sky-300">{count}</p>
                  <p className="text-xs font-semibold capitalize text-sky-400">{t}</p>
                </div>
              );
            })}
          </div>

          {/* Spacer */}
          <div className="ml-auto flex flex-col items-end gap-3">

            {/* Date pickers */}
            <div className="flex items-end gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  From
                </span>
                <input
                  type="date"
                  value={pendingStart}
                  onChange={(e) => setPendingStart(e.target.value)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white outline-none [color-scheme:dark]"
                />
              </div>
              <span className="mb-2 text-slate-500 font-bold">→</span>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  To
                </span>
                <input
                  type="date"
                  value={pendingEnd}
                  onChange={(e) => setPendingEnd(e.target.value)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white outline-none [color-scheme:dark]"
                />
              </div>
              <Button
                onClick={handleApply}
                className="mb-0.5 bg-blue-600 text-white hover:bg-blue-700"
                size="sm"
              >
                Apply
              </Button>
            </div>

            {/* Download buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-green-700 bg-green-800 text-white hover:bg-green-700"
                onClick={() => {
                  const csv = toCSV(filtered);
                  dlBlob(
                    new Blob([csv], { type: "text/csv;charset=utf-8;" }),
                    `Feedback_${apiStart}_${apiEnd}.csv`
                  );
                }}
              >
                ⬇ CSV
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-emerald-700 bg-emerald-800 text-white hover:bg-emerald-700"
                disabled={dlExcel}
                onClick={async () => {
                  setDlExcel(true);
                  try {
                    const blob = await api.downloadFeedbackReportExcel(apiStart, apiEnd);
                    dlBlob(blob, `Feedback_${apiStart}_${apiEnd}.xlsx`);
                  } finally {
                    setDlExcel(false);
                  }
                }}
              >
                {dlExcel ? <Spinner className="h-3 w-3" /> : "⬇"} Excel
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-700 bg-red-800 text-white hover:bg-red-700"
                disabled={dlPdf}
                onClick={async () => {
                  setDlPdf(true);
                  try {
                    const blob = await api.downloadFeedbackReportPdf(apiStart, apiEnd);
                    dlBlob(blob, `Feedback_${apiStart}_${apiEnd}.pdf`);
                  } finally {
                    setDlPdf(false);
                  }
                }}
              >
                {dlPdf ? <Spinner className="h-3 w-3" /> : "⬇"} PDF
              </Button>
            </div>

            <p className="text-xs text-slate-500">
              Period:{" "}
              <span className="font-semibold text-sky-400">{fmt(apiStart)}</span>
              {" → "}
              <span className="font-semibold text-sky-400">{fmt(apiEnd)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">

          {/* Rating filter */}
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Rating
            </p>
            <div className="flex gap-1.5">
              {([0, 5, 4, 3, 2, 1] as number[]).map((r) => {
                const active = ratingFilter === r;
                const cfg = r > 0 ? RATING_CFG[r as Rating] : null;
                return (
                  <button
                    key={r}
                    onClick={() => { setRatingFilter(r); resetPage(); }}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      active
                        ? cfg
                          ? `${cfg.badgeClass}`
                          : "bg-slate-900 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {r === 0 ? (
                      "All"
                    ) : (
                      <span className="flex items-center gap-1">
                        <span className={cfg!.textClass}>★</span>
                        {r}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type filter */}
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Type
            </p>
            <div className="flex gap-1.5">
              {["ALL", ...types].map((v) => (
                <button
                  key={v}
                  onClick={() => { setTypeFilter(v); resetPage(); }}
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-all ${
                    typeFilter === v
                      ? "bg-slate-900 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {v === "ALL" ? "All" : v}
                </button>
              ))}
            </div>
          </div>

          {/* Tech code filter */}
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Tech Code
            </p>
            <Select
              value={techFilter}
              onValueChange={(v) => { setTechFilter(v); resetPage(); }}
            >
              <SelectTrigger className="h-8 w-44 text-xs">
                <SelectValue placeholder="All Tech Codes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Tech Codes</SelectItem>
                {techCodes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="ml-auto flex items-end gap-2">
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                🔍
              </span>
              <Input
                placeholder="Search customer, job, serial…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                className="h-8 w-56 pl-7 text-xs"
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); resetPage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <Badge variant="secondary" className="whitespace-nowrap text-xs font-bold">
              {filtered.length} results
            </Badge>
          </div>
        </div>
      </div>

      {/* ── Cards ──────────────────────────────────────────────────────────── */}
      <div className="space-y-3 px-6 py-4">
        {pageData.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-4xl">💬</p>
              <p className="mt-3 text-sm font-semibold text-gray-400">
                No feedback records match your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          pageData.map((r) => {
            const cfg = RATING_CFG[r.rating];
            const hasMsg = r.fullMsg?.trim();
            const isService = r.type?.toLowerCase() === "service";

            return (
              <Card
                key={r.tid}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="flex p-0">

                  {/* Rating sidebar */}
                  <div
                    className={`flex w-20 flex-shrink-0 flex-col items-center justify-center gap-1 border-r px-2 py-4 ${cfg.sideClass}`}
                  >
                    <span className={`text-3xl font-black leading-none ${cfg.textClass}`}>
                      {r.rating}
                    </span>
                    <Stars rating={r.rating} size="text-xs" />
                    <span
                      className={`mt-1 text-[9px] font-bold uppercase tracking-wide ${cfg.textClass} opacity-60`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="flex flex-1 flex-col gap-3 p-4">

                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {r.cusName || "—"}
                          </span>
                          <Badge
                            className={`text-[10px] font-bold capitalize ${
                              isService
                                ? "bg-blue-100 text-blue-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                            variant="secondary"
                          >
                            {r.type || "—"}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">{r.mobileNo || "—"}</span>
                      </div>

                      {/* Dates */}
                      <div className="flex gap-5">
                        <div className="text-right">
                          <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400">
                            Feedback
                          </p>
                          <p className="text-xs font-semibold text-gray-700">
                            {fmtDateTime(r.fbDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Review message */}
                    {hasMsg ? (
                      <div
                        className={`rounded-r-lg border-l-2 px-3 py-2 ${cfg.sideClass}`}
                        style={{
                          borderLeftColor: {
                            5: "#22c55e",
                            4: "#3b82f6",
                            3: "#eab308",
                            2: "#f97316",
                            1: "#ef4444",
                          }[r.rating],
                        }}
                      >
                        <p className="text-xs italic leading-relaxed text-gray-700">
                          "{r.fullMsg}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs italic text-gray-300">No message provided.</p>
                    )}

                    {/* Footer chips */}
                    <div className="flex flex-wrap items-center gap-2">
                      {r.jobId && (
                        <Badge
                          variant="secondary"
                          className="bg-violet-100 text-[10px] font-bold text-violet-800"
                        >
                          Job #{r.jobId}
                        </Badge>
                      )}
                      {r.serialNo && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-[10px] font-semibold text-gray-700"
                        >
                          S/N: {r.serialNo}
                        </Badge>
                      )}
                      {r.machineRefNo && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-[10px] font-semibold text-gray-700"
                        >
                          Ref: {r.machineRefNo}
                        </Badge>
                      )}
                      {r.techCode && (
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-[10px] font-semibold text-slate-700"
                        >
                          👨‍🔧 Tech: {r.techCode}
                        </Badge>
                      )}
                      {r.cusCode && r.cusCode !== "N/A" && (
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-[10px] font-semibold text-slate-700"
                        >
                          Cus: {r.cusCode}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* ── Pagination ─────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 pb-6">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <strong className="text-gray-700">
              {(safePages - 1) * PAGE_SIZE + 1}
            </strong>
            –
            <strong className="text-gray-700">
              {Math.min(safePages * PAGE_SIZE, filtered.length)}
            </strong>{" "}
            of{" "}
            <strong className="text-gray-700">{filtered.length}</strong>
          </p>

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={safePages === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </Button>
            {pageNumbers.map((p) => (
              <Button
                key={p}
                variant={p === safePages ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0 text-xs"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={safePages === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              ›
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}