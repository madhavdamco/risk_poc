import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Play } from "lucide-react";
import CategoryAccordion from "@/components/CategoryAccordion";
import { riskCategories } from "@/data/riskData";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Overview = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAnalyze = () => {
    navigate("/analyze", { 
      state: { 
        selectedCategories: selectedCategories.length > 0 ? selectedCategories : "all" 
      } 
    });
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Enterprise Risk Intelligence
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive risk assessment across multiple domains with real-time data integration
          </p>
        </div>

        <Alert className="border-primary/50 bg-primary/5">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertDescription className="text-sm">
            Select specific categories to analyze individually, or click "Analyze All Risks" to assess all categories at once.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Risk Categories</h2>
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear selection ({selectedCategories.length})
              </button>
            )}
          </div>

          <div className="grid gap-4">
            {riskCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryAccordion
                  category={category}
                  isSelected={selectedCategories.includes(category.id)}
                  onToggleSelect={() => toggleCategory(category.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-8"
        >
          <Button
            size="lg"
            onClick={handleAnalyze}
            className="gap-2 px-8 shadow-elevated hover:shadow-lg transition-all"
          >
            <Play className="h-5 w-5" />
            {selectedCategories.length > 0
              ? `Analyze ${selectedCategories.length} Selected ${selectedCategories.length === 1 ? "Category" : "Categories"}`
              : "Analyze All Risks"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Overview;
