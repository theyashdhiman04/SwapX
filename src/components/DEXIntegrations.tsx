import { motion } from "framer-motion";
import { ExternalLink, Check } from "lucide-react";

const dexData = [
  {
    name: "Uniswap V3",
    description: "Concentrated liquidity AMM with enhanced capital efficiency",
    features: ["Concentrated Liquidity", "Multiple Fee Tiers", "NFT Positions"],
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M12.8 4.8c-.3 0-.5.1-.8.2-1.6.8-1.2 3.1-1 4.4.1.6.2 1.1.2 1.5 0 .3-.1.5-.3.6-.6.3-1.4-.2-2.2-.7-.5-.3-1-.6-1.5-.7-.4-.1-.8-.1-1.1.1-.5.3-.7.9-.5 1.5.1.4.4.8.7 1.2.5.6 1 1.2 1.1 1.9.1.5-.1 1-.5 1.3-.7.5-1.5.5-2.3.5h-.6c-.4 0-.7.1-1 .4-.3.3-.4.7-.3 1.1.1.6.6 1 1.2 1.2.8.3 1.7.4 2.4.8.5.3.9.7 1.1 1.2.3.8.2 1.7-.2 2.5-.3.5-.6 1-.8 1.5-.2.5-.2 1 .1 1.4.3.4.8.6 1.3.5.7-.1 1.3-.5 1.9-.9.9-.6 1.8-1.2 2.9-1.2.8 0 1.5.3 2.2.6.9.4 1.7.8 2.7.7.7-.1 1.4-.4 1.8-1 .3-.5.4-1.1.3-1.6-.2-.7-.7-1.2-1.1-1.7-.3-.3-.6-.7-.7-1.1-.2-.6.1-1.2.5-1.7.6-.7 1.4-1.2 2.1-1.7.5-.3.9-.7 1.2-1.1.4-.6.5-1.3.2-1.9-.2-.5-.7-.8-1.2-.9-.7-.1-1.4.1-2 .4-.9.4-1.8.9-2.8.9-.7 0-1.4-.2-2-.6-.8-.5-1.3-1.3-1.4-2.2-.1-.6 0-1.2.1-1.8.2-.8.4-1.7.2-2.5-.2-.6-.7-1.1-1.3-1.3-.3-.1-.6-.2-.9-.2zm7.1 7.9c.2 0 .4.1.5.3.2.3 0 .6-.2.9-.4.5-.9.8-1.4 1.2-.7.5-1.4 1-1.8 1.8-.3.6-.4 1.4 0 2 .2.4.6.7.9 1 .5.4 1 .9 1.1 1.5.1.4 0 .9-.3 1.2-.4.4-1 .5-1.5.4-.8-.2-1.5-.6-2.2-.9-.5-.2-1.1-.5-1.7-.5-.8 0-1.5.4-2.2.8-.5.3-1 .7-1.5.8-.4.1-.8 0-1-.3-.2-.3-.2-.7 0-1 .2-.5.5-.9.8-1.3.5-.7.9-1.5.8-2.4-.1-.6-.4-1.2-.9-1.6-.6-.5-1.4-.6-2.1-.8-.5-.1-.9-.4-1-.8-.1-.3.1-.6.4-.7.4-.2.8-.2 1.2-.2h.5c.9 0 2 0 2.9-.7.6-.5 1-1.2.8-2-.1-.9-.7-1.6-1.2-2.2-.2-.3-.5-.6-.5-.9 0-.2.1-.4.4-.5.3-.1.6-.1.9 0 .4.1.9.4 1.3.6.9.6 2 1.3 3 .8.4-.2.5-.6.5-.9 0-.5-.1-1-.2-1.5-.2-1.1-.5-2.8.6-3.3.6-.3 1.4.2 1.7.7.2.4.2.9.1 1.4-.1.5-.3 1-.3 1.5-.1 1.1.2 2.3 1.1 3 .7.5 1.5.8 2.4.7 1.2-.1 2.2-.7 3.2-1.2.5-.2 1-.4 1.5-.3.3 0 .6.2.7.5.1.4 0 .8-.3 1.1-.3.4-.7.6-1.1.9-.7.5-1.5 1-2.1 1.8-.3.4-.5.9-.4 1.4.1.3.3.5.5.8.4.5.9 1 1 1.7.1.4-.1.9-.5 1.1-.5.3-1.1.2-1.7-.1-.9-.4-1.7-.9-2.6-.8z"/>
      </svg>
    ),
  },
  {
    name: "SushiSwap",
    description: "Community-driven DEX with yield farming and lending",
    features: ["Multi-chain Support", "Yield Farming", "BentoBox Integration"],
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M28 14c0-1.1-.4-2.1-1.2-2.8L17.5 2.8c-.9-.7-2.1-.7-3 0L5.2 11.2C4.4 11.9 4 12.9 4 14v4c0 1.1.4 2.1 1.2 2.8l9.3 8.4c.9.7 2.1.7 3 0l9.3-8.4c.8-.7 1.2-1.7 1.2-2.8v-4zM16 24l-8-7.2V14l8-7.2 8 7.2v2.8L16 24z"/>
        <circle cx="12" cy="15" r="2"/>
        <circle cx="20" cy="15" r="2"/>
      </svg>
    ),
  },
  {
    name: "1inch",
    description: "DEX aggregator finding optimal swap routes across protocols",
    features: ["Route Optimization", "Gas Optimization", "Limit Orders"],
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-foreground">
        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 25c-6.1 0-11-4.9-11-11S9.9 5 16 5s11 4.9 11 11-4.9 11-11 11z"/>
        <path d="M17 9h-2v8h-4l5 6 5-6h-4z"/>
      </svg>
    ),
  },
];

const DEXIntegrations = () => {
  return (
    <section id="dex" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
            Integrations
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-display-md font-bold text-foreground mb-3 sm:mb-4">
            DEX Protocols
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base md:text-lg">
            We aggregate liquidity from the top decentralized exchanges to find you the best swap rates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {dexData.map((dex, index) => (
            <motion.div
              key={dex.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 card-hover"
            >
              {/* Logo & Name */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  {dex.logo}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-semibold text-foreground text-base sm:text-lg truncate">{dex.name}</h3>
                  <a 
                    href={
                      dex.name === "Uniswap V3" 
                        ? "https://docs.uniswap.org/" 
                        : dex.name === "SushiSwap"
                        ? "https://docs.sushi.com/"
                        : "https://docs.1inch.io/"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs text-primary flex items-center gap-1 hover:underline font-medium"
                  >
                    View Docs <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                {dex.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 sm:space-y-2.5">
                {dex.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-foreground">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    </div>
                    <span className="break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DEXIntegrations;
