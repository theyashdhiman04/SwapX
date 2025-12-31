import { motion } from "framer-motion";

const latestUpdates = [
  {
    date: "1 day ago",
    type: "New Resource",
    title: "Tooltip (CSS Only)",
    category: "Dropdowns & Information",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/69527acf13923015cbab833f_tooltip-css-only-1440x900.avif"
  },
  {
    date: "6 days ago",
    type: "New Resource",
    title: "Draggable Marquee (Directional)",
    category: "Sliders & Marquees",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/694bc9838e6baebb3f92a256_draggable-marquee-1440x900.avif"
  },
  {
    date: "1 week ago",
    type: "New Resource",
    title: "Radial Text Marquee",
    category: "Sliders & Marquees",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/693ffdf7248bcb157eb61104_radial-text-marquee-1440x900-v2.avif"
  },
  {
    date: "1 week ago",
    type: "New Resource",
    title: "Snowflake Effect",
    category: "Gimmicks",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/6941a16f37aef8da66bf1e31_snowflake-effect-1440x900.avif"
  },
  {
    date: "2 weeks ago",
    type: "New Resource",
    title: "Big Typo Scroll Preview (Infinite)",
    category: "Scroll Animations",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/693ae93a37b8dc5f243b1448_big-typo-scroll-preview-1440x900-v4.avif"
  }
];

const LatestUpdatesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm text-muted-foreground block mb-2">Latest updates</span>
            <h2 className="text-display-md font-semibold text-foreground">from Osmo</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">New stuff is</span>
            <span className="text-sm font-medium text-foreground">added every week!</span>
          </div>
        </motion.div>

        {/* Updates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestUpdates.slice(0, 3).map((update, index) => (
            <UpdateCard key={index} {...update} index={index} />
          ))}
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {latestUpdates.slice(3, 5).map((update, index) => (
            <UpdateCard key={index + 3} {...update} index={index + 3} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface UpdateCardProps {
  date: string;
  type: string;
  title: string;
  category: string;
  image: string;
  index: number;
}

const UpdateCard = ({ date, type, title, category, image, index }: UpdateCardProps) => (
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
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground">{date}</span>
          <span className="text-xs bg-osmo-lime/20 text-osmo-dark px-2 py-0.5 rounded-full font-medium">
            {type}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-osmo-purple transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </div>
  </motion.div>
);

export default LatestUpdatesSection;
