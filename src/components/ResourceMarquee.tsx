import { motion } from "framer-motion";

const resources = [
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68a5787bba0829184628bf5f_pixelate-image-render-effect-1440x900.avif",
    title: "Pixelate Image Render Effect"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68c167ce6a8fbad3e019172d_6890e83ff876de6b428bc966_directional-list-hover-1440x900-v2.avif",
    title: "Directional List Hover"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68a5787bba0829184628bf59_flick-cards-slider-1440x900.avif",
    title: "Flick Cards Slider"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68c167ea8f41b9fa8ebc0502_6874d8a62f8c8e53bb0e15a5_face-follow-cursor-1440x900.avif",
    title: "Face Follow Cursor (Mascot)"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68c1689d7a027cabdab08387_6874df82a560fd81aaae10e5_locomotive-smooth-scroll-1440x900.avif",
    title: "Locomotive Smooth Scroll Setup"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68c167dd1cfe3ada2ee7b801_68838be54601fe0057325293_logo-wall-cycle-1440x900.avif",
    title: "Logo Wall Cycle"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68c16954612327dbd3a83748_67f3a5ae36a0bfc82de1290a_falling-2d-elements-matterjs-1440x900.avif",
    title: "Falling 2D Objects (MatterJS)"
  },
  {
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68a5787bba0829184628bf5e_3d-image-carousel-1440x900.avif",
    title: "3D Image Carousel"
  },
];

const ResourceMarquee = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      {/* First Row - Left to Right */}
      <div className="flex animate-marquee">
        {[...resources, ...resources].map((resource, i) => (
          <ResourceCard key={i} {...resource} />
        ))}
      </div>
    </section>
  );
};

const ResourceCard = ({ image, title }: { image: string; title: string }) => (
  <motion.div 
    whileHover={{ scale: 1.02, y: -5 }}
    className="flex-shrink-0 mx-3 w-64 md:w-80"
  >
    <div className="bg-osmo-dark rounded-xl overflow-hidden shadow-osmo group cursor-pointer">
      <div className="p-2">
        <div className="relative rounded-lg overflow-hidden aspect-[16/10]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-white/90 text-sm font-medium truncate">{title}</p>
      </div>
    </div>
  </motion.div>
);

export default ResourceMarquee;
