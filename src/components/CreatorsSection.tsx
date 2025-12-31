import { motion } from "framer-motion";

const CreatorsSection = () => {
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
          <span className="text-sm text-muted-foreground">Created by</span>
        </motion.div>

        {/* Creators Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <CreatorCard 
            name="Dennis"
            surname="Snellenberg"
            image="https://cdn.prod.website-files.com/68a5787bba0829184628bd51/69062d3c13631c36fae52957_dennis-cutout-new.avif"
          />
          <CreatorCard 
            name="Ilja"
            surname="van Eck"
            image="https://cdn.prod.website-files.com/68a5787bba0829184628bd51/69062d3c6394038237051d34_ilja-cutout-new.avif"
          />
        </div>

        {/* About Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-12"
        >
          <button className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-osmo-purple transition-colors">
            About us
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const CreatorCard = ({ name, surname, image }: { name: string; surname: string; image: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <div className="bg-card rounded-3xl p-6 border border-osmo-border overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-osmo-light-gray flex-shrink-0">
          <img 
            src={image} 
            alt={`${name} ${surname}`}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
          <p className="text-lg text-muted-foreground">{surname}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default CreatorsSection;
