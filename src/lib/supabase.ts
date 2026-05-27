import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabaseUrl = 'https://sqekwmcjjdyqecpvbiqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZWt3bWNqamR5cWVjcHZiaXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NjM0OTksImV4cCI6MjA5NTQzOTQ5OX0.mf9xkNeJZbbfNlPMCMoMT9fatOCYsEgw401hHb0Uwms';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
});

// Test the connection and seed testimonials if empty
(async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, client_name, client_role, avatar_url, quote, rating, published, sort_order')
    .order('sort_order', { ascending: true })
  
  console.log('testimonials data:', data)
  console.log('testimonials error:', error)
  if (error) {
    console.error('Fetch testimonials error details:', error.message, error.details);
  }
  
  if (data && data.length === 0 && !error) {
    const seedTestimonials = [
      { client_name: "Mike Johnson", client_role: "Finance YouTuber", quote: "He understands the psychology of clicking better than anyone I've worked with.", rating: 5, published: true },
      { client_name: "John Doe", client_role: "Gaming Creator (1.2M Subs)", quote: "Suvro completely transformed my channel's CTR. We went from 4% to 9% on average!", rating: 5, published: true },
      { client_name: "Sarah Smith", client_role: "Tech Reviewer", quote: "Fastest turnaround time and the quality is always pristine. Highly recommend.", rating: 5, published: true },
      { client_name: "Emily Chen", client_role: "Lifestyle Creator (500k Subs)", quote: "My views skyrocketed after switching to Suvro's thumbnails. Simply the best.", rating: 5, published: true },
      { client_name: "David Lee", client_role: "Educational Channel", quote: "Professional, responsive, and insanely talented. Best investment for my channel.", rating: 5, published: true },
      { client_name: "Alex Costa", client_role: "Lifestyle Creator", quote: "The attention to detail and color grading in his thumbnails is unmatched.", rating: 5, published: true }
    ];
    const { error: insertError } = await supabase.from('testimonials').insert(seedTestimonials);
    if (insertError) {
      console.error('Failed to seed testimonials:', insertError);
    } else {
      console.log('Successfully seeded testimonials!');
    }
  }

  // Seed process steps if empty
  const { data: processData, error: processError } = await supabase.from('process_steps').select('*');
  if (processData && processData.length === 0 && !processError) {
    const seedSteps = [
      { step_number: 1, title: 'Brief', description: 'You share your video idea, references, and channel link.', sort_order: 1 },
      { step_number: 2, title: 'Concept', description: 'I create 1-2 initial thumbnail concepts within 12 hours.', sort_order: 2 },
      { step_number: 3, title: 'Revisions', description: "We refine together until it's perfect and click-worthy.", sort_order: 3 },
      { step_number: 4, title: 'Delivery', description: 'Final PNG + PSD files delivered in 24-48 hours.', sort_order: 4 }
    ];
    await supabase.from('process_steps').insert(seedSteps);
  }
})();

export type PortfolioItem = {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number;
  row_number: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_role: string | null;
  avatar_url: string | null;
  quote: string;
  rating: number;
  published: boolean;
  sort_order: number;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: string | null;
};

export type ProcessStep = {
  id: string;
  step_number: number;
  title: string;
  description: string;
  sort_order: number;
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  
  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_settings').select('key, value');
      if (data) {
        const map: Record<string, string> = {};
        data.forEach(s => {
          map[s.key] = s.value || '';
        });
        setSettings(map);

        if (map.site_name) {
          document.title = map.site_name;
        }

        if (map.favicon_url) {
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
          link.rel = 'icon';
          link.href = map.favicon_url;
          document.head.appendChild(link);
        }
      }
    }
    fetchSettings();
  }, []);

  return settings;
}
