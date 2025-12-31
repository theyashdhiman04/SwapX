import { motion } from "framer-motion";
import { Play } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Description */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm text-foreground leading-relaxed"
        >
          Osmo is an ever-growing platform with Webflow & HTML resources. Get exclusive access to the elements, techniques and code behind award-winning work.
        </motion.h2>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 relative"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-osmo-dark shadow-osmo-xl cursor-pointer group">
            <img 
              src="https://osmo.b-cdn.net/website/features/dashboard-overview-2880x1800.jpg"
              alt="Osmo Vault Dashboard"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 shadow-osmo-lg group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-osmo-dark fill-current" />
              </div>
            </div>

            {/* Corner Labels */}
            <div className="absolute top-4 left-4 bg-osmo-dark/80 backdrop-blur px-3 py-1.5 rounded-full">
              <span className="text-white text-xs font-medium">Osmo in use</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-osmo-dark/80 backdrop-blur px-3 py-1.5 rounded-full">
              <span className="text-white text-xs font-medium">00:48</span>
            </div>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -top-4 -right-4 w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-dashed border-osmo-purple/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <span className="text-xs text-muted-foreground text-center leading-tight">
              See what<br />it can do!
            </span>
          </div>
        </motion.div>

        {/* Creator Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-3">
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6905435ab5963a649d02237a_pf-victorwork-v2.avif" 
              alt="Member"
              className="w-10 h-10 rounded-full border-2 border-background object-cover"
            />
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfce422bf821391f97cac2_pf-jordangilroy.avif" 
              alt="Member"
              className="w-10 h-10 rounded-full border-2 border-background object-cover"
            />
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfd2b7c1ed2019c733180f_pf-somefolk.avif" 
              alt="Member"
              className="w-10 h-10 rounded-full border-2 border-background object-cover"
            />
            <img 
              src="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfc7ee6488aa2af0781d1b_pf-huy.avif" 
              alt="Member"
              className="w-10 h-10 rounded-full border-2 border-background object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground ml-3">Join 1.6K+ others</span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
