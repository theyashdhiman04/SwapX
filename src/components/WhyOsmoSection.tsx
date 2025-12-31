import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WhyOsmoSection = () => {
  const benefits = [
    {
      title: "Build faster and better",
      description: "Our resources save you hours of rebuilding from scratch. Each one is made for real-world projects, so you can focus on shipping work that stands out."
    },
    {
      title: "Speed up your process",
      description: "These aren't stripped-down templates. Every resource is built to be fast, flexible, and production-ready, so you can ship beautiful work without trading quality for time."
    },
    {
      title: "A living and growing system",
      description: "We keep adding new resources, ideas, and techniques every week. The Vault evolves with you and your needs, so your toolkit never stops expanding."
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground block mb-4">Why Osmo?</span>
          <h2 className="text-display-sm font-semibold text-foreground">
            Level up your game and join a community of creatives who love building great websites as much as you do.
          </h2>
        </motion.div>

        {/* Benefits */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-osmo-border"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-osmo-lime flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-osmo-dark" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOsmoSection;
