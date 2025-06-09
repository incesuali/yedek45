'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { Bell, ArrowRight, Calendar, Trash2, Plus } from 'lucide-react';

export default function AlarmlarPage() {
  const alerts = [
    {
      id: 1,
      from: 'İstanbul',
      to: 'Ankara',
      date: '15 Mart 2024',
      targetPrice: '400 TL',
      currentPrice: '450 TL',
      status: 'active'
    },
    {
      id: 2,
      from: 'İzmir',
      to: 'Antalya',
      date: '20 Mart 2024',
      targetPrice: '350 TL',
      currentPrice: '380 TL',
      status: 'active'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-800">Fiyat Alarmlarım</h1>
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Alarm Ekle</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Nereden</span>
                          <span className="font-medium">{alert.from}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Nereye</span>
                          <span className="font-medium">{alert.to}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Tarih</span>
                          <span className="font-medium">{alert.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Hedef Fiyat</span>
                        <span className="font-medium text-orange-600">{alert.targetPrice}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Güncel Fiyat</span>
                        <span className="font-medium">{alert.currentPrice}</span>
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
                </div>
              ))}
            </div>

            {alerts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aktif fiyat alarmınız bulunmamaktadır.
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Fiyat alarmı oluşturduğunuzda, belirlediğiniz fiyata ulaşıldığında size bildirim göndereceğiz.
                Dilediğiniz zaman alarmlarınızı düzenleyebilir veya silebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 