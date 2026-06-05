import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
// 🛠️ User আইকনটি ইম্পোর্ট করা হলো
import { LayoutDashboard, Users, Settings, LogOut, Image, ListOrdered, Wand2, User } from 'lucide-react'; 
import toast from 'react-hot-toast';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
  };

  const navItems = [
    { name: 'Portfolio', path: '/admin/portfolio', icon: <Image size={20} /> },
    { name: 'Transformations', path: '/admin/transformations', icon: <Wand2 size={20} /> },
    // 🛠️ নতুন About Me মেন্যুটি এখানে যুক্ত করা হলো:
    { name: 'About Me', path: '/admin/about', icon: <User size={20} /> },
    { name: 'Process', path: '/admin/process', icon: <ListOrdered size={20} /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <Users size={20} /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1A1A] border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold font-heading">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#0A0A0A] p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
