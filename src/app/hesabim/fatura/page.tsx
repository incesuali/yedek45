'use client';

import AccountSidebar from '@/components/AccountSidebar';
import { Building2, Home, Plus, Trash2, Edit } from 'lucide-react';

export default function FaturaPage() {
  const addresses = [
    {
      id: 1,
      type: 'personal',
      title: 'Ev Adresi',
      name: 'Ahmet Yılmaz',
      tcNo: '12345678901',
      address: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:4',
      city: 'İstanbul',
      district: 'Kadıköy'
    },
    {
      id: 2,
      type: 'corporate',
      title: 'İş Adresi',
      companyName: 'ABC Teknoloji Ltd. Şti.',
      taxOffice: 'Kadıköy',
      taxNo: '1234567890',
      address: 'Kozyatağı Mah. İş Cad. No:45 K:3',
      city: 'İstanbul',
      district: 'Kadıköy'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Fatura Bilgilerim</h1>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Adres Ekle</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {addresses.map((address) => (
                <div 
                  key={address.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      {address.type === 'personal' ? (
                        <Home className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Building2 className="w-5 h-5 text-purple-600" />
                      )}
                      <h3 className="font-medium">{address.title}</h3>
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

                  <div className="mt-4 space-y-2 text-gray-600">
                    {address.type === 'personal' ? (
                      <>
                        <p>{address.name}</p>
                        <p>TC: {address.tcNo}</p>
                      </>
                    ) : (
                      <>
                        <p>{address.companyName}</p>
                        <p>Vergi Dairesi: {address.taxOffice}</p>
                        <p>Vergi No: {address.taxNo}</p>
                      </>
                    )}
                    <p>{address.address}</p>
                    <p>{address.district} / {address.city}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Bireysel ve kurumsal fatura bilgilerinizi kaydedebilir, düzenleyebilir veya silebilirsiniz.
                Bilet alırken kayıtlı fatura bilgilerinizi kolayca seçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 