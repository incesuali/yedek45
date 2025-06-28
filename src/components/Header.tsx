'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, TrendingDown } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';
import LoginModal from './LoginModal';
import { getEuroRate } from '@/services/exchangeRate';

export default function Header() {
    const { data: session, status } = useSession();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [euroRate, setEuroRate] = useState<number | null>(null);

    useEffect(() => {
        const fetchRate = async () => {
            const rate = await getEuroRate();
            setEuroRate(rate);
        };
        fetchRate();
    }, []);

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <>
            <header className="bg-green-500 text-white relative z-50">
                <div className="px-4">
                    <div className="flex justify-between items-center py-3.5">
                        <div className="flex items-center gap-2">
                             <Link href="/" className="flex items-baseline mr-4">
                                <span className="text-[17px] font-bold text-white">gurbet</span>
                                <span className="text-[17px] font-bold text-black">biz</span>
                            </Link>
                            {euroRate !== null && (
                                <>
                                    <TrendingDown className="w-5 h-5 transition-transform " />
                                    <span className="text-sm font-medium">DÖVİZ € = {euroRate.toFixed(2)} TL</span>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-6">
                            <LanguageDropdown />
                            {status === 'authenticated' ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/hesabim" className="flex items-center gap-1 text-sm font-medium hover:text-gray-100 transition-colors">
                                        <User className="w-5 h-5" />
                                        <span>Hesabım</span>
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center gap-1 text-sm font-medium hover:text-gray-100 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                        <span>Çıkış Yap</span>
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-1 text-sm font-medium hover:text-gray-100 transition-colors">
                                    <User className="w-5 h-5" />
                                    <span>Giriş yap</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />}
        </>
    );
}
