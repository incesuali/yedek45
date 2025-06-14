'use client';

import Link from 'next/link';
import { User, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getEuroRate } from '@/services/exchangeRate';
import LoginModal from './LoginModal';
import LanguageDropdown from './LanguageDropdown';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [rate, setRate] = useState<number>(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'same'>('same');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data: session, status } = useSession();
  
  useEffect(() => {
    // İlk yüklenmede kuru çek
    updateRate();

    // Her 5 dakikada bir güncelle
    const interval = setInterval(updateRate, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateRate = async () => {
    const newRate = await getEuroRate();
    setTrend(newRate > rate ? 'up' : newRate < rate ? 'down' : 'same');
    setRate(newRate);
  };

  return (
    <>
      <header className="bg-green-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3.5">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-baseline mr-4">
                <span className="text-[17px] font-bold text-white">gurbet</span>
                <span className="text-[17px] font-bold text-black">biz</span>
              </Link>
              <TrendingDown className={`w-5 h-5 transition-transform ${trend === 'up' ? 'rotate-180' : ''}`} />
              <span className="text-sm font-medium">
                DÖVİZ € = {rate.toFixed(2)} TL
              </span>
            </div>
            <div className="flex items-center gap-6">
              <LanguageDropdown />
              {status === 'authenticated' && session?.user ? (
                <>
                  <Link 
                    href="/hesabim"
                    className="flex items-center gap-1 text-sm font-medium hover:text-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{
                      (session.user as any).firstName || session.user.name || session.user.email
                    }</span>
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="ml-2 text-sm text-white underline hover:text-gray-200"
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1 text-sm font-medium hover:text-gray-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Giriş yap</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
