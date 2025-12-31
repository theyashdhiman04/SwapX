import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Osmo empowered me to take on any creative challenge",
    content: "Thanks to Osmo, I've won my first major awards and signed clients I once only dreamed of. Their powerful, easy-to-use effects feature cutting-edge code that has expanded my development skills. Joining this community is an easy choice for developers at any level who want to grow and succeed!",
    name: "Dang Nguyen",
    role: "Head of Creative",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68ffde03222900e5435ed8e9_profile-photo-dang-nguyen.avif"
  },
  {
    quote: "This gets the official GSAP stamp of approval.",
    content: "Even if you know GSAP, it can be tricky to apply abstract animation concepts to real-world scenarios. Dennis and Ilja have come to the rescue with this treasure-trove of useful techniques. There's something for everyone here, grab-and-go or use the code as a jumping off point.",
    name: "Cassie Evans",
    role: "Education GSAP",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/690544852c85714e95a3382f_cassieevans.avif"
  },
  {
    quote: "One of a kind platform for any developers out there.",
    content: "It's incredible to be able to see and learn how the pros implement their animations. If you love web animations and creative development, this platform this a no brainer. Just sign up already.",
    name: "Huy (by Huy)",
    role: "Designer & YT creator",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/690544748168cca4344e230b_byhuy.avif"
  },
  {
    quote: "The creative developer's cheat code.",
    content: "Osmo is a one-stop shop, offering everything from snippets to help you set up your site to advanced animations and interactions that elevate it to the next level. The resources are so easy to implement, and with some imagination, you can adapt them to create something unique.",
    name: "Jordan Gilroy",
    role: "Web Designer",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/690544aa4f00b38278a3eeaa_jordan-gilroy.avif"
  },
  {
    quote: "\"Even I\" came across a few neat tricks I hadn't seen before.",
    content: "Osmo Supply is a gem for clever and well-thought-out code/no-code solutions for animations and components. It's a resource both beginners and seasoned pros will find incredibly useful. Lama stamp of approval on this one, and I'll deffo be coming back to it!",
    name: "Jesper Landberg",
    role: "Creative Developer",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/690544296af0f03241bd4c87_jesper-landberg.avif"
  },
  {
    quote: "The Osmo Vault has been a great partner in speeding up my projects",
    content: "Osmo Supply has been a great partner in speeding and building up my projects since its release. I have used the vault in countless projects, and it's fantastic to be a part of such an inspiring community. Osmo, it's a must-have.",
    name: "Victor Work",
    role: "VW Lab",
    image: "https://cdn.prod.website-files.com/68a5787bba0829184628bd5d/68ffde68301fde82049ff5bf_profile-photo-victor-work.avif"
  }
];

const TestimonialsSection = () => {
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
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <span className="font-medium text-foreground">Trusted by</span>
              Industry Giants
            </span>
            <span className="flex items-center gap-2">
              <span className="font-medium text-foreground">Connect</span>
              Worldwide
            </span>
          </div>
          <h2 className="text-display-sm font-semibold text-foreground">
            Osmo's Global Community
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  quote: string;
  content: string;
  name: string;
  role: string;
  image: string;
  index: number;
}

const TestimonialCard = ({ quote, content, name, role, image, index }: TestimonialCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="testimonial-card h-full flex flex-col"
  >
    <h3 className="text-lg font-semibold text-foreground mb-4">{quote}</h3>
    <p className="text-sm text-muted-foreground mb-6 flex-grow">{content}</p>
    
    <div className="flex items-center gap-3 pt-4 border-t border-osmo-border">
      <img 
        src={image} 
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <span className="block text-sm font-medium text-foreground">{name}</span>
        <span className="block text-xs text-muted-foreground">{role}</span>
      </div>
    </div>
  </motion.div>
);

export default TestimonialsSection;
