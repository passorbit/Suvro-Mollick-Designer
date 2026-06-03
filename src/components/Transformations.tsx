import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// ডাটাবেস থেকে আসা তথ্যের ইন্টারফেস
interface Transformation {
  id: string;
  title: string;
  before_image_url: string;
  after_image_url: string;
}

// স্লাইডারের মূল লজিক ও ডিজাইন
function BeforeAfterCard({ item }: { item: Transformation }) {
  const [sliderPosition, setSliderPosition] = useState(50); 

  return (
    <div className="relative w-full aspect-video rounded-[16px] overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-gray-100 border-4 border-white">
      
      {/* 🛠️ সমাধান: After Image এখন পেছনে থাকবে (ডানদিকে শো করবে) */}
      <img
        src={item.after_image_url}
        alt={`${item.title} After`}
        className="absolute top-0 left-0 w-full h-full object-cover"
        onDragStart={(e) => e.preventDefault()}
      />

      {/* 🛠️ সমাধান: Before Image এখন সামনে থাকবে এবং মাস্ক করা থাকবে (বামদিকে শো করবে) */}
      <img
        src={item.before_image_url}
        alt={`${item.title} Before`}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        onDragStart={(e) => e.preventDefault()}
      />

      <div
        className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18-6-6 6-6"/><path d="m15 18 6-6-6-6"/>
          </svg>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />

      <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-sm pointer-events-none transition-opacity opacity-0 group-hover:opacity-100">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-sm pointer-events-none transition-opacity opacity-0 group-hover:opacity-100">
        After
      </div>
    </div>
  );
}

export function Transformations() {
  const [items, setItems] = useState<Transformation[]>([]);

  useEffect(() => {
    async function fetchTransformations() {
      // ডাটাবেস থেকে ছবিগুলো টেনে আনা হচ্ছে
      const { data } = await supabase
        .from('transformations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setItems(data);
    }
    fetchTransformations();
  }, []);

  // যদি কোনো ছবি আপলোড করা না থাকে, তবে এই সেকশনটি লুকানো থাকবে
  if (items.length === 0) return null;

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* সেকশন হেডিং */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3">The Magic</span>
          <h2 className="text-3xl sm:text-4xl md:text-[50px] font-bold font-heading text-[#0A0A0A] leading-tight">
            See the Transformation
          </h2>
          <p className="text-[#777777] mt-4 max-w-2xl mx-auto">
            Drag the slider to see how a raw image turns into a high-performing, clickable thumbnail.
          </p>
        </div>

        {/* গ্রিড লেআউট (পিসিতে ২টা পাশাপাশি, মোবাইলে ১টা) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {items.map(item => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
