/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

// Admin Pages
import { AdminLogin } from './admin/Login';
import { AdminDashboard } from './admin/Dashboard';

function MainSite() {
  return (
    <div className="min-h-screen bg-transparent text-text-main selection:bg-accent selection:text-white flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PortfolioGallery />
        <Process />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 300);
    const removeTimer = setTimeout(() => setIsLoading(false), 500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const fetchFavicon = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'favicon_url')
        .single()
      if (data?.value) {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
        if (!link) {
          link = document.createElement('link')
          link.rel = 'icon'
          document.head.appendChild(link)
        }
        link.href = data.value
      }
    }
    fetchFavicon()
  }, [])

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#F2F2F2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            opacity: isFading ? 0 : 1,
            transition: 'opacity 400ms ease-in-out',
            pointerEvents: isFading ? 'none' : 'auto',
          }}
        >
          <style>
            {`
              @keyframes inline-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid #FF4D00',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'inline-spin 1s linear infinite',
            }}
          />
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </>
  );
}
