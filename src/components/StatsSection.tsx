import { motion } from "framer-motion";
import { DollarSign, ArrowLeftRight, Wifi } from "lucide-react";

const stats = [
  { icon: DollarSign, label: "VOLUME", value: "$2.5B+" },
  { icon: ArrowLeftRight, label: "TRANSACTIONS", value: "1.2M+" },
  { icon: Wifi, label: "NETWORKS", value: "6" },
];

const StatsSection = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium tracking-wider">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-display font-bold text-foreground truncate">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
