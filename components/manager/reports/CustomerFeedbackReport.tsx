import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedbackType = "Service" | "Job";
type Rating = 1 | 2 | 3 | 4 | 5;

interface Feedback {
  jobNumber: string;
  jobDate: string;
  feedbackDate: string;
  mobile: string;
  customerName: string;
  rating: Rating;
  review: string;
  techCode: string;
  techName: string;
  type: FeedbackType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: Feedback[] = [
  {
    jobNumber: "JB-0001",
    jobDate: "2025-01-04",
    feedbackDate: "2025-01-05",
    mobile: "0112186308",
    customerName: "CENTRAL CULTURAL FUND",
    rating: 5,
    review:
      "Excellent service! The technician was very professional and fixed the issue quickly. Highly satisfied.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0001",
    jobDate: "2025-01-06",
    feedbackDate: "2025-01-07",
    mobile: "0112639401",
    customerName: "EMBASSY OF FRANCE",
    rating: 4,
    review:
      "Good service overall. Minor delay in arrival but work was done perfectly.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0002",
    jobDate: "2025-01-09",
    feedbackDate: "2025-01-10",
    mobile: "0812388155",
    customerName: "NATURAL RESOURCES MANAGEMENT CENTER",
    rating: 3,
    review:
      "Service was average. The machine works now but took longer than expected to repair.",
    techCode: "1024",
    techName: "E.M.LAKSHMAN",
    type: "Job",
  },
  {
    jobNumber: "SV-0002",
    jobDate: "2025-01-13",
    feedbackDate: "2025-01-14",
    mobile: "0342222298",
    customerName: "NATIONAL HOUSING DEVELOPMENT AUTHORITY",
    rating: 5,
    review:
      "Outstanding! Very quick response and the technician explained everything clearly.",
    techCode: "3168",
    techName: "VISHARA",
    type: "Service",
  },
  {
    jobNumber: "JB-0003",
    jobDate: "2025-01-15",
    feedbackDate: "2025-01-16",
    mobile: "0716852449",
    customerName: "RANGIRI DAMBULLA DEVELOPMENT FOUNDATION",
    rating: 4,
    review:
      "Satisfied with the work. The technician was courteous and knowledgeable.",
    techCode: "3180",
    techName: "HARSHA MALSHAN",
    type: "Job",
  },
  {
    jobNumber: "SV-0003",
    jobDate: "2025-01-19",
    feedbackDate: "2025-01-20",
    mobile: "0112887021",
    customerName: "NATIONAL AUDIT OFFICE",
    rating: 2,
    review:
      "The issue was not fully resolved. Had to call again the next day. Needs improvement.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0004",
    jobDate: "2025-01-22",
    feedbackDate: "2025-01-23",
    mobile: "0112389745",
    customerName: "JUBILEE AGENCIES (PVT) LTD",
    rating: 5,
    review:
      "Perfect service! Machine is working like new. Very impressed with the response time.",
    techCode: "3127",
    techName: "FAZLAN AMEEN",
    type: "Job",
  },
  {
    jobNumber: "SV-0004",
    jobDate: "2025-01-25",
    feedbackDate: "2025-01-26",
    mobile: "0763803500",
    customerName: "KITHSEWANA",
    rating: 1,
    review:
      "Very disappointed. Technician arrived late and the problem was not fixed at all. Very poor experience.",
    techCode: "3107",
    techName: "GAYAN ASIRI",
    type: "Service",
  },
  {
    jobNumber: "JB-0005",
    jobDate: "2025-02-02",
    feedbackDate: "2025-02-03",
    mobile: "0774075211",
    customerName: "KM / SWAMY VIPULANANDA VIDYALAYAM",
    rating: 4,
    review:
      "Good work done efficiently. The technician was helpful and friendly.",
    techCode: "3167",
    techName: "NIRUSHAN",
    type: "Job",
  },
  {
    jobNumber: "SV-0005",
    jobDate: "2025-02-05",
    feedbackDate: "2025-02-06",
    mobile: "081-2388100",
    customerName: "SEED & PLANTING MATERIAL DEVELOPMENT CENTRE",
    rating: 3,
    review:
      "Acceptable service. Machine is working but could have been faster.",
    techCode: "3135",
    techName: "A.KIRIYUTHAN",
    type: "Service",
  },
  {
    jobNumber: "JB-0006",
    jobDate: "2025-02-08",
    feedbackDate: "2025-02-09",
    mobile: "0372226191",
    customerName: "WAYAMBA CO-OPERATIVE RURAL BANK",
    rating: 5,
    review:
      "Exceptional! The technician went above and beyond. Very professional attitude.",
    techCode: "3136",
    techName: "MALITH SAMEERA",
    type: "Job",
  },
  {
    jobNumber: "SV-0006",
    jobDate: "2025-02-11",
    feedbackDate: "2025-02-12",
    mobile: "0112320252",
    customerName: "MINISTRY OF PORTS AND SHIPPING",
    rating: 4,
    review: "Quick and efficient service. Very happy with the result.",
    techCode: "3157",
    techName: "DAKSHINA PRABATH",
    type: "Service",
  },
  {
    jobNumber: "JB-0007",
    jobDate: "2025-02-14",
    feedbackDate: "2025-02-15",
    mobile: "0778267702",
    customerName: "BT/BW/KARAIYAKKANTHIVU GANESHER VIDYALAYA",
    rating: 2,
    review:
      "The technician was late and did not communicate properly. Service quality needs to improve.",
    techCode: "3129",
    techName: "J.S.RUSHANTH",
    type: "Job",
  },
  {
    jobNumber: "SV-0007",
    jobDate: "2025-02-17",
    feedbackDate: "2025-02-18",
    mobile: "0262233202",
    customerName: "PRIMA (CEYLON) LTD",
    rating: 5,
    review:
      "Brilliant service! Everything was sorted in no time. Very satisfied.",
    techCode: "3123",
    techName: "SOBAN N.",
    type: "Service",
  },
  {
    jobNumber: "JB-0008",
    jobDate: "2025-02-20",
    feedbackDate: "2025-02-21",
    mobile: "0705052729",
    customerName: "COLOMBO MUNICIPAL COUNCIL",
    rating: 3,
    review:
      "Service was okay. The technician was polite but the repair took too long.",
    techCode: "8028",
    techName: "DAMITH SANJAYA",
    type: "Job",
  },
  {
    jobNumber: "SV-0008",
    jobDate: "2025-02-23",
    feedbackDate: "2025-02-24",
    mobile: "0718738854",
    customerName: "MR.P.B.I.A.K.DAYASIRI",
    rating: 4,
    review: "Good service, machine is running well now. Would recommend.",
    techCode: "3191",
    techName: "PRADEEP SAMPATH",
    type: "Service",
  },
  {
    jobNumber: "JB-0009",
    jobDate: "2025-03-01",
    feedbackDate: "2025-03-02",
    mobile: "0740471036",
    customerName: "MR.RANGA DILEEPA",
    rating: 5,
    review:
      "Superb experience! Very fast and professional. Machine working perfectly.",
    techCode: "3184",
    techName: "DARSHANA RUKSHAN",
    type: "Job",
  },
  {
    jobNumber: "SV-0009",
    jobDate: "2025-03-04",
    feedbackDate: "2025-03-05",
    mobile: "0777539863",
    customerName: "NATIONAL PEOPLE'S POWER OFFICE",
    rating: 1,
    review:
      "Terrible service. Technician did not know how to fix the issue. Complete waste of time.",
    techCode: "3154",
    techName: "ARUNRAJ JEYASINGH",
    type: "Service",
  },
  {
    jobNumber: "JB-0010",
    jobDate: "2025-03-07",
    feedbackDate: "2025-03-08",
    mobile: "0112887021",
    customerName: "NATIONAL AUDIT OFFICE",
    rating: 5,
    review:
      "Wonderful! The team was very responsive and the work was done to perfection.",
    techCode: "8050",
    techName: "LOCHANA MADUWANTHA",
    type: "Job",
  },
  {
    jobNumber: "SV-0010",
    jobDate: "2025-03-10",
    feedbackDate: "2025-03-11",
    mobile: "0778881546",
    customerName: "MINISTRY OF POWER & RENEWABLE ENERGY",
    rating: 4,
    review:
      "Professional service, well done. Minor issue with parts availability but resolved quickly.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0011",
    jobDate: "2025-03-13",
    feedbackDate: "2025-03-14",
    mobile: "0718015517",
    customerName: "CRIMINAL RECORDS DIVISION",
    rating: 3,
    review:
      "Average experience. The repair was done but service could have been better.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0011",
    jobDate: "2025-03-15",
    feedbackDate: "2025-03-16",
    mobile: "0352222549",
    customerName: "REGIONAL DIRECTOR OF HEALTH SERVICES",
    rating: 5,
    review:
      "Excellent! Very punctual and the machine is working flawlessly now.",
    techCode: "3177",
    techName: "RASITHA PERERA",
    type: "Service",
  },
  {
    jobNumber: "JB-0012",
    jobDate: "2025-03-17",
    feedbackDate: "2025-03-18",
    mobile: "0768033370",
    customerName: "RITZ CLOTHING YAPAHUWA (PVT)LTD",
    rating: 2,
    review:
      "Not satisfied. The machine stopped working again within two days of service.",
    techCode: "3180",
    techName: "HARSHA MALSHAN",
    type: "Job",
  },
  {
    jobNumber: "SV-0012",
    jobDate: "2025-03-19",
    feedbackDate: "2025-03-20",
    mobile: "0112886584",
    customerName: "SRI LANKA SOCIAL SECURITY BOARD",
    rating: 4,
    review:
      "Good experience. Technician was knowledgeable and resolved the issue well.",
    techCode: "8050",
    techName: "LOCHANA MADUWANTHA",
    type: "Service",
  },
  {
    jobNumber: "JB-0013",
    jobDate: "2025-03-21",
    feedbackDate: "2025-03-22",
    mobile: "0779008471",
    customerName: "DAGONNA WIMALANANDA VIDHYALAYA",
    rating: 5,
    review:
      "Amazing service! Very professional team. Machine is working great.",
    techCode: "8036",
    techName: "ASIRI SASANKA",
    type: "Job",
  },
  {
    jobNumber: "SV-0013",
    jobDate: "2025-03-23",
    feedbackDate: "2025-03-24",
    mobile: "0112301476",
    customerName: "VIN OCEAN SHIPPING LTD",
    rating: 3,
    review:
      "Service was fine, nothing exceptional. The job got done but communication could be better.",
    techCode: "3137",
    techName: "KAVINDA LIYANAGE",
    type: "Service",
  },
  {
    jobNumber: "JB-0014",
    jobDate: "2025-03-25",
    feedbackDate: "2025-03-26",
    mobile: "0343347478",
    customerName: "DIVISIONAL SECRETARIAT",
    rating: 4,
    review:
      "Satisfied with the service. Technician was experienced and handled it well.",
    techCode: "8029",
    techName: "RASIKA LAKMAL",
    type: "Job",
  },
  {
    jobNumber: "SV-0014",
    jobDate: "2025-03-27",
    feedbackDate: "2025-03-28",
    mobile: "0112186308",
    customerName: "CENTRAL CULTURAL FUND",
    rating: 5,
    review:
      "Top-notch service again! Always reliable and professional. Keep it up!",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0015",
    jobDate: "2025-04-01",
    feedbackDate: "2025-04-02",
    mobile: "0112694486",
    customerName: "MINISTRY OF HIGHER EDUCATION",
    rating: 1,
    review:
      "The technician did not follow proper procedures. Machine was damaged further. Very unhappy.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0015",
    jobDate: "2025-04-03",
    feedbackDate: "2025-04-04",
    mobile: "0112639401",
    customerName: "EMBASSY OF FRANCE",
    rating: 4,
    review:
      "Good response time. Work completed satisfactorily. Happy with the outcome.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0016",
    jobDate: "2025-04-05",
    feedbackDate: "2025-04-06",
    mobile: "0112887021",
    customerName: "NATIONAL AUDIT OFFICE",
    rating: 5,
    review:
      "Outstanding professionalism. Very impressed with the entire service experience.",
    techCode: "8034",
    techName: "SENAL KANISHKA",
    type: "Job",
  },
  {
    jobNumber: "SV-0016",
    jobDate: "2025-04-07",
    feedbackDate: "2025-04-08",
    mobile: "0716852449",
    customerName: "RANGIRI DAMBULLA DEVELOPMENT FOUNDATION",
    rating: 3,
    review:
      "Decent service. The problem was solved but the technician was not very communicative.",
    techCode: "3180",
    techName: "HARSHA MALSHAN",
    type: "Service",
  },
  {
    jobNumber: "JB-0017",
    jobDate: "2025-04-09",
    feedbackDate: "2025-04-10",
    mobile: "0112502127",
    customerName: "UNIVERSITY OF COLOMBO",
    rating: 5,
    review:
      "Absolutely fantastic! Quick, professional, and very thorough. Highly recommend.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0017",
    jobDate: "2025-04-11",
    feedbackDate: "2025-04-12",
    mobile: "0763803500",
    customerName: "KITHSEWANA",
    rating: 4,
    review: "Much better this time. Issue resolved efficiently. Thank you!",
    techCode: "3107",
    techName: "GAYAN ASIRI",
    type: "Service",
  },
  {
    jobNumber: "JB-0018",
    jobDate: "2025-04-13",
    feedbackDate: "2025-04-14",
    mobile: "0112695249",
    customerName: "SRI LANKA FOUNDATION",
    rating: 2,
    review:
      "Service took too long and parts had to be ordered again. Not a smooth experience.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0018",
    jobDate: "2025-04-15",
    feedbackDate: "2025-04-16",
    mobile: "0112576596",
    customerName: "BRITISH INSTITUTE OF ENGINEERING AND TECHNOLOGY (PVT) LTD",
    rating: 5,
    review:
      "Perfect! Very fast and the technician was very skilled. No complaints at all.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0019",
    jobDate: "2025-04-17",
    feedbackDate: "2025-04-18",
    mobile: "0112381798",
    customerName: "MINISTRY OF TOURISM & WILDLIFE DIVISION",
    rating: 4,
    review: "Good service as always. Reliable and professional team.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0019",
    jobDate: "2025-04-19",
    feedbackDate: "2025-04-20",
    mobile: "0112587328",
    customerName: "INSTITUTE OF WESTERN MUSIC & SPEECH",
    rating: 3,
    review:
      "Okay service. Machine is working but I expected a faster turnaround.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
  {
    jobNumber: "JB-0020",
    jobDate: "2025-04-21",
    feedbackDate: "2025-04-22",
    mobile: "0774075211",
    customerName: "KM / SWAMY VIPULANANDA VIDYALAYAM",
    rating: 5,
    review:
      "Excellent work. The technician was very dedicated and the machine works perfectly now.",
    techCode: "3167",
    techName: "NIRUSHAN",
    type: "Job",
  },
  {
    jobNumber: "SV-0020",
    jobDate: "2025-04-23",
    feedbackDate: "2025-04-24",
    mobile: "0112320252",
    customerName: "MINISTRY OF PORTS AND SHIPPING",
    rating: 4,
    review:
      "Good service. Very responsive team. Would call again for future issues.",
    techCode: "3157",
    techName: "DAKSHINA PRABATH",
    type: "Service",
  },
  {
    jobNumber: "JB-0021",
    jobDate: "2025-05-02",
    feedbackDate: "2025-05-03",
    mobile: "0112887021",
    customerName: "NATIONAL AUDIT OFFICE",
    rating: 5,
    review:
      "Wonderful service! The technician was extremely helpful and solved everything quickly.",
    techCode: "3168",
    techName: "VISHARA",
    type: "Job",
  },
  {
    jobNumber: "SV-0021",
    jobDate: "2025-05-05",
    feedbackDate: "2025-05-06",
    mobile: "0352222549",
    customerName: "REGIONAL DIRECTOR OF HEALTH SERVICES",
    rating: 2,
    review: "Below expectations. Had to wait a very long time. Not impressed.",
    techCode: "3177",
    techName: "RASITHA PERERA",
    type: "Service",
  },
  {
    jobNumber: "JB-0022",
    jobDate: "2025-05-08",
    feedbackDate: "2025-05-09",
    mobile: "0112695441",
    customerName: "BACK TO THE BIBLE BROADCAST",
    rating: 5,
    review:
      "The best service we have received. Very professional and courteous team.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Job",
  },
  {
    jobNumber: "SV-0022",
    jobDate: "2025-05-11",
    feedbackDate: "2025-05-12",
    mobile: "0212214777",
    customerName: "GURU PRINTERS",
    rating: 4,
    review:
      "Prompt service. Technician was well-equipped and resolved the issue on first visit.",
    techCode: "3154",
    techName: "ARUNRAJ JEYASINGH",
    type: "Service",
  },
  {
    jobNumber: "JB-0023",
    jobDate: "2025-05-14",
    feedbackDate: "2025-05-15",
    mobile: "0112757500",
    customerName: "STATE PRINTING CORPORATION",
    rating: 3,
    review: "The service was acceptable. Not the best but not bad either.",
    techCode: "8049",
    techName: "ISURU GISHANTHA",
    type: "Job",
  },
  {
    jobNumber: "SV-0023",
    jobDate: "2025-05-17",
    feedbackDate: "2025-05-18",
    mobile: "0779008471",
    customerName: "DAGONNA WIMALANANDA VIDHYALAYA",
    rating: 5,
    review:
      "Incredible service! Quick response and flawless repair. Very happy!",
    techCode: "8036",
    techName: "ASIRI SASANKA",
    type: "Service",
  },
  {
    jobNumber: "JB-0024",
    jobDate: "2025-05-20",
    feedbackDate: "2025-05-21",
    mobile: "0711073685",
    customerName: "WP/NG/NIWANDAMA JINARAJA PRIMARY SCHOOL",
    rating: 4,
    review:
      "Very polite technician. Issue resolved properly. Thank you very much.",
    techCode: "8058",
    techName: "SUPUN DILHARA",
    type: "Job",
  },
  {
    jobNumber: "SV-0024",
    jobDate: "2025-05-23",
    feedbackDate: "2025-05-24",
    mobile: "0112243054",
    customerName: "WP/NG G.B.SENANAYAKE MAHA VIDYALAYA",
    rating: 1,
    review:
      "Extremely poor. The technician damaged another part while servicing. Very unhappy with the entire experience.",
    techCode: "8058",
    techName: "SUPUN DILHARA",
    type: "Service",
  },
  {
    jobNumber: "JB-0025",
    jobDate: "2025-05-26",
    feedbackDate: "2025-05-27",
    mobile: "0763423446",
    customerName: "VEEKESY SLIPPERS LANKA (PVT)LTD",
    rating: 5,
    review:
      "Superb! Professional, fast, and very thorough. Machine working perfectly.",
    techCode: "8058",
    techName: "SUPUN DILHARA",
    type: "Job",
  },
  {
    jobNumber: "SV-0025",
    jobDate: "2025-05-29",
    feedbackDate: "2025-05-30",
    mobile: "0112186308",
    customerName: "CENTRAL CULTURAL FUND",
    rating: 4,
    review:
      "Consistently great service. The team is always dependable and professional.",
    techCode: "3152",
    techName: "DINESH SANJEEWA",
    type: "Service",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RATING_COLOR: Record<Rating, { bg: string; text: string; star: string }> =
  {
    5: { bg: "#dcfce7", text: "#15803d", star: "#22c55e" },
    4: { bg: "#dbeafe", text: "#1d4ed8", star: "#3b82f6" },
    3: { bg: "#fef9c3", text: "#a16207", star: "#eab308" },
    2: { bg: "#ffedd5", text: "#c2410c", star: "#f97316" },
    1: { bg: "#fee2e2", text: "#b91c1c", star: "#ef4444" },
  };

function Stars({ rating, size = 14 }: { rating: Rating; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {([1, 2, 3, 4, 5] as Rating[]).map((s) => (
        <span
          key={s}
          style={{
            fontSize: size,
            color: s <= rating ? RATING_COLOR[rating].star : "#e2e8f0",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function fmt(d: string) {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function toCSV(rows: Feedback[]): string {
  const h = [
    "Job Number",
    "Job Date",
    "Feedback Date",
    "Mobile",
    "Customer Name",
    "Rating",
    "Review",
    "Tech Code",
    "Tech Name",
    "Type",
  ];
  const data = rows.map((r) => [
    r.jobNumber,
    r.jobDate,
    r.feedbackDate,
    r.mobile,
    r.customerName,
    String(r.rating),
    r.review,
    r.techCode,
    r.techName,
    r.type,
  ]);
  return [h, ...data]
    .map((row) =>
      row.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(","),
    )
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

type DateMode = "day" | "month" | "range";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomerFeedbackReport() {
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [techFilter, setTechFilter] = useState<string>("ALL");
  const [dateMode, setDateMode] = useState<DateMode>("month");
  const [dayVal, setDayVal] = useState<string>("");
  const [monthVal, setMonthVal] = useState<string>("");
  const [rangeFrom, setRangeFrom] = useState<string>("");
  const [rangeTo, setRangeTo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 8;

  const techNames = useMemo(
    () => Array.from(new Set(DATA.map((d) => d.techName))).sort(),
    [],
  );

  const filtered = useMemo<Feedback[]>(() => {
    return DATA.filter((r) => {
      const rOk = ratingFilter === 0 || r.rating === ratingFilter;
      const tOk = typeFilter === "ALL" || r.type === typeFilter;
      const tnOk = techFilter === "ALL" || r.techName === techFilter;

      let dOk = true;
      if (dateMode === "day" && dayVal) dOk = r.feedbackDate === dayVal;
      if (dateMode === "month" && monthVal)
        dOk = r.feedbackDate.startsWith(monthVal);
      if (dateMode === "range")
        dOk =
          (!rangeFrom || r.feedbackDate >= rangeFrom) &&
          (!rangeTo || r.feedbackDate <= rangeTo);

      const q = search.toLowerCase();
      const sOk =
        !search ||
        r.customerName.toLowerCase().includes(q) ||
        r.jobNumber.toLowerCase().includes(q) ||
        r.techName.toLowerCase().includes(q) ||
        r.mobile.includes(q) ||
        r.review.toLowerCase().includes(q);

      return rOk && tOk && tnOk && dOk && sOk;
    });
  }, [
    ratingFilter,
    typeFilter,
    techFilter,
    dateMode,
    dayVal,
    monthVal,
    rangeFrom,
    rangeTo,
    search,
  ]);

  // Aggregate stats from filtered
  const stats = useMemo(() => {
    if (!filtered.length) return { avg: 0, dist: [0, 0, 0, 0, 0] };
    const avg = filtered.reduce((s, r) => s + r.rating, 0) / filtered.length;
    const dist = [5, 4, 3, 2, 1].map(
      (star) => filtered.filter((r) => r.rating === star).length,
    );
    return { avg, dist };
  }, [filtered]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pPages = useMemo<number[]>(() => {
    const total = Math.min(5, totalPages);
    let s =
      page <= 3
        ? 1
        : page >= totalPages - 2
          ? Math.max(1, totalPages - 4)
          : page - 2;
    return Array.from({ length: total }, (_, i) => s + i);
  }, [page, totalPages]);

  const clearDates = () => {
    setDayVal("");
    setMonthVal("");
    setRangeFrom("");
    setRangeTo("");
  };
  const reset = () => setPage(1);

  const btn = (
    active: boolean,
    onClick: () => void,
    children: React.ReactNode,
    style?: React.CSSProperties,
  ) => (
    <button
      onClick={() => {
        onClick();
        reset();
      }}
      style={{
        padding: "6px 14px",
        borderRadius: "18px",
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: "12px",
        transition: "all 0.15s",
        background: active ? "#0f172a" : "#f1f5f9",
        color: active ? "white" : "#475569",
        ...style,
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#0f172a 100%)",
          padding: "22px 28px 20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          {/* Title */}
          <div>
            <div
              style={{
                color: "#94a3b8",
                fontSize: "10px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "4px",
              }}
            >
              Customer Insights
            </div>
            <h1
              style={{
                color: "white",
                margin: "0 0 18px",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              Customer Feedback Report
            </h1>

            {/* Avg rating + bar chart */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "14px",
                  padding: "14px 20px",
                  minWidth: "140px",
                }}
              >
                <div
                  style={{
                    color: "#fbbf24",
                    fontSize: "36px",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {stats.avg > 0 ? stats.avg.toFixed(1) : "—"}
                </div>
                <Stars rating={Math.round(stats.avg) as Rating} size={16} />
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "11px",
                    marginTop: "4px",
                  }}
                >
                  {filtered.length} reviews
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {[5, 4, 3, 2, 1].map((star, si) => {
                  const count = stats.dist[si];
                  const pct = filtered.length
                    ? (count / filtered.length) * 100
                    : 0;
                  const col = RATING_COLOR[star as Rating];
                  return (
                    <div
                      key={star}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: col.star,
                          fontSize: "12px",
                          width: "14px",
                          textAlign: "right",
                          fontWeight: 700,
                        }}
                      >
                        {star}
                      </span>
                      <span style={{ color: col.star, fontSize: "12px" }}>
                        ★
                      </span>
                      <div
                        style={{
                          width: "100px",
                          height: "7px",
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: col.star,
                            borderRadius: "4px",
                            transition: "width 0.4s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: "11px",
                          width: "14px",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "8px", alignSelf: "center" }}>
                {[
                  {
                    label: "Service",
                    val: filtered.filter((r) => r.type === "Service").length,
                    col: "#7dd3fc",
                  },
                  {
                    label: "Job",
                    val: filtered.filter((r) => r.type === "Job").length,
                    col: "#86efac",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      padding: "10px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: s.col,
                        fontSize: "22px",
                        fontWeight: 800,
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        color: s.col,
                        fontSize: "11px",
                        opacity: 0.8,
                        fontWeight: 600,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download */}
          <button
            onClick={() =>
              dlCSV(toCSV(filtered), "Customer_Feedback_Report.csv")
            }
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "9px",
              padding: "11px 20px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(22,163,74,0.4)",
            }}
          >
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* ── Filter Panel ── */}
      <div
        style={{
          background: "white",
          padding: "14px 28px",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Rating */}
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Rating
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              {btn(ratingFilter === 0, () => setRatingFilter(0), "All")}
              {([5, 4, 3, 2, 1] as Rating[]).map((r) => {
                const c = RATING_COLOR[r];
                return btn(
                  ratingFilter === r,
                  () => setRatingFilter(ratingFilter === r ? 0 : r),
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span style={{ color: c.star }}>★</span>
                    {r}
                  </span>,
                  ratingFilter === r ? { background: c.bg, color: c.text } : {},
                );
              })}
            </div>
          </div>

          {/* Type */}
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Type
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              {["ALL", "Job", "Service"].map((v) =>
                btn(
                  typeFilter === v,
                  () => setTypeFilter(v),
                  v === "ALL" ? "All" : v,
                ),
              )}
            </div>
          </div>

          {/* Technician */}
          <div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Technician
            </div>
            <select
              value={techFilter}
              onChange={(e) => {
                setTechFilter(e.target.value);
                reset();
              }}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "7px 12px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#334155",
                outline: "none",
                background: "#f8fafc",
                cursor: "pointer",
              }}
            >
              <option value="ALL">All Technicians</option>
              {techNames.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginBottom: "6px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Date
              </div>
              {(["day", "month", "range"] as DateMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setDateMode(m);
                    clearDates();
                  }}
                  style={{
                    padding: "2px 9px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "10px",
                    fontWeight: 700,
                    background: dateMode === m ? "#6366f1" : "#e0e7ff",
                    color: dateMode === m ? "white" : "#4338ca",
                  }}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {dateMode === "day" && (
                <>
                  <input
                    type="date"
                    value={dayVal}
                    onChange={(e) => {
                      setDayVal(e.target.value);
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#334155",
                    }}
                  />
                  {dayVal && (
                    <button
                      onClick={() => {
                        setDayVal("");
                        reset();
                      }}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </>
              )}
              {dateMode === "month" && (
                <>
                  <input
                    type="month"
                    value={monthVal}
                    onChange={(e) => {
                      setMonthVal(e.target.value);
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#334155",
                    }}
                  />
                  {monthVal && (
                    <button
                      onClick={() => {
                        setMonthVal("");
                        reset();
                      }}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </>
              )}
              {dateMode === "range" && (
                <>
                  <input
                    type="date"
                    value={rangeFrom}
                    onChange={(e) => {
                      setRangeFrom(e.target.value);
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#334155",
                    }}
                  />
                  <span style={{ color: "#94a3b8", fontWeight: 700 }}>→</span>
                  <input
                    type="date"
                    value={rangeTo}
                    onChange={(e) => {
                      setRangeTo(e.target.value);
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#334155",
                    }}
                  />
                  {(rangeFrom || rangeTo) && (
                    <button
                      onClick={() => {
                        clearDates();
                        reset();
                      }}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Search */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              alignItems: "flex-end",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                  fontSize: "13px",
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              <input
                placeholder="Search customer, job, review…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  reset();
                }}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "8px 14px 8px 34px",
                  fontSize: "12px",
                  width: "240px",
                  outline: "none",
                  background: "#f8fafc",
                }}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    reset();
                  }}
                  style={{
                    position: "absolute",
                    right: "8px",
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
                background: "#0f172a",
                color: "white",
                padding: "4px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {filtered.length} results
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards ── */}
      <div style={{ padding: "18px 28px 0" }}>
        {pageData.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "60px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>💬</div>
            <div
              style={{ color: "#cbd5e1", fontSize: "15px", fontWeight: 600 }}
            >
              No feedback records match your filters.
            </div>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {pageData.map((r, i) => {
              const rc = RATING_COLOR[r.rating];
              const isService = r.type === "Service";
              return (
                <div
                  key={`${r.jobNumber}-${i}`}
                  style={{
                    background: "white",
                    borderRadius: "14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    display: "flex",
                    border: "1px solid #f1f5f9",
                    transition: "box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,0.10)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.06)")
                  }
                >
                  {/* Rating sidebar */}
                  <div
                    style={{
                      background: rc.bg,
                      width: "80px",
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px 8px",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: 900,
                        color: rc.text,
                        lineHeight: 1,
                      }}
                    >
                      {r.rating}
                    </span>
                    <Stars rating={r.rating} size={11} />
                    <span
                      style={{
                        fontSize: "9px",
                        color: rc.text,
                        fontWeight: 700,
                        opacity: 0.7,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginTop: "2px",
                      }}
                    >
                      Rating
                    </span>
                  </div>

                  {/* Main content */}
                  <div style={{ flex: 1, padding: "16px 20px", minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              color: "#0f172a",
                              fontSize: "15px",
                            }}
                          >
                            {r.customerName}
                          </span>
                          <span
                            style={{
                              background: isService ? "#dbeafe" : "#dcfce7",
                              color: isService ? "#1d4ed8" : "#15803d",
                              padding: "2px 9px",
                              borderRadius: "10px",
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          >
                            {r.type}
                          </span>
                        </div>
                        <span style={{ color: "#64748b", fontSize: "12px" }}>
                          {r.mobile}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#94a3b8",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Job Date
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#334155",
                              fontSize: "13px",
                            }}
                          >
                            {fmt(r.jobDate)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#94a3b8",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Feedback
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#334155",
                              fontSize: "13px",
                            }}
                          >
                            {fmt(r.feedbackDate)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review text */}
                    <div
                      style={{
                        background: "#f8fafc",
                        borderLeft: `3px solid ${rc.star}`,
                        borderRadius: "0 8px 8px 0",
                        padding: "10px 14px",
                        marginBottom: "12px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          color: "#334155",
                          lineHeight: 1.6,
                          fontStyle: "italic",
                        }}
                      >
                        "{r.review}"
                      </p>
                    </div>

                    {/* Footer row */}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          background: "#ede9fe",
                          color: "#5b21b6",
                          padding: "3px 10px",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        {r.jobNumber}
                      </span>
                      <span
                        style={{
                          background: "#f1f5f9",
                          color: "#475569",
                          padding: "3px 10px",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 600,
                        }}
                      >
                        👨‍🔧 {r.techName}
                        <span style={{ color: "#94a3b8", marginLeft: "5px" }}>
                          #{r.techCode}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div
          style={{
            padding: "16px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            of <strong style={{ color: "#0f172a" }}>{filtered.length}</strong>
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "7px 13px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: "white",
                cursor: page === 1 ? "not-allowed" : "pointer",
                color: page === 1 ? "#cbd5e1" : "#0f172a",
                fontWeight: 700,
              }}
            >
              ‹
            </button>
            {pPages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: "7px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  background: p === page ? "#0f172a" : "white",
                  color: p === page ? "white" : "#0f172a",
                  cursor: "pointer",
                  fontWeight: 700,
                  minWidth: "36px",
                }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: "7px 13px",
                borderRadius: "8px",
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

      <div style={{ height: "20px" }} />
    </div>
  );
}
