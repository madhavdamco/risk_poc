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
        detailedDescription: "A significant uptick in ransomware attacks has been detected across the Asia-Pacific region, with threat actors targeting critical infrastructure, healthcare, and financial services. Multiple variants including LockBit 3.0 and BlackCat have been observed in recent campaigns. Organizations without adequate backup systems and incident response plans face elevated risk of operational disruption.",
        recommendedActions: [
          "Implement comprehensive offline backup strategy with 3-2-1 rule",
          "Deploy endpoint detection and response (EDR) solutions across all systems",
          "Conduct organization-wide security awareness training on ransomware indicators",
          "Review and test incident response playbooks quarterly",
          "Enable multi-factor authentication for all remote access points"
        ],
        relatedRisks: ["CYB-002", "CYB-003"],
        impact: "Critical - Potential for complete operational shutdown and data loss",
        likelihood: "High - Active campaigns targeting similar organizations",
        timeframe: "Immediate - Within 30 days",
        lastUpdated: "2025-11-24"
      },
      {
        id: "CYB-002",
        title: "Zero-Day Exploits",
        score: 75,
        severity: "Medium-High",
        description: "Active exploitation trend observed.",
        category: "cyber",
        detailedDescription: "Intelligence sources report active exploitation of previously unknown vulnerabilities in widely-used enterprise software. Threat actors are leveraging these zero-day exploits before patches become available, creating windows of vulnerability. Affected systems include VPN appliances, collaboration tools, and network management software.",
        recommendedActions: [
          "Subscribe to threat intelligence feeds for early warning",
          "Implement network segmentation to limit lateral movement",
          "Deploy virtual patching through Web Application Firewalls",
          "Establish emergency patch management procedures",
          "Monitor for suspicious outbound connections and data exfiltration"
        ],
        relatedRisks: ["CYB-001", "OPS-501"],
        impact: "High - Unauthorized access and potential data breach",
        likelihood: "Medium-High - Active exploitation in the wild",
        timeframe: "Near-term - Within 60 days",
        lastUpdated: "2025-11-23"
      },
      {
        id: "CYB-003",
        title: "Phishing Exposure",
        score: 61,
        severity: "Medium",
        description: "High click-rate in phishing simulations.",
        category: "cyber",
        detailedDescription: "Internal phishing simulations reveal concerning click-through rates on malicious links and attachments. Employees across multiple departments demonstrated susceptibility to social engineering tactics, particularly spear-phishing campaigns that impersonate executives or trusted vendors. This exposure creates pathways for credential theft and malware deployment.",
        recommendedActions: [
          "Launch targeted security awareness campaign with role-based training",
          "Implement email filtering with advanced threat protection",
          "Deploy browser isolation technology for suspicious links",
          "Establish clear reporting procedures for suspicious emails",
          "Conduct monthly micro-training sessions and simulated phishing tests"
        ],
        relatedRisks: ["CYB-001", "FIN-402"],
        impact: "Medium - Credential compromise and potential account takeover",
        likelihood: "High - Ongoing phishing campaigns targeting industry",
        timeframe: "Ongoing - Continuous exposure",
        lastUpdated: "2025-11-25"
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
        detailedDescription: "Escalating military activities in key operational regions pose risks to supply chain stability and personnel safety. Increased border patrols, airspace restrictions, and maritime tensions may disrupt logistics networks. Regional partners have reported delays in customs clearance and heightened security screening procedures.",
        recommendedActions: [
          "Diversify supplier base across multiple geographic regions",
          "Establish alternative logistics routes and contingency plans",
          "Monitor real-time geopolitical intelligence feeds",
          "Review travel policies and employee safety protocols",
          "Increase safety stock levels for critical components"
        ],
        relatedRisks: ["SC-301", "GEO-102"],
        impact: "High - Supply chain disruption and operational delays",
        likelihood: "Medium - Situation remains fluid",
        timeframe: "Medium-term - 90-180 days",
        lastUpdated: "2025-11-22"
      },
      {
        id: "GEO-102",
        title: "Sanctions Exposure",
        score: 54,
        severity: "Medium",
        description: "Dependency on restricted-region suppliers.",
        category: "geopolitical",
        detailedDescription: "Current supply chain analysis reveals dependencies on suppliers in regions subject to international sanctions. Changes in sanctions regimes could result in immediate loss of critical suppliers, requiring rapid sourcing alternatives. Compliance risks exist for transactions involving sanctioned entities.",
        recommendedActions: [
          "Conduct comprehensive supply chain mapping and sanctions screening",
          "Identify and qualify alternative suppliers in compliant regions",
          "Implement sanctions compliance monitoring systems",
          "Review contract terms for force majeure provisions",
          "Engage legal counsel for sanctions compliance advisory"
        ],
        relatedRisks: ["SC-301", "FIN-401"],
        impact: "Medium-High - Regulatory penalties and sourcing disruption",
        likelihood: "Medium - Policy changes possible",
        timeframe: "Near-term - Within 60 days",
        lastUpdated: "2025-11-21"
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
        detailedDescription: "Secondary suppliers are experiencing production delays due to labor shortages and raw material constraints. Average lead times have increased by 15-20% over the past quarter. While Tier-1 suppliers maintain buffer inventory, prolonged Tier-2 delays could cascade through the supply chain.",
        recommendedActions: [
          "Increase communication frequency with Tier-2 suppliers",
          "Negotiate buffer stock agreements with key suppliers",
          "Evaluate dual-sourcing options for critical components",
          "Implement supplier performance scorecards and early warning metrics",
          "Consider strategic inventory positioning closer to production facilities"
        ],
        relatedRisks: ["SC-302", "GEO-101"],
        impact: "Medium - Production delays and inventory shortages",
        likelihood: "Medium - Industry-wide supply constraints",
        timeframe: "Near-term - 60-90 days",
        lastUpdated: "2025-11-20"
      },
      {
        id: "SC-302",
        title: "Logistics Bottleneck",
        score: 39,
        severity: "Low",
        description: "Port clearing improving.",
        category: "supply-chain",
        detailedDescription: "Port congestion metrics show improvement with clearing times returning to near-normal levels. However, capacity constraints remain in certain key shipping lanes. Container availability has stabilized, though rates remain elevated compared to pre-disruption baselines.",
        recommendedActions: [
          "Continue monitoring port performance metrics and shipping schedules",
          "Maintain relationships with multiple freight forwarders",
          "Lock in favorable shipping contracts during current improvement window",
          "Review inventory strategies to reduce dependency on just-in-time delivery",
          "Consider nearshoring options for time-sensitive components"
        ],
        relatedRisks: ["SC-301", "FIN-401"],
        impact: "Low-Medium - Moderate shipping delays and cost increases",
        likelihood: "Low - Situation improving",
        timeframe: "Stable - Monitoring phase",
        lastUpdated: "2025-11-19"
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
        detailedDescription: "Foreign exchange volatility in key operating markets is creating margin pressure and forecasting uncertainty. Currency movements have exceeded historical volatility ranges, particularly in emerging markets where significant operations are located. Unhedged exposure could result in material P&L impacts.",
        recommendedActions: [
          "Implement comprehensive FX hedging strategy for material exposures",
          "Review pricing mechanisms to include currency adjustment clauses",
          "Centralize treasury operations for better visibility and control",
          "Conduct monthly FX exposure analysis and stress testing",
          "Consider natural hedging through local currency operations"
        ],
        relatedRisks: ["GEO-102", "SC-302"],
        impact: "Medium - Margin compression and earnings volatility",
        likelihood: "High - Ongoing market volatility",
        timeframe: "Immediate - Active exposure",
        lastUpdated: "2025-11-24"
      },
      {
        id: "FIN-402",
        title: "Credit Exposure",
        score: 45,
        severity: "Medium-Low",
        description: "Higher receivable days.",
        category: "financial",
        detailedDescription: "Days sales outstanding (DSO) have increased by 12% over the past quarter as certain customer segments extend payment terms. While within acceptable ranges, this trend impacts working capital and increases credit risk exposure. Some customers in stressed industries show early warning signs of financial distress.",
        recommendedActions: [
          "Enhance customer credit monitoring and early warning systems",
          "Implement more aggressive collections procedures for aged receivables",
          "Review and tighten credit terms for high-risk customer segments",
          "Consider receivables financing or factoring for working capital optimization",
          "Establish credit insurance for large exposures"
        ],
        relatedRisks: ["CYB-003", "OPS-502"],
        impact: "Medium-Low - Working capital pressure and potential bad debts",
        likelihood: "Medium - Economic uncertainty affecting customers",
        timeframe: "Near-term - 60-90 days",
        lastUpdated: "2025-11-23"
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
        detailedDescription: "Ongoing challenges in recruiting and retaining skilled technical staff have created temporary capability gaps in critical functions. Attrition rates in specialized roles are above target, and time-to-fill positions has extended. This impacts project delivery timelines and increases dependency on key individuals.",
        recommendedActions: [
          "Accelerate recruiting efforts with enhanced employer branding",
          "Implement succession planning for critical roles",
          "Develop knowledge transfer and cross-training programs",
          "Review compensation packages to ensure market competitiveness",
          "Consider contract resources or managed services for short-term gaps"
        ],
        relatedRisks: ["CYB-002", "OPS-502"],
        impact: "Medium - Project delays and knowledge concentration risks",
        likelihood: "Medium - Tight labor market conditions",
        timeframe: "Near-term - 90 days",
        lastUpdated: "2025-11-22"
      },
      {
        id: "OPS-502",
        title: "Process Compliance",
        score: 35,
        severity: "Low",
        description: "Compliance metrics stable.",
        category: "operational",
        detailedDescription: "Process compliance indicators remain within acceptable ranges across all monitored areas. Internal audits show consistent adherence to established procedures, and control effectiveness testing demonstrates adequate design and operation. Minor findings from recent audits have been addressed.",
        recommendedActions: [
          "Continue regular compliance monitoring and reporting",
          "Maintain training programs for process updates and changes",
          "Schedule periodic process reviews for optimization opportunities",
          "Document and share best practices across business units",
          "Plan for upcoming regulatory changes proactively"
        ],
        relatedRisks: ["FIN-402", "OPS-501"],
        impact: "Low - Well-controlled operational processes",
        likelihood: "Low - Strong compliance culture",
        timeframe: "Stable - Business as usual",
        lastUpdated: "2025-11-21"
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
