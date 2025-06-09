'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { User, Edit, Trash2 } from 'lucide-react';

export default function YolcularimPage() {
  const passengers = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      tcNo: '12345678901',
      birthDate: '01.01.1990',
      type: 'Yetişkin'
    },
    {
      id: 2,
      name: 'Ayşe Yılmaz',
      tcNo: '12345678902',
      birthDate: '01.01.1995',
      type: 'Yetişkin'
    },
    {
      id: 3,
      name: 'Ali Yılmaz',
      tcNo: '12345678903',
      birthDate: '01.01.2015',
      type: 'Çocuk'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Yolcularım</h1>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Yeni Yolcu Ekle</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {passengers.map((passenger) => (
                <div 
                  key={passenger.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{passenger.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          <span>TC: {passenger.tcNo}</span>
                          <span>•</span>
                          <span>{passenger.birthDate}</span>
                          <span>•</span>
                          <span>{passenger.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 