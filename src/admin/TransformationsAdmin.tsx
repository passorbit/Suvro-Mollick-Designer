import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { Trash2 } from 'lucide-react'; // ডিলিট আইকনের জন্য

export function TransformationsAdmin() {
  const [title, setTitle] = useState('');
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]); // আপলোড করা আইটেম রাখার State

  // ডাটাবেস থেকে আইটেমগুলো নিয়ে আসার ফাংশন
  const fetchItems = async () => {
    const { data } = await supabase.from('transformations').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  };

  // পেজ লোড হলে আইটেমগুলো দেখাবে
  useEffect(() => {
    fetchItems();
  }, []);

  // আপলোড ফাংশন
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeImage || !afterImage || !title) {
      toast.error('দয়া করে Title এবং দুটি ছবিই সিলেক্ট করুন!');
      return;
    }

    setUploading(true);
    const toastId = toast.loading('ছবি আপলোড হচ্ছে...');

    try {
      const beforeExt = beforeImage.name.split('.').pop();
      const beforeFileName = `${Date.now()}_before.${beforeExt}`;
      const { error: beforeError } = await supabase.storage.from('transformations').upload(beforeFileName, beforeImage);
      if (beforeError) throw beforeError;

      const afterExt = afterImage.name.split('.').pop();
      const afterFileName = `${Date.now()}_after.${afterExt}`;
      const { error: afterError } = await supabase.storage.from('transformations').upload(afterFileName, afterImage);
      if (afterError) throw afterError;

      const beforeUrl = supabase.storage.from('transformations').getPublicUrl(beforeFileName).data.publicUrl;
      const afterUrl = supabase.storage.from('transformations').getPublicUrl(afterFileName).data.publicUrl;

      const { error: dbError } = await supabase.from('transformations').insert([{ title, before_image_url: beforeUrl, after_image_url: afterUrl }]);
      if (dbError) throw dbError;

      toast.success('সফলভাবে আপলোড হয়েছে!', { id: toastId });
      setTitle(''); setBeforeImage(null); setAfterImage(null);
      
      fetchItems(); // আপলোড হওয়ার পর লিস্ট আপডেট হবে

    } catch (error: any) {
      toast.error(`আপলোড ফেইল্ড: ${error.message}`, { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  // ডিলিট করার ফাংশন
  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) return;
    
    const toastId = toast.loading('ডিলিট হচ্ছে...');
    try {
      const { error } = await supabase.from('transformations').delete().eq('id', id);
      if (error) throw error;
      
      toast.success('সফলভাবে ডিলিট হয়েছে!', { id: toastId });
      fetchItems(); // ডিলিট হওয়ার পর লিস্ট আপডেট হবে
    } catch (error: any) {
      toast.error(`ডিলিট ফেইল্ড: ${error.message}`, { id: toastId });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-10">
      
      {/* আপলোড ফর্ম সেকশন */}
      <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Transformation</h2>
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title (e.g. Podcast Thumbnail)</label>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none text-black bg-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-2">📸 Before Image</label>
              <input type="file" accept="image/*" onChange={(e) => setBeforeImage(e.target.files?.[0] || null)} className="text-sm w-full text-black" />
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-2">✨ After Image</label>
              <input type="file" accept="image/*" onChange={(e) => setAfterImage(e.target.files?.[0] || null)} className="text-sm w-full text-black" />
            </div>
          </div>
          <button type="submit" disabled={uploading} className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all cursor-pointer">
            {uploading ? 'Uploading Data...' : 'Upload Transformation'}
          </button>
        </form>
      </div>

      {/* ম্যানেজ বা ডিলিট সেকশন */}
      <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Manage Transformations</h2>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No transformations added yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                <div className="flex items-center gap-4">
                  <img src={item.after_image_url} alt={item.title} className="w-16 h-10 object-cover rounded shadow-sm" />
                  <span className="font-semibold text-gray-800">{item.title}</span>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
