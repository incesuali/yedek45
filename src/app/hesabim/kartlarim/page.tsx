'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

export default function KartlarimPage() {
  const cards = [
    {
      id: 1,
      name: 'Ziraat Bankası',
      number: '**** **** **** 1234',
      expiry: '12/25',
      type: 'Kredi Kartı'
    },
    {
      id: 2,
      name: 'İş Bankası',
      number: '**** **** **** 5678',
      expiry: '08/24',
      type: 'Kredi Kartı'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Kayıtlı Kartlarım</h1>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Kart Ekle</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {cards.map((card) => (
                <div 
                  key={card.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors relative group"
                >
                  <button 
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{card.name}</h3>
                      <p className="text-gray-500 mt-1">{card.type}</p>
                      <div className="mt-4 space-y-1">
                        <p className="font-medium">{card.number}</p>
                        <p className="text-sm text-gray-500">Son Kullanma: {card.expiry}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Kart bilgileriniz güvenli bir şekilde saklanmaktadır. 
                Kartlarınızı dilediğiniz zaman silebilir veya yeni kart ekleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 