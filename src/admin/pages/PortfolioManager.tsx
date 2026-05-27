import { useEffect, useState } from 'react';
import { supabase, PortfolioItem } from '../../lib/supabase';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // New item form
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [rowNumber, setRowNumber] = useState('1');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch portfolio items');
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    const { error } = await supabase.from('portfolio_items').insert([
      { image_url: imageUrl, title: title, row_number: parseInt(rowNumber) }
    ]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Added successfully');
      setImageUrl('');
      setTitle('');
      fetchItems();
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Deleted successfully');
      fetchItems();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading mb-8">Portfolio Manager</h1>

      <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={addItem} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
              placeholder="https://..."
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm text-gray-400 mb-1">Row</label>
            <select
              value={rowNumber}
              onChange={(e) => setRowNumber(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white"
            >
              <option value="1">Row 1</option>
              <option value="2">Row 2</option>
              <option value="3">Row 3</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 h-[42px]"
          >
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No items found. Add some above!</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-medium text-gray-400">Image</th>
                <th className="p-4 font-medium text-gray-400">Title</th>
                <th className="p-4 font-medium text-gray-400">Row</th>
                <th className="p-4 font-medium text-gray-400 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <img src={item.image_url} alt={item.title || 'Thumbnail'} className="w-24 h-14 object-cover rounded bg-black" />
                  </td>
                  <td className="p-4">{item.title || '-'}</td>
                  <td className="p-4">Row {item.row_number}</td>
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
