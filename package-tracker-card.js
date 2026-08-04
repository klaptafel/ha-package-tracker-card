const CARD_VERSION = '2.1.0';

// ─── Carriers ─────────────────────────────────────────────────────────────────
// Canonical carrier list: one entry per real-world carrier, each with its
// display name, brand icon, and the carrier codes used by every integration
// that can report packages for it. Add a new integration's code under the
// SAME carrier entry (e.g. codes.dhl_nl) rather than duplicating name/icon.
// Source for the 'parcel' codes: https://api.parcel.app/external/supported_carriers.json
const CARRIERS = [
  { id: "abf", name: "ABF Freight", icon: null, codes: { parcel: ["abf"] } },
  { id: "acs", name: "ACS Courier", icon: null, codes: { parcel: ["acs"] } },
  { id: "adrexo", name: "Colis Privé", icon: null, codes: { parcel: ["adrexo", "colispcode"] } },
  { id: "airroad", name: "AirRoad", icon: null, codes: { parcel: ["airroad"] } },
  { id: "aliex", name: "AliExpress Shipping (Cainiao)", icon: "phu:cainiao", codes: { parcel: ["aliex"] } },
  { id: "allegro", name: "Allegro One", icon: null, codes: { parcel: ["allegro"] } },
  { id: "allied", name: "Allied Express", icon: null, codes: { parcel: ["allied"] } },
  { id: "amshipfr", name: "Amazon Shipping France", icon: null, codes: { parcel: ["amshipfr"] } },
  { id: "amshipit", name: "Amazon Shipping Italy", icon: null, codes: { parcel: ["amshipit"] } },
  { id: "amshipuk", name: "Amazon Shipping UK", icon: null, codes: { parcel: ["amshipuk"] } },
  { id: "amzlae", name: "Amazon UAE", icon: null, codes: { parcel: ["amzlae"] } },
  { id: "amzlau", name: "Amazon Australia", icon: null, codes: { parcel: ["amzlau"] } },
  { id: "amzlbe", name: "Amazon Belgium", icon: null, codes: { parcel: ["amzlbe"] } },
  { id: "amzlbr", name: "Amazon Brazil", icon: null, codes: { parcel: ["amzlbr"] } },
  { id: "amzlca", name: "Amazon Canada", icon: null, codes: { parcel: ["amzlca"] } },
  { id: "amzlde", name: "Amazon Germany", icon: null, codes: { parcel: ["amzlde"] } },
  { id: "amzleg", name: "Amazon Egypt", icon: null, codes: { parcel: ["amzleg"] } },
  { id: "amzles", name: "Amazon Spain", icon: null, codes: { parcel: ["amzles"] } },
  { id: "amzlfr", name: "Amazon France", icon: null, codes: { parcel: ["amzlfr"] } },
  { id: "amzlie", name: "Amazon Ireland", icon: null, codes: { parcel: ["amzlie"] } },
  { id: "amzlin", name: "Amazon India", icon: null, codes: { parcel: ["amzlin"] } },
  { id: "amzlit", name: "Amazon Italy", icon: null, codes: { parcel: ["amzlit"] } },
  { id: "amzljp", name: "Amazon Japan", icon: null, codes: { parcel: ["amzljp"] } },
  { id: "amzlmx", name: "Amazon Mexico", icon: null, codes: { parcel: ["amzlmx"] } },
  { id: "amzlnl", name: "Amazon Netherlands", icon: "phu:amazon-logo", codes: { parcel: ["amzlnl"] } },
  { id: "amzlpl", name: "Amazon Poland", icon: null, codes: { parcel: ["amzlpl"] } },
  { id: "amzlsa", name: "Amazon Saudi Arabia", icon: null, codes: { parcel: ["amzlsa"] } },
  { id: "amzlse", name: "Amazon Sweden", icon: null, codes: { parcel: ["amzlse"] } },
  { id: "amzlsg", name: "Amazon Singapore", icon: null, codes: { parcel: ["amzlsg"] } },
  { id: "amzltr", name: "Amazon Turkey", icon: null, codes: { parcel: ["amzltr"] } },
  { id: "amzluk", name: "Amazon UK", icon: null, codes: { parcel: ["amzluk"] } },
  { id: "amzlus", name: "Amazon US", icon: null, codes: { parcel: ["amzlus"] } },
  { id: "anc", name: "ANC Delivers", icon: null, codes: { parcel: ["anc"] } },
  { id: "anpost", name: "An Post", icon: "phu:anpost", codes: { parcel: ["anpost"] } },
  { id: "apcpli", name: "APC-PLI", icon: null, codes: { parcel: ["apcpli"] } },
  { id: "apge", name: "APG eCommerce", icon: null, codes: { parcel: ["apge"] } },
  { id: "apple", name: "Apple Store Orders", icon: null, codes: { parcel: ["apple"] } },
  { id: "appleexp", name: "Apple Express", icon: null, codes: { parcel: ["appleexp"] } },
  { id: "aquiline", name: "Aquiline", icon: null, codes: { parcel: ["aquiline"] } },
  { id: "aramex", name: "Aramex", icon: null, codes: { parcel: ["aramex"] } },
  { id: "arrowxl", name: "Arrow XL", icon: null, codes: { parcel: ["arrowxl"] } },
  { id: "asendia", name: "Asendia USA", icon: null, codes: { parcel: ["asendia"] } },
  { id: "asendiag", name: "Asendia", icon: null, codes: { parcel: ["asendiag"] } },
  { id: "asl", name: "ASL", icon: null, codes: { parcel: ["asl"] } },
  { id: "asmred", name: "GLS Spain", icon: "phu:gls-group", codes: { parcel: ["asmred"] } },
  { id: "at", name: "Austrian Post", icon: "phu:austrianpost", codes: { parcel: ["at"] } },
  { id: "au", name: "Australia Post", icon: "phu:australiapost", codes: { parcel: ["au"] } },
  { id: "azer", name: "Azerpost", icon: null, codes: { parcel: ["azer"] } },
  { id: "bartol", name: "Bartolini", icon: null, codes: { parcel: ["bartol"] } },
  { id: "bettert", name: "Better Trucks", icon: null, codes: { parcel: ["bettert"] } },
  { id: "blp", name: "Belpost", icon: null, codes: { parcel: ["blp"] } },
  { id: "bluecare", name: "Bluecare Express", icon: null, codes: { parcel: ["bluecare"] } },
  { id: "bluedart", name: "Blue Dart", icon: null, codes: { parcel: ["bluedart"] } },
  { id: "bolg", name: "Bulgarian Post", icon: null, codes: { parcel: ["bolg"] } },
  { id: "bonshaw", name: "Postmedia Parcel Services", icon: null, codes: { parcel: ["bonshaw"] } },
  { id: "bpost", name: "Bpost", icon: null, codes: { parcel: ["bpost"] } },
  { id: "bring", name: "Bring", icon: "phu:bring", codes: { parcel: ["bring"] } },
  { id: "buylogic", name: "Buylogic", icon: null, codes: { parcel: ["buylogic"] } },
  // Separate from "aliex" (AliExpress Shipping, which happens to reuse this
  // same icon): this entry is for ha-cainiao's own generically-detected
  // carrier name ("Cainiao"), not otherwise matched since "aliex"'s own
  // name/short don't literally read "Cainiao" -- genericCarrierIcon matches
  // by name text, not by group/code.
  { id: "cainiao", name: "Cainiao", icon: "phu:cainiao", codes: { cainiao: ["cainiao"] } },
  { id: "canpar", name: "Canpar", icon: null, codes: { parcel: ["canpar"] } },
  { id: "cdl", name: "CDL Last Mile", icon: null, codes: { parcel: ["cdl"] } },
  { id: "celeritas", name: "Celeritas", icon: null, codes: { parcel: ["celeritas"] } },
  { id: "cems", name: "China Post EMS", icon: null, codes: { parcel: ["cems"] } },
  { id: "ceska", name: "Česká pošta", icon: null, codes: { parcel: ["ceska"] } },
  { id: "ceva", name: "Ceva Logistics", icon: null, codes: { parcel: ["ceva"] } },
  { id: "chilex", name: "Chilexpress", icon: null, codes: { parcel: ["chilex"] } },
  { id: "china", name: "China Post", icon: null, codes: { parcel: ["china"] } },
  { id: "chitchats", name: "Chit Chats", icon: null, codes: { parcel: ["chitchats"] } },
  { id: "chrexp", name: "Correos Express", icon: null, codes: { parcel: ["chrexp"] } },
  { id: "chrono", name: "Chronopost", icon: null, codes: { parcel: ["chrono"] } },
  { id: "chronop", name: "Chronopost Portugal", icon: null, codes: { parcel: ["chronop"] } },
  { id: "cirro", name: "Cirro", icon: null, codes: { parcel: ["cirro"] } },
  { id: "cjpacket", name: "CJPacket", icon: null, codes: { parcel: ["cjpacket"] } },
  { id: "colicoli", name: "Colicoli", icon: null, codes: { parcel: ["colicoli"] } },
  { id: "colomb", name: "Colombia post (4-72)", icon: null, codes: { parcel: ["colomb"] } },
  { id: "colp", name: "Collect+", icon: null, codes: { parcel: ["colp"] } },
  { id: "cope", name: "COPE", icon: null, codes: { parcel: ["cope"] } },
  { id: "cor", name: "Correos", icon: null, codes: { parcel: ["cor"] } },
  { id: "corbra", name: "Correios", icon: null, codes: { parcel: ["corbra"] } },
  { id: "corm", name: "Correos de Mexico", icon: null, codes: { parcel: ["corm"] } },
  { id: "corurg", name: "Correo Uruguayo", icon: null, codes: { parcel: ["corurg"] } },
  { id: "coup", name: "CourierPost", icon: null, codes: { parcel: ["coup"] } },
  { id: "couple", name: "Couriers Please", icon: null, codes: { parcel: ["couple"] } },
  { id: "cp", name: "Canada Post", icon: null, codes: { parcel: ["cp"] } },
  { id: "cse", name: "CSE", icon: null, codes: { parcel: ["cse"] } },
  { id: "ctt", name: "CTT", icon: "phu:ctt", codes: { parcel: ["ctt"] } },
  { id: "cyclpcode", name: "Cycloon", icon: null, codes: { parcel: ["cyclpcode"] } },
  { id: "cypr", name: "Cyprus Post", icon: null, codes: { parcel: ["cypr"] } },
  { id: "dachser", name: "Dachser", icon: null, codes: { parcel: ["dachser"] } },
  { id: "dao365", name: "DAO365", icon: null, codes: { parcel: ["dao365"] } },
  { id: "deliverit", name: "Deliver-it", icon: null, codes: { parcel: ["deliverit"] } },
  { id: "dellin", name: "Delovie Linii", icon: null, codes: { parcel: ["dellin"] } },
  { id: "delmas", name: "Delmas", icon: null, codes: { parcel: ["delmas"] } },
  { id: "dhl", name: "DHL Express", icon: "phu:dhl", codes: { parcel: ["dhl"] } },
  { id: "dhlfreight", name: "DHL Freight", icon: "phu:dhl", codes: { parcel: ["dhlfreight"] } },
  { id: "dhlgf", name: "DHL Global Forwarding", icon: null, codes: { parcel: ["dhlgf"] } },
  { id: "dhlgm", name: "DHL Global Mail", icon: "phu:dhl", codes: { parcel: ["dhlgm"] } },
  { id: "dhlnl", name: "DHL Netherlands", short: "DHL", icon: "phu:dhl", codes: { parcel: ["dhlnl", "dhlnlpcode"], dhl_nl: ["dhlnl"] } },
  { id: "dhlpoland", name: "DHL Poland", icon: null, codes: { parcel: ["dhlpoland"] } },
  { id: "dhlsc", name: "DHL Supply Chain", icon: "phu:dhl", codes: { parcel: ["dhlsc"] } },
  { id: "dhluk", name: "DHL Parcel UK", icon: "phu:dhl", codes: { parcel: ["dhluk"] } },
  { id: "dicom", name: "GLS Canada", icon: "phu:gls-group", codes: { parcel: ["dicom"] } },
  { id: "dimex", name: "Dimex", icon: null, codes: { parcel: ["dimex"] } },
  { id: "direct", name: "Direct Link", icon: null, codes: { parcel: ["direct"] } },
  { id: "dk", name: "Post Danmark", icon: null, codes: { parcel: ["dk"] } },
  { id: "doordash", name: "DoorDash", icon: null, codes: { parcel: ["doordash"] } },
  { id: "dp", name: "Deutsche Post", icon: null, codes: { parcel: ["dp"] } },
  { id: "dpdat", name: "DPD Austria", icon: "phu:dpd", codes: { parcel: ["dpdat"] } },
  { id: "dpdfrpcode", name: "DPD France", icon: "phu:dpd", codes: { parcel: ["dpdfrpcode"] } },
  { id: "dpdgpcode", name: "DPD Group", short: "DPD", icon: "phu:dpd", codes: { parcel: ["dpdgpcode"], dpd: ["dpdgpcode"] } },
  { id: "dpdie", name: "DPD Ireland", icon: "phu:dpd", codes: { parcel: ["dpdie"] } },
  { id: "dpditpcode", name: "DPD Italy (BRT)", icon: "phu:dpd", codes: { parcel: ["dpditpcode"] } },
  { id: "dpdpcode", name: "DPD Germany", icon: "phu:dpd", codes: { parcel: ["dpdpcode"] } },
  { id: "dpdpoland", name: "DPD Poland", icon: "phu:dpd", codes: { parcel: ["dpdpoland"] } },
  { id: "dpduk", name: "DPD UK", icon: "phu:dpd", codes: { parcel: ["dpduk"] } },
  { id: "dpexw", name: "DPEX Worldwide", icon: null, codes: { parcel: ["dpexw"] } },
  { id: "dpr", name: "Deutsche Post Brief", icon: null, codes: { parcel: ["dpr"] } },
  { id: "dragonfly", name: "Dragonfly", icon: "phu:dragonfly", codes: { parcel: ["dragonfly"], dragonfly: ["dragonfly"] } },
  { id: "dragonnl", name: "Dragonfly Netherlands", icon: "phu:dragonfly", codes: { parcel: ["dragonnl"] } },
  { id: "dsv", name: "DSV", icon: null, codes: { parcel: ["dsv"] } },
  { id: "dtdc", name: "DTDC India", icon: null, codes: { parcel: ["dtdc"] } },
  { id: "dynalogic", name: "Dynalogic", icon: null, codes: { parcel: ["dynalogic"] } },
  { id: "dynamex", name: "Dynamex", icon: null, codes: { parcel: ["dynamex"] } },
  { id: "easyship", name: "Easyship", icon: null, codes: { parcel: ["easyship"] } },
  { id: "ecms", name: "ECMS", icon: null, codes: { parcel: ["ecms"] } },
  { id: "econt", name: "Econt Express", icon: null, codes: { parcel: ["econt"] } },
  { id: "ecoscoot", name: "EcoScooting", icon: null, codes: { parcel: ["ecoscoot"] } },
  { id: "edos", name: "CDEK", icon: null, codes: { parcel: ["edos"] } },
  { id: "ee", name: "Eesti Post", icon: null, codes: { parcel: ["ee"] } },
  { id: "elta", name: "Elta", icon: null, codes: { parcel: ["elta"] } },
  { id: "emirates", name: "Emirates Post", icon: null, codes: { parcel: ["emirates"] } },
  { id: "emps", name: "Emps", icon: null, codes: { parcel: ["emps"] } },
  { id: "ems", name: "EMS Russian Post", icon: null, codes: { parcel: ["ems"] } },
  { id: "energia", name: "TK Energia", icon: null, codes: { parcel: ["energia"] } },
  { id: "envia", name: "Ontime - Envialia", icon: null, codes: { parcel: ["envia"] } },
  { id: "eshopw", name: "eShopWorld", icon: null, codes: { parcel: ["eshopw"] } },
  { id: "estafe", name: "Estafeta", icon: null, codes: { parcel: ["estafe"] } },
  { id: "ets", name: "ETS Express", icon: null, codes: { parcel: ["ets"] } },
  { id: "fastau", name: "Fastway AU", icon: null, codes: { parcel: ["fastau"] } },
  { id: "fastie", name: "Fastway Ireland", icon: null, codes: { parcel: ["fastie"] } },
  { id: "fastnz", name: "Fastway NZ", icon: null, codes: { parcel: ["fastnz"] } },
  { id: "fedex", name: "FedEx", icon: "phu:fedex", codes: { parcel: ["fedex"] } },
  { id: "fedpl", name: "FedEx Poland", icon: "phu:fedex", codes: { parcel: ["fedpl"] } },
  { id: "fivepost", name: "5post", icon: null, codes: { parcel: ["fivepost"] } },
  { id: "fleetpcode", name: "FleetOptics", icon: null, codes: { parcel: ["fleetpcode"] } },
  { id: "gelpcode", name: "GEL Express", icon: null, codes: { parcel: ["gelpcode"] } },
  { id: "geniki", name: "Geniki Taxydromiki", icon: null, codes: { parcel: ["geniki"] } },
  { id: "geodis", name: "Geodis", icon: null, codes: { parcel: ["geodis"] } },
  { id: "globalp", name: "GlobalPost", icon: null, codes: { parcel: ["globalp"] } },
  { id: "gls", name: "GLS", icon: "phu:gls-group", codes: { parcel: ["gls"], gls: ["gls"] } },
  { id: "glsit", name: "GLS Italy", icon: "phu:gls-group", codes: { parcel: ["glsit"] } },
  { id: "gobolt", name: "GoBolt", icon: null, codes: { parcel: ["gobolt"] } },
  { id: "gofo", name: "GOFO Express", icon: null, codes: { parcel: ["gofo"] } },
  { id: "gofofr", name: "GOFO Express France", icon: null, codes: { parcel: ["gofofr"] } },
  { id: "gofoit", name: "GOFO Express Italy", icon: null, codes: { parcel: ["gofoit"] } },
  { id: "gofonl", name: "GOFO Express Netherlands", icon: null, codes: { parcel: ["gofonl"] } },
  { id: "gofous", name: "GOFO Express US", icon: null, codes: { parcel: ["gofous"] } },
  { id: "gover", name: "General-Overnight", icon: null, codes: { parcel: ["gover"] } },
  { id: "gso", name: "GLS US", icon: "phu:gls-group", codes: { parcel: ["gso"] } },
  { id: "hawai", name: "Hawaiian Air Cargo", icon: null, codes: { parcel: ["hawai"] } },
  { id: "her2mann", name: "Hermes 2-Mann-Handling", icon: null, codes: { parcel: ["her2mann"] } },
  { id: "hermes", name: "Hermes", icon: null, codes: { parcel: ["hermes"] } },
  { id: "hk", name: "Hongkong Post", icon: null, codes: { parcel: ["hk"] } },
  { id: "hr", name: "Hrvatska pošta", icon: null, codes: { parcel: ["hr"] } },
  { id: "hrpar", name: "HR Parcel", icon: null, codes: { parcel: ["hrpar"] } },
  { id: "hung", name: "Magyar Posta", icon: null, codes: { parcel: ["hung"] } },
  { id: "ics", name: "ICS Courier", icon: null, codes: { parcel: ["ics"] } },
  { id: "il", name: "Israel Post", icon: null, codes: { parcel: ["il"] } },
  { id: "iloxx", name: "iloxx", icon: null, codes: { parcel: ["iloxx"] } },
  { id: "imile", name: "iMile", icon: null, codes: { parcel: ["imile"] } },
  { id: "in", name: "India Post", icon: null, codes: { parcel: ["in"] } },
  { id: "indon", name: "Indonesia Post", icon: null, codes: { parcel: ["indon"] } },
  { id: "inpespcode", name: "Inpost Spain", icon: null, codes: { parcel: ["inpespcode"] } },
  // ha-parcel-integrations' own InPost member (PL + IT, per the maintainer's
  // own carrier list, GitHub discussion 2026-07-30) is domain `inpost`,
  // shared here with the Parcel integration's existing "inpost" code entry
  // -- "InPost Paczkomaty" is accurate for Parcel's PL-only code, but the
  // shorter "InPost" reads better as this card's own generic-discovery
  // fallback name, which also needs to cover the IT variant.
  { id: "inpost", name: "InPost Paczkomaty", short: "InPost", icon: "phu:inpost", codes: { parcel: ["inpost"], inpost: ["inpost"] } },
  { id: "inpostit", name: "InPost Italy", icon: null, codes: { parcel: ["inpostit"] } },
  { id: "inpostuk", name: "InPost UK", icon: null, codes: { parcel: ["inpostuk"] } },
  { id: "intelc", name: "Dragonfly - Intelcom", icon: null, codes: { parcel: ["intelc"] } },
  { id: "inter", name: "Interlink", icon: null, codes: { parcel: ["inter"] } },
  { id: "ipar", name: "i-parcel", icon: null, codes: { parcel: ["ipar"] } },
  { id: "it", name: "Poste Italiane", icon: null, codes: { parcel: ["it"] } },
  { id: "jcex", name: "JCEX", icon: null, codes: { parcel: ["jcex"] } },
  { id: "jde", name: "JDE", icon: null, codes: { parcel: ["jde"] } },
  { id: "jitsu", name: "Jitsu", icon: null, codes: { parcel: ["jitsu"] } },
  { id: "joeyco", name: "JoeyCo", icon: null, codes: { parcel: ["joeyco"] } },
  { id: "jordan", name: "Jordan Post", icon: null, codes: { parcel: ["jordan"] } },
  { id: "jp", name: "Japan Post", icon: "phu:japanpost", codes: { parcel: ["jp"] } },
  { id: "jtexp", name: "J&T Express", icon: "phu:jtexpress", codes: { parcel: ["jtexp"] } },
  { id: "keavo", name: "Keavo", icon: null, codes: { parcel: ["keavo"] } },
  { id: "kerry", name: "Kerry Express", icon: null, codes: { parcel: ["kerry"] } },
  { id: "komon", name: "Komon Express", icon: null, codes: { parcel: ["komon"] } },
  { id: "kor", name: "Korea Post", icon: null, codes: { parcel: ["kor"] } },
  { id: "koreanair", name: "Korean Air Cargo", icon: null, codes: { parcel: ["koreanair"] } },
  { id: "kz", name: "Kazpost", icon: null, codes: { parcel: ["kz"] } },
  { id: "landmark", name: "Landmark Global", icon: null, codes: { parcel: ["landmark"] } },
  { id: "laser", name: "OnTrac - Lasership", icon: null, codes: { parcel: ["laser"] } },
  { id: "litva", name: "Lietuvos paštas", icon: null, codes: { parcel: ["litva"] } },
  { id: "loom", name: "Loomis Express", icon: null, codes: { parcel: ["loom"] } },
  { id: "lp", name: "La poste (Colissimo)", icon: "phu:laposte", codes: { parcel: ["lp"] } },
  { id: "lso", name: "Lone Star Overnight", icon: null, codes: { parcel: ["lso"] } },
  { id: "lv", name: "Latvijas Pasts", icon: null, codes: { parcel: ["lv"] } },
  { id: "major", name: "Major Express", icon: null, codes: { parcel: ["major"] } },
  { id: "malpos", name: "Malaysia Post", icon: null, codes: { parcel: ["malpos"] } },
  { id: "malta", name: "MaltaPost", icon: null, codes: { parcel: ["malta"] } },
  { id: "matka", name: "Matkahuolto", icon: null, codes: { parcel: ["matka"] } },
  { id: "meest", name: "Meest", icon: null, codes: { parcel: ["meest"] } },
  { id: "mengtu", name: "Mengtu", icon: null, codes: { parcel: ["mengtu"] } },
  { id: "moldov", name: "Moldova Post", icon: null, codes: { parcel: ["moldov"] } },
  { id: "mrw", name: "MRW", icon: null, codes: { parcel: ["mrw"] } },
  { id: "mscgva", name: "MSC", icon: null, codes: { parcel: ["mscgva"] } },
  { id: "myher", name: "Evri", icon: null, codes: { parcel: ["myher"] } },
  { id: "nacex", name: "Nacex", icon: null, codes: { parcel: ["nacex"] } },
  { id: "naqel", name: "Naqel Express", icon: null, codes: { parcel: ["naqel"] } },
  { id: "nationex", name: "Nationex", icon: null, codes: { parcel: ["nationex"] } },
  { id: "newp", name: "Nova Poshta", icon: null, codes: { parcel: ["newp"] } },
  { id: "nor", name: "Norway Post", icon: null, codes: { parcel: ["nor"] } },
  { id: "northline", name: "Northline", icon: null, codes: { parcel: ["northline"] } },
  { id: "nzp", name: "New Zealand Post", icon: "phu:nzpost", codes: { parcel: ["nzp"] } },
  { id: "oca", name: "OCA Argentina", icon: null, codes: { parcel: ["oca"] } },
  { id: "ocs", name: "OCS Worldwide", icon: null, codes: { parcel: ["ocs"] } },
  { id: "ont", name: "OnTrac", icon: null, codes: { parcel: ["ont"] } },
  { id: "optima", name: "Optima", icon: null, codes: { parcel: ["optima"] } },
  { id: "p2g", name: "Parcel2Go", icon: null, codes: { parcel: ["p2g"] } },
  { id: "p4d", name: "P4D", icon: null, codes: { parcel: ["p4d"] } },
  { id: "paack", name: "Paack", icon: null, codes: { parcel: ["paack"] } },
  { id: "packeta", name: "Packeta", icon: null, codes: { parcel: ["packeta"] } },
  { id: "paczka", name: "OrlenPaczka", icon: null, codes: { parcel: ["paczka"] } },
  { id: "pandion", name: "Pandion", icon: null, codes: { parcel: ["pandion"] } },
  { id: "paquet", name: "Paquetexpress", icon: null, codes: { parcel: ["paquet"] } },
  { id: "parcelpnt", name: "ParcelPoint", icon: null, codes: { parcel: ["parcelpnt"] } },
  { id: "pbi", name: "PBI - Pitney Bowes", icon: null, codes: { parcel: ["pbi"] } },
  { id: "pbt", name: "PBT New Zealand", icon: null, codes: { parcel: ["pbt"] } },
  { id: "pec", name: "PEC", icon: null, codes: { parcel: ["pec"] } },
  { id: "pfl", name: "Parcel Freight Logistics", icon: null, codes: { parcel: ["pfl"] } },
  { id: "phlpost", name: "Philpost", icon: null, codes: { parcel: ["phlpost"] } },
  { id: "pilot", name: "Pilot Freight", icon: null, codes: { parcel: ["pilot"] } },
  { id: "pk", name: "Pakistan Post", icon: null, codes: { parcel: ["pk"] } },
  { id: "planzer", name: "Planzer", icon: null, codes: { parcel: ["planzer"] } },
  { id: "poland", name: "Poczta Polska", icon: "phu:pocztapolska", codes: { parcel: ["poland"] } },
  { id: "posthas", name: "Post Haste", icon: null, codes: { parcel: ["posthas"] } },
  { id: "posti", name: "Posti Finland - Itella", icon: null, codes: { parcel: ["posti"] } },
  { id: "postnord", name: "Postnord Logistics", icon: null, codes: { parcel: ["postnord"] } },
  { id: "ppl", name: "PPL", icon: null, codes: { parcel: ["ppl"] } },
  { id: "ppx", name: "PPX (RR Donnelley)", icon: null, codes: { parcel: ["ppx"] } },
  { id: "prfc", name: "Parcelforce", icon: null, codes: { parcel: ["prfc"] } },
  { id: "ptl", name: "P&T Luxembourg", icon: null, codes: { parcel: ["ptl"] } },
  { id: "puro", name: "Purolator", icon: null, codes: { parcel: ["puro"] } },
  { id: "puropost", name: "PuroPost", icon: null, codes: { parcel: ["puropost"] } },
  { id: "px", name: "4PX", icon: null, codes: { parcel: ["px"] } },
  { id: "quickpac", name: "Quickpac", icon: null, codes: { parcel: ["quickpac"] } },
  { id: "qxpress", name: "Qxpress", icon: null, codes: { parcel: ["qxpress"] } },
  { id: "raven", name: "Raven Force Couriers", icon: null, codes: { parcel: ["raven"] } },
  { id: "redjep", name: "Instabox Red je pakketje", icon: null, codes: { parcel: ["redjep"] } },
  { id: "redpack", name: "Redpack", icon: null, codes: { parcel: ["redpack"] } },
  { id: "redur", name: "Redur", icon: null, codes: { parcel: ["redur"] } },
  { id: "relais", name: "Relais Colis", icon: null, codes: { parcel: ["relais"] } },
  { id: "relay", name: "Mondial Relay", icon: "phu:mondialrelay", codes: { parcel: ["relay", "mrelpcode"] } },
  { id: "relaypcode", name: "Relay UK", icon: null, codes: { parcel: ["relaypcode"] } },
  { id: "rincos", name: "Rincos", icon: null, codes: { parcel: ["rincos"] } },
  { id: "rm", name: "Royal Mail", icon: "phu:royalmail", codes: { parcel: ["rm"] } },
  { id: "roadie", name: "Roadie", icon: null, codes: { parcel: ["roadie"] } },
  { id: "rp", name: "Russian Post", icon: null, codes: { parcel: ["rp"] } },
  { id: "safmar", name: "Safmarine", icon: null, codes: { parcel: ["safmar"] } },
  { id: "safr", name: "South African Post Office", icon: null, codes: { parcel: ["safr"] } },
  { id: "sagawa", name: "Sagawa Express", icon: null, codes: { parcel: ["sagawa"] } },
  { id: "saudi", name: "Saudi Post", icon: null, codes: { parcel: ["saudi"] } },
  { id: "sch", name: "DB Schenker", icon: null, codes: { parcel: ["sch"] } },
  { id: "se", name: "Swedish Post", icon: null, codes: { parcel: ["se"] } },
  { id: "seabour", name: "Seabourne Logistics", icon: null, codes: { parcel: ["seabour"] } },
  { id: "serbia", name: "Serbia Post", icon: null, codes: { parcel: ["serbia"] } },
  { id: "serpost", name: "Serpost", icon: null, codes: { parcel: ["serpost"] } },
  { id: "seur", name: "SEUR", icon: null, codes: { parcel: ["seur"] } },
  { id: "sf", name: "SF Express", icon: null, codes: { parcel: ["sf"] } },
  { id: "sfc", name: "SendFromChina", icon: null, codes: { parcel: ["sfc"] } },
  { id: "shipbob", name: "ShipBob", icon: null, codes: { parcel: ["shipbob"] } },
  { id: "shiptor", name: "Shiptor", icon: null, codes: { parcel: ["shiptor"] } },
  { id: "sing", name: "SingPost", icon: null, codes: { parcel: ["sing"] } },
  { id: "skynetm", name: "Skynet Malaysia", icon: null, codes: { parcel: ["skynetm"] } },
  { id: "skynetw", name: "SkyNet Worldwide Express", icon: null, codes: { parcel: ["skynetw"] } },
  { id: "slovak", name: "Slovenská pošta", icon: null, codes: { parcel: ["slovak"] } },
  { id: "slv", name: "Pošta Slovenije", icon: null, codes: { parcel: ["slv"] } },
  { id: "smsa", name: "SMSA Express", icon: null, codes: { parcel: ["smsa"] } },
  { id: "speedpak", name: "SpeedPAK", icon: null, codes: { parcel: ["speedpak"] } },
  { id: "speedx", name: "SpeedX", icon: null, codes: { parcel: ["speedx"] } },
  { id: "sprintstar", name: "Sprintstar", icon: null, codes: { parcel: ["sprintstar"] } },
  { id: "star", name: "StarTrack Express", icon: null, codes: { parcel: ["star"] } },
  { id: "straight", name: "Straightship", icon: null, codes: { parcel: ["straight"] } },
  { id: "swiship", name: "Swiship", icon: null, codes: { parcel: ["swiship"] } },
  { id: "swiss", name: "Swiss Post", icon: "phu:swisspost", codes: { parcel: ["swiss"] } },
  { id: "syncreon", name: "Syncreon", icon: null, codes: { parcel: ["syncreon"] } },
  { id: "sypost", name: "Sypost - SunYou Logistics", icon: "phu:sunyou", codes: { parcel: ["sypost"] } },
  { id: "thai", name: "Thailand Post", icon: null, codes: { parcel: ["thai"] } },
  { id: "tipsac", name: "Tipsa", icon: null, codes: { parcel: ["tipsac"] } },
  { id: "tkkit", name: "TK KIT", icon: null, codes: { parcel: ["tkkit"] } },
  { id: "tnt", name: "TNT", icon: null, codes: { parcel: ["tnt"] } },
  { id: "tntau", name: "TNT Australia", icon: null, codes: { parcel: ["tntau"] } },
  { id: "tntfr", name: "TNT France", icon: null, codes: { parcel: ["tntfr"] } },
  { id: "tntit", name: "TNT Italy", icon: null, codes: { parcel: ["tntit"] } },
  { id: "tntp", name: "PostNL", icon: "phu:postnl", codes: { parcel: ["tntp", "tntpitp"], postnl: ["postnl"] } },
  { id: "tntpit", name: "PostNL (International)", icon: "phu:postnl", codes: { parcel: ["tntpit"] } },
  { id: "tntuk", name: "TNT UK", icon: null, codes: { parcel: ["tntuk"] } },
  { id: "toll", name: "Toll - Team Global Express", icon: null, codes: { parcel: ["toll"] } },
  { id: "topyou", name: "TopYou Logistics", icon: null, codes: { parcel: ["topyou"] } },
  { id: "tourline", name: "CTT Express", icon: null, codes: { parcel: ["tourline"] } },
  { id: "transm", name: "TransMission", icon: null, codes: { parcel: ["transm"] } },
  { id: "trnkrpcode", name: "Trunkrs", icon: "phu:trunkrs", codes: { parcel: ["trnkrpcode"] } },
  { id: "trpack", name: "TrakPak", icon: null, codes: { parcel: ["trpack"] } },
  { id: "turk", name: "PTT", icon: null, codes: { parcel: ["turk"] } },
  { id: "tw", name: "Taiwan (Chunghwa) Post", icon: null, codes: { parcel: ["tw"] } },
  { id: "ubi", name: "UBI Smart Parcel", icon: null, codes: { parcel: ["ubi"] } },
  { id: "udsa", name: "UDS - United Delivery Service", icon: null, codes: { parcel: ["udsa"] } },
  { id: "ukr", name: "Ukrpost", icon: null, codes: { parcel: ["ukr"] } },
  { id: "unex", name: "Unex", icon: null, codes: { parcel: ["unex"] } },
  { id: "uniuni", name: "UniUni", icon: null, codes: { parcel: ["uniuni"] } },
  { id: "ups", name: "UPS", icon: "phu:ups-dlv", codes: { parcel: ["ups"] } },
  { id: "upsmi", name: "UPS MI", icon: "phu:ups-dlv", codes: { parcel: ["upsmi"] } },
  { id: "usps", name: "USPS", icon: "phu:usps", codes: { parcel: ["usps"] } },
  { id: "vasp", name: "Vasp Expresso", icon: null, codes: { parcel: ["vasp"] } },
  { id: "veho", name: "Veho", icon: null, codes: { parcel: ["veho"] } },
  { id: "venipak", name: "Venipak", icon: null, codes: { parcel: ["venipak"] } },
  { id: "vinted", name: "Vinted Go", icon: "phu:vinted", codes: { parcel: ["vinted"] } },
  { id: "walmart", name: "Walmart Shipping", icon: null, codes: { parcel: ["walmart"] } },
  { id: "wanb", name: "WANB Express", icon: null, codes: { parcel: ["wanb"] } },
  { id: "whistl", name: "Whistl", icon: null, codes: { parcel: ["whistl"] } },
  { id: "wish", name: "Wish Post", icon: null, codes: { parcel: ["wish"] } },
  { id: "wnd", name: "wnDirect", icon: null, codes: { parcel: ["wnd"] } },
  { id: "xdp", name: "XDP", icon: null, codes: { parcel: ["xdp"] } },
  { id: "yamato", name: "Yamato", icon: null, codes: { parcel: ["yamato"] } },
  { id: "yanwen", name: "Yanwen", icon: null, codes: { parcel: ["yanwen"] } },
  { id: "yodel", name: "Yodel", icon: null, codes: { parcel: ["yodel"] } },
  { id: "yun", name: "Yun Express", icon: null, codes: { parcel: ["yun"] } },
  { id: "zel", name: "Zeleris", icon: null, codes: { parcel: ["zel"] } },
  { id: "pholder", name: "Placeholder Deliveries", icon: null, codes: { parcel: ["pholder"] } },
];
const _carrierIndex = new Map();
for (const c of CARRIERS) {
  for (const [group, codes] of Object.entries(c.codes)) {
    for (const code of codes) _carrierIndex.set(group + ':' + code.toLowerCase(), c);
  }
}
function resolveCarrier(group, code) {
  if (!code) return null;
  return _carrierIndex.get(group + ':' + String(code).toLowerCase()) || null;
}
function carrierName(group, code) {
  const c = resolveCarrier(group, code);
  return (c && c.name) || code || null;
}

