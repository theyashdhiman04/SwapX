import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Check, ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { useRef } from "react";

const dexData = [
  {
    name: "Uniswap V3",
    description: "Concentrated liquidity AMM with enhanced capital efficiency and multiple fee tiers",
    features: ["Concentrated Liquidity", "Multiple Fee Tiers", "NFT Positions"],
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current">
        <path d="M12.8 4.8c-.3 0-.5.1-.8.2-1.6.8-1.2 3.1-1 4.4.1.6.2 1.1.2 1.5 0 .3-.1.5-.3.6-.6.3-1.4-.2-2.2-.7-.5-.3-1-.6-1.5-.7-.4-.1-.8-.1-1.1.1-.5.3-.7.9-.5 1.5.1.4.4.8.7 1.2.5.6 1 1.2 1.1 1.9.1.5-.1 1-.5 1.3-.7.5-1.5.5-2.3.5h-.6c-.4 0-.7.1-1 .4-.3.3-.4.7-.3 1.1.1.6.6 1 1.2 1.2.8.3 1.7.4 2.4.8.5.3.9.7 1.1 1.2.3.8.2 1.7-.2 2.5-.3.5-.6 1-.8 1.5-.2.5-.2 1 .1 1.4.3.4.8.6 1.3.5.7-.1 1.3-.5 1.9-.9.9-.6 1.8-1.2 2.9-1.2.8 0 1.5.3 2.2.6.9.4 1.7.8 2.7.7.7-.1 1.4-.4 1.8-1 .3-.5.4-1.1.3-1.6-.2-.7-.7-1.2-1.1-1.7-.3-.3-.6-.7-.7-1.1-.2-.6.1-1.2.5-1.7.6-.7 1.4-1.2 2.1-1.7.5-.3.9-.7 1.2-1.1.4-.6.5-1.3.2-1.9-.2-.5-.7-.8-1.2-.9-.7-.1-1.4.1-2 .4-.9.4-1.8.9-2.8.9-.7 0-1.4-.2-2-.6-.8-.5-1.3-1.3-1.4-2.2-.1-.6 0-1.2.1-1.8.2-.8.4-1.7.2-2.5-.2-.6-.7-1.1-1.3-1.3-.3-.1-.6-.2-.9-.2zm7.1 7.9c.2 0 .4.1.5.3.2.3 0 .6-.2.9-.4.5-.9.8-1.4 1.2-.7.5-1.4 1-1.8 1.8-.3.6-.4 1.4 0 2 .2.4.6.7.9 1 .5.4 1 .9 1.1 1.5.1.4 0 .9-.3 1.2-.4.4-1 .5-1.5.4-.8-.2-1.5-.6-2.2-.9-.5-.2-1.1-.5-1.7-.5-.8 0-1.5.4-2.2.8-.5.3-1 .7-1.5.8-.4.1-.8 0-1-.3-.2-.3-.2-.7 0-1 .2-.5.5-.9.8-1.3.5-.7.9-1.5.8-2.4-.1-.6-.4-1.2-.9-1.6-.6-.5-1.4-.6-2.1-.8-.5-.1-.9-.4-1-.8-.1-.3.1-.6.4-.7.4-.2.8-.2 1.2-.2h.5c.9 0 2 0 2.9-.7.6-.5 1-1.2.8-2-.1-.9-.7-1.6-1.2-2.2-.2-.3-.5-.6-.5-.9 0-.2.1-.4.4-.5.3-.1.6-.1.9 0 .4.1.9.4 1.3.6.9.6 2 1.3 3 .8.4-.2.5-.6.5-.9 0-.5-.1-1-.2-1.5-.2-1.1-.5-2.8.6-3.3.6-.3 1.4.2 1.7.7.2.4.2.9.1 1.4-.1.5-.3 1-.3 1.5-.1 1.1.2 2.3 1.1 3 .7.5 1.5.8 2.4.7 1.2-.1 2.2-.7 3.2-1.2.5-.2 1-.4 1.5-.3.3 0 .6.2.7.5.1.4 0 .8-.3 1.1-.3.4-.7.6-1.1.9-.7.5-1.5 1-2.1 1.8-.3.4-.5.9-.4 1.4.1.3.3.5.5.8.4.5.9 1 1 1.7.1.4-.1.9-.5 1.1-.5.3-1.1.2-1.7-.1-.9-.4-1.7-.9-2.6-.8z"/>
      </svg>
    ),
    link: "https://docs.uniswap.org/",
    stats: "Largest liquidity pool"
  },
  {
    name: "SushiSwap",
    description: "Community-driven DEX with yield farming, lending, and multi-chain support",
    features: ["Multi-chain Support", "Yield Farming", "BentoBox Integration"],
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current">
        <path d="M28 14c0-1.1-.4-2.1-1.2-2.8L17.5 2.8c-.9-.7-2.1-.7-3 0L5.2 11.2C4.4 11.9 4 12.9 4 14v4c0 1.1.4 2.1 1.2 2.8l9.3 8.4c.9.7 2.1.7 3 0l9.3-8.4c.8-.7 1.2-1.7 1.2-2.8v-4zM16 24l-8-7.2V14l8-7.2 8 7.2v2.8L16 24z"/>
        <circle cx="12" cy="15" r="2"/>
        <circle cx="20" cy="15" r="2"/>
      </svg>
    ),
    link: "https://docs.sushi.com/",
    stats: "Best yield opportunities"
  },
  {
    name: "1inch",
    description: "Advanced DEX aggregator finding optimal swap routes with gas optimization",
    features: ["Route Optimization", "Gas Optimization", "Limit Orders"],
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current">
        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm0 25c-6.1 0-11-4.9-11-11S9.9 5 16 5s11 4.9 11 11-4.9 11-11 11z"/>
        <path d="M17 9h-2v8h-4l5 6 5-6h-4z"/>
      </svg>
    ),
    link: "https://docs.1inch.io/",
    stats: "Lowest gas fees"
  },
];

const benefits = [
  { icon: Zap, text: "Instant swaps across protocols" },
  { icon: Shield, text: "Secure and audited smart contracts" },
  { icon: TrendingUp, text: "Best rates guaranteed" },
];

const DEXCard = ({ dex, index }: { dex: typeof dexData[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative perspective-1000"
    >
      {/* Minimal Card */}
      <div className="relative h-full bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-green-500/30 hover:shadow-lg">
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <div className="relative z-10">
          {/* Logo & Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-foreground transition-all duration-300 group-hover:scale-110 group-hover:border-green-500/30">
              {dex.logo}
            </div>
            <motion.a
              href={dex.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-green-500 hover:border-green-500/30 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground mb-2 font-display group-hover:text-green-500 transition-colors duration-300">
            {dex.name}
          </h3>

          {/* Stats Badge */}
          <div className="mb-4">
            <span className="inline-block text-xs px-2 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20">
              {dex.stats}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
            {dex.description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {dex.features.map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-md bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-green-500" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Learn More Link */}
          <a
            href={dex.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-500 hover:gap-3 transition-all duration-300 group/link"
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const DEXIntegrations = () => {
  return (
    <section id="dex" className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              DEX Protocols
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Integrated Exchanges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            We aggregate liquidity from the top decentralized exchanges to find you the best swap rates across multiple protocols.
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <benefit.icon className="w-4 h-4 text-green-500" />
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {dexData.map((dex, index) => (
            <DEXCard key={dex.name} dex={dex} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DEXIntegrations;
