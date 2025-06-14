'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import RegisterModal from './RegisterModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Geçersiz e-posta veya şifre!');
      } else {
        toast.success('Başarıyla giriş yapıldı!');
        onClose();
        router.push('/hesabim');
        router.refresh(); // Session'ı yenile
      }
    } catch (err) {
      toast.error('Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
            <div>
              <label className="block text-[17px] text-gray-700 mb-1.5">E-posta</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#F8FAFD] border-0 text-[16px]"
                placeholder="test@gurbet.biz"
                required
              />
            </div>

            <div>
              <label className="block text-[17px] text-gray-700 mb-1.5">Şifre</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#F8FAFD] border-0 text-[16px]"
                placeholder="123456"
                required
              />
            </div>

            <button
              type="submit"
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
              <button type="button" onClick={() => setIsRegisterOpen(true)} className="text-[#3BB54A] hover:text-[#35A443] font-medium underline">
                Üye Ol
              </button>
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
              onClick={() => signIn('google')}
              className="w-full py-2.5 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              <span className="text-[15px] text-gray-700">Google ile devam et</span>
            </button>

            <button 
              type="button"
              onClick={() => signIn('facebook')}
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
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
}
