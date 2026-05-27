import { motion } from 'motion/react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { useSiteSettings } from '../lib/supabase';

function BehanceIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.2 7c2 0 3.2 1.2 3.2 3.2 0 1.2-.8 2.2-2 2.6 1.4.3 2.5 1.5 2.5 3.3 0 2.2-1.6 3.6-4.1 3.6H3V7h5.2zm-2.4 4.5h2.2c.8 0 1.4-.4 1.4-1.2 0-.8-.6-1.2-1.4-1.2H5.8v2.4zm0 6h2.4c1.1 0 1.7-.5 1.7-1.4 0-.9-.7-1.4-1.7-1.4H5.8v2.8zm11-7v2.3h-4v.2c0 1.4 1 2.3 2.3 2.3.9 0 1.5-.3 2-.9l1.8 1c-.8 1-2.1 1.6-3.8 1.6-2.5 0-4-1.8-4-4.2s1.7-4.3 4.2-4.3c2.4 0 3.8 1.6 3.8 4l-.1.1v-.1h-1.8v-1.9zm-1.8-.7c-.8 0-1.6.7-1.8 1.6h3.4c-.2-.9-1-1.6-1.6-1.6zM13.6 5.5v1.2h4.5V5.5h-4.5z"/>
    </svg>
  );
}

export function Footer() {
  const settings = useSiteSettings();

  return (
    <motion.footer 
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="border-t border-black/5 bg-transparent pt-16 pb-8 px-6 md:px-12"
      id="contact"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
        <div>
          <a href="#" className="text-2xl font-bold font-heading text-text-main block mb-2 hover:text-accent transition-colors">
            {settings.site_name || "Suvro Mollick"}
          </a>
          <p className="text-muted text-sm max-w-[280px]">
            {settings.whatsapp_number ? `WhatsApp: ${settings.whatsapp_number}` : 'Thumbnail Designer & Strategist'}
          </p>
        </div>
        
        <div className="flex gap-4">
          <a href={settings.instagram_url || "https://www.instagram.com/a_suvro09"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-[5px] bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
            <Instagram size={20} />
          </a>
          <a href={settings.behance_url || "https://www.behance.net/suvro_09"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-[5px] bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
            <BehanceIcon size={22} />
          </a>
          <a href={settings.facebook_url || "https://www.facebook.com/a.suvro09"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-[5px] bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
            <Facebook size={20} />
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center pt-8 border-t border-black/5">
        <p className="text-muted/80 text-sm">
          © {new Date().getFullYear()} {settings.site_name || "Suvro Mollick"}. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
