import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpDown, Download, Info } from "lucide-react";
import { riskCategories, RiskItem } from "@/data/riskData";
import RiskCard from "@/components/RiskCard";
import RiskDetailModal from "@/components/RiskDetailModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategories = location.state?.selectedCategories || "all";
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [allRisks, setAllRisks] = useState<RiskItem[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    let risks: RiskItem[] = [];
    if (selectedCategories === "all") {
      risks = riskCategories.flatMap((cat) => cat.risks);
    } else {
      const categories = riskCategories.filter((cat) => selectedCategories.includes(cat.id));
      risks = categories.flatMap((cat) => cat.risks);
    }

    setAllRisks(risks);
  }, [location.state, navigate, selectedCategories]);

  const sortedRisks = [...allRisks].sort((a, b) => {
    return sortOrder === "desc" ? b.score - a.score : a.score - b.score;
  });

  const categorizedRisks = riskCategories
    .filter((cat) => selectedCategories === "all" || selectedCategories.includes(cat.id))
    .map((category) => ({
      category,
      risks: sortedRisks.filter((risk) => risk.category === category.id),
    }))
    .filter((item) => item.risks.length > 0);

  const handleExport = () => {
    const csvContent = [
      ["Risk ID", "Category", "Title", "Score", "Severity", "Description"],
      ...sortedRisks.map((risk) => [
        risk.id,
        risk.category,
        risk.title,
        risk.score.toString(),
        risk.severity,
        risk.description,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `risk-assessment-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const avgScore = Math.round(allRisks.reduce((sum, risk) => sum + risk.score, 0) / allRisks.length);
  const highRisks = allRisks.filter((r) => r.score >= 75).length;

  const handleRiskClick = (risk: RiskItem) => {
    setSelectedRisk(risk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRisk(null), 300);
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Risk Assessment Results</h1>
            <p className="mt-2 text-muted-foreground">
              {selectedCategories === "all"
                ? `Analyzed ${allRisks.length} risks across all categories`
                : `Analyzed ${allRisks.length} risks in selected categories`}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
              New Analysis
            </Button>
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Risks</p>
              <p className="text-3xl font-bold text-foreground">{allRisks.length}</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">High Severity</p>
              <p className="text-3xl font-bold text-severity-high">{highRisks}</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Score</p>
              <p className="text-3xl font-bold text-primary">{avgScore}</p>
            </div>
          </Card>
        </div>

        <Alert>
          <Info className="h-5 w-5" />
          <AlertDescription>
            <strong>Severity Thresholds:</strong> High (75+) • Medium-High (60-74) • Medium (45-59) • Medium-Low (30-44) • Low (0-29)
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Risk Items</h2>
          <Select value={sortOrder} onValueChange={(value: "desc" | "asc") => setSortOrder(value)}>
            <SelectTrigger className="w-[200px]">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Score: High to Low</SelectItem>
              <SelectItem value="asc">Score: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-12">
          {categorizedRisks.map(({ category, risks }) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 rounded-full bg-primary" />
                <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                <span className="text-sm text-muted-foreground">({risks.length})</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {risks.map((risk, index) => (
                  <RiskCard 
                    key={risk.id} 
                    risk={risk} 
                    index={index} 
                    onClick={() => handleRiskClick(risk)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <RiskDetailModal
          risk={selectedRisk}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          allRisks={allRisks}
        />
      </motion.div>
    </div>
  );
};

export default Results;
