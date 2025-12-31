import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-8 pb-12 px-4 overflow-hidden">
      {/* Main Hero Content */}
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-display-xl font-semibold text-foreground tracking-tight"
        >
          <span className="inline-block">Dev</span>
          <span className="inline-block ml-4">Toolkit</span>
          <span className="inline-block mx-4">
            <svg className="w-16 h-16 md:w-24 md:h-24 inline-block text-osmo-purple" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 9L16.5 14L18.5 22L12 17.5L5.5 22L7.5 14L2 9L9 9L12 2Z" />
            </svg>
          </span>
          <span className="inline-block italic font-normal">Built to Flex</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-foreground max-w-2xl mx-auto"
        >
          Platform packed with{" "}
          <span className="bg-muted px-2 py-0.5 rounded-md text-sm font-medium">Webflow</span>
          {" "}&{" "}
          <span className="bg-muted px-2 py-0.5 rounded-md text-sm font-medium">HTML</span>
          {" "}resources,{" "}
          <span className="bg-muted px-2 py-0.5 rounded-md text-sm font-medium">icons</span>
          ,{" "}
          <span className="bg-muted px-2 py-0.5 rounded-md text-sm font-medium">easings</span>
          {" "}and a page transition{" "}
          <span className="bg-muted px-2 py-0.5 rounded-md text-sm font-medium">course</span>
        </motion.p>
      </div>

      {/* Floating Device Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative mt-16 max-w-6xl mx-auto"
      >
        <div className="flex justify-center items-end gap-4 md:gap-6 perspective-1000">
          {/* Left Card */}
          <div className="animate-float hidden md:block">
            <DeviceCard 
              image="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68a5787bba0829184628bf5f_pixelate-image-render-effect-1440x900.avif"
              title="Pixelate Render"
              subtitle="Pixelate Image Render Effect"
              rotation={-8}
            />
          </div>

          {/* Center Card (Larger) */}
          <div className="animate-float-delayed z-10">
            <DeviceCard 
              image="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68c167ce6a8fbad3e019172d_6890e83ff876de6b428bc966_directional-list-hover-1440x900-v2.avif"
              title=""
              subtitle=""
              rotation={0}
              large
            />
          </div>

          {/* Right Card */}
          <div className="animate-float-slow hidden md:block">
            <DeviceCard 
              image="https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68a5787bba0829184628bf59_flick-cards-slider-1440x900.avif"
              title="Flick Cards Slider"
              subtitle="Flick Cards Slider"
              rotation={8}
            />
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-dashed border-osmo-border/50 rounded-full pointer-events-none opacity-30" />
      </motion.div>
    </section>
  );
};

interface DeviceCardProps {
  image: string;
  title: string;
  subtitle: string;
  rotation?: number;
  large?: boolean;
}

const DeviceCard = ({ image, title, subtitle, rotation = 0, large }: DeviceCardProps) => {
  const size = large ? "w-72 md:w-96" : "w-56 md:w-72";
  
  return (
    <div 
      className={`${size} bg-osmo-dark rounded-2xl overflow-hidden shadow-osmo-xl`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Device Frame */}
      <div className="p-2">
        {/* Screen */}
        <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-osmo-lime text-xs font-medium italic">{title}</span>
              <p className="text-white/80 text-[10px] mt-0.5">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
