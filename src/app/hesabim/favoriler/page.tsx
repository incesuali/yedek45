'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { Heart, ArrowRight, Calendar, Trash2 } from 'lucide-react';

export default function FavorilerPage() {
  const favorites = [
    {
      id: 1,
      type: 'route',
      from: 'İstanbul',
      to: 'Ankara',
      lastPrice: '450 TL',
      lastChecked: '10 Mart 2024'
    },
    {
      id: 2,
      type: 'destination',
      city: 'Antalya',
      country: 'Türkiye',
      lowestPrice: '380 TL',
      bestTime: 'Haziran - Eylül'
    },
    {
      id: 3,
      type: 'route',
      from: 'İzmir',
      to: 'Antalya',
      lastPrice: '380 TL',
      lastChecked: '9 Mart 2024'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-800">Favorilerim</h1>
            </div>
            
            <div className="space-y-4">
              {favorites.map((favorite) => (
                <div 
                  key={favorite.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  {favorite.type === 'route' ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Nereden</span>
                            <span className="font-medium">{favorite.from}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Nereye</span>
                            <span className="font-medium">{favorite.to}</span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Son Fiyat</span>
                          <span className="font-medium">{favorite.lastPrice}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Son Kontrol</span>
                          <span className="font-medium">{favorite.lastChecked}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Uçuşları Gör
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Destinasyon</span>
                          <span className="font-medium">{favorite.city}, {favorite.country}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">En Düşük Fiyat</span>
                          <span className="font-medium">{favorite.lowestPrice}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">En İyi Dönem</span>
                          <span className="font-medium">{favorite.bestTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Detayları Gör
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {favorites.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Henüz favori rotanız veya destinasyonunuz bulunmamaktadır.
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Favori rotalarınızı ve destinasyonlarınızı takip edebilir, fiyat değişikliklerini kolayca görebilirsiniz.
                Sık uçtuğunuz rotaları favorilerinize ekleyerek daha hızlı bilet alabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 