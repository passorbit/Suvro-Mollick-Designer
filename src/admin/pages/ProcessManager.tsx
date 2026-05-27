import { useEffect, useState } from 'react';
import { supabase, ProcessStep } from '../../lib/supabase';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProcessManager() {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('Failed to fetch process steps');
    } else {
      setSteps(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (id: string, title: string, description: string) => {
    const { error } = await supabase
      .from('process_steps')
      .update({ title, description })
      .eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Step saved successfully');
      fetchSteps();
    }
  };

  const handleChange = (id: string, field: 'title' | 'description', value: string) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  if (loading) return <div className="text-gray-400">Loading process steps...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading mb-8">Process Manager</h1>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shrink-0">
                {step.step_number}
              </div>
              <h2 className="text-xl font-bold">Step {step.step_number}</h2>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => handleChange(step.id, 'title', e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white font-medium"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={step.description}
                onChange={(e) => handleChange(step.id, 'description', e.target.value)}
                rows={2}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 focus:border-white/30 text-white resize-none"
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                onClick={() => handleSave(step.id, step.title, step.description)}
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Save size={18} /> Save Step
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
