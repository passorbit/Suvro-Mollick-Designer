import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: "Elena Rodriguez", role: "Youtuber", text: "This graphic designer went above and beyond in creating a brand identity for my business. The quality of their work is top-notch, and they made sure every detail was perfect. Their ability to bring concepts to life is truly impressive. I highly recommend them for any design needs." },
  { name: "Marcus Chen", role: "Youtuber", text: "I was really impressed with this graphic designer's responsiveness and ability to adapt to my needs. They provided fantastic design options and were patient with all the revisions I requested. The final product was exactly what I envisioned. A fantastic experience overall!" },
  { name: "Sarah Jenkins", role: "Content Creator", text: "I've worked with many designers, but Suvro is by far the most talented and professional. They listen carefully to my ideas and deliver exactly what I'm looking for every time. Plus, the turnaround time is always incredibly fast." },
  { name: "David Park", role: "Gaming Creator", text: "Suvro completely transformed my channel's CTR. We went from 4% to 9% on average!" },
  { name: "Rachel Adams", role: "Vlogger (500k Subs)", text: "My views skyrocketed after switching to Suvro's thumbnails. Simply the best." },
  { name: "Michael Torres", role: "Educational Channel", text: "Professional, responsive, and insanely talented. Best investment for my channel." },
];

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].clientWidth;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0].clientWidth;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#EBEBEB] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-[56px] font-medium font-heading mb-4 text-[#0A0A0A] tracking-tight">What clients say</h2>
      </motion.div>

      <div className="relative max-w-[100vw]">
        <div className="absolute top-0 bottom-0 left-0 w-[10%] md:w-[20%] bg-gradient-to-r from-[#EBEBEB] via-[#EBEBEB]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-[10%] md:w-[20%] bg-gradient-to-l from-[#EBEBEB] via-[#EBEBEB]/80 to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-[10%] md:px-[calc(50vw-436px)] md:scroll-pl-[calc(50vw-436px)]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-[85vw] md:w-[424px] shrink-0 snap-center md:snap-start bg-white rounded-[16px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[340px]">
               <p className="text-[16px] md:text-[18px] text-[#0A0A0A] leading-[1.6]">"{t.text}"</p>
               <div className="mt-8 flex justify-between items-end">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
                        <img src={`https://i.pravatar.cc/150?u=${t.name.replace(/\s+/g, '')}`} alt={t.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[14px] text-[#0A0A0A] font-medium flex items-center gap-1">
                           <span className="text-xs">☆</span> {t.name}
                        </span>
                        <span className="text-[13px] text-[#777777]">— {t.role}</span>
                     </div>
                  </div>
                  <div className="flex gap-1 text-[#FF4D00]">
                     {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" stroke="none" />)}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-8 md:mt-12 w-full relative z-20">
        <button onClick={scrollPrev} className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[8px] flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-[#0A0A0A]">
          <ChevronLeft size={20} />
        </button>
        <button onClick={scrollNext} className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-[8px] flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-[#0A0A0A]">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
