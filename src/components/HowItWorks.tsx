import { motion } from "framer-motion";
import { Wallet, Search, Zap, CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Web3 wallet using Ethers.js or Web3.js",
  },
  {
    icon: Search,
    title: "Query Rates",
    description: "Fetch real-time rates from multiple DEX protocols",
  },
  {
    icon: Zap,
    title: "Select Route",
    description: "Compare gas costs and choose optimal path",
  },
  {
    icon: CheckCircle,
    title: "Execute Swap",
    description: "Submit with automatic fallback protection",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 border-y border-border/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-display text-display-md font-bold text-foreground mb-4">
            Four simple steps
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Swap tokens at the best available rates across multiple DEXs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center relative z-10 card-hover h-full flex flex-col">
                {/* Step Number */}
                <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-7 sm:h-7 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-5 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-display font-semibold text-sm sm:text-base text-foreground mb-1.5 sm:mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
