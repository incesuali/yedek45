'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  Plane, 
  Users, 
  Star, 
  CreditCard, 
  Receipt, 
  Search, 
  Bell, 
  Heart,
  LogOut 
} from 'lucide-react';

const menuItems = [
  { icon: User, label: 'Hesabım', href: '/hesabim' },
  { icon: Plane, label: 'Seyahatlerim', href: '/hesabim/seyahatlerim' },
  { icon: Users, label: 'Yolcularım', href: '/hesabim/yolcularim' },
  { icon: Star, label: 'Puanlarım', href: '/hesabim/puanlarim' },
  { icon: CreditCard, label: 'Kayıtlı Kartlarım', href: '/hesabim/kartlarim' },
  { icon: Receipt, label: 'Fatura Bilgilerim', href: '/hesabim/fatura' },
  { icon: Search, label: 'Aramalarım', href: '/hesabim/aramalarim' },
  { icon: Bell, label: 'Fiyat Alarmlarım', href: '/hesabim/alarmlar' },
  { icon: Heart, label: 'Favorilerim', href: '/hesabim/favoriler' },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-green-50 text-green-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="my-4 border-t border-gray-200" />

        <button 
          onClick={() => {/* Çıkış işlemi */}}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Çıkış</span>
        </button>
      </nav>
    </div>
  );
} 