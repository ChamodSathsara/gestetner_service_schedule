import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useApiConfig } from "@/hooks/apiconfig"; // adjust path as needed

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerReport {
  cusCode: string;
  cusName: string;
  add1: string;
  add2: string;
  add3: string;
  mobileNo: string;
  telNo: string;
  email: string;
  city: string;
  postalCode: string;
  cusStatus: string;
  sageCode: string;
  cusGradeId: string;
  cusGradeName: string;
  repCode: string;
  repName: string;
  techCode: string;
  techName: string;
  debtCode: string;
  consRepCode: string;
  machineCount: number;
}

interface MachineRecord {
  serialNo: string;
  machineCode: string;
  machineDesc: string;
  machineRefCode: string;
  machineType: string;
  cusStatus: string;
  mLoc1: string;
  mLoc2: string;
  mLoc3: string;
  mLocContactName: string;
  mLocContactNo: string;
  tOfficerCode: string;
  team: string;
  maPeriodStart: string | null;
  maPeriodEnd: string | null;
  mWarrantyEndDate: string | null;
  visitsPerYear: number | null;
  cusEmail: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toCSV(data: CustomerReport[]): string {
  const h = [
    "Customer Code",
    "Customer Name",
    "Address 1",
    "Address 2",
    "Address 3",
    "Mobile",
    "Tel No",
    "Email",
    "City",
    "Status",
    "Grade",
    "Rep Name",
    "Machine Count",
  ];
  const rows = data.map((c) => [
    c.cusCode,
    c.cusName,
    c.add1,
    c.add2,
    c.add3,
    c.mobileNo,
    c.telNo,
    c.email,
    c.city,
    c.cusStatus,
    c.cusGradeName,
    c.repName,
    String(c.machineCount),
  ]);
  return [h, ...rows]
    .map((r) => r.map((v) => `"${(v ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function dlBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function dlCSV(csv: string, name: string) {
  dlBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), name);
}

function fmt(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB");
}

const STATUS_LABEL: Record<string, string> = {
  MA: "Maintenance Agreement",
  FS: "Free Service",
  NS: "No Service",
  EX: "Extended Service",
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({
  size = 20,
  color = "#2563eb",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `2px solid rgba(0,0,0,0.08)`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

// ─── Machine Dialog ───────────────────────────────────────────────────────────

interface MachineDialogProps {
  customer: CustomerReport;
  machines: MachineRecord[];
  loading: boolean;
  onClose: () => void;
}

function MachineDialog({
  customer,
  machines,
  loading,
  onClose,
}: MachineDialogProps) {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const active = machines.filter(
    (m) => m.cusStatus !== "EX" && m.cusStatus !== "NS",
  ).length;
  const inactive = machines.length - active;

  const shown = machines.filter((m) => {
    const isActive = m.cusStatus !== "EX" && m.cusStatus !== "NS";
    if (filter === "active") return isActive;
    if (filter === "inactive") return !isActive;
    return true;
  });

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.65)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(4px)",
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg,#0f172a,#1e3a5f)",
            borderRadius: "16px 16px 0 0",
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Machine List · {customer.cusCode}
              </div>
              <h2
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: 800,
                  lineHeight: 1.3,
                }}
              >
                {customer.cusName}
              </h2>
              <p
                style={{
                  color: "#7dd3fc",
                  fontSize: "12px",
                  margin: "4px 0 0",
                  fontWeight: 500,
                }}
              >
                {customer.add1}
                {customer.add2 && customer.add2 !== "-"
                  ? `, ${customer.add2}`
                  : ""}
                {customer.city ? ` · ${customer.city}` : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "8px",
                width: "34px",
                height: "34px",
                cursor: "pointer",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            {[
              {
                label: "Total",
                val: machines.length,
                bg: "rgba(255,255,255,0.15)",
                col: "white",
                key: "all" as const,
              },
              {
                label: "Active",
                val: active,
                bg: "rgba(34,197,94,0.2)",
                col: "#4ade80",
                key: "active" as const,
              },
              {
                label: "Inactive",
                val: inactive,
                bg: "rgba(239,68,68,0.2)",
                col: "#f87171",
                key: "inactive" as const,
              },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setFilter(p.key)}
                style={{
                  background:
                    filter === p.key ? p.bg : "rgba(255,255,255,0.06)",
                  border: `1px solid ${filter === p.key ? p.col : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "10px",
                  padding: "6px 14px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{ color: p.col, fontSize: "16px", fontWeight: 800 }}
                >
                  {p.val}
                </span>
                <span
                  style={{
                    color: p.col,
                    fontSize: "10px",
                    marginLeft: "6px",
                    opacity: 0.8,
                    fontWeight: 600,
                  }}
                >
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px",
                gap: "16px",
              }}
            >
              <Spinner size={36} />
              <span
                style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 600 }}
              >
                Loading machines…
              </span>
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
                minWidth: "760px",
              }}
            >
              <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  {[
                    "#",
                    "Serial No",
                    "Machine Ref",
                    "Model",
                    "Type",
                    "Location",
                    "Contact",
                    "MA End",
                    "Warranty End",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 12px",
                        color: "#64748b",
                        fontWeight: 700,
                        textAlign: "left",
                        fontSize: "10px",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((m, i) => {
                  const isActive = m.cusStatus !== "EX" && m.cusStatus !== "NS";
                  return (
                    <tr
                      key={m.serialNo + i}
                      style={{
                        background: i % 2 === 0 ? "white" : "#f8fafc",
                        borderBottom: "1px solid #f1f5f9",
                      }}
                    >
                      <td
                        style={{
                          padding: "11px 12px",
                          color: "#cbd5e1",
                          fontWeight: 700,
                          fontSize: "11px",
                        }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ padding: "11px 12px" }}>
                        <span
                          style={{
                            fontWeight: 800,
                            color: "#1e40af",
                            background: "#eff6ff",
                            padding: "3px 9px",
                            borderRadius: "7px",
                            fontSize: "12px",
                          }}
                        >
                          {m.serialNo}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "11px 12px",
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "12px",
                        }}
                      >
                        {m.machineRefCode || "—"}
                      </td>
                      <td
                        style={{
                          padding: "11px 12px",
                          color: "#334155",
                          fontWeight: 600,
                        }}
                      >
                        {m.machineCode || "—"}
                      </td>
                      <td style={{ padding: "11px 12px" }}>
                        <span
                          style={{
                            background: "#ede9fe",
                            color: "#5b21b6",
                            padding: "2px 8px",
                            borderRadius: "7px",
                            fontSize: "10px",
                            fontWeight: 700,
                          }}
                        >
                          {m.machineType || "—"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "11px 12px",
                          color: "#475569",
                          fontSize: "11px",
                          maxWidth: "140px",
                        }}
                      >
                        {[m.mLoc1, m.mLoc2, m.mLoc3]
                          .filter(Boolean)
                          .join(", ") || "—"}
                      </td>
                      <td
                        style={{
                          padding: "11px 12px",
                          color: "#1e293b",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        {m.mLocContactName || "—"}
                      </td>
                      <td
                        style={{
                          padding: "11px 12px",
                          color: "#475569",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmt(m.maPeriodEnd)}
                      </td>
                      <td
                        style={{
                          padding: "11px 12px",
                          color: "#475569",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmt(m.mWarrantyEndDate)}
                      </td>
                      <td style={{ padding: "11px 12px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "3px 10px",
                            borderRadius: "20px",
                            fontSize: "10px",
                            fontWeight: 700,
                            background: isActive ? "#dcfce7" : "#fee2e2",
                            color: isActive ? "#15803d" : "#b91c1c",
                          }}
                        >
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: isActive ? "#22c55e" : "#ef4444",
                              flexShrink: 0,
                            }}
                          />
                          {STATUS_LABEL[m.cusStatus] ?? m.cusStatus ?? "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {shown.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={10}
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#cbd5e1",
                        fontSize: "14px",
                      }}
                    >
                      No machines found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "13px 24px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fafbfc",
            borderRadius: "0 0 16px 16px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
            Showing <strong style={{ color: "#334155" }}>{shown.length}</strong>{" "}
            of <strong style={{ color: "#334155" }}>{machines.length}</strong>{" "}
            machines
          </span>
          <button
            onClick={onClose}
            style={{
              background: "#0f172a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "9px 22px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

export default function CustomerBaseReport() {
  const api = useApiConfig();

  // Table state
  const [customers, setCustomers] = useState<CustomerReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Download state
  const [dlExcel, setDlExcel] = useState(false);
  const [dlPdf, setDlPdf] = useState(false);

  // Dialog state
  const [selected, setSelected] = useState<CustomerReport | null>(null);
  const [machines, setMachines] = useState<MachineRecord[]>([]);
  const [machinesLoading, setMachinesLoading] = useState(false);

  // Fetch customer list on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await api.getCustomerReportData();
        setCustomers(data);
      } catch (e: any) {
        setError(e.message ?? "Failed to load customer data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Open dialog + fetch machines
  const handleOpenMachines = useCallback(
    async (customer: CustomerReport) => {
      setSelected(customer);
      setMachines([]);
      setMachinesLoading(true);
      try {
        const data = await api.getCustomerMachineData(customer.cusCode);
        setMachines(data);
      } catch (e: any) {
        console.error("Failed to load machines:", e.message);
      } finally {
        setMachinesLoading(false);
      }
    },
    [api],
  );

  const handleCloseDialog = useCallback(() => {
    setSelected(null);
    setMachines([]);
  }, []);

  // Filter + paginate
  const filtered = useMemo<CustomerReport[]>(() => {
    if (!search.trim()) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.cusName?.toLowerCase().includes(q) ||
        c.cusCode?.toLowerCase().includes(q) ||
        c.add1?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.mobileNo?.includes(q),
    );
  }, [search, customers]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pages = useMemo<number[]>(() => {
    const total = Math.min(5, totalPages);
    const s =
      page <= 3
        ? 1
        : page >= totalPages - 2
          ? Math.max(1, totalPages - 4)
          : page - 2;
    return Array.from({ length: total }, (_, i) => s + i);
  }, [page, totalPages]);

  const totalMachines = useMemo(
    () => customers.reduce((a, c) => a + (c.machineCount ?? 0), 0),
    [customers],
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f1f5f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <Spinner size={40} />
        <span style={{ color: "#64748b", fontWeight: 600, fontSize: "14px" }}>
          Loading Customer Report…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f1f5f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <div style={{ fontSize: "32px" }}>⚠️</div>
        <div style={{ color: "#b91c1c", fontWeight: 700, fontSize: "15px" }}>
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "#0f172a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "9px 22px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#0f172a 0%,#1e3a5f 60%,#0f172a 100%)",
            padding: "22px 28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  color: "#7dd3fc",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Master Database
              </div>
              <h1
                style={{
                  color: "white",
                  margin: "0 0 14px",
                  fontSize: "24px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                Customer Base Report
              </h1>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  {
                    label: "Customers",
                    val: customers.length,
                    color: "white",
                    border: "rgba(255,255,255,0.2)",
                    bg: "rgba(255,255,255,0.1)",
                  },
                  {
                    label: "Total Machines",
                    val: totalMachines,
                    color: "#7dd3fc",
                    border: "rgba(125,211,252,0.3)",
                    bg: "rgba(125,211,252,0.1)",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      borderRadius: "10px",
                      padding: "8px 16px",
                    }}
                  >
                    <div
                      style={{
                        color: s.color,
                        fontSize: "20px",
                        fontWeight: 800,
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        color: s.color,
                        fontSize: "10px",
                        opacity: 0.8,
                        fontWeight: 600,
                        marginTop: "2px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download buttons */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() =>
                  dlCSV(toCSV(filtered), "Customer_Base_Report.csv")
                }
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "9px",
                  padding: "10px 18px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ⬇ CSV
              </button>
              <button
                disabled={dlExcel}
                onClick={async () => {
                  setDlExcel(true);
                  try {
                    const blob = await api.downloadCustomerReportExcel();
                    dlBlob(blob, "Customer_Report.xlsx");
                  } finally {
                    setDlExcel(false);
                  }
                }}
                style={{
                  background: "#1d6f42",
                  color: "white",
                  border: "none",
                  borderRadius: "9px",
                  padding: "10px 18px",
                  cursor: dlExcel ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  opacity: dlExcel ? 0.7 : 1,
                }}
              >
                {dlExcel ? <Spinner size={13} color="white" /> : "⬇"} Excel
              </button>
              <button
                disabled={dlPdf}
                onClick={async () => {
                  setDlPdf(true);
                  try {
                    const blob = await api.downloadCustomerReportPdf();
                    dlBlob(blob, "Customer_Report.pdf");
                  } finally {
                    setDlPdf(false);
                  }
                }}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "9px",
                  padding: "10px 18px",
                  cursor: dlPdf ? "not-allowed" : "pointer",
                  fontWeight: 700,
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  opacity: dlPdf ? 0.7 : 1,
                }}
              >
                {dlPdf ? <Spinner size={13} color="white" /> : "⬇"} PDF
              </button>
            </div>
          </div>
        </div>

        {/* ── Search ─────────────────────────────────────────────────────── */}
        <div
          style={{
            background: "white",
            padding: "13px 28px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            gap: "14px",
            alignItems: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: "420px" }}>
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              🔍
            </span>
            <input
              placeholder="Search by name, code, city…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{
                width: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: "9px",
                padding: "8px 36px",
                fontSize: "13px",
                outline: "none",
                background: "#f8fafc",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "16px",
                  padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>
          <div
            style={{
              background: "#f1f5f9",
              color: "#334155",
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {filtered.length} customers
          </div>
        </div>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div
          style={{
            margin: "16px 28px 28px",
            background: "white",
            borderRadius: "14px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
                minWidth: "960px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(135deg,#0f172a,#1e3a5f)",
                  }}
                >
                  {[
                    "#",
                    "Customer Code",
                    "Customer Name",
                    "Address",
                    "City",
                    "Mobile",
                    "Grade",
                    "Rep",
                    "Machines",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "13px 14px",
                        color: "#94a3b8",
                        fontWeight: 700,
                        textAlign: "left",
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.map((c, i) => {
                  const idx = (page - 1) * PAGE_SIZE + i + 1;
                  return (
                    <tr
                      key={c.cusCode}
                      style={{
                        background: i % 2 === 0 ? "white" : "#f8fafc",
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f0f9ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          i % 2 === 0 ? "white" : "#f8fafc")
                      }
                    >
                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#cbd5e1",
                          fontWeight: 700,
                          fontSize: "11px",
                        }}
                      >
                        {idx}
                      </td>

                      <td style={{ padding: "13px 14px" }}>
                        <span
                          style={{
                            background: "#ede9fe",
                            color: "#5b21b6",
                            padding: "3px 10px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 800,
                          }}
                        >
                          {c.cusCode}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          fontWeight: 700,
                          color: "#0f172a",
                          maxWidth: "220px",
                          fontSize: "13px",
                        }}
                      >
                        {c.cusName}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#475569",
                          fontSize: "12px",
                          maxWidth: "180px",
                        }}
                      >
                        {c.add1}
                        {c.add2 && c.add2 !== "-" ? `, ${c.add2}` : ""}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        {c.city || "—"}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#2563eb",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.mobileNo && c.mobileNo !== "-"
                          ? c.mobileNo
                          : c.telNo && c.telNo !== "-"
                            ? c.telNo
                            : "—"}
                      </td>

                      <td style={{ padding: "13px 14px" }}>
                        {c.cusGradeName ? (
                          <span
                            style={{
                              background: "#fef3c7",
                              color: "#92400e",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            {c.cusGradeName}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#334155",
                          fontSize: "12px",
                        }}
                      >
                        {c.repName && c.repName !== "N/A" ? c.repName : "—"}
                      </td>

                      <td style={{ padding: "13px 14px" }}>
                        <span
                          style={{
                            fontWeight: 800,
                            color: "#0f172a",
                            fontSize: "15px",
                          }}
                        >
                          {c.machineCount ?? 0}
                        </span>
                      </td>

                      <td style={{ padding: "13px 14px" }}>
                        <button
                          onClick={() => handleOpenMachines(c)}
                          style={{
                            background:
                              "linear-gradient(135deg,#1e3a5f,#2563eb)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "7px 14px",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform =
                              "translateY(-1px)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "none")
                          }
                        >
                          🖥 Machine List
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {pageData.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      style={{ padding: "60px", textAlign: "center" }}
                    >
                      <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                        🔍
                      </div>
                      <div
                        style={{
                          color: "#cbd5e1",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        No customers match your search.
                      </div>
                      <button
                        onClick={() => setSearch("")}
                        style={{
                          marginTop: "12px",
                          background: "#0f172a",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 18px",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: "12px",
                        }}
                      >
                        Clear Search
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                padding: "13px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #f1f5f9",
                background: "#fafbfd",
              }}
            >
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Showing{" "}
                <strong style={{ color: "#0f172a" }}>
                  {(page - 1) * PAGE_SIZE + 1}
                </strong>
                –
                <strong style={{ color: "#0f172a" }}>
                  {Math.min(page * PAGE_SIZE, filtered.length)}
                </strong>{" "}
                of{" "}
                <strong style={{ color: "#0f172a" }}>{filtered.length}</strong>
              </span>
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "7px",
                    border: "1px solid #e2e8f0",
                    background: "white",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    color: page === 1 ? "#cbd5e1" : "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  ‹
                </button>
                {pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      padding: "6px 11px",
                      borderRadius: "7px",
                      border: "1px solid #e2e8f0",
                      background: p === page ? "#0f172a" : "white",
                      color: p === page ? "white" : "#0f172a",
                      cursor: "pointer",
                      fontWeight: 700,
                      minWidth: "34px",
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "7px",
                    border: "1px solid #e2e8f0",
                    background: "white",
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                    color: page === totalPages ? "#cbd5e1" : "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: "0 28px 20px",
            fontSize: "11px",
            color: "#94a3b8",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>
            Click <strong>Machine List</strong> to view all machines assigned to
            a customer.
          </span>
          <span>CSV download applies to current search filter.</span>
        </div>
      </div>

      {/* ── Machine Dialog ──────────────────────────────────────────────── */}
      {selected && (
        <MachineDialog
          customer={selected}
          machines={machines}
          loading={machinesLoading}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
}
