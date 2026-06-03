import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function TransformationsAdmin() {
  const [title, setTitle] = useState('');
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeImage || !afterImage || !title) {
      toast.error('দয়া করে Title এবং দুটি ছবিই সিলেক্ট করুন!');
      return;
    }

    setUploading(true);
    const toastId = toast.loading('ছবি আপলোড হচ্ছে...');

    try {
      // ১. Before Image আপলোড
      const beforeExt = beforeImage.name.split('.').pop();
      const beforeFileName = `${Date.now()}_before.${beforeExt}`;
      const { error: beforeError } = await supabase.storage
        .from('transformations')
        .upload(beforeFileName, beforeImage);
      if (beforeError) throw beforeError;

      // ২. After Image আপলোড
      const afterExt = afterImage.name.split('.').pop();
      const afterFileName = `${Date.now()}_after.${afterExt}`;
      const { error: afterError } = await supabase.storage
        .from('transformations')
        .upload(afterFileName, afterImage);
      if (afterError) throw afterError;

      // ৩. পাবলিক URL জেনারেট করা
      const beforeUrl = supabase.storage.from('transformations').getPublicUrl(beforeFileName).data.publicUrl;
      const afterUrl = supabase.storage.from('transformations').getPublicUrl(afterFileName).data.publicUrl;

      // ৪. ডাটাবেসে সেভ করা
      const { error: dbError } = await supabase
        .from('transformations')
        .insert([{ 
          title: title, 
          before_image_url: beforeUrl, 
          after_image_url: afterUrl 
        }]);
      
      if (dbError) throw dbError;

      toast.success('সফলভাবে আপলোড হয়েছে!', { id: toastId });
      
      // ফর্ম রিসেট
      setTitle('');
      setBeforeImage(null);
      setAfterImage(null);

    } catch (error: any) {
      toast.error(`আপলোড ফেইল্ড: ${error.message}`, { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Transformation</h2>
      
      <form onSubmit={handleUpload} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title (e.g. MrBeast Style)</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent outline-none"
            placeholder="Enter thumbnail title..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <label className="block text-sm font-bold text-gray-700 mb-2">📸 Before Image (Raw)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setBeforeImage(e.target.files?.[0] || null)}
              className="text-sm w-full"
            />
          </div>

          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <label className="block text-sm font-bold text-gray-700 mb-2">✨ After Image (Final)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setAfterImage(e.target.files?.[0] || null)}
              className="text-sm w-full"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all"
        >
          {uploading ? 'Uploading Data...' : 'Upload Transformation'}
        </button>
      </form>
    </div>
  );
}
