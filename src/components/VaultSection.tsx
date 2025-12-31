import { motion } from "framer-motion";

const VaultSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm text-muted-foreground block mb-4">The platform</span>
          <h2 className="text-display-md font-semibold text-foreground">
            ( The Vault )
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built by two award-winning creative developers, our vault gives you access to the techniques, components, code, and tools behind our projects. Build, tweak, and make them your own.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-osmo-xl border border-osmo-border">
            <img 
              src="https://osmo.b-cdn.net/website/features/dashboard-overview-2880x1800.jpg"
              alt="Osmo Vault Dashboard Preview"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-foreground italic">
            We built Osmo to help creative developers work smarter, faster, and better.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-foreground hover:text-osmo-purple transition-colors group"
          >
            About the Vault
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VaultSection;
