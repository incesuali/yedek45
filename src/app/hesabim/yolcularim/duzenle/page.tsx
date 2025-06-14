'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import AccountSidebar from '@/components/AccountSidebar';

// Form bileşeni
function PassengerForm({
  initialData,
  onSubmit,
  isLoading
}: {
  initialData: any;
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const years = Array.from({ length: 100 }, (_, i) => String(2024 - i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Ad Soyad */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Ad</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Soyad</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            required
          />
        </div>
      </div>

      {/* TC Kimlik */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">TC Kimlik No</label>
        <input
          type="text"
          value={formData.identityNumber || ''}
          onChange={(e) => setFormData({ ...formData, identityNumber: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          maxLength={11}
        />
        <div className="mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isForeigner}
              onChange={(e) => setFormData({ ...formData, isForeigner: e.target.checked })}
              className="w-4 h-4 rounded text-green-500 focus:ring-green-500/20"
            />
            <span className="text-sm text-gray-600">TC Vatandaşı Değil</span>
          </label>
        </div>
      </div>

      {/* Doğum Tarihi */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Doğum Tarihi</label>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={formData.birthDay}
            onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            required
          >
            <option value="">Gün</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select
            value={formData.birthMonth}
            onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            required
          >
            <option value="">Ay</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select
            value={formData.birthYear}
            onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            required
          >
            <option value="">Yıl</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Cep Telefonu</label>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <select
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              <option value="+90">🇹🇷 +90</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+43">🇦🇹 +43</option>
              <option value="+41">🇨🇭 +41</option>
            </select>
          </div>
          <div className="col-span-4">
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              placeholder="555 666 77 77"
            />
          </div>
        </div>
      </div>

      {/* Cinsiyet */}
      <div>
        <label className="block text-sm text-gray-600 mb-2">Cinsiyet</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={formData.gender === 'male'}
              onChange={() => setFormData({ ...formData, gender: 'male' })}
              className="w-4 h-4 text-green-500 focus:ring-green-500/20"
              required
            />
            <span className="text-gray-600">Erkek</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={formData.gender === 'female'}
              onChange={() => setFormData({ ...formData, gender: 'female' })}
              className="w-4 h-4 text-green-500 focus:ring-green-500/20"
              required
            />
            <span className="text-gray-600">Kadın</span>
          </label>
        </div>
      </div>

      {/* Pasaport ve Mil Kart */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, hasPassport: !formData.hasPassport })}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>{formData.hasPassport ? 'Pasaport Bilgileri' : 'Pasaport Ekle'}</span>
        </button>
        {formData.hasPassport && (
          <div className="pl-7 space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Pasaport Numarası</label>
              <input
                type="text"
                value={formData.passportNumber || ''}
                onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Son Geçerlilik Tarihi</label>
              <input
                type="date"
                value={formData.passportExpiry || ''}
                onChange={(e) => setFormData({ ...formData, passportExpiry: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setFormData({ ...formData, hasMilCard: !formData.hasMilCard })}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>{formData.hasMilCard ? 'Mil Kart Bilgileri' : 'Mil Kart Ekle'}</span>
        </button>
        {formData.hasMilCard && (
          <div className="pl-7">
            <label className="block text-sm text-gray-600 mb-1">Mil Kart Numarası</label>
            <input
              type="text"
              value={formData.milCardNumber || ''}
              onChange={(e) => setFormData({ ...formData, milCardNumber: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
        )}
      </div>

      {/* Bilgilendirme */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
        <div className="w-5 h-5 text-gray-400">ℹ️</div>
        <p>
          gurbet.biz, kendi haricindeki yolcuların bilgilerini kaydeden kullanıcıların bu verileri kaydetmeye yetkili olduğunu, ilgili kişiyi bilgilendirdiğini ve onayını aldığını varsayar.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}

// Ana sayfa bileşeni
export default function YolcuDuzenlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const passengerId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState({
    firstName: '',
    lastName: '',
    identityNumber: '',
    isForeigner: false,
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    countryCode: '+90',
    phone: '',
    gender: 'male',
    hasMilCard: false,
    hasPassport: false,
    passportNumber: '',
    passportExpiry: '',
    milCardNumber: ''
  });

  useEffect(() => {
    const fetchPassenger = async () => {
      if (!passengerId) return;

      try {
        const response = await fetch(`/api/passengers/${passengerId}`);
        if (!response.ok) {
          throw new Error('Yolcu bilgileri getirilemedi');
        }
        const data = await response.json();
        setInitialFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          identityNumber: data.identityNumber || '',
          isForeigner: data.isForeigner || false,
          birthDay: data.birthDay || '',
          birthMonth: data.birthMonth || '',
          birthYear: data.birthYear || '',
          countryCode: data.countryCode || '+90',
          phone: data.phone || '',
          gender: data.gender || 'male',
          hasMilCard: data.hasMilCard || false,
          hasPassport: data.hasPassport || false,
          passportNumber: data.passportNumber || '',
          passportExpiry: data.passportExpiry ? data.passportExpiry.substring(0, 10) : '',
          milCardNumber: data.milCardNumber || ''
        });
      } catch (error) {
        console.error('Yolcu bilgileri getirme hatası:', error);
        toast.error('Yolcu bilgileri getirilemedi');
      }
    };

    fetchPassenger();
  }, [passengerId]);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);

    try {
      const url = passengerId 
        ? `/api/passengers/${passengerId}`
        : '/api/passengers';
      
      const method = passengerId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Bir hata oluştu');
      }

      toast.success(passengerId ? 'Yolcu bilgileri güncellendi' : 'Yeni yolcu eklendi');
      router.push('/hesabim/yolcularim');
    } catch (error) {
      console.error('Form gönderme hatası:', error);
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
          
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Link 
                href="/hesabim/yolcularim"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl text-gray-700 font-medium">
                {passengerId ? 'Yolcu Bilgilerini Düzenle' : 'Yeni Yolcu Ekle'}
              </h1>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <PassengerForm
                initialData={initialFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 