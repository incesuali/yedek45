'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import AccountSidebar from '@/components/AccountSidebar';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import { useSession } from 'next-auth/react';
import PriceAlertsPage from './price-alerts';
import { User } from '@prisma/client';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  birthDay: string | number;
  birthMonth: string | number;
  birthYear: string | number;
  gender: string;
  identityNumber: string;
  isForeigner: boolean;
}

export default function HesabimPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  const [userData, setUserData] = useState<Partial<UserData>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+90',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    identityNumber: '',
    isForeigner: false,
  });
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris');
    } else if (status === 'authenticated' && session.user) {
      const user = session.user as any;
      setUserData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        countryCode: user.countryCode || '+90',
        birthDay: user.birthDay ? parseInt(user.birthDay, 10) : '',
        birthMonth: user.birthMonth ? parseInt(user.birthMonth, 10) : '',
        birthYear: user.birthYear ? parseInt(user.birthYear, 10) : '',
        gender: user.gender || '',
        identityNumber: user.identityNumber || '',
        isForeigner: user.isForeigner || false,
      });
    }
  }, [session, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('Bilgileriniz başarıyla güncellendi.');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Bir hata oluştu.');
      }
    } catch (error) {
      toast.error('Güncelleme sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Yükleniyor...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hesap Bilgileri</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TC Kimlik No</label>
                  <input
                    type="text"
                    name="identityNumber"
                    value={userData.identityNumber || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    maxLength={11}
                    disabled={userData.isForeigner}
                  />
                  <div className="mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isForeigner"
                        checked={userData.isForeigner}
                        onChange={handleChange}
                        className="rounded text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">TC Vatandaşı Değil</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi</label>
                  <div className="flex gap-1 min-w-[220px]">
                    <select
                      name="birthDay"
                      value={userData.birthDay || ''}
                      onChange={handleChange}
                      className="w-12 px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Gün</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      name="birthMonth"
                      value={userData.birthMonth || ''}
                      onChange={handleChange}
                      className="w-20 px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Ay</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      name="birthYear"
                      value={userData.birthYear || ''}
                      onChange={handleChange}
                      className="w-20 px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Yıl</option>
                      {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ülke Kodu</label>
                      <select
                        name="countryCode"
                        value={userData.countryCode || '+90'}
                        onChange={handleChange}
                        className="w-32 px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                      >
                        <option value="+90">🇹🇷 TR (+90)</option>
                        <option value="+49">🇩🇪 DE (+49)</option>
                        <option value="+44">🇬🇧 UK (+44)</option>
                        <option value="+33">🇫🇷 FR (+33)</option>
                        <option value="+32">🇧🇪 BE (+32)</option>
                        <option value="+31">🇳🇱 NL (+31)</option>
                        <option value="+41">🇨🇭 CH (+41)</option>
                        <option value="+45">🇩🇰 DK (+45)</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cep Telefonu</label>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end pb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cinsiyet</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={userData.gender === 'male'}
                        onChange={handleChange}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span>Erkek</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userData.gender === 'female'}
                        onChange={handleChange}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span>Kadın</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    <span className="text-sm">Pasaport Ekle</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    <span className="text-sm">Mil Kart Ekle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    <span className="text-sm">Şifre Değiştir</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteAccountModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50"
                  >
                    <span className="text-sm">Hesabı Sil</span>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />

      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
      />

      <PriceAlertsPage />
    </main>
  );
} 