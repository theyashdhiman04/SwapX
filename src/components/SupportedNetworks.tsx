import { motion } from "framer-motion";
import TokenMarquee from "./TokenMarquee";

const networks = [
  { 
    name: "Ethereum", 
    abbr: "ETH",
    logo: (
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-foreground">
        <path d="M16 0L6 16l10 6 10-6L16 0zm0 24l-10-6 10 14 10-14-10 6z"/>
      </svg>
    )
  },
  { 
    name: "Polygon", 
    abbr: "POL",
    logo: (
      <svg viewBox="0 0 38 33" className="w-5 h-5 fill-foreground">
        <path d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V7c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5C.4 5.4 0 6.2 0 7v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1L29 29.2c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z"/>
      </svg>
    )
  },
  { 
    name: "Arbitrum", 
    abbr: "ARB",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground">
        <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm6.5 15.5l-1.5 1-5-8.5-5 8.5-1.5-1L12 5l6.5 10.5z"/>
      </svg>
    )
  },
  { 
    name: "Optimism", 
    abbr: "OP",
    logo: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4" className="fill-card"/>
      </svg>
    )
  },
  { 
    name: "BSC", 
    abbr: "BNB",
    logo: (
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-foreground">
        <path d="M16 0l4 4-8 8-4-4 8-8zm8 8l4 4-12 12-4-4 12-12zm-16 0l4 4-4 4-4-4 4-4zm16 16l-4 4-8-8 4-4 8 8zm-8-4l4-4 4 4-4 4-4-4z"/>
      </svg>
    )
  },
  { 
    name: "Avalanche", 
    abbr: "AVAX",
    logo: (
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-foreground">
        <path d="M20.5 22H26l-10-18-4 7.2L20.5 22zM6 22h7l3-5.4-3.5-6.3L6 22z"/>
      </svg>
    )
  },
];

const SupportedNetworks = () => {
  return (
    <section id="networks" className="py-16 sm:py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
            Multi-Chain
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-display-md font-bold text-foreground mb-3 sm:mb-4">
            Supported Networks
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base md:text-lg">
            Trade across multiple blockchain networks seamlessly.
          </p>
        </motion.div>

        {/* Networks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {networks.map((network, index) => (
              <motion.div
                key={network.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 sm:gap-3 bg-card border border-border rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 hover:border-primary/30 transition-colors card-hover cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {network.logo}
                </div>
                <span className="font-medium text-foreground">{network.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Token Marquee */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <TokenMarquee />
      </div>
    </section>
  );
};

export default SupportedNetworks;