let _brandIconsAvailable = false;
function isBrandIconsAvailable() {
  if (_brandIconsAvailable) return true;
  try { _brandIconsAvailable = 'phu' in (window.customIconsets || {}); } catch {}
  return _brandIconsAvailable;
}

function waitForBrandIcons(timeout = 5000) {
  if (isBrandIconsAvailable()) return Promise.resolve(true);
  return new Promise(resolve => {
    const start = Date.now();
    const iv    = setInterval(() => {
      if (isBrandIconsAvailable())      { clearInterval(iv); resolve(true);  return; }
      if (Date.now() - start > timeout) { clearInterval(iv); resolve(false); }
    }, 500);
  });
}

function getBrandIcon(group, code) {
  if (!code || !isBrandIconsAvailable()) return null;
  const c = resolveCarrier(group, code);
  return (c && c.icon) || null;
}

// Name-based icon lookup for canonicalSourceInfo's own generically-detected
// sources: those only ever have a plain carrier *name* (e.g. "DHL", read
// straight from the item's own carrier field) to go on, never the curated
// group+code pair _carrierIndex above is keyed by, so getBrandIcon itself
// doesn't apply. Matches on `short` first, not just `name` -- DHL/DPD's own
// CARRIERS entries are named "DHL Netherlands"/"DPD Group" (their real,
// precise names) with a separate short: "DHL"/"DPD", and that short form is
// exactly what parcels.py itself stamps on every item, not the full name.
const _carrierIconByName = new Map();
for (const c of CARRIERS) {
  if (!c.icon) continue;
  _carrierIconByName.set(c.name.toLowerCase(), c.icon);
  if (c.short) _carrierIconByName.set(c.short.toLowerCase(), c.icon);
}
function genericCarrierIcon(name) {
  if (!name || !isBrandIconsAvailable()) return null;
  return _carrierIconByName.get(name.toLowerCase()) || null;
}

// ─── Translations ────────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    lang: 'en',
    days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    today: 'today', tomorrow: 'tomorrow', yesterday: 'yesterday', at_time: 'at',
    days_ago: (n) => n + ' days ago',
    delivered_today: 'Delivered today.',
    letter_name_prefix: 'Mail item from ',
    delivered_yesterday: 'Delivered yesterday.',
    delivered_on: (day) => 'Delivered ' + day + '.',
    slot_any_moment: 'Delivery expected any moment.',
    slot_all_day: (day) => 'Delivery expected ' + day + '.',
    slot_late: (day, time) => 'Delivery was expected ' + (day === 'today' ? '' : day + ' ') + 'before ' + time + '.',
    slot_within_minutes: (m) => 'Delivery expected within ' + m + ' ' + pl(m, 'minute', 'minutes') + '.',
    slot_within_hour: (h) => 'Delivery expected within ' + h + ' ' + pl(h, 'hour', 'hours') + '.',
    slot_within: (h, m) => 'Delivery expected within ' + h + ' ' + pl(h, 'hour', 'hours') + ' and ' + m + ' ' + pl(m, 'minute', 'minutes') + '.',
    delivery_between: (day, from, to) => 'Delivery ' + day + ' between ' + from + ' - ' + to + '.',
    delivery_before: (day, to) => 'Delivery ' + day + ' before ' + to + '.',
    delivery_on: (day) => 'Delivery ' + day + '.',
    no_packages: 'No packages',
    not_found: ': not found',
    source_repo_link: 'View integration', source_repo_link_desc: 'Open the GitHub page for this integration',
    status: 'Status', status_desc: 'Status line below the name',
    carrier: 'Carrier', carrier_desc: 'Name of the carrier',
    carrier_logo: 'Carrier logo', carrier_logo_desc: 'Carrier logo next to the name.', carrier_logo_link: 'Requires custom-brand-icons',
    carrier_logo_requires_carrier: 'Enable Carrier to use this setting.',
    badge: 'Badge', badge_desc: 'Days until delivery, shown on the icon',
    details: 'Expandable details', details_desc: 'Show the chevron with extra info per package: event timeline, tracking code, package size, or letter scan',
    dim_delivered: 'Dim delivered packages', dim_delivered_desc: 'Show delivered packages at reduced opacity',
    location: 'Location', location_desc: 'Last known location, if available',
    layout: 'Card', single_card: 'Single card', split_cards: 'Separate cards',
    max_packages: 'Maximum amount of packages',
    show: 'Fields',
    behaviour: 'Behaviour',
    filter_status: 'Status', enroute: 'En route', delivered: 'Delivered', all: 'All',
    filter_direction: 'Direction', incoming: 'Incoming', outgoing: 'Outgoing',
    filter_date_label: 'Specific day', filter_date: 'Date', filter_date_desc: '0 = today  ·  -1 = yesterday  ·  1 = tomorrow  ·  Empty = no filter',
    filter_slot: 'Time slot', filter_slot_active: 'Active delivery window only', filter_slot_desc: 'Show only packages whose delivery window is currently active', filter_slot_requires_enroute: 'Set Status filter to En route to enable this.',
    filter_carrier: 'Carrier', carrier_code: 'Carriers', carrier_code_desc: 'Only show packages from selected carriers',
    carrier_code_empty: 'No carriers detected yet; add a source first',
    hide_when_empty: 'Hide when empty', hide_when_empty_desc: 'Hide the card when there are no packages to show',
    parcel_row_label: 'Raw data',
    letterbox: 'Fits in your letterbox',
    rerouted: 'Delivery to a pickup point.',
    service_point: (carrier) => 'Delivery to a ' + (carrier || 'pickup') + ' point.',
    entity_hint_postnl_canonical_incoming: 'Look for the sensor with a parcels attribute named incoming_parcels.',
    entity_hint_postnl_canonical_delivered: 'Look for the sensor with a parcels attribute named delivered_parcels. Optional: adds recent delivery history.',
    entity_hint_postnl_canonical_outgoing: 'Look for the sensor with a parcels attribute named outgoing_parcels.',
    entity_hint_postnl_canonical_outgoing_delivered: 'Look for the sensor with a parcels attribute named outgoing_delivered_parcels. Optional: shows completed return shipments.',
    postnl_canonical_incoming_label: 'Incoming (active)', postnl_canonical_delivered_label: 'Delivered (history)', postnl_canonical_outgoing_label: 'Outgoing',
    postnl_canonical_outgoing_delivered_label: 'Outgoing (delivered)',
    postnl_canonical_letters_label: 'Letters', entity_hint_postnl_canonical_letters: 'Look for the sensor with a letters attribute named postnl_letters.',
    entity_hint_parcel: 'Look for a sensor with a deliveries attribute. Usually named parcel_raw_shipment_data.',
    entity_hint_dhl_nl_incoming: 'Look for the sensor with a parcels attribute named incoming_parcels. This already includes parcels heading to a DHL ServicePoint.',
    entity_hint_dhl_nl_delivered: 'Look for the sensor with a parcels attribute named delivered_parcels. Optional: adds recent delivery history.',
    entity_hint_dhl_nl_outgoing: 'Look for the sensor with a parcels attribute named outgoing_parcels.',
    entity_hint_dhl_nl_outgoing_delivered: 'Look for the sensor with a parcels attribute named outgoing_delivered_parcels. Optional: shows completed return shipments.',
    dhl_nl_incoming_label: 'Incoming (active)', dhl_nl_delivered_label: 'Delivered (history)', dhl_nl_outgoing_label: 'Outgoing',
    dhl_nl_outgoing_delivered_label: 'Outgoing (delivered)',
    entity_hint_dpd_incoming: 'Look for the sensor with a parcels attribute named incoming_parcels.',
    entity_hint_dpd_delivered: 'Look for the sensor with a parcels attribute named delivered_parcels. Optional: adds recent delivery history.',
    entity_hint_dpd_outgoing: 'Look for the sensor with a parcels attribute named outgoing_parcels.',
    entity_hint_dpd_outgoing_delivered: 'Look for the sensor with a parcels attribute named outgoing_delivered_parcels. Optional: shows completed return shipments.',
    dpd_incoming_label: 'Incoming (active)', dpd_delivered_label: 'Delivered (history)', dpd_outgoing_label: 'Outgoing',
    dpd_outgoing_delivered_label: 'Outgoing (delivered)',
    entity_hint_gls_incoming: 'Look for the sensor with a parcels attribute named incoming_parcels.',
    entity_hint_gls_delivered: 'Look for the sensor with a parcels attribute named delivered_parcels. Optional: adds recent delivery history.',
    gls_incoming_label: 'Incoming (active)', gls_delivered_label: 'Delivered (history)',
    entity_hint_dragonfly_incoming: 'Look for the sensor with a parcels attribute named incoming_parcels.',
    entity_hint_dragonfly_delivered: 'Look for the sensor with a parcels attribute named delivered_parcels. Optional: adds recent delivery history.',
    dragonfly_incoming_label: 'Incoming (active)', dragonfly_delivered_label: 'Delivered (history)',
    advanced: 'Advanced',
    sources_auto_detect_notice: 'Sources are auto-detected from your Home Assistant integrations. Add the ones you want to track.',
    sources_none_configured_notice: "With nothing added below, the card itself already shows everything it recognizes; use the Filter tab to narrow that down, or add specific sources here to limit it to just those.",
    sources_empty_notice: 'No supported integrations detected yet.',
    sources_empty_link: 'See what this card supports',
    source_unnamed_device: 'Account',
    sources_orphaned_notice: "These were configured, but their entity no longer exists (removed or renamed). Remove them, or add the entity back under its original name to keep using them.",
    sources_tab: 'Sources', filter_tab: 'Filter', display_tab: 'Appearance',
  },
  nl: {
    lang: 'nl',
    days: ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'],
    months: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'],
    today: 'vandaag', tomorrow: 'morgen', yesterday: 'gisteren', at_time: 'om',
    days_ago: (n) => n + ' dagen geleden',
    delivered_today: 'Vandaag bezorgd.',
    letter_name_prefix: 'Poststuk van ',
    delivered_yesterday: 'Gisteren bezorgd.',
    delivered_on: (day) => day.charAt(0).toUpperCase() + day.slice(1) + ' bezorgd.',
    slot_any_moment: 'Levering verwacht elk moment.',
    slot_all_day: (day) => 'Levering verwacht ' + day + '.',
    slot_late: (day, time) => 'Levering werd verwacht ' + (day === 'vandaag' ? '' : day + ' ') + 'voor ' + time + '.',
    slot_within_minutes: (m) => 'Levering verwacht binnen ' + m + ' minuten.',
    slot_within_hour: (h) => 'Levering verwacht binnen ' + h + ' uur.',
    slot_within: (h, m) => 'Levering verwacht binnen ' + h + ' uur en ' + m + ' minuten.',
    delivery_between: (day, from, to) => 'Levering ' + day + ' tussen ' + from + ' - ' + to + '.',
    delivery_before: (day, to) => 'Levering ' + day + ' voor ' + to + '.',
    delivery_on: (day) => 'Levering ' + day + '.',
    no_packages: 'Geen pakketjes',
    not_found: ': niet gevonden',
    source_repo_link: 'Bekijk integratie', source_repo_link_desc: 'Open de GitHub-pagina van deze integratie',
    status: 'Status', status_desc: 'Statusregel onder de naam',
    carrier: 'Bezorgdienst', carrier_desc: 'Naam van de bezorgdienst',
    carrier_logo: 'Bezorgdienst logo', carrier_logo_desc: 'Logo van de bezorgdienst naast de naam.', carrier_logo_link: 'Vereist custom-brand-icons',
    carrier_logo_requires_carrier: 'Zet Bezorgdienst aan om deze instelling te gebruiken.',
    badge: 'Badge', badge_desc: 'Dagen tot levering, weergegeven op het icoon',
    details: 'Uitklapbare details', details_desc: 'Toon de chevron met extra info per pakket: tijdlijn, tracking code, pakketformaat, of brief-scan',
    dim_delivered: 'Dim bezorgde pakketten', dim_delivered_desc: 'Bezorgde pakketten met verminderde helderheid weergeven',
    location: 'Locatie', location_desc: 'Laatste bekende locatie, indien beschikbaar',
    layout: 'Kaart', single_card: 'Enkele kaart', split_cards: 'Losse kaarten',
    max_packages: 'Maximum aantal pakketjes',
    show: 'Velden',
    behaviour: 'Gedrag',
    filter_status: 'Status', enroute: 'Onderweg', delivered: 'Bezorgd', all: 'Alles',
    filter_direction: 'Richting', incoming: 'Ontvangen', outgoing: 'Verstuurd',
    filter_date_label: 'Specifieke dag', filter_date: 'Datum', filter_date_desc: '0 = vandaag  ·  -1 = gisteren  ·  1 = morgen  ·  Leeg = geen filter',
    filter_slot: 'Tijdslot', filter_slot_active: 'Alleen actief leveringstijdslot', filter_slot_desc: 'Toont alleen pakketjes waarvan het leveringstijdslot op dit moment actief is', filter_slot_requires_enroute: 'Stel de Status filter in op Onderweg om dit in te schakelen.',
    filter_carrier: 'Bezorgdienst', carrier_code: 'Bezorgdiensten', carrier_code_desc: 'Toon alleen pakketten van geselecteerde bezorgdiensten',
    carrier_code_empty: 'Nog geen bezorgdiensten gedetecteerd; voeg eerst een bron toe',
    hide_when_empty: 'Verberg bij leeg', hide_when_empty_desc: 'Verberg de kaart als er geen pakketjes zijn om te tonen',
    parcel_row_label: 'Ruwe data',
    letterbox: 'Past door de brievenbus',
    rerouted: 'Levering op een afhaalpunt.',
    service_point: (carrier) => 'Levering op een ' + (carrier || 'afhaal') + '-punt.',
    entity_hint_postnl_canonical_incoming: 'Zoek naar de sensor met een parcels attribuut genaamd incoming_parcels.',
    entity_hint_postnl_canonical_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd delivered_parcels. Optioneel: voegt recente bezorggeschiedenis toe.',
    entity_hint_postnl_canonical_outgoing: 'Zoek naar de sensor met een parcels attribuut genaamd outgoing_parcels.',
    entity_hint_postnl_canonical_outgoing_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd outgoing_delivered_parcels. Optioneel: toont afgeronde retourzendingen.',
    postnl_canonical_incoming_label: 'Onderweg (actief)', postnl_canonical_delivered_label: 'Bezorgd (geschiedenis)', postnl_canonical_outgoing_label: 'Verstuurd',
    postnl_canonical_outgoing_delivered_label: 'Verstuurd (bezorgd)',
    postnl_canonical_letters_label: 'Brieven', entity_hint_postnl_canonical_letters: 'Zoek naar de sensor met een letters attribuut genaamd postnl_letters.',
    entity_hint_parcel: 'Zoek naar een sensor met een deliveries attribuut. Meestal genaamd parcel_raw_shipment_data.',
    entity_hint_dhl_nl_incoming: 'Zoek naar de sensor met een parcels attribuut genaamd incoming_parcels. Dit bevat al pakketten die naar een DHL ServicePoint gaan.',
    entity_hint_dhl_nl_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd delivered_parcels. Optioneel: voegt recente bezorggeschiedenis toe.',
    entity_hint_dhl_nl_outgoing: 'Zoek naar de sensor met een parcels attribuut genaamd outgoing_parcels.',
    entity_hint_dhl_nl_outgoing_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd outgoing_delivered_parcels. Optioneel: toont afgeronde retourzendingen.',
    dhl_nl_incoming_label: 'Onderweg (actief)', dhl_nl_delivered_label: 'Bezorgd (geschiedenis)', dhl_nl_outgoing_label: 'Verstuurd',
    dhl_nl_outgoing_delivered_label: 'Verstuurd (bezorgd)',
    entity_hint_dpd_incoming: 'Zoek naar de sensor met een parcels attribuut genaamd incoming_parcels.',
    entity_hint_dpd_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd delivered_parcels. Optioneel: voegt recente bezorggeschiedenis toe.',
    entity_hint_dpd_outgoing: 'Zoek naar de sensor met een parcels attribuut genaamd outgoing_parcels.',
    entity_hint_dpd_outgoing_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd outgoing_delivered_parcels. Optioneel: toont afgeronde retourzendingen.',
    dpd_incoming_label: 'Onderweg (actief)', dpd_delivered_label: 'Bezorgd (geschiedenis)', dpd_outgoing_label: 'Verstuurd',
    dpd_outgoing_delivered_label: 'Verstuurd (bezorgd)',
    entity_hint_gls_incoming: 'Zoek naar de sensor met een parcels attribuut genaamd incoming_parcels.',
    entity_hint_gls_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd delivered_parcels. Optioneel: voegt recente bezorggeschiedenis toe.',
    gls_incoming_label: 'Onderweg (actief)', gls_delivered_label: 'Bezorgd (geschiedenis)',
    entity_hint_dragonfly_incoming: 'Zoek naar de sensor met een parcels attribuut genaamd incoming_parcels.',
    entity_hint_dragonfly_delivered: 'Zoek naar de sensor met een parcels attribuut genaamd delivered_parcels. Optioneel: voegt recente bezorggeschiedenis toe.',
    dragonfly_incoming_label: 'Onderweg (actief)', dragonfly_delivered_label: 'Bezorgd (geschiedenis)',
    advanced: 'Geavanceerd',
    sources_auto_detect_notice: 'Bronnen worden automatisch gedetecteerd vanuit je Home Assistant integraties. Voeg de gewenste toe.',
    sources_none_configured_notice: 'Voeg je hieronder niets toe, dan toont de kaart zelf al alles wat herkend wordt; gebruik de Filter-tab om dat te versmallen, of voeg hier specifieke bronnen toe om de kaart tot alleen die te beperken.',
    sources_empty_notice: 'Nog geen ondersteunde integraties gedetecteerd.',
    sources_empty_link: 'Bekijk wat deze kaart ondersteunt',
    source_unnamed_device: 'Account',
    sources_orphaned_notice: 'Deze waren toegevoegd, maar hun entity bestaat niet meer (verwijderd of hernoemd). Verwijder ze, of voeg de entity terug toe onder de oorspronkelijke naam om ze te blijven gebruiken.',
    sources_tab: 'Bronnen', filter_tab: 'Filter', display_tab: 'Weergave',
  },
};

