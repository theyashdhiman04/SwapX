import { motion } from "framer-motion";

const products = [
  {
    badge: "Part of the",
    badgeHighlight: "Membership",
    title: "The Vault",
    description: "Our ever-growing dashboard packed with ready-to-go components.",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd51/68f09eb740f811cb015b796b_594dc45e8307ba685416aebefcae0307_product-card-vault.avif",
    available: true
  },
  {
    badge: "Expected",
    badgeHighlight: "End of 2025",
    title: "Page Transition Course",
    description: "Learn how to create page transitions that take your websites to the next level.",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd51/68f0a5c138ba832c3a335005_0bcccf7bd352eaee5ae70c722546d26a_product-card-pagetransitioncourse.avif",
    available: false
  },
  {
    badge: "Part of the",
    badgeHighlight: "Membership",
    title: "Icons",
    description: "A uniform library of clean, scalable SVG icons you can copy or download in seconds.",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd51/68f0a2eff550d6a3985423cf_234ab919faad76f29fe76a91c2edce11_product-card-icons.avif",
    available: true
  },
  {
    badge: "Expected",
    badgeHighlight: "Early 2026",
    title: "Easings",
    description: "Coming soon, ready-to-paste easings for CSS and GSAP inside the Osmo Vault.",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd51/690537ff9f27008f40897c7d_product-card-easings.avif",
    available: false
  },
  {
    badge: "Part of the",
    badgeHighlight: "Membership",
    title: "Community",
    description: "Connect with the people who love building great websites as much as you do.",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd51/68f0a2717149a92a840d5de5_product-card-community.avif",
    available: true
  }
];

const ProductsSection = () => {
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
            A growing toolkit for creative developers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Access everything with a single membership:
          </p>
        </motion.div>

        {/* Products Slider Labels */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["The Vault", "Page Transition Course", "Icons", "Easings", "Community"].map((label, i) => (
            <span 
              key={i}
              className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-4xl">
          {products.slice(3, 5).map((product, index) => (
            <ProductCard key={index + 3} {...product} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  badge: string;
  badgeHighlight: string;
  title: string;
  description: string;
  image: string;
  available: boolean;
  index: number;
}

const ProductCard = ({ badge, badgeHighlight, title, description, image, available, index }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group cursor-pointer"
  >
    <div className="bg-card rounded-3xl border border-osmo-border overflow-hidden card-hover h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1.5">
            <span className="text-xs text-muted-foreground">{badge}</span>
            <span className="text-xs font-medium text-foreground ml-1">{badgeHighlight}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-osmo-purple transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        {available && (
          <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-osmo-purple transition-colors">
            <span>Discover</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default ProductsSection;
