import { Github, Twitter, Linkedin, Code2, Shield, FileText } from "lucide-react";
import { motion } from "framer-motion";

const SwapFooter = () => {
  const footerLinks = [
    {
      category: "Resources",
      links: [
        { label: "Documentation", icon: FileText, href: "https://github.com/theyashdhiman04/SwapX/blob/main/README.md" },
        { label: "Source Code", icon: Code2, href: "https://github.com/theyashdhiman04/SwapX" },
      ],
    },
    {
      category: "Legal",
      links: [
        { label: "Privacy Policy", icon: Shield, href: "https://github.com/theyashdhiman04/SwapX/blob/main/README.md#security" },
        { label: "Terms of Service", icon: FileText, href: "https://github.com/theyashdhiman04/SwapX/blob/main/README.md#license" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/theyashdhiman04/", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/theyashdhiman", label: "Twitter/X" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/itsyashdhiman/", label: "LinkedIn" },
  ];

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <span className="font-display font-bold text-foreground text-xl">SwapX</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-md leading-relaxed">
              A cross-platform token swap interface aggregating liquidity from top DEX protocols. Built with Ethers.js, Web3.js, and React.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-green-500 hover:border-green-500/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 + 0.2, duration: 0.6 }}
            >
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {section.category}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-green-500 transition-all" />
                      <span>{link.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SwapX Protocol. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default SwapFooter;