// pl(n, one, other): minimal pluralisation helper (EN only needs it)
function pl(n, one, other) { return n === 1 ? one : other; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysUntil(date) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(date); d.setHours(0,0,0,0);
  return Math.round((d - today) / 86400000);
}

function formatDay(date, tr) {
  const diff = daysUntil(date), d = new Date(date);
  if (diff ===  0) return tr.today;
  if (diff ===  1) return tr.tomorrow;
  if (diff === -1) return tr.yesterday;
  if (diff > 1 && diff < 7) return tr.days[d.getDay()];
  if (diff < 0) return tr.days_ago(Math.abs(diff));
  return tr.days[d.getDay()] + ' ' + d.getDate() + ' ' + tr.months[d.getMonth()];
}

// Always a fixed calendar date ("17 juni"), never "today"/"X days ago";
// for places that already show a relative day phrase elsewhere on the same
// row (e.g. a letter's delivered-state line), so the two don't repeat.
function formatAbsoluteDate(date, tr) {
  const d = new Date(date);
  return d.getDate() + ' ' + tr.months[d.getMonth()];
}

function formatTime(d) {
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function ensurePeriod(s) { const t = (s || '').trimEnd(); return t && !t.endsWith('.') ? t + '.' : t; }

// Shared by bestStatusLine/rawStatusLine/resolveCanonicalEvents below: is
// this raw_status a DHL NL/DPD-style machine code (SCREAMING_SNAKE) rather
// than an already human-readable sentence (PostNL's own raw_status)?
function isMachineCodeStatus(s) { return /^[A-Z][A-Z0-9_]*$/.test(String(s || '')); }

// Shared by rawStatusLine/resolveCanonicalEvents below: are these two status
// strings effectively the same, ignoring case/underscore/whitespace
// formatting differences (e.g. raw "DELIVERED" vs. canonical "delivered")?
function normalizeStatusForCompare(s) { return String(s || '').toLowerCase().replace(/[_\s]/g, ''); }

// Some carrier APIs log the same status update multiple times within a
// short window (e.g. three identical "Pakketgegevens verwerkt" events a
// minute apart); collapse runs of consecutive events with identical text
// into just the most recent one, regardless of which integration the
// events came from.
function dedupEvents(events) {
  if (!events?.length) return events;
  const DEDUP_WINDOW_MS = 5 * 60 * 1000;
  const result = [];
  for (const e of events) {
    const prev = result[result.length - 1];
    if (prev && prev.text === e.text && prev.date && e.date && !isNaN(prev.date) && !isNaN(e.date)
        && Math.abs(prev.date - e.date) <= DEDUP_WINDOW_MS) {
      continue;
    }
    result.push(e);
  }
  return result;
}

function formatDeliveredText(date, tr) {
  const day = formatDay(date, tr);
  if (day === tr.today)     return tr.delivered_today;
  if (day === tr.yesterday) return tr.delivered_yesterday;
  return tr.delivered_on(day);
}

function isSlotActive(from, to) {
  if (!from || !to) return false;
  const now = new Date();
  return now >= new Date(from) && now <= new Date(to);
}

function formatTimeRemaining(toDate, tr, fromDate) {
  if (fromDate) { const f = new Date(fromDate); if (f.getHours() === 0 && f.getMinutes() === 0) return tr.slot_all_day(formatDay(f, tr)); }
  const to   = new Date(toDate);
  const rawDiff = Math.round((to - new Date()) / 60000);
  const diff  = rawDiff > 0 ? Math.ceil(rawDiff / 5) * 5 : rawDiff; // round up to next 5 min
  if (diff < 0) return tr.slot_late(formatDay(to, tr), formatTime(to));
  if (diff === 0) return tr.slot_any_moment;
  const h = Math.floor(diff / 60), m = diff % 60;
  if (h > 0 && m > 0) return tr.slot_within(h, m);
  if (h > 0)          return tr.slot_within_hour(h);
  return tr.slot_within_minutes(m);
}

// Shared delivery-window shape (planned_from/planned_to) across the
// canonical parcel family. Returns null when fromStr doesn't parse to a
// valid date (caller falls back to its own status-only line1).
function computeDeliverySlot(fromStr, toStr, tr, statusLine) {
  const from = new Date(fromStr);
  if (isNaN(from)) return null;
  const to = toStr ? new Date(toStr) : null;
  const slotActive = to ? isSlotActive(fromStr, toStr) : false;
  const pastSlot = to && !slotActive && new Date() > to;
  let line2;
  if (slotActive || pastSlot) line2 = formatTimeRemaining(to, tr, from);
  else if (to)                line2 = tr.delivery_between(formatDay(from, tr), formatTime(from), formatTime(to));
  else                        line2 = tr.delivery_on(formatDay(from, tr));
  return { deliveryDate: from, slotActive, slotEnd: to, line1: statusLine, line2 };
}

// parseDate: normalizes various date formats to a JS Date.
// Handles ISO, DD.MM.YYYY HH:MM, and 'dayname DD monthname HH:MM' (Parcel/Amazon).
const _MONTH_NL = {januari:1,februari:2,maart:3,april:4,mei:5,juni:6,juli:7,augustus:8,september:9,oktober:10,november:11,december:12};
const _MONTH_EN = {january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};

function parseDate(str) {
  if (!str) return null;
  const s = str.trim();
  // DD.MM.YYYY HH:MM
  const dot = s.match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}:\d{2}))?$/);
  if (dot) {
    const iso = dot[3] + '-' + dot[2] + '-' + dot[1] + (dot[4] ? 'T' + dot[4] : '');
    const d = new Date(iso); if (!isNaN(d)) return d;
  }
  // 'dinsdag 31 maart 19:44' or 'Tuesday 31 March 19:44'
  const verbal = s.match(/^\w+\s+(\d{1,2})\s+(\w+)(?:\s+(\d{2}:\d{2}))?$/);
  if (verbal) {
    const month = _MONTH_NL[verbal[2].toLowerCase()] || _MONTH_EN[verbal[2].toLowerCase()];
    if (month) {
      const year = new Date().getFullYear();
      const iso  = year + '-' + String(month).padStart(2,'0') + '-' + String(verbal[1]).padStart(2,'0') + (verbal[3] ? 'T' + verbal[3] : '');
      const d = new Date(iso); if (!isNaN(d)) return d;
    }
  }
  const d = new Date(s); return isNaN(d) ? null : d;
}

function copyFallback(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch(_) {}
  document.body.removeChild(ta);
}

function buildParcelUrl(code, tracking) {
  if (!code || !tracking) return null;
  return 'https://parcel.app/webtrack.php?platform=web&type=' + encodeURIComponent(code) + '&code=' + encodeURIComponent(tracking);
}

function parseExpected(ts, fallback) {
  if (ts !== undefined && ts !== null) {
    if (typeof ts === 'number') {
      const d = new Date(ts * 1000);
      const pad = n => String(n).padStart(2, '0');
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
             'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    return String(ts).replace(' ', 'T');
  }
  return fallback ? String(fallback).replace(' ', 'T') : null;
}

// ─── Normalised item model ────────────────────────────────────────────────────

function mkItem(overrides) {
  const item = {
    name: '', line1: null, line2: null, location: null,
    icon: null, color: 'grey',
    deliveryDate: null, slotActive: false, delivered: false,
    carrierCode: null, carrier: null, brandIcon: null,
    tapUrl: null, direction: 'incoming', slotEnd: null, trackingCode: null, letterbox: false, rerouted: false, servicePoint: false, pickupPoint: null, events: [], imageUrl: null, packageSize: null, packageSizeIcon: null,
    dedupKey: undefined,
    ...overrides,
  };
  // Separate from trackingCode (which is also shown to the user with a
  // copy button); items without a meaningful tracking code, like letters,
  // can still have a real, stable unique identifier worth deduplicating on
  // (e.g. PostNL's mailitem id), without showing that internal id as if it
  // were a copyable tracking code.
  if (item.dedupKey === undefined) item.dedupKey = item.trackingCode;
  return item;
}

// ─── Status mappings ──────────────────────────────────────────────────────────
// Defined before INTEGRATIONS so they can be referenced directly in _map methods.

// Single shared icon+color palette, keyed by conceptual meaning rather than
// by any one integration's own status vocabulary. PostNL, Parcel, and the
// canonical DHL NL/DPD/PostNL-4.0 enum all delegate to this same palette, so
// the same underlying situation always looks identical regardless of which
// integration reported it.
const STATUS_STYLE = {
  expected:            { icon: 'mdi:clock-outline',                color: 'var(--amber-color, #FFC107)' },
  registered:          { icon: 'mdi:package-variant-closed',       color: 'grey'   },
  in_transit:          { icon: 'mdi:package-variant',              color: 'blue'   },
  out_for_delivery:    { icon: 'mdi:truck-fast',                   color: 'orange' },
  at_pickup_point:     { icon: 'mdi:store-marker',                 color: 'purple' },
  delivered:           { icon: 'mdi:package-variant-closed-check', color: 'green'  },
  delivered_neighbour: { icon: 'mdi:home-account',                 color: 'green'  },
  missed:              { icon: 'mdi:account-alert',                color: 'red'    },
  returning:           { icon: 'mdi:package-variant-closed-remove', color: 'red'   },
  problem:             { icon: 'mdi:alert-circle-outline',         color: 'red'    },
  unknown:             { icon: 'mdi:package-variant',              color: 'grey'   },
};

function parcelStatus(code) {
  return ({
    0: STATUS_STYLE.delivered,
    // Per the official docs (parcelapp.net/help/api-view-deliveries.html):
    // "no updates for a long time... believes it will never be updated":
    // a stalled/stuck delivery, not healthy progress like a normal in-transit.
    1: STATUS_STYLE.problem,
    2: STATUS_STYLE.in_transit,
    3: STATUS_STYLE.at_pickup_point,
    4: STATUS_STYLE.out_for_delivery,
    // "Delivery not found": Parcel couldn't locate this tracking number at
    // all, which is worth flagging, not a neutral "we don't know" state.
    5: STATUS_STYLE.problem,
    6: STATUS_STYLE.missed,
    7: STATUS_STYLE.problem,
    // Confirmed via real data: a DPD parcel with canonical status
    // "registered" (raw ORDER_CREATED) showed up via Parcel with
    // status_code 8 for the exact same barcode, not "expected" as
    // originally (unverified) assumed. Also matches the official docs:
    // "carrier has received information... but has not physically received
    // it yet".
    8: STATUS_STYLE.registered,
  })[code] || STATUS_STYLE.unknown;
}

// ─── Integration registry ─────────────────────────────────────────────────────
// To add a new integration: add one entry here. Nothing else needs to change.
//
// Each entry defines:
//   platforms   : integration platform strings (hass.entities[id].platform)
//   entityHints : fallback strings that may appear in entity IDs
//   hasAttrs    : (attrs) => bool, confirms the right entity by attribute shape
//   collect     : (attrs, ctx) => item[], maps raw sensor data to normalised items
//
// ctx = { tr }: shared context passed to collect

// Canonical ParcelStatus: normalised status enum → icon/color/text
// Source: HA community forum post by ptnijssen, June 19 2026 (BETA 2.0.0 changelog)
// Carrier-agnostic ParcelStatus enum, shared across DHL NL, DPD, and (in the
// future) PostNL 4.0.0, all from the same peternijssen integration family.
function canonicalParcelStatus(status) {
  return ({
    registered:        STATUS_STYLE.registered,
    in_transit:        STATUS_STYLE.in_transit,
    out_for_delivery:  STATUS_STYLE.out_for_delivery,
    at_pickup_point:   STATUS_STYLE.at_pickup_point,
    delivered:         STATUS_STYLE.delivered,
    returning:         STATUS_STYLE.returning,
    problem:           STATUS_STYLE.problem,
  })[status] || STATUS_STYLE.unknown;
}

function canonicalParcelStatusLine(status, tr) {
  return ({
    registered:       tr.lang === 'nl' ? 'Zending aangemeld.'         : 'Shipment registered.',
    in_transit:       tr.lang === 'nl' ? 'Onderweg.'                  : 'In transit.',
    out_for_delivery: tr.lang === 'nl' ? 'Bezorging vandaag.'         : 'Out for delivery today.',
    at_pickup_point:  tr.lang === 'nl' ? 'Klaar om af te halen.'      : 'Ready for pickup.',
    delivered:        tr.lang === 'nl' ? 'Bezorgd.'                   : 'Delivered.',
    returning:        tr.lang === 'nl' ? 'Retour naar afzender.'      : 'Returning to sender.',
    problem:          tr.lang === 'nl' ? 'Probleem met bezorging.'    : 'Delivery problem.',
  })[status] || ensurePeriod(status || (tr.lang === 'nl' ? 'Status onbekend' : 'Status unknown'));
}

// Prefer raw_status as the primary line whenever it's actually human-readable
// text (not DHL NL/DPD's machine-code SCREAMING_SNAKE shape, see rawStatusLine
// below); e.g. PostNL's raw_status is already a real sentence ("Bezorger is
// onderweg") that's consistently more specific than the translated canonical
// line ("Onderweg."), even when `status` itself is one of the seven known
// values. Machine-code raw_status never reaches here (same regex used by
// rawStatusLine), so this can't show a raw enum value as the primary line.
function bestStatusLine(status, rawStatus, tr) {
  if (rawStatus && !isMachineCodeStatus(rawStatus)) {
    return ensurePeriod(rawStatus);
  }
  return canonicalParcelStatusLine(status, tr);
}

// `raw_status` is always English (it's the carrier's own API vocabulary, no
// translation table is realistic across every carrier) but is consistently
// at least as specific as the canonical `status`, sometimes much more so
// (e.g. "delivered" -> "DELIVERED_AT_NEIGHBOURS"). Shown as a secondary line,
// never replacing the translated primary status line.
function humanizeRawStatus(rawStatus) {
  if (!rawStatus) return null;
  const words = String(rawStatus).toLowerCase().replace(/_/g, ' ').trim();
  if (!words) return null;
  return ensurePeriod(words.charAt(0).toUpperCase() + words.slice(1));
}

// DHL's `receiver.address.street` sometimes bundles the house number into the
// street field (e.g. "Gors 15") while `destination.address.street` keeps it
// separate ("Gors" + houseNumber "14"); strip a trailing number before
// comparing so we can tell whether a neighbour is on the same street.
function normalizeStreetForCompare(street) {
  if (!street) return '';
  return String(street).replace(/\s+\d+\w*$/, '').trim().toLowerCase();
}

function formatNeighbourAddress(raw) {
  const destAddr = raw?.destination?.address;
  if (!destAddr?.houseNumber) return null;
  const houseNum = destAddr.houseNumber + (destAddr.houseNumberSuffix || '');
  const destStreet = normalizeStreetForCompare(destAddr.street);
  const recvStreet = normalizeStreetForCompare(raw?.receiver?.address?.street);
  if (destStreet && destStreet === recvStreet) return 'nr. ' + houseNum;
  return (destAddr.street ? destAddr.street + ' ' : '') + houseNum;
}

function rawStatusLine(p) {
  // Only show raw_status when it looks like a machine code (SCREAMING_SNAKE,
  // the shape DHL NL/DPD use); PostNL's raw_status is already a translated,
  // human-readable Dutch sentence ("Pakket is bezorgd") that never carries
  // more detail than the canonical status, just different wording. Showing
  // that would duplicate line1 in different words for every single status.
  if (!isMachineCodeStatus(p.raw_status || '')) return null;
  let text = humanizeRawStatus(p.raw_status);
  if (!text) return null;
  // Skip when raw_status is just the canonical status in a different format
  // (e.g. raw "DELIVERED" for canonical "delivered" would just repeat
  // "Delivered." right under "Delivered yesterday."); only show it when it
  // actually adds something, like "DELIVERED_AT_NEIGHBOURS".
  if (normalizeStatusForCompare(p.raw_status) === normalizeStatusForCompare(p.status)) return null;
  if (p.raw?.destination?.locationType === 'NEIGHBOUR') {
    const addr = formatNeighbourAddress(p.raw);
    if (addr) text = text.slice(0, -1) + ' (' + addr + ').'; // insert before the trailing period
  }
  return text;
}

// Prefer the most specific name available in `raw`; its shape differs per
// carrier (PostNL: raw.name is the webshop; DHL NL: raw.sender.name; DPD:
// raw.senderName), so we try each known path before falling back to the
// canonical `sender` field (which for PostNL is the household member who
// placed the order, not the webshop; less useful for identifying the
// parcel, but still the best we have when raw isn't available).
// For outgoing parcels, `sender`/raw sender fields are not useful (that's
// just the account holder, i.e. yourself); DHL NL 2.1.0+ exposes a
// top-level `receiver` field with the actual addressee, which is what you
// actually want to see on something you sent. Falls back to the sender
// chain for carriers/versions that don't have `receiver` yet (e.g. DPD).
function resolveCanonicalName(p, direction) {
  return (direction === 'outgoing' && p.receiver)
    ? p.receiver.trim()
    : (p.raw?.name || p.raw?.sender?.name || p.raw?.senderName || p.sender || '').trim();
}

// Confirmed via real DPD data: both canonical (top-level, not just raw)
// fields, so other carriers in this family may expose them too. Weight is
// only shown when above 0; every null/0 example we've seen so far was for
// an obviously non-weightless parcel, so 0 reads as "not yet known" rather
// than a real measurement. Assumes kg (near-certain for a European
// carrier, but unconfirmed); flag if a real value turns out to use a
// different unit.
function resolveCanonicalPackageSize(p) {
  const sizeText   = p.dimensions?.text || null;
  const weightText = (typeof p.weight === 'number' && p.weight > 0) ? p.weight + ' kg' : null;
  const packageSize = [sizeText, weightText].filter(Boolean).join(' · ') || null;
  // A ruler only makes sense when we actually have dimensions; weight-only
  // info reads oddly next to a ruler icon, so use a scale instead.
  let packageSizeIcon = null;
  if      (sizeText)   packageSizeIcon = 'mdi:ruler-square';
  else if (weightText) packageSizeIcon = 'mdi:scale';
  return { packageSize, packageSizeIcon };
}

// Optional, off-by-default `history` array, confirmed directly by
// peternijssen (shared across DHL NL/DPD/PostNL canonical 2.3.0/2.3.0/4.2.0)
// as {timestamp, status, raw_status}[], oldest first. Reversed to
// newest-first, since that's the order the rest of the card's event
// timeline expects.
//
// Confirmed against real history data from all three: DHL NL's raw_status
// is a SCREAMING_SNAKE_CASE machine code (PARCEL_SORTED_AT_HUB), but
// PostNL's and (surprisingly) DPD's are already full, human-readable
// sentences ("Bezorger is onderweg", "Hub or other premises - Sorted").
// That's a meaningfully different shape from DPD's top-level raw_status
// (which IS a machine code, e.g. "DELIVERED"); the per-entry history
// field doesn't follow the same convention. So: when raw_status looks
// like a machine code, treat it as enrichment alongside the canonical
// status (same approach the main status line already uses). When it's
// already a sentence, it's inherently more specific than the generic
// canonical text ("In transit.") and is used directly instead.
function resolveCanonicalEvents(p, tr) {
  return Array.isArray(p.history) ? [...p.history].reverse().map(h => {
    const date = h.timestamp ? new Date(h.timestamp) : null;
    let text;
    if (h.raw_status && !isMachineCodeStatus(h.raw_status)) {
      text = ensurePeriod(h.raw_status);
    } else {
      text = canonicalParcelStatusLine(h.status, tr);
      if (h.raw_status && normalizeStatusForCompare(h.raw_status) !== normalizeStatusForCompare(h.status)) {
        const raw = humanizeRawStatus(h.raw_status);
        if (raw) text = text.replace(/\.$/, '') + ' (' + raw.replace(/\.$/, '').toLowerCase() + ').';
      }
    }
    return { date: date && !isNaN(date) ? date : null, text, location: null };
  }) : [];
}

// `status` is the authoritative signal (the integration itself documents
// status as taking precedence over category). In a narrow race condition
// the raw `delivered` boolean (category-based) can lag behind a more
// specific status like "delivered", so we don't trust `delivered` at all,
// and fall back to whichever date field is actually populated.
function resolveCanonicalDeliverySlot(p, tr) {
  const status    = p.status || 'unknown';
  const delivered = status === 'delivered';
  const { icon, color } = canonicalParcelStatus(status);
  let deliveryDate = null, line1 = null, line2 = null, slotActive = false, slotEnd = null;

  if (delivered) {
    const dateStr = p.delivered_at || p.planned_from; // fallback covers the race condition above
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d)) { deliveryDate = d; line1 = formatDeliveredText(d, tr); }
    }
  } else if (p.planned_from) {
    // DPD's own normalization currently falls back to a whole calendar day
    // (00:00–23:59) for planned_from/planned_to even when it already knows a
    // much tighter window in raw.deliveryTimeFrom/deliveryTimeTo; prefer
    // that more specific window when present. Harmless no-op for carriers
    // (like DHL NL) that don't have these raw fields.
    let fromStr = p.planned_from, toStr = p.planned_to;
    if (p.raw?.deliveryDate && p.raw?.deliveryTimeFrom && p.raw?.deliveryTimeTo) {
      fromStr = p.raw.deliveryDate + 'T' + p.raw.deliveryTimeFrom;
      toStr   = p.raw.deliveryDate + 'T' + p.raw.deliveryTimeTo;
    }
    const slot = computeDeliverySlot(fromStr, toStr, tr, bestStatusLine(status, p.raw_status, tr));
    if (slot) ({ deliveryDate, slotActive, slotEnd, line1, line2 } = slot);
  }
  if (!line1) line1 = bestStatusLine(status, p.raw_status, tr);
  if (!line2) line2 = rawStatusLine(p);

  return { status, delivered, icon, color, deliveryDate, line1, line2, slotActive, slotEnd };
}

// Shared mapper for both dhl_nl_incoming and dhl_nl_delivered: same normalised
// parcel shape on both sensors (confirmed from sensor.py: both expose a
// `parcels` attribute via the same coordinator data model).
// Shared mapper for the whole "canonical parcel" family (DHL NL, DPD, and in
// the future PostNL 4.0.0), same normalised shape across all of them, only
// the carrier identity and direction differ per source.
function mapCanonicalParcel(p, tr, { carrierGroup, carrierCode, direction = 'incoming' }) {
  const { delivered, icon, color, deliveryDate, line1, line2, slotActive, slotEnd } =
    resolveCanonicalDeliverySlot(p, tr);

  const name = resolveCanonicalName(p, direction);

  // Same principle for the letterbox/rerouted/pickup-point chips: read from
  // raw when the carrier exposes that detail (confirmed for PostNL's
  // shipment_type/delivery_address_type), gracefully no-op for carriers
  // (DHL NL, DPD) that don't have an equivalent raw field.
  const shipmentType = p.raw?.shipment_type;
  const addressType  = p.raw?.delivery_address_type;

  const { packageSize, packageSizeIcon } = resolveCanonicalPackageSize(p);
  const events = resolveCanonicalEvents(p, tr);

  return mkItem({
    name, line1, line2, icon, color,
    deliveryDate, slotActive, delivered, slotEnd,
    carrierCode, carrier: carrierName(carrierGroup, carrierCode), brandIcon: getBrandIcon(carrierGroup, carrierCode),
    tapUrl: p.url || null, direction,
    integration: carrierGroup,
    letterbox:    shipmentType === 'LetterboxParcel',
    rerouted:     addressType === 'Rerouted',
    servicePoint: addressType === 'ServicePoint' || !!p.pickup,
    pickupPoint: p.pickup_point || null,
    trackingCode: p.barcode || null,
    packageSize,
    packageSizeIcon,
    events,
  });
}

