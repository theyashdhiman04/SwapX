import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import TokenMarquee from "./TokenMarquee";
import { Check, Zap, ArrowRight, Clock } from "lucide-react";
import { useRef } from "react";

const networks = [
  { 
    name: "Ethereum", 
    abbr: "ETH",
    status: "Active",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
        <path d="M16 0L6 16l10 6 10-6L16 0zm0 24l-10-6 10 14 10-14-10 6z"/>
      </svg>
    ),
    tps: "~15 TPS",
    fee: "Variable"
  },
  { 
    name: "Polygon", 
    abbr: "POL",
    status: "Active",
    logo: (
      <svg viewBox="0 0 38 33" className="w-6 h-6 fill-current">
        <path d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V7c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5C.4 5.4 0 6.2 0 7v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1L29 29.2c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z"/>
      </svg>
    ),
    tps: "~7,000 TPS",
    fee: "< $0.01"
  },
  { 
    name: "Arbitrum", 
    abbr: "ARB",
    status: "Active",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm6.5 15.5l-1.5 1-5-8.5-5 8.5-1.5-1L12 5l6.5 10.5z"/>
      </svg>
    ),
    tps: "~4,000 TPS",
    fee: "< $0.10"
  },
  { 
    name: "Optimism", 
    abbr: "OP",
    status: "Active",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4" className="fill-card"/>
      </svg>
    ),
    tps: "~2,000 TPS",
    fee: "< $0.10"
  },
  { 
    name: "BSC", 
    abbr: "BNB",
    status: "Active",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
        <path d="M16 0l4 4-8 8-4-4 8-8zm8 8l4 4-12 12-4-4 12-12zm-16 0l4 4-4 4-4-4 4-4zm16 16l-4 4-8-8 4-4 8 8zm-8-4l4-4 4 4-4 4-4-4z"/>
      </svg>
    ),
    tps: "~160 TPS",
    fee: "< $0.20"
  },
  { 
    name: "Avalanche", 
    abbr: "AVAX",
    status: "Active",
    logo: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
        <path d="M20.5 22H26l-10-18-4 7.2L20.5 22zM6 22h7l3-5.4-3.5-6.3L6 22z"/>
      </svg>
    ),
    tps: "~4,500 TPS",
    fee: "< $0.10"
  },
];

const NetworkCard = ({ network, index }: { network: typeof networks[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

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
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative perspective-1000"
    >
      {/* Minimal Network Card */}
      <div className="relative h-full bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg cursor-pointer">
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-14 h-14 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-foreground mb-4 transition-all duration-300 group-hover:scale-110 group-hover:border-green-500/30">
            {network.logo}
          </div>
          
          {/* Name */}
          <h3 className="font-semibold text-foreground mb-1 text-sm group-hover:text-green-500 transition-colors">
            {network.name}
          </h3>
          
          {/* Abbreviation */}
          <p className="text-xs text-muted-foreground mb-3 font-mono">
            {network.abbr}
          </p>
          
          {/* Network Stats */}
          <div className="w-full space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Speed:</span>
              <span className="font-medium text-foreground">{network.tps}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Fee:</span>
              <span className="font-medium text-foreground">{network.fee}</span>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20 w-full justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-medium text-green-500 uppercase">
              {network.status}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SupportedNetworks = () => {
  return (
    <section id="networks" className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-green-500" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              Multi-Chain
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Supported Networks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Trade across multiple blockchain networks seamlessly with optimized gas fees and fast transactions.
          </p>
          
          {/* Network Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-green-500" />
              <span>Fast transactions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowRight className="w-4 h-4 text-green-500" />
              <span>Cross-chain support</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-green-500" />
              <span>Low gas fees</span>
            </div>
          </div>
        </motion.div>

        {/* Networks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {networks.map((network, index) => (
              <NetworkCard key={network.name} network={network} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Minimal Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 border border-border rounded-xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">All Networks Active</h4>
              <p className="text-sm text-muted-foreground">
                Swap tokens across all supported networks with automatic network detection and seamless cross-chain routing. Each network offers unique advantages in speed, cost, and ecosystem support.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Token Marquee */}
      <div className="mt-20 sm:mt-24 md:mt-28">
        <TokenMarquee />
      </div>
    </section>
  );
};

export default SupportedNetworks;
