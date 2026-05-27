import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-32px)] md:w-full max-w-[700px] flex flex-col items-center">
      <nav
        className={`w-full bg-white border border-[rgba(0,0,0,0.10)] rounded-[50px] px-6 py-2.5 flex items-center justify-between transition-shadow duration-300 relative z-[1001] ${
          scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]' : 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
        }`}
      >
        <a href="#" className="text-lg font-bold font-heading text-[#0A0A0A]">
          Suvro Mollick
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-[#444444] hover:text-[#0A0A0A] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2 bg-accent text-white font-medium text-[14px] rounded-[50px] hover:bg-accent/90 transition-colors inline-block"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-main p-1 transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[calc(100%-24px)] overflow-hidden bg-white rounded-b-[24px] border border-[rgba(0,0,0,0.10)] border-t-0 shadow-[0_8px_24px_rgba(0,0,0,0.08)] relative -mt-4 z-[1000]"
          >
            <div className="px-6 pt-6 pb-6 flex flex-col selection:bg-accent selection:text-white">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[16px] py-[12px] border-b border-[rgba(0,0,0,0.06)] text-text-main hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-[16px] w-full py-[12px] bg-accent text-white gap-2 flex items-center justify-center font-bold text-[16px] rounded-[50px] shadow-sm uppercase tracking-wide"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
