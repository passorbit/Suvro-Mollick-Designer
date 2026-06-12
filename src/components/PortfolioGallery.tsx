import { motion } from 'motion/react';
import { useSiteSettings } from '../lib/supabase';

export function Hero() {
  const settings = useSiteSettings();

  return (
    // 🛠️ পরিবর্তন: pt-32 থেকে pt-20 করা হয়েছে উপরের ফাঁকা জায়গা কমাতে
    <section className="pt-20 pb-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden text-center">
      <div className="max-w-[560px] flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/5 shadow-sm text-sm font-medium mb-4"
        >
          <span className="text-accent">✦</span> Thumbnail Designer & Strategist
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          // 🛠️ পরিবর্তন: হেডলাইনের সাইজ md:text-[64px] থেকে md:text-[54px] করা হয়েছে
          className="text-4xl sm:text-[44px] md:text-[54px] !font-medium font-heading leading-[1.1] mb-3 text-[#0A0A0A] w-full"
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
          // 🛠️ পরিবর্তন: mb-5 থেকে mb-4 করা হয়েছে
          className="text-[15px] sm:text-[16px] text-[#777777] max-w-[600px] mb-4 mx-auto leading-relaxed px-2"
        >
          {settings.hero_subheadline || "Thumbnail Artist & Strategist helping creators grow through powerful visuals."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative inline-flex items-center justify-center mt-2 p-2 mb-2"
        >
          {/* Arrow Animation */}
          <div className="absolute -left-12 sm:-left-16 md:-left-20 -top-4 text-red-500 pointer-events-none scale-90">
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
          
          <motion.a
            href={settings.hire_me_link || "#contact"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-accent to-[#FF9D5C] text-white font-medium rounded-full shadow-[0_4px_14px_0_rgba(255,92,0,0.39)] hover:shadow-[0_8px_25px_rgba(255,92,0,0.5)] transition-all duration-300 border border-white/10"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <span>Book a Project</span>
              <div className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5 flex items-center opacity-0 group-hover:opacity-100 -mr-2 group-hover:mr-0">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