// PostNL 4.0's letters/mail-scan feature: structurally nothing like a
// parcel (no status, no tracking, no carrier diversity since it's always
// PostNL), so it gets its own small mapper rather than forcing it through
// mapCanonicalParcel. The envelope scan (image_url) takes over the icon slot
// and is shown larger in the detail view; there's no event history or
// tracking code to show there instead.
// The summary sensor's `image_url` per letter points directly at PostNL's
// own authenticated API and can't be loaded from the browser. Each letter
// also gets its own `image.*` entity (confirmed via real data: its `id`
// attribute matches the letter's `id`) whose `entity_picture` is an
// HA-proxied, already-authenticated path the browser *can* load; that's
// what Peter's own example dashboard uses too. Falls back to the raw
// image_url (won't load, but at least the data is there) if no matching
// image entity is found, e.g. while hass.states isn't available yet.
// Builds the letter-id -> entity_picture lookup once per collect() call
// instead of re-scanning all of hass.states for every letter (previously
// O(letters * total entities) per render).
function buildPostnlImageMap(hass) {
  const map = new Map();
  if (!hass?.states) return map;
  for (const [entityId, state] of Object.entries(hass.states)) {
    if (entityId.startsWith('image.') && state.attributes?.id !== undefined) {
      map.set(state.attributes.id, state.attributes.entity_picture || null);
    }
  }
  return map;
}

function findPostnlLetterImage(letter, imageMap) {
  return imageMap.get(letter.id) || null;
}

function mapPostnlLetter(letter, tr, imageMap) {
  const d = letter.date ? new Date(letter.date) : null;
  const validDate = d && !isNaN(d);
  // Stay in the active/enroute bucket on the scan date itself (today's mail
  // is still "new"), only move to delivered/history starting the next day.
  const delivered = validDate ? daysUntil(d) < 0 : true;
  // The letter's "delivery window" was simply that one scan day (there's no
  // time component); once that day has passed, describe it the same way a
  // delivered parcel is ("Delivered yesterday."); while still today, use the
  // same all-day-window phrasing a midnight-only parcel slot gets.
  let line1 = null;
  if (validDate) line1 = delivered ? formatDeliveredText(d, tr) : tr.delivery_on(formatDay(d, tr));
  // Always resolve the actual scan, even once delivered; it's still useful
  // to look back at what a piece of mail actually was. Only the small row
  // icon switches to a checkmark once delivered (handled in renderRow); the
  // detail view and click-to-expand keep working off this imageUrl either way.
  const imageUrl = findPostnlLetterImage(letter, imageMap) || letter.image_url || null;
  // `title` is a free-form string (in every example we've seen it happens
  // to read like a date, e.g. "17 juni", but nothing guarantees that stays
  // true; it's not the same field as `date`). Build the displayed date
  // phrase ourselves from the actual parsed `date` instead, so the sentence
  // ("Mail item from ___") always stays grammatically correct regardless of
  // what title contains. Uses a fixed calendar date, not the relative
  // "X days ago" phrasing line1 already uses, so the two don't repeat each
  // other. Only falls back to the raw title when date itself doesn't parse.
  const dateLabel = validDate ? formatAbsoluteDate(d, tr) : (letter.title || '').trim();
  return mkItem({
    name: tr.letter_name_prefix + dateLabel,
    line1,
    icon: delivered ? 'mdi:email-check-outline' : 'mdi:email-outline', color: delivered ? 'green' : 'blue',
    deliveryDate: validDate ? d : null,
    delivered,
    carrierCode: 'postnl', carrier: carrierName('postnl', 'postnl'), brandIcon: getBrandIcon('postnl', 'postnl'),
    tapUrl: imageUrl,
    direction: 'incoming',
    integration: 'postnl',
    letterbox: true, // mail always fits through the mailbox by definition
    imageUrl,
    // No tracking code worth showing, but `id` is a real, stable unique
    // identifier (also used to match the per-letter image entity); use it
    // to dedupe instead. Confirmed against real PostNL data: a
    // LetterboxParcel (a parcel that fits through the mailbox) gets
    // announced through *both* MyMail (this letter, `id` = the tracking
    // barcode) and incoming/delivered parcels (same barcode as
    // trackingCode); so this also dedupes those two representations of
    // the same physical item into one row, not just the "same account
    // configured twice" case this comment originally covered. See
    // ENRICHMENT_FIELDS' `imageUrl` entry below for why the merge keeps
    // the letter's scan photo either way.
    dedupKey: letter.id || null,
  });
}

// Shared shape for the "canonical parcel" family (DHL NL, DPD, GLS, and
// PostNL 4.0+'s own parcels sensors): same normalised `parcels` attribute +
// mapCanonicalParcel() call across every one of these, only identity/
// direction/hint-matching differ per entry. `direction` is passed straight
// through to mapCanonicalParcel too: every entry in this family already
// keeps its own `direction` field in sync with what its collect() call used
// to pass mapCanonicalParcel (outgoing entries passed direction: 'outgoing'
// explicitly, incoming entries omitted it and relied on the 'incoming'
// default -- passing it through explicitly here is equivalent either way).
function mkCanonicalEntry({
  group, groupLabel, rowLabel, rowLabelKey, entityHintText, direction, url, platforms,
  entityHints, excludeHints, carrierGroup, carrierCode,
  // For this carrier, Parcel's own data currently wins wholesale over this
  // dedicated integration's during dedup (see PARCEL_WINS_FOR below) --
  // declared here so that Set can be derived from the registry itself
  // instead of a second, disconnected place that has to be remembered and
  // edited by hand as each dedicated integration matures.
  parcelWins,
}) {
  return {
    group, groupLabel, rowLabel, rowLabelKey, entityHintText, direction, url, platforms, entityHints,
    ...(excludeHints ? { excludeHints } : {}),
    // Marks this as a real per-carrier ha-parcel-integrations family entry,
    // so _renderSources's group-filtering loop knows to skip its old
    // registry-driven rendering in favor of the generic canonical discovery
    // section (see discoverCanonicalSources/canonicalSourceInfo), and
    // migrateSourceType knows its config can be migrated to the type-less
    // `{ entity }` shape. Every mkCanonicalEntry user is by definition such
    // a family member, so this is unconditional, not a parameter.
    canonical: true,
    ...(parcelWins ? { carrierGroup, parcelWins } : {}),
    hasAttrs: (a) => Array.isArray(a.parcels),
    collect(attrs, ctx) {
      return (attrs.parcels || []).map((p) => mapCanonicalParcel(p, ctx.tr, { carrierGroup, carrierCode, direction }));
    },
  };
}

const INTEGRATIONS = {

  postnl_canonical_incoming: mkCanonicalEntry({
    group:       'postnl_canonical',
    groupLabel:  'PostNL',
    rowLabel:    'Incoming (active)',
    rowLabelKey: 'postnl_canonical_incoming_label',
    entityHintText: 'entity_hint_postnl_canonical_incoming',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['incoming_parcels', 'postnl_incoming'],
    excludeHints: ['en_route', 'awaiting_pickup', 'pickup_pending', 'next_delivery', 'letter'],
    carrierGroup: 'postnl', carrierCode: 'postnl',
  }),

  postnl_canonical_delivered: mkCanonicalEntry({
    group:       'postnl_canonical',
    groupLabel:  'PostNL',
    rowLabel:    'Delivered (history)',
    rowLabelKey: 'postnl_canonical_delivered_label',
    entityHintText: 'entity_hint_postnl_canonical_delivered',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['delivered_parcels', 'postnl_delivered'],
    // outgoing_delivered: PostNL 4.3.0 added a separate outgoing_delivered_
    // parcels sensor (see postnl_canonical_outgoing_delivered below) whose
    // entity_id contains "delivered_parcels" as a substring; without this
    // exclusion it would tie/outscore that dedicated type in bestTypeByHints
    // and get misdetected as regular incoming delivery history.
    excludeHints: ['en_route', 'awaiting_pickup', 'pickup_pending', 'next_delivery', 'letter', 'outgoing_delivered'],
    carrierGroup: 'postnl', carrierCode: 'postnl',
  }),

  postnl_canonical_outgoing_delivered: mkCanonicalEntry({
    group:       'postnl_canonical',
    groupLabel:  'PostNL',
    rowLabel:    'Outgoing (delivered)',
    rowLabelKey: 'postnl_canonical_outgoing_delivered_label',
    entityHintText: 'entity_hint_postnl_canonical_outgoing_delivered',
    direction:   'outgoing',
    url:         'https://github.com/ha-parcel-integrations/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['outgoing_delivered_parcels'],
    excludeHints: ['en_route', 'awaiting_pickup', 'pickup_pending', 'next_delivery', 'letter'],
    // New in PostNL 4.3.0 (confirmed via its own release notes): return
    // shipments land here once delivered back to the sender, kept separate
    // from postnl_canonical_delivered's regular incoming history so
    // completed returns don't get shown as if they were freshly received.
    carrierGroup: 'postnl', carrierCode: 'postnl',
  }),

  postnl_canonical_outgoing: mkCanonicalEntry({
    group:       'postnl_canonical',
    groupLabel:  'PostNL',
    rowLabel:    'Outgoing',
    rowLabelKey: 'postnl_canonical_outgoing_label',
    entityHintText: 'entity_hint_postnl_canonical_outgoing',
    direction:   'outgoing',
    url:         'https://github.com/ha-parcel-integrations/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['outgoing_parcels', 'postnl_outgoing'],
    // outgoing_delivered: the dedicated sensor's entity_id (e.g.
    // "postnl_outgoing_delivered_parcels") contains "postnl_outgoing" as a
    // substring too, tying with postnl_canonical_outgoing_delivered's own
    // hint in bestTypeByHints; same collision as the one already excluded
    // on postnl_canonical_delivered above, mirrored here for its sibling.
    excludeHints: ['en_route', 'awaiting_pickup', 'pickup_pending', 'next_delivery', 'letter', 'outgoing_delivered'],
    // PostNL 4.0 (peternijssen fork) is stable. 4.1.0 added a `receiver`
    // field, confirmed via its own release notes ("matching the DHL and DPD
    // integrations"); the outgoing-name ambiguity flagged here previously
    // is resolved the same way DHL NL's was; mapCanonicalParcel already
    // reads `receiver` generically for any carrier, no change needed there.
    carrierGroup: 'postnl', carrierCode: 'postnl',
  }),

  postnl_canonical_letters: {
    // Own group key, deliberately not 'postnl_canonical': that group's other
    // four entries are superseded by the generic canonical detector below
    // (see canonicalSourceInfo) and no longer rendered through this
    // registry-driven path in the editor. Letters has no `carrier` field at
    // all (confirmed against its own letters.py -- see canonicalSourceInfo's
    // comment) and stays registry-driven; sharing the old group key would
    // have swept it away together with the other four.
    group:       'postnl_letters',
    groupLabel:  'PostNL',
    rowLabel:    'Letters',
    rowLabelKey: 'postnl_canonical_letters_label',
    entityHintText: 'entity_hint_postnl_canonical_letters',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-postnl',
    platforms:   ['postnl'],
    entityHints: ['postnl_letters', 'letters'],
    hasAttrs:    (a) => Array.isArray(a.letters),
    collect(attrs, ctx) {
      const imageMap = buildPostnlImageMap(ctx.hass);
      return (attrs.letters || []).map(l => mapPostnlLetter(l, ctx.tr, imageMap));
    },
  },

  parcel: {
    group:       'parcel',
    groupLabel:  'Parcel',
    rowLabel:    'Raw data',
    rowLabelKey: 'parcel_row_label',
    entityHintText: 'entity_hint_parcel',
    direction:   'incoming',
    url:         'https://github.com/jmdevita/parcel-ha',
    platforms:   ['parcel'],
    entityHints: ['parcel', 'pakket', 'pakje', 'zending', 'packag', 'shipment', 'tracking', 'raw', 'data'],
    // "parcel_aggregator" (ha-parcel-integrations/ha-parcel-aggregator)
    // contains "parcel" as a substring, so its entities would otherwise
    // also platform-match this generic type; exclude them explicitly.
    excludeHints: ['parcel_aggregator'],
    hasAttrs:    (a) => a.deliveries !== undefined,
    collect(attrs, ctx) {
      return (attrs.deliveries || []).map(i => this._map(i, ctx.tr));
    },
    _map(item, tr) {
      const statusCode  = item.status_code ?? 5; // 5 = unknown when missing
      const delivered   = statusCode === 0;
      const { icon, color } = parcelStatus(statusCode);
      const carrierCode = item.carrier_code ? item.carrier_code.toLowerCase() : null;
      const firstEvent  = Array.isArray(item.events) ? item.events[0] : null;
      let deliveryDate = null, line1 = null, line2 = null, slotActive = false;

      // For delivered packages, prefer the actual delivery time from events over date_expected
      if (delivered && firstEvent?.date) {
        const d = parseDate(firstEvent.date);
        if (d) { deliveryDate = d; line1 = formatDeliveredText(d, tr); }
      }

      const expectedStr    = parseExpected(item.timestamp_expected,     item.date_expected);
      const expectedEndStr = parseExpected(item.timestamp_expected_end, item.date_expected_end);
      if (!deliveryDate && expectedStr) {
        const d = new Date(expectedStr);
        if (!isNaN(d)) {
          deliveryDate = d;
          const day = formatDay(d, tr), start = formatTime(d);
          const end = expectedEndStr ? formatTime(new Date(expectedEndStr)) : null;
          if (delivered || daysUntil(d) < 0) {
            if (!line1) line1 = formatDeliveredText(d, tr);
          } else {
            slotActive  = expectedEndStr ? isSlotActive(expectedStr, expectedEndStr) : false;
            line1 = ensurePeriod(firstEvent?.event || '');
            const pastSlotP = expectedEndStr && !slotActive && new Date() > new Date(expectedEndStr);
            if      ((slotActive || pastSlotP) && expectedEndStr) line2 = formatTimeRemaining(expectedEndStr, tr, expectedStr);
            else if (start === '00:00' && end) line2 = tr.delivery_before(day, end);
            else if (start === '00:00')        line2 = tr.delivery_on(day);
            else if (end)                      line2 = tr.delivery_between(day, start, end);
            else {
              // Single non-midnight timestamp, no end; confirmed against
              // real FedEx data ("before 22:00") to mean a deadline, not a
              // point estimate ("around 22:00"). The implicit window runs
              // from the start of that day until the deadline.
              const dayStart = new Date(d); dayStart.setHours(0, 0, 0, 0);
              slotActive = isSlotActive(dayStart.toISOString(), expectedStr);
              if      (slotActive)        line2 = tr.slot_all_day(day);
              else if (new Date() > d)    line2 = tr.slot_late(day, start);
              else                        line2 = tr.delivery_before(day, start);
            }
          }
        }
      }
      if (!line1) line1 = ensurePeriod(firstEvent?.event || '');
      if (!deliveryDate && carrierCode === 'gls' && firstEvent?.event?.toLowerCase().includes('expected to be delivered during the day')) {
        deliveryDate = new Date();
        line2 = tr.delivery_on(formatDay(deliveryDate, tr));
      }
      return mkItem({ name: (item.description || '').trim(), line1, line2,
        location: firstEvent?.location || null,
        icon, color, deliveryDate, slotActive, delivered, carrierCode,
        carrier:   carrierName('parcel', carrierCode),
        brandIcon: getBrandIcon('parcel', carrierCode),
        tapUrl:    buildParcelUrl(carrierCode, item.tracking_number),
        direction: 'incoming',
        integration: 'parcel',
        slotEnd:   expectedEndStr ? new Date(expectedEndStr) : null,
        trackingCode: item.tracking_number || null,
        events: (item.events || []).map(e => ({
          date: e.date ? parseDate(String(e.date)) : null,
          text: e.event || '',
          location: e.location || null,
        })).filter(e => e.text) });
    },
  },

  dhl_nl_incoming: mkCanonicalEntry({
    group:       'dhl_nl',
    groupLabel:  'DHL NL',
    rowLabel:    'Incoming (active)',
    rowLabelKey: 'dhl_nl_incoming_label',
    entityHintText: 'entity_hint_dhl_nl_incoming',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-dhl-nl',
    platforms:   ['dhl_nl'],
    entityHints: ['incoming_parcels', 'dhl_incoming', 'dhl_ontvang', 'dhl_bezorg'],
    excludeHints: ['awaiting_pickup', 'pickup_pending', 'en_route', 'next_delivery'],
    carrierGroup: 'dhl_nl', carrierCode: 'dhlnl',
  }),

  dhl_nl_delivered: mkCanonicalEntry({
    group:       'dhl_nl',
    groupLabel:  'DHL NL',
    rowLabel:    'Delivered (history)',
    rowLabelKey: 'dhl_nl_delivered_label',
    entityHintText: 'entity_hint_dhl_nl_delivered',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-dhl-nl',
    platforms:   ['dhl_nl'],
    entityHints: ['delivered_parcels', 'dhl_delivered', 'dhl_bezorgd'],
    // outgoing_delivered: see the same exclusion on postnl_canonical_delivered.
    excludeHints: ['awaiting_pickup', 'pickup_pending', 'en_route', 'next_delivery', 'outgoing_delivered'],
    carrierGroup: 'dhl_nl', carrierCode: 'dhlnl',
  }),

  dhl_nl_outgoing_delivered: mkCanonicalEntry({
    group:       'dhl_nl',
    groupLabel:  'DHL NL',
    rowLabel:    'Outgoing (delivered)',
    rowLabelKey: 'dhl_nl_outgoing_delivered_label',
    entityHintText: 'entity_hint_dhl_nl_outgoing_delivered',
    direction:   'outgoing',
    url:         'https://github.com/ha-parcel-integrations/ha-dhl-nl',
    platforms:   ['dhl_nl'],
    entityHints: ['outgoing_delivered_parcels'],
    excludeHints: ['awaiting_pickup', 'pickup_pending', 'en_route', 'next_delivery'],
    // New in DHL NL 2.4.0: return shipments land here once delivered back
    // to the shop, kept separate from dhl_nl_delivered's regular incoming
    // history (see release notes: "Return shipments now show up as
    // outgoing parcels").
    carrierGroup: 'dhl_nl', carrierCode: 'dhlnl',
  }),

  dhl_nl_outgoing: mkCanonicalEntry({
    group:       'dhl_nl',
    groupLabel:  'DHL NL',
    rowLabel:    'Outgoing',
    rowLabelKey: 'dhl_nl_outgoing_label',
    entityHintText: 'entity_hint_dhl_nl_outgoing',
    direction:   'outgoing',
    url:         'https://github.com/ha-parcel-integrations/ha-dhl-nl',
    platforms:   ['dhl_nl'],
    entityHints: ['outgoing_parcels', 'dhl_outgoing', 'dhl_verstu', 'dhl_verzond'],
    // outgoing_delivered: see the same exclusion on postnl_canonical_outgoing.
    excludeHints: ['awaiting_pickup', 'pickup_pending', 'en_route', 'next_delivery', 'outgoing_delivered'],
    carrierGroup: 'dhl_nl', carrierCode: 'dhlnl',
  }),

  dpd_incoming: mkCanonicalEntry({
    group:       'dpd',
    groupLabel:  'DPD',
    rowLabel:    'Incoming (active)',
    rowLabelKey: 'dpd_incoming_label',
    entityHintText: 'entity_hint_dpd_incoming',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-dpd',
    platforms:   ['dpd'],
    entityHints: ['incoming_parcels', 'dpd_incoming'],
    excludeHints: ['en_route_to_parcel_shop', 'awaiting_pickup', 'pickup_pending', 'next_delivery'],
    carrierGroup: 'dpd', carrierCode: 'dpdgpcode',
    // Parcel's own data is currently richer than this integration's (e.g.
    // no delivery slot yet) -- see PARCEL_WINS_FOR. Revisit as this
    // integration matures; flip this back off once it's caught up.
    parcelWins: true,
  }),

  dpd_delivered: mkCanonicalEntry({
    group:       'dpd',
    groupLabel:  'DPD',
    rowLabel:    'Delivered (history)',
    rowLabelKey: 'dpd_delivered_label',
    entityHintText: 'entity_hint_dpd_delivered',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-dpd',
    platforms:   ['dpd'],
    entityHints: ['delivered_parcels', 'dpd_delivered'],
    // outgoing_delivered: see the same exclusion on postnl_canonical_delivered.
    excludeHints: ['en_route_to_parcel_shop', 'awaiting_pickup', 'pickup_pending', 'next_delivery', 'outgoing_delivered'],
    carrierGroup: 'dpd', carrierCode: 'dpdgpcode',
  }),

  dpd_outgoing_delivered: mkCanonicalEntry({
    group:       'dpd',
    groupLabel:  'DPD',
    rowLabel:    'Outgoing (delivered)',
    rowLabelKey: 'dpd_outgoing_delivered_label',
    entityHintText: 'entity_hint_dpd_outgoing_delivered',
    direction:   'outgoing',
    url:         'https://github.com/ha-parcel-integrations/ha-dpd',
    platforms:   ['dpd'],
    entityHints: ['outgoing_delivered_parcels'],
    excludeHints: ['en_route_to_parcel_shop', 'awaiting_pickup', 'pickup_pending', 'next_delivery'],
    // New in DPD 2.4.0: completed outgoing parcels land here, kept separate
    // from dpd_delivered's regular incoming history.
    carrierGroup: 'dpd', carrierCode: 'dpdgpcode',
  }),

  dpd_outgoing: mkCanonicalEntry({
    group:       'dpd',
    groupLabel:  'DPD',
    rowLabel:    'Outgoing',
    rowLabelKey: 'dpd_outgoing_label',
    entityHintText: 'entity_hint_dpd_outgoing',
    direction:   'outgoing',
    url:         'https://github.com/ha-parcel-integrations/ha-dpd',
    platforms:   ['dpd'],
    entityHints: ['outgoing_parcels', 'dpd_outgoing'],
    // outgoing_delivered: see the same exclusion on postnl_canonical_outgoing.
    excludeHints: ['en_route_to_parcel_shop', 'awaiting_pickup', 'pickup_pending', 'next_delivery', 'outgoing_delivered'],
    // DPD itself is stable (2.0.0). The `receiver` field is now confirmed
    // present on real DPD incoming/delivered data, but not yet specifically
    // confirmed on the outgoing sensor itself, so the sender-vs-recipient
    // question for THIS source type remains technically unresolved.
    carrierGroup: 'dpd', carrierCode: 'dpdgpcode',
  }),

  gls_incoming: mkCanonicalEntry({
    group:       'gls',
    groupLabel:  'GLS',
    rowLabel:    'Incoming (active)',
    rowLabelKey: 'gls_incoming_label',
    entityHintText: 'entity_hint_gls_incoming',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-gls',
    platforms:   ['gls'],
    entityHints: ['incoming_parcels', 'gls_incoming'],
    excludeHints: ['en_route_to_parcel_shop', 'awaiting_pickup', 'pickup_pending', 'next_delivery'],
    // No account needed; tracking numbers + postal code are entered manually.
    // Multiple hubs (one per postal code) each become their own HA device;
    // the card treats them as independent sources. No multi-account
    // device-grouping via device-registry.
    carrierGroup: 'gls', carrierCode: 'gls',
  }),

  gls_delivered: mkCanonicalEntry({
    group:       'gls',
    groupLabel:  'GLS',
    rowLabel:    'Delivered (history)',
    rowLabelKey: 'gls_delivered_label',
    entityHintText: 'entity_hint_gls_delivered',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-gls',
    platforms:   ['gls'],
    entityHints: ['delivered_parcels', 'gls_delivered'],
    excludeHints: ['en_route_to_parcel_shop', 'awaiting_pickup', 'pickup_pending', 'next_delivery'],
    carrierGroup: 'gls', carrierCode: 'gls',
  }),

  dragonfly_incoming: mkCanonicalEntry({
    group:       'dragonfly',
    groupLabel:  'Dragonfly',
    rowLabel:    'Incoming (active)',
    rowLabelKey: 'dragonfly_incoming_label',
    entityHintText: 'entity_hint_dragonfly_incoming',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-dragonfly',
    platforms:   ['dragonfly'],
    entityHints: ['incoming_parcels', 'dragonfly_incoming'],
    excludeHints: ['next_delivery'],
    // No account and no postal code: tracking codes are entered manually in a
    // single hub (single_config_entry), so there is exactly one device.
    carrierGroup: 'dragonfly', carrierCode: 'dragonfly',
  }),

  dragonfly_delivered: mkCanonicalEntry({
    group:       'dragonfly',
    groupLabel:  'Dragonfly',
    rowLabel:    'Delivered (history)',
    rowLabelKey: 'dragonfly_delivered_label',
    entityHintText: 'entity_hint_dragonfly_delivered',
    direction:   'incoming',
    url:         'https://github.com/ha-parcel-integrations/ha-dragonfly',
    platforms:   ['dragonfly'],
    entityHints: ['delivered_parcels', 'dragonfly_delivered'],
    excludeHints: ['next_delivery'],
    carrierGroup: 'dragonfly', carrierCode: 'dragonfly',
  }),

};

// ─── Integration helpers ──────────────────────────────────────────────────────

// Looks up the human-readable device name for an entity, if device-registry
// info happens to be available on this hass object. Unlike hass.entities/
// hass.states (which this card already relies on elsewhere), hass.devices
// isn't confirmed to be populated in every Lovelace-card-editor context;
// callers must treat a null result as "ungroupable", not an error.
function deviceNameForEntity(entityId, hass) {
  const deviceId = hass?.entities?.[entityId]?.device_id;
  if (!deviceId) return null;
  const device = hass?.devices?.[deviceId];
  if (!device) return null;
  return device.name_by_user || device.name || null;
}

