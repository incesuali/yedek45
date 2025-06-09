'use client';

<<<<<<< HEAD
import AccountSidebar from '@/components/AccountSidebar';

export default function SeyahatlerimPage() {
  const trips = [
    {
      id: 1,
      from: 'İstanbul',
      to: 'Ankara',
      date: '15 Mart 2024',
      status: 'Tamamlandı',
      price: '450 TL'
    },
    {
      id: 2,
      from: 'İzmir',
      to: 'Antalya',
      date: '20 Mart 2024',
      status: 'Onay Bekliyor',
      price: '380 TL'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
=======
import { useState } from 'react';
import Header from '@/components/Header';
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
      <Header />
      
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
<<<<<<< HEAD
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Seyahatlerim</h1>
            
            <div className="space-y-4">
              {trips.map((trip) => (
                <div 
                  key={trip.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Nereden</span>
                        <span className="font-medium">{trip.from}</span>
                      </div>
                      <div className="w-8 h-px bg-gray-300" />
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Nereye</span>
                        <span className="font-medium">{trip.to}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Tarih</span>
                        <span className="font-medium">{trip.date}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Durum</span>
                        <span className={`font-medium ${
                          trip.status === 'Tamamlandı' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Tutar</span>
                        <span className="font-medium">{trip.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
=======
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
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
          </div>
        </div>
      </div>
    </main>
  );
} 