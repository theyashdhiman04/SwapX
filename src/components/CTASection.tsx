import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-osmo-dark text-white overflow-hidden">
      {/* Marquee */}
      <div className="relative mb-16">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span className="text-display-lg font-semibold italic text-white/20">Built to Flex</span>
              <img 
                src="https://cdn.prod.website-files.com/68a5787bba0829184628bd51/68bc85817b0ee00c1f41f7e6_female-dev-subject.avif" 
                alt=""
                className="w-24 h-24 rounded-2xl object-cover opacity-50"
              />
            </div>
          ))}
          {Array(6).fill(null).map((_, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-8 mx-8">
              <span className="text-display-lg font-semibold italic text-white/20">Built to Flex</span>
              <img 
                src="https://cdn.prod.website-files.com/68a5787bba0829184628bd51/68bc85817b0ee00c1f41f7e6_female-dev-subject.avif" 
                alt=""
                className="w-24 h-24 rounded-2xl object-cover opacity-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Content */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex -space-x-3">
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6905435ab5963a649d02237a_pf-victorwork-v2.avif" 
              alt="Member"
              className="w-12 h-12 rounded-full border-2 border-osmo-dark object-cover"
            />
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfce422bf821391f97cac2_pf-jordangilroy.avif" 
              alt="Member"
              className="w-12 h-12 rounded-full border-2 border-osmo-dark object-cover"
            />
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfd2b7c1ed2019c733180f_pf-somefolk.avif" 
              alt="Member"
              className="w-12 h-12 rounded-full border-2 border-osmo-dark object-cover"
            />
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfc7ee6488aa2af0781d1b_pf-huy.avif" 
              alt="Member"
              className="w-12 h-12 rounded-full border-2 border-osmo-dark object-cover"
            />
          </div>
          <span className="ml-4 text-sm text-white/60 self-center">Join 1.6K+ others</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-display-sm font-semibold mb-4"
        >
          Ready to level up?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 mb-8"
        >
          Become a member to unlock the full Osmo toolkit today.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-osmo-lime text-osmo-dark px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity group"
          >
            Become a member
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-colors"
          >
            FAQs
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
