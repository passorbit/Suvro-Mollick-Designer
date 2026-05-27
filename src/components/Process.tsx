import { motion } from 'motion/react';

const steps = [
  {
    num: "1",
    tag: "STEP 01",
    title: "Brief",
    desc: "You share your video idea, references, and channel link."
  },
  {
    num: "2",
    tag: "STEP 02",
    title: "Concept",
    desc: "I create 1-2 initial thumbnail concepts within 12 hours."
  },
  {
    num: "3",
    tag: "STEP 03",
    title: "Revisions",
    desc: "We refine together until it's perfect and click-worthy."
  },
  {
    num: "4",
    tag: "STEP 04",
    title: "Delivery",
    desc: "Final PNG + PSD files delivered in 24-48 hours."
  }
];

export function Process() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[800px] mx-auto bg-transparent">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-medium text-accent tracking-widest uppercase text-[11px] mb-4"
        >
          HOW IT WORKS
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-[32px] font-bold font-heading text-[#0A0A0A]"
        >
          Our Process
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] top-[28px] bottom-8 w-[2px] bg-[rgba(0,0,0,0.08)]" />
        <motion.div 
          className="absolute left-[27px] top-[28px] bottom-8 w-[2px] bg-accent origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="space-y-[48px]">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
                className="relative z-10 flex-shrink-0 w-[56px] h-[56px] rounded-full border-2 border-accent bg-white flex items-center justify-center shadow-sm"
              >
                <span className="text-accent font-bold text-[20px] font-heading">{step.num}</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="flex-1 bg-[#FFFFFF] border border-[rgba(0,0,0,0.08)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-[16px] p-[32px]"
              >
                <div className="text-accent text-[12px] font-bold tracking-[0.15em] uppercase mb-2">
                  {step.tag}
                </div>
                <h3 className="text-[28px] font-medium font-heading text-[#0A0A0A] mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[16px] text-[#555555] leading-[1.6]">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