// The four possible parcel-sensor "buckets" a ha-parcel-integrations family
// member can expose -- these are the exact `translation_key` values each
// entry sets on its own sensor (confirmed directly against every current
// family member's sensor.py, 2026-07-30; NOT the bare 'incoming'/'delivered'/
// etc., an earlier mistake in this file that made canonicalSourceInfo below
// never match anything). Mapped here to the true 2-value direction each
// bucket represents -- "delivered_parcels" is still an incoming parcel, just
// in the delivered-history slot, and "outgoing_delivered_parcels" is still
// outgoing. Confirmed against the existing registry's own `direction` field
// (e.g. dhl_nl_delivered sets direction: 'incoming', never 'delivered') and
// the family's own Parcel Aggregator, which uses the same "bucket" term for
// this exact 4-value concept (its own coordinator.py:
// ATTR_KEY_BY_BUCKET/SOURCE_SUFFIXES). Never conflate bucket with direction
// elsewhere in this file -- a source whose bucket is "delivered_parcels"
// still has to count as incoming wherever direction actually matters (e.g.
// the direction filter below).
const BUCKET_DIRECTION = {
  incoming_parcels: 'incoming',
  delivered_parcels: 'incoming',
  outgoing_parcels: 'outgoing',
  outgoing_delivered_parcels: 'outgoing',
};

// "vinted_go" -> "Vinted Go": readable fallback carrier name straight from a
// raw platform/domain string, for canonicalSourceInfo's own empty-parcels
// fallback below. Deliberately not routed through carrierName/resolveCarrier
// (the CARRIERS lookup table below, keyed by group+code pairs) -- a bare
// platform string doesn't correspond to that group/code shape, so a lookup
// attempt would only ever hit the same fallback this already is.
// Reuses the existing CARRIERS list instead of a second, separately
// maintained name table: dhl_nl/dpd/gls/dragonfly/postnl already have a
// `codes[group]` entry each (added for mkCanonicalEntry's own
// carrierName/getBrandIcon lookups), so the exact same curated `short`/
// `name` this card already shows once real parcel data exists (e.g. "DHL",
// not "Dhl Nl") is available here too, for the one moment before that: a
// device with zero current parcels, nothing yet to read the real carrier
// string from.
function platformDisplayName(platform) {
  const entry = CARRIERS.find(c => Array.isArray(c.codes?.[platform]));
  return entry ? (entry.short || entry.name) : null;
}

// Only used as a fallback (see canonicalSourceInfo/discoverCanonicalSources)
// when a device has zero current parcels to read its real carrier name
// from. A brand-new ha-parcel-integrations member with no CARRIERS entry
// of its own still needs zero registration anywhere to be *detected* --
// this only affects how it's *displayed* during that same zero-parcels
// window, and plain title-casing is a reasonable default for that (matches
// every current family member's own name already: Dragonfly, Hermes,
// Packeta, Correos, Trunkrs, Cainiao, Vinted Go all title-case correctly
// as-is, confirmed against the maintainer's own carrier list, GitHub
// discussion 2026-07-30).
function prettifyPlatformName(platform) {
  if (!platform) return null;
  return platformDisplayName(platform) || platform.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}


// Generic detection for any ha-parcel-integrations family member, present or
// future, with zero per-carrier registration needed here -- confirmed
// against the real source of every current member (PostNL, DHL NL, DPD,
// GLS, Dragonfly, Vinted Go, 2026-07-30): every one exposes its parcel list
// under the same literal `parcels` attribute, and sets its own entity's
// translation_key to exactly one of the four bucket names above. Returns
// null for anything that doesn't match this shape -- non-family sources
// (the plain "parcel" integration, PostNL's own Letters, which has no
// `carrier` field on its items at all, confirmed against its own
// letters.py) keep using the INTEGRATIONS registry below, unchanged. Parcel
// Aggregator's own sensors actually DO match this shape (same family
// convention), but callers must exclude its platform explicitly before
// calling this -- see discoverCanonicalSources's own comment for why.
function canonicalSourceInfo(entityId, hass) {
  const attrs = hass?.states?.[entityId]?.attributes;
  if (!Array.isArray(attrs?.parcels)) return null;
  const bucket = hass?.entities?.[entityId]?.translation_key;
  if (!BUCKET_DIRECTION[bucket]) return null;
  const platform = hass?.entities?.[entityId]?.platform;
  const carrier = attrs.parcels[0]?.carrier || prettifyPlatformName(platform) || platform || null;
  // carrierGroup: platform, not a display name -- for every current family
  // member this is exactly the same string mkCanonicalEntry's own
  // hand-written entries already use as their carrierGroup (postnl, dhl_nl,
  // dpd, gls, dragonfly), which matters for PARCEL_WINS_FOR: without this,
  // a generically-detected DPD source's item.integration would never match
  // that set and DPD's dedup override would silently stop applying.
  return { carrier, bucket, carrierGroup: platform };
}

// Reuses the existing PostNL-prefixed translation keys for the four bucket
// row labels: their actual text ("Incoming (active)", "Delivered (history)",
// etc.) is already carrier-agnostic, only the key name predates the generic
// detector below, so there's no need for a duplicate/renamed set of keys.
const BUCKET_ROW_LABEL_KEY = {
  incoming_parcels: 'postnl_canonical_incoming_label',
  delivered_parcels: 'postnl_canonical_delivered_label',
  outgoing_parcels: 'postnl_canonical_outgoing_label',
  outgoing_delivered_parcels: 'postnl_canonical_outgoing_delivered_label',
  letters: 'postnl_canonical_letters_label',
};

// Fixed display order for a discovered device's bucket rows -- Map
// insertion order otherwise just follows whatever order hass.entities
// happened to iterate in, which isn't necessarily a sensible reading order
// (confirmed via testing, 2026-07-30: Letters could land in the middle).
// Letters last: it's a bonus feature folded in for display, not one of the
// four core buckets.
const BUCKET_ORDER = ['incoming_parcels', 'outgoing_parcels', 'delivered_parcels', 'outgoing_delivered_parcels', 'letters'];
function sortedBucketEntries(buckets) {
  return [...buckets.entries()].sort(([a], [b]) => BUCKET_ORDER.indexOf(a) - BUCKET_ORDER.indexOf(b));
}

// Live discovery for any ha-parcel-integrations family member, grouped by
// carrier then by device/account (mirroring deviceCandidatesForGroup's own
// per-device grouping, so multi-account setups still get one row per
// account). Parcel Aggregator support has been removed from this card
// entirely (it added no value once a carrier's own repo can be read
// directly, and merging several carriers into one view is something this
// card already does itself) -- but its sensors still exist on any instance
// that has it installed, and still match this exact same family convention
// (same `parcels` attribute, same translation_key values), so its platform
// is explicitly excluded here. Without this, a user who still has Parcel
// Aggregator installed for some other reason would see its re-exposed data
// offered as if it were itself a new, distinct carrier.
// Memoized on `hass.entities` object identity, not on hass itself: HA's
// frontend only replaces `hass.entities` when the entity registry actually
// changes (add/rename/remove), while `hass.states` gets a new reference on
// every single state update -- and this card's own `hass` setter (and, in
// auto-detect mode, effectiveSources/autoDetectedEntities) call this on
// every one of those. Without memoizing, a card with `sources: []` would
// re-scan the entire entity registry on every state-changed event
// system-wide, not just when something relevant to this card changed.
let _discoveryCacheEntities = null;
let _discoveryCacheResult = null;
function discoverCanonicalSources(hass) {
  if (hass?.entities && hass.entities === _discoveryCacheEntities) return _discoveryCacheResult;

  const byCarrier = new Map(); // carrier -> Map(deviceId -> { deviceName, buckets: Map(bucket -> entityId) })
  if (!hass?.entities) return byCarrier;

  // First pass: group by device, not carrier. canonicalSourceInfo falls back
  // to the platform name (e.g. "Dhl Nl") for a bucket with zero current
  // items, which can differ from a sibling bucket's real item-provided
  // carrier label (e.g. "DHL") on that very same device/account -- grouping
  // directly by info.carrier would then split one device into two separate
  // carrier groups purely because one of its buckets happens to be empty
  // right now (confirmed via testing, 2026-07-30). Resolve one carrier name
  // per device instead, preferring whichever bucket has a real item to read
  // from; only fall back to the platform name if every bucket on this
  // device is currently empty.
  // PostNL's own Letters feature (see postnl_canonical_letters's own
  // comment: structurally nothing like a parcel, no carrier field, not
  // covered by canonicalSourceInfo at all) still belongs to the exact same
  // account/device as that account's own canonical parcel buckets, and is
  // folded in here so it shows up alongside them instead of as a
  // disconnected section -- confirmed via direct user feedback, 2026-07-30:
  // with two PostNL accounts configured, each account's own Letters entity
  // is expected under that same account, not lumped into one generic row.
  // Its config still keeps the old `{ type, entity }` shape (see
  // sourceForBucket below); only the rendering is merged here, not the
  // underlying detection/collection, which stays registry-driven.
  const lettersDef = INTEGRATIONS.postnl_canonical_letters;

  const byDevice = new Map(); // deviceId -> { deviceName, carrier, buckets: Map(bucket -> entityId) }
  for (const entityId of Object.keys(hass.entities)) {
    const entry = hass.entities[entityId];
    if (entry?.platform === 'parcel_aggregator') continue;
    const attrs = hass.states[entityId]?.attributes;

    const info = canonicalSourceInfo(entityId, hass);
    const isLetters = !info && attrs && lettersDef.platforms.some(p => (entry?.platform || '').includes(p)) && lettersDef.hasAttrs(attrs);
    if (!info && !isLetters) continue;

    const deviceId = entry?.device_id || entityId;
    if (!byDevice.has(deviceId)) {
      byDevice.set(deviceId, { deviceName: deviceNameForEntity(entityId, hass), carrier: null, buckets: new Map() });
    }
    const device = byDevice.get(deviceId);

    if (isLetters) { device.buckets.set('letters', entityId); continue; }

    device.buckets.set(info.bucket, entityId);
    const hasRealCarrier = !!attrs?.parcels?.[0]?.carrier;
    if (hasRealCarrier || !device.carrier) device.carrier = info.carrier;
  }

  for (const [deviceId, { deviceName, carrier, buckets }] of byDevice) {
    // A device seen only through its Letters entity (no parcel buckets at
    // all -- possible if PostNL's parcel sensors happen to be disabled)
    // never got a carrier resolved above; fall back the same way
    // canonicalSourceInfo does for an empty bucket. Final `|| 'Unknown'`:
    // the entity registry is expected to always have a `platform` for a
    // real integration entity, but nothing guarantees that, and a null Map
    // key here would later crash the editor's carrier sort (sortedCarriers).
    const resolvedCarrier = carrier || prettifyPlatformName(hass.entities[buckets.get('letters')]?.platform) || 'Unknown';
    if (!byCarrier.has(resolvedCarrier)) byCarrier.set(resolvedCarrier, new Map());
    byCarrier.get(resolvedCarrier).set(deviceId, { deviceName, buckets });
  }
  _discoveryCacheEntities = hass.entities;
  _discoveryCacheResult = byCarrier;
  return byCarrier;
}

// A discovered device's bucket entry is either one of the four generic,
// type-less canonical buckets (see canonicalSourceInfo/migrateSourceType),
// or PostNL's own Letters entity, folded into the same per-device grouping
// above for display purposes only -- Letters keeps its original, typed
// `{ type: 'postnl_canonical_letters', entity }` config shape, since it's
// still collected through the registry, not canonicalSourceInfo.
function sourceForBucket(bucket, entity) {
  return bucket === 'letters' ? { type: 'postnl_canonical_letters', entity } : { entity };
}

// With no sources configured at all, show everything this card recognizes
// instead of an empty card -- the Filter tab's own carrier/direction/state
// filters exist to narrow this down per card instance if needed (direct
// user feedback, 2026-07-30). Mirrors discoverCanonicalSources's own
// exclusions (Parcel Aggregator's re-exposed entities are never picked up
// as if they were a distinct carrier, see its own comment).
function autoDetectedEntities(hass) {
  if (!hass?.entities) return [];
  const result = [];
  for (const [, devices] of discoverCanonicalSources(hass)) {
    for (const [, { buckets }] of devices) {
      for (const [bucket, entity] of buckets) result.push(sourceForBucket(bucket, entity));
    }
  }
  for (const [type, def] of Object.entries(INTEGRATIONS)) {
    // Canonical family members and PostNL Letters are already covered by
    // discoverCanonicalSources above (Letters is folded into the same
    // per-device grouping there); only a genuinely separate, still
    // registry-driven type (currently just the plain "parcel" integration)
    // needs its own scan here.
    if (def.canonical || type === 'postnl_canonical_letters') continue;
    for (const entity of candidatesForType(type, hass)) result.push({ type, entity });
  }
  return result;
}

// Single point deciding what a card instance actually shows: the user's own
// configured sources when there are any, or a full live auto-scan when the
// list is empty/absent. Every render/collection path should read sources
// through this, not `config.sources` directly, so "empty means auto" stays
// consistent everywhere.
function effectiveSources(config, hass) {
  const configured = config?.sources || [];
  return configured.length ? configured : autoDetectedEntities(hass);
}

// Shared by _collectItems and _availableCarriers -- the only two places that
// turn a type-less (generically-detected) source's raw `parcels` attribute
// into normalized items. Kept as one function specifically so a future fix
// to this mapping (carrierGroup, brandIcon, or anything else) can't land in
// only one of the two call sites and quietly drift, like brandIcon already
// had before this was unified. Returns `null` when the entity isn't (or is
// no longer) identifiable as a canonical source, e.g. removed/renamed since
// this source was added -- callers treat that the same as a typed source
// whose registry entry is missing.
function collectGenericSourceItems(entityId, attrs, tr, hass) {
  const info = canonicalSourceInfo(entityId, hass);
  if (!info) return null;
  const direction = BUCKET_DIRECTION[info.bucket];
  return attrs.parcels.map(p => ({
    ...mapCanonicalParcel(p, tr, { carrierGroup: info.carrierGroup, carrierCode: info.carrier, direction }),
    // mapCanonicalParcel's own getBrandIcon(carrierGroup, carrierCode) call
    // still misses here (carrierCode is a display name, not a curated code)
    // -- see genericCarrierIcon's own comment for why this needs its own,
    // name-based lookup instead.
    brandIcon: genericCarrierIcon(info.carrier),
  }));
}

// Shared by candidatesForType/isPlatformInstalled below: entities whose
// registry platform matches this type's def.platforms. That's as far as the
// two questions overlap -- what counts as a further "real" match differs
// (excludeHints filtering, how to treat an entity with no state data yet,
// exception safety around hasAttrs), see each function's own comment, so
// only this common scan itself is shared, not the whole function. Blindly
// consolidating further (e.g. `candidatesForType(...).length > 0`) would
// silently change isPlatformInstalled's behavior: it deliberately doesn't
// apply excludeHints (a type-specific disambiguation, not a "is this
// platform installed at all" concern) and treats a still-stateless entity
// as optimistically installed rather than not-yet-matching.
function* platformMatchingEntities(type, hass) {
  const def = INTEGRATIONS[type];
  if (!def) return;
  for (const entry of Object.entries(hass.entities || {})) {
    const info = entry[1];
    if (def.platforms?.some(p => (info.platform || '').toLowerCase().includes(p))) yield entry;
  }
}

// Returns all entities that are candidates for a given integration type.
// Candidate = matching platform (or entityHint) AND hasAttrs passes.
function candidatesForType(type, hass) {
  if (!hass) return [];
  const def = INTEGRATIONS[type];
  if (!def) return [];
  const results = [];
  for (const [entityId] of platformMatchingEntities(type, hass)) {
    if ((def.excludeHints || []).some(h => entityId.toLowerCase().includes(h))) continue;
    const attrs = hass.states[entityId]?.attributes;
    if (!attrs || !def.hasAttrs(attrs)) continue;
    results.push(entityId);
  }
  return results;
}

// For a source group (e.g. "PostNL"), finds distinct devices (typically one
// per configured account) that offer candidate entities for any of the
// group's types, mapping each to which type->entity pairs it provides.
// Returns null when device-registry info isn't available, or there's only
// one distinguishable device; callers should fall back to the simpler
// single add/remove-everything behavior in that case, since per-device
// rows only add value once there's genuinely more than one to tell apart.
function deviceCandidatesForGroup(group, hass, sources) {
  if (!hass) return null;
  const byDevice = new Map(); // deviceName -> Map(type -> entityId)
  const usedEntities = sources.map(s => s.entity).filter(Boolean);
  let anyDeviceInfo = false;
  for (const type of group.types) {
    for (const entityId of candidatesForType(type, hass)) {
      if (detectTypeFromHass(entityId, hass) !== type) continue;
      const deviceName = deviceNameForEntity(entityId, hass);
      if (!deviceName) continue;
      anyDeviceInfo = true;
      if (!byDevice.has(deviceName)) byDevice.set(deviceName, new Map());
      const forDevice = byDevice.get(deviceName);
      // Prefer an entity already in use (so an existing config keeps
      // matching its device row); otherwise the first candidate found,
      // matching how the simple add-button already picks available[0].
      if (!forDevice.has(type) || usedEntities.includes(entityId)) forDevice.set(type, entityId);
    }
  }
  if (!anyDeviceInfo || byDevice.size < 2) return null;
  return byDevice;
}

// Returns true if the platform group for this type has any entities at all
function isPlatformInstalled(type, hass) {
  if (!hass) return false;
  const def = INTEGRATIONS[type];
  if (!def) return false;
  for (const [entityId] of platformMatchingEntities(type, hass)) {
    // Two integrations can in principle share a platform/domain (e.g. a fork
    // that kept the original domain) while exposing a structurally different
    // attrs shape. Since the two could never both be installed at once
    // (same domain), a platform match alone would wrongly mark BOTH as
    // "installed". When we have the actual sensor data, require the shape
    // to match too.
    const attrs = hass.states?.[entityId]?.attributes;
    if (!attrs) return true; // no data to check shape against yet; platform match is the best we have
    try { if (def.hasAttrs(attrs)) return true; } catch { /* keep looking */ }
  }
  return false;
}

// Split an entity ID into segments: sensor.postnl_verstuurd → ['postnl', 'verstuurd']
function entitySegments(entityId) {
  return entityId.toLowerCase().replace(/^[^.]+\./, '').split(/[_-]/);
}

// Score a hint against an entity ID (via its already-split segments, see
// entitySegments -- computed once per entityId by bestTypeByHints below,
// not once per hint, since the same entityId is scored against every hint
// of every candidate type):
// 3 = exact segment match ('verstuurd' matches segment 'verstuurd')
// 2 = prefix segment match ('verstu' matches segment 'verstuurd')
// 1 = substring match anywhere in the full entity ID
// 0 = no match
function hintScore(hint, entityId, segments) {
  if (segments.includes(hint)) return 3;
  if (segments.some(s => s.startsWith(hint))) return 2;
  if (entityId.toLowerCase().includes(hint)) return 1;
  return 0;
}

// Disambiguate among candidate types using entity ID hints.
// Returns the best type, or null if ambiguous or no match.
function bestTypeByHints(entityId, types) {
  const segments = entitySegments(entityId);
  let bestType = null, bestScore = 0, ambiguous = false;
  for (const type of types) {
    const def   = INTEGRATIONS[type];
    const score = Math.max(0, ...(def.entityHints || []).map(h => hintScore(h, entityId, segments)));
    if (score > bestScore) { bestScore = score; bestType = type; ambiguous = false; }
    else if (score > 0 && score === bestScore) { ambiguous = true; }
  }
  return (bestScore > 0 && !ambiguous) ? bestType : null;
}

function detectTypeFromHass(entityId, hass) {
  if (!entityId) return null;
  const platform = (hass?.entities?.[entityId]?.platform || '').toLowerCase();
  const isExcluded = (def) => (def.excludeHints || []).some(h => entityId.toLowerCase().includes(h));
  const attrs = hass?.states?.[entityId]?.attributes;

  // Narrow to types whose platform matches
  const rawPlatformTypes = Object.entries(INTEGRATIONS)
    .filter(([, def]) => def.platforms?.some(p => platform.includes(p)))
    .map(([type]) => type);

  if (rawPlatformTypes.length === 0) {
    // No platform match; try hints across all (non-excluding) types (fallback for missing platform info)
    return bestTypeByHints(entityId, Object.keys(INTEGRATIONS).filter(t => !isExcluded(INTEGRATIONS[t])));
  }

  // Drop types that explicitly exclude this entity (e.g. known subset sensors)
  let platformTypes = rawPlatformTypes.filter(t => !isExcluded(INTEGRATIONS[t]));
  if (platformTypes.length === 0) return null; // platform matched, but every candidate type excludes this entity

  // Some integrations share a platform/domain with another (e.g. a fork that
  // kept the same domain) but expose a structurally different attrs shape
  // (e.g. enroute/delivered arrays vs a single parcels array). When we have
  // the actual sensor data, prefer types whose hasAttrs check the data
  // really matches; this is a stronger signal than name-based hints alone.
  if (attrs) {
    const shapeMatches = platformTypes.filter(t => { try { return INTEGRATIONS[t].hasAttrs(attrs); } catch { return false; } });
    if (shapeMatches.length) platformTypes = shapeMatches;
  }

  if (platformTypes.length === 1) return platformTypes[0];

  // Multiple types share this platform; use hints to disambiguate
  return bestTypeByHints(entityId, platformTypes) || platformTypes[0];
}

// ─── Filtering ────────────────────────────────────────────────────────────────

// Reads the carrier filter as an array, falling back to the legacy singular
// `filter.carrier` string for older saved configs. Always returns an array
// (never null), so callers can just check its length.
function filterCarriers(filter) {
  if (filter.carriers?.length) return filter.carriers;
  if (filter.carrier) return [filter.carrier];
  return [];
}

function applyFilter(items, filter) {
  if (!filter) return items;
  let r = items;
  const state = filter.state || 'all';
  if (state === 'enroute')   r = r.filter(i => !i.delivered);
  if (state === 'delivered') r = r.filter(i => i.delivered);
  // 'carriers' (array, current); falls back to legacy singular 'carrier' (string) for old configs
  const carrierList = filterCarriers(filter);
  if (carrierList.length) {
    // Each entry may itself be a comma-joined list of codes (one dropdown
    // option can represent multiple underlying carrier codes that share
    // the same display name, e.g. PostNL's own 'postnl' and Parcel's
    // 'tntp'); split before building the match set.
    const set = new Set(carrierList.flatMap(c => c.toLowerCase().split(',')));
    r = r.filter(i => i.carrierCode && set.has(i.carrierCode.toLowerCase()));
  }
  if (filter.date !== undefined && filter.date !== null) {
    const t = Number(filter.date);
    if (!isNaN(t)) r = r.filter(i => i.deliveryDate && daysUntil(i.deliveryDate) === t);
  }
  if (filter.direction && filter.direction !== 'all') {
    r = r.filter(i => i.direction === filter.direction);
  }
  if (filter.slot_active) r = r.filter(i => i.slotActive);
  return r;
}

// Sort priority for package items (used by _sortItems)
function itemPriority(item, now, today) {
  if (item.delivered) return 5;
  if (item.slotActive) return 0;
  if (item.slotEnd && now > item.slotEnd) return 1;
  if (item.deliveryDate) {
    const d = new Date(item.deliveryDate.getTime()); d.setHours(0,0,0,0);
    return d.getTime() === today.getTime() ? 2 : 3;
  }
  return 4;
}

// ─── Card defaults ───────────────────────────────────────────────────────────
// Single source of truth, shared by PackageTrackerCard.setConfig and the editor.

const CARD_DEFAULTS = {
  max:    5,
  layout: 'single',
  show: {
    carrier:        true,
    status:         true,
    badge:          true,
    dim_delivered:  true,
    location:       false,
    brand_icon:     true,
    hide_when_empty: false,
    details:        true,
  },
  filter: {
    state: 'all',
  },
};

function deepEqual(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].every((k) => deepEqual(a[k], b[k]));
  }
  return a === b;
}

// Migrates a legacy `{ type, entity }` source into the new, type-less
// `{ entity }` shape once canonicalSourceInfo (above) can derive carrier and
// bucket live instead -- silent, automatic, and lossless, so an existing
// dashboard config never needs manual editing. Only applies to sources whose
// `type` was built via mkCanonicalEntry as a *real per-carrier* entry, never
// to anything hand-built (the plain `parcel` integration, PostNL's own
// Letters): `canonical` is the reliable signal for that distinction (see
// mergeWithCardDefaults's own comment for why, and why
// `carrierGroup`/`carrierCode` would have been wrong). A source that's
// already type-less, or whose type doesn't match, passes through untouched.
function migrateSourceType(source) {
  if (!source?.type || !INTEGRATIONS[source.type]?.canonical) return source;
  return { entity: source.entity };
}

// v2.0.0 dropped Parcel Aggregator and the arjenbos/ha-postnl fork entirely
// (see CHANGELOG). A source still configured against one of their old
// `type` values would otherwise silently show nothing forever -- drop it
// from the saved config instead, so a re-save cleans up the cruft rather
// than leaving a dead entry the user has to notice and remove by hand.
const REMOVED_SOURCE_TYPES = new Set([
  'postnl_incoming', 'postnl_outgoing',
  'parcel_aggregator_incoming', 'parcel_aggregator_outgoing',
  'parcel_aggregator_delivered', 'parcel_aggregator_outgoing_delivered',
]);

// Shared by PackageTrackerCard.setConfig and PackageTrackerCardEditor._normalize
// -- both need the same two-level-deep merge (top-level fields, plus a
// separate merge for the nested show/filter objects so an incoming config
// only overriding e.g. show.location doesn't wipe out every other show.*
// default). `base` lets the editor seed `sources: []` before the rest, for
// a freshly-added card that has no sources yet.
function mergeWithCardDefaults(config, base = {}) {
  return {
    ...base,
    ...CARD_DEFAULTS,
    ...config,
    // migrateSourceType: see its own comment. Runs on every load, not just
    // once, same as any other normalize step -- no separate one-time
    // migration flag needed, since re-migrating an already-migrated
    // (type-less) source is a harmless no-op.
    sources: (config.sources || [])
      .filter((s) => !REMOVED_SOURCE_TYPES.has(s?.type))
      .map(migrateSourceType),
    show:   { ...CARD_DEFAULTS.show,   ...(config.show   || {}) },
    filter: { ...CARD_DEFAULTS.filter, ...(config.filter || {}) },
  };
}

