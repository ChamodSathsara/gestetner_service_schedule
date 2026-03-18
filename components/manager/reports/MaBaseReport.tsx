import React, { useState, useMemo } from "react";

interface MaRecord {
  customer: string;
  model: string;
  serialNo: string;
  qNo: string;
  date: string;
  techCode: string;
  grade: string;
  team: string;
  status: string;
  maStart: string;
  maEnd: string;
  installDate: string;
  to: string;
  technicianName: string;
  visitCode: string;
  type: string;
  mInvNo: string;
  address1: string;
  address2: string;
  address3: string;
  mobile: string;
}

const RAW_DATA: MaRecord[] = [
  {
    customer: "LANWA SANSTHA CEMENT CORPORATION PRIVATE LIMITED",
    model: "IMC2000",
    serialNo: "3081R121697",
    qNo: "Q18166",
    date: "2023-03-16",
    techCode: "3159",
    grade: "A",
    team: "SUB",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2022-03-16",
    to: "3185",
    technicianName: "THARINDU THATHSARA",
    visitCode: "",
    type: "MPC",
    mInvNo: "MC01342",
    address1: "NO:25 ALFRED PLACE",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "LANWA SANSTHA CEMENT CORPORATION PRIVATE LIMITED",
    model: "M2701",
    serialNo: "3281MA30192",
    qNo: "Q18782",
    date: "2023-03-16",
    techCode: "3159",
    grade: "A",
    team: "SUB",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2022-03-16",
    to: "3185",
    technicianName: "THARINDU THATHSARA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC01746",
    address1: "NO:25 ALFRED PLACE",
    address2: "COLOMBO 03",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "SPECIAL TASK FORCE",
    model: "MP 2014AD",
    serialNo: "G617M750016",
    qNo: "Q12289",
    date: "2018-10-16",
    techCode: "3162",
    grade: "A",
    team: "SUB",
    status: "MA",
    maStart: "2025-07-02",
    maEnd: "2026-07-01",
    installDate: "2017-10-16",
    to: "3162",
    technicianName: "MAHINDA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC004664",
    address1: "NO:223 ,",
    address2: "BAUDDHALOKA MW,",
    address3: "COLOMBO 07",
    mobile: "2-500 471",
  },
  {
    customer: "NATIONAL HOUSING DEVELOPMENT AUTHORITY",
    model: "DD3344",
    serialNo: "D261Z704017",
    qNo: "Q19108",
    date: "2023-12-20",
    techCode: "3168",
    grade: "A",
    team: "SUB",
    status: "MA",
    maStart: "2025-06-25",
    maEnd: "2026-06-24",
    installDate: "2022-12-20",
    to: "3168",
    technicianName: "VISHARA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC02082",
    address1: "P.O.BOX.1826,",
    address2: "NO.34,SRI CHITTAMPALAM A GARD",
    address3: "-",
    mobile: "0342222298",
  },
  {
    customer: "RANGIRI DAMBULLA DEVELOPMENT FOUNDATION",
    model: "MP2014D",
    serialNo: "G634Z260230",
    qNo: "Q20202",
    date: "2025-11-07",
    techCode: "3180",
    grade: "A",
    team: "SUB",
    status: "MA",
    maStart: "2025-11-26",
    maEnd: "2026-11-25",
    installDate: "2024-11-07",
    to: "3180",
    technicianName: "HARSHA MALSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "GOLDEN TEMPLE",
    address2: "KANDY ROAD",
    address3: "DAMBULLA",
    mobile: "0716852449",
  },
  {
    customer: "NANO TECHIES TECHNOLOGIES (PVT) LTD",
    model: "MP2014D",
    serialNo: "G634Z260091",
    qNo: "Q20155",
    date: "2025-10-25",
    techCode: "8045",
    grade: "A",
    team: "SUB",
    status: "MA",
    maStart: "2025-10-26",
    maEnd: "2026-10-25",
    installDate: "2024-10-25",
    to: "-",
    technicianName: "",
    visitCode: "",
    type: "MFP",
    mInvNo: "GMC00037",
    address1: "NO 62 A",
    address2: "ST PETER'S ROAD",
    address3: "MORATUMULLA, MORATUWA",
    mobile: "0713241957",
  },
  {
    customer: "REGAL COMPUTERS & PRINTERS",
    model: "MP2014D",
    serialNo: "G634Z260158",
    qNo: "Q20024",
    date: "2025-08-27",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-09-08",
    maEnd: "2026-09-07",
    installDate: "2024-08-27",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC03341",
    address1: "NO 52.19.2",
    address2: "",
    address3: "COLOMBO 07",
    mobile: "768280847",
  },
  {
    customer: "BACK TO THE BIBLE BROADCAST",
    model: "MP 2014D",
    serialNo: "G633Z660035",
    qNo: "Q19448",
    date: "2024-09-22",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-09-23",
    maEnd: "2026-09-22",
    installDate: "2023-09-22",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC02444",
    address1: "NO:120 A ,",
    address2: "DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112695441",
  },
  {
    customer: "SAMANDA DE LIVERA",
    model: "MP2014D",
    serialNo: "G633ZC60289",
    qNo: "Q19748",
    date: "2025-03-06",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-05-01",
    maEnd: "2026-04-30",
    installDate: "2024-03-06",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02921",
    address1: "331/2 SHRUBBERY GARDEN",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "MALLIKA NIVASA SAMITHIYA",
    model: "MP2014D",
    serialNo: "G6342160008",
    qNo: "Q20180",
    date: "2025-11-01",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-11-21",
    maEnd: "2026-11-20",
    installDate: "2024-11-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "NO.45,VISAKA ROAD,",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "2582044",
  },
  {
    customer: "CENTRAL CULTURAL FUND",
    model: "MP 2014AD",
    serialNo: "G617M750002",
    qNo: "Q12669",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2017-11-20",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC005004",
    address1: "2ND STAGE, 04TH FLOOR,",
    address2: "SETHSIRIPAYA,",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
  },
  {
    customer: "CENTRAL CULTURAL FUND",
    model: "MP 2014AD",
    serialNo: "G617M750004",
    qNo: "Q12670",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2017-11-10",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC005004",
    address1: "2ND STAGE, 04TH FLOOR,",
    address2: "SETHSIRIPAYA,",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
  },
  {
    customer: "SPECIAL TASK FORCE",
    model: "MP 2014AD",
    serialNo: "G617M750026",
    qNo: "Q12284",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-12-17",
    maEnd: "2026-12-16",
    installDate: "2017-10-10",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC004664",
    address1: "NO:223 ,",
    address2: "BAUDDHALOKA MW,",
    address3: "COLOMBO 07",
    mobile: "0112500471",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP 2014AD",
    serialNo: "G616M850061",
    qNo: "Q98769",
    date: "",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-10-01",
    maEnd: "2026-09-30",
    installDate: "2015-02-02",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP 2014D",
    serialNo: "G616M850072",
    qNo: "Q98771",
    date: "",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-10-01",
    maEnd: "2026-09-30",
    installDate: "2015-02-02",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "CENTRAL CULTURAL FUND",
    model: "MP 2014AD",
    serialNo: "G617M950389",
    qNo: "Q13208",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2018-03-21",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC005618",
    address1: "2ND STAGE, 04TH FLOOR,",
    address2: "SETHSIRIPAYA,",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
  },
  {
    customer: "CENTRAL CULTURAL FUND",
    model: "MP 2014AD",
    serialNo: "G617M950395",
    qNo: "Q13359",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2018-05-25",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC005817",
    address1: "2ND STAGE, 04TH FLOOR,",
    address2: "SETHSIRIPAYA,",
    address3: "BATTARAMULLA",
    mobile: "0112186308",
  },
  {
    customer: "MINISTRY OF POWER & RENEWABLE ERERGY",
    model: "MP 2014AD",
    serialNo: "G618M750148",
    qNo: "Q13897",
    date: "2019-10-03",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-22",
    maEnd: "2026-04-21",
    installDate: "2018-10-03",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006291",
    address1: "NO: 72,",
    address2: "NANDA  KUMARASWAMY MW,",
    address3: "COLOMBO 07",
    mobile: "0778881546",
  },
  {
    customer: "LW MISSION CHURCH",
    model: "MP 2014AD",
    serialNo: "G618M950241",
    qNo: "Q15796",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-08",
    maEnd: "2026-10-07",
    installDate: "2018-12-05",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC006565",
    address1: "NO :23/2,",
    address2: "FLOWER ROAD,",
    address3: "COLOMBO 07",
    mobile: "-",
  },
  {
    customer: "DEPARTMENT OF BUDDHIST AFFAIRS",
    model: "MP 2014AD",
    serialNo: "G619M550144",
    qNo: "Q15539",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-01",
    maEnd: "2026-05-31",
    installDate: "2019-09-04",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC007593",
    address1: "NO: 135",
    address2: "DHARMAPALA MW",
    address3: "COLOMBO 07",
    mobile: "0112424447",
  },
  {
    customer: "FIELD ORNITHOLOGY GROUP OF SRI LANKA",
    model: "MP 2014D",
    serialNo: "G636M940048",
    qNo: "Q10617",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-29",
    maEnd: "2026-10-28",
    installDate: "2016-11-10",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003167",
    address1: "DEPARTMENT OF ZOOLOGY",
    address2: "UNIVERSITY OF  COLOMBO",
    address3: "COLOMBO 03",
    mobile: "0112592609",
  },
  {
    customer: "CENTRE FOR POLICY ALTERNATIVE",
    model: "MP 2014D",
    serialNo: "G637M440419",
    qNo: "Q12852",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-11-17",
    maEnd: "2026-11-16",
    installDate: "2018-12-03",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC005164",
    address1: "NO.6/5,",
    address2: "LAYARDS ROAD,",
    address3: "COLOMBO 05.",
    mobile: "0112801384",
  },
  {
    customer: "MINISTRY OF HIGHER EDUCATION",
    model: "MP 2014D",
    serialNo: "G638M540058",
    qNo: "Q98978",
    date: "2015-01-01",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-08-08",
    maEnd: "2026-08-07",
    installDate: "2014-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
  },
  {
    customer: "MINISTRY OF HIGHER EDUCATION",
    model: "MP 2014D",
    serialNo: "G638M540065",
    qNo: "Q98979",
    date: "2015-01-01",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-08-08",
    maEnd: "2026-08-07",
    installDate: "2014-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
  },
  {
    customer: "MINISTRY OF HIGHER EDUCATION",
    model: "MP 2014D",
    serialNo: "G638M540067",
    qNo: "Q98980",
    date: "2015-01-01",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-08-08",
    maEnd: "2026-08-07",
    installDate: "2014-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
  },
  {
    customer: "MINISTRY OF HIGHER EDUCATION",
    model: "MP 2014D",
    serialNo: "G638M540073",
    qNo: "Q98981",
    date: "2015-01-01",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-08-08",
    maEnd: "2026-08-07",
    installDate: "2014-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
  },
  {
    customer: "POWER HOUSE LIMITED",
    model: "MP 2014D",
    serialNo: "G638M640116",
    qNo: "Q13782",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-01",
    maEnd: "2026-09-30",
    installDate: "2018-09-26",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006237",
    address1: "NO: 320,",
    address2: "4TH FLOOR, T.B.JAYA MAWATHA",
    address3: "COLOMBO 10",
    mobile: "0115300700",
  },
  {
    customer: "COLOMBO MUNICIPAL COUNCIL",
    model: "MP 2014D",
    serialNo: "G638MB40039",
    qNo: "Q15267",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2019-10-23",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC007367",
    address1: "TOWN HALL",
    address2: "DHARMAPALA MAWATHA,COLOMBO 07",
    address3: "-",
    mobile: "0112691968",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M540011",
    qNo: "Q16343",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-02-19",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112587888",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M740083",
    qNo: "Q16327",
    date: "2021-06-03",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-06-03",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "2587888",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M840016",
    qNo: "Q16332",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-03-04",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112587888",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M840023",
    qNo: "Q16337",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-02-27",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112587888",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M840024",
    qNo: "Q16336",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-02-20",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112587888",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M840063",
    qNo: "Q16340",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-02-13",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112587888",
  },
  {
    customer: "IRRIGATION DEPARTMENT",
    model: "MP 2014D",
    serialNo: "G639M840064",
    qNo: "Q16339",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-16",
    maEnd: "2026-06-15",
    installDate: "2020-02-13",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC008352",
    address1: "P.O. BOX. 1138",
    address2: "BAUDDHALOKA MW",
    address3: "COLOMBO 07",
    mobile: "0112587888",
  },
  {
    customer: "CONTROL UNION INSPECTIONS (PVT) LTD",
    model: "MPC2004SP",
    serialNo: "G746R650046",
    qNo: "Q10516",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-03-20",
    maEnd: "2026-03-19",
    installDate: "2016-11-09",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC003169",
    address1: "2 ND FLOOR,BAM MUSEE TOWER,",
    address2: "NO;52,SIR,MARCUS FERNANDO MAWATHA,",
    address3: "COLOMBO 07",
    mobile: "0112678607",
  },
  {
    customer: "SCIENTER TECHNOLOGIES (PVT)LTD",
    model: "MPC2004SP",
    serialNo: "G746RA50240",
    qNo: "Q11100",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-07-19",
    maEnd: "2026-07-18",
    installDate: "2017-01-20",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC003587",
    address1: "NO.302,GALLE ROAD,",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "0112598555",
  },
  {
    customer: "UNIVERSITY OF COLOMBO",
    model: "DSM615",
    serialNo: "J9056140688",
    qNo: "Q11315",
    date: "",
    techCode: "3092",
    grade: "H",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2017-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "-",
    address1: "FACULTY OF ARTS",
    address2: "NO:94 KUMARATHUNGA  MUNIDASA  MW",
    address3: "COLOMBO 03",
    mobile: "0112502127",
  },
  {
    customer: "MUNICIPAL COUNCIL",
    model: "MP2016",
    serialNo: "K8157100338",
    qNo: "Q98346",
    date: "",
    techCode: "3092",
    grade: "H",
    team: "COL",
    status: "MA",
    maStart: "2025-08-11",
    maEnd: "2026-08-10",
    installDate: "2018-09-11",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "-",
    address1: "D.M.T.DEPARTMENT,",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112692465",
  },
  {
    customer: "COLOMBO INTERNATIONAL SCHOOL",
    model: "MP1600",
    serialNo: "L6916150876",
    qNo: "Q98436",
    date: "",
    techCode: "3092",
    grade: "H",
    team: "COL",
    status: "MA",
    maStart: "2025-03-27",
    maEnd: "2026-03-26",
    installDate: "2019-09-18",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "-",
    address1: "NO:28,GREGORYS ROAD,",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112697587",
  },
  {
    customer: "UNIVERSITY OF THE VISUAL & PERFORMING ARTS",
    model: "MP1800L2",
    serialNo: "L6916951038",
    qNo: "Q4145",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-20",
    maEnd: "2026-06-19",
    installDate: "2016-10-25",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 30688",
    address1: "NO: 21,",
    address2: "ALBERT CRESCENT,",
    address3: "COLOMBO 07",
    mobile: "0112854585",
  },
  {
    customer: "MINISTRY OF BUDDHASASANA , CULTURAL AND RELIGIOUS AFFAIRS",
    model: "MP1800L2",
    serialNo: "L6926350050",
    qNo: "Q4587",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2013-05-28",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC 31475",
    address1: "08 TH FLOOR",
    address2: "SETHSIRIPAYA,",
    address3: "BATTARAMULLA",
    mobile: "011-2861147",
  },
  {
    customer: "COLOMBO INTERNATIONAL SCHOOL",
    model: "MP1600",
    serialNo: "L6976750035",
    qNo: "Q19083",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-03-27",
    maEnd: "2026-03-26",
    installDate: "2017-06-26",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "-",
    address1: "NO:28,GREGORYS ROAD,",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112697587",
  },
  {
    customer: "SRI LANKA RUPAVAHINI CORPORATION",
    model: "MP1600",
    serialNo: "L6976850300",
    qNo: "Q8299",
    date: "2018-01-01",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2017-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "-",
    address1: "SRI LANKA RUPAVAHINI CORPORATION,",
    address2: "INDEPENDENCE SQUARE,",
    address3: "COLOMBO 07.",
    mobile: "0112501067",
  },
  {
    customer: "UNIVERSITY OF THE VISUAL & PERFORMING ARTS",
    model: "MP1600",
    serialNo: "L6986150585",
    qNo: "Q1382",
    date: "2017-05-31",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-01",
    maEnd: "2026-05-31",
    installDate: "2016-05-31",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC 25948",
    address1: "NO: 21,",
    address2: "ALBERT CRESCENT,",
    address3: "COLOMBO 07",
    mobile: "0112854585",
  },
  {
    customer: "OFFICE OF THE PARLIAMENTARY COMMISSIONER FOR ADMINISTRATION",
    model: "MP1600",
    serialNo: "L6986650507",
    qNo: "Q1770",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-03-20",
    maEnd: "2026-03-19",
    installDate: "2016-12-31",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 26440",
    address1: "01ST FLOOR, NO: 14,",
    address2: "R.A.DE MEL MAWATHA,",
    address3: "COLOMBO 04",
    mobile: "0112588982",
  },
  {
    customer: "FIELD ORNITHOLOGY GROUP OF SRI LANKA",
    model: "MP1600",
    serialNo: "L6987150182",
    qNo: "Q15174",
    date: "",
    techCode: "3092",
    grade: "H",
    team: "COL",
    status: "MA",
    maStart: "2025-10-29",
    maEnd: "2026-10-28",
    installDate: "2017-08-16",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "-",
    address1: "DEPARTMENT OF ZOOLOGY",
    address2: "UNIVERSITY OF  COLOMBO",
    address3: "COLOMBO 03",
    mobile: "0112592609",
  },
  {
    customer: "OFFICE OF THE PARLIAMENTARY COMMISSIONER FOR ADMINISTRATION",
    model: "MP2000",
    serialNo: "L7107150455",
    qNo: "Q3562",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-03-20",
    maEnd: "2026-03-19",
    installDate: "2016-12-31",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 29585",
    address1: "01ST FLOOR, NO: 14,",
    address2: "R.A.DE MEL MAWATHA,",
    address3: "COLOMBO 04",
    mobile: "0112588982",
  },
  {
    customer: "UNIVERSITY OF COLOMBO",
    model: "MP2000L2",
    serialNo: "L7136350051",
    qNo: "Q5309",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2017-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC 70423",
    address1: "HECT PROJECT",
    address2: "P.O.BOX 1490 , CUMARATHUNGA MUNIDASA MW,",
    address3: "COLOMBO 03",
    mobile: "0112595953",
  },
  {
    customer: "MINISTRY OF HIGHER EDUCATION",
    model: "MP 2501SP",
    serialNo: "E335MC50887",
    qNo: "Q98948",
    date: "",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-08-08",
    maEnd: "2026-08-07",
    installDate: "2012-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO:18, WARD PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694486",
  },
  {
    customer: "EMBASSY OF FRANCE",
    model: "MP2501SP",
    serialNo: "E336M150121",
    qNo: "Q9712",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2017-03-02",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC002226",
    address1: "NO: 89,",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112639401",
  },
  {
    customer: "UNIVERSITY OF COLOMBO",
    model: "MP 2501SP",
    serialNo: "E336M550168",
    qNo: "Q9955",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2016-06-21",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC002417",
    address1: "FACULTY OF SCIENCE",
    address2: "NO: 98 , KUMARATHUNGA MUNIDASA MW,",
    address3: "COLOMBO 03",
    mobile: "0117725666",
  },
  {
    customer: "DEPARTMENT OF SPORTS  DEVELOPMENT",
    model: "MP2501SP",
    serialNo: "E336M750272",
    qNo: "Q10326",
    date: "2017-09-27",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2016-09-27",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC002868",
    address1: "NO: 33,TORRINGTON SQUARE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112695809",
  },
  {
    customer: "NATIONAL SCIENCE FOUNDATION",
    model: "MP2501SP",
    serialNo: "E336M850115",
    qNo: "Q10646",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-01",
    maEnd: "2026-09-30",
    installDate: "2016-11-18",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003196",
    address1: "NO:47/5,",
    address2: "MAITLAND PLACE",
    address3: "COLOMBO 07",
    mobile: "0123456789",
  },
  {
    customer: "UNIVERSITY OF COLOMBO",
    model: "DD5450",
    serialNo: "D288XB40021",
    qNo: "Q14515",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2019-01-10",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC006681",
    address1: "NO:94",
    address2: "KUMARATHUNGA  MUNIDASA  MW",
    address3: "COLOMBO 03",
    mobile: "0112502127",
  },
  {
    customer: "CEYLEX ENGINEERING (PRIVATE) LIMITED",
    model: "MPC 2003SP",
    serialNo: "E205R570115",
    qNo: "Q8569",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-06-29",
    maEnd: "2026-06-28",
    installDate: "2017-08-31",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC001147",
    address1: "NO. 69/1",
    address2: "WORLD PLACE",
    address3: "COLOMBO 07",
    mobile: "0117513195",
  },
  {
    customer: "SMART MARINE LANKA (PVT) LTD",
    model: "MP2001SP",
    serialNo: "E324MC50263",
    qNo: "Q7665",
    date: "2018-03-17",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2017-03-17",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC 73981",
    address1: "NO:15 , 1ST FLOOR,",
    address2: "LAMICO TOWER ,VISAKA ROAD,",
    address3: "COLOMBO 04",
    mobile: "0115052226",
  },
  {
    customer: "MINISTRY OF PUBLIC ADMINISTRATION",
    model: "MP2001SP",
    serialNo: "E328M650023",
    qNo: "Q13742",
    date: "2019-10-20",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-09-05",
    maEnd: "2026-09-06",
    installDate: "2018-10-20",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC006228",
    address1: "HOME AFAIRS,PROVINCIAL COUNCIL AND LOCAL GOVERNMENT",
    address2: "INDEPENDENCE SQUARE",
    address3: "COLOMBO 07",
    mobile: "269621113",
  },
  {
    customer: "DEPARTMENT OF BUDDHIST AFFAIRS",
    model: "MP2501SP",
    serialNo: "E334M450828",
    qNo: "Q7341",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-15",
    maEnd: "2026-10-14",
    installDate: "2016-11-30",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 73456",
    address1: "NO: 135",
    address2: "DHARMAPALA MW",
    address3: "COLOMBO 07",
    mobile: "0112424447",
  },
  {
    customer: "DEPARTMENT OF BUDDHIST AFFAIRS",
    model: "MP 2501SP",
    serialNo: "E334M950362",
    qNo: "Q7176",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-01",
    maEnd: "2026-09-30",
    installDate: "2016-11-19",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 73178",
    address1: "NO: 135",
    address2: "DHARMAPALA MW",
    address3: "COLOMBO 07",
    mobile: "0123456789",
  },
  {
    customer: "DEPARTMENT OF BUDDHIST AFFAIRS",
    model: "MP 2501SP",
    serialNo: "E334M950415",
    qNo: "Q7177",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-15",
    maEnd: "2026-10-14",
    installDate: "2016-11-19",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC 73178",
    address1: "NO: 135",
    address2: "DHARMAPALA MW",
    address3: "COLOMBO 07",
    mobile: "0112424447",
  },
  {
    customer: "COLOMBO MUNICIPAL COUNCIL",
    model: "MP2501SP",
    serialNo: "E335M350015",
    qNo: "Q8256",
    date: "2018-06-24",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-12-15",
    maEnd: "2026-12-14",
    installDate: "2017-06-24",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC000800",
    address1: "TOWN HALL,",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "2691968",
  },
  {
    customer: "CRIMINAL RECORDS DIVISION",
    model: "DD3344",
    serialNo: "D261Z704083",
    qNo: "Q18311",
    date: "2025-01-20",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2022-01-20",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC01468",
    address1: "NO.40MEDLAND PLACE",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0718015517",
  },
  {
    customer: "UNIVERSITY OF COLOMBO",
    model: "DD3344",
    serialNo: "D2672B00380",
    qNo: "Q99088",
    date: "",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2014-02-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "DIRECT-EWIS",
    address1: "NO:94",
    address2: "KUMARATHUNGA  MUNIDASA  MW",
    address3: "COLOMBO 03",
    mobile: "0112502127",
  },
  {
    customer: "UNIVERSITY OF COLOMBO",
    model: "DD4450",
    serialNo: "D224Z400064",
    qNo: "Q11751",
    date: "",
    techCode: "3092",
    grade: "H",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2017-01-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC 72447",
    address1: "NO:94",
    address2: "KUMARATHUNGA  MUNIDASA  MW",
    address3: "COLOMBO 03",
    mobile: "0112502127",
  },
  {
    customer: "BUDDHIST & PALI UNIVERSITY OF SRI LANKA",
    model: "DD4450",
    serialNo: "D287X240056",
    qNo: "Q98694",
    date: "",
    techCode: "3092",
    grade: "E",
    team: "COL",
    status: "MA",
    maStart: "2025-03-23",
    maEnd: "2026-03-22",
    installDate: "2015-02-02",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "-",
    address1: "NO : 37, MORAGAHAHENA RD,",
    address2: "PITIPANA NORTH,",
    address3: "HOMAGAMA",
    mobile: "0112857787",
  },
  {
    customer: "MUSAEUS COLLEGE,",
    model: "DD5450",
    serialNo: "D288X140019",
    qNo: "Q13539",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-09-01",
    maEnd: "2026-08-31",
    installDate: "2018-08-14",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC006066",
    address1: "NO:58,",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112696285",
  },
  {
    customer: "EMBASSY OF THE REPUBLIC OF KOREA",
    model: "MPC6004EXSP",
    serialNo: "C758M810624",
    qNo: "Q14944",
    date: "2020-01-11",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-11-04",
    maEnd: "2026-11-03",
    installDate: "2019-01-11",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC006807",
    address1: "NO:98,",
    address2: "DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112699036",
  },
  {
    customer: "SRI LANKA  SUSTAINABLE  ENERGY  AUTHORITY",
    model: "MPC2004EXSP",
    serialNo: "C768R230240",
    qNo: "Q13252",
    date: "2019-04-19",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-07-16",
    maEnd: "2026-07-15",
    installDate: "2018-04-19",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC005699",
    address1: "1ST FLOOR,",
    address2: "BLOCK   5, B.M.I.C.H.",
    address3: "COLOMBO 07",
    mobile: "0715344175",
  },
  {
    customer: "NATIONAL MUSEUM,",
    model: "DX2430",
    serialNo: "D212Z600543",
    qNo: "Q4835",
    date: "2017-11-02",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2016-11-02",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC 31872",
    address1: "SRI MARCUS FERNANDO MAWATHA",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112694768",
  },
  {
    customer: "M&M MILITZER & MUENCH",
    model: "M2701",
    serialNo: "3283Z630015",
    qNo: "Q19489",
    date: "2024-10-11",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-12",
    maEnd: "2026-10-11",
    installDate: "2023-10-11",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02483",
    address1: "NO.3,1/1 BUCHANAN ST,",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "0766263305",
  },
  {
    customer: "CRIMINAL RECORDS DIVISION",
    model: "M2701",
    serialNo: "3281M730782",
    qNo: "Q18569",
    date: "2025-02-10",
    techCode: "3092",
    grade: "",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2022-02-10",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01596",
    address1: "TORINTION SQUARES",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112692012",
  },
  {
    customer: "BUDDHIST LADIES COLLEGE",
    model: "M2701",
    serialNo: "3281M830017",
    qNo: "Q18888",
    date: "2023-04-18",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-09-01",
    maEnd: "2026-08-31",
    installDate: "2022-04-18",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01799",
    address1: "NO:229,",
    address2: "DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112695347",
  },
  {
    customer: "CRIMINAL RECORDS DIVISION",
    model: "M2701",
    serialNo: "3281M730272",
    qNo: "Q18568",
    date: "2025-01-26",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2022-01-26",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01596",
    address1: "TORINTION SQUARES",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112692012",
  },
  {
    customer: "CANADIAN HIGH COMMISSION",
    model: "IMC2000",
    serialNo: "3081R221383",
    qNo: "Q18585",
    date: "2023-02-23",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-08-14",
    maEnd: "2026-08-13",
    installDate: "2022-02-23",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MPC",
    mInvNo: "MC01654",
    address1: "FRAMACO BOZDEMIR JV(PVT)LTD",
    address2: "NO:06 R.G SENANAYAKA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "-",
  },
  {
    customer: "EMBASSY OF FRANCE",
    model: "IMC2000",
    serialNo: "3080R520388",
    qNo: "Q17310",
    date: "2021-10-07",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2020-10-07",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC00510",
    address1: "NO: 89,",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112639401",
  },
  {
    customer: "COMMISSION TO INVESTIGATE ALLEGATIONS OF BRIBERY CORRUPTION",
    model: "IMC2000",
    serialNo: "3089R720635",
    qNo: "Q16049",
    date: "2020-11-19",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-07-12",
    maEnd: "2026-07-11",
    installDate: "2019-11-19",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC008116",
    address1: "36, MALALASEKARA MAWATHA",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112596365",
  },
  {
    customer: "EMBASSY OF FRANCE",
    model: "IMC2000",
    serialNo: "3089R920664",
    qNo: "Q16600",
    date: "2020-11-26",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2019-11-26",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC008142",
    address1: "NO: 89,",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112639401",
  },
  {
    customer: "EMBASSY OF FRANCE",
    model: "IMC2000",
    serialNo: "3089R920688",
    qNo: "Q16599",
    date: "2021-02-11",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2020-02-11",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC008571",
    address1: "NO: 89,",
    address2: "ROSMEAD PLACE",
    address3: "COLOMBO 07",
    mobile: "0112639401",
  },
  {
    customer: "POLICE SUPPLIES DIVISION",
    model: "M2701",
    serialNo: "3280M130044",
    qNo: "Q16832",
    date: "2023-06-30",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2020-06-30",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC00031",
    address1: "POLICE HEADQUARTERS",
    address2: "2ND FLOOR",
    address3: "COLOMBO 01",
    mobile: "0112421111",
  },
  {
    customer: "ERIN INTERNATIONAL (PVT)LTD",
    model: "M2701",
    serialNo: "3289MC30425",
    qNo: "Q17330",
    date: "2021-10-19",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-09-12",
    maEnd: "2026-09-11",
    installDate: "2020-10-19",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC00541",
    address1: "68",
    address2: "LORENZ ROAD",
    address3: "COLOMBO- 04",
    mobile: "0123456789",
  },
  {
    customer: "BRITISH INSTITUTE OF ENGINEERING AND TECHNOLOGY (PVT) LTD",
    model: "IM2702",
    serialNo: "3299M330053",
    qNo: "Q15735",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-15",
    maEnd: "2026-10-14",
    installDate: "2019-10-07",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC007811",
    address1: "NO:534,GALLE ROAD,",
    address2: "COLOMBO 03.",
    address3: "-",
    mobile: "0112576596",
  },
  {
    customer: "BRITISH INSTITUTE OF ENGINEERING AND TECHNOLOGY (PVT) LTD",
    model: "IM2702",
    serialNo: "3299M330061",
    qNo: "Q15736",
    date: "",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-15",
    maEnd: "2026-10-14",
    installDate: "2019-10-07",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC007811",
    address1: "NO:534,GALLE ROAD,",
    address2: "COLOMBO 03.",
    address3: "-",
    mobile: "0112576596",
  },
  {
    customer: "MINISTRY OF TOURISM & WILDLIFE DIVISION",
    model: "IM2702",
    serialNo: "3299MC30250",
    qNo: "Q17455",
    date: "2022-01-05",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-10-27",
    maEnd: "2026-10-26",
    installDate: "2021-01-05",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC00671",
    address1: "NO:07 HEKTER KOBBAKADUWA MAWATHA",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112381798",
  },
  {
    customer: "MINISTRY OF TOURISM & WILDLIFE DIVISION",
    model: "IM2702",
    serialNo: "3299MC30260",
    qNo: "Q18040",
    date: "2021-12-28",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-12-10",
    maEnd: "2026-12-09",
    installDate: "2020-12-28",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC00671",
    address1: "NO.1090,SRI JAYAWARDENAPURA MW,",
    address2: "RAJAGIRIYA",
    address3: "-",
    mobile: "0112381798",
  },
  {
    customer: "INSTITUTE OF WESTERN MUSIC & SPEECH",
    model: "MP3555",
    serialNo: "C316R306873",
    qNo: "Q19336",
    date: "2024-06-28",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-07-19",
    maEnd: "2026-07-18",
    installDate: "2023-06-28",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC02296",
    address1: "NO:12, KOTHALAWALA GARDEN",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "0112587328",
  },
  {
    customer: "INSTITUTE OF WESTERN MUSIC & SPEECH",
    model: "MP3555",
    serialNo: "C317R473805",
    qNo: "Q19337",
    date: "2024-06-28",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-07-01",
    maEnd: "2026-06-30",
    installDate: "2023-06-28",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC02296",
    address1: "NO:12, KOTHALAWALA GARDEN",
    address2: "COLOMBO 04",
    address3: "-",
    mobile: "0112587328",
  },
  {
    customer: "UNIVERSITY OF COLOMBO-FACULTY OF ARTS",
    model: "MP 3055SP",
    serialNo: "C359P100480",
    qNo: "Q15078",
    date: "2020-05-28",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2019-05-28",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC007195",
    address1: "COLOMBO 03",
    address2: "-",
    address3: "-",
    mobile: "0112058074",
  },
  {
    customer: "UNIVERSITY OF COLOMBO-FACULTY OF ARTS",
    model: "MP 3055SP",
    serialNo: "C359P100487",
    qNo: "Q15079",
    date: "2020-05-28",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2026-01-01",
    maEnd: "2026-12-31",
    installDate: "2019-05-28",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC007195",
    address1: "COLOMBO 03",
    address2: "-",
    address3: "-",
    mobile: "0112058074",
  },
  {
    customer: "SRI LANKA FOUNDATION",
    model: "MP3555",
    serialNo: "C366PB00097",
    qNo: "Q11452",
    date: "2018-03-01",
    techCode: "3092",
    grade: "A",
    team: "COL",
    status: "MA",
    maStart: "2025-07-31",
    maEnd: "2026-07-30",
    installDate: "2017-03-01",
    to: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003862",
    address1: "NO:100,",
    address2: "INDEPENDENCE SQUARE",
    address3: "COLOMBO 07",
    mobile: "0112695249",
  },
];

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

