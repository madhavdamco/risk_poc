import { ChevronDown, ExternalLink } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { RiskCategory } from "@/data/riskData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface CategoryAccordionProps {
  category: RiskCategory;
  isSelected: boolean;
  onToggleSelect: () => void;
}

const CategoryAccordion = ({ category, isSelected, onToggleSelect }: CategoryAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Circle;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-elevated">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div 
            className={`flex items-center justify-between p-6 transition-colors ${
              isSelected ? "bg-secondary" : "hover:bg-muted/50"
            }`}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('.select-checkbox')) {
                e.stopPropagation();
                onToggleSelect();
              }
            }}
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.risks.length} risk{category.risks.length !== 1 ? "s" : ""} • {category.dataSources.length} source{category.dataSources.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect();
                }}
                className="select-checkbox flex h-5 w-5 items-center justify-center rounded border-2 transition-colors hover:border-primary"
                style={{
                  borderColor: isSelected ? "hsl(var(--primary))" : "hsl(var(--border))",
                  backgroundColor: isSelected ? "hsl(var(--primary))" : "transparent",
                }}
              >
                {isSelected && (
                  <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t bg-muted/30 p-6">
            <h4 className="mb-3 text-sm font-semibold text-foreground">Data Sources:</h4>
            <div className="space-y-2">
              {category.dataSources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-accent"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{source.name}</span>
                </a>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CategoryAccordion;
