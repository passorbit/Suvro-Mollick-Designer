import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase, PortfolioItem } from '../lib/supabase';

const fallbackThumbnails = [
  { id: '1', title: 'I survived 100 days in Minecraft', image_url: '' },
  { id: '2', title: 'The hidden secrets of MrBeast', image_url: '' },
  { id: '3', title: 'How to build a million dollar business', image_url: '' },
  { id: '4', title: 'Unboxing the new iPhone 16', image_url: '' },
  { id: '5', title: 'This changes everything...', image_url: '' },
  { id: '6', title: 'Why your channel is dying in 2025', image_url: '' },
];

export function PortfolioGallery() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setItems(data);
      }
      setLoading(false);
    }
    fetchItems();
  }, []);

  if (loading) {
    return (
      <section id="work" className="pb-24 overflow-hidden min-h-[700px]"></section>
    );
  }

  const row1Items = items.filter(i => i.row_number === 1);
  const row2Items = items.filter(i => i.row_number === 2);
  const row3Items = items.filter(i => i.row_number === 3);

  const finalRow1 = row1Items.length > 0 ? row1Items : fallbackThumbnails;
  const finalRow2 = row2Items.length > 0 ? row2Items : [...fallbackThumbnails.slice(2), ...fallbackThumbnails.slice(0, 2)];
  const finalRow3 = row3Items.length > 0 ? row3Items : [...fallbackThumbnails.slice(4), ...fallbackThumbnails.slice(0, 4)];

  const MarqueeRow = ({ items, reverse = false }: { items: any[], reverse?: boolean }) => (
    // 🛠️ Update: mb-6 থেকে mb-3 করা হয়েছে (Row-এর ভেতরের গ্যাপ কমানো হয়েছে)
    <div className="flex overflow-x-hidden overflow-y-visible mb-3"> 
      <div className={`flex w-fit overflow-visible py-[8px] items-center gap-4 sm:gap-6 hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            // 🛠️ Update: shadow রিমুভ করা হয়েছে
            className="relative w-[340px] h-[191px] sm:w-[420px] sm:h-[236px] lg:w-[480px] lg:h-[270px] shrink-0 rounded-[16px] overflow-hidden group flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
          >
            {item.image_url ? (
              <>
                <img 
                  src={item.image_url} 
                  alt={item.title || ''} 
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
                />
                <div 
                  className="absolute top-0 left-0 w-full h-full bg-transparent z-[2]" 
                  onContextMenu={(e) => e.preventDefault()} 
                />
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                 <span className="text-black/10 font-bold text-xl rotate-12 transform origin-center select-none">Placeholder</span>
              </div>
            )}
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
        
        <MarqueeRow items={finalRow1} reverse={true} />
        {finalRow2.length > 0 && <MarqueeRow items={finalRow2} reverse={false} />}
        {finalRow3.length > 0 && <MarqueeRow items={finalRow3} reverse={true} />}
      </div>
    </section>
  );
}
