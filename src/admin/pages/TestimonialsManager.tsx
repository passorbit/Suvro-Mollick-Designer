import { useEffect, useState } from 'react';
import { supabase, Testimonial } from '../../lib/supabase';
import { Trash2, Plus, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState('5');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('id, client_name, client_role, avatar_url, quote, rating, published, sort_order')
      .order('sort_order', { ascending: true })

    console.log('testimonials data:', data)
    console.log('testimonials error:', error)

    if (error) {
      console.error('Fetch testimonials error details:', error.message, error.details);
      setItems([]);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    const { error } = await supabase.from('testimonials').insert([
      { 
        client_name: name,
        client_role: role,
        avatar_url: avatarUrl || null,
        quote: quote,
        rating: parseInt(rating),
      }
    ]);

    if (error) {
      console.error('Add testimonial error:', error);
      toast.error(error.message);
    } else {
      toast.success('Added successfully');
      setName('');
      setRole('');
      setAvatarUrl('');
      setQuote('');
      setRating('5');
      fetchItems();
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('testimonials').update({ published: !currentStatus }).eq('id', id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Status updated');
      fetchItems();
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Deleted successfully');
      fetchItems();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading mb-8">Testimonials Manager</h1>

      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Testimonial</h2>
        <form onSubmit={addItem} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Client Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role (e.g. Youtuber)</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar URL (Optional)</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              >
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Quote *</label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={3}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white resize-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Plus size={18} /> Add Testimonial
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No testimonials found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-medium text-gray-400">Client</th>
                <th className="p-4 font-medium text-gray-400">Quote</th>
                <th className="p-4 font-medium text-gray-400">Status</th>
                <th className="p-4 font-medium text-gray-400 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {item.avatar_url ? (
                        <img src={item.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover bg-black" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          {item.client_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{item.client_name}</div>
                        <div className="text-xs text-gray-400">{item.client_role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="line-clamp-2 text-sm text-gray-300 max-w-xs" title={item.quote}>
                      "{item.quote}"
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublished(item.id, item.published)}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${item.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
                    >
                      {item.published ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
