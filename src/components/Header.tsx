'use client';

<<<<<<< HEAD
import { useState } from 'react';
import Link from 'next/link';
import { User, Euro } from 'lucide-react';
import LoginModal from './LoginModal';
import LanguageDropdown from './LanguageDropdown';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="bg-green-500 shadow-sm">
      <div className="h-12 flex items-center px-1">
        <div className="flex items-center gap-4 ml-1">
          <Link href="/" className="flex items-baseline">
            <span className="text-[17px] font-bold text-white">gurbet</span>
            <span className="text-[17px] font-bold text-black">biz</span>
          </Link>
          <div className="flex items-center gap-1">
            <Euro className="w-4 h-4 text-white" />
            <span className="text-[14px] font-medium text-white">EURO: 44.50 TL</span>
          </div>
        </div>
        <nav className="flex items-center gap-1 ml-auto mr-8">
          <LanguageDropdown />
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-2 px-1.5 py-1 hover:bg-green-400 rounded-sm"
          >
            <User className="w-5 h-5 text-white" />
            <span className="text-[15px] text-white">Giriş Yap</span>
          </button>
        </nav>
      </div>

      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      )}
    </div>
  );
}
=======
import Link from 'next/link';
import { User, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getEuroRate } from '@/services/exchangeRate';
import LoginModal from './LoginModal';

export default function Header() {
  const [rate, setRate] = useState<number>(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'same'>('same');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const updateRate = async () => {
    const newRate = await getEuroRate();
    setTrend(newRate > rate ? 'up' : newRate < rate ? 'down' : 'same');
    setRate(newRate);
  };

  useEffect(() => {
    // İlk yüklenmede kuru çek
    updateRate();

    // Her 5 dakikada bir güncelle
    const interval = setInterval(updateRate, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="bg-green-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3.5">
            <div className="flex items-center gap-2">
              <TrendingDown className={`w-5 h-5 transition-transform ${trend === 'up' ? 'rotate-180' : ''}`} />
              <span className="text-sm font-medium">
                DÖVİZ € = {rate.toFixed(2)} TL
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <div className="overflow-hidden rounded-full w-[20px] h-[20px]">
                  <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" fill="#E30A17"/>
                    <circle cx="13" cy="15" r="7" fill="#ffffff"/>
                    <circle cx="14.5" cy="15" r="6" fill="#E30A17"/>
                    <path d="M17.5 15L20 13.5L20 16.5L17.5 15Z" fill="#ffffff"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">TR</span>
              </div>
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1 text-sm font-medium hover:text-gray-100 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Giriş yap</span>
              </button>
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
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
