import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
  const [isTeam, setIsTeam] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"quarterly" | "annually">("annually");

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setIsTeam(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              !isTeam 
                ? "bg-osmo-dark text-white" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            For Individuals
          </button>
          <button
            onClick={() => setIsTeam(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              isTeam 
                ? "bg-osmo-dark text-white" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            For Teams
          </button>
          {isTeam && (
            <span className="flex items-center gap-1 text-sm text-osmo-purple font-medium">
              Save 20% <span className="text-muted-foreground">per user</span>
            </span>
          )}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display-md font-semibold text-foreground">
            Pricing for {isTeam ? "Teams" : "Individuals"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits you best.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        {!isTeam ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Member Plan */}
            <PricingCard
              title="Member"
              price={billingCycle === "annually" ? "€20" : "€25"}
              originalPrice={billingCycle === "annually" ? "€25" : undefined}
              period="per month"
              badge="our base plan"
              description="Perfect if you're looking to level up your dev game without any long-term commitments."
              buttonText="Become a member"
              features={["138 Vault resources, and always growing"]}
              billingCycle={billingCycle}
              onBillingChange={setBillingCycle}
              index={0}
            />

            {/* Lifetime Plan */}
            <PricingCard
              title="Lifetime"
              price="€599"
              period="one time"
              badge="Bonus: a copy of this website"
              description="Join once, stay part of the community forever. All future resources and updates included."
              buttonText="Become a Lifetime member"
              features={["138 Vault resources, and always growing"]}
              highlight
              highlightBadge="Pay Once, Use Forever"
              index={1}
            />
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {/* Team Plan */}
            <PricingCard
              title="Team"
              price={billingCycle === "annually" ? "€16" : "€20"}
              originalPrice={billingCycle === "annually" ? "€20" : undefined}
              period="per month, per user"
              description="Empower your whole team with personal accounts and access everything Osmo has to offer."
              buttonText="Sign up your team"
              features={["2 Minimum of users included", "138 Vault Resources"]}
              billingCycle={billingCycle}
              onBillingChange={setBillingCycle}
              index={0}
            />
          </div>
        )}

        {/* View Full Pricing Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-osmo-purple transition-colors group"
          >
            View full pricing
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  period: string;
  badge?: string;
  description: string;
  buttonText: string;
  features: string[];
  highlight?: boolean;
  highlightBadge?: string;
  billingCycle?: "quarterly" | "annually";
  onBillingChange?: (cycle: "quarterly" | "annually") => void;
  index: number;
}

const PricingCard = ({ 
  title, 
  price, 
  originalPrice, 
  period, 
  badge, 
  description, 
  buttonText, 
  features,
  highlight,
  highlightBadge,
  billingCycle,
  onBillingChange,
  index
}: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`relative bg-card rounded-3xl border ${highlight ? 'border-osmo-purple' : 'border-osmo-border'} p-8`}
  >
    {highlightBadge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-osmo-purple text-white text-xs font-medium px-4 py-1 rounded-full">
        {highlightBadge}
      </div>
    )}

    <div className="text-xs text-muted-foreground mb-4">One user</div>
    <h3 className="text-2xl font-semibold text-foreground mb-4">{title}</h3>
    
    <div className="flex items-baseline gap-2 mb-2">
      {originalPrice && (
        <span className="text-xl text-muted-foreground line-through">{originalPrice} EUR</span>
      )}
      <span className="text-4xl font-bold text-foreground">{price}</span>
      <span className="text-muted-foreground">EUR</span>
    </div>
    <p className="text-sm text-muted-foreground mb-4">{period}</p>

    {billingCycle && onBillingChange && (
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => onBillingChange("quarterly")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            billingCycle === "quarterly" 
              ? "bg-osmo-dark text-white" 
              : "bg-muted text-muted-foreground"
          }`}
        >
          Quarterly
        </button>
        <button
          onClick={() => onBillingChange("annually")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            billingCycle === "annually" 
              ? "bg-osmo-dark text-white" 
              : "bg-muted text-muted-foreground"
          }`}
        >
          Annually
        </button>
      </div>
    )}

    {badge && (
      <div className="mb-6">
        <span className="text-xs text-osmo-purple font-medium">{badge}</span>
      </div>
    )}

    <p className="text-sm text-muted-foreground mb-6">{description}</p>

    <button className="w-full bg-osmo-dark text-white py-3 px-6 rounded-full font-medium hover:bg-osmo-dark/90 transition-colors mb-6">
      {buttonText}
    </button>

    <div className="border-t border-osmo-border pt-6">
      <span className="text-sm font-medium text-foreground block mb-4">Benefits:</span>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-osmo-lime mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a 
        href="#" 
        className="inline-block mt-4 text-sm font-medium text-foreground hover:text-osmo-purple transition-colors"
      >
        View all benefits
      </a>
    </div>
  </motion.div>
);

export default PricingSection;
