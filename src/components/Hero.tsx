import { motion } from 'motion/react';
import { useSiteSettings } from '../lib/supabase';

export function Hero() {
  const settings = useSiteSettings();

  return (
    <section className="pt-32 pb-16 flex flex-col items-center justify-center px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden text-center">
      <div className="max-w-[560px] flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/5 shadow-sm text-sm font-medium mb-8"
        >
          <span className="text-accent">✦</span> Thumbnail Designer & Strategist
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-[40px] md:text-[64px] !font-medium font-heading leading-[1.1] mb-6 text-[#0A0A0A]"
        >
          {settings.hero_headline ? (
            settings.hero_headline.split('\n').map((line, i) => (
              <span key={i} className="block whitespace-nowrap">{line}</span>
            ))
          ) : (
            <>
              <span className="block whitespace-nowrap"><span className="text-accent">Visuals</span> that speak</span>
              <span className="block whitespace-nowrap">Before words <span className="text-accent">do.</span></span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[16px] text-[#777777] max-w-[600px] mb-8 mx-auto leading-relaxed"
        >
          {settings.hero_subheadline || "Thumbnail Artist & Strategist helping creators grow through powerful visuals."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative inline-flex items-center justify-center mt-2"
        >
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -left-12 md:-left-16 text-accent"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-5deg)' }}>
              <path d="M4 12c4-4 8-4 14 0" />
              <path d="M14 8l4 4-4 4" />
            </svg>
          </motion.div>
          <a
            href={settings.hire_me_link || "#contact"}
            className="px-8 py-3.5 bg-accent text-white font-normal rounded-full hover:bg-accent/90 transition-colors"
          >
            Book a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
