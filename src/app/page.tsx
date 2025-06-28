'use client';

import { useState } from 'react';
import { MapPin, CalendarDays, UserCircle2, ArrowRightLeft, PlaneTakeoff, XCircle, Building, Car, Wifi, Info, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignCard from '@/components/CampaignCard';
import dynamic from 'next/dynamic';
import 'react-datepicker/dist/react-datepicker.css';
import { tr } from 'date-fns/locale';
import { format } from 'date-fns';

// Type tanımları
interface Airport {
  code: string;
  name: string;
  city: string;
}

const DateInput = dynamic(() => import('@/components/DateInput'), { ssr: false });

export default function Home() {
  // Form state'leri
  const [tripType, setTripType] = useState('oneWay');
  const [directOnly, setDirectOnly] = useState(false);
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Havaalanı önerileri state'leri
  const [fromSuggestions, setFromSuggestions] = useState<Airport[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Airport[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  // Yeni yolcu state'leri
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showPassengerModal, setShowPassengerModal] = useState(false);

  // Havaalanı değiştirme fonksiyonu
  const swapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  // Havaalanı arama fonksiyonu (Gerçek API'ye hazır)
  const searchAirports = async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<Airport[]>>) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      // TODO: API anahtarını eklemeniz gerekebilir
      const response = await fetch(`https://api.biletdukkani.com/airports?search=${encodeURIComponent(query)}` /* , {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY', // <-- Buraya API anahtarınızı ekleyin
        },
      } */);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setSuggestions(data.airports || data || []);
    } catch (error) {
      // Genişletilmiş demo havalimanı listesi
      const demoAirports: Airport[] = [
        { code: 'IST', name: 'İstanbul Havalimanı', city: 'İstanbul' },
        { code: 'SAW', name: 'Sabiha Gökçen', city: 'İstanbul' },
        { code: 'AYT', name: 'Antalya Havalimanı', city: 'Antalya' },
        { code: 'ADB', name: 'Adnan Menderes', city: 'İzmir' },
        { code: 'ESB', name: 'Esenboğa', city: 'Ankara' },
        { code: 'BRU', name: 'Brussels Airport', city: 'Brüksel' },
        { code: 'AMS', name: 'Schiphol', city: 'Amsterdam' },
        { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
        { code: 'LHR', name: 'Heathrow', city: 'Londra' },
        { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' },
        { code: 'ZRH', name: 'Zürich Airport', city: 'Zürih' },
        { code: 'VIE', name: 'Vienna International', city: 'Viyana' },
        { code: 'IST', name: 'İstanbul Havalimanı', city: 'İstanbul' },
        { code: 'SAW', name: 'Sabiha Gökçen', city: 'İstanbul' },
      ];
      // İlk 3 harf eşleşmesi (kod, isim veya şehirde)
      const q = query.toLowerCase();
      const filtered = demoAirports.filter(airport =>
        airport.code.toLowerCase().startsWith(q) ||
        airport.name.toLowerCase().startsWith(q) ||
        airport.city.toLowerCase().startsWith(q) ||
        airport.name.toLowerCase().includes(q) ||
        airport.city.toLowerCase().includes(q)
      );
      setSuggestions(filtered);
    }
  };

  // Uçuş arama fonksiyonu
  const searchFlights = async () => {
    if (!fromAirport || !toAirport || !departureDate) {
      alert('Lütfen gerekli alanları doldurun');
      return;
    }

    setIsLoading(true);

    try {
      const searchParams = {
        origin: fromAirport,
        destination: toAirport,
        departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
        returnDate: tripType === 'roundTrip' && returnDate ? format(returnDate, 'yyyy-MM-dd') : null,
        passengers: adultCount + childCount + infantCount,
        tripType: tripType,
        directOnly: directOnly
      };

      console.log('Uçuş arama parametreleri:', searchParams);

      // Şimdilik demo - gerçek API entegrasyonu yapılacak
      // const response = await fetch('/api/flights/search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(searchParams)
      // });
      // const data = await response.json();

      // Demo için 2 saniye bekle
      await new Promise(resolve => setTimeout(resolve, 2000));

      // URLSearchParams için null değerleri filtrele
      const params = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params.append(key, String(value));
        }
      });

      // Uçuş sonuçları sayfasına yönlendir
      window.location.href = `/flights/search?${params.toString()}`;

    } catch (error) {
      console.error('Uçuş arama hatası:', error);
      alert('Uçuş arama sırasında bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <div className="min-h-screen">      
        <div className="bg-green-500 text-center text-white pb-20 pt-8">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-white">gurbet</span>
              <span className="text-black">biz</span>
            </h1>
            <h2 className="text-xl font-light">Gurbetten Memlekete, Yol Arkadaşınız!</h2>
          </div>
        </div>

        {/* Service Icons */}
        <div className="relative bg-white">
          <div className="absolute left-0 right-0 -top-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center">
                <div className="flex justify-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2">
                      <PlaneTakeoff className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-600 text-sm">UÇAK</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2">
                      <Building className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-600 text-sm">OTEL</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2">
                      <Car className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-600 text-sm">ARAÇ</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2">
                      <Wifi className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-600 text-sm">E SIM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="container mx-auto px-4 mt-24">
          <div className="bg-white rounded-[32px] shadow-lg p-8 border border-gray-200">
            {/* Uçuş tipi ve aktarmasız seçenekleri */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex gap-4">
                {/* Tek yön */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneWay"
                    checked={tripType === 'oneWay'}
                    onChange={e => setTripType(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center peer-checked:bg-green-500 transition">
                    {tripType === 'oneWay' && <span className="w-2.5 h-2.5 rounded-full bg-white"></span>}
                  </span>
                  <span className="text-gray-700">Tek yön</span>
                </label>
                {/* Gidiş-dönüş */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundTrip"
                    checked={tripType === 'roundTrip'}
                    onChange={e => setTripType(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center peer-checked:bg-green-500 transition">
                    {tripType === 'roundTrip' && <span className="w-2.5 h-2.5 rounded-full bg-white"></span>}
                  </span>
                  <span className="text-gray-700">Gidiş-dönüş</span>
                </label>
                {/* Çoklu uçuş */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="tripType"
                    value="multiCity"
                    checked={tripType === 'multiCity'}
                    onChange={e => setTripType(e.target.value)}
                    className="hidden peer"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center peer-checked:bg-green-500 transition">
                    {tripType === 'multiCity' && <span className="w-2.5 h-2.5 rounded-full bg-white"></span>}
                  </span>
                  <span className="text-gray-700">Çoklu uçuş</span>
                </label>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <input
                  type="checkbox"
                  checked={directOnly}
                  onChange={e => setDirectOnly(e.target.checked)}
                  className="accent-green-500"
                  id="directOnly"
                />
                <label htmlFor="directOnly" className="text-gray-700 cursor-pointer">Aktarmasız</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              {/* Nereden */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Nereden</label>
                <div className="relative w-full flex items-center">
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    className="w-full pl-8 pr-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent border border-gray-200 rounded-xl"
                    placeholder="Şehir veya havali"
                    value={fromAirport}
                    onChange={e => {
                      setFromAirport(e.target.value);
                      searchAirports(e.target.value, setFromSuggestions);
                      setShowFromSuggestions(true);
                    }}
                    onFocus={() => setShowFromSuggestions(true)}
                  />
                  {/* Autocomplete öneri kutusu */}
                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 mt-1 max-h-48 overflow-y-auto">
                      {fromSuggestions.map((airport, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setFromAirport(`${airport.code} - ${airport.name}`);
                            setShowFromSuggestions(false);
                          }}
                        >
                          <div className="font-medium text-gray-800">{airport.code}</div>
                          <div className="text-sm text-gray-600">{airport.name}</div>
                          <div className="text-xs text-gray-500">{airport.city}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Nereye */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Nereye</label>
                <div className="relative w-full flex items-center">
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    className="w-full pl-8 pr-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent border border-gray-200 rounded-xl"
                    placeholder="Şehir veya havali"
                    value={toAirport}
                    onChange={e => {
                      setToAirport(e.target.value);
                      searchAirports(e.target.value, setToSuggestions);
                      setShowToSuggestions(true);
                    }}
                    onFocus={() => setShowToSuggestions(true)}
                  />
                  {/* Autocomplete öneri kutusu */}
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 mt-1 max-h-48 overflow-y-auto">
                      {toSuggestions.map((airport, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setToAirport(`${airport.code} - ${airport.name}`);
                            setShowToSuggestions(false);
                          }}
                        >
                          <div className="font-medium text-gray-800">{airport.code}</div>
                          <div className="text-sm text-gray-600">{airport.name}</div>
                          <div className="text-xs text-gray-500">{airport.city}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Gidiş Tarihi */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Gidiş Tarihi</label>
                <div className="relative w-full flex items-center">
                  <CalendarDays className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <DateInput
                    value={departureDate}
                    onChange={setDepartureDate}
                    className="w-full pl-8 pr-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent border border-gray-200 rounded-xl cursor-pointer"
                    placeholder="gg.aa.yyyy"
                  />
                </div>
              </div>
              {/* Dönüş Tarihi */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Dönüş Tarihi</label>
                <div className="relative w-full flex items-center">
                  <CalendarDays className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <DateInput
                    value={returnDate}
                    onChange={setReturnDate}
                    className={`w-full pl-8 pr-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent border border-gray-200 rounded-xl cursor-pointer ${tripType === 'oneWay' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="gg.aa.yyyy"
                    disabled={tripType === 'oneWay'}
                  />
                </div>
              </div>
              {/* Yolcu */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Yolcu</label>
                <div className="relative w-full flex items-center">
                  <UserCircle2 className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassengerModal(true)}
                    className="w-full pl-8 pr-2 py-3 text-gray-700 text-left focus:outline-none bg-transparent border border-gray-200 rounded-xl appearance-none cursor-pointer"
                  >
                    {adultCount} Yetişkin{childCount > 0 ? `, ${childCount} Çocuk` : ''}{infantCount > 0 ? `, ${infantCount} Bebek` : ''}
                  </button>
                  {/* Yolcu seçici modalı */}
                  {showPassengerModal && (
                    <div className="absolute z-20 top-14 left-0 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                      <div className="flex flex-col gap-3">
                        {/* Yetişkin */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">Yetişkin <span className="text-gray-500 text-sm">(12 yaş ve üstü)</span></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setAdultCount(Math.max(1, adultCount-1))} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-40" disabled={adultCount === 1}>-</button>
                            <span className="w-4 text-center font-semibold text-gray-800">{adultCount}</span>
                            <button onClick={() => setAdultCount(adultCount+1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-green-600">+</button>
                          </div>
                        </div>
                        {/* Çocuk */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">Çocuk <span className="text-gray-500 text-sm">(2-12 yaş)</span></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setChildCount(Math.max(0, childCount-1))} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-40" disabled={childCount === 0}>-</button>
                            <span className="w-4 text-center font-semibold text-gray-800">{childCount}</span>
                            <button onClick={() => setChildCount(childCount+1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-green-600">+</button>
                          </div>
                        </div>
                        {/* Bebek */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="font-medium text-gray-800">Bebek <span className="text-gray-500 text-sm">(0-2 yaş)</span></div>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setInfantCount(Math.max(0, infantCount-1))} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-40" disabled={infantCount === 0}>-</button>
                            <span className="w-4 text-center font-semibold text-gray-800">{infantCount}</span>
                            <button onClick={() => setInfantCount(infantCount+1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-green-600">+</button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setShowPassengerModal(false)} className="mt-4 w-full py-2 rounded-xl bg-green-500 text-white font-semibold">Tamam</button>
                    </div>
                  )}
                </div>
              </div>
              {/* Uçuş Ara Butonu */}
              <div className="flex items-center">
                <button 
                  onClick={searchFlights}
                  disabled={isLoading}
                  className={`w-full h-[48px] bg-green-500 text-white rounded-xl font-medium transition-colors text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                >
                  {isLoading ? 'Aranıyor...' : 'Uçuş Ara'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* İşlem Butonları */}
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-white rounded-[32px] shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center">
              <Link href="/check-in" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors">
                <PlaneTakeoff className="w-5 h-5" />
                <span>Online Check - In</span>
              </Link>
              <Link href="/pnr-sorgula" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>PNR Sorgula</span>
              </Link>
              <Link href="/bilet-iptal" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors">
                <XCircle className="w-5 h-5" />
                <span>Biletimi İptal Et</span>
              </Link>
              <Link href="/yardim" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span>Yardım</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobil Uygulama Banner */}
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-500 rounded-[32px] shadow-lg p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-white/20 to-green-400/30 pointer-events-none"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Telefon İkonu */}
                <div className="w-12 h-12">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 4C14 2.89543 14.8954 2 16 2H32C33.1046 2 34 2.89543 34 4V44C34 45.1046 33.1046 46 32 46H16C14.8954 46 14 45.1046 14 44V4Z" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M22 6H26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[28px] leading-tight">
                    <span className="text-white font-bold">gurbet</span>
                    <span className="text-black font-bold">biz</span>
                    <span className="text-white font-normal"> Uygulamasi</span>
                  </h3>
                  <p className="text-white text-lg mt-1">Avrupa'dan Türkiye'ye Yol Arkadaşınız</p>
                </div>
              </div>
              <div className="flex gap-4">
                {/* App Store Butonu */}
                <a href="#" className="block">
                  <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2 h-[44px]">
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M16.5 3.49997C15.953 3.53628 15.1084 3.89749 14.4734 4.54749C13.8971 5.13249 13.4513 5.96997 13.5672 6.78747C14.1738 6.85497 14.7992 6.48247 15.3992 5.85497C15.9742 5.25497 16.4326 4.42497 16.5 3.49997ZM19.5 17.3375C19.5 17.3375 19.0604 18.6604 18.1229 20.0104C17.3479 21.1229 16.5 22.5 15.2396 22.5C14.0771 22.5 13.6125 21.7125 12.2521 21.7125C10.8646 21.7125 10.3479 22.5 9.22461 22.5C7.96419 22.5 7.07919 21.0604 6.30419 19.9479C4.69419 17.625 3.42169 13.3125 5.10419 10.3125C5.93169 8.83747 7.37919 7.87497 8.95419 7.87497C10.1542 7.87497 11.1167 8.69997 11.8125 8.69997C12.4813 8.69997 13.6125 7.79997 15.0375 7.79997C15.8771 7.79997 17.4146 8.11497 18.4688 9.48747C15.2396 11.2125 15.8396 15.675 19.5 17.3375Z"/>
                    </svg>
                    <div>
                      <div className="text-[10px] leading-none">Download on the</div>
                      <div className="text-xl font-semibold leading-none mt-1">App Store</div>
                    </div>
                  </div>
                </a>
                {/* Google Play Butonu */}
                <a href="#" className="block">
                  <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center gap-2 h-[44px]">
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.012 2.012 0 0 1-.465-.635 2.006 2.006 0 0 1-.171-.817V3.266c0-.283.059-.557.17-.817.113-.26.271-.494.465-.635zm1.318-.814l10.196 10.196L19.85 6.47A2.004 2.004 0 0 0 20.016 4a2.004 2.004 0 0 0-2.47-1.166L4.927 1zm0 22l12.619-1.834A2.004 2.004 0 0 0 20.016 20a2.004 2.004 0 0 0-.166-2.47l-4.727-4.726L4.927 23z"/>
                    </svg>
                    <div>
                      <div className="text-[10px] leading-none">GET IT ON</div>
                      <div className="text-xl font-semibold leading-none mt-1">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Kampanyalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CampaignCard
              src="/images/campaigns/early-flight.jpg"
              alt="Erken Rezervasyon Kampanyası"
              title="Yaz Sezonu Erken Rezervasyon"
            />
            <CampaignCard
              src="/images/campaigns/summer-hotels.jpg"
              alt="Öğrenci İndirimi Kampanyası"
              title="Öğrenci İndirimi"
            />
            <CampaignCard
              src="/images/campaigns/hotel-deals.jpg"
              alt="Aile Paketi Kampanyası"
              title="Aile Paketi"
            />
            <CampaignCard
              src="/images/campaigns/car-rental.jpg"
              alt="Bayram Özel Kampanyası"
              title="Bayram Özel"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
