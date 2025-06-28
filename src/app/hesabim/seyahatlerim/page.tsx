'use client';

import { useState, useEffect } from 'react';
import AccountSidebar from '@/components/AccountSidebar';
import { PlaneTakeoff, Building, Car, Wifi, Briefcase } from 'lucide-react';
import { getAirlineCheckInUrl } from '@/utils/airlines';
import { getOrderRouteTicketsBiletDukkaniDemo, getOrderRouteAirRulesBiletDukkaniReal } from '@/services/flightApi';

type Passenger = {
  name: string;
  seat: string;
  baggage: string;
  ticketType: string;
};

type FlightReservation = {
  id: string;
  pnr: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
  arrivalTime: string;
  price: string;
  status: string;
  passengers: Passenger[];
  details: {
    payment: string;
    rules: string;
  };
};

export default function SeyahatlerimPage() {
  const [activeTab, setActiveTab] = useState('ucak');
  const [otelReservations, setOtelReservations] = useState([]);
  const [aracReservations, setAracReservations] = useState([]);
  const [esimOrders, setEsimOrders] = useState([]);
  const [flightReservations, setFlightReservations] = useState<FlightReservation[]>([]);
  const [loadingFlights, setLoadingFlights] = useState(false);
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  const [hotelReservations, setHotelReservations] = useState([
    {
      id: 'h1',
      hotelName: 'Grand Hyatt Berlin',
      location: 'Berlin, Almanya',
      address: 'Unter den Linden 77, 10117 Berlin',
      phone: '+49 30 25990',
      checkIn: '2024-08-15',
      checkOut: '2024-08-18',
      roomType: 'Deluxe Oda, Deniz Manzaralı',
      guests: [
        { name: 'Ali İncesu', type: 'Yetişkin' },
        { name: 'Ayşe Yılmaz', type: 'Yetişkin' }
      ],
      price: '4.500 TL',
      status: 'Onaylandı',
      reservationNo: 'HTL987654',
      payment: 'Kredi Kartı',
      rules: 'İptal ve iade girişten 24 saat öncesine kadar ücretsizdir.',
      services: ['Kahvaltı dahil', 'Ücretsiz Wi-Fi', 'Havuz', 'Otopark'],
      checkInTime: '14:00',
      checkOutTime: '12:00',
      notes: 'Yüksek kat, sigara içilmeyen oda talep edildi.'
    },
    {
      id: 'h2',
      hotelName: 'Hilton Garden Inn',
      location: 'Amsterdam, Hollanda',
      address: 'Nieuwezijds Voorburgwal 106, 1012 SJ Amsterdam',
      phone: '+31 20 523 1000',
      checkIn: '2024-08-20',
      checkOut: '2024-08-22',
      roomType: 'Deluxe Oda, Deniz Manzaralı',
      guests: [
        { name: 'Ali İncesu', type: 'Yetişkin' },
        { name: 'Ayşe Yılmaz', type: 'Yetişkin' }
      ],
      price: '3.500 TL',
      status: 'Onaylandı',
      reservationNo: 'HTL987655',
      payment: 'Kredi Kartı',
      rules: 'İptal ve iade girişten 24 saat öncesine kadar ücretsizdir.',
      services: ['Kahvaltı dahil', 'Ücretsiz Wi-Fi', 'Havuz', 'Otopark'],
      checkInTime: '14:00',
      checkOutTime: '12:00',
      notes: 'Yüksek kat, sigara içilmeyen oda talep edildi.'
    }
  ]);
  const [openHotelDetailId, setOpenHotelDetailId] = useState<string | null>(null);
  const [carReservations, setCarReservations] = useState([
    {
      id: 'c1',
      car: 'Volkswagen Golf',
      type: 'Ekonomi, Dizel, Otomatik',
      plate: '34 ABC 123',
      pickupLocation: 'Sabiha Gökçen Havalimanı',
      pickupCity: 'İstanbul',
      pickupDate: '2024-09-01',
      pickupTime: '10:00',
      dropoffLocation: 'Esenboğa Havalimanı',
      dropoffCity: 'Ankara',
      dropoffDate: '2024-09-05',
      dropoffTime: '14:00',
      price: '2.100 TL',
      status: 'Onaylandı',
      reservationNo: 'CAR456789',
      payment: 'Kredi Kartı',
      services: ['Ek Sürücü', 'Çocuk Koltuğu', 'Tam Sigorta'],
      renter: 'Ali İncesu',
      rules: 'Araç en az %25 yakıt ile teslim edilmelidir. İptal 24 saat öncesine kadar ücretsizdir.',
      officePhone: '+90 216 123 45 67',
      notes: 'Beyaz renk, navigasyon opsiyonel.'
    }
  ]);
  const [openCarDetailId, setOpenCarDetailId] = useState<string | null>(null);
  const [airRules, setAirRules] = useState<{ [flightId: string]: any[] }>({});
  const [airRulesLoading, setAirRulesLoading] = useState<string | null>(null);
  const [airRulesError, setAirRulesError] = useState<string | null>(null);

  // Tarih formatını Türk formatına çeviren fonksiyon
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // BiletDukkani demo API'den bilet detaylarını çek
  useEffect(() => {
    async function fetchTickets() {
      setLoadingFlights(true);
      // Burada gerçek API fonksiyonuna kolayca geçiş yapılabilir
      // const data = await getOrderRouteTicketsBiletDukkaniReal(orderId, routeId, token);
      const demoOrderIds = [
        { orderId: 'demo-order-id-12345', routeId: 'demo-route-id-67890' },
        { orderId: 'demo-order-id-54321', routeId: 'demo-route-id-09876' }
      ];
      const results = await Promise.all(
        demoOrderIds.map(async ({ orderId, routeId }) => {
          const data = await getOrderRouteTicketsBiletDukkaniDemo(orderId, routeId);
          return {
            id: orderId,
            pnr: data.tickets[0]?.pnr,
            airline: data.tickets[0]?.flightNumber,
            from: data.tickets[0]?.origin,
            to: data.tickets[0]?.destination,
            date: data.tickets[0]?.departureTime,
            time: data.tickets[0]?.departureTime ? new Date(data.tickets[0].departureTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : '',
            arrivalTime: '',
            price: data.tickets[0]?.price + ' ' + data.tickets[0]?.currency,
            status: data.tickets[0]?.status === 'confirmed' ? 'Onaylandı' : data.tickets[0]?.status,
            passengers: [
              {
                name: data.tickets[0]?.passengerName,
                seat: data.tickets[0]?.seat,
                baggage: '20kg',
                ticketType: 'Ekonomi',
              }
            ],
            details: {
              payment: 'Kredi Kartı',
              rules: 'İade edilemez, değiştirilemez.'
            }
          };
        })
      );
      setFlightReservations(results);
      setLoadingFlights(false);
    }
    fetchTickets();
  }, []);

  const handleOpenDetail = async (flight: any) => {
    if (openDetailId === flight.id) {
      setOpenDetailId(null);
      return;
    }
    setOpenDetailId(flight.id);
    setAirRulesError(null);
    setAirRulesLoading(flight.id);
    try {
      // Demo amaçlı sabit token ve id'ler, gerçek API'de dinamik alınacak
      const token = 'DEMO_TOKEN';
      const rules = await getOrderRouteAirRulesBiletDukkaniReal(flight.orderId || 'demo-order-id', flight.routeId || 'demo-route-id', token);
      setAirRules(prev => ({ ...prev, [flight.id]: rules }));
    } catch (e: any) {
      setAirRulesError('Kural bilgisi alınamadı.');
    } finally {
      setAirRulesLoading(null);
    }
  };

  const renderUcakContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Uçak Rezervasyonlarım</h2>
      {flightReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Henüz hiç bilet satın almadınız.
        </div>
      ) : (
        <div className="space-y-4">
          {flightReservations.map(flight => {
            const checkInUrl = getAirlineCheckInUrl(flight.airline);
            return (
              <div key={flight.id} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">{flight.from} → {flight.to}</div>
                    <div className="text-sm text-gray-600">{formatDate(flight.date)} • {flight.time}{flight.arrivalTime ? ` - ${flight.arrivalTime}` : ""} • {flight.airline}</div>
                    <div className="text-sm text-gray-500 mt-1">PNR: {flight.pnr}</div>
                    <div className="text-sm text-gray-500">Yolcu: {flight.passengers.map(p => p.name).join(', ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">{flight.price}</div>
                    <div className="text-xs text-green-600">{flight.status}</div>
                    <button
                      onClick={() => handleOpenDetail(flight)}
                      className="text-sm bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300"
                    >
                      Detay
                    </button>
                  </div>
                </div>
                {openDetailId === flight.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="mb-2 text-base font-semibold text-gray-700">Yolcular</div>
                    <table className="w-full mb-4 text-sm">
                      <thead>
                        <tr className="text-gray-500">
                          <th className="text-left py-1">Ad Soyad</th>
                          <th className="text-left py-1">Koltuk</th>
                          <th className="text-left py-1">Bagaj</th>
                          <th className="text-left py-1">Bilet Tipi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flight.passengers.map((p, i) => (
                          <tr key={i} className="border-t">
                            <td className="py-1">{p.name}</td>
                            <td className="py-1">{p.seat}</td>
                            <td className="py-1">{p.baggage}</td>
                            <td className="py-1">{p.ticketType}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-700">
                      <div><b>PNR:</b> {flight.pnr}</div>
                      <div><b>Havayolu:</b> {flight.airline}</div>
                      <div><b>Gidiş Tarihi:</b> {formatDate(flight.date)}</div>
                      <div><b>Gidiş Saati:</b> {flight.time}{flight.arrivalTime ? ` - ${flight.arrivalTime}` : ""}</div>
                      <div><b>Durum:</b> {flight.status}</div>
                      <div><b>Fiyat:</b> {flight.price}</div>
                    </div>
                    <div className="mb-2 text-sm text-gray-700"><b>Ödeme:</b> {flight.details.payment}</div>
                    {/* Bilet Kuralları */}
                    <div className="mb-2 text-sm text-gray-700">
                      <b>Bilet Kuralları:</b>
                      {airRulesLoading === flight.id && (
                        <div className="text-xs text-gray-500 mt-1">Kurallar yükleniyor...</div>
                      )}
                      {airRulesError && (
                        <div className="text-xs text-red-500 mt-1">{airRulesError}</div>
                      )}
                      {airRules[flight.id] && airRules[flight.id].length > 0 && (
                        <ul className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-gray-700 space-y-1">
                          {airRules[flight.id].map((rule, idx) => (
                            <li key={idx}><span className="font-semibold text-green-800">{rule.title}:</span> {rule.detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => window.open(checkInUrl, '_blank', 'noopener,noreferrer')}
                        disabled={!checkInUrl}
                        title={checkInUrl ? 'Online check-in sayfasına git' : 'Bu havayolu için otomatik yönlendirme bulunmuyor.'}
                        className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Online Check-in
                      </button>
                      <button
                        disabled
                        title="Yakında"
                        className="text-sm bg-gray-100 text-gray-400 px-3 py-1.5 rounded-lg cursor-not-allowed flex items-center gap-1"
                      >
                        <Briefcase size={14} />
                        Ek Hizmet Ekle
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderOtelContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Otel Rezervasyonlarım (DEMO)</h2>
      {hotelReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Henüz otel rezervasyonu yapmadınız.
        </div>
      ) : (
        <div className="space-y-4">
          {hotelReservations.map(hotel => (
            <div key={hotel.id} className="border rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg text-blue-700">{hotel.hotelName}</div>
                  <div className="text-sm text-gray-500">{hotel.location}</div>
                  <div className="text-sm text-gray-500">Giriş: {formatDate(hotel.checkIn)} {hotel.checkInTime} <b>• Çıkış:</b> {formatDate(hotel.checkOut)} {hotel.checkOutTime}</div>
                  <div className="text-sm text-gray-500">Oda: {hotel.roomType}</div>
                  <div className="text-sm text-gray-500">Konuklar: {hotel.guests.map(g => g.name).join(', ')}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-lg font-bold text-gray-800">{hotel.price}</div>
                  <div className="text-xs text-green-600">{hotel.status}</div>
                  <button
                    className="mt-2 px-4 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                    onClick={() => setOpenHotelDetailId(openHotelDetailId === hotel.id ? null : hotel.id)}
                  >
                    Detay
                  </button>
                </div>
              </div>
              {openHotelDetailId === hotel.id && (
                <div className="mt-4 p-4 bg-white rounded-xl border text-left">
                  <div className="mb-2 text-base font-semibold text-gray-700">Otel Bilgileri</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Otel:</b> {hotel.hotelName}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Adres:</b> {hotel.address}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Telefon:</b> {hotel.phone}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Giriş Tarihi:</b> {formatDate(hotel.checkIn)} {hotel.checkInTime}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Çıkış Tarihi:</b> {formatDate(hotel.checkOut)} {hotel.checkOutTime}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Oda Tipi:</b> {hotel.roomType}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Konuklar:</b> {hotel.guests.map(g => g.name + ' (' + g.type + ')').join(', ')}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Rezervasyon No:</b> {hotel.reservationNo}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Durum:</b> {hotel.status}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Fiyat:</b> {hotel.price}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Ödeme:</b> {hotel.payment}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Kurallar:</b> {hotel.rules}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Ek Hizmetler:</b> {hotel.services.join(', ')}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Notlar:</b> {hotel.notes}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAracContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Araç Rezervasyonlarım (DEMO)</h2>
      {carReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Henüz araç kiralamadınız.
        </div>
      ) : (
        <div className="space-y-4">
          {carReservations.map(car => (
            <div key={car.id} className="border rounded-xl p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg text-orange-700">{car.car}</div>
                  <div className="text-sm text-gray-500">{car.type}</div>
                  <div className="text-sm text-gray-500">Alış: {car.pickupLocation} ({car.pickupCity}) {formatDate(car.pickupDate)} {car.pickupTime}</div>
                  <div className="text-sm text-gray-500">Bırakış: {car.dropoffLocation} ({car.dropoffCity}) {formatDate(car.dropoffDate)} {car.dropoffTime}</div>
                  <div className="text-sm text-gray-500">Kiralayan: {car.renter}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-lg font-bold text-gray-800">{car.price}</div>
                  <div className="text-xs text-green-600">{car.status}</div>
                  <button
                    className="mt-2 px-4 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                    onClick={() => setOpenCarDetailId(openCarDetailId === car.id ? null : car.id)}
                  >
                    Detay
                  </button>
                </div>
              </div>
              {openCarDetailId === car.id && (
                <div className="mt-4 p-4 bg-white rounded-xl border text-left">
                  <div className="mb-2 text-base font-semibold text-gray-700">Araç Bilgileri</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Plaka:</b> {car.plate}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Rezervasyon No:</b> {car.reservationNo}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Durum:</b> {car.status}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Ödeme:</b> {car.payment}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Ek Hizmetler:</b> {car.services.join(', ')}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Kurallar:</b> {car.rules}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Ofis Tel:</b> {car.officePhone}</div>
                  <div className="mb-2 text-sm text-gray-700"><b>Notlar:</b> {car.notes}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'ucak':
        return renderUcakContent();

      case 'otel':
        return renderOtelContent();

      case 'arac':
        return renderAracContent();

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