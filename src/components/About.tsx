import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function About() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchAbout() {
      const { data: aboutData } = await supabase.from('about_me').select('*').eq('id', 1).single();
      if (aboutData) setData(aboutData);
    }
    fetchAbout();
  }, []);

  if (!data) return null;

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* বামের অংশ: Floating Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }} // ভাসমান অ্যানিমেশন
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[32px] overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white"
            >
              {data.image_url ? (
                <img src={data.image_url} alt="Suvro Mollick" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium">Image not uploaded</div>
              )}
            </motion.div>
            {/* ডেকোরেশন */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/15 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* ডানের অংশ: Text & Stats */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-black/5 shadow-sm text-sm font-medium mb-6"
            >
              <span className="text-accent">✦</span> About the Designer
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-[50px] font-bold font-heading leading-tight mb-6 text-[#0A0A0A]"
            >
              Hi, I'm <span className="text-accent">Suvro</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#555555] leading-relaxed mb-10"
            >
              {data.bio}
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { label: 'Years Exp.', value: data.experience },
                { label: 'Projects Done', value: data.projects },
                { label: 'Hours Worked', value: data.hours }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                  className="bg-surface p-4 md:p-5 rounded-2xl border border-black/5 text-center hover:border-accent/30 transition-colors"
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-1">{stat.value}</h4>
                  <p className="text-[11px] md:text-xs text-[#777777] font-bold uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
