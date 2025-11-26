import { motion } from "framer-motion";
import { RiskItem, getSeverityColor } from "@/data/riskData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskCardProps {
  risk: RiskItem;
  index: number;
}

const RiskCard = ({ risk, index }: RiskCardProps) => {
  const severityColorClass = getSeverityColor(risk.severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-elevated">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-muted-foreground">{risk.id}</span>
              <Badge variant="outline" className={`border-${severityColorClass} bg-${severityColorClass}/10 text-${severityColorClass}`}>
                {risk.severity}
              </Badge>
            </div>
            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {risk.title}
            </h4>
            <p className="text-sm text-muted-foreground">{risk.description}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border-2" 
              style={{ borderColor: `hsl(var(--${severityColorClass}))` }}>
              <span className="text-2xl font-bold" style={{ color: `hsl(var(--${severityColorClass}))` }}>
                {risk.score}
              </span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-0 left-0 h-1 w-full transition-all group-hover:h-2" 
          style={{ backgroundColor: `hsl(var(--${severityColorClass}))` }}
        />
      </Card>
    </motion.div>
  );
};

export default RiskCard;
