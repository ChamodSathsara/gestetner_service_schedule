import React, { useState, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgreementStatus = "MA" | "FS" | "NS";
type Team = "COL" | "OUT" | "SUB";
type JobStatus = "Completed" | "Started" | "Pending" | "Cancel";

interface DailyJob {
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
  jobStatus: JobStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const JOB_DATA: DailyJob[] = [
  {
    jobNumber: "DJ-0001",
    jobDate: "2025-03-01",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0002",
    jobDate: "2025-03-01",
    serialNumber: "E336M150121",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0003",
    jobDate: "2025-03-02",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0004",
    jobDate: "2025-03-02",
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
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0005",
    jobDate: "2025-03-03",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0006",
    jobDate: "2025-03-03",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0007",
    jobDate: "2025-03-04",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0008",
    jobDate: "2025-03-04",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0009",
    jobDate: "2025-03-05",
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
    jobStatus: "Cancel",
  },
  {
    jobNumber: "DJ-0010",
    jobDate: "2025-03-05",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0011",
    jobDate: "2025-03-06",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0012",
    jobDate: "2025-03-06",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0013",
    jobDate: "2025-03-07",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0014",
    jobDate: "2025-03-07",
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
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0015",
    jobDate: "2025-03-08",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0016",
    jobDate: "2025-03-08",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0017",
    jobDate: "2025-03-09",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0018",
    jobDate: "2025-03-09",
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
    jobStatus: "Cancel",
  },
  {
    jobNumber: "DJ-0019",
    jobDate: "2025-03-10",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0020",
    jobDate: "2025-03-10",
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
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0021",
    jobDate: "2025-03-11",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0022",
    jobDate: "2025-03-11",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0023",
    jobDate: "2025-03-12",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0024",
    jobDate: "2025-03-12",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0025",
    jobDate: "2025-03-13",
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
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0026",
    jobDate: "2025-03-13",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0027",
    jobDate: "2025-03-14",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0028",
    jobDate: "2025-03-14",
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
    jobStatus: "Cancel",
  },
  {
    jobNumber: "DJ-0029",
    jobDate: "2025-03-15",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0030",
    jobDate: "2025-03-15",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0031",
    jobDate: "2025-03-16",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0032",
    jobDate: "2025-03-16",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0033",
    jobDate: "2025-03-17",
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
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0034",
    jobDate: "2025-03-17",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0035",
    jobDate: "2025-03-18",
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
    jobStatus: "Cancel",
  },
  {
    jobNumber: "DJ-0036",
    jobDate: "2025-03-18",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0037",
    jobDate: "2025-03-19",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0038",
    jobDate: "2025-03-19",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0039",
    jobDate: "2025-03-20",
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
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0040",
    jobDate: "2025-03-20",
    serialNumber: "3081R121697",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0041",
    jobDate: "2025-03-21",
    serialNumber: "G617M750016",
    machineNumber: "Q12289",
    modelNumber: "MP 2014AD",
    techCode: "3162",
    technicianName: "MAHINDA",
    customerName: "SPECIAL TASK FORCE",
    address1: "NO:223",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112500471",
    agreementStatus: "MA",
    team: "SUB",
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0042",
    jobDate: "2025-03-21",
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
    jobStatus: "Pending",
  },
  {
    jobNumber: "DJ-0043",
    jobDate: "2025-03-22",
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
    agreementStatus: "NS",
    team: "OUT",
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0044",
    jobDate: "2025-03-22",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0045",
    jobDate: "2025-03-23",
    serialNumber: "G633Z960094",
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
    jobStatus: "Cancel",
  },
  {
    jobNumber: "DJ-0046",
    jobDate: "2025-03-23",
    serialNumber: "G616MB50197",
    machineNumber: "Q10843",
    modelNumber: "MP 2014AD",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "WP / KL / BANDARANAYAKA MAHA VIDYALAYA",
    address1: "PAYAGALA",
    address2: "-",
    address3: "-",
    mobile: "0342226160",
    agreementStatus: "NS",
    team: "OUT",
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0047",
    jobDate: "2025-03-24",
    serialNumber: "E335MB50159",
    machineNumber: "Q9158",
    modelNumber: "MP2501SP",
    techCode: "3168",
    technicianName: "VISHARA",
    customerName: "REWATHA VIDYALAYA",
    address1: "BALAPITIYA",
    address2: "-",
    address3: "-",
    mobile: "0912258243",
    agreementStatus: "NS",
    team: "OUT",
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0048",
    jobDate: "2025-03-24",
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
    agreementStatus: "MA",
    team: "COL",
    jobStatus: "Started",
  },
  {
    jobNumber: "DJ-0049",
    jobDate: "2025-03-25",
    serialNumber: "G607M750017",
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
    jobStatus: "Completed",
  },
  {
    jobNumber: "DJ-0050",
    jobDate: "2025-03-25",
    serialNumber: "G634ZB60235",
    machineNumber: "Q20482",
    modelNumber: "MP 2014D",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    customerName: "JOINT APPAREL ASSOCIATION",
    address1: "NO:107, HUNUPITIYA LAKE ROAD",
    address2: "COLOMBO 02",
    address3: "-",
    mobile: "0710337765",
    agreementStatus: "FS",
    team: "COL",
    jobStatus: "Pending",
  },
];

// ─── Constants & helpers ──────────────────────────────────────────────────────

const STATUS_CFG: Record<
  JobStatus,
  { bg: string; color: string; dot: string; label: string }
> = {
  Completed: {
    bg: "#dcfce7",
    color: "#15803d",
    dot: "#22c55e",
    label: "Completed",
  },
  Started: {
    bg: "#dbeafe",
    color: "#1d4ed8",
    dot: "#3b82f6",
    label: "Started",
  },
  Pending: {
    bg: "#fef9c3",
    color: "#a16207",
    dot: "#eab308",
    label: "Pending",
  },
  Cancel: {
    bg: "#fee2e2",
    color: "#b91c1c",
    dot: "#ef4444",
    label: "Cancelled",
  },
};

const AGREE_CFG: Record<AgreementStatus, { bg: string; color: string }> = {
  MA: { bg: "#d1fae5", color: "#065f46" },
  FS: { bg: "#dbeafe", color: "#1e40af" },
  NS: { bg: "#f1f5f9", color: "#475569" },
};

const TEAM_CFG: Record<Team, { bg: string; color: string }> = {
  COL: { bg: "#ede9fe", color: "#5b21b6" },
  OUT: { bg: "#dcfce7", color: "#166534" },
  SUB: { bg: "#fef3c7", color: "#92400e" },
};

function fmt(d: string) {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function toCSV(data: DailyJob[]): string {
  const h = [
    "Job No",
    "Job Date",
    "Serial No",
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
    "Status",
  ];
  const rows = data.map((r) => [
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
    r.jobStatus,
  ]);
  return [h, ...rows]
    .map((row) =>
      row.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

function download(csv: string, name: string) {
  const b = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  URL.revokeObjectURL(u);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DailyJobReport() {
  const [teamFilter, setTeamFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [monthFilter, setMonthFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [rangeMode, setRangeMode] = useState<boolean>(false);
  const PAGE_SIZE = 12;

  const reset = () => setPage(1);

  const filtered = useMemo<DailyJob[]>(() => {
    return JOB_DATA.filter((r) => {
      const teamOk = teamFilter === "ALL" || r.team === teamFilter;
      const statusOk = statusFilter === "ALL" || r.jobStatus === statusFilter;
      const monthOk = !monthFilter || r.jobDate.startsWith(monthFilter);
      const dateOk = !dateFilter || r.jobDate === dateFilter;
      const rangeOk =
        (!dateFrom && !dateTo) ||
        ((!dateFrom || r.jobDate >= dateFrom) &&
          (!dateTo || r.jobDate <= dateTo));
      const q = search.toLowerCase();
      const searchOk =
        !search ||
        r.customerName.toLowerCase().includes(q) ||
        r.jobNumber.toLowerCase().includes(q) ||
        r.machineNumber.toLowerCase().includes(q) ||
        r.technicianName.toLowerCase().includes(q) ||
        r.serialNumber.toLowerCase().includes(q) ||
        r.modelNumber.toLowerCase().includes(q);
      return teamOk && statusOk && monthOk && dateOk && rangeOk && searchOk;
    });
  }, [
    teamFilter,
    statusFilter,
    monthFilter,
    dateFilter,
    dateFrom,
    dateTo,
    search,
  ]);

  // Summary counts (all data, only team filtered for totals)
  const counts = useMemo(() => {
    const base =
      teamFilter === "ALL"
        ? JOB_DATA
        : JOB_DATA.filter((r) => r.team === teamFilter);
    return {
      total: base.length,
      Completed: base.filter((r) => r.jobStatus === "Completed").length,
      Started: base.filter((r) => r.jobStatus === "Started").length,
      Pending: base.filter((r) => r.jobStatus === "Pending").length,
      Cancel: base.filter((r) => r.jobStatus === "Cancel").length,
    };
  }, [teamFilter]);

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

  const clearAll = () => {
    setTeamFilter("ALL");
    setStatusFilter("ALL");
    setMonthFilter("");
    setDateFilter("");
    setDateFrom("");
    setDateTo("");
    setSearch("");
    setPage(1);
  };

  const hasFilters =
    teamFilter !== "ALL" ||
    statusFilter !== "ALL" ||
    monthFilter ||
    dateFilter ||
    dateFrom ||
    dateTo ||
    search;

  const handlePrint = () => {
    const rows = filtered
      .map(
        (r) =>
          `<tr><td>${r.jobNumber}</td><td>${fmt(r.jobDate)}</td><td style="font-family:monospace;font-size:9px">${r.serialNumber}</td><td>${r.machineNumber}</td><td>${r.modelNumber}</td><td>${r.technicianName}</td><td>${r.customerName}</td><td>${r.team}</td><td>${r.agreementStatus}</td><td><b>${r.jobStatus}</b></td></tr>`,
      )
      .join("");
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(
        `<html><head><style>body{font-family:Arial,sans-serif;font-size:9px;margin:16px}h2{font-size:14px;margin:0 0 4px;color:#1e293b}p{font-size:11px;color:#64748b;margin:0 0 10px}table{width:100%;border-collapse:collapse}th{background:#1e293b;color:white;padding:5px 6px;text-align:left;font-size:10px}td{padding:4px 6px;border-bottom:1px solid #e2e8f0}tr:nth-child(even){background:#f8fafc}</style></head><body><h2>Daily Job Report</h2><p>Records: ${filtered.length} &nbsp;|&nbsp; ${new Date().toLocaleDateString()}</p><table><tr><th>Job No</th><th>Date</th><th>Serial No</th><th>Q.No</th><th>Model</th><th>Technician</th><th>Customer</th><th>Team</th><th>Agr.</th><th>Status</th></tr>${rows}</table></body></html>`,
      );
      w.document.close();
      w.print();
    }
  };

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
            "linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)",
          padding: "20px 28px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
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
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "4px",
              }}
            >
              Field Operations
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
              Daily Job Report
            </h1>
            {/* Status summary cards */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {(
                [
                  {
                    label: "Total",
                    val: counts.total,
                    bg: "rgba(255,255,255,0.1)",
                    col: "white",
                    border: "rgba(255,255,255,0.2)",
                  },
                  {
                    label: "Completed",
                    val: counts.Completed,
                    bg: "rgba(34,197,94,0.15)",
                    col: "#4ade80",
                    border: "rgba(34,197,94,0.3)",
                  },
                  {
                    label: "Started",
                    val: counts.Started,
                    bg: "rgba(59,130,246,0.15)",
                    col: "#60a5fa",
                    border: "rgba(59,130,246,0.3)",
                  },
                  {
                    label: "Pending",
                    val: counts.Pending,
                    bg: "rgba(234,179,8,0.15)",
                    col: "#fbbf24",
                    border: "rgba(234,179,8,0.3)",
                  },
                  {
                    label: "Cancelled",
                    val: counts.Cancel,
                    bg: "rgba(239,68,68,0.15)",
                    col: "#f87171",
                    border: "rgba(239,68,68,0.3)",
                  },
                ] as {
                  label: string;
                  val: number;
                  bg: string;
                  col: string;
                  border: string;
                }[]
              ).map((c) => (
                <div
                  key={c.label}
                  style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: "10px",
                    padding: "8px 14px",
                    minWidth: "80px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setStatusFilter(
                      c.label === "Total"
                        ? "ALL"
                        : c.label === "Cancelled"
                          ? "Cancel"
                          : c.label,
                    );
                    reset();
                  }}
                >
                  <div
                    style={{
                      color: c.col,
                      fontSize: "20px",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    {c.val}
                  </div>
                  <div
                    style={{
                      color: c.col,
                      fontSize: "10px",
                      opacity: 0.8,
                      marginTop: "2px",
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
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-end",
            }}
          >
            <button
              onClick={() => download(toCSV(filtered), "Daily_Jobs.csv")}
              style={{
                background: "#16a34a",
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
              onClick={handlePrint}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
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
      </div>

      {/* ── Filters Panel ── */}
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
            gap: "16px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Team */}
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
              Team
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              {(["ALL", "COL", "OUT", "SUB"] as string[]).map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setTeamFilter(v);
                    reset();
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
                  {v === "ALL" ? "All" : v}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
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
              Job Status
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              {(
                ["ALL", "Completed", "Started", "Pending", "Cancel"] as string[]
              ).map((v) => {
                const cfg = v !== "ALL" ? STATUS_CFG[v as JobStatus] : null;
                return (
                  <button
                    key={v}
                    onClick={() => {
                      setStatusFilter(v);
                      reset();
                    }}
                    style={{
                      padding: "6px 13px",
                      borderRadius: "18px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "12px",
                      background:
                        statusFilter === v ? (cfg?.bg ?? "#0f172a") : "#f1f5f9",
                      color:
                        statusFilter === v
                          ? (cfg?.color ?? "white")
                          : "#475569",
                      transition: "all 0.15s",
                    }}
                  >
                    {v === "ALL" ? "All" : v === "Cancel" ? "Cancelled" : v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date filters */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "6px",
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
                Date Filter
              </div>
              <button
                onClick={() => {
                  setRangeMode(!rangeMode);
                  setDateFilter("");
                  setMonthFilter("");
                  setDateFrom("");
                  setDateTo("");
                  reset();
                }}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#6366f1",
                  background: "#eef2ff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "2px 8px",
                  cursor: "pointer",
                }}
              >
                {rangeMode ? "← Single" : "Range →"}
              </button>
            </div>
            {!rangeMode ? (
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                    Month
                  </span>
                  <input
                    type="month"
                    value={monthFilter}
                    onChange={(e) => {
                      setMonthFilter(e.target.value);
                      setDateFilter("");
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#333",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#cbd5e1",
                    paddingTop: "16px",
                  }}
                >
                  or
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                    Exact Date
                  </span>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setMonthFilter("");
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#333",
                    }}
                  />
                </div>
                {(monthFilter || dateFilter) && (
                  <button
                    onClick={() => {
                      setMonthFilter("");
                      setDateFilter("");
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
                      marginTop: "14px",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : (
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                    From
                  </span>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#333",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#cbd5e1",
                    paddingTop: "14px",
                  }}
                >
                  →
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "#94a3b8" }}>To</span>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      reset();
                    }}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "7px",
                      padding: "6px 10px",
                      fontSize: "12px",
                      outline: "none",
                      color: "#333",
                    }}
                  />
                </div>
                {(dateFrom || dateTo) && (
                  <button
                    onClick={() => {
                      setDateFrom("");
                      setDateTo("");
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
                      marginTop: "14px",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Search + clear */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              alignItems: "flex-end",
            }}
          >
            <input
              placeholder="Search job, customer, Q.No, technician…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                reset();
              }}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "12px",
                width: "260px",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span
                style={{
                  background: "#0f172a",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                {filtered.length} records
              </span>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  style={{
                    background: "#fee2e2",
                    color: "#b91c1c",
                    border: "none",
                    borderRadius: "7px",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  ✕ Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            {teamFilter !== "ALL" && (
              <span
                style={{
                  background: "#ede9fe",
                  color: "#5b21b6",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Team: {teamFilter}
              </span>
            )}
            {statusFilter !== "ALL" && (
              <span
                style={{
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Status: {statusFilter}
              </span>
            )}
            {monthFilter && (
              <span
                style={{
                  background: "#f0fdf4",
                  color: "#15803d",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Month: {monthFilter}
              </span>
            )}
            {dateFilter && (
              <span
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Date: {fmt(dateFilter)}
              </span>
            )}
            {(dateFrom || dateTo) && (
              <span
                style={{
                  background: "#fce7f3",
                  color: "#9d174d",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                Range: {fmt(dateFrom)} → {fmt(dateTo)}
              </span>
            )}
            {search && (
              <span
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                "{search}"
              </span>
            )}
          </div>
        )}
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
              fontSize: "12px",
              minWidth: "1200px",
            }}
          >
            <thead>
              <tr style={{ background: "#0f172a" }}>
                {[
                  "#",
                  "Job No",
                  "Date",
                  "Serial No",
                  "Q.No",
                  "Model",
                  "Tech Code",
                  "Technician",
                  "Customer",
                  "Team",
                  "Agreement",
                  "Job Status",
                  "Mobile",
                  "Address",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 10px",
                      color: "#94a3b8",
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
              {pageData.map((r, i) => {
                const idx = (page - 1) * PAGE_SIZE + i + 1;
                const scfg = STATUS_CFG[r.jobStatus];
                const acfg = AGREE_CFG[r.agreementStatus];
                const tcfg = TEAM_CFG[r.team];
                const addr = [r.address1, r.address2, r.address3]
                  .filter((a) => a && a !== "-")
                  .join(", ");
                return (
                  <tr
                    key={r.jobNumber}
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
                        color: "#1e293b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.jobNumber}
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
                      {fmt(r.jobDate)}
                    </td>
                    <td
                      style={{
                        padding: "10px 10px",
                        color: "#94a3b8",
                        fontSize: "10px",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.serialNumber}
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
                        color: "#64748b",
                        fontSize: "11px",
                      }}
                    >
                      {r.techCode}
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
                        maxWidth: "170px",
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
                          ...tcfg,
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
                          ...acfg,
                        }}
                      >
                        {r.agreementStatus}
                      </span>
                    </td>
                    <td style={{ padding: "10px 10px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "3px 10px",
                          borderRadius: "10px",
                          fontSize: "11px",
                          fontWeight: 700,
                          background: scfg.bg,
                          color: scfg.color,
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: scfg.dot,
                            flexShrink: 0,
                          }}
                        />
                        {r.jobStatus}
                      </span>
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
                    <td
                      style={{
                        padding: "10px 10px",
                        fontSize: "11px",
                        color: "#64748b",
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
                      No jobs match the current filters.
                    </div>
                    <button
                      onClick={clearAll}
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
                      Clear Filters
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
          MA = Machine Agreement &nbsp;·&nbsp; FS = Full Service &nbsp;·&nbsp;
          NS = No Service
        </span>
        <span style={{ marginLeft: "auto" }}>
          Click summary cards to quick-filter by status · CSV exports current
          filter
        </span>
      </div>
    </div>
  );
}
