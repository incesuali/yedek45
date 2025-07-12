'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export interface AccountSidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface AccountSidebarProps {
  items: AccountSidebarItem[];
  onLogout: () => void;
  isDrawer?: boolean;
  onItemClick?: () => void;
}

export default function AccountSidebar({ items, onLogout, isDrawer = false, onItemClick }: AccountSidebarProps) {
  const pathname = usePathname();
  return (
    <div className={isDrawer ? 'w-full h-full bg-white p-4' : 'w-64 bg-white rounded-lg shadow-sm p-4'}>
      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-green-50 text-green-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={onItemClick}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="my-4 border-t border-gray-200" />
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Çıkış</span>
        </button>
      </nav>
    </div>
  );
} 