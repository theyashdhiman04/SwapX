import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DollarSign, ArrowLeftRight, Wifi, TrendingUp, Users, Clock } from "lucide-react";
import { useRef } from "react";

const stats = [
  { 
    icon: DollarSign, 
    label: "Total Volume", 
    value: "$2.5B+",
    change: "+24.5%",
    iconColor: "text-green-500",
    description: "Cumulative trading volume"
  },
  { 
    icon: ArrowLeftRight, 
    label: "Transactions", 
    value: "1.2M+",
    change: "+18.2%",
    iconColor: "text-green-500",
    description: "Successful swaps completed"
  },
  { 
    icon: Wifi, 
    label: "Networks", 
    value: "6",
    change: "Active",
    iconColor: "text-green-500",
    description: "Supported blockchains"
  },
  { 
    icon: Users, 
    label: "Active Users", 
    value: "45K+",
    change: "+32.1%",
    iconColor: "text-green-500",
    description: "Monthly active traders"
  },
  { 
    icon: Clock, 
    label: "Avg Swap Time", 
    value: "<30s",
    change: "Fast",
    iconColor: "text-green-500",
    description: "Average transaction time"
  },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping:100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
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
      <div className="relative h-full bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-green-500/30 hover:shadow-lg">
        {/* Subtle hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4">
            <div className={`w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-green-500/30`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} strokeWidth={2} />
            </div>
          </div>
          
          {/* Value */}
          <div className="mb-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 font-display">
              {stat.value}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {stat.description}
            </p>
          </div>
          
          {/* Change */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
            {stat.change !== "Active" && stat.change !== "Fast" ? (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-medium text-green-500">
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">this month</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-green-500">
                  {stat.change}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium text-muted-foreground tracking-wider uppercase mb-4">
            Platform Statistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-display">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Real-time metrics showcasing our platform's performance and growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
