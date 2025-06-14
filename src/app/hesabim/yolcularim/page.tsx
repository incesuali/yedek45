'use client';

import { useState, useEffect } from 'react';
import AccountSidebar from '@/components/AccountSidebar';
import { User, Edit, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  identityNumber: string | null;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  hasMilCard: boolean;
  isAccountOwner?: boolean;
}

export default function YolcularimPage() {
  const router = useRouter();
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Yolcu listesini getir
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await fetch('/api/passengers');
        if (!response.ok) {
          throw new Error('Yolcu listesi getirilemedi');
        }
        const data = await response.json();
        setPassengers(data);
      } catch (error) {
        console.error('Yolcu listesi getirme hatası:', error);
        toast.error('Yolcu listesi getirilemedi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPassengers();
  }, []);

  const handleEdit = (passengerId: string) => {
    router.push(`/hesabim/yolcularim/duzenle?id=${passengerId}`);
  };

  const handleDelete = async (passengerId: string) => {
    if (!window.confirm('Bu yolcuyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/passengers/${passengerId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Yolcu silinemedi');
      }

      // Yolcuyu listeden kaldır
      setPassengers(passengers.filter(p => p.id !== passengerId));
      toast.success('Yolcu başarıyla silindi');
    } catch (error) {
      console.error('Yolcu silme hatası:', error);
      toast.error('Yolcu silinirken bir hata oluştu');
    }
  };

  const formatDate = (day: string, month: string, year: string) => {
    const monthAbbr = month.substring(0, 3);
    return `${day} ${monthAbbr} ${year}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl text-gray-700 font-medium">Yolcularım</h1>
              <button
                onClick={() => router.push('/hesabim/yolcularim/duzenle')}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Yeni Yolcu</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-sm text-gray-500">
                <div className="col-span-4">Adı - Soyadı</div>
                <div className="col-span-3">T.C. No</div>
                <div className="col-span-3">Doğum Tarihi</div>
                <div className="col-span-1">Mil Kart</div>
                <div className="col-span-1"></div>
              </div>

              {/* Passengers List */}
              <div className="divide-y divide-gray-50">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    Yolcular yükleniyor...
                  </div>
                ) : (
                  <>
                    {(() => {
                      // isAccountOwner true olanı başa al, diğerleri altına gelsin
                      const owner = passengers.find(p => p.isAccountOwner);
                      const others = passengers.filter(p => !p.isAccountOwner);
                      const sorted = owner ? [owner, ...others] : others;
                      return sorted.map((passenger) => (
                        <div 
                          key={passenger.id}
                          className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                        >
                          <div className="col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <span className="font-medium">{passenger.firstName} {passenger.lastName}</span>
                              {passenger.isAccountOwner && (
                                <span className="ml-2 text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5">Hesap Sahibi</span>
                              )}
                            </div>
                          </div>
                          <div className="col-span-3 text-gray-600">{passenger.identityNumber || '-'}</div>
                          <div className="col-span-3 text-gray-600">
                            {formatDate(passenger.birthDay, passenger.birthMonth, passenger.birthYear)}
                          </div>
                          <div className="col-span-1">
                            {passenger.hasMilCard && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="col-span-1">
                            <div className="flex items-center gap-2 justify-end">
                              <button 
                                className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={() => handleEdit(passenger.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {!passenger.isAccountOwner && (
                                <button 
                                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                                  onClick={() => handleDelete(passenger.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ));
                    })()}

                    {passengers.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        Henüz yolcu eklenmemiş.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 