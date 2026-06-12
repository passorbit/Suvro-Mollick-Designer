import { motion } from 'motion/react';
import { useSiteSettings } from '../lib/supabase';

export function Hero() {
  const settings = useSiteSettings();

  return (
    // 🛠️ পরিবর্তন ১: pb-16 কমিয়ে pb-4 করা হয়েছে যাতে নিচের ক্যারোসেল উপরে উঠে আসে
    <section className="pt-32 pb-4 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden text-center">
      <div className="max-w-[560px] flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/5 shadow-sm text-sm font-medium mb-6"
        >
          <span className="text-accent">✦</span> Thumbnail Designer & Strategist
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          // 🛠️ পরিবর্তন ২: leading-[1.2] কমিয়ে leading-[1.1] এবং mb-6 কমিয়ে mb-4 করা হয়েছে
          className="text-4xl sm:text-[40px] md:text-[64px] !font-medium font-heading leading-[1.1] mb-4 text-[#0A0A0A] w-full"
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
          // 🛠️ পরিবর্তন ৩: mb-8 কমিয়ে mb-5 করা হয়েছে (ট্যাগলাইন ও বাটনের গ্যাপ কমবে)
          className="text-[15px] sm:text-[16px] text-[#777777] max-w-[600px] mb-5 mx-auto leading-relaxed px-2"
        >
          {settings.hero_subheadline || "Thumbnail Artist & Strategist helping creators grow through powerful visuals."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative inline-flex items-center justify-center mt-2"
        >
          {/* Arrow Animation */}
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
          
          {/* Animated Gradient Button */}
          <motion.a
            href={settings.hire_me_link || "#contact"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-accent to-[#FFB075] text-white font-medium rounded-full shadow-[0_4px_14px_0_rgba(255,92,0,0.39)] hover:shadow-[0_6px_25px_rgba(255,92,0,0.5)] transition-shadow duration-300 border border-white/20 relative overflow-hidden group"
          >
            <span className="relative z-10">Book a Project</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1s_infinite] z-0"></div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
