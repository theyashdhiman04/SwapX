import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <nav className="bg-osmo-dark rounded-full px-4 py-3 flex items-center justify-between shadow-osmo-lg">
        {/* Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-3 py-1.5"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-medium">Menu</span>
        </button>

        {/* Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <svg viewBox="0 0 100 24" className="h-5 w-auto fill-white">
            <text x="0" y="18" className="text-xl font-bold tracking-tight">OSMO</text>
          </svg>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 transition-colors">
            Login
          </button>
          <button className="bg-osmo-lime text-osmo-dark text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
            Join
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-osmo-dark rounded-3xl p-6 shadow-osmo-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-white font-semibold">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-1">
              <MenuSection title="Our Products">
                <MenuItem href="#" label="The Vault" />
                <MenuItem href="#" label="Page Transition Course" badge="WIP" />
                <MenuItem href="#" label="Icon Library" />
                <MenuItem href="#" label="Community" />
              </MenuSection>
              
              <MenuSection title="Easings">
                <MenuItem href="#" label="Coming Soon" badge="Soon" />
              </MenuSection>
              
              <MenuSection title="Explore">
                <MenuItem href="#" label="Osmo Showcase" />
                <MenuItem href="#" label="Updates" />
                <MenuItem href="#" label="Pricing" />
              </MenuSection>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex gap-4">
              <a href="#" className="text-white/60 hover:text-white text-sm">LinkedIn</a>
              <a href="#" className="text-white/60 hover:text-white text-sm">Instagram</a>
              <a href="#" className="text-white/60 hover:text-white text-sm">X/Twitter</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-3">
    <span className="text-white/40 text-xs uppercase tracking-wider mb-2 block">{title}</span>
    <div className="space-y-1">{children}</div>
  </div>
);

const MenuItem = ({ href, label, badge }: { href: string; label: string; badge?: string }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 text-white hover:text-osmo-lime py-1.5 transition-colors"
  >
    <span className="text-sm font-medium">{label}</span>
    {badge && (
      <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </a>
);

export default Navbar;
