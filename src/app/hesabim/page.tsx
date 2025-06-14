'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import AccountSidebar from '@/components/AccountSidebar';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import DeleteAccountModal from '@/components/DeleteAccountModal';
import { useSession } from 'next-auth/react';

export default function HesabimPage() {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', // Başlangıçta boş olacak
    countryCode: '',
    phone: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    identityNumber: '',
    isForeigner: false,
    marketingConsent: false
  });

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

  // Basit oturum kontrolü
  useEffect(() => {
    // Burada gerçek oturum kontrolü yapılacak
    // Şimdilik simüle ediyoruz
    const isLoggedIn = true; // localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  // Kullanıcı bilgilerini getir
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/update');
        if (!response.ok) {
          throw new Error('Kullanıcı bilgileri getirilemedi');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Kullanıcı bilgileri getirme hatası:', error);
        // Hata durumunda mevcut formData'yı koru
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      // Session'ı güncelle
      if (update) {
        await update();
      } else {
        router.refresh();
      }

      toast.success('Bilgileriniz başarıyla kaydedildi');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bilgiler kaydedilirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hesap Bilgileri</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Satır: Ad, Soyad, TC Kimlik No */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TC Kimlik No</label>
                  <input
                    type="text"
                    value={formData.identityNumber}
                    onChange={(e) => setFormData({...formData, identityNumber: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    maxLength={11}
                    disabled={formData.isForeigner}
                  />
                  <div className="mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isForeigner}
                        onChange={(e) => {
                          const isForeigner = e.target.checked;
                          setFormData({
                            ...formData,
                            isForeigner,
                            identityNumber: isForeigner ? '' : formData.identityNumber
                          });
                        }}
                        className="rounded text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">TC Vatandaşı Değil</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 2. Satır: Doğum Tarihi, Ülke Kodu + Cep Telefonu, Cinsiyet */}
              <div className="grid grid-cols-3 gap-8">
                {/* Doğum Tarihi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doğum Tarihi</label>
                  <div className="flex gap-1 min-w-[220px]">
                    <select
                      value={formData.birthDay}
                      onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                      className="w-12 px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Gün</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                      className="w-20 px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Ay</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={formData.birthYear}
                      onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                      className="w-20 px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Yıl</option>
                      {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Ülke Kodu + Cep Telefonu */}
                <div>
                  <div className="flex gap-6 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ülke Kodu</label>
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                        className="w-20 px-2 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Seç</option>
                        <option value="+90">+90</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+49">+49</option>
                        <option value="+33">+33</option>
                        <option value="+971">+971</option>
                        <option value="+20">+20</option>
                        <option value="+98">+98</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cep Telefonu</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                {/* Cinsiyet */}
                <div className="flex flex-col justify-end pb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cinsiyet</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span>Erkek</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="text-green-500 focus:ring-green-500"
                      />
                      <span>Kadın</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* E-posta */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                </div>
              </div>

              {/* Butonlar */}
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
    </main>
  );
} 