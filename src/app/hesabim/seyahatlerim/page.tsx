'use client';

import { useState } from 'react';
import AccountSidebar from '@/components/AccountSidebar';
import { PlaneTakeoff, Building, Car, Wifi } from 'lucide-react';

export default function SeyahatlerimPage() {
  const [activeTab, setActiveTab] = useState('ucak');
  const [otelReservations, setOtelReservations] = useState([]);
  const [aracReservations, setAracReservations] = useState([]);
  const [esimOrders, setEsimOrders] = useState([]);

  const renderContent = () => {
    switch (activeTab) {
      case 'ucak':
        return (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <PlaneTakeoff className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl text-gray-700">Henüz hiç bilet satın almadınız.</h2>
              <p className="text-gray-500">
                İşlem yaptıkça, satın aldığınız biletlere buradan ulaşabileceksiniz.
              </p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                Uçak bileti ara
              </button>
            </div>
          </div>
        );

      case 'otel':
        return (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl text-gray-700">Henüz otel rezervasyonu yapmadınız.</h2>
              <p className="text-gray-500">
                İşlem yaptıkça, satın aldığınız rezervasyonlarınıza buradan ulaşabileceksiniz.
              </p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                Otel ara
              </button>
            </div>
          </div>
        );

      case 'arac':
        return (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <Car className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl text-gray-700">Henüz araç kiralamadınız.</h2>
              <p className="text-gray-500">
                İşlem yaptıkça, kiraladığınız araçlara buradan ulaşabileceksiniz.
              </p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                Araç ara
              </button>
            </div>
          </div>
        );

      case 'esim':
        return (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <Wifi className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl text-gray-700">Henüz E-sim satın almadınız.</h2>
              <p className="text-gray-500">
                İşlem yaptıkça, satın aldığınız E-sim'lere buradan ulaşabileceksiniz.
              </p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                E-sim satın al
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl text-gray-700">Bu bölüm henüz hazır değil.</h2>
              <p className="text-gray-500">
                Çok yakında hizmetinizde olacak.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 space-y-6">
            {/* Sekmeler */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex gap-8 justify-center">
                <button
                  onClick={() => setActiveTab('ucak')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium ${
                    activeTab === 'ucak' ? 'bg-green-50 text-green-500' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  Uçak
                </button>

                <button
                  onClick={() => setActiveTab('otel')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium ${
                    activeTab === 'otel' ? 'bg-green-50 text-green-500' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  Otel
                </button>

                <button
                  onClick={() => setActiveTab('arac')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium ${
                    activeTab === 'arac' ? 'bg-green-50 text-green-500' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  Araç
                </button>

                <button
                  onClick={() => setActiveTab('esim')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium ${
                    activeTab === 'esim' ? 'bg-green-50 text-green-500' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  E-sim
                </button>
              </div>
            </div>

            {/* İçerik */}
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  );
} 