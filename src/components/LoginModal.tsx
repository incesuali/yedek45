'use client';

import { useState } from 'react';
<<<<<<< HEAD
import Image from 'next/image';
import { X } from 'lucide-react';
=======
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
<<<<<<< HEAD
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Burada gerçek API çağrısı yapılacak
      // Şimdilik simüle ediyoruz
      if (formData.email && formData.password) {
        // Başarılı giriş simülasyonu
        await new Promise(resolve => setTimeout(resolve, 1000));
        onClose();
        router.push('/hesabim');
      } else {
        setError('Lütfen tüm alanları doldurun');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-[28px] font-bold mb-6">Giriş Yap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-[13px]">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-[17px] text-gray-700 mb-1.5">E-posta</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8FAFD] border-0 text-[16px]"
              placeholder="test@gurbet.biz"
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Test hesabı kontrolü
    if (email === 'test@gurbet.biz' && password === 'test123') {
      // Başarılı giriş
      onClose();
      router.push('/hesabim');
    } else {
      // Hata durumu
      alert('Geçersiz kullanıcı adı veya şifre!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
        {/* Kapatma Butonu */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Başlık */}
        <h2 className="text-xl font-bold mb-4">Giriş Yap</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@gurbet.biz"
              className="w-full px-3 py-2 rounded-xl bg-blue-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
              required
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-[17px] text-gray-700 mb-1.5">Şifre</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#F8FAFD] border-0 text-[16px]"
=======
            <label className="block text-gray-700 mb-1 text-sm">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-blue-50 border-0 focus:ring-2 focus:ring-green-500 text-sm"
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
              required
            />
          </div>

          <button
            type="submit"
<<<<<<< HEAD
            disabled={isLoading}
            className={`w-full py-3 bg-[#3BB54A] text-white rounded-lg hover:bg-[#35A443] transition-colors text-[16px] font-medium ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-[15px]">
            Hesabın yok mu?{' '}
            <a href="#" className="text-[#3BB54A] hover:text-[#35A443] font-medium">
              Üye Ol
            </a>
          </span>
        </div>

        <div className="mt-6 text-center relative">
          <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gray-200"></div>
          <span className="relative bg-white px-4 text-[15px] text-gray-500">
            veya sosyal medya ile devam et
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <button 
            type="button"
            className="w-full py-2.5 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="text-[15px] text-gray-700">Google ile devam et</span>
          </button>

          <button 
            type="button"
            className="w-full py-2.5 px-4 bg-[#1877F2] text-white rounded-lg flex items-center justify-center gap-3 hover:bg-[#1865F2] transition-colors"
          >
            <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
            <span className="text-[15px]">Facebook ile devam et</span>
          </button>
        </div>

        <div className="mt-6 text-center text-[13px] text-gray-500">
          Kişisel verileriniz{' '}
          <a href="#" className="text-[#3BB54A] hover:underline">
            Ticari Elektronik İleti Açık Rıza Metni
          </a>{' '}
          kapsamında işleniyor. Üye olarak{' '}
          <a href="#" className="text-[#3BB54A] hover:underline">
            gurbet.biz Kullanım Şartları
          </a>
          'nı kabul ettiğinizi onaylamış olursunuz.
        </div>
      </div>
    </div>
  );
}
=======
            className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition-colors text-sm"
          >
            Giriş Yap
          </button>
        </form>

        {/* Üyelik Linki */}
        <div className="text-center mt-4 text-sm">
          <span className="text-gray-600">Hesabın yok mu? </span>
          <Link href="/uye-ol" className="text-green-500 hover:text-green-600">
            Üye Ol
          </Link>
        </div>

        {/* Sosyal Medya Girişi */}
        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">
                veya sosyal medya ile devam et
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              <Image
                src="/images/google.svg"
                alt="Google"
                width={16}
                height={16}
              />
              <span>Google ile devam et</span>
            </button>

            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#1877F2] text-white rounded-xl hover:bg-[#1865F2] transition-colors text-sm"
            >
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={16}
                height={16}
              />
              <span>Facebook ile devam et</span>
            </button>
          </div>
        </div>

        {/* Gizlilik Bildirimi */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Kişisel verileriniz{' '}
          <Link href="/ticari-elektronik-ileti" className="text-green-500 hover:underline">
            Ticari Elektronik İleti Açık Rıza Metni
          </Link>
          {' '}kapsamında işleniyor. Üye olarak{' '}
          <Link href="/kullanim-sartlari" className="text-green-500 hover:underline">
            gurbet.biz Kullanım Şartları
          </Link>
          'nı kabul ettiğinizi onaylamış olursunuz.
        </p>
      </div>
    </div>
  );
} 
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
