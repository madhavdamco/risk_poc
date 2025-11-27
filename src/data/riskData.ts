export interface RiskItem {
  id: string;
  title: string;
  score: number;
  severity: "High" | "Medium-High" | "Medium" | "Medium-Low" | "Low";
  description: string;
  category: string;
  detailedDescription?: string;
  recommendedActions?: string[];
  relatedRisks?: string[];
  impact?: string;
  likelihood?: string;
  timeframe?: string;
  lastUpdated?: string;
}

export interface DataSource {
  name: string;
  url: string;
}

export interface RiskCategory {
  id: string;
  name: string;
  icon: string;
  dataSources: DataSource[];
  risks: RiskItem[];
}

export const riskCategories: RiskCategory[] = [
  {
    "id": "cyber",
    "name": "Cyber",
    "icon": "Shield",
    "dataSources": [
      { "name": "AlienVault OTX", "url": "https://otx.alienvault.com/" },
      { "name": "CISA Advisories", "url": "https://www.cisa.gov/news-events/cybersecurity-advisories" },
      { "name": "NVD (CVE)", "url": "https://nvd.nist.gov/" }
    ],
    "risks": [
      {
        "id": "CYB-001",
        "title": "Ransomware Activity Targeting MEA Logistics & Vendors",
        "score": 85,
        "severity": "High",
        "description": "Ransomware campaigns and IOCs observed that target logistics providers and vendor portals in the Middle East and Africa.",
        "category": "cyber",
        "detailedDescription": "Threat feeds show rising ransomware activity (targeting supply-chain services and regional logistics vendors). Compromise of a logistics partner could disrupt Redington's deliveries and create downstream operational outages or data exposure.",
        "recommendedActions": [
          "Verify EDR is deployed on vendor-facing systems",
          "Require MDR/monitoring for critical vendors",
          "Run tabletop exercises with logistics & ops teams",
          "Enforce multi-factor authentication for vendor portals"
        ],
        "relatedRisks": ["CYB-002", "SC-PoC-001"],
        "impact": "High – Operational disruption and potential data loss affecting distribution.",
        "likelihood": "Medium-High",
        "timeframe": "Immediate – 30 days",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "CYB-002",
        "title": "Critical CVE Affecting Popular Server/Networking Firmware",
        "score": 78,
        "severity": "Medium-High",
        "description": "New high-severity CVEs published that impact firmware/management interfaces used by vendors.",
        "category": "cyber",
        "detailedDescription": "NVD/CISA advisory items report vulnerabilities in widely deployed enterprise server and networking firmware. These pose a supply-chain risk if OEMs recall affected SKUs or delay shipments pending patches.",
        "recommendedActions": [
          "Track CVEs for SKUs in distribution catalogue",
          "Hold vendor readiness calls for patch schedules",
          "Temporarily quarantine affected SKUs in inventory if advised"
        ],
        "relatedRisks": ["CYB-001", "SC-PoC-008"],
        "impact": "High – Security exposure and potential vendor remediation affecting stock flow.",
        "likelihood": "Medium",
        "timeframe": "Near-term – 30–60 days",
        "lastUpdated": "2025-11-26"
      },
      {
        "id": "CYB-003",
        "title": "Phishing Campaigns Targeting Distributor Finance Teams",
        "score": 62,
        "severity": "Medium",
        "description": "Targeted credential harvesting / invoice fraud attempts seen in regional feeds.",
        "category": "cyber",
        "detailedDescription": "Abuse and OTX indicators show phishing campaigns impersonating suppliers and finance contacts to capture payments or credentials. These increase risk of fraudulent payments and vendor-account takeovers.",
        "recommendedActions": [
          "Tighten payment approval workflows",
          "Educate finance teams on vendor impersonation signs",
          "Use payable verification (two-person check) for high-value transfers"
        ],
        "relatedRisks": ["FIN-401"],
        "impact": "Medium – Financial loss and reputational risk.",
        "likelihood": "High",
        "timeframe": "Ongoing",
        "lastUpdated": "2025-11-25"
      }
    ]
  },
  {
    "id": "geopolitical",
    "name": "Geopolitical",
    "icon": "Globe",
    "dataSources": [
      { "name": "Reuters", "url": "https://www.reuters.com/" },
      { "name": "Al Jazeera", "url": "https://www.aljazeera.com/" },
      { "name": "Crisis Group", "url": "https://www.crisisgroup.org/" }
    ],
    "risks": [
      {
        "id": "GEO-101",
        "title": "Red Sea Security Tension Causing Route Avoidance",
        "score": 90,
        "severity": "High",
        "description": "Naval incidents and militant attacks have previously forced carriers to reroute; ongoing instability creates shipping unpredictability.",
        "category": "geopolitical",
        "detailedDescription": "Recent maritime security incidents in the Red Sea/Bab al-Mandab corridor have prompted major carriers to reroute vessels or temporarily pause transits, extending lead times and raising freight premiums. This directly affects MEA inbound schedules and inventory planning for distributors.",
        "recommendedActions": [
          "Activate alternative routing playbook (Cape of Good Hope options)",
          "Communicate revised ETAs to regional warehouses and partners",
          "Prioritize critical SKUs for air-lift where economically justified"
        ],
        "relatedRisks": ["SC-PoC-001", "SC-PoC-003"],
        "impact": "High – Multi-day to multi-week delays, higher costs.",
        "likelihood": "High",
        "timeframe": "Immediate",
        "lastUpdated": "2025-11-25"
      },
      {
        "id": "GEO-102",
        "title": "Regional Trade Policy Change / Tariff Risk",
        "score": 60,
        "severity": "Medium-High",
        "description": "Sudden regulatory or tariff shifts in target markets can affect landed costs and customs clearance.",
        "category": "geopolitical",
        "detailedDescription": "Government policy shifts—tariffs, import verification, or sudden certification requirements—are being reported across African and Middle East jurisdictions. These changes may require contract updates, reclassification of HS codes, and lead to customs holdups.",
        "recommendedActions": [
          "Monitor regulatory feeds and pre-validate HS codes",
          "Engage customs brokers for accelerated clearances",
          "Keep legal/compliance on standby for contract updates"
        ],
        "relatedRisks": ["SC-PoC-005", "FIN-401"],
        "impact": "Medium-High – Increased compliance cost and clearance delays.",
        "likelihood": "Medium",
        "timeframe": "Near-term",
        "lastUpdated": "2025-11-24"
      },
      {
        "id": "GEO-103",
        "title": "Sanctions / Export Control Exposure",
        "score": 55,
        "severity": "Medium",
        "description": "Dependency on suppliers or routes subject to export controls could create compliance and sourcing issues.",
        "category": "geopolitical",
        "detailedDescription": "Shifts in international sanctions or export control regimes can abruptly remove suppliers or shipping options from the supply chain, requiring rapid substitution and compliance checks.",
        "recommendedActions": [
          "Run sanctions screening on supplier list",
          "Map alternate compliant suppliers",
          "Add sanctions clauses to vendor contracts"
        ],
        "relatedRisks": ["FIN-401", "SC-PoC-008"],
        "impact": "Medium – Potential supplier loss and legal exposure.",
        "likelihood": "Medium",
        "timeframe": "60–120 days",
        "lastUpdated": "2025-11-22"
      }
    ]
  },
  {
    "id": "supply-chain",
    "name": "Supply Chain & Logistics",
    "icon": "Truck",
    "dataSources": [
      { "name": "Reuters Maritime", "url": "https://www.reuters.com/world/middle-east/" },
      { "name": "TradeArabia Logistics", "url": "https://www.tradearabia.com/rss/TRA-logistics.xml" },
      { "name": "Al Jazeera Middle East", "url": "https://www.aljazeera.com/xml/rss/all.xml" },
      { "name": "BBC Africa", "url": "https://feeds.bbci.co.uk/news/world/africa/rss.xml" },
      { "name": "Google News - Red Sea", "url": "https://news.google.com/rss/search?q=red+sea+shipping+disruption" }
    ],
    "risks": [
      {
        "id": "SC-PoC-001",
        "title": "Red Sea Shipping Rerouting Causing 10–20 Day Delays",
        "score": 92,
        "severity": "High",
        "description": "Global carriers reroute via Cape of Good Hope due to Red Sea security risks.",
        "category": "supply-chain",
        "detailedDescription": "Multiple carriers announced route diversions and temporary pauses for Red Sea transits following security incidents; rerouting adds 10–20 days on typical MEA inbound journeys and creates schedule volatility for inventory replenishment.",
        "recommendedActions": [
          "Increase buffer stock levels for high-velocity SKUs",
          "Identify alternate ports of entry (Salalah, Sohar, Djibouti)",
          "Engage freight forwarders for priority booking",
          "Notify partners of revised lead-time expectations"
        ],
        "relatedRisks": ["SC-PoC-002", "SC-PoC-003"],
        "impact": "High – Disrupted inbound flow; stockouts possible.",
        "likelihood": "High",
        "timeframe": "Immediate",
        "lastUpdated": "2025-11-25"
      },
      {
        "id": "SC-PoC-002",
        "title": "Jebel Ali Port Congestion Increasing Container Dwell Times",
        "score": 84,
        "severity": "High",
        "description": "Congestion and rollover events reported at Jebel Ali terminal.",
        "category": "supply-chain",
        "detailedDescription": "Regional logistics reports indicate yard space constraints and vessel bunching at Jebel Ali, increasing container dwell time and demurrage exposure for goods destined to UAE distribution hubs.",
        "recommendedActions": [
          "Pre-advise shipping lines to minimize container rollover",
          "Use alternate free zones temporarily",
          "Prioritize customs documentation accuracy",
          "Evaluate unloading via Port Khalifa as fallback"
        ],
        "relatedRisks": ["SC-PoC-001"],
        "impact": "High – Slower inbound processing and higher demurrage.",
        "likelihood": "Medium-High",
        "timeframe": "30–45 days",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "SC-PoC-003",
        "title": "Freight Rate Surge on Asia → Middle East Routes",
        "score": 77,
        "severity": "Medium-High",
        "description": "Container prices increasing due to rerouting and capacity shifts.",
        "category": "supply-chain",
        "detailedDescription": "Market indexes and carrier notices show surcharges and war-risk premiums on Asia→GCC lanes. This inflates landed costs and reduces margin on thin-margin SKUs.",
        "recommendedActions": [
          "Renegotiate rate contracts for next quarter",
          "Consider partial air freight for priority SKUs",
          "Pass temporary surcharges to channel partners where contractually possible"
        ],
        "relatedRisks": ["SC-PoC-001"],
        "impact": "Medium-High – Cost inflation and margin pressure.",
        "likelihood": "High",
        "timeframe": "Current quarter",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "SC-PoC-004",
        "title": "East Africa Currency Instability Impacting Import Viability",
        "score": 71,
        "severity": "Medium-High",
        "description": "Volatility in local currencies increases partner credit risk.",
        "category": "supply-chain",
        "detailedDescription": "Rapid depreciation in currencies like the Kenyan Shilling and Naira can reduce purchasing power of distributors and raise default risk, affecting order flows and receivables for Redington in African markets.",
        "recommendedActions": [
          "Tighten credit controls and prepayment for high-risk accounts",
          "Work with local finance teams on FX hedging options",
          "Monitor partner liquidity metrics closely"
        ],
        "relatedRisks": ["FIN-401"],
        "impact": "Medium-High – Reduced order volume and payment delays.",
        "likelihood": "High",
        "timeframe": "30–90 days",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "SC-PoC-005",
        "title": "Import Verification Rules Delaying Electronics Clearance in Kenya",
        "score": 66,
        "severity": "Medium-High",
        "description": "Enhanced customs verification and documentation requirements slow clearance.",
        "category": "supply-chain",
        "detailedDescription": "Regulatory updates increase inspection rates and documentation checks for electronics imports, causing multi-day delays on selected SKUs unless pre-cleared or pre-documented.",
        "recommendedActions": [
          "Pre-validate HS codes and compliance documents for shipments",
          "Work with customs brokers to secure priority clearance",
          "Engage suppliers to provide consolidated documentation"
        ],
        "relatedRisks": ["SC-PoC-004"],
        "impact": "Medium – Delays at port and inventory disruptions.",
        "likelihood": "Medium-High",
        "timeframe": "Ongoing",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "SC-PoC-006",
        "title": "Severe Weather Disrupting Arabian Sea Shipping Routes",
        "score": 58,
        "severity": "Medium",
        "description": "Storms and cyclonic conditions force schedule adjustments.",
        "category": "supply-chain",
        "detailedDescription": "Seasonal storms in the Arabian Sea and adjacent lanes create temporary schedule unreliability and occasional rerouting that increases transit times for India→GCC shipments.",
        "recommendedActions": [
          "Track weather advisories for impacted routes",
          "Stagger shipments and increase buffers during storm windows",
          "Split shipments sea/air where necessary for critical lines"
        ],
        "relatedRisks": ["SC-PoC-001"],
        "impact": "Medium – Short-term delays for affected consignments.",
        "likelihood": "Medium",
        "timeframe": "2–4 weeks",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "SC-PoC-007",
        "title": "Port Worker Strikes Affecting East African Gateways",
        "score": 52,
        "severity": "Medium",
        "description": "Labor unrest at Mombasa and regional ports causes unloading slowdowns.",
        "category": "supply-chain",
        "detailedDescription": "Intermittent strikes and industrial actions at East African ports create temporary backlogs and slower customs processing, directly affecting in-country replenishment cycles for distributors.",
        "recommendedActions": [
          "Identify inland depot alternatives",
          "Adjust ETAs and inform sales teams",
          "Plan staggered imports to reduce spike vulnerability"
        ],
        "relatedRisks": ["SC-PoC-004"],
        "impact": "Medium – Slower replenishment and possible stockouts.",
        "likelihood": "Medium",
        "timeframe": "Near-term",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "SC-PoC-008",
        "title": "Semiconductor Lead-Time Extension Affecting Device Availability",
        "score": 47,
        "severity": "Medium",
        "description": "Lead times for certain chips lengthen, increasing risk for laptop and networking device supply.",
        "category": "supply-chain",
        "detailedDescription": "OEM reports and industry trackers indicate extended lead times for selected semiconductor families, which may delay assembly or hamper availability of certain laptop and networking SKUs.",
        "recommendedActions": [
          "Place forecasts and POs earlier for impacted SKUs",
          "Build alternative supplier lists",
          "Consider inventory buffering for high-demand models"
        ],
        "relatedRisks": ["CYB-002"],
        "impact": "Medium – Product availability pressure and delayed fulfilment.",
        "likelihood": "Medium",
        "timeframe": "Next quarter",
        "lastUpdated": "2025-11-27"
      }
    ]
  },
  {
    "id": "financial",
    "name": "Financial",
    "icon": "DollarSign",
    "dataSources": [
      { "name": "Reuters Business", "url": "https://www.reuters.com/finance" },
      { "name": "FXStreet", "url": "https://www.fxstreet.com/" },
      { "name": "Business Daily Africa", "url": "https://www.businessdailyafrica.com/" }
    ],
    "risks": [
      {
        "id": "FIN-401",
        "title": "FX Volatility in African Markets",
        "score": 74,
        "severity": "Medium-High",
        "description": "Sharp currency movements create margin and receivables risk.",
        "category": "financial",
        "detailedDescription": "Local currency depreciation in key African markets (Kenya, Nigeria) increases cost pressures and exposes Redington to receivables risk and margin compression when prices are set in foreign currency.",
        "recommendedActions": [
          "Hedge key exposures where cost-effective",
          "Introduce currency-adjusted pricing for local contracts",
          "Monitor receivables and tighten credit for at-risk accounts"
        ],
        "relatedRisks": ["SC-PoC-004"],
        "impact": "Medium-High – Margin erosion and collection risk.",
        "likelihood": "High",
        "timeframe": "Immediate to 90 days",
        "lastUpdated": "2025-11-27"
      },
      {
        "id": "FIN-402",
        "title": "Credit Exposure from Distributor Partners",
        "score": 56,
        "severity": "Medium",
        "description": "DSO increasing and partner liquidity strain observed.",
        "category": "financial",
        "detailedDescription": "Extended payment cycles and elevated receivable days in certain markets point to growing credit exposure, especially in markets experiencing macro stress.",
        "recommendedActions": [
          "Tighten credit acceptances and increase monitoring",
          "Use credit insurance or factoring for select partners",
          "Apply stricter payment terms for higher-risk geographies"
        ],
        "relatedRisks": ["SC-PoC-004"],
        "impact": "Medium – Working capital pressure.",
        "likelihood": "Medium",
        "timeframe": "30–90 days",
        "lastUpdated": "2025-11-24"
      },
      {
        "id": "FIN-403",
        "title": "Rising Logistics Costs Impacting Gross Margins",
        "score": 61,
        "severity": "Medium-High",
        "description": "Freight and surcharge increases reducing net margins on international shipments.",
        "category": "financial",
        "detailedDescription": "Surcharges and increased freight rates across certain lanes are directly increasing landed cost on distributed goods, squeezing margins on thin-ticket lines unless pricing is adjusted.",
        "recommendedActions": [
          "Review commercial terms and introduce fuel/surcharge clauses",
          "Run product-by-product margin re-assessment",
          "Negotiate long-term rates where volume supports"
        ],
        "relatedRisks": ["SC-PoC-003"],
        "impact": "Medium-High – Profitability pressure.",
        "likelihood": "High",
        "timeframe": "Current quarter",
        "lastUpdated": "2025-11-27"
      }
    ]
  },
  {
    "id": "operational",
    "name": "Operational",
    "icon": "Settings",
    "dataSources": [
      { "name": "BBC Business", "url": "https://feeds.bbci.co.uk/news/business/rss.xml" },
      { "name": "Safety4Sea", "url": "https://safety4sea.com/feed/" },
      { "name": "Local Port Notices (scraped) ", "url": "https://www.iss-shipping.com/latest-news/" }
    ],
    "risks": [
      {
        "id": "OPS-501",
        "title": "Resource Shortages & Staffing Gaps in Key Hubs",
        "score": 58,
        "severity": "Medium",
        "description": "Temporary staffing shortages in warehouses and logistics partners affecting throughput.",
        "category": "operational",
        "detailedDescription": "Recruitment and retention pressures among logistics partners and local warehouses cause intermittent throughput drops and slower order turnarounds in key hubs (UAE, Kenya).",
        "recommendedActions": [
          "Establish contingency staffing contracts",
          "Cross-train warehouse teams for surge periods",
          "Deploy temporary staffing via trusted vendors when needed"
        ],
        "relatedRisks": ["SC-PoC-002"],
        "impact": "Medium – Slower fulfilment and potential service-level misses.",
        "likelihood": "Medium",
        "timeframe": "30–90 days",
        "lastUpdated": "2025-11-26"
      },
      {
        "id": "OPS-502",
        "title": "Process & Documentation Errors Causing Customs Holds",
        "score": 46,
        "severity": "Medium-Low",
        "description": "Incorrect HS codes or missing documentation triggering customs holds.",
        "category": "operational",
        "detailedDescription": "Operational errors in export documentation or mis-declared HS codes result in Customs holding shipments for inspection, delaying clearance and increasing rework costs.",
        "recommendedActions": [
          "Standardize document checklists for key SKU families",
          "Train commercial teams on HS code mapping",
          "Implement automated document validation prior to shipment"
        ],
        "relatedRisks": ["SC-PoC-005"],
        "impact": "Medium-Low – Tactical delays and rework costs.",
        "likelihood": "Medium",
        "timeframe": "Ongoing",
        "lastUpdated": "2025-11-23"
      },
      {
        "id": "OPS-503",
        "title": "Third-Party Logistics (3PL) Capacity Shortages",
        "score": 50,
        "severity": "Medium",
        "description": "3PL partners reporting limited capacity during peak rerouting periods.",
        "category": "operational",
        "detailedDescription": "Capacity constraints among 3PLs caused by rerouting and surge demand reduce flexibility for urgent shipments and hamper contingency fulfilment plans.",
        "recommendedActions": [
          "Pre-contract capacity with 2+ 3PLs per region",
          "Implement priority allocation for critical SKUs",
          "Monitor 3PL performance metrics weekly"
        ],
        "relatedRisks": ["SC-PoC-001", "SC-PoC-003"],
        "impact": "Medium – Reduced contingency options for urgent orders.",
        "likelihood": "Medium",
        "timeframe": "Near-term",
        "lastUpdated": "2025-11-24"
      }
    ]
  }
];

export const getSeverityFromScore = (score: number): RiskItem["severity"] => {
  if (score >= 75) return "High";
  if (score >= 60) return "Medium-High";
  if (score >= 45) return "Medium";
  if (score >= 30) return "Medium-Low";
  return "Low";
};

export const getSeverityColor = (severity: RiskItem["severity"]): string => {
  switch (severity) {
    case "High":
      return "severity-high";
    case "Medium-High":
      return "severity-medium-high";
    case "Medium":
      return "severity-medium";
    case "Medium-Low":
      return "severity-medium-low";
    case "Low":
      return "severity-low";
    default:
      return "muted";
  }
};
