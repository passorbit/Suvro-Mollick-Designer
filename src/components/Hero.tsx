import { motion } from 'motion/react';
import { useSiteSettings } from '../lib/supabase';

export function Hero() {
  const settings = useSiteSettings();

  return (
    <section className="pt-32 pb-16 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden text-center">
      <div className="max-w-[560px] flex flex-col items-center w-full">
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
          className="text-4xl sm:text-[40px] md:text-[64px] !font-medium font-heading leading-[1.2] mb-6 text-[#0A0A0A] w-full"
        >
          {settings.hero_headline ? (
            settings.hero_headline.split('\n').map((line, i) => (
              <span key={i} className="block break-words">{line}</span>
            ))
          ) : (
            <>
              <span className="block break-words"><span className="text-accent">Visuals</span> that speak</span>
              <span className="block break-words">Before words <span className="text-accent">do.</span></span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] sm:text-[16px] text-[#777777] max-w-[600px] mb-8 mx-auto leading-relaxed px-2"
        >
          {settings.hero_subheadline || "Thumbnail Artist & Strategist helping creators grow through powerful visuals."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative inline-flex items-center justify-center mt-2"
        >
          <div
            className="absolute -left-12 sm:-left-16 md:-left-24 -top-4 text-red-500 pointer-events-none"
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-10deg)' }}>
              <motion.path 
                d="M 15 85 C 10 40, 30 25, 85 50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
              />
              <motion.path 
                d="M 65 35 L 85 50 L 60 70"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
              />
            </svg>
          </div>
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
