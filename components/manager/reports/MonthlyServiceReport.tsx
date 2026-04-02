import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgreementStatus = "MA" | "FS" | "EX";
type Team = "COL" | "OUT" | "SUB";

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
  startTime: string;
  endTime: string;
  durationMin: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DATA: ServiceRecord[] = [
  {
    serviceNumber: "SV-2025-001",
    expectedDate: "2025-01-04",
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
    startTime: "08:30",
    endTime: "09:45",
    durationMin: 75,
  },
  {
    serviceNumber: "SV-2025-002",
    expectedDate: "2025-01-07",
    serialNumber: "E336M150121",
    visitNo: "V002",
    machineNumber: "Q9712",
    modelNumber: "MP2501SP",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "EMBASSY OF FRANCE",
    address1: "NO: 89, ROSMEAD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112639401",
    agreementStatus: "MA",
    team: "COL",
    startTime: "10:00",
    endTime: "11:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-003",
    expectedDate: "2025-01-09",
    serialNumber: "G637M340107",
    visitNo: "V003",
    machineNumber: "Q98580",
    modelNumber: "MP 2014D",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    customerName: "NATURAL RESOURCES MANAGEMENT CENTER",
    address1: "PERADENIYA",
    address2: "-",
    address3: "-",
    mobile: "0812388155",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "09:15",
    endTime: "10:00",
    durationMin: 45,
  },
  {
    serviceNumber: "SV-2025-004",
    expectedDate: "2025-01-12",
    serialNumber: "D261Z704017",
    visitNo: "V004",
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
    startTime: "14:00",
    endTime: "15:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-005",
    expectedDate: "2025-01-15",
    serialNumber: "G634Z260230",
    visitNo: "V005",
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
    team: "OUT",
    startTime: "08:00",
    endTime: "10:00",
    durationMin: 120,
  },
  {
    serviceNumber: "SV-2025-006",
    expectedDate: "2025-01-17",
    serialNumber: "E338MA50080",
    visitNo: "V006",
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
    startTime: "11:00",
    endTime: "11:50",
    durationMin: 50,
  },
  {
    serviceNumber: "SV-2025-007",
    expectedDate: "2025-01-20",
    serialNumber: "G631M240179",
    visitNo: "V007",
    machineNumber: "Q18672",
    modelNumber: "MP 2014D",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "JUBILEE AGENCIES (PVT) LTD",
    address1: "NO: 104",
    address2: "3RD CROSS STREET",
    address3: "COLOMBO 11",
    mobile: "0112389745",
    agreementStatus: "FS",
    team: "COL",
    startTime: "13:30",
    endTime: "14:45",
    durationMin: 75,
  },
  {
    serviceNumber: "SV-2025-008",
    expectedDate: "2025-01-22",
    serialNumber: "G638M840129",
    visitNo: "V008",
    machineNumber: "Q14256",
    modelNumber: "MP 2014D",
    techCode: "3107",
    technicianName: "GAYAN ASIRI",
    customerName: "KITHSEWANA",
    address1: "PAHARIYA",
    address2: "ANURADHAPURA",
    address3: "-",
    mobile: "0763803500",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "09:00",
    endTime: "10:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-009",
    expectedDate: "2025-01-24",
    serialNumber: "G606MA50269",
    visitNo: "V009",
    machineNumber: "Q11847",
    modelNumber: "MP 2014",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    customerName: "KM / SWAMY VIPULANANDA VIDYALAYAM",
    address1: "MANALCHENAI",
    address2: "KALMUNAI",
    address3: "-",
    mobile: "0774075211",
    agreementStatus: "MA",
    team: "OUT",
    startTime: "10:30",
    endTime: "11:00",
    durationMin: 30,
  },
  {
    serviceNumber: "SV-2025-010",
    expectedDate: "2025-01-27",
    serialNumber: "G636M940128",
    visitNo: "V010",
    machineNumber: "Q10719",
    modelNumber: "MP 2014D",
    techCode: "3135",
    technicianName: "A.KIRIYUTHAN",
    customerName: "SEED & PLANTING MATERIAL DEVELOPMENT CENTRE",
    address1: "DEPT OF AGRICULTURE",
    address2: "OLD GALAHA RD",
    address3: "PERADENIYA",
    mobile: "081-2388100",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "14:30",
    endTime: "16:00",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-011",
    expectedDate: "2025-01-29",
    serialNumber: "3081R220242",
    visitNo: "V011",
    machineNumber: "Q18564",
    modelNumber: "IMC2000",
    techCode: "3136",
    technicianName: "MALITH SAMEERA",
    customerName: "WAYAMBA CO-OPERATIVE RURAL BANK",
    address1: "NO-107",
    address2: "DAMBULLA ROAD",
    address3: "KURUNEGALA",
    mobile: "0372226191",
    agreementStatus: "MA",
    team: "OUT",
    startTime: "08:30",
    endTime: "09:45",
    durationMin: 75,
  },
  {
    serviceNumber: "SV-2025-012",
    expectedDate: "2025-02-03",
    serialNumber: "E337M250055",
    visitNo: "V012",
    machineNumber: "Q12009",
    modelNumber: "MP2501SP",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    customerName: "MINISTRY OF PORTS AND SHIPPING",
    address1: "NO. 19",
    address2: "CHAITHYA ROAD",
    address3: "COLOMBO 01",
    mobile: "0112320252",
    agreementStatus: "MA",
    team: "COL",
    startTime: "09:00",
    endTime: "10:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-013",
    expectedDate: "2025-02-05",
    serialNumber: "G634ZA60170",
    visitNo: "V013",
    machineNumber: "Q20454",
    modelNumber: "MP 2014D",
    techCode: "3129",
    technicianName: "J.S.RUSHANTH",
    customerName: "BT/BW/KARAIYAKKANTHIVU GANESHER VIDYALAYA",
    address1: "KANNANKUDAH",
    address2: "-",
    address3: "-",
    mobile: "0778267702",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "11:15",
    endTime: "12:30",
    durationMin: 75,
  },
  {
    serviceNumber: "SV-2025-014",
    expectedDate: "2025-02-07",
    serialNumber: "D218Z500015",
    visitNo: "V014",
    machineNumber: "Q14826",
    modelNumber: "DX2430",
    techCode: "3123",
    technicianName: "SOBAN N.",
    customerName: "PRIMA (CEYLON) LTD",
    address1: "NO:50, SRI JAYAWARDHANAPURA",
    address2: "PARLIAMENT ROAD",
    address3: "RAJAGIRIYA",
    mobile: "0262233202",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "13:00",
    endTime: "15:00",
    durationMin: 120,
  },
  {
    serviceNumber: "SV-2025-015",
    expectedDate: "2025-02-10",
    serialNumber: "G633ZC60343",
    visitNo: "V015",
    machineNumber: "Q19762",
    modelNumber: "MP2014D",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "ST ANTHONY'S T.M.V",
    address1: "COLOMBO 14",
    address2: "MAHAWATHTHA ROAD",
    address3: "COLOMBO 14",
    mobile: "-",
    agreementStatus: "MA",
    team: "COL",
    startTime: "08:00",
    endTime: "09:00",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-016",
    expectedDate: "2025-02-12",
    serialNumber: "E337M850358",
    visitNo: "V016",
    machineNumber: "Q12904",
    modelNumber: "MP2501SP",
    techCode: "8028",
    technicianName: "DAMITH SANJAYA",
    customerName: "COLOMBO MUNICIPAL COUNCIL",
    address1: "PUBLIC HEALTH DEPT",
    address2: "TOWN HALL DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0705052729",
    agreementStatus: "MA",
    team: "COL",
    startTime: "10:00",
    endTime: "11:45",
    durationMin: 105,
  },
  {
    serviceNumber: "SV-2025-017",
    expectedDate: "2025-02-14",
    serialNumber: "G630MC40193",
    visitNo: "V017",
    machineNumber: "Q17761",
    modelNumber: "MP 2014D",
    techCode: "3191",
    technicianName: "PRADEEP SAMPATH",
    customerName: "MR.P.B.I.A.K.DAYASIRI",
    address1: "NO:197",
    address2: "RATHNAPURA ROAD",
    address3: "RILHENA, PELMADULLA",
    mobile: "0718738854",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "14:00",
    endTime: "14:40",
    durationMin: 40,
  },
  {
    serviceNumber: "SV-2025-018",
    expectedDate: "2025-02-17",
    serialNumber: "G634ZB60314",
    visitNo: "V018",
    machineNumber: "Q20470",
    modelNumber: "MP 2014D",
    techCode: "3184",
    technicianName: "DARSHANA RUKSHAN",
    customerName: "MR.RANGA DILEEPA",
    address1: "COOP MEEGOLLEWA",
    address2: "TRACK 09",
    address3: "MEDIRIGIRIYA",
    mobile: "0740471036",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "09:30",
    endTime: "11:00",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-019",
    expectedDate: "2025-02-19",
    serialNumber: "G634Z960056",
    visitNo: "V019",
    machineNumber: "Q20307",
    modelNumber: "MP 2014D",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    customerName: "NATIONAL PEOPLE'S POWER OFFICE",
    address1: "URUMPIRAI ROAD",
    address2: "KOPAY JUNCTION",
    address3: "KOPAY",
    mobile: "0777539863",
    agreementStatus: "MA",
    team: "OUT",
    startTime: "08:00",
    endTime: "09:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-020",
    expectedDate: "2025-02-21",
    serialNumber: "E338MA50087",
    visitNo: "V020",
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
    startTime: "10:30",
    endTime: "11:45",
    durationMin: 75,
  },
  {
    serviceNumber: "SV-2025-021",
    expectedDate: "2025-02-24",
    serialNumber: "G618M750148",
    visitNo: "V021",
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
    startTime: "14:00",
    endTime: "15:00",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-022",
    expectedDate: "2025-02-26",
    serialNumber: "D261Z704083",
    visitNo: "V022",
    machineNumber: "Q18311",
    modelNumber: "DD3344",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "CRIMINAL RECORDS DIVISION",
    address1: "NO.40 MEDLAND PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0718015517",
    agreementStatus: "EX",
    team: "COL",
    startTime: "09:00",
    endTime: "10:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-023",
    expectedDate: "2025-02-28",
    serialNumber: "G600M950039",
    visitNo: "V023",
    machineNumber: "Q17955",
    modelNumber: "MP 2014",
    techCode: "3177",
    technicianName: "RASITHA PERERA",
    customerName: "REGIONAL DIRECTOR OF HEALTH SERVICES",
    address1: "KEGALLE",
    address2: "-",
    address3: "-",
    mobile: "0352222549",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "11:00",
    endTime: "12:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-024",
    expectedDate: "2025-03-03",
    serialNumber: "G630MA40053",
    visitNo: "V024",
    machineNumber: "Q17676",
    modelNumber: "MP 2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "RITZ CLOTHING YAPAHUWA (PVT)LTD",
    address1: "ANURADHAPURA ROAD",
    address2: "UDUWERIYA",
    address3: "YAPAHUWWA",
    mobile: "0768033370",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "08:30",
    endTime: "09:15",
    durationMin: 45,
  },
  {
    serviceNumber: "SV-2025-025",
    expectedDate: "2025-03-05",
    serialNumber: "D217Z300820",
    visitNo: "V025",
    machineNumber: "Q12006",
    modelNumber: "DX2430",
    techCode: "3188",
    technicianName: "DULANJA NIROSHAN",
    customerName: "ST.BENEDICT COLLEGE",
    address1: "KANJUKKULIYA",
    address2: "CHILAW",
    address3: "-",
    mobile: "0322220555",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "13:00",
    endTime: "14:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-026",
    expectedDate: "2025-03-07",
    serialNumber: "3281M730750",
    visitNo: "V026",
    machineNumber: "Q19175",
    modelNumber: "M2701",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    customerName: "SRI LANKA SOCIAL SECURITY BOARD",
    address1: "NO.18, RAJAGIRIYA ROAD",
    address2: "RAJAGIRIYA",
    address3: "-",
    mobile: "0112886584",
    agreementStatus: "MA",
    team: "SUB",
    startTime: "09:00",
    endTime: "10:00",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-027",
    expectedDate: "2025-03-10",
    serialNumber: "G618MB50081",
    visitNo: "V027",
    machineNumber: "Q14571",
    modelNumber: "MP 2014AD",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    customerName: "DAGONNA WIMALANANDA VIDHYALAYA",
    address1: "MINUWANGODA",
    address2: "-",
    address3: "-",
    mobile: "0779008471",
    agreementStatus: "FS",
    team: "SUB",
    startTime: "10:15",
    endTime: "11:15",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-028",
    expectedDate: "2025-03-12",
    serialNumber: "G611M650004",
    visitNo: "V028",
    machineNumber: "Q19149",
    modelNumber: "MP2014AD",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    customerName: "NAVODYA SUPER",
    address1: "1F1 KANDANA ROAD",
    address2: "BOLLATHA",
    address3: "GANEMULLA",
    mobile: "-",
    agreementStatus: "FS",
    team: "SUB",
    startTime: "14:00",
    endTime: "15:45",
    durationMin: 105,
  },
  {
    serviceNumber: "SV-2025-029",
    expectedDate: "2025-03-14",
    serialNumber: "G639M640008",
    visitNo: "V029",
    machineNumber: "Q16241",
    modelNumber: "MP 2014D",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "DEPARTMENT OF AGRICULTURE ENGINEERING",
    address1: "DIVISION, BEE KEEPING UNIT",
    address2: "BINDUNUWEWA",
    address3: "BANDARAWELA",
    mobile: "081-2388268",
    agreementStatus: "MA",
    team: "OUT",
    startTime: "08:00",
    endTime: "09:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-030",
    expectedDate: "2025-03-17",
    serialNumber: "G637M340063",
    visitNo: "V030",
    machineNumber: "Q11721",
    modelNumber: "MP 2014D",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    customerName: "KM / ST / NAMAGAL VIDYALAYA",
    address1: "UNIT 07, NAVITHANVELY",
    address2: "-",
    address3: "-",
    mobile: "0767225255",
    agreementStatus: "EX",
    team: "OUT",
    startTime: "11:00",
    endTime: "11:30",
    durationMin: 30,
  },
  {
    serviceNumber: "SV-2025-031",
    expectedDate: "2025-03-19",
    serialNumber: "E338MA50108",
    visitNo: "V031",
    machineNumber: "Q14379",
    modelNumber: "MP2501SP",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "NATIONAL AUDIT OFFICE",
    address1: "NO :306/72",
    address2: "POLDUWA ROAD",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
    agreementStatus: "MA",
    team: "OUT",
    startTime: "13:30",
    endTime: "15:00",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-032",
    expectedDate: "2025-03-21",
    serialNumber: "3289MC30182",
    visitNo: "V032",
    machineNumber: "Q16855",
    modelNumber: "M2701",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "POLICE SUPPLIES DIVISION",
    address1: "POLICE HEADQUARTERS",
    address2: "2ND FLOOR",
    address3: "COLOMBO 01",
    mobile: "0112421111",
    agreementStatus: "EX",
    team: "OUT",
    startTime: "09:30",
    endTime: "11:00",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-033",
    expectedDate: "2025-03-24",
    serialNumber: "D212Z900685",
    visitNo: "V033",
    machineNumber: "Q5082",
    modelNumber: "DX2430",
    techCode: "4050",
    technicianName: "THILINA LAKSHAN",
    customerName: "KELANIYA ZONAL EDUCATION OFFICE",
    address1: "MAKOLA",
    address2: "-",
    address3: "-",
    mobile: "0112962025",
    agreementStatus: "MA",
    team: "SUB",
    startTime: "10:00",
    endTime: "11:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-034",
    expectedDate: "2025-03-26",
    serialNumber: "G634ZA60022",
    visitNo: "V034",
    machineNumber: "Q20490",
    modelNumber: "MP 2014D",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    customerName: "JAYA FREIGHT SOLUTIONS (PVT)LTD",
    address1: "NO.401",
    address2: "ROBERT GUNAWARDANA",
    address3: "BATTARAMULLA",
    mobile: "-",
    agreementStatus: "FS",
    team: "SUB",
    startTime: "14:00",
    endTime: "15:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-035",
    expectedDate: "2025-03-28",
    serialNumber: "G619M750025",
    visitNo: "V035",
    machineNumber: "Q21144",
    modelNumber: "MP 2014AD",
    techCode: "3137",
    technicianName: "KAVINDA LIYANAGE",
    customerName: "VIN OCEAN SHIPPING LTD",
    address1: "NO.267/15, GALLE ROAD",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "0112301476",
    agreementStatus: "MA",
    team: "COL",
    startTime: "08:30",
    endTime: "10:00",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-036",
    expectedDate: "2025-04-02",
    serialNumber: "E344MA51296",
    visitNo: "V036",
    machineNumber: "Q7667",
    modelNumber: "MP2001L",
    techCode: "8029",
    technicianName: "RASIKA LAKMAL",
    customerName: "DIVISIONAL SECRETARIAT",
    address1: "HORANA",
    address2: "-",
    address3: "-",
    mobile: "0343347478",
    agreementStatus: "FS",
    team: "SUB",
    startTime: "09:00",
    endTime: "10:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-037",
    expectedDate: "2025-04-04",
    serialNumber: "G633ZA60055",
    visitNo: "V037",
    machineNumber: "Q19625",
    modelNumber: "MP2014D",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    customerName: "NEHAN ADS PRINTING & BOOKSHOP",
    address1: "295/2 ASGIRIYA",
    address2: "GAMPAHA",
    address3: "-",
    mobile: "-",
    agreementStatus: "MA",
    team: "SUB",
    startTime: "11:00",
    endTime: "12:15",
    durationMin: 75,
  },
  {
    serviceNumber: "SV-2025-038",
    expectedDate: "2025-04-07",
    serialNumber: "G618M950133",
    visitNo: "V038",
    machineNumber: "Q14539",
    modelNumber: "MP 2014AD",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    customerName: "WP/NG/NIWANDAMA JINARAJA PRIMARY SCHOOL",
    address1: "NIWANDAMA",
    address2: "JA ELA",
    address3: "-",
    mobile: "0711073685",
    agreementStatus: "FS",
    team: "SUB",
    startTime: "13:30",
    endTime: "14:30",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-039",
    expectedDate: "2025-04-09",
    serialNumber: "3081R121697",
    visitNo: "V039",
    machineNumber: "Q18166",
    modelNumber: "IMC2000",
    techCode: "3185",
    technicianName: "THARINDU THATHSARA",
    customerName: "LANWA SANSTHA CEMENT CORPORATION PVT LTD",
    address1: "NO:25 ALFRED PLACE",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "-",
    agreementStatus: "MA",
    team: "SUB",
    startTime: "08:00",
    endTime: "09:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-040",
    expectedDate: "2025-04-11",
    serialNumber: "G617M750016",
    visitNo: "V040",
    machineNumber: "Q12289",
    modelNumber: "MP 2014AD",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "SPECIAL TASK FORCE",
    address1: "NO:223",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112500471",
    agreementStatus: "EX",
    team: "SUB",
    startTime: "10:00",
    endTime: "12:00",
    durationMin: 120,
  },
  {
    serviceNumber: "SV-2025-041",
    expectedDate: "2025-04-14",
    serialNumber: "G633Z660035",
    visitNo: "V041",
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
    startTime: "14:30",
    endTime: "15:15",
    durationMin: 45,
  },
  {
    serviceNumber: "SV-2025-042",
    expectedDate: "2025-04-16",
    serialNumber: "C317R346023",
    visitNo: "V042",
    machineNumber: "Q21091",
    modelNumber: "MP3555",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    customerName: "GURU PRINTERS",
    address1: "KONDAVIL",
    address2: "IRUPALAI JUNCTION",
    address3: "KOPAY",
    mobile: "0212214777",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "09:00",
    endTime: "10:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-043",
    expectedDate: "2025-04-18",
    serialNumber: "L6916350130",
    visitNo: "V043",
    machineNumber: "Q3877",
    modelNumber: "MP1600",
    techCode: "8049",
    technicianName: "ISURU GISHANTHA",
    customerName: "STATE PRINTING CORPORATION",
    address1: "PANALUWA",
    address2: "PADUKKA",
    address3: "-",
    mobile: "0112757500",
    agreementStatus: "MA",
    team: "SUB",
    startTime: "11:30",
    endTime: "12:30",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-044",
    expectedDate: "2025-04-21",
    serialNumber: "G633Z960094",
    visitNo: "V044",
    machineNumber: "Q19590",
    modelNumber: "MP2014D",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    customerName: "D.M.GUNATHILAKA",
    address1: "NANNERIYA",
    address2: "NAWAGATHEGAMA",
    address3: "-",
    mobile: "-",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "08:30",
    endTime: "10:00",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-045",
    expectedDate: "2025-04-23",
    serialNumber: "G616MB50197",
    visitNo: "V045",
    machineNumber: "Q10843",
    modelNumber: "MP 2014AD",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "WP / KL / BANDARANAYAKA MAHA VIDYALAYA",
    address1: "PAYAGALA",
    address2: "-",
    address3: "-",
    mobile: "0342226160",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "13:00",
    endTime: "14:45",
    durationMin: 105,
  },
  {
    serviceNumber: "SV-2025-046",
    expectedDate: "2025-04-25",
    serialNumber: "E335MB50159",
    visitNo: "V046",
    machineNumber: "Q9158",
    modelNumber: "MP2501SP",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "REWATHA VIDYALAYA",
    address1: "BALAPITIYA",
    address2: "-",
    address3: "-",
    mobile: "0912258243",
    agreementStatus: "EX",
    team: "OUT",
    startTime: "09:30",
    endTime: "11:30",
    durationMin: 120,
  },
  {
    serviceNumber: "SV-2025-047",
    expectedDate: "2025-04-28",
    serialNumber: "G638M540058",
    visitNo: "V047",
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
    startTime: "10:00",
    endTime: "11:00",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-048",
    expectedDate: "2025-04-30",
    serialNumber: "G607M750017",
    visitNo: "V048",
    machineNumber: "Q12688",
    modelNumber: "MP 2014",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    customerName: "SANTHOSHI S. HEART ASSOCIATES",
    address1: "NO : 30,2/1, WILSON STREET",
    address2: "COLOMBO 12",
    address3: "-",
    mobile: "0112473331",
    agreementStatus: "MA",
    team: "COL",
    startTime: "14:00",
    endTime: "15:30",
    durationMin: 90,
  },
  {
    serviceNumber: "SV-2025-049",
    expectedDate: "2025-05-02",
    serialNumber: "G634ZB60235",
    visitNo: "V049",
    machineNumber: "Q20482",
    modelNumber: "MP 2014D",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "JOINT APPAREL ASSOCIATION",
    address1: "NO:107, HUNUPITIYA LAKE ROAD",
    address2: "COLOMBO 02",
    address3: "-",
    mobile: "0710337765",
    agreementStatus: "MA",
    team: "COL",
    startTime: "08:30",
    endTime: "09:30",
    durationMin: 60,
  },
  {
    serviceNumber: "SV-2025-050",
    expectedDate: "2025-05-05",
    serialNumber: "G634Z260229",
    visitNo: "V050",
    machineNumber: "Q20169",
    modelNumber: "MP 2014D",
    techCode: "3123",
    technicianName: "SOBAN N.",
    customerName: "SAMANTHIKA BOOK SHOP",
    address1: "MAIN STREET",
    address2: "KANTALE",
    address3: "TRINCOMALEE",
    mobile: "0715938098",
    agreementStatus: "FS",
    team: "OUT",
    startTime: "11:00",
    endTime: "12:00",
    durationMin: 60,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AGREE_STYLE: Record<AgreementStatus, React.CSSProperties> = {
  MA: { background: "#d1fae5", color: "#065f46" },
  FS: { background: "#dbeafe", color: "#1e40af" },
  EX: { background: "#fee2e2", color: "#b91c1c" },
};

const TEAM_STYLE: Record<Team, React.CSSProperties> = {
  COL: { background: "#ede9fe", color: "#5b21b6" },
  OUT: { background: "#dcfce7", color: "#166534" },
  SUB: { background: "#fef3c7", color: "#92400e" },
};

function fmtDur(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function fmtDate(d: string): string {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function toCSV(rows: ServiceRecord[]): string {
  const h = [
    "Service No",
    "Expected Date",
    "Serial No",
    "Visit No",
    "Q.No",
    "Model",
    "Tech Code",
    "Technician",
    "Customer",
    "Address 1",
    "Address 2",
    "Address 3",
    "Mobile",
    "Agreement",
    "Team",
    "Start Time",
    "End Time",
    "Duration (min)",
  ];
  const data = rows.map((r) => [
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
    r.startTime,
    r.endTime,
    String(r.durationMin),
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

// duration bar colour
function durColor(min: number): string {
  if (min <= 45) return "#22c55e";
  if (min <= 75) return "#3b82f6";
  if (min <= 105) return "#f59e0b";
  return "#ef4444";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MonthlyServiceReport() {
  const now = new Date();
  const defaultMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [monthFilter, setMonthFilter] = useState<string>("2025-03");
  const [teamFilter, setTeamFilter] = useState<string>("ALL");
  const [agreeFilter, setAgreeFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<keyof ServiceRecord>("expectedDate");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const PAGE_SIZE = 10;

  const filtered = useMemo<ServiceRecord[]>(() => {
    return DATA.filter((r) => {
      const mOk = !monthFilter || r.expectedDate.startsWith(monthFilter);
      const tOk = teamFilter === "ALL" || r.team === teamFilter;
      const aOk = agreeFilter === "ALL" || r.agreementStatus === agreeFilter;
      const q = search.toLowerCase();
      const sOk =
        !search ||
        r.customerName.toLowerCase().includes(q) ||
        r.serviceNumber.toLowerCase().includes(q) ||
        r.machineNumber.toLowerCase().includes(q) ||
        r.technicianName.toLowerCase().includes(q) ||
        r.serialNumber.toLowerCase().includes(q);
      return mOk && tOk && aOk && sOk;
    }).sort((a, b) => {
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      return sortAsc ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
    });
  }, [monthFilter, teamFilter, agreeFilter, search, sortKey, sortAsc]);

  // ── Analytics ──
  const stats = useMemo(() => {
    if (!filtered.length)
      return {
        total: 0,
        totalMin: 0,
        avgMin: 0,
        maxMin: 0,
        minMin: 0,
        byTeam: { COL: 0, OUT: 0, SUB: 0 },
        byAgree: { MA: 0, FS: 0, EX: 0 },
        byTech: [] as { name: string; count: number; avgMin: number }[],
        durBuckets: [0, 0, 0, 0],
      };
    const totalMin = filtered.reduce((s, r) => s + r.durationMin, 0);
    const avgMin = Math.round(totalMin / filtered.length);
    const maxMin = Math.max(...filtered.map((r) => r.durationMin));
    const minMin = Math.min(...filtered.map((r) => r.durationMin));
    const byTeam = {
      COL: filtered.filter((r) => r.team === "COL").length,
      OUT: filtered.filter((r) => r.team === "OUT").length,
      SUB: filtered.filter((r) => r.team === "SUB").length,
    };
    const byAgree = {
      MA: filtered.filter((r) => r.agreementStatus === "MA").length,
      FS: filtered.filter((r) => r.agreementStatus === "FS").length,
      EX: filtered.filter((r) => r.agreementStatus === "EX").length,
    };
    const techMap = new Map<string, { count: number; totalMin: number }>();
    filtered.forEach((r) => {
      const e = techMap.get(r.technicianName) ?? { count: 0, totalMin: 0 };
      techMap.set(r.technicianName, {
        count: e.count + 1,
        totalMin: e.totalMin + r.durationMin,
      });
    });
    const byTech = Array.from(techMap.entries())
      .map(([name, v]) => ({
        name,
        count: v.count,
        avgMin: Math.round(v.totalMin / v.count),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    const durBuckets = [
      filtered.filter((r) => r.durationMin <= 45).length,
      filtered.filter((r) => r.durationMin > 45 && r.durationMin <= 75).length,
      filtered.filter((r) => r.durationMin > 75 && r.durationMin <= 105).length,
      filtered.filter((r) => r.durationMin > 105).length,
    ];
    return {
      total: filtered.length,
      totalMin,
      avgMin,
      maxMin,
      minMin,
      byTeam,
      byAgree,
      byTech,
      durBuckets,
    };
  }, [filtered]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pPages = useMemo(() => {
    const total = Math.min(5, totalPages);
    let s =
      page <= 3
        ? 1
        : page >= totalPages - 2
          ? Math.max(1, totalPages - 4)
          : page - 2;
    return Array.from({ length: total }, (_, i) => s + i);
  }, [page, totalPages]);

  const toggleSort = (key: keyof ServiceRecord) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
    setPage(1);
  };

  const selectedMonthLabel = useMemo(() => {
    if (!monthFilter) return "All Months";
    const [y, m] = monthFilter.split("-");
    return `${MONTHS[parseInt(m) - 1]} ${y}`;
  }, [monthFilter]);

  const SortIcon = ({ col }: { col: keyof ServiceRecord }) => (
    <span
      style={{
        marginLeft: "4px",
        opacity: sortKey === col ? 1 : 0.3,
        fontSize: "10px",
      }}
    >
      {sortKey === col && !sortAsc ? "▼" : "▲"}
    </span>
  );

  const Th = ({
    col,
    children,
  }: {
    col: keyof ServiceRecord;
    children: React.ReactNode;
  }) => (
    <th
      onClick={() => {
        toggleSort(col);
      }}
      style={{
        padding: "11px 10px",
        color: "#94a3b8",
        fontWeight: 700,
        textAlign: "left",
        fontSize: "11px",
        whiteSpace: "nowrap",
        letterSpacing: "0.4px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {children}
      <SortIcon col={col} />
    </th>
  );

  const maxBar = Math.max(...stats.durBuckets, 1);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#0f172a 100%)",
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
              Operations Overview
            </div>
            <h1
              style={{
                color: "white",
                margin: "0 0 4px",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              Monthly Service Report
            </h1>
            <div
              style={{
                color: "#93c5fd",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              {selectedMonthLabel}
            </div>

            {/* KPI Cards */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                {
                  label: "Total Services",
                  val: stats.total,
                  col: "white",
                  sub: "",
                  bg: "rgba(255,255,255,0.1)",
                  border: "rgba(255,255,255,0.2)",
                },
                {
                  label: "Total Time",
                  val: fmtDur(stats.totalMin),
                  col: "#7dd3fc",
                  sub: "combined",
                  bg: "rgba(125,211,252,0.12)",
                  border: "rgba(125,211,252,0.3)",
                },
                {
                  label: "Avg Duration",
                  val: fmtDur(stats.avgMin),
                  col: "#86efac",
                  sub: "per visit",
                  bg: "rgba(134,239,172,0.12)",
                  border: "rgba(134,239,172,0.3)",
                },
                {
                  label: "Fastest",
                  val: fmtDur(stats.minMin),
                  col: "#4ade80",
                  sub: "min visit",
                  bg: "rgba(74,222,128,0.12)",
                  border: "rgba(74,222,128,0.3)",
                },
                {
                  label: "Longest",
                  val: fmtDur(stats.maxMin),
                  col: "#fbbf24",
                  sub: "max visit",
                  bg: "rgba(251,191,36,0.12)",
                  border: "rgba(251,191,36,0.3)",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: "12px",
                    padding: "10px 16px",
                    minWidth: "90px",
                  }}
                >
                  <div
                    style={{
                      color: c.col,
                      fontSize: "20px",
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    {c.val}
                  </div>
                  {c.sub && (
                    <div
                      style={{
                        color: c.col,
                        fontSize: "9px",
                        opacity: 0.7,
                        fontWeight: 600,
                      }}
                    >
                      {c.sub}
                    </div>
                  )}
                  <div
                    style={{
                      color: c.col,
                      fontSize: "10px",
                      opacity: 0.6,
                      marginTop: "3px",
                      fontWeight: 600,
                    }}
                  >
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <button
              onClick={() =>
                dlCSV(
                  toCSV(filtered),
                  `Service_Report_${monthFilter || "All"}.csv`,
                )
              }
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "9px",
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "13px",
                boxShadow: "0 2px 8px rgba(22,163,74,0.4)",
              }}
            >
              ⬇ Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* ── Analytics Row ── */}
      <div
        style={{
          padding: "16px 28px 0",
          display: "flex",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        {/* Duration Buckets */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "18px 20px",
            flex: "1",
            minWidth: "220px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Duration Breakdown
          </div>
          {[
            { label: "≤ 45 min", color: "#22c55e", val: stats.durBuckets[0] },
            { label: "46–75 min", color: "#3b82f6", val: stats.durBuckets[1] },
            { label: "76–105 min", color: "#f59e0b", val: stats.durBuckets[2] },
            { label: "> 105 min", color: "#ef4444", val: stats.durBuckets[3] },
          ].map((b) => (
            <div key={b.label} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  {b.label}
                </span>
                <span
                  style={{ fontSize: "12px", fontWeight: 800, color: b.color }}
                >
                  {b.val}
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  background: "#f1f5f9",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(b.val / maxBar) * 100}%`,
                    background: b.color,
                    borderRadius: "4px",
                    transition: "width 0.4s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Team split */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "18px 20px",
            minWidth: "180px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            By Team
          </div>
          {(["COL", "OUT", "SUB"] as Team[]).map((t) => {
            const pct = stats.total
              ? Math.round((stats.byTeam[t] / stats.total) * 100)
              : 0;
            return (
              <div key={t} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      ...TEAM_STYLE[t],
                    }}
                  >
                    {t}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {stats.byTeam[t]}{" "}
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        fontWeight: 500,
                      }}
                    >
                      {pct}%
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "#f1f5f9",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: TEAM_STYLE[t].color as string,
                      borderRadius: "3px",
                      transition: "width 0.4s",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Agreement split */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "18px 20px",
            minWidth: "180px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            By Agreement
          </div>
          {(["MA", "FS", "EX"] as AgreementStatus[]).map((a) => {
            const pct = stats.total
              ? Math.round((stats.byAgree[a] / stats.total) * 100)
              : 0;
            return (
              <div key={a} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      ...AGREE_STYLE[a],
                    }}
                  >
                    {a}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 800,
                      color: "#0f172a",
                    }}
                  >
                    {stats.byAgree[a]}{" "}
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        fontWeight: 500,
                      }}
                    >
                      {pct}%
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "#f1f5f9",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: AGREE_STYLE[a].color as string,
                      borderRadius: "3px",
                      transition: "width 0.4s",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Technicians */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "18px 20px",
            flex: "1",
            minWidth: "220px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Top Technicians
          </div>
          {stats.byTech.length === 0 && (
            <div style={{ color: "#cbd5e1", fontSize: "13px" }}>No data</div>
          )}
          {stats.byTech.map((t, i) => (
            <div
              key={t.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: [
                    "#6366f1",
                    "#3b82f6",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444",
                  ][i],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#1e293b",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>
                  {t.count} visits · avg {fmtDur(t.avgMin)}
                </div>
              </div>
            </div>
          ))}
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
          gap: "14px",
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: "0 1px 5px rgba(0,0,0,0.06)",
        }}
      >
        {/* Month */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Month
          </label>
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "7px",
              padding: "6px 10px",
              fontSize: "12px",
              outline: "none",
              color: "#334155",
              fontWeight: 600,
            }}
          />
          {monthFilter && (
            <button
              onClick={() => {
                setMonthFilter("");
                setPage(1);
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
              ✕ All
            </button>
          )}
        </div>

        <div style={{ width: "1px", height: "28px", background: "#e2e8f0" }} />

        {/* Team */}
        <div style={{ display: "flex", gap: "5px" }}>
          {(["ALL", "COL", "OUT", "SUB"] as string[]).map((v) => (
            <button
              key={v}
              onClick={() => {
                setTeamFilter(v);
                setPage(1);
              }}
              style={{
                padding: "6px 13px",
                borderRadius: "18px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                background: teamFilter === v ? "#0f172a" : "#f1f5f9",
                color: teamFilter === v ? "white" : "#475569",
                transition: "all 0.15s",
              }}
            >
              {v === "ALL" ? "All Teams" : v}
            </button>
          ))}
        </div>

        <div style={{ width: "1px", height: "28px", background: "#e2e8f0" }} />

        {/* Agreement */}
        <div style={{ display: "flex", gap: "5px" }}>
          {(["ALL", "MA", "FS", "EX"] as string[]).map((v) => (
            <button
              key={v}
              onClick={() => {
                setAgreeFilter(v);
                setPage(1);
              }}
              style={{
                padding: "6px 13px",
                borderRadius: "18px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                background: agreeFilter === v ? "#0f172a" : "#f1f5f9",
                color: agreeFilter === v ? "white" : "#475569",
                transition: "all 0.15s",
              }}
            >
              {v === "ALL" ? "All" : v}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginLeft: "auto", position: "relative" }}>
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
            placeholder="Search customer, service no, Q.No…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "7px 14px 7px 34px",
              fontSize: "12px",
              width: "240px",
              outline: "none",
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
            padding: "5px 13px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
          }}
        >
          {filtered.length} records
        </div>
      </div>

      {/* ── Table ── */}
      <div
        style={{
          margin: "12px 28px 28px",
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
              fontSize: "12px",
              minWidth: "1300px",
            }}
          >
            <thead>
              <tr style={{ background: "#0f172a" }}>
                <th
                  style={{
                    padding: "11px 10px",
                    color: "#94a3b8",
                    fontWeight: 700,
                    textAlign: "left",
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  #
                </th>
                <Th col="serviceNumber">Service No</Th>
                <Th col="expectedDate">Date</Th>
                <Th col="visitNo">Visit No</Th>
                <Th col="machineNumber">Q.No</Th>
                <Th col="modelNumber">Model</Th>
                <Th col="technicianName">Technician</Th>
                <Th col="customerName">Customer</Th>
                <Th col="team">Team</Th>
                <Th col="agreementStatus">Agreement</Th>
                <Th col="startTime">Start</Th>
                <Th col="endTime">End</Th>
                <Th col="durationMin">Duration</Th>
                <th
                  style={{
                    padding: "11px 10px",
                    color: "#94a3b8",
                    fontWeight: 700,
                    textAlign: "left",
                    fontSize: "11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Mobile
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((r, i) => {
                const idx = (page - 1) * PAGE_SIZE + i + 1;
                const dcol = durColor(r.durationMin);
                return (
                  <tr
                    key={r.serviceNumber}
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
                        padding: "10px 10px",
                        color: "#cbd5e1",
                        fontWeight: 700,
                        fontSize: "11px",
                      }}
                    >
                      {idx}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        fontWeight: 800,
                        color: "#1e3a5f",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.serviceNumber}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        color: "#475569",
                        whiteSpace: "nowrap",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      {fmtDate(r.expectedDate)}
                    </td>
                    <td style={{ padding: "10px 10px" }}>
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
                        {r.visitNo}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        color: "#2563eb",
                        fontWeight: 700,
                      }}
                    >
                      {r.machineNumber}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        color: "#334155",
                        whiteSpace: "nowrap",
                        fontSize: "11px",
                      }}
                    >
                      {r.modelNumber}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        color: "#1e293b",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        fontSize: "11px",
                      }}
                    >
                      {r.technicianName}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        fontWeight: 600,
                        color: "#0f172a",
                        maxWidth: "160px",
                        fontSize: "11px",
                      }}
                    >
                      {r.customerName}
                    </td>
                    <td style={{ padding: "10px 10px" }}>
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
                    <td style={{ padding: "10px 10px" }}>
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
                        padding: "10px 10px",
                        color: "#475569",
                        fontSize: "11px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.startTime}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        color: "#475569",
                        fontSize: "11px",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.endTime}
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "6px",
                            background: "#f1f5f9",
                            borderRadius: "3px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${Math.min((r.durationMin / 120) * 100, 100)}%`,
                              background: dcol,
                              borderRadius: "3px",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontWeight: 800,
                            color: dcol,
                            fontSize: "12px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {fmtDur(r.durationMin)}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        fontSize: "11px",
                        color: "#2563eb",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.mobile !== "-" ? r.mobile : "—"}
                    </td>
                  </tr>
                );
              })}
              {pageData.length === 0 && (
                <tr>
                  <td
                    colSpan={14}
                    style={{ padding: "60px", textAlign: "center" }}
                  >
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                      📋
                    </div>
                    <div
                      style={{
                        color: "#cbd5e1",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      No service records for this filter.
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
              of <strong style={{ color: "#0f172a" }}>{filtered.length}</strong>
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
              {pPages.map((p) => (
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

      {/* Footer */}
      <div
        style={{
          padding: "0 28px 20px",
          fontSize: "11px",
          color: "#94a3b8",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <span>
          🟢 ≤45 min &nbsp; 🔵 46–75 min &nbsp; 🟡 76–105 min &nbsp; 🔴 &gt;105
          min
        </span>
        <span>Click column headers to sort</span>
        <span style={{ marginLeft: "auto" }}>
          MA = Machine Agreement · FS = Full Service · EX = Expired
        </span>
      </div>
    </div>
  );
}
