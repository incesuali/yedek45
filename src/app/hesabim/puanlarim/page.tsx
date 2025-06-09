'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';

export default function PuanlarimPage() {
  const pointsHistory = [
    {
      id: 1,
      type: 'earned',
      amount: 150,
      description: 'İstanbul - Ankara uçuşu',
      date: '15 Mart 2024'
    },
    {
      id: 2,
      type: 'spent',
      amount: 50,
      description: 'Ekstra bagaj hakkı',
      date: '10 Mart 2024'
    },
    {
      id: 3,
      type: 'earned',
      amount: 200,
      description: 'İzmir - Antalya uçuşu',
      date: '5 Mart 2024'
    }
  ];

  const totalPoints = pointsHistory.reduce((acc, curr) => {
    return curr.type === 'earned' ? acc + curr.amount : acc - curr.amount;
  }, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 space-y-6">
            {/* Puan Özeti */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Toplam Puanınız</h2>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">{totalPoints} Puan</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Puanlarınızı ekstra bagaj hakkı, koltuk seçimi ve daha fazla avantaj için kullanabilirsiniz.
              </p>
            </div>

            {/* Puan Geçmişi */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Puan Geçmişi</h2>
              
              <div className="space-y-4">
                {pointsHistory.map((record) => (
                  <div 
                    key={record.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        record.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {record.type === 'earned' ? (
                          <TrendingUp className={`w-5 h-5 text-green-600`} />
                        ) : (
                          <TrendingDown className={`w-5 h-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{record.description}</p>
                        <p className="text-sm text-gray-500">{record.date}</p>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      record.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {record.type === 'earned' ? '+' : '-'}{record.amount} Puan
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 