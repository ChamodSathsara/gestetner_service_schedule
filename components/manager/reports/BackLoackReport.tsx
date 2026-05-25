import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgreementStatus = "MA" | "FS" | "NS" | "EX";
type Team = "COL" | "OUT" | "SUB";

interface JobRecord {
  jobNumber: string;
  jobDate: string;
  serialNumber: string;
  machineNumber: string;
  modelNumber: string;
  techCode: string;
  technicianName: string;
  customerName: string;
  address1: string;
  address2: string;
  address3: string;
  mobile: string;
  agreementStatus: AgreementStatus;
  team: Team;
}

interface ServiceRecord {
  serviceNumber: string;
  expectedDate: string;
  serialNumber: string;
  visitNo: string;
  machineNumber: string;
  modelNumber: string;
  techCode: string;
  technicianName: string;
  customerName: string;
  address1: string;
  address2: string;
  address3: string;
  mobile: string;
  agreementStatus: AgreementStatus;
  team: Team;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const JOB_DATA: JobRecord[] = [
  {
    jobNumber: "JB-2025-0001",
    jobDate: "2025-01-04",
    serialNumber: "G617M750002",
    machineNumber: "Q12669",
    modelNumber: "MP 2014AD",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "CENTRAL CULTURAL FUND",
    address1: "2ND STAGE, 04TH FLOOR",
    address2: "SETHSIRIPAYA",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0002",
    jobDate: "2025-01-09",
    serialNumber: "G638M540058",
    machineNumber: "Q98978",
    modelNumber: "MP 2014D",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "MINISTRY OF HIGHER EDUCATION",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
    agreementStatus: "EX",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0003",
    jobDate: "2025-01-12",
    serialNumber: "E336M150121",
    machineNumber: "Q9712",
    modelNumber: "MP2501SP",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "EMBASSY OF FRANCE",
    address1: "NO: 89,",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112639401",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0004",
    jobDate: "2025-01-15",
    serialNumber: "G637M340107",
    machineNumber: "Q98580",
    modelNumber: "MP 2014D",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    customerName: "NATURAL RESOURCES MANAGEMENT CENTER",
    address1: "PERADENIYA",
    address2: "-",
    address3: "-",
    mobile: "0812388155",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0005",
    jobDate: "2025-01-18",
    serialNumber: "G635MB40903",
    machineNumber: "Q9617",
    modelNumber: "MP 2014D",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    customerName: "K / TALATUOYA T.M.V",
    address1: "TALATUOYA",
    address2: "-",
    address3: "-",
    mobile: "0812404264",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0006",
    jobDate: "2025-01-21",
    serialNumber: "D261Z704017",
    machineNumber: "Q19108",
    modelNumber: "DD3344",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "NATIONAL HOUSING DEVELOPMENT AUTHORITY",
    address1: "P.O.BOX.1826",
    address2: "NO.34, SRI CHITTAMPALAM A GARD",
    address3: "-",
    mobile: "0342222298",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0007",
    jobDate: "2025-01-24",
    serialNumber: "G634Z260230",
    machineNumber: "Q20202",
    modelNumber: "MP2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "RANGIRI DAMBULLA DEVELOPMENT FOUNDATION",
    address1: "GOLDEN TEMPLE",
    address2: "KANDY ROAD",
    address3: "DAMBULLA",
    mobile: "0716852449",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0008",
    jobDate: "2025-02-02",
    serialNumber: "E338MA50080",
    machineNumber: "Q14384",
    modelNumber: "MP2501SP",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0009",
    jobDate: "2025-02-05",
    serialNumber: "G631M240179",
    machineNumber: "Q18672",
    modelNumber: "MP 2014D",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "JUBILEE AGENCIES (PVT) LTD",
    address1: "NO: 104",
    address2: "3RD CROSS STREET",
    address3: "COLOMBO 11",
    mobile: "0112389745",
    agreementStatus: "NS",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0010",
    jobDate: "2025-02-08",
    serialNumber: "G638M840129",
    machineNumber: "Q14256",
    modelNumber: "MP 2014D",
    techCode: "3107",
    technicianName: "GAYAN ASIRI",
    customerName: "KITHSEWANA",
    address1: "PAHARIYA",
    address2: "ANURADHAPURA",
    address3: "-",
    mobile: "0763803500",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0011",
    jobDate: "2025-02-11",
    serialNumber: "G606MA50269",
    machineNumber: "Q11847",
    modelNumber: "MP 2014",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    customerName: "KM / SWAMY VIPULANANDA VIDYALAYAM",
    address1: "MANALCHENAI",
    address2: "KALMUNAI",
    address3: "-",
    mobile: "0774075211",
    agreementStatus: "FS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0012",
    jobDate: "2025-02-14",
    serialNumber: "G636M940128",
    machineNumber: "Q10719",
    modelNumber: "MP 2014D",
    techCode: "3135",
    technicianName: "A.KIRIYUTHAN",
    customerName: "SEED & PLANTING MATERIAL DEVELOPMENT CENTRE",
    address1: "DEPARTMENT OF AGRICULTURE",
    address2: "OLD GALAHA RD",
    address3: "PERADENIYA",
    mobile: "081-2388100",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0013",
    jobDate: "2025-02-18",
    serialNumber: "3081R220242",
    machineNumber: "Q18564",
    modelNumber: "IMC2000",
    techCode: "3136",
    technicianName: "MALITH SAMEERA",
    customerName: "WAYAMBA CO-OPERATIVE RURAL BANK",
    address1: "NO-107",
    address2: "DAMBULLA ROAD",
    address3: "KURUNEGALA",
    mobile: "0372226191",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0014",
    jobDate: "2025-02-21",
    serialNumber: "E337M250055",
    machineNumber: "Q12009",
    modelNumber: "MP2501SP",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    customerName: "MINISTRY OF PORTS AND SHIPPING",
    address1: "NO. 19",
    address2: "CHAITHYA ROAD",
    address3: "COLOMBO 01",
    mobile: "0112320252",
    agreementStatus: "FS",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0015",
    jobDate: "2025-02-25",
    serialNumber: "G634ZA60170",
    machineNumber: "Q20454",
    modelNumber: "MP 2014D",
    techCode: "3129",
    technicianName: "J.S.RUSHANTH",
    customerName: "BT/BW/KARAIYAKKANTHIVU GANESHER VIDYALAYA",
    address1: "KANNANKUDAH",
    address2: "-",
    address3: "-",
    mobile: "0778267702",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0016",
    jobDate: "2025-03-01",
    serialNumber: "D218Z500015",
    machineNumber: "Q14826",
    modelNumber: "DX2430",
    techCode: "3123",
    technicianName: "SOBAN N.",
    customerName: "PRIMA (CEYLON) LTD",
    address1: "NO:50, SRI JAYAWARDHANAPURA",
    address2: "PARLIAMENT ROAD",
    address3: "RAJAGIRIYA",
    mobile: "0262233202",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0017",
    jobDate: "2025-03-04",
    serialNumber: "G633ZC60343",
    machineNumber: "Q19762",
    modelNumber: "MP2014D",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "ST ANTHONY'S T.M.V",
    address1: "COLOMBO 14",
    address2: "MAHAWATHTHA ROAD",
    address3: "COLOMBO 14",
    mobile: "-",
    agreementStatus: "NS",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0018",
    jobDate: "2025-03-07",
    serialNumber: "E337M850358",
    machineNumber: "Q12904",
    modelNumber: "MP2501SP",
    techCode: "8028",
    technicianName: "DAMITH SANJAYA",
    customerName: "COLOMBO MUNICIPAL COUNCIL",
    address1: "PUBLIC HEALTH DEPARTMENT",
    address2: "TOWN HALL DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0705052729",
    agreementStatus: "FS",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0019",
    jobDate: "2025-03-10",
    serialNumber: "G630MC40193",
    machineNumber: "Q17761",
    modelNumber: "MP 2014D",
    techCode: "3191",
    technicianName: "PRADEEP SAMPATH",
    customerName: "MR.P.B.I.A.K.DAYASIRI",
    address1: "NO:197",
    address2: "RATHNAPURA ROAD",
    address3: "RILHENA, PELMADULLA",
    mobile: "0718738854",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0020",
    jobDate: "2025-03-13",
    serialNumber: "G634ZB60314",
    machineNumber: "Q20470",
    modelNumber: "MP 2014D",
    techCode: "3184",
    technicianName: "DARSHANA RUKSHAN",
    customerName: "MR.RANGA DILEEPA",
    address1: "COOP MEEGOLLEWA",
    address2: "TRACK 09",
    address3: "MEDIRIGIRIYA",
    mobile: "0740471036",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0021",
    jobDate: "2025-03-16",
    serialNumber: "G634Z960056",
    machineNumber: "Q20307",
    modelNumber: "MP 2014D",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    customerName: "NATIONAL PEOPLE'S POWER OFFICE",
    address1: "URUMPIRAI ROAD",
    address2: "KOPAY JUNCTION",
    address3: "KOPAY",
    mobile: "0777539863",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0022",
    jobDate: "2025-04-01",
    serialNumber: "E338MA50087",
    machineNumber: "Q14380",
    modelNumber: "MP2501SP",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0023",
    jobDate: "2025-04-04",
    serialNumber: "G618M750148",
    machineNumber: "Q13897",
    modelNumber: "MP 2014AD",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "MINISTRY OF POWER & RENEWABLE ENERGY",
    address1: "NO: 72",
    address2: "NANDA KUMARASWAMY MW",
    address3: "COLOMBO 07",
    mobile: "0778881546",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0024",
    jobDate: "2025-04-07",
    serialNumber: "D261Z704083",
    machineNumber: "Q18311",
    modelNumber: "DD3344",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "CRIMINAL RECORDS DIVISION",
    address1: "NO.40 MEDLAND PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0718015517",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0025",
    jobDate: "2025-04-10",
    serialNumber: "G600M950039",
    machineNumber: "Q17955",
    modelNumber: "MP 2014",
    techCode: "3177",
    technicianName: "RASITHA PERERA",
    customerName: "REGIONAL DIRECTOR OF HEALTH SERVICES",
    address1: "KEGALLE",
    address2: "-",
    address3: "-",
    mobile: "0352222549",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0026",
    jobDate: "2025-04-14",
    serialNumber: "G630MA40053",
    machineNumber: "Q17676",
    modelNumber: "MP 2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "RITZ CLOTHING YAPAHUWA (PVT)LTD",
    address1: "ANURADHAPURA ROAD",
    address2: "UDUWERIYA",
    address3: "YAPAHUWWA",
    mobile: "0768033370",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0027",
    jobDate: "2025-04-17",
    serialNumber: "D217Z300820",
    machineNumber: "Q12006",
    modelNumber: "DX2430",
    techCode: "3188",
    technicianName: "DULANJA NIROSHAN",
    customerName: "ST.BENEDICT COLLEGE",
    address1: "KANJUKKULIYA",
    address2: "CHILAW",
    address3: "-",
    mobile: "0322220555",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0028",
    jobDate: "2025-04-20",
    serialNumber: "3281M730750",
    machineNumber: "Q19175",
    modelNumber: "M2701",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    customerName: "SRI LANKA SOCIAL SECURITY BOARD",
    address1: "NO.18, RAJAGIRIYA ROAD",
    address2: "RAJAGIRIYA",
    address3: "-",
    mobile: "0112886584",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0029",
    jobDate: "2025-05-03",
    serialNumber: "G618MB50081",
    machineNumber: "Q14571",
    modelNumber: "MP 2014AD",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    customerName: "DAGONNA WIMALANANDA VIDHYALAYA",
    address1: "MINUWANGODA",
    address2: "-",
    address3: "-",
    mobile: "0779008471",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0030",
    jobDate: "2025-05-06",
    serialNumber: "G611M650004",
    machineNumber: "Q19149",
    modelNumber: "MP2014AD",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    customerName: "NAVODYA SUPER",
    address1: "1F1 KANDANA ROAD",
    address2: "BOLLATHA",
    address3: "GANEMULLA",
    mobile: "-",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0031",
    jobDate: "2025-05-10",
    serialNumber: "G639M640008",
    machineNumber: "Q16241",
    modelNumber: "MP 2014D",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "DEPARTMENT OF AGRICULTURE ENGINEERING",
    address1: "DIVISION, BEE KEEPING UNIT",
    address2: "BINDUNUWEWA",
    address3: "BANDARAWELA",
    mobile: "081-2388268",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0032",
    jobDate: "2025-05-14",
    serialNumber: "G637M340063",
    machineNumber: "Q11721",
    modelNumber: "MP 2014D",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    customerName: "KM / ST / NAMAGAL VIDYALAYA",
    address1: "UNIT 07, NAVITHANVELY",
    address2: "-",
    address3: "-",
    mobile: "0767225255",
    agreementStatus: "FS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0033",
    jobDate: "2025-05-18",
    serialNumber: "E338MA50108",
    machineNumber: "Q14379",
    modelNumber: "MP2501SP",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0034",
    jobDate: "2025-06-02",
    serialNumber: "3289MC30182",
    machineNumber: "Q16855",
    modelNumber: "M2701",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "POLICE SUPPLIES DIVISION",
    address1: "POLICE HEADQUARTERS",
    address2: "2ND FLOOR",
    address3: "COLOMBO 01",
    mobile: "0112421111",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0035",
    jobDate: "2025-06-05",
    serialNumber: "D212Z900685",
    machineNumber: "Q5082",
    modelNumber: "DX2430",
    techCode: "4050",
    technicianName: "THILINA LAKSHAN",
    customerName: "KELANIYA ZONAL EDUCATION OFFICE",
    address1: "MAKOLA",
    address2: "-",
    address3: "-",
    mobile: "0112962025",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0036",
    jobDate: "2025-06-09",
    serialNumber: "G634ZA60022",
    machineNumber: "Q20490",
    modelNumber: "MP 2014D",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    customerName: "JAYA FREIGHT SOLUTIONS (PVT)LTD",
    address1: "NO.401",
    address2: "ROBERT GUNAWARDANA",
    address3: "BATTARAMULLA",
    mobile: "-",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0037",
    jobDate: "2025-06-12",
    serialNumber: "G619M750025",
    machineNumber: "Q21144",
    modelNumber: "MP 2014AD",
    techCode: "3137",
    technicianName: "KAVINDA LIYANAGE",
    customerName: "VIN OCEAN SHIPPING LTD",
    address1: "NO.267/15, GALLE ROAD",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "0112301476",
    agreementStatus: "NS",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0038",
    jobDate: "2025-06-16",
    serialNumber: "E344MA51296",
    machineNumber: "Q7667",
    modelNumber: "MP2001L",
    techCode: "8029",
    technicianName: "RASIKA LAKMAL",
    customerName: "DIVISIONAL SECRETARIAT",
    address1: "HORANA",
    address2: "-",
    address3: "-",
    mobile: "0343347478",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0039",
    jobDate: "2025-07-01",
    serialNumber: "G633ZA60055",
    machineNumber: "Q19625",
    modelNumber: "MP2014D",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    customerName: "NEHAN ADS PRINTING & BOOKSHOP",
    address1: "295/2 ASGIRIYA",
    address2: "GAMPAHA",
    address3: "-",
    mobile: "-",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0040",
    jobDate: "2025-07-05",
    serialNumber: "G618M950133",
    machineNumber: "Q14539",
    modelNumber: "MP 2014AD",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    customerName: "WP/NG/NIWANDAMA JINARAJA PRIMARY SCHOOL",
    address1: "NIWANDAMA",
    address2: "JA ELA",
    address3: "-",
    mobile: "0711073685",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0041",
    jobDate: "2025-07-09",
    serialNumber: "3081R121697",
    machineNumber: "Q18166",
    modelNumber: "IMC2000",
    techCode: "3185",
    technicianName: "THARINDU THATHSARA",
    customerName: "LANWA SANSTHA CEMENT CORPORATION PRIVATE LIMITED",
    address1: "NO:25 ALFRED PLACE",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "-",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0042",
    jobDate: "2025-07-14",
    serialNumber: "G617M750016",
    machineNumber: "Q12289",
    modelNumber: "MP 2014AD",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "SPECIAL TASK FORCE",
    address1: "NO:223",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "2-500 471",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    jobNumber: "JB-2025-0043",
    jobDate: "2025-08-03",
    serialNumber: "G633Z660035",
    machineNumber: "Q19448",
    modelNumber: "MP 2014D",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "BACK TO THE BIBLE BROADCAST",
    address1: "NO:120 A",
    address2: "DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112695441",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    jobNumber: "JB-2025-0044",
    jobDate: "2025-08-07",
    serialNumber: "C317R346023",
    machineNumber: "Q21091",
    modelNumber: "MP3555",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    customerName: "GURU PRINTERS",
    address1: "KONDAVIL",
    address2: "IRUPALAI JUNCTION",
    address3: "KOPAY",
    mobile: "0212214777",
    agreementStatus: "EX",
    team: "OUT",
  },
  {
    jobNumber: "JB-2025-0045",
    jobDate: "2025-08-11",
    serialNumber: "L6916350130",
    machineNumber: "Q3877",
    modelNumber: "MP1600",
    techCode: "8049",
    technicianName: "ISURU GISHANTHA",
    customerName: "STATE PRINTING CORPORATION",
    address1: "PANALUWA",
    address2: "PADUKKA",
    address3: "-",
    mobile: "0112757500",
    agreementStatus: "NS",
    team: "SUB",
  },
];

const SERVICE_DATA: ServiceRecord[] = [
  {
    serviceNumber: "SV-2025-0001",
    expectedDate: "2025-01-06",
    serialNumber: "G617M750002",
    visitNo: "V001",
    machineNumber: "Q12669",
    modelNumber: "MP 2014AD",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "CENTRAL CULTURAL FUND",
    address1: "2ND STAGE, 04TH FLOOR",
    address2: "SETHSIRIPAYA",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0002",
    expectedDate: "2025-01-10",
    serialNumber: "E336M150121",
    visitNo: "V002",
    machineNumber: "Q9712",
    modelNumber: "MP2501SP",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "EMBASSY OF FRANCE",
    address1: "NO: 89",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112639401",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0003",
    expectedDate: "2025-01-13",
    serialNumber: "G638M540065",
    visitNo: "V003",
    machineNumber: "Q98979",
    modelNumber: "MP 2014D",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "MINISTRY OF HIGHER EDUCATION",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
    agreementStatus: "EX",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0004",
    expectedDate: "2025-01-16",
    serialNumber: "G637M340107",
    visitNo: "V004",
    machineNumber: "Q98580",
    modelNumber: "MP 2014D",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    customerName: "NATURAL RESOURCES MANAGEMENT CENTER",
    address1: "PERADENIYA",
    address2: "-",
    address3: "-",
    mobile: "0812388155",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0005",
    expectedDate: "2025-01-19",
    serialNumber: "D261Z704017",
    visitNo: "V005",
    machineNumber: "Q19108",
    modelNumber: "DD3344",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "NATIONAL HOUSING DEVELOPMENT AUTHORITY",
    address1: "P.O.BOX.1826",
    address2: "NO.34, SRI CHITTAMPALAM A GARD",
    address3: "-",
    mobile: "0342222298",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0006",
    expectedDate: "2025-01-22",
    serialNumber: "G634Z260230",
    visitNo: "V006",
    machineNumber: "Q20202",
    modelNumber: "MP2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "RANGIRI DAMBULLA DEVELOPMENT FOUNDATION",
    address1: "GOLDEN TEMPLE",
    address2: "KANDY ROAD",
    address3: "DAMBULLA",
    mobile: "0716852449",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0007",
    expectedDate: "2025-01-25",
    serialNumber: "E338MA50080",
    visitNo: "V007",
    machineNumber: "Q14384",
    modelNumber: "MP2501SP",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0008",
    expectedDate: "2025-02-03",
    serialNumber: "G631M240179",
    visitNo: "V008",
    machineNumber: "Q18672",
    modelNumber: "MP 2014D",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "JUBILEE AGENCIES (PVT) LTD",
    address1: "NO: 104",
    address2: "3RD CROSS STREET",
    address3: "COLOMBO 11",
    mobile: "0112389745",
    agreementStatus: "NS",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0009",
    expectedDate: "2025-02-06",
    serialNumber: "G638M840129",
    visitNo: "V009",
    machineNumber: "Q14256",
    modelNumber: "MP 2014D",
    techCode: "3107",
    technicianName: "GAYAN ASIRI",
    customerName: "KITHSEWANA",
    address1: "PAHARIYA",
    address2: "ANURADHAPURA",
    address3: "-",
    mobile: "0763803500",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0010",
    expectedDate: "2025-02-10",
    serialNumber: "G606MA50269",
    visitNo: "V010",
    machineNumber: "Q11847",
    modelNumber: "MP 2014",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    customerName: "KM / SWAMY VIPULANANDA VIDYALAYAM",
    address1: "MANALCHENAI",
    address2: "KALMUNAI",
    address3: "-",
    mobile: "0774075211",
    agreementStatus: "FS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0011",
    expectedDate: "2025-02-13",
    serialNumber: "G636M940128",
    visitNo: "V011",
    machineNumber: "Q10719",
    modelNumber: "MP 2014D",
    techCode: "3135",
    technicianName: "A.KIRIYUTHAN",
    customerName: "SEED & PLANTING MATERIAL DEVELOPMENT CENTRE",
    address1: "DEPARTMENT OF AGRICULTURE",
    address2: "OLD GALAHA RD",
    address3: "PERADENIYA",
    mobile: "081-2388100",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0012",
    expectedDate: "2025-02-17",
    serialNumber: "3081R220242",
    visitNo: "V012",
    machineNumber: "Q18564",
    modelNumber: "IMC2000",
    techCode: "3136",
    technicianName: "MALITH SAMEERA",
    customerName: "WAYAMBA CO-OPERATIVE RURAL BANK",
    address1: "NO-107",
    address2: "DAMBULLA ROAD",
    address3: "KURUNEGALA",
    mobile: "0372226191",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0013",
    expectedDate: "2025-02-20",
    serialNumber: "E337M250055",
    visitNo: "V013",
    machineNumber: "Q12009",
    modelNumber: "MP2501SP",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    customerName: "MINISTRY OF PORTS AND SHIPPING",
    address1: "NO. 19",
    address2: "CHAITHYA ROAD",
    address3: "COLOMBO 01",
    mobile: "0112320252",
    agreementStatus: "FS",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0014",
    expectedDate: "2025-02-23",
    serialNumber: "G634ZA60170",
    visitNo: "V014",
    machineNumber: "Q20454",
    modelNumber: "MP 2014D",
    techCode: "3129",
    technicianName: "J.S.RUSHANTH",
    customerName: "BT/BW/KARAIYAKKANTHIVU GANESHER VIDYALAYA",
    address1: "KANNANKUDAH",
    address2: "-",
    address3: "-",
    mobile: "0778267702",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0015",
    expectedDate: "2025-02-27",
    serialNumber: "D218Z500015",
    visitNo: "V015",
    machineNumber: "Q14826",
    modelNumber: "DX2430",
    techCode: "3123",
    technicianName: "SOBAN N.",
    customerName: "PRIMA (CEYLON) LTD",
    address1: "NO:50, SRI JAYAWARDHANAPURA",
    address2: "PARLIAMENT ROAD",
    address3: "RAJAGIRIYA",
    mobile: "0262233202",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0016",
    expectedDate: "2025-03-02",
    serialNumber: "G633ZC60343",
    visitNo: "V016",
    machineNumber: "Q19762",
    modelNumber: "MP2014D",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "ST ANTHONY'S T.M.V",
    address1: "COLOMBO 14",
    address2: "MAHAWATHTHA ROAD",
    address3: "COLOMBO 14",
    mobile: "-",
    agreementStatus: "NS",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0017",
    expectedDate: "2025-03-06",
    serialNumber: "E337M850358",
    visitNo: "V017",
    machineNumber: "Q12904",
    modelNumber: "MP2501SP",
    techCode: "8028",
    technicianName: "DAMITH SANJAYA",
    customerName: "COLOMBO MUNICIPAL COUNCIL",
    address1: "PUBLIC HEALTH DEPARTMENT",
    address2: "TOWN HALL DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0705052729",
    agreementStatus: "FS",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0018",
    expectedDate: "2025-03-09",
    serialNumber: "G630MC40193",
    visitNo: "V018",
    machineNumber: "Q17761",
    modelNumber: "MP 2014D",
    techCode: "3191",
    technicianName: "PRADEEP SAMPATH",
    customerName: "MR.P.B.I.A.K.DAYASIRI",
    address1: "NO:197",
    address2: "RATHNAPURA ROAD",
    address3: "RILHENA, PELMADULLA",
    mobile: "0718738854",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0019",
    expectedDate: "2025-03-12",
    serialNumber: "G634ZB60314",
    visitNo: "V019",
    machineNumber: "Q20470",
    modelNumber: "MP 2014D",
    techCode: "3184",
    technicianName: "DARSHANA RUKSHAN",
    customerName: "MR.RANGA DILEEPA",
    address1: "COOP MEEGOLLEWA",
    address2: "TRACK 09",
    address3: "MEDIRIGIRIYA",
    mobile: "0740471036",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0020",
    expectedDate: "2025-03-16",
    serialNumber: "G634Z960056",
    visitNo: "V020",
    machineNumber: "Q20307",
    modelNumber: "MP 2014D",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    customerName: "NATIONAL PEOPLE'S POWER OFFICE",
    address1: "URUMPIRAI ROAD",
    address2: "KOPAY JUNCTION",
    address3: "KOPAY",
    mobile: "0777539863",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0021",
    expectedDate: "2025-03-19",
    serialNumber: "E338MA50087",
    visitNo: "V021",
    machineNumber: "Q14380",
    modelNumber: "MP2501SP",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0022",
    expectedDate: "2025-04-02",
    serialNumber: "G618M750148",
    visitNo: "V022",
    machineNumber: "Q13897",
    modelNumber: "MP 2014AD",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "MINISTRY OF POWER & RENEWABLE ENERGY",
    address1: "NO: 72",
    address2: "NANDA KUMARASWAMY MW",
    address3: "COLOMBO 07",
    mobile: "0778881546",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0023",
    expectedDate: "2025-04-05",
    serialNumber: "D261Z704083",
    visitNo: "V023",
    machineNumber: "Q18311",
    modelNumber: "DD3344",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "CRIMINAL RECORDS DIVISION",
    address1: "NO.40 MEDLAND PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0718015517",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0024",
    expectedDate: "2025-04-08",
    serialNumber: "G600M950039",
    visitNo: "V024",
    machineNumber: "Q17955",
    modelNumber: "MP 2014",
    techCode: "3177",
    technicianName: "RASITHA PERERA",
    customerName: "REGIONAL DIRECTOR OF HEALTH SERVICES",
    address1: "KEGALLE",
    address2: "-",
    address3: "-",
    mobile: "0352222549",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0025",
    expectedDate: "2025-04-12",
    serialNumber: "G630MA40053",
    visitNo: "V025",
    machineNumber: "Q17676",
    modelNumber: "MP 2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "RITZ CLOTHING YAPAHUWA (PVT)LTD",
    address1: "ANURADHAPURA ROAD",
    address2: "UDUWERIYA",
    address3: "YAPAHUWWA",
    mobile: "0768033370",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0026",
    expectedDate: "2025-04-15",
    serialNumber: "D217Z300820",
    visitNo: "V026",
    machineNumber: "Q12006",
    modelNumber: "DX2430",
    techCode: "3188",
    technicianName: "DULANJA NIROSHAN",
    customerName: "ST.BENEDICT COLLEGE",
    address1: "KANJUKKULIYA",
    address2: "CHILAW",
    address3: "-",
    mobile: "0322220555",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0027",
    expectedDate: "2025-04-18",
    serialNumber: "3281M730750",
    visitNo: "V027",
    machineNumber: "Q19175",
    modelNumber: "M2701",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    customerName: "SRI LANKA SOCIAL SECURITY BOARD",
    address1: "NO.18, RAJAGIRIYA ROAD",
    address2: "RAJAGIRIYA",
    address3: "-",
    mobile: "0112886584",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0028",
    expectedDate: "2025-05-02",
    serialNumber: "G618MB50081",
    visitNo: "V028",
    machineNumber: "Q14571",
    modelNumber: "MP 2014AD",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    customerName: "DAGONNA WIMALANANDA VIDHYALAYA",
    address1: "MINUWANGODA",
    address2: "-",
    address3: "-",
    mobile: "0779008471",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0029",
    expectedDate: "2025-05-05",
    serialNumber: "G611M650004",
    visitNo: "V029",
    machineNumber: "Q19149",
    modelNumber: "MP2014AD",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    customerName: "NAVODYA SUPER",
    address1: "1F1 KANDANA ROAD",
    address2: "BOLLATHA",
    address3: "GANEMULLA",
    mobile: "-",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0030",
    expectedDate: "2025-05-09",
    serialNumber: "G639M640008",
    visitNo: "V030",
    machineNumber: "Q16241",
    modelNumber: "MP 2014D",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "DEPARTMENT OF AGRICULTURE ENGINEERING",
    address1: "DIVISION, BEE KEEPING UNIT",
    address2: "BINDUNUWEWA",
    address3: "BANDARAWELA",
    mobile: "081-2388268",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0031",
    expectedDate: "2025-05-13",
    serialNumber: "G637M340063",
    visitNo: "V031",
    machineNumber: "Q11721",
    modelNumber: "MP 2014D",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    customerName: "KM / ST / NAMAGAL VIDYALAYA",
    address1: "UNIT 07, NAVITHANVELY",
    address2: "-",
    address3: "-",
    mobile: "0767225255",
    agreementStatus: "FS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0032",
    expectedDate: "2025-05-17",
    serialNumber: "E338MA50108",
    visitNo: "V032",
    machineNumber: "Q14379",
    modelNumber: "MP2501SP",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0033",
    expectedDate: "2025-06-01",
    serialNumber: "3289MC30182",
    visitNo: "V033",
    machineNumber: "Q16855",
    modelNumber: "M2701",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "POLICE SUPPLIES DIVISION",
    address1: "POLICE HEADQUARTERS",
    address2: "2ND FLOOR",
    address3: "COLOMBO 01",
    mobile: "0112421111",
    agreementStatus: "NS",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0034",
    expectedDate: "2025-06-04",
    serialNumber: "D212Z900685",
    visitNo: "V034",
    machineNumber: "Q5082",
    modelNumber: "DX2430",
    techCode: "4050",
    technicianName: "THILINA LAKSHAN",
    customerName: "KELANIYA ZONAL EDUCATION OFFICE",
    address1: "MAKOLA",
    address2: "-",
    address3: "-",
    mobile: "0112962025",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0035",
    expectedDate: "2025-06-08",
    serialNumber: "G634ZA60022",
    visitNo: "V035",
    machineNumber: "Q20490",
    modelNumber: "MP 2014D",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    customerName: "JAYA FREIGHT SOLUTIONS (PVT)LTD",
    address1: "NO.401",
    address2: "ROBERT GUNAWARDANA",
    address3: "BATTARAMULLA",
    mobile: "-",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0036",
    expectedDate: "2025-06-11",
    serialNumber: "G619M750025",
    visitNo: "V036",
    machineNumber: "Q21144",
    modelNumber: "MP 2014AD",
    techCode: "3137",
    technicianName: "KAVINDA LIYANAGE",
    customerName: "VIN OCEAN SHIPPING LTD",
    address1: "NO.267/15, GALLE ROAD",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "0112301476",
    agreementStatus: "NS",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0037",
    expectedDate: "2025-06-15",
    serialNumber: "E344MA51296",
    visitNo: "V037",
    machineNumber: "Q7667",
    modelNumber: "MP2001L",
    techCode: "8029",
    technicianName: "RASIKA LAKMAL",
    customerName: "DIVISIONAL SECRETARIAT",
    address1: "HORANA",
    address2: "-",
    address3: "-",
    mobile: "0343347478",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0038",
    expectedDate: "2025-07-02",
    serialNumber: "G633ZA60055",
    visitNo: "V038",
    machineNumber: "Q19625",
    modelNumber: "MP2014D",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    customerName: "NEHAN ADS PRINTING & BOOKSHOP",
    address1: "295/2 ASGIRIYA",
    address2: "GAMPAHA",
    address3: "-",
    mobile: "-",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0039",
    expectedDate: "2025-07-06",
    serialNumber: "G618M950133",
    visitNo: "V039",
    machineNumber: "Q14539",
    modelNumber: "MP 2014AD",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    customerName: "WP/NG/NIWANDAMA JINARAJA PRIMARY SCHOOL",
    address1: "NIWANDAMA",
    address2: "JA ELA",
    address3: "-",
    mobile: "0711073685",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0040",
    expectedDate: "2025-07-10",
    serialNumber: "3081R121697",
    visitNo: "V040",
    machineNumber: "Q18166",
    modelNumber: "IMC2000",
    techCode: "3185",
    technicianName: "THARINDU THATHSARA",
    customerName: "LANWA SANSTHA CEMENT CORPORATION PRIVATE LIMITED",
    address1: "NO:25 ALFRED PLACE",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "-",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0041",
    expectedDate: "2025-07-15",
    serialNumber: "G617M750016",
    visitNo: "V041",
    machineNumber: "Q12289",
    modelNumber: "MP 2014AD",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "SPECIAL TASK FORCE",
    address1: "NO:223",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "2-500 471",
    agreementStatus: "MA",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0042",
    expectedDate: "2025-08-01",
    serialNumber: "G633Z660035",
    visitNo: "V042",
    machineNumber: "Q19448",
    modelNumber: "MP 2014D",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "BACK TO THE BIBLE BROADCAST",
    address1: "NO:120 A",
    address2: "DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112695441",
    agreementStatus: "MA",
    team: "COL",
  },
  {
    serviceNumber: "SV-2025-0043",
    expectedDate: "2025-08-05",
    serialNumber: "C317R346023",
    visitNo: "V043",
    machineNumber: "Q21091",
    modelNumber: "MP3555",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    customerName: "GURU PRINTERS",
    address1: "KONDAVIL",
    address2: "IRUPALAI JUNCTION",
    address3: "KOPAY",
    mobile: "0212214777",
    agreementStatus: "EX",
    team: "OUT",
  },
  {
    serviceNumber: "SV-2025-0044",
    expectedDate: "2025-08-09",
    serialNumber: "L6916350130",
    visitNo: "V044",
    machineNumber: "Q3877",
    modelNumber: "MP1600",
    techCode: "8049",
    technicianName: "ISURU GISHANTHA",
    customerName: "STATE PRINTING CORPORATION",
    address1: "PANALUWA",
    address2: "PADUKKA",
    address3: "-",
    mobile: "0112757500",
    agreementStatus: "NS",
    team: "SUB",
  },
  {
    serviceNumber: "SV-2025-0045",
    expectedDate: "2025-08-13",
    serialNumber: "G633Z960094",
    visitNo: "V045",
    machineNumber: "Q19590",
    modelNumber: "MP2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "D.M.GUNATHILAKA",
    address1: "NANNERIYA",
    address2: "NAWAGATHEGAMA",
    address3: "-",
    mobile: "-",
    agreementStatus: "NS",
    team: "OUT",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

const AGREE_STYLE: Record<AgreementStatus, React.CSSProperties> = {
  MA: { background: "#c6f6d5", color: "#22543d" },
  FS: { background: "#bee3f8", color: "#2a4365" },
  NS: { background: "#e2e8f0", color: "#2d3748" },
  EX: { background: "#fed7d7", color: "#742a2a" },
};

const TEAM_STYLE: Record<Team, React.CSSProperties> = {
  COL: { background: "#ebf8ff", color: "#2b6cb0" },
  OUT: { background: "#f0fff4", color: "#276749" },
  SUB: { background: "#fef3c7", color: "#92400e" },
};

function toCSV(headers: string[], rows: string[][]): string {
  return [headers, ...rows]
    .map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Component ────────────────────────────────────────────────────────────────

type TabType = "jobs" | "services";

export default function BackLogReport() {
  const [tab, setTab] = useState<TabType>("jobs");
  const [teamFilter, setTeamFilter] = useState<string>("ALL");
  const [monthFilter, setMonthFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 15;

  // Reset page on any filter change
  const resetPage = () => setPage(1);

  const filteredJobs = useMemo<JobRecord[]>(() => {
    return JOB_DATA.filter((r) => {
      const teamOk = teamFilter === "ALL" || r.team === teamFilter;
      const monthOk = !monthFilter || r.jobDate.startsWith(monthFilter);
      const searchOk =
        !search ||
        r.customerName.toLowerCase().includes(search.toLowerCase()) ||
        r.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.machineNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.technicianName.toLowerCase().includes(search.toLowerCase());
      return teamOk && monthOk && searchOk;
    });
  }, [teamFilter, monthFilter, search]);

  const filteredServices = useMemo<ServiceRecord[]>(() => {
    return SERVICE_DATA.filter((r) => {
      const teamOk = teamFilter === "ALL" || r.team === teamFilter;
      const monthOk = !monthFilter || r.expectedDate.startsWith(monthFilter);
      const searchOk =
        !search ||
        r.customerName.toLowerCase().includes(search.toLowerCase()) ||
        r.serviceNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.machineNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.technicianName.toLowerCase().includes(search.toLowerCase());
      return teamOk && monthOk && searchOk;
    });
  }, [teamFilter, monthFilter, search]);

  const activeData = tab === "jobs" ? filteredJobs : filteredServices;
  const totalPages = Math.ceil(activeData.length / PAGE_SIZE);
  const pageData = activeData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Summary counts
  const jobSummary = useMemo(
    () => ({
      total: filteredJobs.length,
      MA: filteredJobs.filter((r) => r.agreementStatus === "MA").length,
      FS: filteredJobs.filter((r) => r.agreementStatus === "FS").length,
      NS: filteredJobs.filter((r) => r.agreementStatus === "NS").length,
      EX: filteredJobs.filter((r) => r.agreementStatus === "EX").length,
    }),
    [filteredJobs],
  );

  const svcSummary = useMemo(
    () => ({
      total: filteredServices.length,
      MA: filteredServices.filter((r) => r.agreementStatus === "MA").length,
      FS: filteredServices.filter((r) => r.agreementStatus === "FS").length,
      NS: filteredServices.filter((r) => r.agreementStatus === "NS").length,
      EX: filteredServices.filter((r) => r.agreementStatus === "EX").length,
    }),
    [filteredServices],
  );

  const handleDownload = (type: "jobs" | "services") => {
    if (type === "jobs") {
      const headers = [
        "Job Number",
        "Job Date",
        "Serial Number",
        "Machine No (Q.No)",
        "Model Number",
        "Tech Code",
        "Technician",
        "Customer Name",
        "Address 1",
        "Address 2",
        "Address 3",
        "Mobile",
        "Agreement Status",
        "Team",
      ];
      const rows = filteredJobs.map((r) => [
        r.jobNumber,
        r.jobDate,
        r.serialNumber,
        r.machineNumber,
        r.modelNumber,
        r.techCode,
        r.technicianName,
        r.customerName,
        r.address1,
        r.address2,
        r.address3,
        r.mobile,
        r.agreementStatus,
        r.team,
      ]);
      downloadCSV(toCSV(headers, rows), "BackLog_Jobs.csv");
    } else {
      const headers = [
        "Service Number",
        "Expected Date",
        "Serial Number",
        "Visit No",
        "Machine No (Q.No)",
        "Model Number",
        "Tech Code",
        "Technician",
        "Customer Name",
        "Address 1",
        "Address 2",
        "Address 3",
        "Mobile",
        "Agreement Status",
        "Team",
      ];
      const rows = filteredServices.map((r) => [
        r.serviceNumber,
        r.expectedDate,
        r.serialNumber,
        r.visitNo,
        r.machineNumber,
        r.modelNumber,
        r.techCode,
        r.technicianName,
        r.customerName,
        r.address1,
        r.address2,
        r.address3,
        r.mobile,
        r.agreementStatus,
        r.team,
      ]);
      downloadCSV(toCSV(headers, rows), "BackLog_Services.csv");
    }
  };

  const handlePdfDownload = (type: "jobs" | "services") => {
    const isJob = type === "jobs";
    const data = isJob ? filteredJobs : filteredServices;
    const content = `<html><head><style>
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');
      body{font-family:'DM Sans',Arial,sans-serif;font-size:8px;margin:20px;}
      h2{font-size:15px;margin:0 0 4px;color:#1a1a2e;}
      p{font-size:11px;color:#666;margin:0 0 12px;}
      table{width:100%;border-collapse:collapse;}
      th{background:#1a1a2e;color:white;padding:5px 6px;text-align:left;font-size:10px;}
      td{padding:4px 6px;border-bottom:1px solid #eee;font-size:9px;}
      tr:nth-child(even){background:#f8f9ff;}
    </style></head><body>
    <h2>Back Log Report — ${isJob ? "Jobs" : "Services"}</h2>
    <p>Team: ${teamFilter} &nbsp;|&nbsp; Records: ${data.length} &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString()}</p>
    <table>
      ${
        isJob
          ? `<tr><th>Job No</th><th>Date</th><th>Serial No</th><th>Q.No</th><th>Model</th><th>Technician</th><th>Customer</th><th>Team</th><th>Status</th><th>Mobile</th></tr>`
          : `<tr><th>Svc No</th><th>Expected</th><th>Serial No</th><th>Visit</th><th>Q.No</th><th>Model</th><th>Technician</th><th>Customer</th><th>Team</th><th>Status</th></tr>`
      }
      ${
        isJob
          ? (filteredJobs as JobRecord[])
              .map(
                (r) =>
                  `<tr><td>${r.jobNumber}</td><td>${r.jobDate}</td><td>${r.serialNumber}</td><td>${r.machineNumber}</td><td>${r.modelNumber}</td><td>${r.technicianName}</td><td>${r.customerName}</td><td>${r.team}</td><td>${r.agreementStatus}</td><td>${r.mobile}</td></tr>`,
              )
              .join("")
          : (filteredServices as ServiceRecord[])
              .map(
                (r) =>
                  `<tr><td>${r.serviceNumber}</td><td>${r.expectedDate}</td><td>${r.serialNumber}</td><td>${r.visitNo}</td><td>${r.machineNumber}</td><td>${r.modelNumber}</td><td>${r.technicianName}</td><td>${r.customerName}</td><td>${r.team}</td><td>${r.agreementStatus}</td></tr>`,
              )
              .join("")
      }
    </table></body></html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(content);
      win.document.close();
      win.print();
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

  const summary = tab === "jobs" ? jobSummary : svcSummary;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f0f1f8",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background:
            "linear-gradient(120deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          padding: "22px 28px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "32px",
                background: "linear-gradient(180deg,#e94560,#0f3460)",
                borderRadius: "2px",
              }}
            />
            <div>
              <div
                style={{
                  color: "#a0aec0",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Pending Work
              </div>
              <h1
                style={{
                  color: "white",
                  margin: "2px 0 0",
                  fontSize: "23px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                Back Log Report
              </h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginLeft: "14px" }}>
            {(["MA", "FS", "NS", "EX"] as AgreementStatus[]).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  ...AGREE_STYLE[s],
                  opacity: 0.9,
                }}
              >
                {s}
              </span>
            ))}
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
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleDownload("jobs")}
              style={{
                background: "#21a04a",
                color: "white",
                border: "none",
                borderRadius: "7px",
                padding: "8px 14px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              ⬇ Jobs CSV
            </button>
            <button
              onClick={() => handleDownload("services")}
              style={{
                background: "#0f3460",
                color: "white",
                border: "1px solid #4a90d9",
                borderRadius: "7px",
                padding: "8px 14px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
              }}
            >
              ⬇ Services CSV
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handlePdfDownload("jobs")}
              style={{
                background: "#c0392b",
                color: "white",
                border: "none",
                borderRadius: "7px",
                padding: "7px 12px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "11px",
              }}
            >
              🖨 Jobs PDF
            </button>
            <button
              onClick={() => handlePdfDownload("services")}
              style={{
                background: "#8e44ad",
                color: "white",
                border: "none",
                borderRadius: "7px",
                padding: "7px 12px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "11px",
              }}
            >
              🖨 Services PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div
        style={{
          padding: "16px 28px 0",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            label: "Total",
            value: summary.total,
            bg: "#1a1a2e",
            color: "white",
          },
          { label: "MA", value: summary.MA, bg: "#22543d", color: "#c6f6d5" },
          { label: "FS", value: summary.FS, bg: "#2a4365", color: "#bee3f8" },
          { label: "NS", value: summary.NS, bg: "#2d3748", color: "#e2e8f0" },
          { label: "EX", value: summary.EX, bg: "#742a2a", color: "#fed7d7" },
        ].map((c) => (
          <div
            key={c.label}
            style={{
              background: c.bg,
              borderRadius: "10px",
              padding: "10px 18px",
              minWidth: "80px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                color: c.color,
                fontSize: "22px",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {c.value}
            </div>
            <div
              style={{
                color: c.color,
                fontSize: "11px",
                opacity: 0.75,
                marginTop: "2px",
                fontWeight: 600,
              }}
            >
              {c.label}
            </div>
          </div>
        ))}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          <span style={{ fontWeight: 600 }}>Viewing:</span>
          <span style={{ fontWeight: 800, color: "#1a1a2e" }}>
            {tab === "jobs" ? "Jobs" : "Services"}
          </span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div
        style={{
          background: "white",
          margin: "14px 28px 0",
          borderRadius: "10px",
          padding: "12px 18px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: "0 1px 5px rgba(0,0,0,0.07)",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
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
                resetPage();
              }}
              style={{
                padding: "6px 13px",
                borderRadius: "18px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                background: teamFilter === v ? "#1a1a2e" : "#e8eaf0",
                color: teamFilter === v ? "white" : "#4a5568",
                transition: "all 0.15s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div style={{ width: "1px", height: "28px", background: "#e2e8f0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            style={{
              fontSize: "12px",
              color: "#555",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Month:
          </label>
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              resetPage();
            }}
            style={{
              border: "1px solid #d1d9e8",
              borderRadius: "6px",
              padding: "5px 9px",
              fontSize: "12px",
              outline: "none",
              color: "#333",
            }}
          />
          {monthFilter && (
            <button
              onClick={() => {
                setMonthFilter("");
                resetPage();
              }}
              style={{
                background: "#e53e3e",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "4px 9px",
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
          placeholder={`Search ${tab === "jobs" ? "job no" : "service no"}, customer, Q.No…`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPage();
          }}
          style={{
            marginLeft: "auto",
            border: "1px solid #d1d9e8",
            borderRadius: "7px",
            padding: "7px 14px",
            fontSize: "12px",
            width: "240px",
            outline: "none",
          }}
        />
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          display: "flex",
          margin: "14px 28px 0",
          gap: "0",
          background: "white",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          boxShadow: "0 1px 5px rgba(0,0,0,0.07)",
        }}
      >
        {(
          [
            ["jobs", "🔧 Jobs", JOB_DATA.length],
            ["services", "🛠 Services", SERVICE_DATA.length],
          ] as [TabType, string, number][]
        ).map(([t, l, count]) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setPage(1);
            }}
            style={{
              flex: 1,
              padding: "14px 20px",
              border: "none",
              background: tab === t ? "#1a1a2e" : "white",
              color: tab === t ? "white" : "#666",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "14px",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {l}
            <span
              style={{
                background: tab === t ? "#e94560" : "#e2e8f0",
                color: tab === t ? "white" : "#666",
                borderRadius: "10px",
                padding: "1px 8px",
                fontSize: "11px",
                fontWeight: 800,
              }}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div
        style={{
          margin: "0 28px 28px",
          background: "white",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          {tab === "jobs" ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
                minWidth: "1100px",
              }}
            >
              <thead>
                <tr style={{ background: "#1a1a2e" }}>
                  {[
                    "#",
                    "Job No",
                    "Job Date",
                    "Serial No",
                    "Q.No",
                    "Model",
                    "Tech Code",
                    "Technician",
                    "Customer",
                    "Team",
                    "Status",
                    "Mobile",
                    "Address",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 10px",
                        color: "#a0aec0",
                        fontWeight: 700,
                        textAlign: "left",
                        fontSize: "11px",
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
                {(pageData as JobRecord[]).map((r, i) => {
                  const idx = (page - 1) * PAGE_SIZE + i + 1;
                  const addr = [r.address1, r.address2, r.address3]
                    .filter((a) => a && a !== "-")
                    .join(", ");
                  return (
                    <tr
                      key={r.jobNumber}
                      style={{
                        background: i % 2 === 0 ? "white" : "#f7f8fc",
                        borderBottom: "1px solid #edf0f7",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#bbb",
                          fontWeight: 700,
                          fontSize: "11px",
                        }}
                      >
                        {idx}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontWeight: 700,
                          color: "#e94560",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.jobNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#555",
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                        }}
                      >
                        {r.jobDate}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#888",
                          fontSize: "10px",
                          fontFamily: "monospace",
                        }}
                      >
                        {r.serialNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#2b6cb0",
                          fontWeight: 700,
                        }}
                      >
                        {r.machineNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#4a5568",
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                        }}
                      >
                        {r.modelNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#718096",
                          fontSize: "11px",
                        }}
                      >
                        {r.techCode}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#2d3748",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.technicianName}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontWeight: 600,
                          color: "#1a202c",
                          maxWidth: "160px",
                        }}
                      >
                        {r.customerName}
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: 700,
                            ...TEAM_STYLE[r.team],
                          }}
                        >
                          {r.team}
                        </span>
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <span
                          style={{
                            padding: "2px 9px",
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: 700,
                            ...AGREE_STYLE[r.agreementStatus],
                          }}
                        >
                          {r.agreementStatus}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: "11px",
                          color: "#4a90d9",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.mobile !== "-" ? r.mobile : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: "11px",
                          color: "#718096",
                          maxWidth: "170px",
                        }}
                      >
                        {addr}
                      </td>
                    </tr>
                  );
                })}
                {pageData.length === 0 && (
                  <tr>
                    <td
                      colSpan={13}
                      style={{
                        padding: "50px",
                        textAlign: "center",
                        color: "#aaa",
                        fontSize: "14px",
                      }}
                    >
                      No job records match current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
                minWidth: "1180px",
              }}
            >
              <thead>
                <tr style={{ background: "#1a1a2e" }}>
                  {[
                    "#",
                    "Service No",
                    "Expected Date",
                    "Serial No",
                    "Visit No",
                    "Q.No",
                    "Model",
                    "Tech Code",
                    "Technician",
                    "Customer",
                    "Team",
                    "Status",
                    "Mobile",
                    "Address",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 10px",
                        color: "#a0aec0",
                        fontWeight: 700,
                        textAlign: "left",
                        fontSize: "11px",
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
                {(pageData as ServiceRecord[]).map((r, i) => {
                  const idx = (page - 1) * PAGE_SIZE + i + 1;
                  const addr = [r.address1, r.address2, r.address3]
                    .filter((a) => a && a !== "-")
                    .join(", ");
                  return (
                    <tr
                      key={r.serviceNumber}
                      style={{
                        background: i % 2 === 0 ? "white" : "#f7f8fc",
                        borderBottom: "1px solid #edf0f7",
                      }}
                    >
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#bbb",
                          fontWeight: 700,
                          fontSize: "11px",
                        }}
                      >
                        {idx}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontWeight: 700,
                          color: "#0f3460",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.serviceNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#555",
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                        }}
                      >
                        {r.expectedDate}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#888",
                          fontSize: "10px",
                          fontFamily: "monospace",
                        }}
                      >
                        {r.serialNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontWeight: 700,
                          color: "#553c9a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.visitNo}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#2b6cb0",
                          fontWeight: 700,
                        }}
                      >
                        {r.machineNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#4a5568",
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                        }}
                      >
                        {r.modelNumber}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#718096",
                          fontSize: "11px",
                        }}
                      >
                        {r.techCode}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#2d3748",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.technicianName}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontWeight: 600,
                          color: "#1a202c",
                          maxWidth: "150px",
                        }}
                      >
                        {r.customerName}
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: 700,
                            ...TEAM_STYLE[r.team],
                          }}
                        >
                          {r.team}
                        </span>
                      </td>
                      <td style={{ padding: "8px 10px" }}>
                        <span
                          style={{
                            padding: "2px 9px",
                            borderRadius: "10px",
                            fontSize: "10px",
                            fontWeight: 700,
                            ...AGREE_STYLE[r.agreementStatus],
                          }}
                        >
                          {r.agreementStatus}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: "11px",
                          color: "#4a90d9",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.mobile !== "-" ? r.mobile : "—"}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          fontSize: "11px",
                          color: "#718096",
                          maxWidth: "160px",
                        }}
                      >
                        {addr}
                      </td>
                    </tr>
                  );
                })}
                {pageData.length === 0 && (
                  <tr>
                    <td
                      colSpan={14}
                      style={{
                        padding: "50px",
                        textAlign: "center",
                        color: "#aaa",
                        fontSize: "14px",
                      }}
                    >
                      No service records match current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div
            style={{
              padding: "13px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #edf0f7",
              background: "#fafbff",
            }}
          >
            <span style={{ fontSize: "12px", color: "#888" }}>
              Showing <strong>{(page - 1) * PAGE_SIZE + 1}</strong>–
              <strong>{Math.min(page * PAGE_SIZE, activeData.length)}</strong>{" "}
              of <strong>{activeData.length}</strong>
            </span>
            <div style={{ display: "flex", gap: "5px" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #dde4ef",
                  background: "white",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  color: page === 1 ? "#ccc" : "#333",
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
                    borderRadius: "6px",
                    border: "1px solid #dde4ef",
                    background: p === page ? "#1a1a2e" : "white",
                    color: p === page ? "white" : "#333",
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
                  borderRadius: "6px",
                  border: "1px solid #dde4ef",
                  background: "white",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  color: page === totalPages ? "#ccc" : "#333",
                  fontWeight: 700,
                }}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          padding: "0 28px 20px",
          fontSize: "11px",
          color: "#aaa",
          display: "flex",
          gap: "16px",
        }}
      >
        <span>MA = Machine Agreement</span>
        <span>FS = Full Service</span>
        <span>NS = No Service</span>
        <span>EX = Expired</span>
        <span style={{ marginLeft: "auto" }}>
          Downloads are filtered by current Team & Month selection
        </span>
      </div>
    </div>
  );
}
