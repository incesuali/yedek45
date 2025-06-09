'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AccountSidebar from '@/components/AccountSidebar';

export default function HesabimPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+90',
    phone: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    isForeigner: false,
    marketingConsent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-gray-50">
<<<<<<< HEAD
=======
      <Header />
      
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Hesap Bilgileri</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ad Soyad TC */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TC Kimlik No</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* E-posta ve Doğum Tarihi */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex gap-2 w-1/2">
                    <div className="w-[60px]">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kod</label>
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                        className="w-full px-1 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 appearance-none text-sm"
                      >
                        <option value="+90">+90</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cep Telefonu</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500"
                        placeholder="_ _ _  _ _ _  _ _ _ _"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-24">
                    <select 
                      value={formData.birthDay}
                      onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                      className="w-full px-2 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Gün</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <select 
                      value={formData.birthMonth}
                      onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                      className="w-full px-2 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Ay</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <select 
                      value={formData.birthYear}
                      onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                      className="w-full px-2 py-2 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
                    >
                      <option value="">Yıl</option>
                      {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Cinsiyet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Cinsiyet</label>
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

              {/* TC Vatandaşı Değil */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isForeigner}
                    onChange={(e) => setFormData({...formData, isForeigner: e.target.checked})}
                    className="rounded text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">TC Vatandaşı Değil</span>
                </label>
              </div>

              {/* Pasaport ve Mil Kart */}
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
              </div>

              {/* Kampanya Onayı */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({...formData, marketingConsent: e.target.checked})}
                    className="rounded text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    İndirimler ve kampanyalardan
                    <span className="font-medium"> Rıza Metni </span>
                    kapsamında haberdar olmak istiyorum.
                  </span>
                </label>
              </div>

              {/* Alt Butonlar */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Hesap Sil
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Şifre Değiştir
                  </button>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 