// Only keep keys that differ from CARD_DEFAULTS (or have no default at all,
// e.g. `sources`): _normalize merges every default into _config for
// internal rendering, but firing that whole merged object back would
// persist every untouched default into the saved YAML.
function stripDefaults(config) {
  const out = {};
  for (const [key, value] of Object.entries(config)) {
    if (key in CARD_DEFAULTS && deepEqual(value, CARD_DEFAULTS[key])) continue;
    out[key] = value;
  }
  return out;
}

// ─── Card CSS ─────────────────────────────────────────────────────────────────

const CARD_CSS = `
  :host {
    display: block;
    font-family: var(--ha-font-family-body, inherit);
    -webkit-font-smoothing: var(--ha-font-smoothing, auto);
  }
  :host(.hidden) { display: none !important; margin: 0 !important; padding: 0 !important; min-height: 0 !important; }
  /* ha-card doesn't clip its own children by default; needed so the
     negative-margin edge-alignment trick below (ha-card > .row etc.) never
     pokes 1px past ha-card's own rounded corners. Same rule already exists
     in notify-dashboard-card.js. */
  ha-card { overflow: hidden; }
  /* flex-start (not center): icon/badge must stay pinned to the top and
     never sink toward the middle once .content grows past one line (name +
     location + line1/2 + carrier chips can easily stack to 4-5 lines).
     Short content gets vertically centered instead via .content itself,
     see below.
     Padding/gap here deliberately match HA's own hui-tile-card as closely as
     a variable-height row can: home-assistant/frontend's ha-tile-container
     uses padding: 0 10px + min-height: 56px (relying on a FIXED height
     to center a fixed two-line layout) and a 10px icon-to-content gap. Our
     rows can grow well past two lines (see above), so a fixed min-height
     would leave tall rows looking uneven -- 10px uniform padding keeps the
     same horizontal rhythm and approximates Tile's effective vertical
     spacing for the common short-row case, while still working for long
     ones. */
  .row { display: flex; align-items: flex-start; padding: 10px; gap: 10px; }

  /* ha-card has a real 1px border by default (box-sizing: border-box), so
     its content box starts 1px inside the card's outer edge. HA's own
     hui-tile-card compensates for exactly this with the same negative
     margin trick (see ha-tile-container.ts's .container), so its icon/text
     sit flush with the card edge regardless of border width -- without
     this our rows sit a visible ~1px further in than a real Tile row does.
     Child combinator (>) matters here: only the direct child of ha-card
     needs this (.single in the default layout, .row itself in split
     layout where each row gets its own ha-card, or .empty) -- applying it
     to every .row unconditionally would double up for rows nested inside
     .single. Horizontal only, not vertical: stacked rows share top/bottom
     borders with each other, so a vertical negative margin would make them
     overlap; Tile never has this problem since it's always a single row. */
  ha-card > .row, ha-card > .single, ha-card > .empty {
    margin-left: calc(-1 * var(--ha-card-border-width, 1px));
    margin-right: calc(-1 * var(--ha-card-border-width, 1px));
  }

  .row.delivered { opacity: .45; }
  .icon-container { position: relative; flex-shrink: 0; }
  /* 36px + 24px glyph match ha-tile-icon's --tile-icon-size/--mdc-icon-size exactly. */
  .icon-wrap {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .icon-wrap.clickable {
    cursor: pointer; position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  ha-icon   { --mdc-icon-size: 24px; pointer-events: none; display: flex; }
  ha-ripple { position: absolute; inset: 0; }
  .badge {
    position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-radius: 50%;
    color: var(--card-background-color, #fff);
    font-size: var(--ha-font-size-xs, 10px); font-weight: var(--ha-font-weight-bold, 700); line-height: 16px;
    display: flex; align-items: center; justify-content: center; pointer-events: none; overflow: hidden;
  }
  /* min-height matching .icon-wrap (36px): for short content (just a name,
     no location/line1/line2/carrier) this clamps the box to the icon's
     height and justify-content centers the name within it, matching the
     icon. For longer content this has no effect -- the box just grows
     along with it and everything stacks from the top, same as the icon. */
  .content {
    flex: 1; min-width: 0; min-height: 36px;
    display: flex; flex-direction: column; justify-content: center;
  }
  /* font-size/weight/color already matched ha-tile-info's --tile-info-primary-*
     tokens; letter-spacing added to match too. line-height deliberately
     stays condensed rather than Tile's 1.6 -- that value only makes sense
     paired with Tile's fixed 56px row height, and would just add odd
     whitespace around our own single-line, ellipsis-truncated name. */
  .name {
    font-size: var(--ha-font-size-m, 14px); font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color); line-height: var(--ha-line-height-condensed, 1.2);
    letter-spacing: 0.1px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  /* Matches ha-tile-info's --tile-info-secondary-* tokens (size/weight/color/
     letter-spacing) -- Tile uses primary-text-color for its secondary line
     too, not a dimmed color. */
  .line1, .line2, .location {
    font-size: var(--ha-font-size-s, 12px); font-weight: var(--ha-font-weight-normal, 400);
    color: var(--primary-text-color); letter-spacing: 0.4px;
    line-height: var(--ha-line-height-condensed, 1.2); margin-top: 3px;
  }
  /* Tile's model only has two text tiers (primary/secondary) -- our rows
     carry more info than Tile ever does, so carrier/letterbox/rerouted
     chips deliberately stay a third, visually-dimmer tier instead of
     forcing everything onto Tile's two-tier palette. */
  .carrier {
    font-size: var(--ha-font-size-xs, 11px); color: var(--secondary-text-color);
    line-height: var(--ha-line-height-condensed, 1.2);
    margin-top: 6px; display: flex; align-items: center; gap: 3px;
  }
  .carrier ha-icon { flex-shrink: 0; position: relative; top: 0; }
  .carrier-sep { margin: 0 2px; opacity: .5; }
  .row-right { display: flex; align-items: flex-start; flex: 1; min-width: 0; }
  .chevron-btn {
    flex-shrink: 0; align-self: flex-start; background: none; border: none;
    padding: 2px; margin-left: 4px; margin-top: 1px; cursor: pointer;
    color: var(--secondary-text-color);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }
  .chevron-btn:hover { background: var(--secondary-background-color); color: var(--primary-text-color); }
  .row-wrapper { display: block; }
  .detail {
    /* Left indent = row's own left padding + icon-wrap width + row gap,
       so detail content lines up under .content, not under the icon. */
    display: none; padding: 0 10px 10px calc(10px + 36px + 10px);
  }
  .detail.open { display: block; }
  /* Subtle separator from whatever comes next when expanded; naturally
     never applies in split layout, since each item there sits alone in its
     own ha-card (always the "last" and only child). */
  .row-wrapper:not(:last-child) .detail.open { border-bottom: 1px solid var(--divider-color, rgba(0,0,0,.06)); }
  .event-item { padding: 6px 0; }
  .event-item + .event-item { border-top: 1px solid var(--divider-color, rgba(0,0,0,.06)); }
  .event-meta {
    font-size: var(--ha-font-size-xs, 11px); color: var(--secondary-text-color);
    line-height: var(--ha-line-height-condensed, 1.2); margin-bottom: 2px;
  }
  .event-text {
    font-size: var(--ha-font-size-s, 12px); color: var(--primary-text-color);
    line-height: var(--ha-line-height-condensed, 1.2);
  }
  .tracking-code {
    margin-top: 10px;
    font-size: var(--ha-font-size-xs, 11px); color: var(--secondary-text-color);
    cursor: pointer; display: flex; align-items: center; gap: 4px; user-select: none;
  }
  .tracking-code:hover { color: var(--primary-color); }
  .package-size {
    margin-top: 10px;
    font-size: var(--ha-font-size-xs, 11px); color: var(--secondary-text-color);
    display: flex; align-items: center; gap: 4px;
  }
  .split-wrapper { display: flex; flex-direction: column; gap: 8px; }
  .empty {
    padding: 28px 16px; text-align: center; color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .empty-sub { opacity: .7; font-size: var(--ha-font-size-xs, 11px); }
`;

function mk(tag, cls, text) {
  const el = document.createElement(tag);
  if (cls)  el.className   = cls;
  if (text) el.textContent = text;
  return el;
}

function mkIcon(name, { size, color } = {}) {
  const ico = document.createElement('ha-icon');
  ico.setAttribute('icon', name);
  if (size)  ico.style.setProperty('--mdc-icon-size', size);
  if (color) ico.style.color = color;
  return ico;
}

// Editor's add/delete row-action button (Sources tab): same three-line
// ha-icon-button + mdi icon + click handler scaffold needed once per
// device and once per group, factored out rather than rebuilt each time.
function mkIconButton(cls, icon, onClick) {
  const btn = document.createElement('ha-icon-button');
  btn.className = cls;
  btn.appendChild(mkIcon(icon));
  btn.addEventListener('click', onClick);
  return btn;
}

function renderRow(item, show, tr, openItems) {
  const hex  = item.color || 'grey';
  const days = (!item.delivered && item.deliveryDate) ? daysUntil(item.deliveryDate) : null;

  // Chevron/detail are created further down (only when there's something to
  // show), but a failed image load needs to retroactively hide them; so
  // both image error handlers below need a reference, hoisted here.
  let chevron = null, detail = null, chevIco = null;
  const hasOtherDetails = (item.events && item.events.length > 0) || !!item.trackingCode;
  function hideChevronIfImageWasTheOnlyReason() {
    // Only the scan image justified showing a chevron (no events, no
    // tracking code); once it fails to load there's nothing left to
    // reveal, so don't offer an expand that opens onto an empty box.
    if (hasOtherDetails) return;
    if (chevron) chevron.style.display = 'none';
  }

  // Icon wrap
  const iconWrap = mk('div', 'icon-wrap' + (item.tapUrl ? ' clickable' : ''));
  if (item.tapUrl) {
    iconWrap.dataset.url = item.tapUrl;
    const ripple = document.createElement('ha-ripple');
    iconWrap.appendChild(ripple);
    const bg = mk('div');
    bg.style.cssText = 'background:' + hex + ';opacity:.15;position:absolute;inset:0;border-radius:50%;pointer-events:none;';
    iconWrap.appendChild(bg);
  }
  // Once delivered, always show the icon (a checkmark for letters) rather
  // than the scan thumbnail, even though imageUrl itself stays resolved so
  // the detail view below can still show/open the actual scan on request.
  if (item.imageUrl && !item.delivered) {
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;';
    // If the scan URL fails to load (expired token, network issue, etc.),
    // swap in the same icon used when there's no image_url at all.
    img.addEventListener('error', () => {
      img.remove();
      iconWrap.appendChild(mkIcon(item.icon, { color: hex }));
      hideChevronIfImageWasTheOnlyReason();
    });
    iconWrap.appendChild(img);
  } else {
    iconWrap.appendChild(mkIcon(item.icon, { color: hex }));
  }

  // Badge
  const iconContainer = mk('div', 'icon-container');
  iconContainer.appendChild(iconWrap);
  if (show.badge && (days !== null || item.slotActive)) {
    const badge = mk('div', 'badge');
    badge.style.background = item.slotActive ? 'var(--success-color,#43A047)' : 'var(--disabled-color,#9E9E9E)';
    if (!item.slotActive) badge.textContent = days > 9 ? '9+' : String(days);
    iconContainer.appendChild(badge);
  }

  // Content
  const content = mk('div', 'content');
  content.appendChild(mk('div', 'name', item.name || '-'));
  if (show.location && item.location)  content.appendChild(mk('div', 'location', item.location));
  if (show.status && item.line1)       content.appendChild(mk('div', 'line1',    item.line1));
  if (item.line2)                      content.appendChild(mk('div', 'line2',    item.line2));
  // Letterbox is hidden once delivered: "this fits through your letterbox"
  // is only useful before you've received it (you don't need to wait home),
  // whether that's a package or mail.
  const showLetterbox = item.letterbox && !item.delivered;
  if ((show.carrier && item.carrier) || showLetterbox || item.rerouted || item.servicePoint) {
    const carrier = mk('div', 'carrier');
    let chipShown = false;
    const addSeparator = () => { if (chipShown) carrier.appendChild(mk('span', 'carrier-sep', '·')); chipShown = true; };

    if (show.carrier && item.carrier) {
      if (show.brand_icon !== false && item.brandIcon) carrier.appendChild(mkIcon(item.brandIcon, { size: '14px' }));
      carrier.appendChild(document.createTextNode(item.carrier));
      chipShown = true;
    }
    if (showLetterbox) {
      addSeparator();
      carrier.appendChild(mkIcon('mdi:mailbox', { size: '13px' }));
      carrier.appendChild(document.createTextNode((tr && tr.letterbox) || 'Fits in your letterbox'));
    }
    if (item.rerouted) {
      addSeparator();
      carrier.appendChild(mkIcon('mdi:store-marker', { size: '13px' }));
      carrier.appendChild(document.createTextNode((tr && tr.rerouted) || 'Delivery to a pickup point.'));
    }
    if (item.servicePoint) {
      addSeparator();
      carrier.appendChild(mkIcon('mdi:store-marker', { size: '13px' }));
      // Read from the CARRIERS registry itself (an optional `short` field,
      // e.g. "DHL Netherlands" -> "DHL") instead of a hand-maintained map
      // here that has already drifted out of sync twice (GLS/Dragonfly were
      // both missing from it) -- item.carrier is already this same lookup's
      // full name (see mapCanonicalParcel), so it's the right fallback for
      // any carrier that doesn't need shortening in the first place.
      const carrierEntry = resolveCarrier(item.integration, item.carrierCode);
      const shortCarrier = (carrierEntry && carrierEntry.short) || item.carrier;
      const spText = (tr && typeof tr.service_point === 'function')
        ? tr.service_point(shortCarrier)
        : 'Delivery to a ' + (shortCarrier || 'pickup') + ' point.';
      carrier.appendChild(document.createTextNode(spText + (item.pickupPoint ? ' (' + item.pickupPoint + ')' : '')));
    }
    content.appendChild(carrier);
  }

  // Row
  const row = mk('div', 'row' + (item.delivered && show.dim_delivered !== false ? ' delivered' : ''));
  row.appendChild(iconContainer);

  // Right side: content + optional chevron
  const right = mk('div', 'row-right');
  right.appendChild(content);

  const hasEvents  = item.events && item.events.length > 0;
  const hasDetails = (hasEvents || item.trackingCode || item.imageUrl) && show.details !== false;

  if (hasDetails) {
    chevron = mk('button', 'chevron-btn');
    chevIco = mkIcon('mdi:chevron-down', { size: '16px' });
    chevron.appendChild(chevIco);
    right.appendChild(chevron);

    // Detail section
    detail = mk('div', 'detail');
    if (item.imageUrl) {
      const bigImg = document.createElement('img');
      bigImg.src = item.imageUrl;
      bigImg.alt = '';
      // margin-bottom matches the spacing .tracking-code/.package-size
      // already use above themselves -- without it, whatever follows (event
      // timeline, tracking code, package size) sits right against the image
      // with only its own small top padding/margin, reading as cramped.
      bigImg.style.cssText = 'max-width:100%;max-height:320px;display:block;border-radius:8px;object-fit:contain;margin-bottom:10px;';
      // If the scan fails to load here too, just drop it; any other detail
      // content (tracking code, events) below it is still useful on its own.
      bigImg.addEventListener('error', () => { bigImg.remove(); hideChevronIfImageWasTheOnlyReason(); });
      detail.appendChild(bigImg);
    }
    if (hasEvents) dedupEvents(item.events).forEach(e => {
      const ei = mk('div', 'event-item');
      // Meta: date + location
      const metaParts = [];
      if (e.date && !isNaN(e.date)) {
        const diff = daysUntil(e.date);
        let dayLabel;
        if      (diff ===  0) dayLabel = tr.today;
        else if (diff === -1) dayLabel = tr.yesterday;
        else if (diff  >  -7) dayLabel = tr.days[e.date.getDay()]; // within the past week: day name only
        else {
          const d = e.date;
          dayLabel = tr.days[d.getDay()] + ' ' + d.getDate() + ' ' + tr.months[d.getMonth()];
        }
        const cap = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
        metaParts.push(cap + ' ' + tr.at_time + ' ' + formatTime(e.date));
      }
      if (show.location !== false && e.location) metaParts.push(e.location);
      if (metaParts.length) ei.appendChild(mk('div', 'event-meta', metaParts.join(' · ')));
      ei.appendChild(mk('div', 'event-text', ensurePeriod(e.text)));
      detail.appendChild(ei);
    });

    // Package size
    if (item.packageSize) {
      const ps = mk('div', 'package-size');
      const sizeIco = mkIcon(item.packageSizeIcon || 'mdi:ruler-square', { size: '13px' });
      ps.appendChild(sizeIco);
      ps.appendChild(document.createTextNode(item.packageSize));
      detail.appendChild(ps);
    }

    // Tracking code
    if (item.trackingCode) {
      const tc = mk('div', 'tracking-code');
      const copyIco = mkIcon('mdi:content-copy', { size: '13px' });
      const copyLabel = document.createTextNode(item.trackingCode);
      tc.appendChild(copyIco);
      tc.appendChild(copyLabel);
      tc.addEventListener('click', e => {
        e.stopPropagation();
        const code = item.trackingCode;
        const doConfirm = () => { copyIco.setAttribute('icon', 'mdi:check'); setTimeout(() => copyIco.setAttribute('icon', 'mdi:content-copy'), 1500); };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code).then(doConfirm).catch(() => {
            copyFallback(code); doConfirm();
          });
        } else {
          copyFallback(code); doConfirm();
        }
      });
      detail.appendChild(tc);
    }

    chevron.addEventListener('click', () => {
      const open = detail.classList.toggle('open');
      chevIco.setAttribute('icon', open ? 'mdi:chevron-up' : 'mdi:chevron-down');
    });

    // Restore open state from previous render
    if (item.trackingCode && openItems?.has(item.trackingCode)) {
      detail.classList.add('open');
      chevIco.setAttribute('icon', 'mdi:chevron-up');
    }
  }

  row.appendChild(right);

  // Wrap row + detail together so detail sits below the row as a sibling
  if (hasDetails) {
    const wrapper = mk('div', 'row-wrapper');
    wrapper.appendChild(row);
    wrapper.appendChild(detail);
    return wrapper;
  }
  return row;
}

// Dedup-merge helpers for PackageTrackerCard._collectItems() below -- pure,
// no per-call state, so hoisted here instead of being rebuilt (a fresh Set,
// a fresh array, two fresh closures) on every single call, which used to
// happen on every render tick that touched a tracked entity.
//
// Deduplicate by tracking code: first source wins, but later source may contribute a better name.
// EXCEPTION: for carriers in PARCEL_WINS_FOR, Parcel's own data is currently
// richer than that carrier's dedicated integration (e.g. DPD's own
// integration has no delivery slot yet); so Parcel wins wholesale instead
// of just contributing name/events. Derived from each family's own
// `parcelWins` flag (see mkCanonicalEntry) instead of being a second,
// disconnected place that has to be remembered and edited by hand as each
// dedicated integration matures -- flip the flag on the entry itself.
const PARCEL_WINS_FOR = new Set(
  Object.values(INTEGRATIONS).filter((d) => d.parcelWins).map((d) => d.carrierGroup)
);
// Supplementary fields that may exist on one source but not the other,
// independent of which source wins the main structural fields (status/
// dates): Parcel has full event history, the dedicated carrier
// integrations have package size/weight and pickup-point detail that
// Parcel doesn't expose. Always backfilled from whichever side has them,
// never overwriting a value the winning side already has.
// imageUrl: PostNL LetterboxParcel shipments get announced twice, once
// via postnl_canonical_letters (MyMail scan, has the actual envelope
// photo) and once via postnl_canonical_incoming/delivered (tracking
// data, no photo); both share the same barcode as dedupKey. Without
// this, whichever side wins the dedup (normally the parcel, since
// sources are processed in config order and packages typically come
// first) silently drops the letter's scan photo entirely.
const ENRICHMENT_FIELDS = ['packageSize', 'pickupPoint', 'letterbox', 'rerouted', 'servicePoint', 'imageUrl'];
function backfill(target, fallback) {
  for (const f of ENRICHMENT_FIELDS) if (!target[f] && fallback[f]) target[f] = fallback[f];
}
// Now that DPD/DHL NL/PostNL can optionally report their own `history`
// (in addition to Parcel's event log), the same real-world delivery can
// show up as events from both sources: same moments, different wording
// (e.g. DPD's own "Hub or other premises - Sorted" vs. Parcel's "Je
// pakket is klaar..." for the same timestamp). Picking one source
// wholesale would throw away real, non-overlapping information (each
// side occasionally has a moment the other doesn't), so instead: merge
// per-timestamp. The "primary" source's event wins when both have one
// for (roughly) the same moment; the other source's event is added only
// when primary has no event near that time at all.
const EVENT_MERGE_WINDOW_MS = 2 * 60 * 1000;
function mergeEventTimelines(primaryEvents, secondaryEvents) {
  const primary = primaryEvents || [], secondary = secondaryEvents || [];
  if (!secondary.length) return primary;
  if (!primary.length) return secondary;
  const extra = secondary.filter(se =>
    !se.date || isNaN(se.date) ||
    !primary.some(pe => pe.date && !isNaN(pe.date) && Math.abs(pe.date - se.date) <= EVENT_MERGE_WINDOW_MS)
  );
  if (!extra.length) return primary;
  return [...primary, ...extra].sort((a, b) => (b.date || 0) - (a.date || 0));
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARD
// ═══════════════════════════════════════════════════════════════════════════════

class PackageTrackerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<style>' + CARD_CSS + '</style><div id="root"></div>';
    this._root           = this.shadowRoot.getElementById('root');
    this._lastHashes     = {};
    this._lastLang       = null;
    this._countdownTimer = null;
    this._built          = false;
    this._cachedItems    = [];
    this._openItems      = new Set();
    this._sourceItemsCache = new Map();
  }

  connectedCallback() {
    if (!isBrandIconsAvailable()) {
      waitForBrandIcons().then(ok => { if (ok) this._render(); });
    }
    this._startCountdownTimer();
  }

  disconnectedCallback() {
    clearInterval(this._countdownTimer);
    this._countdownTimer = null;
  }

  _startCountdownTimer() {
    clearInterval(this._countdownTimer);
    // Re-render every 5 minutes; only meaningful if there's an active slot
    this._countdownTimer = setInterval(() => {
      if (this._hasActiveSlot()) this._render();
    }, 5 * 60 * 1000);
  }

  _hasActiveSlot() {
    return this._cachedItems.some(i => i.slotActive);
  }

  setConfig(config) {
    if (!config) throw new Error('package-tracker-card: missing config');
    // sources is optional now (see effectiveSources/autoDetectedEntities):
    // omitting it entirely, e.g. `type: custom:package-tracker-card` with
    // nothing else, is exactly the auto-detect flow the README describes.
    // Only reject it if it's present but the wrong shape.
    if (config.sources !== undefined && !Array.isArray(config.sources)) {
      throw new Error('package-tracker-card: sources must be an array');
    }
    this._config = mergeWithCardDefaults(config);
    this._lastHashes = {};
    this._cachedItems = [];
    this._sourceItemsCache = new Map();
    if (this._countdownTimer) this._startCountdownTimer();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    let changed = !this._built;
    if (hass.language !== this._lastLang) {
      this._lastLang = hass.language;
      changed = true;
      // Per-source item cache below is built with translated strings baked
      // in, so a language switch must force every source to re-collect.
      this._sourceItemsCache.clear();
    }
    // effectiveSources, not this._config.sources directly: with no sources
    // configured at all, the card auto-detects everything it recognizes
    // (see effectiveSources's own comment), so change-watching needs to
    // cover that same live set too, or an auto-shown package would never
    // trigger a re-render once its status actually changes.
    for (const { entity } of effectiveSources(this._config, hass)) {
      if (!entity) continue;
      // Compare last_updated (not last_changed; that only fires on state-value
      // changes, missing attribute-only updates like a package status changing
      // while the sensor's count stays the same) instead of serializing attributes.
      const ts = hass.states[entity]?.last_updated ?? null;
      if (ts !== this._lastHashes[entity]) { this._lastHashes[entity] = ts; changed = true; }
    }
    if (changed) this._render();
  }

  _collectItems() {
    const lang = this._hass.language || 'en';
    const ctx   = { tr: TRANSLATIONS[lang] || TRANSLATIONS['en'], hass: this._hass };
    const items = [];
    for (const source of effectiveSources(this._config, this._hass)) {
      if (!source.entity) continue;
      const state = this._hass.states[source.entity];
      const attrs = state?.attributes;
      if (!attrs) continue;
      // A typed source (source.type set) needs its registry entry to exist;
      // a type-less one (see migrateSourceType/canonicalSourceInfo) needs no
      // registry lookup at all, but still can't be collected until it's
      // actually confirmed canonical-shaped below.
      if (source.type && !INTEGRATIONS[source.type]) continue;
      // Skip re-running collect() for sources whose entity hasn't changed
      // since the last collection; def.collect() (image-map building, event
      // parsing, etc.) is the expensive part here, not the dedup/merge below.
      const cached = this._sourceItemsCache.get(source.entity);
      if (cached && cached.ts === state.last_updated) {
        items.push(...cached.items);
        continue;
      }
      // One source's collect() throwing (e.g. an integration ships an
      // unexpected attribute shape) must not take down every other
      // source's already-working packages -- same guard the editor's own
      // _availableCarriers() already uses for this identical call.
      try {
        let sourceItems;
        if (source.type) {
          sourceItems = INTEGRATIONS[source.type].collect(attrs, ctx);
        } else {
          // Type-less: a generically-detected ha-parcel-integrations family
          // member (see collectGenericSourceItems's own comment). Not
          // identifiable (null) -- e.g. the entity was removed/renamed since
          // this source was migrated/added -- silently yields no items,
          // same as a typed source whose def is missing.
          sourceItems = collectGenericSourceItems(source.entity, attrs, ctx.tr, this._hass);
          if (!sourceItems) continue;
        }
        this._sourceItemsCache.set(source.entity, { ts: state.last_updated, items: sourceItems });
        items.push(...sourceItems);
      } catch (err) {
        console.error(`package-tracker-card: source "${source.type || source.entity}" (${source.entity}) failed to collect`, err);
      }
    }
    // Dedup-merge helpers (PARCEL_WINS_FOR/ENRICHMENT_FIELDS/backfill/
    // EVENT_MERGE_WINDOW_MS/mergeEventTimelines) are module-scope, above --
    // pure, no per-call state, so not rebuilt here on every call.
    const seen = new Map();
    return items.filter(i => {
      if (!i.dedupKey) return true;
      if (seen.has(i.dedupKey)) {
        const kept = seen.get(i.dedupKey);
        const keptBackup = { ...kept };
        // Identify which of the two (if either) is the Parcel-sourced item,
        // regardless of arrival order; `kept` might be either one.
        let parcelItem = null, otherItem = null;
        if (i.integration === 'parcel' && kept.integration !== 'parcel') { parcelItem = i; otherItem = kept; }
        else if (kept.integration === 'parcel' && i.integration !== 'parcel') { parcelItem = kept; otherItem = i; }
        if (parcelItem && otherItem) {
          if (PARCEL_WINS_FOR.has(otherItem.integration)) {
            // Parcel wins the main fields (status/dates/etc.) wholesale for
            // this carrier, but its own event log might still be missing
            // moments the carrier's own (currently less mature) integration
            // happens to have; merge rather than fully discarding those.
            const mergedEvents = mergeEventTimelines(parcelItem.events, otherItem.events);
            if (kept !== parcelItem) Object.assign(kept, parcelItem);
            kept.events = mergedEvents;
          } else {
            // The dedicated carrier integration wins structurally; capture
            // Parcel's name *before* any assign below, since if parcelItem
            // is `kept` itself, assigning into `kept` would otherwise
            // clobber it first.
            const parcelName = parcelItem.name;
            const mergedEvents = mergeEventTimelines(otherItem.events, parcelItem.events);
            if (kept !== otherItem) Object.assign(kept, otherItem);
            if (parcelName) kept.name = parcelName;
            kept.events = mergedEvents;
          }
        }
        // Whichever branch ran (or didn't), backfill any enrichment field
        // the winning side ended up without: first from kept's own
        // pre-merge state (in case a wholesale overwrite cleared it), then
        // from the other source.
        backfill(kept, keptBackup);
        backfill(kept, i);
        return false;
      }
      seen.set(i.dedupKey, i); return true;
    });
  }

  _sortItems(items) {
    const now   = new Date();
    const today = new Date(); today.setHours(0,0,0,0);
    // Priority groups: 0=active slot, 1=past slot, 2=today, 3=future, 4=no date, 5=delivered
    return [...items].sort((a, b) => {
      const pa = itemPriority(a, now, today), pb = itemPriority(b, now, today);
      if (pa !== pb) return pa - pb;
      // Packages with a status/event always above those without
      const hasA = a.line1 ? 1 : 0, hasB = b.line1 ? 1 : 0;
      if (hasA !== hasB) return hasB - hasA;
      const nameA = (a.name || '').toLowerCase(), nameB = (b.name || '').toLowerCase();
      let nameDiff = 0;
      if      (nameA < nameB) nameDiff = -1;
      else if (nameA > nameB) nameDiff = 1;
      // Within delivered: newest first
      if (a.delivered) {
        const dateDiff = (b.deliveryDate || 0) - (a.deliveryDate || 0);
        if (dateDiff !== 0) return dateDiff;
        return nameDiff;
      }
      // Within active/past slot: earliest slot end first
      if (pa <= 1) {
        const slotDiff = (a.slotEnd || a.deliveryDate || 0) - (b.slotEnd || b.deliveryDate || 0);
        if (slotDiff !== 0) return slotDiff;
        return nameDiff;
      }
      // Within today/future: earliest first
      if (a.deliveryDate && b.deliveryDate) {
        const dateDiff = a.deliveryDate - b.deliveryDate;
        if (dateDiff !== 0) return dateDiff;
      }
      return nameDiff;
    });
  }

  _render() {
    if (!this._hass || !this._config) return;
    this._cachedItems = this._collectItems();
    if (this._openItems.size) {
      const live = new Set(this._cachedItems.map(i => i.trackingCode).filter(Boolean));
      for (const code of this._openItems) if (!live.has(code)) this._openItems.delete(code);
    }
    let items = applyFilter(this._sortItems(this._cachedItems), this._config.filter);
    if (this._config.max > 0) items = items.slice(0, this._config.max);
    const show   = this._config.show;
    const layout = this._config.layout || 'single';
    const tr     = TRANSLATIONS[this._hass.language] || TRANSLATIONS['en'];

    this._built = true;
    if (!items.length && show.hide_when_empty) {
      this.classList.add('hidden');
      this._root.innerHTML = '';
      return;
    }
    this.classList.remove('hidden');
    this._root.innerHTML = '';

    if (!items.length) {
      const card  = document.createElement('ha-card');
      const empty = mk('div', 'empty');
      const ico = mkIcon('mdi:package-variant', { size: '32px' });
      ico.style.opacity = '.3';
      empty.appendChild(ico);
      empty.appendChild(mk('div', null, tr.no_packages));
      // Surface misconfigured sources instead of silently rendering the same
      // generic empty state whether packages are simply absent right now or
      // a source entity doesn't exist at all.
      const missingSources = this._config.sources.filter(s => s.entity && !this._hass.states[s.entity]);
      if (missingSources.length) {
        empty.appendChild(mk('div', 'empty-sub', missingSources.map(s => s.entity).join(', ') + tr.not_found));
      }
      card.appendChild(empty);
      this._root.appendChild(card);
      return;
    }

    const buildRow = (item) => {
      const row = renderRow(item, show, tr, this._openItems);
      const clickableIcon = row.querySelector('.icon-wrap.clickable');
      if (clickableIcon) {
        const chevronBtn = row.querySelector('.chevron-btn');
        if (item.imageUrl && chevronBtn) {
          // A scan thumbnail with an expandable preview available: open
          // that inline instead of navigating to an external page.
          clickableIcon.addEventListener('click', () => chevronBtn.click());
        } else if (item.tapUrl) {
          clickableIcon.addEventListener('click', () => window.open(item.tapUrl, '_blank'));
        }
      }
      // Persist open/close state across renders
      if (item.trackingCode) {
        row.querySelector('.chevron-btn')?.addEventListener('click', () => {
          if (this._openItems.has(item.trackingCode)) this._openItems.delete(item.trackingCode);
          else this._openItems.add(item.trackingCode);
        });
      }
      return row;
    };

    if (layout === 'split') {
      const wrapper = mk('div', 'split-wrapper');
      for (const item of items) {
        const card = document.createElement('ha-card');
        card.appendChild(buildRow(item));
        wrapper.appendChild(card);
      }
      this._root.appendChild(wrapper);
    } else {
      const card   = document.createElement('ha-card');
      const single = mk('div', 'single');
      for (const item of items) single.appendChild(buildRow(item));
      card.appendChild(single);
      this._root.appendChild(card);
    }
  }

  getCardSize() {
    if (this._config?.show?.hide_when_empty && this.classList.contains('hidden')) return 0;
    return 3;
  }

  getGridOptions() {
    // Package lists vary a lot in height depending on how many are in
    // transit, so rows is 'auto' rather than a fixed count; full-width by
    // default since a cramped narrow column reads poorly for a list card.
    return { columns: 'full', rows: 'auto' };
  }

  static getConfigElement() { return document.createElement('package-tracker-card-editor'); }
  static getStubConfig() {
    // Deliberately empty, not auto-detected: a silently pre-filled source
    // the user never chose was confusing in practice, even though it made
    // the card-picker preview non-empty. Explicit entity selection (the
    // Sources tab, or getEntitySuggestion for the manual-YAML picker) is
    // the only way a source ends up in the config now.
    return { sources: [] };
  }
}

