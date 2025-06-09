'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Burada login işlemi yapılacak
      console.log('Login attempt:', formData);
      router.push('/hesabim');
    } catch (err) {
      setError('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-5">Giriş Yap</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {error && (
                  <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600"
                    placeholder="Email adresi"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email adresi
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600"
                    placeholder="Şifre"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Şifre
                  </label>
                </div>
                <div className="relative">
                  <button 
                    type="submit"
                    className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full"
                  >
                    Giriş Yap
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 text-center">
              <span className="text-gray-600">Hesabın yok mu? </span>
              <a href="/kayit" className="text-green-600 font-medium hover:text-green-700">
                Üye Ol
              </a>
            </div>

            <div className="mt-8 text-center relative">
              <span className="px-4 bg-white text-gray-500 relative z-10">
                veya sosyal medya ile devam et
              </span>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-1"></div>
            </div>

            <div className="mt-6 space-y-4">
              <button 
                type="button"
                className="w-full py-3 px-4 border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <span className="text-gray-700">Google ile devam et</span>
              </button>

              <button 
                type="button"
                className="w-full py-3 px-4 bg-[#1877F2] text-white rounded-xl flex items-center justify-center gap-3 hover:bg-[#1865F2] transition-colors"
              >
                <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
                <span>Facebook ile devam et</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 