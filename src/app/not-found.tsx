'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 text-center">
            Sayfa Bulunamadı
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
} 