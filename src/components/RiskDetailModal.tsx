import { motion } from "framer-motion";
import { X, AlertCircle, Clock, TrendingUp, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import { RiskItem, getSeverityColor, riskCategories } from "@/data/riskData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RiskDetailModalProps {
  risk: RiskItem | null;
  isOpen: boolean;
  onClose: () => void;
  allRisks: RiskItem[];
}

const RiskDetailModal = ({ risk, isOpen, onClose, allRisks }: RiskDetailModalProps) => {
  if (!risk) return null;

  const severityColorClass = getSeverityColor(risk.severity);
  
  // Find related risks
  const relatedRiskItems = risk.relatedRisks
    ?.map((riskId) => allRisks.find((r) => r.id === riskId))
    .filter((r): r is RiskItem => r !== undefined) || [];

  // Get category info
  const category = riskCategories.find((cat) => cat.id === risk.category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="relative">
            {/* Header with gradient */}
            <div 
              className="relative overflow-hidden px-8 py-8 text-white"
              style={{ 
                background: `linear-gradient(135deg, hsl(var(--${severityColorClass})) 0%, hsl(var(--${severityColorClass}) / 0.8) 100%)`
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono opacity-90">{risk.id}</span>
                      <Badge 
                        variant="secondary" 
                        className="border-white/30 bg-white/20 text-white hover:bg-white/30"
                      >
                        {risk.severity}
                      </Badge>
                      {category && (
                        <Badge 
                          variant="outline" 
                          className="border-white/30 bg-white/10 text-white"
                        >
                          {category.name}
                        </Badge>
                      )}
                    </div>
                    <DialogTitle className="text-3xl font-bold text-white">
                      {risk.title}
                    </DialogTitle>
                    <p className="text-lg text-white/90">{risk.description}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur">
                      <span className="text-3xl font-bold">{risk.score}</span>
                      <span className="text-xs opacity-90">Score</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="space-y-6 p-8">
              {/* Key Metrics Grid */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-severity-high/10">
                      <AlertCircle className="h-5 w-5 text-severity-high" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Impact</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{risk.impact || "Not specified"}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-severity-medium-high/10">
                      <TrendingUp className="h-5 w-5 text-severity-medium-high" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Likelihood</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{risk.likelihood || "Not specified"}</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Timeframe</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{risk.timeframe || "Not specified"}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Detailed Description */}
              {risk.detailedDescription && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Detailed Analysis</h3>
                  </div>
                  <Card className="border-l-4 p-6" style={{ borderColor: `hsl(var(--${severityColorClass}))` }}>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {risk.detailedDescription}
                    </p>
                  </Card>
                </div>
              )}

              {/* Recommended Actions */}
              {risk.recommendedActions && risk.recommendedActions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Recommended Actions</h3>
                  </div>
                  <Card className="p-6">
                    <ul className="space-y-3">
                      {risk.recommendedActions.map((action, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {index + 1}
                          </div>
                          <p className="flex-1 text-sm text-foreground">{action}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}

              {/* Related Risks */}
              {relatedRiskItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Related Risks</h3>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {relatedRiskItems.map((relatedRisk) => {
                      const relatedSeverityColor = getSeverityColor(relatedRisk.severity);
                      return (
                        <Card key={relatedRisk.id} className="p-4 transition-all hover:shadow-elevated">
                          <div className="flex items-start gap-3">
                            <div 
                              className="mt-1 h-2 w-2 shrink-0 rounded-full"
                              style={{ backgroundColor: `hsl(var(--${relatedSeverityColor}))` }}
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-muted-foreground">{relatedRisk.id}</span>
                                <span className="text-xs font-semibold" style={{ color: `hsl(var(--${relatedSeverityColor}))` }}>
                                  {relatedRisk.score}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-foreground">{relatedRisk.title}</p>
                              <p className="text-xs text-muted-foreground">{relatedRisk.description}</p>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Footer Metadata */}
              {risk.lastUpdated && (
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: {new Date(risk.lastUpdated).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RiskDetailModal;
