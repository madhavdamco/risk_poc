export interface RiskItem {
  id: string;
  title: string;
  score: number;
  severity: "High" | "Medium-High" | "Medium" | "Medium-Low" | "Low";
  description: string;
  category: string;
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
    id: "cyber",
    name: "Cyber",
    icon: "Shield",
    dataSources: [
      { name: "CISA Alerts", url: "https://www.cisa.gov/news-events/cybersecurity-advisories" },
      { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
      { name: "Recorded Future", url: "https://www.recordedfuture.com/" },
    ],
    risks: [
      {
        id: "CYB-001",
        title: "Ransomware Spike",
        score: 82,
        severity: "High",
        description: "Increased ransomware activity across APAC.",
        category: "cyber",
      },
      {
        id: "CYB-002",
        title: "Zero-Day Exploits",
        score: 75,
        severity: "Medium-High",
        description: "Active exploitation trend observed.",
        category: "cyber",
      },
      {
        id: "CYB-003",
        title: "Phishing Exposure",
        score: 61,
        severity: "Medium",
        description: "High click-rate in phishing simulations.",
        category: "cyber",
      },
    ],
  },
  {
    id: "geopolitical",
    name: "Geopolitical",
    icon: "Globe",
    dataSources: [
      { name: "World Bank Data", url: "https://data.worldbank.org/" },
      { name: "Political Risk Map", url: "https://www.marsh.com/us/services/political-risk.html" },
      { name: "Crisis Group", url: "https://www.crisisgroup.org/" },
    ],
    risks: [
      {
        id: "GEO-101",
        title: "Border Tension",
        score: 68,
        severity: "Medium-High",
        description: "Military activity uptick.",
        category: "geopolitical",
      },
      {
        id: "GEO-102",
        title: "Sanctions Exposure",
        score: 54,
        severity: "Medium",
        description: "Dependency on restricted-region suppliers.",
        category: "geopolitical",
      },
    ],
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    icon: "Truck",
    dataSources: [
      { name: "Resilinc EventWatch", url: "https://www.resilinc.com/" },
      { name: "Supply Chain Dive", url: "https://www.supplychaindive.com/" },
      { name: "Freightos Baltic Index", url: "https://fbx.freightos.com/" },
    ],
    risks: [
      {
        id: "SC-301",
        title: "Vendor Delivery Delays",
        score: 48,
        severity: "Medium-Low",
        description: "Delays in Tier-2 suppliers.",
        category: "supply-chain",
      },
      {
        id: "SC-302",
        title: "Logistics Bottleneck",
        score: 39,
        severity: "Low",
        description: "Port clearing improving.",
        category: "supply-chain",
      },
    ],
  },
  {
    id: "financial",
    name: "Financial",
    icon: "DollarSign",
    dataSources: [
      { name: "Bloomberg Terminal", url: "https://www.bloomberg.com/professional/solution/bloomberg-terminal/" },
      { name: "S&P Global Market Intelligence", url: "https://www.spglobal.com/marketintelligence/" },
      { name: "Moody's Analytics", url: "https://www.moodysanalytics.com/" },
    ],
    risks: [
      {
        id: "FIN-401",
        title: "FX Volatility",
        score: 57,
        severity: "Medium",
        description: "Currency fluctuations in key markets.",
        category: "financial",
      },
      {
        id: "FIN-402",
        title: "Credit Exposure",
        score: 45,
        severity: "Medium-Low",
        description: "Higher receivable days.",
        category: "financial",
      },
    ],
  },
  {
    id: "operational",
    name: "Operational",
    icon: "Settings",
    dataSources: [
      { name: "ISO Standards", url: "https://www.iso.org/" },
      { name: "Operational Risk Data Exchange", url: "https://www.oric-int.org/" },
      { name: "ERM Framework", url: "https://www.coso.org/guidance-erm" },
    ],
    risks: [
      {
        id: "OPS-501",
        title: "Resource Shortage",
        score: 50,
        severity: "Medium",
        description: "Temporary staffing gaps.",
        category: "operational",
      },
      {
        id: "OPS-502",
        title: "Process Compliance",
        score: 35,
        severity: "Low",
        description: "Compliance metrics stable.",
        category: "operational",
      },
    ],
  },
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
