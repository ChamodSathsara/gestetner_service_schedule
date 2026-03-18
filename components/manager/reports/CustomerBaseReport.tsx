import React, { useState, useMemo, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Machine {
  machineCode: string;
  modelNumber: string;
  technicianCode: string;
  location: string;
  contactName: string;
  isActive: boolean;
}

interface Customer {
  customerCode: string;
  customerName: string;
  address1: string;
  address2: string;
  address3: string;
  mobile: string;
  machines: Machine[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CUSTOMERS: Customer[] = [
  {
    customerCode: "C001",
    customerName: "CENTRAL CULTURAL FUND",
    address1: "2ND STAGE, 04TH FLOOR",
    address2: "SETHSIRIPAYA",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
    machines: [
      {
        machineCode: "Q12669",
        modelNumber: "MP 2014AD",
        technicianCode: "3152",
        location: "GROUND FLOOR - RECEPTION",
        contactName: "MR. PERERA",
        isActive: true,
      },
      {
        machineCode: "Q12670",
        modelNumber: "MP 2014AD",
        technicianCode: "3152",
        location: "2ND FLOOR - ADMIN",
        contactName: "MS. SILVA",
        isActive: true,
      },
      {
        machineCode: "Q13208",
        modelNumber: "MP 2014AD",
        technicianCode: "3152",
        location: "4TH FLOOR - ACCOUNTS",
        contactName: "MR. FERNANDO",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C002",
    customerName: "MINISTRY OF HIGHER EDUCATION",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
    machines: [
      {
        machineCode: "Q98978",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "1ST FLOOR - REGISTRY",
        contactName: "MRS. JAYAWARDENA",
        isActive: true,
      },
      {
        machineCode: "Q98979",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "2ND FLOOR - IT UNIT",
        contactName: "MR. BANDARA",
        isActive: true,
      },
      {
        machineCode: "Q98980",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "3RD FLOOR - DIRECTOR",
        contactName: "MS. KUMARI",
        isActive: false,
      },
      {
        machineCode: "Q98981",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "4TH FLOOR - PLANNING",
        contactName: "MR. RANASINGHE",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C003",
    customerName: "EMBASSY OF FRANCE",
    address1: "NO: 89, ROSMEAD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112639401",
    machines: [
      {
        machineCode: "Q9712",
        modelNumber: "MP2501SP",
        technicianCode: "3152",
        location: "MAIN HALL",
        contactName: "MR. DUBOIS",
        isActive: true,
      },
      {
        machineCode: "Q16600",
        modelNumber: "IMC2000",
        technicianCode: "3152",
        location: "VISA SECTION",
        contactName: "MS. MARTIN",
        isActive: true,
      },
      {
        machineCode: "Q16599",
        modelNumber: "IMC2000",
        technicianCode: "3152",
        location: "ADMIN OFFICE",
        contactName: "MR. LEFEVRE",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C004",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72, POLDUWA ROAD",
    address2: "BATTARAMULLA",
    address3: "-",
    mobile: "0112887021",
    machines: [
      {
        machineCode: "Q14379",
        modelNumber: "MP2501SP",
        technicianCode: "3168",
        location: "GROUND FLOOR",
        contactName: "MR. DISSANAYAKE",
        isActive: true,
      },
      {
        machineCode: "Q14380",
        modelNumber: "MP2501SP",
        technicianCode: "8050",
        location: "AUDIT DIVISION A",
        contactName: "MS. WEERASINGHE",
        isActive: true,
      },
      {
        machineCode: "Q14381",
        modelNumber: "MP2501SP",
        technicianCode: "8034",
        location: "AUDIT DIVISION B",
        contactName: "MR. GUNASEKARA",
        isActive: true,
      },
      {
        machineCode: "Q14383",
        modelNumber: "MP2501SP",
        technicianCode: "8050",
        location: "FINANCE UNIT",
        contactName: "MRS. RATHNAYAKE",
        isActive: false,
      },
      {
        machineCode: "Q14384",
        modelNumber: "MP2501SP",
        technicianCode: "3152",
        location: "DIRECTOR OFFICE",
        contactName: "MR. JAYASURIYA",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C005",
    customerName: "UNIVERSITY OF COLOMBO",
    address1: "NO:94 KUMARATHUNGA MUNIDASA MW",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "0112502127",
    machines: [
      {
        machineCode: "Q11315",
        modelNumber: "DSM615",
        technicianCode: "3152",
        location: "FACULTY OF ARTS",
        contactName: "PROF. WIJESEKARA",
        isActive: true,
      },
      {
        machineCode: "Q9955",
        modelNumber: "MP 2501SP",
        technicianCode: "3152",
        location: "FACULTY OF SCIENCE",
        contactName: "DR. MENDIS",
        isActive: true,
      },
      {
        machineCode: "Q14515",
        modelNumber: "DD5450",
        technicianCode: "3152",
        location: "LIBRARY",
        contactName: "MS. ABEYSEKARA",
        isActive: false,
      },
      {
        machineCode: "Q99088",
        modelNumber: "DD3344",
        technicianCode: "3152",
        location: "ADMIN BLOCK",
        contactName: "MR. SAMARAWEERA",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C006",
    customerName: "MINISTRY OF PORTS AND SHIPPING",
    address1: "NO. 19, CHAITHYA ROAD",
    address2: "COLOMBO 01",
    address3: "-",
    mobile: "0112320252",
    machines: [
      {
        machineCode: "Q12009",
        modelNumber: "MP2501SP",
        technicianCode: "3157",
        location: "SECRETARY OFFICE",
        contactName: "MR. KODITHUWAKKU",
        isActive: true,
      },
      {
        machineCode: "Q12365",
        modelNumber: "MP2501SP",
        technicianCode: "3157",
        location: "PLANNING DIVISION",
        contactName: "MS. SENEVIRATNE",
        isActive: true,
      },
      {
        machineCode: "Q9119",
        modelNumber: "MP2501SP",
        technicianCode: "3157",
        location: "SHIPPING REGISTRY",
        contactName: "MR. WICKRAMASINGHE",
        isActive: true,
      },
      {
        machineCode: "Q9120",
        modelNumber: "MP2501SP",
        technicianCode: "3157",
        location: "IT DIVISION",
        contactName: "MRS. PEIRIS",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C007",
    customerName: "COLOMBO MUNICIPAL COUNCIL",
    address1: "TOWN HALL, DHARMAPALA MAWATHA",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112691968",
    machines: [
      {
        machineCode: "Q15267",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "MAIN OFFICE",
        contactName: "MR. ATTANAYAKE",
        isActive: true,
      },
      {
        machineCode: "Q8256",
        modelNumber: "MP2501SP",
        technicianCode: "3152",
        location: "HEALTH DEPT",
        contactName: "DR. WIJERATNE",
        isActive: true,
      },
      {
        machineCode: "Q12904",
        modelNumber: "MP2501SP",
        technicianCode: "8028",
        location: "PUBLIC HEALTH",
        contactName: "MR. NANDANA",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C008",
    customerName: "DEPARTMENT OF BUDDHIST AFFAIRS",
    address1: "NO: 135, DHARMAPALA MW",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112424447",
    machines: [
      {
        machineCode: "Q7176",
        modelNumber: "MP 2501SP",
        technicianCode: "3152",
        location: "DIRECTOR GENERAL OFFICE",
        contactName: "REV. THERO",
        isActive: true,
      },
      {
        machineCode: "Q7177",
        modelNumber: "MP 2501SP",
        technicianCode: "3152",
        location: "ADMINISTRATION",
        contactName: "MR. GUNAWARDENA",
        isActive: true,
      },
      {
        machineCode: "Q7341",
        modelNumber: "MP2501SP",
        technicianCode: "3152",
        location: "FINANCE SECTION",
        contactName: "MS. DHARMASIRI",
        isActive: false,
      },
      {
        machineCode: "Q15539",
        modelNumber: "MP 2014AD",
        technicianCode: "3152",
        location: "RECORDS ROOM",
        contactName: "MR. NISHANTHA",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C009",
    customerName: "SPECIAL TASK FORCE",
    address1: "NO:223, BAUDDHALOKA MW",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112500471",
    machines: [
      {
        machineCode: "Q12271",
        modelNumber: "MP 2014AD",
        technicianCode: "8050",
        location: "HQ - MAIN OFFICE",
        contactName: "CAPT. SILVA",
        isActive: true,
      },
      {
        machineCode: "Q12289",
        modelNumber: "MP 2014AD",
        technicianCode: "3152",
        location: "OPERATIONS ROOM",
        contactName: "MAJ. FERNANDO",
        isActive: true,
      },
      {
        machineCode: "Q5552",
        modelNumber: "MP2001L",
        technicianCode: "3167",
        location: "LOGISTICS",
        contactName: "LT. JAYASENA",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C010",
    customerName: "POLICE HEADQUARTERS",
    address1: "COLOMBO 01",
    address2: "-",
    address3: "-",
    mobile: "0112621667",
    machines: [
      {
        machineCode: "Q11571",
        modelNumber: "MP 2014AD",
        technicianCode: "3168",
        location: "IGP OFFICE",
        contactName: "ASP RANAWEERA",
        isActive: true,
      },
      {
        machineCode: "Q11593",
        modelNumber: "MP 2014AD",
        technicianCode: "3168",
        location: "CID DIVISION",
        contactName: "DIG SOORIYABANDARA",
        isActive: true,
      },
      {
        machineCode: "Q11616",
        modelNumber: "MP 2014AD",
        technicianCode: "3168",
        location: "ADMIN SECTION",
        contactName: "SP KARUNARATNE",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C011",
    customerName: "CRIMINAL RECORDS DIVISION",
    address1: "NO.40 MEDLAND PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112692012",
    machines: [
      {
        machineCode: "Q18311",
        modelNumber: "DD3344",
        technicianCode: "3152",
        location: "RECORDS ROOM A",
        contactName: "MR. ABEYKOON",
        isActive: true,
      },
      {
        machineCode: "Q18568",
        modelNumber: "M2701",
        technicianCode: "3152",
        location: "RECORDS ROOM B",
        contactName: "MS. RAJAPAKSHA",
        isActive: true,
      },
      {
        machineCode: "Q18569",
        modelNumber: "M2701",
        technicianCode: "3152",
        location: "DATA ENTRY UNIT",
        contactName: "MR. PRIYANTHA",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C012",
    customerName: "IRRIGATION DEPARTMENT",
    address1: "P.O. BOX. 1138, BAUDDHALOKA MW",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112587888",
    machines: [
      {
        machineCode: "Q16327",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "CHIEF ENGINEER OFFICE",
        contactName: "ENGR. PIERIS",
        isActive: true,
      },
      {
        machineCode: "Q16332",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "HYDROLOGY DIVISION",
        contactName: "MR. RANAWAKA",
        isActive: true,
      },
      {
        machineCode: "Q16336",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "DESIGN OFFICE",
        contactName: "MS. SUGATHADASA",
        isActive: true,
      },
      {
        machineCode: "Q16337",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "PLANNING UNIT",
        contactName: "MR. BUDDHADASA",
        isActive: false,
      },
      {
        machineCode: "Q16339",
        modelNumber: "MP 2014D",
        technicianCode: "3152",
        location: "SURVEY SECTION",
        contactName: "MR. MUNASINGHE",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C013",
    customerName: "NATIONAL SCIENCE FOUNDATION",
    address1: "NO:47/5, MAITLAND PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0123456789",
    machines: [
      {
        machineCode: "Q10646",
        modelNumber: "MP2501SP",
        technicianCode: "3152",
        location: "DIRECTOR OFFICE",
        contactName: "DR. PATHIRANA",
        isActive: true,
      },
      {
        machineCode: "Q10516",
        modelNumber: "MPC2004SP",
        technicianCode: "3152",
        location: "RESEARCH WING",
        contactName: "MS. KARUNARATHNA",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C014",
    customerName: "LANWA SANSTHA CEMENT CORPORATION PVT LTD",
    address1: "NO:25 ALFRED PLACE",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "-",
    machines: [
      {
        machineCode: "Q18166",
        modelNumber: "IMC2000",
        technicianCode: "3185",
        location: "ACCOUNTS DEPT",
        contactName: "MR. LANKAPURA",
        isActive: true,
      },
      {
        machineCode: "Q18782",
        modelNumber: "M2701",
        technicianCode: "3185",
        location: "HR DIVISION",
        contactName: "MS. SENANAYAKE",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C015",
    customerName: "NATIONAL HOUSING DEVELOPMENT AUTHORITY",
    address1: "P.O.BOX.1826",
    address2: "NO.34, SRI CHITTAMPALAM A GARD",
    address3: "-",
    mobile: "0342222298",
    machines: [
      {
        machineCode: "Q19108",
        modelNumber: "DD3344",
        technicianCode: "3168",
        location: "PLANNING DIVISION",
        contactName: "MR. WIJESINGHE",
        isActive: true,
      },
      {
        machineCode: "Q19175",
        modelNumber: "M2701",
        technicianCode: "8050",
        location: "FINANCE DEPT",
        contactName: "MS. BALASURIYA",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C016",
    customerName: "BRITISH INSTITUTE OF ENGINEERING AND TECHNOLOGY (PVT) LTD",
    address1: "NO:534, GALLE ROAD",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "0112576596",
    machines: [
      {
        machineCode: "Q15735",
        modelNumber: "IM2702",
        technicianCode: "3152",
        location: "ADMISSIONS OFFICE",
        contactName: "MR. GUNARATNE",
        isActive: true,
      },
      {
        machineCode: "Q15736",
        modelNumber: "IM2702",
        technicianCode: "3152",
        location: "EXAMINATION HALL",
        contactName: "MS. WICKRAMA",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C017",
    customerName: "MINISTRY OF TOURISM & WILDLIFE DIVISION",
    address1: "NO:07 HEKTER KOBBAKADUWA MAWATHA",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112381798",
    machines: [
      {
        machineCode: "Q17455",
        modelNumber: "IM2702",
        technicianCode: "3152",
        location: "SECRETARY OFFICE",
        contactName: "MR. JAYAKODY",
        isActive: true,
      },
      {
        machineCode: "Q18040",
        modelNumber: "IM2702",
        technicianCode: "3152",
        location: "WILDLIFE WING",
        contactName: "DR. SAMARAKOON",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C018",
    customerName: "INSTITUTE OF WESTERN MUSIC & SPEECH",
    address1: "NO:12, KOTHALAWALA GARDEN",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "0112587328",
    machines: [
      {
        machineCode: "Q19336",
        modelNumber: "MP3555",
        technicianCode: "3152",
        location: "ADMIN OFFICE",
        contactName: "MS. AMARATUNGA",
        isActive: true,
      },
      {
        machineCode: "Q19337",
        modelNumber: "MP3555",
        technicianCode: "3152",
        location: "LIBRARY",
        contactName: "MR. JAYALATH",
        isActive: false,
      },
    ],
  },
  {
    customerCode: "C019",
    customerName: "SRI LANKA FOUNDATION",
    address1: "NO:100, INDEPENDENCE SQUARE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112695249",
    machines: [
      {
        machineCode: "Q11452",
        modelNumber: "MP3555",
        technicianCode: "3152",
        location: "CONFERENCE HALL",
        contactName: "MR. DISSANAYAKA",
        isActive: true,
      },
    ],
  },
  {
    customerCode: "C020",
    customerName: "CANADIAN HIGH COMMISSION",
    address1: "NO:06 R.G SENANAYAKA MAWATHA",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "-",
    machines: [
      {
        machineCode: "Q18585",
        modelNumber: "IMC2000",
        technicianCode: "3152",
        location: "VISA SECTION",
        contactName: "MR. THOMPSON",
        isActive: true,
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toCSV(data: Customer[]): string {
  const h = [
    "Customer Code",
    "Customer Name",
    "Address 1",
    "Address 2",
    "Address 3",
    "Mobile",
    "Total Machines",
    "Active Machines",
  ];
  const rows = data.map((c) => [
    c.customerCode,
    c.customerName,
    c.address1,
    c.address2,
    c.address3,
    c.mobile,
    String(c.machines.length),
    String(c.machines.filter((m) => m.isActive).length),
  ]);
  return [h, ...rows]
    .map((r) => r.map((v) => `"${(v ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function dlCSV(csv: string, name: string) {
  const b = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  URL.revokeObjectURL(u);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface MachineDialogProps {
  customer: Customer;
  onClose: () => void;
}

function MachineDialog({ customer, onClose }: MachineDialogProps) {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const shown = customer.machines.filter((m) =>
    filter === "all" ? true : filter === "active" ? m.isActive : !m.isActive,
  );

  // close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const active = customer.machines.filter((m) => m.isActive).length;
  const inactive = customer.machines.length - active;

  return (
    <div
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "820px",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Dialog Header */}
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
                Machine List
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
                {customer.customerName}
              </h2>
              <p
                style={{
                  color: "#7dd3fc",
                  fontSize: "12px",
                  margin: "4px 0 0",
                  fontWeight: 500,
                }}
              >
                {customer.address1}
                {customer.address2 !== "-" ? `, ${customer.address2}` : ""}
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

          {/* Machine count pills */}
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            {[
              {
                label: "Total",
                val: customer.machines.length,
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
                  transition: "all 0.15s",
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

        {/* Dialog Table */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
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
                  "Machine Code (Q.No)",
                  "Model Number",
                  "Tech Code",
                  "Location",
                  "Contact Name",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 14px",
                      color: "#64748b",
                      fontWeight: 700,
                      textAlign: "left",
                      fontSize: "11px",
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
              {shown.map((m, i) => (
                <tr
                  key={m.machineCode}
                  style={{
                    background: i % 2 === 0 ? "white" : "#f8fafc",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 14px",
                      color: "#cbd5e1",
                      fontWeight: 700,
                      fontSize: "11px",
                    }}
                  >
                    {i + 1}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        fontWeight: 800,
                        color: "#1e40af",
                        background: "#eff6ff",
                        padding: "3px 10px",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    >
                      {m.machineCode}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {m.modelNumber}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        background: "#ede9fe",
                        color: "#5b21b6",
                        padding: "2px 8px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {m.technicianCode}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      color: "#475569",
                      fontSize: "12px",
                    }}
                  >
                    {m.location}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      color: "#1e293b",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                  >
                    {m.contactName}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "4px 11px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 700,
                        background: m.isActive ? "#dcfce7" : "#fee2e2",
                        color: m.isActive ? "#15803d" : "#b91c1c",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: m.isActive ? "#22c55e" : "#ef4444",
                          flexShrink: 0,
                        }}
                      />
                      {m.isActive ? "Active" : "Non-Active"}
                    </span>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
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
        </div>

        {/* Dialog Footer */}
        <div
          style={{
            padding: "14px 24px",
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
            of{" "}
            <strong style={{ color: "#334155" }}>
              {customer.machines.length}
            </strong>{" "}
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

export default function CustomerBaseReport() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const PAGE_SIZE = 10;

  const filtered = useMemo<Customer[]>(() => {
    if (!search.trim()) return CUSTOMERS;
    const q = search.toLowerCase();
    return CUSTOMERS.filter(
      (c) =>
        c.customerName.toLowerCase().includes(q) ||
        c.customerCode.toLowerCase().includes(q) ||
        c.address1.toLowerCase().includes(q) ||
        c.address2.toLowerCase().includes(q) ||
        c.mobile.includes(q),
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pages = useMemo<number[]>(() => {
    const total = Math.min(5, totalPages);
    let s =
      page <= 3
        ? 1
        : page >= totalPages - 2
          ? Math.max(1, totalPages - 4)
          : page - 2;
    return Array.from({ length: total }, (_, i) => s + i);
  }, [page, totalPages]);

  const totalMachines = CUSTOMERS.reduce(
    (acc, c) => acc + c.machines.length,
    0,
  );
  const activeMachines = CUSTOMERS.reduce(
    (acc, c) => acc + c.machines.filter((m) => m.isActive).length,
    0,
  );

  return (
    <>
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)",
            padding: "22px 28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
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
              {/* Stats */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  {
                    label: "Customers",
                    val: CUSTOMERS.length,
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
                  {
                    label: "Active",
                    val: activeMachines,
                    color: "#4ade80",
                    border: "rgba(74,222,128,0.3)",
                    bg: "rgba(74,222,128,0.1)",
                  },
                  {
                    label: "Inactive",
                    val: totalMachines - activeMachines,
                    color: "#f87171",
                    border: "rgba(248,113,113,0.3)",
                    bg: "rgba(248,113,113,0.1)",
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
            <button
              onClick={() => dlCSV(toCSV(filtered), "Customer_Base_Report.csv")}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "9px",
                padding: "11px 22px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
                boxShadow: "0 2px 8px rgba(22,163,74,0.4)",
              }}
            >
              ⬇ Download Customer List
            </button>
          </div>
        </div>

        {/* ── Search Bar ── */}
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
              placeholder="Search by customer name, code, address…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{
                width: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: "9px",
                padding: "8px 14px 8px 36px",
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

        {/* ── Table ── */}
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
                minWidth: "860px",
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
                    "Address 1",
                    "Address 2",
                    "Address 3",
                    "Mobile",
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
                  const active = c.machines.filter((m) => m.isActive).length;
                  const idx = (page - 1) * PAGE_SIZE + i + 1;
                  return (
                    <tr
                      key={c.customerCode}
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
                          {c.customerCode}
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
                        {c.customerName}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#475569",
                          fontSize: "12px",
                          maxWidth: "160px",
                        }}
                      >
                        {c.address1}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        {c.address2 !== "-" ? c.address2 : "—"}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#64748b",
                          fontSize: "12px",
                        }}
                      >
                        {c.address3 !== "-" ? c.address3 : "—"}
                      </td>

                      <td
                        style={{
                          padding: "13px 14px",
                          color: "#2563eb",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.mobile !== "-" ? c.mobile : "—"}
                      </td>

                      <td style={{ padding: "13px 14px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "#0f172a",
                              fontSize: "14px",
                            }}
                          >
                            {c.machines.length}
                          </span>
                          <div style={{ display: "flex", gap: "3px" }}>
                            <span
                              style={{
                                background: "#dcfce7",
                                color: "#15803d",
                                padding: "1px 6px",
                                borderRadius: "6px",
                                fontSize: "10px",
                                fontWeight: 700,
                              }}
                            >
                              {active}✓
                            </span>
                            {c.machines.length - active > 0 && (
                              <span
                                style={{
                                  background: "#fee2e2",
                                  color: "#b91c1c",
                                  padding: "1px 6px",
                                  borderRadius: "6px",
                                  fontSize: "10px",
                                  fontWeight: 700,
                                }}
                              >
                                {c.machines.length - active}✗
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "13px 14px" }}>
                        <button
                          onClick={() => setSelected(c)}
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
                      colSpan={9}
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

        {/* Footer note */}
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

      {/* ── Machine Dialog ── */}
      {selected && (
        <MachineDialog customer={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
