import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

const SETTING_KEYS = [
  'site_name',
  'logo_url',
  'hero_headline',
  'hero_subheadline',
  'instagram_url',
  'behance_url',
  'facebook_url',
  'whatsapp_number',
  'hire_me_link'
];

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) {
      toast.error('Failed to fetch settings');
    } else {
      const settingsMap: Record<string, string> = {};
      data?.forEach(item => {
        settingsMap[item.key] = item.value || '';
      });
      setSettings(settingsMap);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Upsert all settings
    const upsertData = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }));

    const { error } = await supabase.from('site_settings').upsert(upsertData, { onConflict: 'key' });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Settings saved successfully');
    }
    setSaving(false);
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="text-gray-400">Loading settings...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading mb-8">Site Settings</h1>

      <form onSubmit={handleSave} className="bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-white/10 space-y-8">
        
        {/* General Identity */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">Global Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Logo URL</label>
              <input
                type="text"
                value={settings.logo_url || ''}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">Hero Section</h2>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Hero Headline</label>
              <textarea
                value={settings.hero_headline || ''}
                onChange={(e) => handleChange('hero_headline', e.target.value)}
                rows={2}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Hero Subheadline</label>
              <textarea
                value={settings.hero_subheadline || ''}
                onChange={(e) => handleChange('hero_subheadline', e.target.value)}
                rows={3}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Hire Me Button Link</label>
              <input
                type="text"
                value={settings.hire_me_link || ''}
                onChange={(e) => handleChange('hire_me_link', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">Social & Footer Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Instagram URL</label>
              <input
                type="text"
                value={settings.instagram_url || ''}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Behance URL</label>
              <input
                type="text"
                value={settings.behance_url || ''}
                onChange={(e) => handleChange('behance_url', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.facebook_url || ''}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : <><Save size={18} /> Save Settings</>}
          </button>
        </div>
      </form>
    </div>
  );
}
