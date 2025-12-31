import { motion } from "framer-motion";

const showcaseItems = [
  {
    title: "The Creative Website Manual™",
    resourcesUsed: 5,
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/694bcf75d6098f26a89b94b9_creative-website-manual-1440x900.jpg",
    creators: [
      { name: "@ivorjian", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/694bcf3b1bf9d5bdf50bb773_pf-ivor.jpg" },
      { name: "@by_huy", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68dfc7ee6488aa2af0781d1b_pf-huy.avif" }
    ]
  },
  {
    title: "Chime 2025 Holiday Spending Report",
    resourcesUsed: 13,
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/694bcef00a25f13877af6a67_chime-1440x900.jpg",
    creators: [
      { name: "@johnreglin", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/694bcf1753c66b068a8a4639_pf-john.jpg" }
    ]
  },
  {
    title: "Raeth",
    resourcesUsed: 8,
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/69426db80b439d0df536a4bb_raeth-1440x900.avif",
    creators: [
      { name: "@bunch", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/694bd0d8b94b54a946c4795e_pf-bunch.jpg" }
    ]
  },
  {
    title: "Zeit Media",
    resourcesUsed: 12,
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6937dcc7d04d5e025c169723_zeit-1440x900.avif",
    creators: [
      { name: "@lenonguyen", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6937de7d69533e0754ac8242_pf-dang.avif" }
    ]
  },
  {
    title: "Revilo",
    resourcesUsed: 5,
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6937ddc749c4301d3896eb8d_revilo-1440x900.avif",
    creators: [
      { name: "@ahoia", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6937df1785ae2de54daeecc9_pf-ahoia.avif" }
    ]
  },
  {
    title: "De Puydt Interiors & Fireplaces",
    resourcesUsed: 2,
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6937ddb3b05a7f954857ffb5_puydt-1440x900.avif",
    creators: [
      { name: "@mathieudelporte", image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6937dd2ec6aef9759d3f49a0_pf-mathieu.avif" }
    ]
  }
];

const ShowcaseSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display-md font-semibold text-foreground">
            Made with Osmo
          </h2>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseItems.map((item, index) => (
            <ShowcaseCard key={index} {...item} index={index} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            These folks are <span className="font-medium text-foreground">talented</span>
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-osmo-dark text-white px-6 py-3 rounded-full font-medium hover:bg-osmo-dark/90 transition-colors group"
          >
            Explore showcase
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ShowcaseCardProps {
  title: string;
  resourcesUsed: number;
  image: string;
  creators: { name: string; image: string }[];
  index: number;
}

const ShowcaseCard = ({ title, resourcesUsed, image, creators, index }: ShowcaseCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group cursor-pointer"
  >
    <div className="bg-card rounded-2xl border border-osmo-border overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-osmo-purple transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">{resourcesUsed}</span>
            <span className="text-xs text-muted-foreground">Resources Used</span>
          </div>
          
          <div className="flex -space-x-2">
            {creators.map((creator, i) => (
              <div key={i} className="group/creator relative">
                <img 
                  src={creator.image} 
                  alt={creator.name}
                  className="w-8 h-8 rounded-full border-2 border-card object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ShowcaseSection;
