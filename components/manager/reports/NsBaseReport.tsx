import React, { useState, useMemo } from "react";

const RAW_DATA = [
  {
    customer: "DMS GROUP OF COMPANIES",
    model: "MP 2014AD",
    serialNo: "G634ZB60353",
    qNo: "Q20461",
    warrantyEndDate: "2026-03-04",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-04",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "NO:221/5 , DHARMAPALA MW,",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "773034410",
  },
  {
    customer: "SRI LANKA COLLEGE OF PSYCHIATRISTS",
    model: "MP 2014D",
    serialNo: "G639M240094",
    qNo: "Q15447",
    warrantyEndDate: "",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-07",
    maEnd: "2026-03-06",
    installDate: "2019-08-22",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC007625",
    address1: "NO.06,WIJERAMA MAWATHA,",
    address2: "COLOMBO 07.",
    address3: "-",
    mobile: "0718270962",
  },
  {
    customer: "THE SURVEYOR INSTITUTE OF SRI LANKA",
    model: "MP 2014D",
    serialNo: "G638M540085",
    qNo: "Q13655",
    warrantyEndDate: "",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2018-08-29",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006156",
    address1: "NO: 275/75,",
    address2: "PROF. STANLEY WIJESUNDARA MW,",
    address3: "COLOMBO 07",
    mobile: "0112580669",
  },
  {
    customer: "VARNERS",
    model: "MPC2004SP",
    serialNo: "G746RC50405",
    qNo: "Q11636",
    warrantyEndDate: "",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-02",
    maEnd: "2026-03-01",
    installDate: "2017-03-28",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC003979",
    address1: "LEVEL 14, WEST TOWER",
    address2: "WORLD TRADE CENTRE",
    address3: "COLOMBO 01",
    mobile: "0115544711",
  },
  {
    customer: "DATA MANAGEMENT SYSTEMS (PVT) LTD",
    model: "M2700",
    serialNo: "3270M330006",
    qNo: "Q17646",
    warrantyEndDate: "2022-03-08",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-08",
    maEnd: "2026-03-07",
    installDate: "2021-03-08",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC00861",
    address1: "DIVISION 01",
    address2: "165/3, DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112685086",
  },
  {
    customer: "SRI LANKA LIBRARY ASSOCIATION",
    model: "M2701",
    serialNo: "3283ZA30020",
    qNo: "Q19649",
    warrantyEndDate: "2025-03-01",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-02",
    maEnd: "2026-03-01",
    installDate: "2024-03-01",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02744",
    address1: "275/75 OPA CENTER",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "HOLY FAMILY CONVENT",
    model: "4450",
    serialNo: "D224Z300033",
    qNo: "Q6263",
    warrantyEndDate: "",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2017-04-30",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC 72027",
    address1: "COLOMBO 04",
    address2: "-",
    address3: "-",
    mobile: "0112587261",
  },
  {
    customer: "DATA MANAGEMENT SYSTEMS (PVT) LTD",
    model: "MP2001L",
    serialNo: "E344M152034",
    qNo: "Q6252",
    warrantyEndDate: "",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-08",
    maEnd: "2026-03-07",
    installDate: "2017-02-15",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 71979",
    address1: "DIVISION 01",
    address2: "165/3, DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0112685086",
  },
  {
    customer: "SRI LANKA GIRL GUIDES ASSOCATION",
    model: "MP2001L",
    serialNo: "E344MC51243",
    qNo: "Q8051",
    warrantyEndDate: "",
    mainTechCode: "3092",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-09",
    maEnd: "2026-03-08",
    installDate: "2017-06-10",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC00703",
    address1: "NO:10, SIE MARCUS FERNANDO MAWATHA,",
    address2: "COLOMBO 07",
    address3: "-",
    mobile: "0112695720",
  },
  {
    customer: "SANTHOSHI S. HEART ASSOCIATES",
    model: "MP 2014",
    serialNo: "G607M750017",
    qNo: "Q12688",
    warrantyEndDate: "",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2017-11-17",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC004765",
    address1: "NO : 30,2/1, WILSON STREET,",
    address2: "COLOMBO 12",
    address3: "-",
    mobile: "0112473331",
  },
  {
    customer: "ST.JOSEPH BALIKA VIDYALALA",
    model: "DD4450",
    serialNo: "D226Z100068",
    qNo: "Q9557",
    warrantyEndDate: "",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-02",
    maEnd: "2026-03-01",
    installDate: "2016-05-17",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC002067",
    address1: "COLOMBO 14",
    address2: "-",
    address3: "-",
    mobile: "0779097182",
  },
  {
    customer: "ADVANCED TECHNOLOGICAL INSTITUTE",
    model: "BPS 550",
    serialNo: "5502112098",
    qNo: "Q18735",
    warrantyEndDate: "",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-08",
    maEnd: "2026-03-07",
    installDate: "2022-03-08",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "",
    type: "DCP",
    mInvNo: "MC01705",
    address1: "NO.42,",
    address2: "RODRIGO PLACE",
    address3: "COLOMBO 15",
    mobile: "0112521152",
  },
  {
    customer: "LUXHMI IMPEX",
    model: "IMC2000",
    serialNo: "3080RA20035",
    qNo: "Q17470",
    warrantyEndDate: "2021-12-31",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2020-12-31",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC00703",
    address1: "NO.167/M2  M FLOOR",
    address2: "SRI BANDARANAYAKE MW,",
    address3: "COLOMBO 12",
    mobile: "0123456789",
  },
  {
    customer: "UKAAYE CARD (PVT) LTD",
    model: "IMC2000",
    serialNo: "3080RC20423",
    qNo: "Q17656",
    warrantyEndDate: "2022-03-15",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2021-03-15",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC00875",
    address1: "NO:333,",
    address2: "SEA STREET,",
    address3: "COLOMBO 11",
    mobile: "0112433573",
  },
  {
    customer: "JUBILEE AGENCIES (PVT) LTD",
    model: "MP 2014D",
    serialNo: "G631M240179",
    qNo: "Q18672",
    warrantyEndDate: "",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-03",
    maEnd: "2026-03-02",
    installDate: "2022-03-02",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01722",
    address1: "NO: 104",
    address2: "3RD CROSS STREET",
    address3: "COLOMBO 11",
    mobile: "0112389745",
  },
  {
    customer: "ST ANTHONY'S T.M.V",
    model: "MP2014D",
    serialNo: "G633ZC60343",
    qNo: "Q19762",
    warrantyEndDate: "2025-03-15",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2024-03-15",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02936",
    address1: "COLOMBO 14",
    address2: "MAHAWATHTHA ROAD",
    address3: "COLOMBO 14",
    mobile: "-",
  },
  {
    customer: "BARTLEET PRODUCE MARKETING (PVT) LTD",
    model: "MP1800L2",
    serialNo: "L6917051427",
    qNo: "Q4454",
    warrantyEndDate: "",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2017-03-15",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC 31241",
    address1: "211/10, VELUVARANA PLACE",
    address2: "DEMATAGODA",
    address3: "COLOMBO 09",
    mobile: "0112681400",
  },
  {
    customer: "SRI LANKA RAILWAYS MOTIVE POWER CHIEF ENGINEERS OFFICE",
    model: "DX2430",
    serialNo: "N9200870071",
    qNo: "Q4045",
    warrantyEndDate: "",
    mainTechCode: "3127",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2016-09-01",
    techCode: "3127",
    technicianName: "FAZLAN AMEEN",
    visitCode: "",
    type: "DCP",
    mInvNo: "MC 30448",
    address1: "NO:575,",
    address2: "BASE LINE ROAD,",
    address3: "DEMATAGODA",
    mobile: "0112691003",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP2501SP",
    serialNo: "E337M250055",
    qNo: "Q12009",
    warrantyEndDate: "",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2017-07-05",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC004312",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP2501SP",
    serialNo: "E337M450096",
    qNo: "Q12365",
    warrantyEndDate: "",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2017-09-08",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC004698",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP2501SP",
    serialNo: "E335MB50276",
    qNo: "Q9123",
    warrantyEndDate: "",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2017-03-31",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC001708",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP2501SP",
    serialNo: "E335MC50937",
    qNo: "Q9119",
    warrantyEndDate: "",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2017-03-31",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC001708",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP2501SP",
    serialNo: "E335MB50070",
    qNo: "Q9122",
    warrantyEndDate: "",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2017-03-31",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC001708",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP2501SP",
    serialNo: "E335MB50050",
    qNo: "Q9120",
    warrantyEndDate: "",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2017-03-31",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC001708",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "MINISTRY OF PORTS AND SHIPPING",
    model: "MP4055",
    serialNo: "C378P500153",
    qNo: "Q13609",
    warrantyEndDate: "2019-08-08",
    mainTechCode: "3157",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2018-08-08",
    techCode: "3157",
    technicianName: "DAKSHINA PRABATH",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006091",
    address1: "NO. 19,",
    address2: "CHAITHYA ROAD,",
    address3: "COLOMBO 01",
    mobile: "0112320252",
  },
  {
    customer: "JOINT APPAREL ASSOCIATION",
    model: "MP 2014D",
    serialNo: "G634ZB60235",
    qNo: "Q20482",
    warrantyEndDate: "2026-03-14",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-14",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "NO:107,",
    address2: "HUNUPITIYA LAKE ROAD,",
    address3: "COLOMBO 02",
    mobile: "0710337765",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50080",
    qNo: "Q14384",
    warrantyEndDate: "",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-02-14",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "ZONAL EDUCATION OFFICE COLOMBO WESTERN PROVINCE",
    model: "MP2001L",
    serialNo: "E343MA50040",
    qNo: "Q5846",
    warrantyEndDate: "",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-05",
    maEnd: "2026-03-04",
    installDate: "2016-12-22",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 71426",
    address1: "03RD FLOOR, SRI SARIPUTHTHA",
    address2: "M.V.BUILDING , VITHANAGE MAWATHA",
    address3: "COLOMBO 02",
    mobile: "0112320458",
  },
  {
    customer: "SHARAF SHIPPING AGENCY (PVT) LTD",
    model: "MP2501SP",
    serialNo: "E336M850208",
    qNo: "Q10645",
    warrantyEndDate: "",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2016-11-18",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC003194",
    address1: "NORTH WING,1 ST FLOOR,SAYURA SAVANA BUILDING",
    address2: "NO: 46/12, NAWAM MAWATHA,",
    address3: "COLOMBO 02",
    mobile: "0112344565",
  },
  {
    customer: "DIAMOND SHIPPING SERVICES (PVT) LTD",
    model: "M2701",
    serialNo: "3281M830022",
    qNo: "Q19158",
    warrantyEndDate: "2024-03-03",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2023-03-03",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02158",
    address1: "NORTH WING,1 ST FLOOR,SAYURA SAVANA BUILDING",
    address2: "NO: 46/12, NAWAM MAWATHA",
    address3: "COLOMBO 02",
    mobile: "0112339556",
  },
  {
    customer: "SHARAF SHIPPING AGENCY (PVT) LTD",
    model: "M2701",
    serialNo: "3281M730481",
    qNo: "Q19157",
    warrantyEndDate: "2024-03-03",
    mainTechCode: "4043",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2023-03-03",
    techCode: "3152",
    technicianName: "DINESH SANJEEWA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02159",
    address1: "NORTH WING,1 ST FLOOR,SAYURA SAVANA BUILDING",
    address2: "NO: 46/12, NAWAM MAWATHA,",
    address3: "COLOMBO 02",
    mobile: "0112339556",
  },
  {
    customer: "COLOMBO  MUNICIPAL COUNCIL",
    model: "MP2501SP",
    serialNo: "E337M850358",
    qNo: "Q12904",
    warrantyEndDate: "",
    mainTechCode: "8028",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-07",
    maEnd: "2026-03-06",
    installDate: "2018-12-13",
    techCode: "8028",
    technicianName: "DAMITH SANJAYA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC005207",
    address1: "PUBLIC HELTH DEPARTMENT",
    address2: "TOWN HALL DHARMAPALA MAWATHA",
    address3: "COLOMBO 07",
    mobile: "0705052729",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50087",
    qNo: "Q14380",
    warrantyEndDate: "",
    mainTechCode: "8057",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-01-02",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50019",
    qNo: "Q14407",
    warrantyEndDate: "",
    mainTechCode: "8057",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-01-31",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50119",
    qNo: "Q14383",
    warrantyEndDate: "",
    mainTechCode: "8057",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-02-12",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MB50274",
    qNo: "Q14690",
    warrantyEndDate: "",
    mainTechCode: "8057",
    grade: "A",
    team: "COL",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-03-06",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006796",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  // OUT entries
  {
    customer: "NATURAL RESOURCES MANAGEMENT CENTER",
    model: "MP 2014D",
    serialNo: "G637M340107",
    qNo: "Q98580",
    warrantyEndDate: "",
    mainTechCode: "1024",
    grade: "E",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-02-02",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "-",
    address1: "PERADENIYA",
    address2: "-",
    address3: "-",
    mobile: "0812388155",
  },
  {
    customer: "K / TALATUOYA T.M.V",
    model: "MP 2014D",
    serialNo: "G635MB40903",
    qNo: "Q9617",
    warrantyEndDate: "",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-18",
    maEnd: "2026-03-17",
    installDate: "2016-04-06",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC002163",
    address1: "TALATUOYA",
    address2: "-",
    address3: "-",
    mobile: "0812404264",
  },
  {
    customer: "MR.PERERA",
    model: "MP 2014D",
    serialNo: "G634ZB60310",
    qNo: "Q20483",
    warrantyEndDate: "2026-03-17",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-17",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "PASALA IDIRIPITA",
    address2: "BOGAHALANDA",
    address3: "ADIKARIGAMA",
    mobile: "0779803499",
  },
  {
    customer: "W.M.M.C.RUSHANI",
    model: "MP 2014D",
    serialNo: "G634Z960100",
    qNo: "Q20356",
    warrantyEndDate: "2026-03-01",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-01",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "NO: 97 NEW,",
    address2: "HOSPITAL ROAD,",
    address3: "GALAHA",
    mobile: "0775044457",
  },
  {
    customer: "RANDENIGALA POWER STATION",
    model: "MP2501SP",
    serialNo: "E336MB50045",
    qNo: "Q10557",
    warrantyEndDate: "",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-18",
    maEnd: "2026-03-17",
    installDate: "2017-05-03",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003488",
    address1: "RANDENIGALA",
    address2: "-",
    address3: "-",
    mobile: "0554929011",
  },
  {
    customer: "DIVINEGUMA DIVISIONAL SECRETARY OFFICE",
    model: "MP 2014",
    serialNo: "G606M550294",
    qNo: "Q10716",
    warrantyEndDate: "2017-12-20",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-18",
    maEnd: "2026-03-17",
    installDate: "2016-12-20",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC002914",
    address1: "WALAPANE",
    address2: "NILDANDAHINNA",
    address3: "-",
    mobile: "0710476751",
  },
  {
    customer: "DANTHURE CENTRAL COLLAGE",
    model: "M2701",
    serialNo: "3281M730652",
    qNo: "Q18739",
    warrantyEndDate: "2024-03-09",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2022-03-09",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01570",
    address1: "DANTHURE",
    address2: "PILIMATHALAWA",
    address3: "-",
    mobile: "0701589957",
  },
  {
    customer: "MAHA/GAM/NILLAMBA MAHA VIDYALAYA",
    model: "M2701",
    serialNo: "3281M730684",
    qNo: "Q18506",
    warrantyEndDate: "2024-02-10",
    mainTechCode: "1024",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-18",
    maEnd: "2026-03-17",
    installDate: "2022-02-10",
    techCode: "1024",
    technicianName: "E.M.LAKSHMAN",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC01570",
    address1: "NILLAMBA",
    address2: "-",
    address3: "-",
    mobile: "0766296044",
  },
  {
    customer: "KITHSEWANA",
    model: "MP 2014D",
    serialNo: "G638M840129",
    qNo: "Q14256",
    warrantyEndDate: "2019-11-26",
    mainTechCode: "3107",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2018-11-26",
    techCode: "3107",
    technicianName: "GAYAN ASIRI",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006519",
    address1: "PAHARIYA,",
    address2: "ANURADHAPURA",
    address3: "-",
    mobile: "0763803500",
  },
  {
    customer: "SAMANTHIKA BOOK SHOP",
    model: "MP 2014D",
    serialNo: "G634Z260229",
    qNo: "Q20169",
    warrantyEndDate: "2026-03-03",
    mainTechCode: "3123",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-03",
    techCode: "3123",
    technicianName: "SOBAN N.",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "MAIN STREET",
    address2: "KANTALE",
    address3: "TRINCOMALEE",
    mobile: "0715938098",
  },
  {
    customer: "SANTA BOOKSHOP AND COMMIUNICATION",
    model: "MP2014D",
    serialNo: "G633ZA60072",
    qNo: "Q19793",
    warrantyEndDate: "2024-12-27",
    mainTechCode: "3123",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-18",
    maEnd: "2026-03-17",
    installDate: "2023-12-27",
    techCode: "3123",
    technicianName: "SOBAN N.",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02780",
    address1: "NO 330/3 JAYANTHIPURA KANALA,",
    address2: "KANTHALE",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "PRIMA (CEYLON) LTD",
    model: "DX2430",
    serialNo: "D218Z500015",
    qNo: "Q14826",
    warrantyEndDate: "",
    mainTechCode: "3123",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2019-02-25",
    techCode: "3123",
    technicianName: "SOBAN",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC006952",
    address1: "NO:50, SRI JAYAWARDHANAPURA",
    address2: "PARLIMENT ROAD,",
    address3: "RAJAGIRIYA",
    mobile: "0262233202",
  },
  {
    customer: "BT/BW/KARAIYAKKANTHIVU GANESHER VIDYALAYA",
    model: "MP 2014D",
    serialNo: "G634ZA60170",
    qNo: "Q20454",
    warrantyEndDate: "2026-03-03",
    mainTechCode: "3129",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-03",
    techCode: "3129",
    technicianName: "J.S.RUSHANTH",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "KANNANKUDAH",
    address2: "-",
    address3: "-",
    mobile: "0778267702",
  },
  {
    customer: "KM / SWAMY VIPULANANDA VIDYALAYAM",
    model: "MP 2014",
    serialNo: "G606MA50269",
    qNo: "Q11847",
    warrantyEndDate: "2018-07-08",
    mainTechCode: "3129",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2017-07-08",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC004241",
    address1: "MANALCHENAI",
    address2: "KALMUNAI",
    address3: "-",
    mobile: "0774075211",
  },
  {
    customer: "KM / ST / SARASWATHY VIDYALAYAM",
    model: "MP 2014",
    serialNo: "G607M750019",
    qNo: "Q12364",
    warrantyEndDate: "2018-10-01",
    mainTechCode: "3129",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2017-10-01",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC004678",
    address1: "UNIT 13",
    address2: "CENTRAL CAMP",
    address3: "KALMUNAI",
    mobile: "0779928979",
  },
  {
    customer: "SEED & PLANTING METERIAL DEVELOPMENT CENTRE",
    model: "MP 2014D",
    serialNo: "G636M940128",
    qNo: "Q10719",
    warrantyEndDate: "2017-12-16",
    mainTechCode: "3135",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-12",
    maEnd: "2026-03-11",
    installDate: "2016-12-16",
    techCode: "3135",
    technicianName: "A.KIRIYUTHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC003259",
    address1: "DEPARTMENT OF AGRICULTURE",
    address2: "OLD GALAHA RD,",
    address3: "PERADENIYA",
    mobile: "081-2388100",
  },
  {
    customer: "KIRAN CENTRAL COLLAGE",
    model: "MP 2014AD",
    serialNo: "G610MB50272",
    qNo: "Q17826",
    warrantyEndDate: "2023-01-11",
    mainTechCode: "3135",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-12",
    maEnd: "2026-03-11",
    installDate: "2022-01-11",
    techCode: "3135",
    technicianName: "A.KIRIYUTHAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01185",
    address1: "MARKET ROAD",
    address2: "KIRAM",
    address3: "VALAIDENAN",
    mobile: "0773821575",
  },
  {
    customer: "WAYAMBA CO-OPERATIVE RURAL BANK",
    model: "IMC2000",
    serialNo: "3081R220242",
    qNo: "Q18564",
    warrantyEndDate: "2023-01-31",
    mainTechCode: "3136",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-11",
    maEnd: "2026-03-10",
    installDate: "2022-01-31",
    techCode: "3136",
    technicianName: "MALITH SAMEERA",
    visitCode: "-",
    type: "MPC",
    mInvNo: "MC01558",
    address1: "NO-107",
    address2: "DAMBULLA ROAD",
    address3: "KURUNEGALA",
    mobile: "0372226191",
  },
  {
    customer: "CP/MURUDDENIYA MAHA VIDYALAYA",
    model: "MP 2014D",
    serialNo: "G634ZA60156",
    qNo: "Q20456",
    warrantyEndDate: "2026-03-05",
    mainTechCode: "3138",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-05",
    techCode: "3138",
    technicianName: "W.G.RUMESH",
    visitCode: "LMV",
    type: "MFP",
    mInvNo: "",
    address1: "-",
    address2: "-",
    address3: "-",
    mobile: "0714901446",
  },
  {
    customer: "NATIONAL PEOPLE'S POWER OFFICE",
    model: "MP 2014D",
    serialNo: "G634Z960056",
    qNo: "Q20307",
    warrantyEndDate: "2026-03-05",
    mainTechCode: "3154",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-05",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "URUMPIRAI ROAD,",
    address2: "KOPAY JUNCTION,",
    address3: "KOPAY",
    mobile: "0777539863",
  },
  {
    customer: "J / THONDAIMANARU VEERAGATHIPILLAI M.V",
    model: "MP 2014D",
    serialNo: "G634Z160122",
    qNo: "Q20160",
    warrantyEndDate: "2026-03-10",
    mainTechCode: "3154",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-10",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "THONDAIMANARU,",
    address2: "JAFFNA",
    address3: "-",
    mobile: "021-2055601",
  },
  {
    customer: "J/CHUNNAKAM NAGESWARY VIDYASALAI",
    model: "MP 2014D",
    serialNo: "G634Z260228",
    qNo: "Q20163",
    warrantyEndDate: "2026-03-14",
    mainTechCode: "3154",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-14",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "CHUNNAKAM WEST,",
    address2: "CHUNNAKAM",
    address3: "-",
    mobile: "0779269929",
  },
  {
    customer: "GURU PRINTERS",
    model: "MP3555",
    serialNo: "C317R346023",
    qNo: "Q21091",
    warrantyEndDate: "2026-03-17",
    mainTechCode: "3154",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-17",
    techCode: "3154",
    technicianName: "ARUNRAJ JEYASINGH",
    visitCode: "",
    type: "",
    mInvNo: "0",
    address1: "KONDAVIL",
    address2: "IRUPALAI JUNCTION",
    address3: "KOPAY",
    mobile: "0212214777",
  },
  {
    customer: "DEPARTMENT OF AGRICULTURE",
    model: "MP 2014",
    serialNo: "G606M251855",
    qNo: "Q10139",
    warrantyEndDate: "",
    mainTechCode: "3159",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-08",
    maEnd: "2026-03-07",
    installDate: "2017-09-27",
    techCode: "3185",
    technicianName: "THARINDU THATHSARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC002595",
    address1: "CHIEF ENGINEER'S OFFICE",
    address2: "P.O.BOX 8,",
    address3: "PERADENIYA",
    mobile: "0812388331",
  },
  {
    customer: "DIVISIONAL SECRETARIAT",
    model: "MP2014D",
    serialNo: "G636MB40507",
    qNo: "Q98983",
    warrantyEndDate: "",
    mainTechCode: "3161",
    grade: "E",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-16",
    maEnd: "2026-03-15",
    installDate: "2014-01-01",
    techCode: "3161",
    technicianName: "AMAL DINESH GODKUMBURA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "DIRECT-EWIS",
    address1: "DOLUWA",
    address2: "-",
    address3: "-",
    mobile: "0772691989",
  },
  {
    customer: "CP/HZ/KUILWATTE TAMIL MAHA VIDYALAYA",
    model: "MP 2014D",
    serialNo: "G631M540168",
    qNo: "Q18546",
    warrantyEndDate: "",
    mainTechCode: "3161",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-17",
    maEnd: "2026-03-16",
    installDate: "2022-02-03",
    techCode: "3161",
    technicianName: "AMAL DINESH GODKUMBURA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01583",
    address1: "ROZELLA",
    address2: "HATTON",
    address3: "-",
    mobile: "0776070925",
  },
  {
    customer: "PUDALUOYA TAMIL VIDYALAYA",
    model: "M2701",
    serialNo: "3281M730753",
    qNo: "Q18492",
    warrantyEndDate: "2026-03-07",
    mainTechCode: "3161",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2024-03-07",
    techCode: "3161",
    technicianName: "AMAL DINESH GODKUMBURA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC01570",
    address1: "PUDALUOYA",
    address2: "-",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "DEPARTMENT OF AGRICULTURE  ENGINEERING",
    model: "MP 2014D",
    serialNo: "G639M640008",
    qNo: "Q16241",
    warrantyEndDate: "2021-01-16",
    mainTechCode: "3162",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-18",
    maEnd: "2026-03-17",
    installDate: "2020-01-16",
    techCode: "3162",
    technicianName: "MAHINDA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC008198",
    address1: "DIVISION,BEE KEEPING UNIT",
    address2: "BINDUNUWEWA,",
    address3: "BANDARAWELA",
    mobile: "081-2388268",
  },
  {
    customer: "KM / ST / NAMAGAL VIDYALAYA",
    model: "MP 2014D",
    serialNo: "G637M340063",
    qNo: "Q11721",
    warrantyEndDate: "2018-06-07",
    mainTechCode: "3167",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2017-06-07",
    techCode: "3167",
    technicianName: "NIRUSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC004104",
    address1: "UNIT 07, NAVITHANVELY",
    address2: "-",
    address3: "-",
    mobile: "0767225255",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50108",
    qNo: "Q14379",
    warrantyEndDate: "",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-02-12",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "REWATHA  VIDYALAYA",
    model: "MP2501SP",
    serialNo: "E335MB50159",
    qNo: "Q9158",
    warrantyEndDate: "2018-02-23",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2017-02-23",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC001707",
    address1: "BALAPITIYA",
    address2: "-",
    address3: "-",
    mobile: "0912258243",
  },
  {
    customer: "POLICE HEAD QUARTERS",
    model: "MP 2014AD",
    serialNo: "G617M250241",
    qNo: "Q11571",
    warrantyEndDate: "",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2017-11-20",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003954",
    address1: "COLOMBO 01",
    address2: "-",
    address3: "-",
    mobile: "0112621667",
  },
  {
    customer: "SENIOR SUPERINTENDENT OF POLICE",
    model: "MP 2014AD",
    serialNo: "G617M250226",
    qNo: "Q11593",
    warrantyEndDate: "",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2017-06-29",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC003954",
    address1: "DIRECTOR SRI LANKA POLICE COLLEGE,",
    address2: "KALUTARA",
    address3: "-",
    mobile: "0342222421",
  },
  {
    customer: "POLICE HEAD QUARTERS",
    model: "MP 2014AD",
    serialNo: "G616MB50233",
    qNo: "Q11616",
    warrantyEndDate: "2018-11-06",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2017-11-06",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003954",
    address1: "COLOMBO 01",
    address2: "-",
    address3: "-",
    mobile: "0112344846",
  },
  {
    customer: "WP / KL / BANDARANAYAKA MAHA VIDYALAYA",
    model: "MP 2014AD",
    serialNo: "G616MB50197",
    qNo: "Q10843",
    warrantyEndDate: "",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2017-01-03",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC003375",
    address1: "PAYAGALA",
    address2: "-",
    address3: "-",
    mobile: "0342226160",
  },
  {
    customer: "POLICE SUPPLIES DIVISION",
    model: "M2701",
    serialNo: "3289MC30182",
    qNo: "Q16855",
    warrantyEndDate: "2021-11-30",
    mainTechCode: "3168",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2020-11-30",
    techCode: "3168",
    technicianName: "VISHARA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC00031",
    address1: "POLICE HEADQUARTERS",
    address2: "2ND FLOOR",
    address3: "COLOMBO 01",
    mobile: "0112421111",
  },
  {
    customer: "MR.P.B.I.A.K.DAYASIRI",
    model: "MP 2014D",
    serialNo: "G630MC40193",
    qNo: "Q17761",
    warrantyEndDate: "2026-03-06",
    mainTechCode: "3174",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-06",
    techCode: "3191",
    technicianName: "PRADEEP SAMPATH",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC01014",
    address1: "NO:197,",
    address2: "RATHNAPURA ROAD,",
    address3: "RILHENA, PELMADULLA",
    mobile: "0718738854",
  },
  {
    customer: "MR R.G.SUSANTHA",
    model: "MP2014D",
    serialNo: "G632ZC60080",
    qNo: "Q19238",
    warrantyEndDate: "2025-03-14",
    mainTechCode: "3176",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2024-03-14",
    techCode: "3184",
    technicianName: "DARSHANA RUKSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02227",
    address1: "NO 39 SHANTHIPURA",
    address2: "LAKSHAVYANA",
    address3: "POLONNARUWA",
    mobile: "-",
  },
  {
    customer: "MR.RANGA DILEEPA",
    model: "MP 2014D",
    serialNo: "G634ZB60314",
    qNo: "Q20470",
    warrantyEndDate: "2026-03-12",
    mainTechCode: "3176",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-12",
    techCode: "3184",
    technicianName: "DARSHANA RUKSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "",
    address1: "COOP MEEGOLLEWA",
    address2: "TRACK 09",
    address3: "MEDIRIGIRIYA",
    mobile: "0740471036",
  },
  {
    customer: "REGIONAL DIRECTOR OF HEALTH SERVICES",
    model: "MP 2014",
    serialNo: "G600M950039",
    qNo: "Q17955",
    warrantyEndDate: "2022-10-13",
    mainTechCode: "3177",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-14",
    maEnd: "2026-03-13",
    installDate: "2021-10-13",
    techCode: "3177",
    technicianName: "RASITHA PERERA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC01211",
    address1: "KEGALLE",
    address2: "-",
    address3: "-",
    mobile: "0352222549",
  },
  {
    customer: "RITZ CLOTHING YAPAHUWA (PVT)LTD",
    model: "MP 2014D",
    serialNo: "G630MA40053",
    qNo: "Q17676",
    warrantyEndDate: "",
    mainTechCode: "3180",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-12",
    maEnd: "2026-03-11",
    installDate: "2021-03-22",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC00910",
    address1: "ANURADHAPURA ROAD",
    address2: "UDUWERIYA",
    address3: "YAPAHUWWA",
    mobile: "0768033370",
  },
  {
    customer: "D.M.GUNATHILAKA",
    model: "MP2014D",
    serialNo: "G633Z960094",
    qNo: "Q19590",
    warrantyEndDate: "2025-03-05",
    mainTechCode: "3180",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-06",
    maEnd: "2026-03-05",
    installDate: "2024-03-05",
    techCode: "3180",
    technicianName: "HARSHA MALSHAN",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02690",
    address1: "NANNERIYA",
    address2: "NAWAGATHEGAMA",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "WELCOME  CREATION",
    model: "4450",
    serialNo: "D224Z400086",
    qNo: "Q6425",
    warrantyEndDate: "2015-06-30",
    mainTechCode: "3188",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-04",
    maEnd: "2026-03-03",
    installDate: "2014-06-30",
    techCode: "3188",
    technicianName: "DULANJA NIROSHAN",
    visitCode: "",
    type: "DCP",
    mInvNo: "MC 72317",
    address1: "NO;16/ 25",
    address2: "MASJITH ROAD,",
    address3: "PUTTLAM",
    mobile: "0714867165",
  },
  {
    customer: "ST.BENEDICT COLLEGE",
    model: "DX2430",
    serialNo: "D217Z300820",
    qNo: "Q12006",
    warrantyEndDate: "2018-07-03",
    mainTechCode: "3188",
    grade: "A",
    team: "OUT",
    status: "NS",
    maStart: "2025-03-05",
    maEnd: "2026-03-04",
    installDate: "2017-07-03",
    techCode: "3188",
    technicianName: "DULANJA NIROSHAN",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC004422",
    address1: "KANJUKKULIYA",
    address2: "CHILAW",
    address3: "-",
    mobile: "0322220555",
  },
  // P2P OUT
  {
    customer: "VIN OCEAN SHIPPING LTD",
    model: "MP 2014AD",
    serialNo: "G619M750025",
    qNo: "Q21144",
    warrantyEndDate: "",
    mainTechCode: "3137",
    grade: "A",
    team: "P2P OUT",
    status: "NS",
    maStart: "2025-03-01",
    maEnd: "2026-03-01",
    installDate: "2019-12-31",
    techCode: "3137",
    technicianName: "KAVINDA LIYANAGE",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC008540",
    address1: "NO.267/15,GALLE ROAD",
    address2: "COLOMBO 03.",
    address3: "-",
    mobile: "0112301476",
  },
  // SUB entries
  {
    customer: "KELANIYA ZONAL EDUCATION OFFICE",
    model: "DX2430",
    serialNo: "D212Z900685",
    qNo: "Q5082",
    warrantyEndDate: "2018-03-02",
    mainTechCode: "3158",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-11",
    maEnd: "2026-03-10",
    installDate: "2017-03-02",
    techCode: "4050",
    technicianName: "THILINA LAKSHAN",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC 32289",
    address1: "MAKOLA",
    address2: "-",
    address3: "-",
    mobile: "0112962025",
  },
  {
    customer: "VIDANAGAMAGE SANDAMAL MR.",
    model: "MP 2014D",
    serialNo: "G630M940039",
    qNo: "Q17524",
    warrantyEndDate: "",
    mainTechCode: "3158",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2020-12-31",
    techCode: "4050",
    technicianName: "THILINA LAKSHAN",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC00700",
    address1: "NO 61/14A LUMBINI GARDEN,",
    address2: "DALUGAMA",
    address3: "KELANIYA",
    mobile: "0718602361",
  },
  {
    customer: "JAYA FREIGHT SOLUTIONS (PVT)LTD",
    model: "MP 2014D",
    serialNo: "G634ZA60022",
    qNo: "Q20490",
    warrantyEndDate: "2026-03-17",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2025-03-17",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "",
    type: "MFP",
    mInvNo: "GTC03893",
    address1: "NO.401",
    address2: "ROBERT GUNAWARDANA",
    address3: "BATTARAMULLA",
    mobile: "",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MB50272",
    qNo: "Q14689",
    warrantyEndDate: "",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-03-06",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006796",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50117",
    qNo: "Q14381",
    warrantyEndDate: "",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-03-12",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50127",
    qNo: "Q14386",
    warrantyEndDate: "",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-01-06",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MB50233",
    qNo: "Q14691",
    warrantyEndDate: "",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-02-07",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006796",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338M750137",
    qNo: "Q14406",
    warrantyEndDate: "",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-01-29",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "GTC CONVERTERS (PVT)LTD",
    model: "IMC2000",
    serialNo: "3089R420324",
    qNo: "Q16002",
    warrantyEndDate: "2020-10-10",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-10",
    maEnd: "2026-03-09",
    installDate: "2019-10-11",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "",
    type: "MPC",
    mInvNo: "MC007924",
    address1: "NO.805/4A,BANGALAWATTA ROAD,",
    address2: "MABOLA,",
    address3: "WATTALA",
    mobile: "0112948856",
  },
  {
    customer: "SRI RAHULA BALIKA VIDYALAYA",
    model: "DD3344",
    serialNo: "D261Z704063",
    qNo: "Q18276",
    warrantyEndDate: "",
    mainTechCode: "4042",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-02",
    maEnd: "2026-03-01",
    installDate: "2022-01-05",
    techCode: "8034",
    technicianName: "SENAL KANISHKA",
    visitCode: "-",
    type: "DCP",
    mInvNo: "MC01372",
    address1: "MALABE",
    address2: "-",
    address3: "-",
    mobile: "0112560579",
  },
  {
    customer: "DIVISIONAL SECRETARIAT",
    model: "MP2001L",
    serialNo: "E344MA51296",
    qNo: "Q7667",
    warrantyEndDate: "",
    mainTechCode: "8029",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-12",
    maEnd: "2026-03-11",
    installDate: "2017-02-27",
    techCode: "8029",
    technicianName: "RASIKA LAKMAL",
    visitCode: "NIU",
    type: "MFP",
    mInvNo: "MC 73859",
    address1: "HORANA",
    address2: "-",
    address3: "-",
    mobile: "0343347478",
  },
  {
    customer: "SRI LANKA SOCIAL SECURITY BOARD",
    model: "M2701",
    serialNo: "3281M730750",
    qNo: "Q19175",
    warrantyEndDate: "2026-03-16",
    mainTechCode: "8033",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "",
    maEnd: "",
    installDate: "2023-03-16",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC02172",
    address1: "NO.18, RAJAGIRIYA ROAD RAJAGIRIYA",
    address2: "-",
    address3: "-",
    mobile: "0112886584",
  },
  {
    customer: "NATIONAL AUDIT OFFICE",
    model: "MP2501SP",
    serialNo: "E338MA50012",
    qNo: "Q14387",
    warrantyEndDate: "",
    mainTechCode: "8033",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2019-01-21",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006586",
    address1: "NO :306/72,",
    address2: "POLDUWA ROAD,",
    address3: "BATTARAMULLA",
    mobile: "0112887021",
  },
  {
    customer: "SIRI SADAHAM ASHRAMAYA",
    model: "MP 2014AD",
    serialNo: "G618M650045",
    qNo: "Q13635",
    warrantyEndDate: "",
    mainTechCode: "8033",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2018-08-23",
    techCode: "8050",
    technicianName: "LOCHANA MADUWANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006132",
    address1: "NO:02,",
    address2: "BELLANTHARA",
    address3: "DEHIWALA",
    mobile: "0112732700",
  },
  {
    customer: "DAGONNA WIMALANANDA VIDHYALAYA",
    model: "MP 2014AD",
    serialNo: "G618MB50081",
    qNo: "Q14571",
    warrantyEndDate: "",
    mainTechCode: "8035",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-09",
    maEnd: "2026-03-08",
    installDate: "2019-01-08",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006757",
    address1: "MINUWANGODA",
    address2: "-",
    address3: "-",
    mobile: "0779008471",
  },
  {
    customer: "NEHAN ADS PRINTING & BOOKSHOP",
    model: "MP2014D",
    serialNo: "G633ZA60055",
    qNo: "Q19625",
    warrantyEndDate: "2025-03-06",
    mainTechCode: "8035",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-07",
    maEnd: "2026-03-06",
    installDate: "2024-03-06",
    techCode: "8036",
    technicianName: "ASIRI SASANKA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02741",
    address1: "295/2 ASGIRIYA",
    address2: "GAMPAHA",
    address3: "-",
    mobile: "-",
  },
  {
    customer: "NAVODYA SUPER",
    model: "MP2014AD",
    serialNo: "G611M650004",
    qNo: "Q19149",
    warrantyEndDate: "2025-03-14",
    mainTechCode: "8047",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2024-03-14",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC02111",
    address1: "1F1 KANDANA ROAD",
    address2: "BOLLATHA",
    address3: "GANEMULLA",
    mobile: "-",
  },
  {
    customer: "WP/NG/NIWANDAMA JINARAJA PRIMARY SCHOOL",
    model: "MP 2014AD",
    serialNo: "G618M950133",
    qNo: "Q14539",
    warrantyEndDate: "",
    mainTechCode: "8047",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-04-01",
    maEnd: "2026-03-31",
    installDate: "2019-01-22",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC006699",
    address1: "WP/NG/NIWANDAMA JINARAJA PRIMARY SCHOOL,",
    address2: "NIWANDAMA,",
    address3: "JA ELA",
    mobile: "0711073685",
  },
  {
    customer: "WP / NE / BANDARAWATTA ST.MARYS JUNIOR SECONDRY SCHOOL",
    model: "MP 2014AD",
    serialNo: "G616MA50186",
    qNo: "Q10816",
    warrantyEndDate: "2018-01-23",
    mainTechCode: "8047",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-15",
    maEnd: "2026-03-14",
    installDate: "2017-01-23",
    techCode: "8058",
    technicianName: "SUPUN DILHARA",
    visitCode: "",
    type: "MFP",
    mInvNo: "MC003375",
    address1: "SEEDUWA",
    address2: "-",
    address3: "-",
    mobile: "0714391902",
  },
  {
    customer: "STATE PRINTING CORPORATION",
    model: "MP1600",
    serialNo: "L6916350130",
    qNo: "Q3877",
    warrantyEndDate: "",
    mainTechCode: "8049",
    grade: "A",
    team: "SUB",
    status: "NS",
    maStart: "2025-03-02",
    maEnd: "2026-03-01",
    installDate: "2016-10-19",
    techCode: "8049",
    technicianName: "ISURU GISHANTHA",
    visitCode: "-",
    type: "MFP",
    mInvNo: "MC 30138",
    address1: "PANALUWA",
    address2: "PADUKKA",
    address3: "-",
    mobile: "0112757500",
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
];

function getEffectiveDate(row: any) {
  if (row.warrantyEndDate && row.warrantyEndDate.trim())
    return row.warrantyEndDate;
  return row.maEnd;
}

function getTeamLabel(team: any) {
  if (team === "COL") return "Colombo";
  if (team === "OUT" || team === "P2P OUT") return "Outstation";
  if (team === "SUB") return "Suburbs";
  return team;
}

function getTeamFilter(row: any, filter: any) {
  if (filter === "COL") return row.team === "COL";
  if (filter === "OUT") return row.team === "OUT" || row.team === "P2P OUT";
  if (filter === "SUB") return row.team === "SUB";
  return true;
}

export default function NsBaseReport() {
  const [teamFilter, setTeamFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("table");
  const PAGE_SIZE = 15;

  const filtered = useMemo(() => {
    return RAW_DATA.filter((row) => {
      const teamOk = teamFilter === "ALL" || getTeamFilter(row, teamFilter);
      const searchOk =
        !search ||
        row.customer.toLowerCase().includes(search.toLowerCase()) ||
        row.qNo.toLowerCase().includes(search.toLowerCase()) ||
        row.technicianName.toLowerCase().includes(search.toLowerCase()) ||
        row.model.toLowerCase().includes(search.toLowerCase());
      const dateOk =
        !dateFilter ||
        (() => {
          const eff = getEffectiveDate(row);
          if (!eff) return false;
          return eff.startsWith(dateFilter);
        })();
      return teamOk && searchOk && dateOk;
    });
  }, [teamFilter, dateFilter, search]);

  const monthlyData = useMemo(() => {
    const counts = Array(12).fill(0);
    RAW_DATA.forEach((row) => {
      const d = getEffectiveDate(row);
      if (!d) return;
      const teamOk = teamFilter === "ALL" || getTeamFilter(row, teamFilter);
      if (!teamOk) return;
      const parts = d.split("-");
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
      "Warranty End Date",
      "Main Tech Code",
      "Grade",
      "Team",
      "Status",
      "MA Start",
      "MA End",
      "Install Date",
      "Tech Code",
      "Technician Name",
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
      r.warrantyEndDate,
      r.mainTechCode,
      r.grade,
      r.team,
      r.status,
      r.maStart,
      r.maEnd,
      r.installDate,
      r.techCode,
      r.technicianName,
      r.type,
      r.mInvNo,
      r.address1,
      r.address2,
      r.address3,
      r.mobile,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((c) => `"${(c || "").replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "NS_Base_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePdfDownload = () => {
    const printContent = `
      <html><head><style>
        body { font-family: Arial, sans-serif; font-size: 8px; }
        h2 { font-size: 14px; margin-bottom: 8px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1e3a5f; color: white; padding: 4px; text-align: left; }
        td { padding: 3px 4px; border-bottom: 1px solid #eee; }
        tr:nth-child(even) { background: #f5f7fa; }
      </style></head><body>
        <h2>NS Base Report</h2>
        <p>Team: ${teamFilter === "ALL" ? "All" : getTeamLabel(teamFilter)} | Records: ${filtered.length}</p>
        <table>
          <tr><th>Customer</th><th>Model</th><th>Serial No</th><th>Q.No</th><th>Eff. Date</th><th>Team</th><th>Technician</th><th>Type</th><th>Mobile</th></tr>
          ${filtered.map((r) => `<tr><td>${r.customer}</td><td>${r.model}</td><td>${r.serialNo}</td><td>${r.qNo}</td><td>${getEffectiveDate(r) || "-"}</td><td>${r.team}</td><td>${r.technicianName}</td><td>${r.type || "-"}</td><td>${r.mobile}</td></tr>`).join("")}
        </table>
      </body></html>`;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f0f4f8",
        minHeight: "100vh",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)",
          padding: "20px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              color: "#7ec8e3",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Maintenance Report
          </div>
          <h1
            style={{
              color: "white",
              margin: "4px 0 0",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            NS Base Report
          </h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleExcelDownload}
            style={{
              background: "#217346",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "9px 16px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ⬇ Excel
          </button>
          <button
            onClick={handlePdfDownload}
            style={{
              background: "#c0392b",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "9px 16px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
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
          padding: "14px 28px",
          display: "flex",
          gap: "14px",
          alignItems: "center",
          flexWrap: "wrap",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {[
            ["ALL", "All"],
            ["COL", "Colombo"],
            ["OUT", "Outstation"],
            ["SUB", "Suburbs"],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => {
                setTeamFilter(val);
                setPage(1);
              }}
              style={{
                padding: "7px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
                background: teamFilter === val ? "#1e3a5f" : "#e8edf3",
                color: teamFilter === val ? "white" : "#4a5568",
                transition: "all 0.2s",
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
            marginLeft: "10px",
          }}
        >
          <label style={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>
            Date Filter:
          </label>
          <input
            type="month"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #d1d9e0",
              borderRadius: "6px",
              padding: "6px 10px",
              fontSize: "12px",
              outline: "none",
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
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          <input
            placeholder="Search customer, Q.No, technician…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{
              border: "1px solid #d1d9e0",
              borderRadius: "6px",
              padding: "7px 14px",
              fontSize: "12px",
              width: "240px",
              outline: "none",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            fontWeight: 600,
            background: "#edf2f7",
            padding: "6px 12px",
            borderRadius: "6px",
          }}
        >
          {filtered.length} records
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "white",
          borderBottom: "2px solid #e2e8f0",
          padding: "0 28px",
          display: "flex",
          gap: "0",
        }}
      >
        {[
          ["table", "📋 Report Table"],
          ["chart", "📊 Monthly Chart"],
        ].map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              color: activeTab === tab ? "#1e3a5f" : "#888",
              borderBottom:
                activeTab === tab
                  ? "3px solid #1e3a5f"
                  : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 28px" }}>
        {activeTab === "chart" && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <h3
              style={{ margin: "0 0 6px", color: "#1e3a5f", fontSize: "16px" }}
            >
              Monthly Expiry Count
            </h3>
            <p style={{ margin: "0 0 24px", color: "#888", fontSize: "12px" }}>
              Based on Warranty End Date (if available) or MA End Date
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "12px",
                height: "260px",
                paddingBottom: "30px",
                borderBottom: "2px solid #e2e8f0",
                position: "relative",
              }}
            >
              {MONTHS.map((m, i) => {
                const count = monthlyData[i];
                const height =
                  count === 0 ? 4 : Math.max(20, (count / maxCount) * 220);
                return (
                  <div
                    key={m}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: count > 0 ? "#1e3a5f" : "#ccc",
                      }}
                    >
                      {count || ""}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: `${height}px`,
                        background:
                          count > 0
                            ? "linear-gradient(180deg, #4a90d9 0%, #1e3a5f 100%)"
                            : "#e8edf3",
                        borderRadius: "5px 5px 0 0",
                        transition: "height 0.4s",
                        position: "relative",
                        cursor: count > 0 ? "pointer" : "default",
                      }}
                      title={`${m}: ${count} records`}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
              {MONTHS.map((m) => (
                <div
                  key={m}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#666",
                    fontWeight: 600,
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {MONTHS.map(
                (m, i) =>
                  monthlyData[i] > 0 && (
                    <div
                      key={m}
                      style={{
                        background: "#edf2f7",
                        borderRadius: "8px",
                        padding: "8px 14px",
                        fontSize: "12px",
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "#1e3a5f" }}>
                        {m}:
                      </span>{" "}
                      <span style={{ color: "#333" }}>
                        {monthlyData[i]} expiries
                      </span>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "12px",
                  minWidth: "1100px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #1e3a5f, #2d5a8e)",
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
                      "Eff. Date",
                      "MA Start",
                      "MA End",
                      "Technician",
                      "Type",
                      "M_INV_NO",
                      "Address",
                      "Mobile",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 10px",
                          color: "white",
                          fontWeight: 600,
                          textAlign: "left",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((row, i) => {
                    const effDate = getEffectiveDate(row);
                    const isWarranty =
                      row.warrantyEndDate && row.warrantyEndDate.trim();
                    const idx = (page - 1) * PAGE_SIZE + i + 1;
                    return (
                      <tr
                        key={row.qNo + i}
                        style={{
                          background: i % 2 === 0 ? "white" : "#f7fafc",
                          borderBottom: "1px solid #edf2f7",
                        }}
                      >
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#888",
                            fontWeight: 600,
                          }}
                        >
                          {idx}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontWeight: 600,
                            color: "#2d3748",
                            maxWidth: "180px",
                          }}
                        >
                          {row.customer}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#4a5568",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.model}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#718096",
                            fontSize: "11px",
                            fontFamily: "monospace",
                          }}
                        >
                          {row.serialNo}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#4a90d9",
                            fontWeight: 700,
                          }}
                        >
                          {row.qNo}
                        </td>
                        <td style={{ padding: "8px 10px" }}>
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
                        <td
                          style={{ padding: "8px 10px", textAlign: "center" }}
                        >
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "10px",
                              fontWeight: 700,
                              background:
                                row.grade === "A" ? "#c6f6d5" : "#fed7d7",
                              color: row.grade === "A" ? "#22543d" : "#742a2a",
                            }}
                          >
                            {row.grade}
                          </span>
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          <span
                            style={{
                              background: "#bee3f8",
                              color: "#2b6cb0",
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
                          style={{ padding: "8px 10px", whiteSpace: "nowrap" }}
                        >
                          {effDate ? (
                            <span
                              style={{
                                color: isWarranty ? "#c0392b" : "#2d6a4f",
                                fontWeight: 600,
                                fontSize: "11px",
                              }}
                            >
                              {effDate} {isWarranty ? "🔒" : ""}
                            </span>
                          ) : (
                            <span style={{ color: "#ccc" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#666",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.maStart || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#666",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.maEnd || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            color: "#4a5568",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.technicianName}
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          {row.type ? (
                            <span
                              style={{
                                background: "#e9d8fd",
                                color: "#553c9a",
                                padding: "2px 7px",
                                borderRadius: "8px",
                                fontSize: "10px",
                                fontWeight: 700,
                              }}
                            >
                              {row.type}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#888",
                          }}
                        >
                          {row.mInvNo || "—"}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#666",
                            maxWidth: "160px",
                          }}
                        >
                          {[row.address1, row.address2, row.address3]
                            .filter((a) => a && a !== "-")
                            .join(", ")}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            fontSize: "11px",
                            color: "#4a90d9",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.mobile !== "-" ? row.mobile : "—"}
                        </td>
                      </tr>
                    );
                  })}
                  {pageData.length === 0 && (
                    <tr>
                      <td
                        colSpan={16}
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          color: "#aaa",
                          fontSize: "14px",
                        }}
                      >
                        No records found
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
                      border: "1px solid #d1d9e0",
                      background: "white",
                      cursor: page === 1 ? "not-allowed" : "pointer",
                      color: page === 1 ? "#ccc" : "#333",
                      fontWeight: 600,
                    }}
                  >
                    ‹ Prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let p = i + 1;
                    if (totalPages > 5) {
                      if (page <= 3) p = i + 1;
                      else if (page >= totalPages - 2) p = totalPages - 4 + i;
                      else p = page - 2 + i;
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "1px solid #d1d9e0",
                          background: p === page ? "#1e3a5f" : "white",
                          color: p === page ? "white" : "#333",
                          cursor: "pointer",
                          fontWeight: 600,
                          minWidth: "34px",
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d9e0",
                      background: "white",
                      cursor: page === totalPages ? "not-allowed" : "pointer",
                      color: page === totalPages ? "#ccc" : "#333",
                      fontWeight: 600,
                    }}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        style={{ padding: "8px 28px 20px", fontSize: "11px", color: "#888" }}
      >
        🔒 = Warranty End Date used &nbsp;|&nbsp; Otherwise MA End Date is used
        &nbsp;|&nbsp; Excel export downloads as CSV
      </div>
    </div>
  );
}
