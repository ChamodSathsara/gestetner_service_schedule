import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Grade = "A" | "E" | "H" | "";
type Team = "COL" | "OUT" | "SUB";
type MachineType = "MFP" | "MPC" | "DCP" | "";

interface ExRecord {
  customer: string;
  model: string;
  serialNo: string;
  qNo: string;
  date: string;
  mainTechCode: string;
  grade: Grade;
  team: Team;
  status: "EX";
  maStart: string;
  maEnd: string;
  installDate: string;
  to: string;
  technicianName: string;
  visitCode: string;
  type: MachineType;
  mInvNo: string;
  address1: string;
  address2: string;
  address3: string;
  mobile: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RAW_DATA: ExRecord[] = [
  {
    customer: "LIKVID SPACES PVT LTD",
    model: "IMC2000",
    serialNo: "3082RC21174",
    qNo: "Q19383",
    date: "2024-08-11",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "EX",
    maStart: "2025-11-02",
    maEnd: "2026-11-01",
    installDate: "2023-08-11",
    to: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC02355",
    address1: "ONE GALLEFACE",
    address2: "12TH FLOOR",
    address3: "COLOMBO 01",
    mobile: "0123456789",
  },
  {
    customer: "CARE LOGISTICS (PVT ) LTD",
    model: "MP1800L2",
    serialNo: "L6926550635",
    qNo: "Q4669",
    date: "",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "EX",
    maStart: "2025-12-02",
    maEnd: "2026-12-01",
    installDate: "2017-07-30",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 31622",
    address1: "618,1/2,",
    address2: "GALLE ROAD,",
    address3: "COLOMBO 03",
    mobile: "0114514253",
  },
  {
    customer: "SPECIAL TASK FORCE",
    model: "MP 2014AD",
    serialNo: "G617M750034",
    qNo: "Q12271",
    date: "2018-10-09",
    mainTechCode: "8033",
    grade: "A",
    team: "COL",
    status: "EX",
    maStart: "2025-08-01",
    maEnd: "2026-07-31",
    installDate: "2017-10-09",
    to: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC004664",
    address1: "NO:223 ,",
    address2: "BAUDDHALOKA MW,",
    address3: "COLOMBO 07",
    mobile: "0112500471",
  },
  {
    customer: "CU BOOKSHOP",
    model: "MP2014D",
    serialNo: "G634Z260170",
    qNo: "Q20001",
    date: "2025-12-24",
    mainTechCode: "3137",
    grade: "A",
    team: "OUT",
    status: "EX",
    maStart: "2025-05-24",
    maEnd: "2026-05-24",
    installDate: "2024-12-24",
    to: "3137",
    technicianName: "KAVINDA LIYANAGE",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC03329",
    address1: "GALLE UDUGAMA ROAD",
    address2: "PINNADUWA",
    address3: "-",
    mobile: "0740886085 / 0768351318",
  },
  {
    customer: "DEPARTMENT OF SOCIAL WELFARE -SOUTHERN",
    model: "MP 2014D",
    serialNo: "G635MB40160",
    qNo: "Q9340",
    date: "",
    mainTechCode: "3137",
    grade: "A",
    team: "OUT",
    status: "EX",
    maStart: "2025-10-01",
    maEnd: "2026-09-30",
    installDate: "2017-02-17",
    to: "3137",
    technicianName: "KAVINDA LIYANAGE",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC001813",
    address1: "5TH FLOOR",
    address2: "DISTRICT SECRETARIAT",
    address3: "GALLE",
    mobile: "0912227129",
  },
  {
    customer: "MAPA / VIL / MEDAKANDA KANISHTA VIDYALAYA",
    model: "MP 2014",
    serialNo: "G606M750221",
    qNo: "Q11012",
    date: "2018-02-15",
    mainTechCode: "3176",
    grade: "A",
    team: "OUT",
    status: "EX",
    maStart: "2025-08-01",
    maEnd: "2026-07-31",
    installDate: "2017-02-15",
    to: "3184",
    technicianName: "DARSHANA RUKSHAN",
    visitCode: "LMV",
    type: "MFP",
    mInvNo: "MC003483",
    address1: "DUNUWILAPITIYA",
    address2: "MEDAKANDA",
    address3: "MATALE",
    mobile: "071-4410196",
  },
  {
    customer: "SPECIAL TASK FORCE",
    model: "MP2001L",
    serialNo: "E343M751159",
    qNo: "Q5552",
    date: "",
    mainTechCode: "3167",
    grade: "A",
    team: "SUB",
    status: "EX",
    maStart: "2025-02-01",
    maEnd: "2026-07-31",
    installDate: "2017-09-19",
    to: "3167",
    technicianName: "NIRUSHAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 70924",
    address1: "NO:223 ,",
    address2: "BAUDDHALOKA MW,",
    address3: "COLOMBO 07",
    mobile: "0112500471",
  },
  {
    customer: "MR SARATH SAMARAWEERA",
    model: "MP 2014",
    serialNo: "G601M650046",
    qNo: "Q20275",
    date: "2026-01-10",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "EX",
    maStart: "2026-01-10",
    maEnd: "2026-07-10",
    installDate: "2025-01-10",
    to: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC01934",
    address1: "159/5/B NIDAHAS MAWATHA,",
    address2: "ROBBERT GUNAWARDHANA MW.",
    address3: "BATTARAMULLA",
    mobile: "-",
  },
  {
    customer: "WP/NG G.B.SENANAYAKE MAHA VIDYALAYA",
    model: "M2701",
    serialNo: "3281M730233",
    qNo: "Q18408",
    date: "2023-01-19",
    mainTechCode: "8047",
    grade: "A",
    team: "SUB",
    status: "EX",
    maStart: "2025-05-15",
    maEnd: "2026-05-14",
    installDate: "2022-01-19",
    to: "8058",
    technicianName: "SUPUN DILHARA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC01543",
    address1: "EKALA",
    address2: "JA-ELA",
    address3: "-",
    mobile: "0112243054",
  },
  {
    customer: "VEEKESY SLIPPERS LANKA (PVT)LTD",
    model: "MP2014D",
    serialNo: "G634Z160152",
    qNo: "Q19818",
    date: "2025-04-26",
    mainTechCode: "8047",
    grade: "A",
    team: "SUB",
    status: "EX",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2024-04-26",
    to: "8058",
    technicianName: "SUPUN DILHARA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC03021",
    address1: "NO.41,PARK LANE,ETHUKALA",
    address2: "NEGOMBO",
    address3: "-",
    mobile: "0763423446",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

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
] as const;

const TEAM_STYLE: Record<Team, React.CSSProperties> = {
  COL: { background: "#dbeafe", color: "#1e40af" },
  OUT: { background: "#dcfce7", color: "#166534" },
  SUB: { background: "#fef9c3", color: "#854d0e" },
};

const TYPE_STYLE: Record<string, React.CSSProperties> = {
  MFP: { background: "#ede9fe", color: "#5b21b6" },
  MPC: { background: "#dbeafe", color: "#1d4ed8" },
  DCP: { background: "#fce7f3", color: "#9d174d" },
};

// ─── Component ────────────────────────────────────────────────────────────────

type ActiveTab = "table" | "chart";

export default function ExReport() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("table");
  const [teamFilter, setTeamFilter] = useState<string>("ALL");
  const [monthFilter, setMonthFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  const filtered = useMemo<ExRecord[]>(() => {
    return RAW_DATA.filter((r) => {
      const teamOk = teamFilter === "ALL" || r.team === teamFilter;
      const monthOk = !monthFilter || r.maEnd.startsWith(monthFilter);
      const q = search.toLowerCase();
      const searchOk =
        !search ||
        r.customer.toLowerCase().includes(q) ||
        r.qNo.toLowerCase().includes(q) ||
        r.technicianName.toLowerCase().includes(q) ||
        r.model.toLowerCase().includes(q) ||
        r.serialNo.toLowerCase().includes(q);
      return teamOk && monthOk && searchOk;
    });
  }, [teamFilter, monthFilter, search]);

  const monthlyData = useMemo<number[]>(() => {
    const counts = Array(12).fill(0);
    RAW_DATA.filter(
      (r) => teamFilter === "ALL" || r.team === teamFilter,
    ).forEach((r) => {
      if (!r.maEnd) return;
      const m = parseInt(r.maEnd.split("-")[1], 10) - 1;
      if (m >= 0 && m < 12) counts[m]++;
    });
    return counts;
  }, [teamFilter]);

  const maxCount = Math.max(...monthlyData, 1);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const teamCounts = useMemo(
    () => ({
      COL: RAW_DATA.filter((r) => r.team === "COL").length,
      OUT: RAW_DATA.filter((r) => r.team === "OUT").length,
      SUB: RAW_DATA.filter((r) => r.team === "SUB").length,
    }),
    [],
  );

  const downloadCSV = () => {
    const headers = [
      "Customer",
      "Model",
      "Serial No",
      "Q.No",
      "Date",
      "Main Tech Code",
      "Grade",
      "Team",
      "Status",
      "MA Start",
      "MA End",
      "Install Date",
      "TO",
      "Technician",
      "Visit Code",
      "Type",
      "M_INV_NO",
      "Address 1",
      "Address 2",
      "Address 3",
      "Mobile",
    ];
    const rows = filtered.map((r) => [
      r.customer,
      r.model,
      r.serialNo,
      r.qNo,
      r.date,
      r.mainTechCode,
      r.grade,
      r.team,
      r.status,
      r.maStart,
      r.maEnd,
      r.installDate,
      r.to,
      r.technicianName,
      r.visitCode,
      r.type,
      r.mInvNo,
      r.address1,
      r.address2,
      r.address3,
      r.mobile,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "EX_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPDF = () => {
    const content = `<html><head><style>
      body{font-family:Arial,sans-serif;font-size:8.5px;margin:18px;}
      h2{font-size:15px;margin:0 0 3px;color:#7c1d1d;}
      .sub{font-size:11px;color:#666;margin:0 0 12px;}
      table{width:100%;border-collapse:collapse;}
      th{background:#7c1d1d;color:white;padding:5px 6px;text-align:left;font-size:10px;}
      td{padding:4px 6px;border-bottom:1px solid #f0e0e0;}
      tr:nth-child(even){background:#fff5f5;}
    </style></head><body>
    <h2>EX Report — Expired Agreements</h2>
    <p class="sub">Team: ${teamFilter === "ALL" ? "All" : teamFilter} &nbsp;|&nbsp; Records: ${filtered.length} &nbsp;|&nbsp; ${new Date().toLocaleDateString()}</p>
    <table>
      <tr><th>Customer</th><th>Model</th><th>Serial No</th><th>Q.No</th><th>Team</th><th>MA Start</th><th>MA End</th><th>Technician</th><th>Type</th><th>Mobile</th></tr>
      ${filtered.map((r) => `<tr><td>${r.customer}</td><td>${r.model}</td><td>${r.serialNo}</td><td>${r.qNo}</td><td>${r.team}</td><td>${r.maStart || "—"}</td><td>${r.maEnd || "—"}</td><td>${r.technicianName}</td><td>${r.type || "—"}</td><td>${r.mobile}</td></tr>`).join("")}
    </table></body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(content);
      w.document.close();
      w.print();
    }
  };

  const paginationPages = useMemo<number[]>(() => {
    const total = Math.min(5, totalPages);
    let start = 1;
    if (totalPages > 5) {
      if (page <= 3) start = 1;
      else if (page >= totalPages - 2) start = totalPages - 4;
      else start = page - 2;
    }
    return Array.from({ length: total }, (_, i) => start + i);
  }, [page, totalPages]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#fdf4f4",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #7c1d1d 0%, #991b1b 40%, #b91c1c 100%)",
          padding: "22px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          boxShadow: "0 4px 20px rgba(185,28,28,0.3)",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              ⚠️
            </div>
            <div>
              <div
                style={{
                  color: "#fca5a5",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Agreement Status
              </div>
              <h1
                style={{
                  color: "white",
                  margin: "2px 0 0",
                  fontSize: "24px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                EX Report
              </h1>
            </div>
          </div>
          {/* Team breakdown pills */}
          <div style={{ display: "flex", gap: "10px", marginLeft: "56px" }}>
            {(["COL", "OUT", "SUB"] as Team[]).map((t) => (
              <div
                key={t}
                style={{
                  background: "rgba(255,255,255,0.13)",
                  borderRadius: "8px",
                  padding: "5px 12px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span
                  style={{
                    color: "#fecaca",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {t}
                </span>
                <span
                  style={{ color: "white", fontSize: "15px", fontWeight: 800 }}
                >
                  {teamCounts[t]}
                </span>
              </div>
            ))}
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "5px 14px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "#fde68a", fontSize: "11px", fontWeight: 700 }}
              >
                TOTAL
              </span>
              <span
                style={{ color: "white", fontSize: "15px", fontWeight: 800 }}
              >
                {RAW_DATA.length}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <button
            onClick={downloadCSV}
            style={{
              background: "#15803d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "9px 18px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            ⬇ Export CSV
          </button>
          <button
            onClick={printPDF}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "8px",
              padding: "8px 18px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "12px",
            }}
          >
            🖨 Print PDF
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          background: "white",
          padding: "13px 28px",
          display: "flex",
          gap: "14px",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "1px solid #fce7e7",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {(
            [
              ["ALL", "All"],
              ["COL", "Colombo"],
              ["OUT", "Outstation"],
              ["SUB", "Suburbs"],
            ] as [string, string][]
          ).map(([v, l]) => (
            <button
              key={v}
              onClick={() => {
                setTeamFilter(v);
                setPage(1);
              }}
              style={{
                padding: "7px 15px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                background: teamFilter === v ? "#991b1b" : "#fef2f2",
                color: teamFilter === v ? "white" : "#7c1d1d",
                transition: "all 0.15s",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={{ width: "1px", height: "28px", background: "#fce7e7" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            style={{
              fontSize: "12px",
              color: "#991b1b",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            MA End:
          </label>
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #fca5a5",
              borderRadius: "7px",
              padding: "6px 10px",
              fontSize: "12px",
              outline: "none",
              color: "#333",
              background: "#fff5f5",
            }}
          />
          {monthFilter && (
            <button
              onClick={() => {
                setMonthFilter("");
                setPage(1);
              }}
              style={{
                background: "#b91c1c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              ✕
            </button>
          )}
        </div>

        <input
          placeholder="Search customer, Q.No, model, technician…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            marginLeft: "auto",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            padding: "7px 14px",
            fontSize: "12px",
            width: "260px",
            outline: "none",
            background: "#fff5f5",
          }}
        />
        <div
          style={{
            background: "#fef2f2",
            color: "#991b1b",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
            border: "1px solid #fca5a5",
          }}
        >
          {filtered.length} records
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          background: "white",
          display: "flex",
          margin: "16px 28px 0",
          borderRadius: "12px 12px 0 0",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {(
          [
            ["table", "📋 Report Table"],
            ["chart", "📊 Monthly Chart"],
          ] as [ActiveTab, string][]
        ).map(([t, l]) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              flex: 1,
              padding: "13px 20px",
              border: "none",
              background: activeTab === t ? "#991b1b" : "white",
              color: activeTab === t ? "white" : "#888",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
              transition: "all 0.15s",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ margin: "0 28px 28px" }}>
        {/* Chart */}
        {activeTab === "chart" && (
          <div
            style={{
              background: "white",
              borderRadius: "0 0 14px 14px",
              padding: "28px 28px 24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            }}
          >
            <h3
              style={{
                margin: "0 0 4px",
                color: "#7c1d1d",
                fontSize: "17px",
                fontWeight: 800,
              }}
            >
              MA End — Monthly Expiry Count
            </h3>
            <p style={{ margin: "0 0 28px", color: "#aaa", fontSize: "12px" }}>
              Agreements expiring per month · filtered by team
            </p>

            {/* Bar chart */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                height: "240px",
                paddingBottom: "30px",
                borderBottom: "2px solid #fee2e2",
                position: "relative",
              }}
            >
              {/* Y-axis hint lines */}
              {[25, 50, 75, 100].map((p) => (
                <div
                  key={p}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: `${30 + (p / 100) * 200}px`,
                    borderTop: "1px dashed #fecaca",
                    zIndex: 0,
                  }}
                />
              ))}
              {MONTHS.map((m, i) => {
                const count = monthlyData[i];
                const barH =
                  count === 0 ? 4 : Math.max(20, (count / maxCount) * 200);
                return (
                  <div
                    key={m}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: count > 0 ? "#991b1b" : "#fca5a5",
                        minHeight: "16px",
                      }}
                    >
                      {count > 0 ? count : ""}
                    </div>
                    <div
                      title={`${m}: ${count} expired`}
                      style={{
                        width: "100%",
                        height: `${barH}px`,
                        background:
                          count > 0
                            ? "linear-gradient(180deg, #f87171 0%, #991b1b 100%)"
                            : "#fee2e2",
                        borderRadius: "5px 5px 0 0",
                        transition: "height 0.4s ease",
                        cursor: "default",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "10px", paddingTop: "8px" }}>
              {MONTHS.map((m) => (
                <div
                  key={m}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#888",
                    fontWeight: 600,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* Summary pills */}
            <div
              style={{
                marginTop: "22px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {MONTHS.map(
                (m, i) =>
                  monthlyData[i] > 0 && (
                    <div
                      key={m}
                      style={{
                        background: "#fff5f5",
                        border: "1px solid #fca5a5",
                        borderRadius: "8px",
                        padding: "7px 14px",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ fontWeight: 800, color: "#991b1b" }}>
                        {m}:
                      </span>
                      <span style={{ color: "#555", marginLeft: "5px" }}>
                        {monthlyData[i]} expir
                        {monthlyData[i] === 1 ? "y" : "ies"}
                      </span>
                    </div>
                  ),
              )}
              {monthlyData.every((c) => c === 0) && (
                <span style={{ color: "#fca5a5", fontSize: "13px" }}>
                  No data for current filter.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        {activeTab === "table" && (
          <div
            style={{
              background: "white",
              borderRadius: "0 0 14px 14px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "12px",
                  minWidth: "1180px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #7c1d1d, #b91c1c)",
                    }}
                  >
                    {[
                      "#",
                      "Customer",
                      "Model",
                      "Serial No",
                      "Q.No",
                      "Team",
                      "Grade",
                      "MA Start",
                      "MA End",
                      "Install Date",
                      "Technician",
                      "Type",
                      "M_INV_NO",
                      "Address",
                      "Mobile",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "11px 10px",
                          color: "#fecaca",
                          fontWeight: 700,
                          textAlign: "left",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((r, i) => {
                    const idx = (page - 1) * PAGE_SIZE + i + 1;
                    const addr = [r.address1, r.address2, r.address3]
                      .filter((a) => a && a !== "-")
                      .join(", ");
                    return (
                      <tr
                        key={`${r.qNo}-${i}`}
                        style={{
                          background: i % 2 === 0 ? "white" : "#fff5f5",
                          borderBottom: "1px solid #fef2f2",
                        }}
                      >
                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#d4a5a5",
                            fontWeight: 700,
                            fontSize: "11px",
                          }}
                        >
                          {idx}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontWeight: 700,
                            color: "#1a202c",
                            maxWidth: "180px",
                          }}
                        >
                          {r.customer}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#4a5568",
                            whiteSpace: "nowrap",
                            fontSize: "11px",
                          }}
                        >
                          {r.model}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#718096",
                            fontSize: "10px",
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.serialNo}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontWeight: 700,
                            color: "#991b1b",
                          }}
                        >
                          {r.qNo}
                        </td>

                        <td style={{ padding: "9px 10px" }}>
                          <span
                            style={{
                              padding: "2px 9px",
                              borderRadius: "10px",
                              fontSize: "10px",
                              fontWeight: 700,
                              ...TEAM_STYLE[r.team],
                            }}
                          >
                            {r.team}
                          </span>
                        </td>

                        <td
                          style={{ padding: "9px 10px", textAlign: "center" }}
                        >
                          {r.grade ? (
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "10px",
                                fontSize: "10px",
                                fontWeight: 700,
                                background: "#f3f4f6",
                                color: "#374151",
                              }}
                            >
                              {r.grade}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: "11px",
                            color: "#555",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.maStart || "—"}
                        </td>

                        <td
                          style={{ padding: "9px 10px", whiteSpace: "nowrap" }}
                        >
                          {r.maEnd ? (
                            <span
                              style={{
                                color: "#991b1b",
                                fontWeight: 800,
                                fontSize: "11px",
                                background: "#fff5f5",
                                padding: "2px 7px",
                                borderRadius: "6px",
                                border: "1px solid #fca5a5",
                              }}
                            >
                              {r.maEnd}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: "11px",
                            color: "#718096",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.installDate || "—"}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            color: "#2d3748",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            fontSize: "11px",
                          }}
                        >
                          {r.technicianName}
                        </td>

                        <td style={{ padding: "9px 10px" }}>
                          {r.type ? (
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: 700,
                                ...(TYPE_STYLE[r.type] ?? {
                                  background: "#e2e8f0",
                                  color: "#4a5568",
                                }),
                              }}
                            >
                              {r.type}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: "10px",
                            color: "#999",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.mInvNo || "—"}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: "11px",
                            color: "#666",
                            maxWidth: "170px",
                          }}
                        >
                          {addr}
                        </td>

                        <td
                          style={{
                            padding: "9px 10px",
                            fontSize: "11px",
                            color: "#1d4ed8",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.mobile && r.mobile !== "-" ? r.mobile : "—"}
                        </td>
                      </tr>
                    );
                  })}
                  {pageData.length === 0 && (
                    <tr>
                      <td
                        colSpan={15}
                        style={{ padding: "60px", textAlign: "center" }}
                      >
                        <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                          🔍
                        </div>
                        <div
                          style={{
                            color: "#ccc",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          No expired records match the current filters.
                        </div>
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
                  borderTop: "1px solid #fef2f2",
                  background: "#fffbfb",
                }}
              >
                <span style={{ fontSize: "12px", color: "#999" }}>
                  Showing{" "}
                  <strong style={{ color: "#991b1b" }}>
                    {(page - 1) * PAGE_SIZE + 1}
                  </strong>
                  –
                  <strong style={{ color: "#991b1b" }}>
                    {Math.min(page * PAGE_SIZE, filtered.length)}
                  </strong>{" "}
                  of{" "}
                  <strong style={{ color: "#991b1b" }}>
                    {filtered.length}
                  </strong>
                </span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "7px",
                      border: "1px solid #fca5a5",
                      background: "white",
                      cursor: page === 1 ? "not-allowed" : "pointer",
                      color: page === 1 ? "#fca5a5" : "#991b1b",
                      fontWeight: 700,
                    }}
                  >
                    ‹
                  </button>
                  {paginationPages.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        padding: "6px 11px",
                        borderRadius: "7px",
                        border: "1px solid #fca5a5",
                        background: p === page ? "#991b1b" : "white",
                        color: p === page ? "white" : "#991b1b",
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
                      border: "1px solid #fca5a5",
                      background: "white",
                      cursor: page === totalPages ? "not-allowed" : "pointer",
                      color: page === totalPages ? "#fca5a5" : "#991b1b",
                      fontWeight: 700,
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "0 28px 20px",
          fontSize: "11px",
          color: "#d4a5a5",
          display: "flex",
          gap: "20px",
        }}
      >
        <span>EX = Expired Agreement</span>
        <span>MA End date used for monthly chart</span>
        <span style={{ marginLeft: "auto" }}>
          CSV exports apply active Team &amp; Month filters
        </span>
      </div>
    </div>
  );
}