if (!customElements.get('package-tracker-card')) {
  customElements.define('package-tracker-card', PackageTrackerCard);
}

// ═══════════════════════════════════════════════════════════════════════════════
// EDITOR
// ═══════════════════════════════════════════════════════════════════════════════

const EDITOR_CSS = `
  :host { display: block; }
  ha-form { display: block; }
  .repo-link { font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; margin-right: 8px; text-decoration: none; flex-shrink: 0; }
  .repo-link:hover { text-decoration: underline; }
  .editor-card { border: 1px solid var(--divider-color); border-radius: var(--ha-card-border-radius, 12px); overflow: hidden; background: var(--ha-card-background, var(--card-background-color, #fff)); }
  .tab-bar { display: flex; border-bottom: 1px solid var(--divider-color); }
  .tab-btn { flex: 1; padding: 12px 4px; border: none; background: none; font-family: inherit; font-size: 13px; font-weight: 500; color: var(--secondary-text-color); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color .15s, border-color .15s; }
  .tab-btn:hover  { color: var(--primary-text-color); }
  .tab-btn.active { color: var(--primary-color); border-bottom-color: var(--primary-color); font-weight: 600; }
  .tab-content { padding: 16px; }
  .item-list { display: flex; flex-direction: column; gap: 16px; }
  .source-group { border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; }
  .row-action { min-width: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .add-btn { --mdc-icon-button-size: 36px; --mdc-icon-size: 18px; color: var(--primary-color); }
  .delete-btn { --mdc-icon-button-size: 36px; --mdc-icon-size: 18px; color: var(--secondary-text-color); }
  .delete-btn:hover { color: var(--error-color, #db4437); }
  .body-label { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--secondary-text-color); margin: 14px 0 4px; }
  .body-label:first-child { margin-top: 6px; }
  .body-label-sub { font-size: 11px; color: var(--secondary-text-color); opacity: .7; margin: -2px 0 4px; }
  .section-label { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--secondary-text-color); margin: 24px 0 0; }
  .section-label:first-child { margin-top: 0; }
  .settings-group { margin-top: 8px; }
  .srow { display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding: 4px 2px; border-bottom: 1px solid var(--divider-color); gap: 8px; }
  .srow.srow-disabled { opacity: .45; pointer-events: none; }
  .settings-group .srow:last-child { border-bottom: none; }
  .srow-text { flex: 1; min-width: 0; }
  .srow-label { font-size: 14px; color: var(--primary-text-color); display: block; }
  .srow-desc  { font-size: 12px; color: var(--secondary-text-color); display: block; margin-top: 1px; }
  ha-switch { flex-shrink: 0; }
  .advanced-toggle { background: none; border: none; font-family: inherit; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--secondary-text-color); cursor: pointer; padding: 0; display: flex; align-items: center; gap: 6px; margin-top: 20px; width: 100%; }
  .advanced-toggle ha-icon { --mdc-icon-size: 14px; transition: transform .15s; }
  .advanced-toggle.open ha-icon { transform: rotate(180deg); }
  .advanced-content { margin-top: 8px; }
  .version-link { display: block; font-size: 11px; color: var(--secondary-text-color); text-decoration: none; text-align: center; padding: 10px 16px 12px; border-top: 1px solid var(--divider-color); }
  .version-link:hover { text-decoration: underline; }
`;

class PackageTrackerCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config         = null;
    this._hass           = null;
    this._built          = false;
    this._lastFiredConfig = null;
    this._tab            = 'sources';
    this._filterAdvOpen = false;
  }

  // Distinct {value, label} carrier options currently present across configured
  // sources; used to populate the carrier filter dropdown with carriers the
  // person actually has, instead of the full ~330-carrier static list.
  _availableCarriers() {
    if (!this._hass || !this._config) return [];
    const lang = this._hass.language || 'en';
    const ctx  = { tr: TRANSLATIONS[lang] || TRANSLATIONS['en'], hass: this._hass };
    // Group by display label, not by code; the same real-world carrier can
    // be reported under different codes depending on the source (e.g.
    // PostNL's own integrations use 'postnl', but Parcel reports PostNL
    // shipments under its own 'tntp' code) and would otherwise show up as
    // separate, identically-labeled dropdown entries. Each option's value
    // is a comma-joined list of every code that maps to that label, so
    // selecting it matches all of them.
    const byLabel = new Map(); // label -> Set of codes
    for (const source of effectiveSources(this._config, this._hass)) {
      if (!source.entity) continue;
      const attrs = this._hass.states[source.entity]?.attributes;
      if (!attrs) continue;
      let items;
      try {
        if (source.type) {
          const def = INTEGRATIONS[source.type];
          if (!def) continue;
          items = def.collect(attrs, ctx);
        } else {
          // Type-less: same generic canonical-family path _collectItems
          // uses, see collectGenericSourceItems's own comment.
          items = collectGenericSourceItems(source.entity, attrs, ctx.tr, this._hass);
          if (!items) continue;
        }
      } catch { continue; }
      for (const item of items) {
        if (!item.carrierCode) continue;
        const label = item.carrier || item.carrierCode;
        if (!byLabel.has(label)) byLabel.set(label, new Set());
        byLabel.get(label).add(item.carrierCode.toLowerCase());
      }
    }
    return [...byLabel.entries()]
      .map(([label, codes]) => ({ value: [...codes].join(','), label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  set hass(hass) {
    this._hass = hass;
    this.shadowRoot.querySelectorAll('ha-form').forEach(f => { f.hass = hass; });
  }

  setConfig(config) {
    if (!this._built) { this._config = this._normalize(config); this._init(); return; }
    // Echo of our own _fire(): HA calls back with (a config matching) what we
    // just dispatched, possibly more than once and not necessarily right
    // away -- confirmed the actual cause of numeric fields losing focus
    // after one keystroke elsewhere in these cards, since a boolean flag
    // alone can't distinguish "no echo yet" from "already consumed one, a
    // second is still coming" or "echo never arrived, stay stuck forever"
    // (this file's old _ownFire had no timeout fallback at all for that
    // last case). Comparing directly against what we last actually
    // dispatched catches every echo regardless of timing or count.
    if (this._lastFiredConfig && deepEqual(config, this._lastFiredConfig)) return;
    this._config = this._normalize(config);
    this._renderTab();
  }

  _normalize(config) {
    return mergeWithCardDefaults(config, { sources: [] });
  }

  _fire(config) {
    this._config  = config;
    const stripped = stripDefaults(config);
    this._lastFiredConfig = stripped;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: stripped }, bubbles: true, composed: true }));
  }

  _fireAndRender(config) { this._fire(config); this._renderTab(); }

  _init() {
    this._built = true;
    const root = this.shadowRoot;
    root.innerHTML = '';
    root.appendChild(Object.assign(document.createElement('style'), { textContent: EDITOR_CSS }));

    const card   = document.createElement('div'); card.className   = 'editor-card';
    const tabBar = document.createElement('div'); tabBar.className = 'tab-bar';

    const uiTr = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];
    [['sources', uiTr.sources_tab], ['filter', uiTr.filter_tab], ['appearance', uiTr.display_tab]].forEach(([id, label]) => {
      const btn = Object.assign(document.createElement('button'), {
        className: 'tab-btn' + (id === this._tab ? ' active' : ''), textContent: label,
      });
      btn.dataset.tab = id;
      btn.addEventListener('click', () => {
        if (this._tab === id) return;
        this._tab = id;
        tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
        this._renderTab();
      });
      tabBar.appendChild(btn);
    });
    card.appendChild(tabBar);

    this._content = document.createElement('div'); this._content.className = 'tab-content';
    card.appendChild(this._content);
    card.appendChild(Object.assign(document.createElement('a'), {
      href: 'https://github.com/klaptafel/ha-package-tracker-card',
      target: '_blank', rel: 'noopener noreferrer',
      className: 'version-link', textContent: 'Package Tracker Card v' + CARD_VERSION,
    }));

    root.appendChild(card);
    this._renderTab();
  }

  _renderTab() {
    this._content.innerHTML = '';
    if      (this._tab === 'sources')    this._renderSources();
    else if (this._tab === 'filter')     this._renderFilter();
    else if (this._tab === 'appearance') this._renderAppearance();
    if (this._hass) this.shadowRoot.querySelectorAll('ha-form').forEach(f => { f.hass = this._hass; });
  }

  // ── Sources ───────────────────────────────────────────────────────────────

  _renderSources() {
    const root    = this._content;
    const sources = this._config.sources || [];
    const uiTr    = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];

    const saveGroup = (groupTypes, updatedForGroup) => {
      const others = sources.filter(s => !groupTypes.includes(s.type));
      this._fireAndRender({ ...this._config, sources: [...others, ...updatedForGroup] });
    };

    const notice = document.createElement('p');
    notice.style.cssText = 'margin:0 0 16px;font-size:13px;color:var(--secondary-text-color);line-height:1.4;';
    // With nothing added below yet, the card itself is already showing
    // everything it recognizes (see effectiveSources) -- say so here too,
    // since every row below still shows its normal "+" (not yet added)
    // state, which would otherwise read as "nothing is being tracked".
    notice.textContent = sources.length
      ? uiTr.sources_auto_detect_notice
      : uiTr.sources_auto_detect_notice + ' ' + uiTr.sources_none_configured_notice;
    root.appendChild(notice);

    const groups = new Map();
    for (const [type, def] of Object.entries(INTEGRATIONS)) {
      const g = def.group || type;
      if (!groups.has(g)) groups.set(g, { label: def.groupLabel || g, url: def.url, types: [] });
      groups.get(g).types.push(type);
      if (def.canonical) groups.get(g).canonical = true;
    }
    // Compute each group's installed/active status once; used for both
    // the sort order below and the row rendering further down.
    for (const group of groups.values()) {
      group.platformOk  = group.types.some(t => this._hass && isPlatformInstalled(t, this._hass));
      group.groupActive = group.types.some(t => sources.some(s => s.type === t));
    }

    // A group that's neither installed nor already configured has nothing
    // to show: no "not yet installed, click to install" tile anymore (direct
    // user feedback, 2026-07-30 -- the canonical family already dropped this
    // for the same reason, and by now this registry only has one remaining
    // group that could ever hit it, jmdevita/parcel-ha, not worth a whole
    // separate "more integrations" toggle mechanism just for that one case).
    // Simple alphabetical sort is enough once only real, present groups
    // reach the list below.
    const sortedGroups = [...groups.entries()]
      .filter(([, g]) => g.platformOk || g.groupActive)
      .sort(([, a], [, b]) => a.label.localeCompare(b.label));

    const list = document.createElement('div'); list.className = 'item-list';

    // ── Generic canonical discovery ─────────────────────────────────────
    // Any ha-parcel-integrations family member with no INTEGRATIONS entry of
    // its own -- present or future -- rendered from live hass.entities data
    // instead of a hand-written registry, so a brand-new carrier repo needs
    // zero changes here. Always "installed" by construction (it was found on
    // the live entities), so there's no not-installed prompt to show;
    // rendered ahead of the registry-driven groups below since it's always
    // real/active.
    const canonicalList = document.createElement('div'); canonicalList.className = 'item-list';
    const discovered = this._hass ? discoverCanonicalSources(this._hass) : new Map();
    const sortedCarriers = [...discovered.entries()].sort(([a], [b]) => a.localeCompare(b));

    for (const [carrier, devices] of sortedCarriers) {
      const deviceEntries = [...devices.values()];
      const allEntityIds  = deviceEntries.flatMap(d => [...d.buckets.values()]);
      const groupActive   = allEntityIds.some(e => sources.some(s => s.entity === e));

      const groupEl = document.createElement('div'); groupEl.className = 'source-group';
      const header = document.createElement('div');
      header.style.cssText = 'display:flex;align-items:center;padding:0 8px 0 14px;min-height:52px;';
      header.appendChild(Object.assign(document.createElement('div'), {
        textContent: carrier,
        style: 'flex-shrink:0;font-size:14px;font-weight:500;color:var(--primary-text-color);',
      }));
      header.appendChild(Object.assign(document.createElement('div'), { style: 'flex:1;min-width:8px;' }));

      // No registry entry exists for a generically-detected carrier to read
      // its specific repo URL from, and guessing one from the platform name
      // risks linking to a repo that doesn't actually exist (direct user
      // feedback, 2026-07-30) -- link to the organization page instead,
      // always correct, letting the user find the exact repo from there.
      const orgLink = document.createElement('a');
      orgLink.className = 'repo-link';
      orgLink.href = 'https://github.com/ha-parcel-integrations'; orgLink.target = '_blank'; orgLink.rel = 'noopener';
      orgLink.title = uiTr.source_repo_link_desc;
      orgLink.textContent = 'ha-parcel-integrations';
      header.appendChild(orgLink);

      const mkBucketSection = (entityId, bucket, dividerStyle) => {
        const stored = sources.some(s => s.entity === entityId) ? entityId : null;
        const section = document.createElement('div');
        section.style.cssText = dividerStyle;
        section.appendChild(Object.assign(document.createElement('div'), {
          className: 'body-label', textContent: uiTr[BUCKET_ROW_LABEL_KEY[bucket]], style: 'margin-top:0;',
        }));
        const entityForm = document.createElement('ha-form');
        entityForm.schema = [{ name: 'entity', selector: { entity: { include_entities: [entityId] } } }];
        entityForm.data         = { entity: stored };
        entityForm.computeLabel = () => '';
        if (this._hass) entityForm.hass = this._hass;
        entityForm.addEventListener('value-changed', (e) => {
          const entity = e.detail.value.entity ?? null;
          const without = sources.filter(s => s.entity !== entityId);
          this._fireAndRender({ ...this._config, sources: entity ? [...without, sourceForBucket(bucket, entity)] : without });
        });
        section.appendChild(entityForm);
        return section;
      };

      // Only split into per-device sub-rows once there are at least two
      // genuinely distinguishable devices (same threshold as
      // deviceCandidatesForGroup above); otherwise render this carrier's
      // buckets directly under its own header, one flat section per bucket.
      // Devices are keyed by their own device_id in discoverCanonicalSources
      // (not by name), so they stay genuinely distinguishable even when one
      // is unnamed -- requiring every device to have a name here used to
      // fall back to the flat/merged branch below instead, which keys by
      // bucket only and would then silently overwrite one device's entity
      // with another's sharing the same bucket (e.g. two accounts both
      // having "incoming_parcels"). Give an unnamed device a numbered
      // fallback label instead of dropping per-device rows altogether.
      const useDeviceRows = deviceEntries.length >= 2;

      if (useDeviceRows) {
        groupEl.appendChild(header);
        deviceEntries.forEach(({ deviceName, buckets }, deviceIdx) => {
          const label        = deviceName || `${uiTr.source_unnamed_device} ${deviceIdx + 1}`;
          const entityIds    = [...buckets.values()];
          const deviceActive = entityIds.some(e => sources.some(s => s.entity === e));

          const deviceBlock = document.createElement('div'); deviceBlock.className = 'device-block';
          deviceBlock.style.cssText = 'border-top:1px solid var(--divider-color);';

          const nameRow = document.createElement('div');
          nameRow.style.cssText = 'display:flex;align-items:center;padding:8px 8px 8px 14px;min-height:40px;';
          nameRow.appendChild(Object.assign(document.createElement('div'), {
            textContent: label, style: 'flex:1;font-size:13px;color:var(--secondary-text-color);',
          }));
          const deviceBtnWrap = document.createElement('div'); deviceBtnWrap.className = 'row-action';
          if (deviceActive) {
            deviceBtnWrap.appendChild(mkIconButton('delete-btn', 'mdi:delete-outline', () => {
              this._fireAndRender({ ...this._config, sources: sources.filter(s => !entityIds.includes(s.entity)) });
            }));
          } else {
            deviceBtnWrap.appendChild(mkIconButton('add-btn', 'mdi:plus', () => {
              const toAdd = sortedBucketEntries(buckets).map(([bucket, entity]) => sourceForBucket(bucket, entity));
              this._fireAndRender({ ...this._config, sources: [...sources, ...toAdd] });
            }));
          }
          nameRow.appendChild(deviceBtnWrap);
          deviceBlock.appendChild(nameRow);

          if (deviceActive) {
            for (const [bucket, entityId] of sortedBucketEntries(buckets)) {
              deviceBlock.appendChild(mkBucketSection(entityId, bucket, 'padding:0 12px 10px 14px;'));
            }
          }
          groupEl.appendChild(deviceBlock);
        });
      } else {
        const mergedBuckets = new Map();
        for (const d of deviceEntries) for (const [bucket, entityId] of d.buckets) mergedBuckets.set(bucket, entityId);

        const btnWrap = document.createElement('div'); btnWrap.className = 'row-action';
        if (groupActive) {
          btnWrap.appendChild(mkIconButton('delete-btn', 'mdi:delete-outline', () => {
            this._fireAndRender({ ...this._config, sources: sources.filter(s => !allEntityIds.includes(s.entity)) });
          }));
        } else {
          btnWrap.appendChild(mkIconButton('add-btn', 'mdi:plus', () => {
            const toAdd = [...mergedBuckets.entries()].map(([bucket, entity]) => sourceForBucket(bucket, entity));
            this._fireAndRender({ ...this._config, sources: [...sources, ...toAdd] });
          }));
        }
        header.appendChild(btnWrap);
        groupEl.appendChild(header);

        if (groupActive) {
          const body = document.createElement('div');
          body.style.cssText = 'border-top:1px solid var(--divider-color);';
          let bi = 0;
          for (const [bucket, entityId] of mergedBuckets) {
            body.appendChild(mkBucketSection(entityId, bucket, 'padding:10px 12px 12px;' + (bi > 0 ? 'border-top:1px solid var(--divider-color);' : '')));
            bi++;
          }
          groupEl.appendChild(body);
        }
      }

      canonicalList.appendChild(groupEl);
    }

    // A configured canonical source (or postnl_canonical_letters, folded
    // into the same discovery display above) whose entity was later renamed
    // or removed drops out of `discovered` entirely -- it only ever scans
    // live hass.entities -- and has no `type` of its own for the
    // registry-driven groups below to still recognize it by. Without this,
    // such a source would become permanently invisible in this editor,
    // fixable only by hand-editing the saved YAML.
    const discoveredEntityIds = new Set();
    for (const devices of discovered.values()) {
      for (const { buckets } of devices.values()) {
        for (const entityId of buckets.values()) discoveredEntityIds.add(entityId);
      }
    }
    const orphanedSources = sources.filter(s =>
      s.entity && (!s.type || s.type === 'postnl_canonical_letters') && !discoveredEntityIds.has(s.entity)
    );
    if (orphanedSources.length) {
      const orphanGroup = document.createElement('div'); orphanGroup.className = 'source-group';
      const notice = document.createElement('p');
      notice.style.cssText = 'margin:10px 14px 8px;font-size:12px;color:var(--secondary-text-color);line-height:1.4;';
      notice.textContent = uiTr.sources_orphaned_notice;
      orphanGroup.appendChild(notice);
      const body = document.createElement('div');
      body.style.cssText = 'border-top:1px solid var(--divider-color);';
      orphanedSources.forEach((s, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;padding:8px 8px 8px 14px;min-height:40px;' + (i > 0 ? 'border-top:1px solid var(--divider-color);' : '');
        row.appendChild(Object.assign(document.createElement('div'), {
          textContent: s.entity, style: 'flex:1;font-size:13px;font-family:monospace;color:var(--secondary-text-color);',
        }));
        const btnWrap = document.createElement('div'); btnWrap.className = 'row-action';
        btnWrap.appendChild(mkIconButton('delete-btn', 'mdi:delete-outline', () => {
          this._fireAndRender({ ...this._config, sources: sources.filter(x => x !== s) });
        }));
        row.appendChild(btnWrap);
        body.appendChild(row);
      });
      orphanGroup.appendChild(body);
      canonicalList.appendChild(orphanGroup);
    }

    for (const [groupKey, group] of sortedGroups) {
      const platformOk  = group.platformOk;
      const groupActive = group.groupActive;

      // postnl_canonical_letters isn't a mkCanonicalEntry entry (no
      // `canonical` flag -- see its own comment on why it's structurally
      // different) so it wouldn't otherwise be caught by the check below,
      // but discoverCanonicalSources now folds it into the same per-account
      // rows as that account's own canonical parcel buckets (direct user
      // feedback, 2026-07-30: with two PostNL accounts, each account's own
      // Letters entity is expected under that same account). Rendering it
      // here too would show it twice.
      if (groupKey === 'postnl_letters') continue;

      // Every group declaring `canonical` (see mkCanonicalEntry) is a real
      // per-carrier canonical family member, now handled by the generic
      // discovery section below instead of this registry-driven one --
      // config for these already migrates to the type-less `{ entity }`
      // shape (see migrateSourceType), so groupActive here is always false
      // for them post-migration; this registry path simply no longer
      // renders them, drop entirely rather than duplicate.
      if (group.canonical) continue;

      const groupEl = document.createElement('div'); groupEl.className = 'source-group';

      // Header
      const header = document.createElement('div');
      header.style.cssText = 'display:flex;align-items:center;padding:0 8px 0 14px;min-height:52px;';

      header.appendChild(Object.assign(document.createElement('div'), {
        textContent: group.label,
        style: 'flex-shrink:0;font-size:14px;font-weight:500;color:' + (platformOk || groupActive ? 'var(--primary-text-color)' : 'var(--disabled-color,#9e9e9e)') + ';',
      }));


      header.appendChild(Object.assign(document.createElement('div'), { style: 'flex:1;min-width:8px;' }));

      if (group.url) {
        const repoMatch = group.url.match(/github\.com\/([^/]+\/[^/]+)/);
        const repoLink = document.createElement('a');
        repoLink.className = 'repo-link';
        repoLink.href = group.url; repoLink.target = '_blank'; repoLink.rel = 'noopener';
        repoLink.title = uiTr.source_repo_link_desc;
        repoLink.textContent = repoMatch ? repoMatch[1] : uiTr.source_repo_link;
        header.appendChild(repoLink);
      }

      const deviceMap = this._hass ? deviceCandidatesForGroup(group, this._hass, sources) : null;

      if (deviceMap) {
        // Multiple recognized devices/accounts for this group (e.g. two
        // PostNL accounts), show one section per device, each with its own
        // add/remove and per-type entity display, so it's both visible and
        // editable per account, the same granularity YAML already shows.
        // No group-level button here (each device manages its own below),
        // so the header ends right after the repo link with no empty gap.
        groupEl.appendChild(header);
        for (const [deviceName, entityMap] of deviceMap) {
          const entityIds     = [...entityMap.values()];
          const deviceActive  = entityIds.some(e => sources.some(s => s.entity === e));

          // One shared left edge (matching the group header's own 14px) for
          // everything belonging to this device: name row and per-type
          // rows below line up with each other and with the title above;
          // the divider line is what separates one device from the next.
          const deviceBlock = document.createElement('div'); deviceBlock.className = 'device-block';
          deviceBlock.style.cssText = 'border-top:1px solid var(--divider-color);';

          const nameRow = document.createElement('div');
          nameRow.style.cssText = 'display:flex;align-items:center;padding:8px 8px 8px 14px;min-height:40px;';
          nameRow.appendChild(Object.assign(document.createElement('div'), {
            textContent: deviceName, style: 'flex:1;font-size:13px;color:var(--secondary-text-color);',
          }));
          const deviceBtnWrap = document.createElement('div'); deviceBtnWrap.className = 'row-action';
          if (deviceActive) {
            deviceBtnWrap.appendChild(mkIconButton('delete-btn', 'mdi:delete-outline', () => {
              this._fireAndRender({ ...this._config, sources: sources.filter(s => !entityIds.includes(s.entity)) });
            }));
          } else {
            deviceBtnWrap.appendChild(mkIconButton('add-btn', 'mdi:plus', () => {
              const newSources = [...sources];
              for (const [type, entityId] of entityMap) newSources.push({ type, entity: entityId });
              this._fireAndRender({ ...this._config, sources: newSources });
            }));
          }
          nameRow.appendChild(deviceBtnWrap);
          deviceBlock.appendChild(nameRow);

          // Body: only once this device is active, mirroring exactly what
          // the single-device case shows below its own header: one entity
          // display per type, read-only-in-practice (locked to this
          // device's own entity) but visible the same way. Same 14px left
          // edge as the name row above and the group title.
          if (deviceActive) {
            group.types.forEach((type) => {
              const deviceEntity = entityMap.get(type);
              if (!deviceEntity) return; // this device doesn't offer this type (e.g. no letters sensor)
              const def      = INTEGRATIONS[type];
              const stored   = sources.some(s => s.type === type && s.entity === deviceEntity) ? deviceEntity : null;
              const rowLabel = (def.rowLabelKey && uiTr[def.rowLabelKey]) || def.rowLabel;

              const section = document.createElement('div');
              section.style.cssText = 'padding:0 12px 10px 14px;';
              section.appendChild(Object.assign(document.createElement('div'), {
                className: 'body-label', textContent: rowLabel, style: 'margin-top:0;',
              }));

              const entityForm = document.createElement('ha-form');
              entityForm.schema = [{ name: 'entity', selector: { entity: { include_entities: [deviceEntity] } } }];
              entityForm.data         = { entity: stored };
              entityForm.computeLabel = () => '';
              if (this._hass) entityForm.hass = this._hass;
              entityForm.addEventListener('value-changed', (e) => {
                const entity = e.detail.value.entity ?? null;
                const without = sources.filter(s => !(s.type === type && s.entity === deviceEntity));
                this._fireAndRender({ ...this._config, sources: entity ? [...without, { type, entity }] : without });
              });
              section.appendChild(entityForm);
              deviceBlock.appendChild(section);
            });
          }

          groupEl.appendChild(deviceBlock);
        }
      } else {
      const btnWrap = document.createElement('div'); btnWrap.className = 'row-action';
      if (groupActive) {
        // Trash button: removes all sources for this group
        btnWrap.appendChild(mkIconButton('delete-btn', 'mdi:delete-outline', () => saveGroup(group.types, [])));
      } else if (platformOk) {
        // Add button: ha-icon-button, blue
        btnWrap.appendChild(mkIconButton('add-btn', 'mdi:plus', () => {
          const toAdd = [];
          for (const type of group.types) {
            const candidates = this._hass ? candidatesForType(type, this._hass) : [];
            const usedByOthers = sources.filter(s => s.type !== type).map(s => s.entity).filter(Boolean);
            const available = candidates.filter(e =>
              detectTypeFromHass(e, this._hass) === type && !usedByOthers.includes(e)
            );
            if (available.length) toAdd.push({ type, entity: available[0] });
          }
          saveGroup(group.types, toAdd);
        }));
      }

      header.appendChild(btnWrap);
      groupEl.appendChild(header);
      }

      // Body: only shown when group is active AND not in per-device mode.
      // This section assumes at most one source per type (it picks/rebuilds
      // via find()/findIndex(), which only ever sees the first match); with
      // multiple devices of the same type, touching it would silently
      // collapse the group down to one source per type, discarding the
      // others. The device rows above already handle add/remove correctly
      // for that case, so this section simply doesn't apply there.
      if (groupActive && !deviceMap) {
        const body = document.createElement('div');
        body.style.cssText = 'border-top:1px solid var(--divider-color);';

        group.types.forEach((type, ti) => {
          const def          = INTEGRATIONS[type];
          const sourceIdx    = sources.findIndex(s => s.type === type);
          const stored       = sourceIdx !== -1 ? sources[sourceIdx].entity : null;
          const entityExists = stored ? !!this._hass?.states[stored] : false;
          const candidates   = this._hass ? candidatesForType(type, this._hass) : [];
          const usedByOthers = sources.filter(s => s.type !== type).map(s => s.entity).filter(Boolean);
          const available    = candidates.filter(e =>
            detectTypeFromHass(e, this._hass) === type && !usedByOthers.includes(e)
          );
          const rowLabel     = (def.rowLabelKey && uiTr[def.rowLabelKey]) || def.rowLabel;
          const currentEntity = stored || null; // auto-fill only happens on initial add

          const section = document.createElement('div');
          section.style.cssText = 'padding:10px 12px 12px;' + (ti > 0 ? 'border-top:1px solid var(--divider-color);' : '');

          section.appendChild(Object.assign(document.createElement('div'), {
            className: 'body-label', textContent: rowLabel, style: 'margin-top:0;',
          }));

          if (!currentEntity && def.entityHintText && uiTr[def.entityHintText]) {
            section.appendChild(Object.assign(document.createElement('div'), {
              className: 'body-label-sub', textContent: uiTr[def.entityHintText],
            }));
          }
          if (stored && !entityExists) {
            const e = Object.assign(document.createElement('div'), {
              className: 'body-label-sub', textContent: stored + uiTr.not_found,
            });
            e.style.color = 'var(--error-color,#db4437)';
            section.appendChild(e);
          }

          const entityForm = document.createElement('ha-form');
          const includeEntities = available.length ? [...available, ...(stored ? [stored] : [])] : null;
          entityForm.schema = [{ name: 'entity', selector: { entity: {
            ...(includeEntities ? { include_entities: includeEntities } : {}),
            exclude_entities: usedByOthers,
          } } }];
          entityForm.data         = { entity: currentEntity };
          entityForm.computeLabel = () => '';
          if (this._hass) entityForm.hass = this._hass;
          entityForm.addEventListener('value-changed', (e) => {
            const entity = e.detail.value.entity ?? null;
            // Rebuild all types in this group
            const groupSources = group.types.map(t => {
              if (t === type) return entity ? { type: t, entity } : null;
              const ex = sources.find(s => s.type === t);
              return ex || null;
            }).filter(Boolean);
            saveGroup(group.types, groupSources);
          });
          section.appendChild(entityForm);
          body.appendChild(section);
        });

        groupEl.appendChild(body);
      }

      list.appendChild(groupEl);
    }

    // Two separate .item-list flex containers, so the 16px gap that
    // separates .source-group rows within each of them doesn't apply
    // between them -- add it explicitly, only when there's actually a
    // discovery section above the registry-driven one to separate from.
    if (canonicalList.children.length) list.style.marginTop = '16px';
    root.appendChild(canonicalList);
    root.appendChild(list);

    // Nothing detected or configured at all: no per-integration install
    // prompts anymore (see above), so say so plainly and point at the
    // README's own list of what this card supports, instead of leaving an
    // empty tab with no explanation.
    if (!canonicalList.children.length && !list.children.length) {
      const empty = document.createElement('p');
      empty.style.cssText = 'margin:8px 0 0;font-size:13px;color:var(--secondary-text-color);line-height:1.4;';
      empty.textContent = uiTr.sources_empty_notice + ' ';
      const link = document.createElement('a');
      link.href = 'https://github.com/klaptafel/ha-package-tracker-card#sources';
      link.target = '_blank'; link.rel = 'noopener';
      link.textContent = uiTr.sources_empty_link;
      empty.appendChild(link);
      root.appendChild(empty);
    }
  }

  // ── Filter ────────────────────────────────────────────────────────────────

  _renderFilter() {
    const root   = this._content;
    const filter = this._config.filter || {};
    const save   = (f) => this._fireAndRender({ ...this._config, filter: f });
    const buildUpdatedFilter = (key, val) => {
      const f = { ...filter };
      if (val !== undefined && val !== null && val !== '') f[key] = val;
      else delete f[key];
      return f;
    };
    const upd = (key, val) => save(buildUpdatedFilter(key, val));
    // No-render variant: for fields that don't affect any other row's
    // visibility/disabled state, so typing or arrow-keying doesn't tear down
    // and recreate the input (which would steal focus after every keystroke).
    const saveNoRender = (f) => this._fire({ ...this._config, filter: f });
    const updNoRender  = (key, val) => saveNoRender(buildUpdatedFilter(key, val));
    const uiTr   = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_status }));
    const statusGroup = document.createElement('div'); statusGroup.className = 'settings-group';
    statusGroup.appendChild(this._mkForm(
      { select: { options: [
        { value: 'enroute',   label: uiTr.enroute },
        { value: 'delivered', label: uiTr.delivered },
        { value: 'all',       label: uiTr.all },
      ] } },
      filter.state || 'all',
      (val) => { if (val) save({ ...filter, state: val }); },
    ));
    root.appendChild(statusGroup);

    // Direction filter: only show when both incoming and outgoing are
    // configured -- checked across both typed sources (registry's own
    // direction field) and type-less ones (canonicalSourceInfo's own
    // bucket, resolved through BUCKET_DIRECTION, never compared to
    // 'incoming'/'outgoing' directly -- a bucket of 'delivered' still means
    // direction 'incoming', see BUCKET_DIRECTION's own comment).
    const sourceDirection = (s) => s.type
      ? INTEGRATIONS[s.type]?.direction
      : BUCKET_DIRECTION[canonicalSourceInfo(s.entity, this._hass)?.bucket];
    const sourceDirections = effectiveSources(this._config, this._hass).map(sourceDirection);
    const hasIncoming    = sourceDirections.includes('incoming');
    const hasOutgoing    = sourceDirections.includes('outgoing');
    if (hasIncoming && hasOutgoing) {
      root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_direction }));
      const dirGroup = document.createElement('div'); dirGroup.className = 'settings-group';
      dirGroup.appendChild(this._mkForm(
        { select: { options: [
          { value: 'all',      label: uiTr.all },
          { value: 'incoming', label: uiTr.incoming },
          { value: 'outgoing', label: uiTr.outgoing },
        ] } },
        filter.direction || 'all',
        (val) => upd('direction', val !== 'all' ? val : undefined),
      ));
      root.appendChild(dirGroup);
    }

    // Advanced (collapsible)
    const advBtn = document.createElement('button');
    advBtn.className = 'advanced-toggle' + (this._filterAdvOpen ? ' open' : '');
    advBtn.appendChild(mkIcon('mdi:chevron-down'));
    advBtn.appendChild(document.createTextNode(' ' + uiTr.advanced));
    const advContent = document.createElement('div');
    advContent.className = 'advanced-content';
    advContent.style.display = this._filterAdvOpen ? '' : 'none';
    advBtn.addEventListener('click', () => {
      this._filterAdvOpen = !this._filterAdvOpen;
      advBtn.classList.toggle('open', this._filterAdvOpen);
      advContent.style.display = this._filterAdvOpen ? '' : 'none';
    });

    // Carrier
    advContent.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', style: 'margin-top:0', textContent: uiTr.filter_carrier }));
    const carrierGroup = document.createElement('div'); carrierGroup.className = 'settings-group';
    const carrierOptions = this._availableCarriers();
    carrierGroup.appendChild(this._mkFormRow(
      uiTr.carrier_code,
      { select: { multiple: true, mode: 'dropdown', options: carrierOptions } },
      filterCarriers(filter),
      (val) => {
        const f = { ...filter };
        if (val.length) f.carriers = val; else delete f.carriers;
        delete f.carrier; // drop legacy singular key once the new UI is used
        save(f);
      },
      {
        // _mkFormRow shows disabledReason instead of description while
        // disabled (see _mkToggleRow's own use of the same pattern) --
        // disabled here is exactly "no carrier options at all", so that's
        // also exactly when the "no carriers detected yet" text should
        // replace the normal helper text, not just additionally gate the form.
        description: uiTr.carrier_code_desc,
        disabledReason: uiTr.carrier_code_empty,
        disabled: !carrierOptions.length,
        width: '220px',
      },
    ));
    advContent.appendChild(carrierGroup);

    // Time slot
    advContent.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_slot }));
    const slotGroup = document.createElement('div'); slotGroup.className = 'settings-group';
    const slotDisabled = (filter.state || 'all') !== 'enroute';
    const slotRow = this._mkToggleRow(uiTr.filter_slot_active, !!filter.slot_active, slotDisabled ? null : uiTr.filter_slot_desc,
      (val) => upd('slot_active', val || undefined),
      { disabled: slotDisabled, disabledReason: uiTr.filter_slot_requires_enroute }
    );
    slotGroup.appendChild(slotRow);
    advContent.appendChild(slotGroup);

    // Specific day
    advContent.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.filter_date }));
    const dateGroup = document.createElement('div'); dateGroup.className = 'settings-group';
    dateGroup.appendChild(this._mkNumberRow(uiTr.filter_date_label, filter.date, null, null, '', uiTr.filter_date_desc, (val) => updNoRender('date', val !== '' ? Number(val) : undefined)));
    advContent.appendChild(dateGroup);

    root.appendChild(advBtn);
    root.appendChild(advContent);
  }

  // ── Weergave ──────────────────────────────────────────────────────────────

  _renderAppearance() {
    const root  = this._content;
    const c     = this._config;
    const show  = c.show || {};
    const uiTr  = TRANSLATIONS[this._hass?.language] || TRANSLATIONS['en'];

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.layout }));
    const layoutGroup = document.createElement('div'); layoutGroup.className = 'settings-group';
    layoutGroup.appendChild(this._mkForm(
      { select: { options: [
        { value: 'single', label: uiTr.single_card },
        { value: 'split',  label: uiTr.split_cards },
      ] } },
      c.layout || 'single',
      (val) => { if (val) this._fireAndRender({ ...c, layout: val }); },
    ));
    layoutGroup.appendChild(this._mkNumberRow(uiTr.max_packages, c.max ?? 5, 1, 50, '', null, (val) => this._fire({ ...c, max: val !== '' ? Number(val) : 5 })));
    root.appendChild(layoutGroup);

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.show }));
    const showGroup = document.createElement('div'); showGroup.className = 'settings-group';
    const mkShow = (label, key, desc) => this._mkToggleRow(label, show[key] !== false, desc,
      (val) => this._fireAndRender({ ...c, show: { ...show, [key]: val } })
    );
    showGroup.appendChild(mkShow(uiTr.status,   'status',   uiTr.status_desc));
    showGroup.appendChild(mkShow(uiTr.carrier,  'carrier',  uiTr.carrier_desc));
    const carrierOff = show.carrier === false;
    const brandRow = this._mkToggleRow(uiTr.carrier_logo, show.brand_icon !== false, carrierOff ? null : uiTr.carrier_logo_desc,
      (val) => this._fireAndRender({ ...c, show: { ...show, brand_icon: val } }),
      { disabled: carrierOff, disabledReason: uiTr.carrier_logo_requires_carrier }
    );
    if (!carrierOff && uiTr.carrier_logo_link) {
      const descEl = brandRow.querySelector('.srow-desc');
      if (descEl) {
        const link = document.createElement('a');
        link.href = 'https://github.com/elax46/custom-brand-icons';
        link.target = '_blank'; link.rel = 'noopener';
        link.style.color = 'var(--primary-color)';
        link.textContent = uiTr.carrier_logo_link;
        descEl.appendChild(document.createTextNode(' '));
        descEl.appendChild(link);
      }
    }
    showGroup.appendChild(brandRow);
    showGroup.appendChild(mkShow(uiTr.details,  'details',  uiTr.details_desc));
    showGroup.appendChild(mkShow(uiTr.badge,    'badge',    uiTr.badge_desc));
    showGroup.appendChild(this._mkToggleRow(uiTr.location, show.location === true, uiTr.location_desc,
      (val) => this._fireAndRender({ ...c, show: { ...show, location: val } })
    ));
    root.appendChild(showGroup);

    root.appendChild(Object.assign(document.createElement('div'), { className: 'section-label', textContent: uiTr.behaviour }));
    const behavGroup = document.createElement('div'); behavGroup.className = 'settings-group';
    behavGroup.appendChild(mkShow(uiTr.dim_delivered,  'dim_delivered',  uiTr.dim_delivered_desc));
    behavGroup.appendChild(mkShow(uiTr.hide_when_empty,'hide_when_empty', uiTr.hide_when_empty_desc));
    root.appendChild(behavGroup);
  }

  // ── DOM helpers ───────────────────────────────────────────────────────────

  _mkToggleRow(label, checked, description, onChange, { disabled = false, disabledReason = null } = {}) {
    const row = document.createElement('div'); row.className = 'srow' + (disabled ? ' srow-disabled' : '');
    const tw  = document.createElement('div'); tw.className  = 'srow-text';
    tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-label', textContent: label }));
    const desc = disabled ? disabledReason : description;
    if (desc) tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-desc', textContent: desc }));
    const sw = document.createElement('ha-switch'); sw.checked = checked;
    if (disabled) sw.setAttribute('disabled', '');
    else sw.addEventListener('change', () => onChange(sw.checked));
    row.append(tw, sw);
    return row;
  }

  // Minimal single-field ha-form -- schema/data/computeLabel/hass wiring
  // only, no row/label wrapper. Every hand-rolled `ha-form` in this editor
  // (status/direction/layout selects, carrier multi-select, number rows)
  // repeated the same handful of lines to wire up a `{ name: 'v', selector }`
  // schema and its value-changed listener; this is the one place that does
  // it now. Callers that want the .srow/.srow-label treatment use
  // _mkFormRow (below) instead; callers that already render their own
  // surrounding layout (e.g. a bare dropdown directly under its own
  // section-label, full width, no separate per-row label) use this
  // directly. onChange only fires with a defined value -- a call site that
  // needs its own additional gating (e.g. "only save when non-empty") does
  // that inside its own onChange callback, same as before this helper
  // existed.
  _mkForm(selector, value, onChange, { disabled = false, width = null } = {}) {
    const form = document.createElement('ha-form');
    form.schema = [{ name: 'v', selector }];
    form.data = { v: value };
    form.computeLabel = () => '';
    form.disabled = disabled;
    if (width) form.style.cssText = `flex-shrink:0;width:${width};`;
    if (this._hass) form.hass = this._hass;
    if (!disabled) {
      form.addEventListener('value-changed', (e) => {
        const val = e.detail.value?.v;
        if (val !== undefined) onChange(val);
      });
    }
    return form;
  }

  // .srow/.srow-text/.srow-label/.srow-desc row wrapped around _mkForm --
  // ported from cover-media-card.js's own _mkFormRow, same shape this file
  // already uses for _mkToggleRow.
  _mkFormRow(label, selector, value, onChange, { description = null, disabled = false, disabledReason = null, width = '110px' } = {}) {
    const row = document.createElement('div'); row.className = 'srow' + (disabled ? ' srow-disabled' : '');
    const tw  = document.createElement('div'); tw.className  = 'srow-text';
    tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-label', textContent: label }));
    const desc = disabled ? disabledReason : description;
    if (desc) tw.appendChild(Object.assign(document.createElement('span'), { className: 'srow-desc', textContent: desc }));
    row.append(tw, this._mkForm(selector, value, onChange, { disabled, width }));
    return row;
  }

  _mkNumberRow(label, value, min, max, unit, description, onChange) {
    return this._mkFormRow(
      label,
      { number: {
        min: min ?? 0, max: max ?? 9999, step: 1,
        ...(unit ? { unit_of_measurement: unit } : {}),
        mode: 'box',
      } },
      value ?? 0,
      onChange,
      { description },
    );
  }
}

if (!customElements.get('package-tracker-card-editor')) {
  customElements.define('package-tracker-card-editor', PackageTrackerCardEditor);
}

window.customCards = window.customCards || [];
// Guarded like customElements.define above: a duplicate module load (HA
// resource cache-bust, dashboard resource re-added) would otherwise list
// this card twice in the card picker.
if (!window.customCards.some((c) => c.type === 'package-tracker-card')) {
  window.customCards.push({
    type: 'package-tracker-card', name: 'Package Tracker Card',
    description: 'Track packages from PostNL, Parcel, DHL NL, DPD, GLS, Dragonfly, and other ha-parcel-integrations family integrations.',
    preview: true,
    documentationURL: 'https://github.com/klaptafel/ha-package-tracker-card',
    version: CARD_VERSION,
    getEntitySuggestion: (hass, entityId) => {
      const attrs = hass.states[entityId]?.attributes;
      if (!attrs) return null;
      // Delegate to the same detection used by the Sources tab, so subset
      // sensors like awaiting_pickup/en_route_to_servicepoint are correctly
      // excluded here too, instead of duplicating ad-hoc detection logic.
      const type = detectTypeFromHass(entityId, hass);
      const def  = type && INTEGRATIONS[type];
      if (def && def.hasAttrs(attrs)) {
        return { config: { type: 'custom:package-tracker-card', sources: [{ type, entity: entityId }] } };
      }
      // Not a registry-known type -- still offer the card for any generic
      // ha-parcel-integrations family member (see canonicalSourceInfo), so a
      // brand-new carrier repo gets suggested here too with zero changes.
      if (canonicalSourceInfo(entityId, hass)) {
        return { config: { type: 'custom:package-tracker-card', sources: [{ entity: entityId }] } };
      }
      return null;
    },
  });
}
