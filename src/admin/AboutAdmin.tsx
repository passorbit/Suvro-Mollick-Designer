import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function AboutAdmin() {
  const [data, setData] = useState({ bio: '', experience: '', projects: '', hours: '', image_url: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAbout() {
      const { data: aboutData } = await supabase.from('about_me').select('*').eq('id', 1).single();
      if (aboutData) setData(aboutData);
    }
    fetchAbout();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Saving updates...');

    try {
      let newImageUrl = data.image_url;

      // যদি নতুন ছবি সিলেক্ট করা হয়
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `about_${Date.now()}.${fileExt}`;
        // আমরা আগের transformations বাকেটটাই ব্যবহার করছি যাতে নতুন পারমিশন দিতে না হয়
        const { error: uploadError } = await supabase.storage.from('transformations').upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        newImageUrl = supabase.storage.from('transformations').getPublicUrl(fileName).data.publicUrl;
      }

      // ডাটাবেস আপডেট
      const { error } = await supabase.from('about_me').update({
        bio: data.bio, experience: data.experience, projects: data.projects, hours: data.hours, image_url: newImageUrl
      }).eq('id', 1);

      if (error) throw error;
      toast.success('About section updated successfully!', { id: toastId });
      
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage 'About Me' Section</h2>
      <form onSubmit={handleSave} className="space-y-6">
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Your Bio</label>
          <textarea rows={4} value={data.bio} onChange={(e) => setData({...data, bio: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none text-black bg-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
            <input type="text" value={data.experience} onChange={(e) => setData({...data, experience: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Projects</label>
            <input type="text" value={data.projects} onChange={(e) => setData({...data, projects: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hours Worked</label>
            <input type="text" value={data.hours} onChange={(e) => setData({...data, hours: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white outline-none" />
          </div>
        </div>

        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <label className="block text-sm font-bold text-gray-700 mb-2">Upload Your Photo</label>
          {data.image_url && <img src={data.image_url} alt="Current" className="h-20 mb-4 rounded" />}
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="text-sm w-full text-black" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-all">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
