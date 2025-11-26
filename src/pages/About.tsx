import { motion } from "framer-motion";
import { Shield, Database, Zap, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Comprehensive Risk Coverage",
      description: "Monitor cyber, geopolitical, supply chain, financial, and operational risks in one unified platform.",
    },
    {
      icon: Database,
      title: "Multi-Source Intelligence",
      description: "Aggregates data from industry-leading sources including CISA, NIST, World Bank, and more.",
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description: "Simulated risk modeling with instant scoring and severity classification for rapid decision-making.",
    },
    {
      icon: TrendingUp,
      title: "Actionable Insights",
      description: "Clear risk metrics and export capabilities to integrate seamlessly with your risk management workflow.",
    },
  ];

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            About RiskSense
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A proof-of-concept enterprise risk intelligence platform built for Redington
          </p>
        </div>

        <Card className="p-8 md:p-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Platform Overview</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  RiskSense is a demonstration platform designed to showcase advanced risk assessment capabilities
                  for enterprise clients. This proof-of-concept integrates multiple risk domains into a single,
                  unified dashboard for comprehensive risk intelligence.
                </p>
                <p>
                  The platform simulates real-world risk analysis by aggregating data from trusted industry sources
                  and applying sophisticated scoring algorithms to identify, categorize, and prioritize potential
                  threats across your organization.
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Demo Limitations</h3>
              <p className="text-muted-foreground">
                This is a prototype application with hard-coded sample data for demonstration purposes.
                In a production environment, this platform would integrate with live data feeds, machine learning
                models, and enterprise risk management systems.
              </p>
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-semibold text-center text-foreground mb-8">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-elevated transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="border-primary/50 bg-primary/5 p-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Built for Redington</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This demonstration showcases how RiskSense can provide comprehensive, actionable risk intelligence
              to support strategic decision-making and enhance organizational resilience.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default About;
