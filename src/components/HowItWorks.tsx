import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Wallet, Search, Zap, CheckCircle, ArrowRight, Lock, BarChart3, Rocket } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Securely link your Web3 wallet using MetaMask or any compatible wallet provider",
    number: "01",
    tips: "Supports MetaMask, WalletConnect, and more"
  },
  {
    icon: Search,
    title: "Query Rates",
    description: "Instantly fetch real-time rates from multiple DEX protocols simultaneously",
    number: "02",
    tips: "Compare rates across all integrated DEXs"
  },
  {
    icon: Zap,
    title: "Select Route",
    description: "Compare gas costs, slippage, and choose the optimal swap path",
    number: "03",
    tips: "Automatic route optimization included"
  },
  {
    icon: CheckCircle,
    title: "Execute Swap",
    description: "Submit your transaction with automatic fallback protection and route optimization",
    number: "04",
    tips: "Secure and fast transaction execution"
  },
];

const features = [
  { icon: Lock, text: "Non-custodial swaps" },
  { icon: BarChart3, text: "Real-time price comparison" },
  { icon: Rocket, text: "Optimized gas usage" },
];

const StepCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

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
      {/* Step Number Badge - Desktop */}
      <div className="hidden lg:flex absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-green-500 text-white items-center justify-center text-base font-bold border-4 border-background shadow-lg z-20">
        {step.number}
      </div>

      {/* Step Number Badge - Mobile */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 lg:hidden">
        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold border-4 border-background shadow-lg">
          {index + 1}
        </div>
      </div>

      {/* Minimal Card */}
      <div className="relative h-full bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg">
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-xl bg-muted/50 border border-border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-green-500/30 mx-auto lg:mx-0">
            <step.icon className="w-8 h-8 text-green-500" strokeWidth={2} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 font-display group-hover:text-green-500 transition-colors duration-300">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Tips */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/70 italic">
              {step.tips}
            </p>
          </div>

          {/* Arrow - Mobile */}
          {index < steps.length - 1 && (
            <div className="lg:hidden flex justify-center mt-6">
              <ArrowRight className="w-5 h-5 text-green-500 rotate-90" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4 px-4 py-2 rounded-full bg-muted/50 border border-border">
            Process
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg mb-8">
            Swap tokens at the best available rates across multiple DEXs in just four simple steps.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <feature.icon className="w-4 h-4 text-green-500" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-green-500 to-green-500/30" style={{ width: '75%', left: '12.5%' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
