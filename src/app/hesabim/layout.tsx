'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import { X } from 'lucide-react';
import AccountSidebar, { AccountSidebarItem } from '@/components/AccountSidebar';
import { useSession, signOut } from 'next-auth/react';
import { User, Plane, Users, Star, Receipt, Search, Bell, Heart } from 'lucide-react';

export default function HesabimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();
  const handleLogout = () => { signOut({ callbackUrl: '/' }); };
  // Menü itemlarını AccountSidebar'dan kopyaladık
  const menuItems: AccountSidebarItem[] = [
    { icon: User, label: 'Hesabım', href: '/hesabim' },
    { icon: Plane, label: 'Seyahatlerim', href: '/hesabim/seyahatlerim' },
    { icon: Users, label: 'Yolcularım', href: '/hesabim/yolcularim' },
    { icon: Star, label: 'Puanlarım', href: '/hesabim/puanlarim' },
    { icon: Receipt, label: 'Fatura Bilgilerim', href: '/hesabim/fatura' },
    { icon: Search, label: 'Aramalarım', href: '/hesabim/aramalarim' },
    { icon: Bell, label: 'Fiyat Alarmlarım', href: '/hesabim/alarmlar' },
    { icon: Heart, label: 'Favorilerim', href: '/hesabim/favoriler' },
  ];
  return (
    <div>
      <Header />
      {/* Mobil Slidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/40">
          <div className={`fixed right-0 top-0 h-full bg-white w-4/5 max-w-xs shadow-lg flex flex-col transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button className="absolute top-4 right-4 text-gray-700" onClick={() => setIsMenuOpen(false)}>
              <X className="w-7 h-7" />
            </button>
            <AccountSidebar items={menuItems} onLogout={handleLogout} isDrawer onItemClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="w-full h-full" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 flex gap-8">
          {/* Sadece masaüstünde sidebar */}
          <div className="hidden sm:block">
            <AccountSidebar items={menuItems} onLogout={handleLogout} />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 