import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, X } from 'lucide-react';

const faqs = [
  {
    q: "1. What is your Turnaround time?",
    a: "Most thumbnails are delivered within 24-48 hours depending on the complexity of the work. Express delivery is not available."
  },
  {
    q: "2. How many Revisions do I get?",
    a: "I offer 3 free revisions with each thumbnail project. Any further changes may require a small revision fee."
  },
  {
    q: "3. What do you need from me to start?",
    a: (
      <>
        To get started, please provide the following:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>A brief description of your video or channel.</li>
          <li>Your branding style (colors, fonts, logo, etc.).</li>
          <li>Example thumbnails you like or want inspired by (if you have).</li>
          <li>Any text, images, or elements you want included.</li>
          <li>The video title or main topic.</li>
          <li>Any specific mood or style preference for the design.</li>
        </ul>
      </>
    )
  },
  {
    q: "4. Do you work with international clients?",
    a: "Yes — I work internationally with creators and brands, so timezone differences are never a problem."
  },
  {
    q: "5. What file formats do you deliver?",
    a: "I provide professional-quality PNG and JPG files for all deliveries. Editable PSD files are provided if you need them."
  },
  {
    q: "6. Do you create all thumbnail niches?",
    a: "I create thumbnails for multiple content niches such as gaming, finance, podcasts, documentaries, educational videos, reaction content, and more."
  },
  {
    q: "7. How do i Pay?",
    a: "I accept Bank transfer, bKash (for local clients), or international payment via Wise/Payoneer."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 md:px-12 w-full bg-[#EBEBEB]">
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-[56px] font-medium font-heading mb-4 text-[#0A0A0A] tracking-tight">FAQ</h2>
      </motion.div>

      <div className="max-w-[800px] mx-auto bg-[#F4F4F4]/80 border border-[#E0E0E0] rounded-[24px] p-6 md:p-10 shadow-sm">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[12px] overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 px-8 text-left hover:bg-gray-50/50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-medium font-heading text-[18px] md:text-[20px] text-[#0A0A0A] pr-8">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center shrink-0">
                    {isOpen ? <X size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="pb-6 px-8 pt-2 text-[#555555] leading-relaxed text-[16px]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