function getTeamFilter(row: MaRecord, filter: string): boolean {
  if (filter === "COL") return row.team === "COL";
  if (filter === "OUT") return row.team === "OUT" || row.team === "P2P OUT";
  if (filter === "SUB") return row.team === "SUB";
  return true;
}

function getTeamLabel(team: string): string {
  if (team === "COL") return "Colombo";
  if (team === "OUT") return "Outstation";
  if (team === "SUB") return "Suburbs";
  return team;
}

const GRADE_STYLE: Record<string, React.CSSProperties> = {
  A: { background: "#c6f6d5", color: "#22543d" },
  E: { background: "#fed7d7", color: "#742a2a" },
  H: { background: "#fefcbf", color: "#744210" },
};

const TYPE_COLORS: Record<string, React.CSSProperties> = {
  MFP: { background: "#e9d8fd", color: "#553c9a" },
  MPC: { background: "#bee3f8", color: "#2a4365" },
  DCP: { background: "#feebc8", color: "#7b341e" },
};

export default function MaBaseReport() {
  const [teamFilter, setTeamFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");
  const PAGE_SIZE = 15;

  const filtered = useMemo<MaRecord[]>(() => {
    return RAW_DATA.filter((row) => {
      const teamOk = teamFilter === "ALL" || getTeamFilter(row, teamFilter);
      const searchOk =
        !search ||
        row.customer.toLowerCase().includes(search.toLowerCase()) ||
        row.qNo.toLowerCase().includes(search.toLowerCase()) ||
        row.technicianName.toLowerCase().includes(search.toLowerCase()) ||
        row.model.toLowerCase().includes(search.toLowerCase());
      const dateOk =
        !dateFilter || (row.maEnd && row.maEnd.startsWith(dateFilter));
      return teamOk && searchOk && dateOk;
    });
  }, [teamFilter, dateFilter, search]);

  const monthlyData = useMemo<number[]>(() => {
    const counts = Array(12).fill(0);
    RAW_DATA.forEach((row) => {
      const teamOk = teamFilter === "ALL" || getTeamFilter(row, teamFilter);
      if (!teamOk || !row.maEnd) return;
      const parts = row.maEnd.split("-");
      if (parts.length >= 2) {
        const m = parseInt(parts[1], 10) - 1;
        if (m >= 0 && m < 12) counts[m]++;
      }
    });
    return counts;
  }, [teamFilter]);

  const maxCount = Math.max(...monthlyData, 1);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExcelDownload = () => {
    const headers = [
      "Customer",
      "Model",
      "Serial No",
      "Q.No",
      "Date",
      "Tech Code",
      "Grade",
      "Team",
      "Status",
      "MA Start",
      "MA End",
      "Install Date",
      "TO",
      "Technician Name",
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
      r.techCode,
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
    a.download = "MA_Base_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePdfDownload = () => {
    const content = `<html><head><style>
      body{font-family:Arial,sans-serif;font-size:8px;}
      h2{font-size:14px;margin-bottom:6px;}
      p{margin:0 0 10px;font-size:11px;color:#555;}
      table{width:100%;border-collapse:collapse;}
      th{background:#0f4c81;color:white;padding:4px 5px;text-align:left;font-size:10px;}
      td{padding:3px 5px;border-bottom:1px solid #eee;}
      tr:nth-child(even){background:#f5f9ff;}
    </style></head><body>
      <h2>MA Base Report — Machine Agreements</h2>
      <p>Team: ${teamFilter === "ALL" ? "All" : getTeamLabel(teamFilter)} &nbsp;|&nbsp; Records: ${filtered.length}</p>
      <table>
        <tr><th>Customer</th><th>Model</th><th>Serial No</th><th>Q.No</th><th>Team</th><th>MA Start</th><th>MA End</th><th>Technician</th><th>Type</th><th>Mobile</th></tr>
        ${filtered.map((r) => `<tr><td>${r.customer}</td><td>${r.model}</td><td>${r.serialNo}</td><td>${r.qNo}</td><td>${r.team}</td><td>${r.maStart || "—"}</td><td>${r.maEnd || "—"}</td><td>${r.technicianName}</td><td>${r.type || "—"}</td><td>${r.mobile}</td></tr>`).join("")}
      </table>
    </body></html>`;
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

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#eef2f8",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f4c81 0%, #1a6dba 100%)",
          padding: "20px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        }}
      >
        <div>
          <div
            style={{
              color: "#90cdf4",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Machine Agreement Report
          </div>
          <h1
            style={{
              color: "white",
              margin: "4px 0 2px",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            MA Base Report
          </h1>
          <div style={{ color: "#bee3f8", fontSize: "12px" }}>
            Status: <strong>MA</strong> &nbsp;·&nbsp; {RAW_DATA.length} total
            agreements
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleExcelDownload}
            style={{
              background: "#21a04a",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "9px 18px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            ⬇ Excel
          </button>
          <button
            onClick={handlePdfDownload}
            style={{
              background: "#d63031",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "9px 18px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            ⬇ PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          background: "white",
          padding: "12px 28px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "1px solid #dde4ef",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
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
          ).map(([val, label]) => (
            <button
              key={val}
              onClick={() => {
                setTeamFilter(val);
                setPage(1);
              }}
              style={{
                padding: "7px 15px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "12px",
                background: teamFilter === val ? "#0f4c81" : "#e8eef6",
                color: teamFilter === val ? "white" : "#4a5568",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "8px",
          }}
        >
          <label style={{ fontSize: "12px", color: "#555", fontWeight: 600 }}>
            MA End:
          </label>
          <input
            type="month"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #c8d5e8",
              borderRadius: "6px",
              padding: "6px 10px",
              fontSize: "12px",
              outline: "none",
              color: "#333",
            }}
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              style={{
                background: "#e53e3e",
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
          placeholder="Search customer, Q.No, technician, model…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            marginLeft: "auto",
            border: "1px solid #c8d5e8",
            borderRadius: "6px",
            padding: "7px 14px",
            fontSize: "12px",
            width: "250px",
            outline: "none",
          }}
        />
        <div
          style={{
            background: "#e8f0fe",
            color: "#0f4c81",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {filtered.length} records
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "white",
          borderBottom: "2px solid #dde4ef",
          padding: "0 28px",
          display: "flex",
        }}
      >
        {(
          [
            ["table", "📋 Report Table"],
            ["chart", "📊 Monthly Chart"],
          ] as ["table" | "chart", string][]
        ).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 22px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13px",
              color: activeTab === tab ? "#0f4c81" : "#888",
              borderBottom:
                activeTab === tab
                  ? "3px solid #0f4c81"
                  : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 28px" }}>
        {/* Chart Tab */}
        {activeTab === "chart" && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px 28px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            }}
          >
            <h3
              style={{
                margin: "0 0 4px",
                color: "#0f4c81",
                fontSize: "17px",
                fontWeight: 700,
              }}
            >
              MA End — Monthly Expiry Count
            </h3>
            <p style={{ margin: "0 0 28px", color: "#888", fontSize: "12px" }}>
              Number of agreements expiring each month based on MA End Date
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                height: "260px",
                paddingBottom: "32px",
                borderBottom: "2px solid #e2e8f0",
                position: "relative",
              }}
            >
              {MONTHS.map((m, i) => {
                const count = monthlyData[i];
                const barH =
                  count === 0 ? 4 : Math.max(22, (count / maxCount) * 220);
                return (
                  <div
                    key={m}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: count > 0 ? "#0f4c81" : "#ddd",
                        minHeight: "16px",
                      }}
                    >
                      {count > 0 ? count : ""}
                    </div>
                    <div
                      title={`${m}: ${count} agreements`}
                      style={{
                        width: "100%",
                        height: `${barH}px`,
                        background:
                          count > 0
                            ? "linear-gradient(180deg, #4dabf7 0%, #0f4c81 100%)"
                            : "#e8eef6",
                        borderRadius: "5px 5px 0 0",
                        transition: "height 0.4s ease",
                        cursor: count > 0 ? "default" : "default",
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
                    color: "#777",
                    fontWeight: 600,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "22px",
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
                      style={{
                        background: "#e8f0fe",
                        borderRadius: "8px",
                        padding: "7px 14px",
                        fontSize: "12px",
                        border: "1px solid #c3d5f5",
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#0f4c81" }}>
                        {m}:
                      </span>{" "}
                      <span style={{ color: "#333" }}>
                        {monthlyData[i]} expiries
                      </span>
                    </div>
                  ),
              )}
              {monthlyData.every((c) => c === 0) && (
                <span style={{ color: "#aaa", fontSize: "13px" }}>
                  No data for current filter.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Table Tab */}
        {activeTab === "table" && (
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
                  fontSize: "12px",
                  minWidth: "1150px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #0f4c81, #1a6dba)",
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
                      "Status",
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
                          padding: "10px 9px",
                          color: "white",
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
                  {pageData.map((row, i) => {
                    const idx = (page - 1) * PAGE_SIZE + i + 1;
                    const addr = [row.address1, row.address2, row.address3]
                      .filter((a) => a && a !== "-")
                      .join(", ");
                    const gradeStyle = GRADE_STYLE[row.grade] ?? {
                      background: "#e2e8f0",
                      color: "#4a5568",
                    };
                    const typeStyle = TYPE_COLORS[row.type] ?? {
                      background: "#e2e8f0",
                      color: "#4a5568",
                    };
                    return (
                      <tr
                        key={`${row.qNo}-${i}`}
                        style={{
                          background: i % 2 === 0 ? "white" : "#f5f9ff",
                          borderBottom: "1px solid #edf2f7",
                        }}
                      >
                        <td
                          style={{
                            padding: "8px 9px",
                            color: "#a0aec0",
                            fontWeight: 700,
                            fontSize: "11px",
                          }}
                        >
                          {idx}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            fontWeight: 600,
                            color: "#2d3748",
                            maxWidth: "180px",
                          }}
                        >
                          {row.customer}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            color: "#4a5568",
                            whiteSpace: "nowrap",
                            fontSize: "11px",
                          }}
                        >
                          {row.model}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            color: "#718096",
                            fontSize: "10px",
                            fontFamily: "monospace",
                          }}
                        >
                          {row.serialNo}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            color: "#2b6cb0",
                            fontWeight: 700,
                          }}
                        >
                          {row.qNo}
                        </td>
                        <td style={{ padding: "8px 9px" }}>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "10px",
                              fontWeight: 700,
                              background:
                                row.team === "COL"
                                  ? "#ebf8ff"
                                  : row.team === "SUB"
                                    ? "#fef3c7"
                                    : "#f0fff4",
                              color:
                                row.team === "COL"
                                  ? "#2b6cb0"
                                  : row.team === "SUB"
                                    ? "#92400e"
                                    : "#276749",
                            }}
                          >
                            {row.team}
                          </span>
                        </td>
                        <td style={{ padding: "8px 9px", textAlign: "center" }}>
                          {row.grade ? (
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "10px",
                                fontSize: "10px",
                                fontWeight: 700,
                                ...gradeStyle,
                              }}
                            >
                              {row.grade}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "8px 9px" }}>
                          <span
                            style={{
                              background: "#c6f6d5",
                              color: "#22543d",
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            fontSize: "11px",
                            color: "#555",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.maStart || "—"}
                        </td>
                        <td
                          style={{ padding: "8px 9px", whiteSpace: "nowrap" }}
                        >
                          {row.maEnd ? (
                            <span
                              style={{
                                color: "#0f4c81",
                                fontWeight: 700,
                                fontSize: "11px",
                              }}
                            >
                              {row.maEnd}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            fontSize: "11px",
                            color: "#718096",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.installDate || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            color: "#4a5568",
                            whiteSpace: "nowrap",
                            fontSize: "11px",
                          }}
                        >
                          {row.technicianName || "—"}
                        </td>
                        <td style={{ padding: "8px 9px" }}>
                          {row.type ? (
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: 700,
                                ...typeStyle,
                              }}
                            >
                              {row.type}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            fontSize: "10px",
                            color: "#888",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.mInvNo || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            fontSize: "11px",
                            color: "#555",
                            maxWidth: "160px",
                          }}
                        >
                          {addr}
                        </td>
                        <td
                          style={{
                            padding: "8px 9px",
                            fontSize: "11px",
                            color: "#2b6cb0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.mobile && row.mobile !== "-" ? row.mobile : "—"}
                        </td>
                      </tr>
                    );
                  })}
                  {pageData.length === 0 && (
                    <tr>
                      <td
                        colSpan={16}
                        style={{
                          padding: "50px",
                          textAlign: "center",
                          color: "#aaa",
                          fontSize: "14px",
                        }}
                      >
                        No records found for current filters.
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
                  padding: "14px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #edf2f7",
                  background: "#fafbfc",
                }}
              >
                <span style={{ fontSize: "12px", color: "#666" }}>
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length}
                </span>
                <div style={{ display: "flex", gap: "6px" }}>
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
                      fontWeight: 600,
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
                        background: p === page ? "#0f4c81" : "white",
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
                      fontWeight: 600,
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

      {/* Footer note */}
      <div
        style={{ padding: "6px 28px 20px", fontSize: "11px", color: "#999" }}
      >
        MA End Date is used for monthly chart &nbsp;|&nbsp; Grade: A = Active, E
        = Expired, H = Hold &nbsp;|&nbsp; Excel exports as CSV
      </div>
    </div>
  );
}
