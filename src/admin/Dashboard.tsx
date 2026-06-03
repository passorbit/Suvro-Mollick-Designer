import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import { PortfolioManager } from './pages/PortfolioManager';
import { TransformationsAdmin } from './TransformationsAdmin';
import { TestimonialsManager } from './pages/TestimonialsManager';
import { SettingsManager } from './pages/SettingsManager';
import { ProcessManager } from './pages/ProcessManager';
import { Layout } from './components/Layout';

export function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session && location.pathname.startsWith('/admin')) {
        navigate('/admin/login');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && location.pathname.startsWith('/admin')) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="portfolio" replace />} />
        <Route path="dashboard" element={<Navigate to="portfolio" replace />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="/transformations" element={<TransformationsAdmin />} />
        <Route path="process" element={<ProcessManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Routes>
    </Layout>
  );
}
