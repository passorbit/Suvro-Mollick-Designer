import { motion } from 'motion/react';

const thumbnails = [
  { id: 1, title: 'I survived 100 days in Minecraft' },
  { id: 2, title: 'The hidden secrets of MrBeast' },
  { id: 3, title: 'How to build a million dollar business' },
  { id: 4, title: 'Unboxing the new iPhone 16' },
  { id: 5, title: 'This changes everything...' },
  { id: 6, title: 'Why your channel is dying in 2025' },
];

export function PortfolioGallery() {
  const row1 = [...thumbnails];
  const row2 = [...thumbnails.slice(2), ...thumbnails.slice(0, 2)];
  const row3 = [...thumbnails.slice(4), ...thumbnails.slice(0, 4)];

  const MarqueeRow = ({ items, reverse = false }: { items: typeof thumbnails, reverse?: boolean }) => (
    <div className="flex w-fit overflow-hidden mb-4">
      <div className={`flex w-fit items-center gap-4 hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative w-[380px] h-[220px] shrink-0 rounded-[14px] overflow-hidden group bg-[#FFFFFF] flex items-center justify-center border-[1.5px] border-[rgba(0,0,0,0.10)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform duration-300"
          >
            <span className="text-black/10 font-bold text-xl rotate-12 transform origin-center select-none">Placeholder</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="work" className="pb-24 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <MarqueeRow items={row1} reverse={true} />
        <MarqueeRow items={row2} reverse={false} />
        <MarqueeRow items={row3} reverse={true} />
      </div>
    </section>
  );
}
