'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, CalendarDays, UserCircle2, ArrowRightLeft, PlaneTakeoff, PlaneLanding, XCircle, Building, Car, Wifi, Info, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CampaignCard from '../components/CampaignCard';
import dynamic from 'next/dynamic';
import 'react-datepicker/dist/react-datepicker.css';
import { tr } from 'date-fns/locale';
import { format } from 'date-fns';
import MobileAppBanner from '../components/MobileAppBanner';

// Type tanımları
interface Airport {
  code: string;
  name: string;
  city: string;
}

const DateInput = dynamic(() => import('../components/DateInput'), { ssr: false });

export default function Home() {
  // Form state'leri
  const [tripType, setTripType] = useState('oneWay');
  const [directOnly, setDirectOnly] = useState(false);
  const [fromAirports, setFromAirports] = useState<Airport[]>([]);
  const [toAirports, setToAirports] = useState<Airport[]>([]);
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
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

  // Mobil öneri listelerini kapatmak için ref'ler
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  // Gidiş-dönüş için mobilde otomatik dönüş tarihi açma
  const [autoOpenReturn, setAutoOpenReturn] = useState(false);

  // Gidiş tarihi değişince dönüş input'unu aç
  const handleDepartureChange = (date: Date | undefined) => {
    setDepartureDate(date);
    if (tripType === 'roundTrip' && isMobile()) {
      setAutoOpenReturn(true);
    }
  };

  // Yardımcı fonksiyon
  function isMobile() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640;
  }

  // Mobil öneri listelerini kapatmak için useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Havaalanı değiştirme fonksiyonu
  const swapAirports = () => {
    const tempFrom = fromAirports;
    const tempTo = toAirports;
    const tempFromInput = fromInput;
    const tempToInput = toInput;
    
    setFromAirports(tempTo);
    setToAirports(tempFrom);
    setFromInput(tempToInput);
    setToInput(tempFromInput);
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
    if (!fromAirports.length || !toAirports.length || !departureDate) {
      alert('Lütfen gerekli alanları doldurun');
      return;
    }

    setIsLoading(true);

    try {
      const searchParams = {
        origin: fromAirports.map(a => a.code).join(','),
        destination: toAirports.map(a => a.code).join(','),
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
    <main className="min-h-screen overflow-x-hidden max-w-full">
      <Header />
      <div className="relative overflow-x-hidden max-w-full">
        {/* Yeşil alan */}
        <div className="bg-green-500 text-center text-white pb-5 sm:pb-32 pt-[1.2rem] sm:pt-8 relative z-10 rounded-b-[16px] sm:rounded-b-[32px]">
          <div className="container mx-auto px-4">
            <h1 className="hidden sm:block sm:relative text-2xl sm:text-5xl font-bold mb-1 sm:mb-2 z-30">
              <span className="text-white">gurbet</span>
              <span className="text-black">biz</span>
            </h1>
            <h2 className="hidden sm:block text-xs sm:text-xl font-light">Gurbetten Memlekete, Yol Arkadaşınız!</h2>
          </div>
          {/* Service Icons - overlap border */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[60%] sm:translate-y-[70%] z-20 flex justify-center w-full pointer-events-none">
            <div className="flex gap-8 bg-transparent scale-75 sm:scale-100">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2 border-4 border-white">
                  <PlaneTakeoff className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                </div>
                <span className="text-gray-600 text-xs sm:text-sm pointer-events-auto">UÇAK</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2 border-4 border-white">
                  <Building className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                </div>
                <span className="text-gray-600 text-xs sm:text-sm pointer-events-auto">OTEL</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2 border-4 border-white">
                  <Car className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                </div>
                <span className="text-gray-600 text-xs sm:text-sm pointer-events-auto">ARAÇ</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg mb-2 border-4 border-white">
                  <Wifi className="w-7 h-7 text-gray-600" strokeWidth={1.5} />
                </div>
                <span className="text-gray-600 text-xs sm:text-sm pointer-events-auto">E SIM</span>
              </div>
            </div>
          </div>
        </div>
        {/* Beyaz alan ve içerik */}
        <div className="bg-white min-h-screen pt-6">
          {/* Search Form */}
          <div className="hidden sm:block w-full sm:container sm:mx-auto px-0 sm:px-4 mt-24">
            <div className="bg-white rounded-[32px] shadow-lg p-8 border border-gray-200">
              {/* Uçuş tipi ve aktarmasız seçenekleri */}
              <div className="flex flex-wrap items-start gap-6 mb-8">
                <div className="flex gap-4">
                  {/* Tek yön */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="tripType"
                      value="oneWay"
                      checked={tripType === 'oneWay'}
                      onChange={e => setTripType(e.target.value)}
                      className="hidden peer accent-green-500"
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
                      className="hidden peer accent-green-500"
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center peer-checked:bg-green-500 transition">
                      {tripType === 'roundTrip' && <span className="w-2.5 h-2.5 rounded-full bg-white"></span>}
                    </span>
                    <span className="text-gray-700">Gidiş-dönüş</span>
                  </label>
                  {/* Çoklu uçuş */}
                  <label className="flex items-center gap-2 cursor-pointer select-none group relative">
                    <input
                      type="radio"
                      name="tripType"
                      value="multiCity"
                      checked={tripType === 'multiCity'}
                      onChange={e => setTripType(e.target.value)}
                      className="hidden peer accent-green-500"
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
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={fromInput}
                      onChange={e => {
                        setFromInput(e.target.value);
                        setShowFromSuggestions(true);
                        searchAirports(e.target.value, setFromSuggestions);
                      }}
                      onFocus={() => setShowFromSuggestions(true)}
                      placeholder="Şehir veya havali"
                      className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-xl text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                    />
                    {showFromSuggestions && fromSuggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg sm:block">
                        {fromSuggestions.map(airport => (
                          <li
                            key={airport.code}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onMouseDown={() => {
                              setFromInput(`${airport.code} - ${airport.name}`);
                              setFromAirports([airport]);
                              setShowFromSuggestions(false);
                            }}
                          >
                            <div className="font-semibold text-gray-800">{airport.name}</div>
                            <div className="text-sm text-gray-500">{airport.code} • {airport.city}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/* Nereye */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Nereye</label>
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      ref={toInputRef}
                      type="text"
                      value={toInput}
                      onChange={e => {
                        setToInput(e.target.value);
                        setShowToSuggestions(true);
                        searchAirports(e.target.value, setToSuggestions);
                      }}
                      onFocus={() => setShowToSuggestions(true)}
                      placeholder="Şehir veya havali"
                      className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-xl text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                    />
                    {showToSuggestions && toSuggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                        {toSuggestions.map(airport => (
                          <li
                            key={airport.code}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() => {
                              setToInput(`${airport.code} - ${airport.name}`);
                              setToAirports([airport]);
                              setShowToSuggestions(false);
                            }}
                          >
                            {airport.name} ({airport.code})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/* Gidiş Tarihi */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Gidiş Tarihi</label>
                  <div className="relative w-full flex items-center">
                    <CalendarDays className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <DateInput
                      value={departureDate}
                      onChange={handleDepartureChange}
                      className="w-full pl-10 pr-4 h-12 leading-[44px] py-0 text-base text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent border border-gray-300 rounded-xl"
                      placeholder="gg.aa.yyyy"
                    />
                  </div>
                </div>
                {/* Dönüş Tarihi */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Dönüş Tarihi</label>
                  <div className="relative w-full flex items-center">
                    <CalendarDays className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <DateInput
                      value={returnDate}
                      onChange={setReturnDate}
                      className={`flex-1 bg-transparent border-none outline-none text-[14px] font-semibold placeholder-[#6b7280] p-0 ${tripType === 'oneWay' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="gg.aa.yyyy"
                      disabled={tripType === 'oneWay'}
                    />
                  </div>
                </div>
                {/* Yolcu */}
                <div className="flex flex-col relative">
                  <label className="text-xs text-gray-500 mb-1 ml-1 font-medium">Yolcu</label>
                  <div className="relative w-full flex items-center">
                    <UserCircle2 className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassengerModal(true)}
                      className="w-full pl-10 pr-4 h-12 text-base text-gray-700 text-left focus:outline-none bg-white border border-gray-300 rounded-xl appearance-none cursor-pointer"
                    >
                      {adultCount} Yetişkin{childCount > 0 ? `, ${childCount} Çocuk` : ''}{infantCount > 0 ? `, ${infantCount} Bebek` : ''}
                    </button>
                  </div>
                </div>
                {/* Uçuş Ara Butonu */}
                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-green-600 transition-all"
                    onClick={searchFlights}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Aranıyor...' : 'Uçuş Ara'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Mobil için özel uçuş arama kutusu */}
          <div className="block sm:hidden w-full px-4 mt-16">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-4 flex flex-col gap-2">
              {/* Tek yön / Gidiş-dönüş / Yolcu satırı */}
              <div className="flex items-center w-full gap-1 mb-0 mt-0">
                <div className="flex gap-1 flex-shrink-0">
                  <label className="flex items-center gap-1 cursor-pointer select-none text-[14px] font-normal">
                    <input
                      type="radio"
                      name="tripTypeMobile"
                      value="oneWay"
                      checked={tripType === 'oneWay'}
                      onChange={() => setTripType('oneWay')}
                      className="accent-green-500 w-4 h-4"
                    />
                    <span className="text-[#23272F]">Tek yön</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer select-none text-[14px] font-normal">
                    <input
                      type="radio"
                      name="tripTypeMobile"
                      value="roundTrip"
                      checked={tripType === 'roundTrip'}
                      onChange={() => setTripType('roundTrip')}
                      className="accent-green-500 w-4 h-4"
                    />
                    <span className="text-[#23272F]">Gidiş-dönüş</span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassengerModal(true)}
                  className="flex items-center gap-1 text-[#23272F] rounded-xl px-3 py-1.5 bg-white ml-auto text-[14px] font-normal min-w-[90px] justify-center"
                  style={{lineHeight: '1.1'}}
                >
                  <UserCircle2 className="w-4 h-4" />
                  <span>{adultCount} Yetişkin{childCount > 0 ? `, ${childCount} Çocuk` : ''}{infantCount > 0 ? `, ${infantCount} Bebek` : ''}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              {/* Nereden-Nereye kutuları ve swap */}
              <div className="relative flex flex-col gap-3 w-full mt-2">
                <div className="w-full relative">
                  <div className="flex items-center bg-white border border-black rounded-lg px-4 h-11">
                    <PlaneTakeoff className="w-5 h-5 text-green-500 mr-2" />
                    <input
                      ref={fromInputRef}
                      type="text"
                      className="flex-1 bg-transparent border-none outline-none text-[14px] font-semibold placeholder-[#6b7280] focus:outline-none focus:ring-0 focus:border-white"
                      placeholder="Kalkış"
                      value={fromInput}
                      onChange={e => {
                        setFromInput(e.target.value);
                        setShowFromSuggestions(true);
                        searchAirports(e.target.value, setFromSuggestions);
                      }}
                      onFocus={() => setShowFromSuggestions(true)}
                    />
                  </div>
                  {/* Mobil havaalanı önerileri */}
                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg top-full">
                      {fromSuggestions.map(airport => (
                        <li
                          key={airport.code}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onMouseDown={() => {
                            setFromInput(`${airport.code} - ${airport.name}`);
                            setFromAirports([airport]);
                            setShowFromSuggestions(false);
                          }}
                        >
                          <div className="font-semibold text-gray-800 text-sm">{airport.name}</div>
                          <div className="text-xs text-gray-500">{airport.code} • {airport.city}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="button"
                  onClick={swapAirports}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#0a2342] bg-white shadow"
                  aria-label="Kalkış/Varış değiştir"
                >
                  <ArrowRightLeft className="w-6 h-6 text-[#0a2342]" strokeWidth={1.2} />
                </button>
                <div className="w-full relative">
                  <div className="flex items-center bg-white border border-black rounded-lg px-4 h-11">
                    <PlaneLanding className="w-5 h-5 text-green-500 mr-2" />
                    <input
                      ref={toInputRef}
                      type="text"
                      className="flex-1 bg-transparent border-none outline-none text-[14px] font-semibold placeholder-[#6b7280] focus:outline-none focus:ring-0 focus:border-white"
                      placeholder="Varış"
                      value={toInput}
                      onChange={e => {
                        setToInput(e.target.value);
                        setShowToSuggestions(true);
                        searchAirports(e.target.value, setToSuggestions);
                      }}
                      onFocus={() => setShowToSuggestions(true)}
                    />
                  </div>
                  {/* Mobil havaalanı önerileri */}
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg top-full">
                      {toSuggestions.map(airport => (
                        <li
                          key={airport.code}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onMouseDown={() => {
                            setToInput(`${airport.code} - ${airport.name}`);
                            setToAirports([airport]);
                            setShowToSuggestions(false);
                          }}
                        >
                          <div className="font-semibold text-gray-800 text-sm">{airport.name}</div>
                          <div className="text-xs text-gray-500">{airport.code} • {airport.city}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/* Tarih kutuları */}
              <div className="flex gap-2 w-full mt-2">
                <div className="flex-1">
                  <div className="flex items-center bg-white border border-black rounded-lg h-11 px-3 text-[15px] font-semibold focus:outline-none min-w-0">
                    <CalendarDays className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <DateInput
                      value={departureDate}
                      onChange={handleDepartureChange}
                      className="flex-1 bg-transparent border-none outline-none text-[14px] font-semibold placeholder-[#6b7280] p-0"
                      placeholder="Gidis Tarihi"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center bg-white border border-black rounded-lg h-11 px-3 text-[15px] font-semibold focus:outline-none min-w-0">
                    <CalendarDays className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <DateInput
                      value={returnDate}
                      onChange={setReturnDate}
                      className={`flex-1 bg-transparent border-none outline-none text-[14px] font-semibold placeholder-[#6b7280] p-0 ${tripType === 'oneWay' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Donus Tarihi"
                      disabled={tripType === 'oneWay'}
                    />
                  </div>
                </div>
              </div>
              {/* Uçuş Ara Butonu */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-green-600 transition-all mt-2"
                onClick={searchFlights}
                disabled={isLoading}
              >
                {isLoading ? 'Aranıyor...' : 'Uçuş Ara'}
              </button>
            </div>
          </div>

          {/* Mobil App Banner - sadece mobilde */}
          <div className="block sm:hidden w-full px-2 mt-6">
            <MobileAppBanner />
          </div>

          {/* İşlem Butonları */}
          <div className="w-full sm:container sm:mx-auto px-0 sm:px-4 mt-4">
            {/* Masaüstü için eski hali */}
            <div className="bg-white rounded-[32px] shadow-lg p-6 border border-gray-200 hidden sm:block">
              <div className="flex justify-between items-center gap-8">
                <Link href="/check-in" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 hover:shadow rounded-xl px-3 py-2">
                  <PlaneTakeoff className="w-5 h-5" />
                  <span>Online Check - In</span>
                </Link>
                <Link href="/pnr-sorgula" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 hover:shadow rounded-xl px-3 py-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>PNR Sorgula</span>
                </Link>
                <Link href="/bilet-iptal" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 hover:shadow rounded-xl px-3 py-2">
                  <XCircle className="w-5 h-5" />
                  <span>Biletimi İptal Et</span>
                </Link>
                <Link href="/yardim" className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors hover:bg-green-50 hover:shadow rounded-xl px-3 py-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Yardım</span>
                </Link>
              </div>
            </div>
            {/* Mobil için 2x2 grid */}
            <div className="bg-gray-50 rounded-2xl shadow-lg p-3 border border-gray-100 grid grid-cols-2 gap-3 mt-2 mx-2">
              <Link href="/check-in" className="flex flex-col items-center justify-center bg-white rounded-xl py-4 shadow border border-gray-100">
                <PlaneTakeoff className="w-6 h-6 text-green-500 mb-1" />
                <span className="text-xs font-semibold text-gray-700">Online Check-in</span>
              </Link>
              <Link href="/pnr-sorgula" className="flex flex-col items-center justify-center bg-white rounded-xl py-4 shadow border border-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500 mb-1">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs font-semibold text-gray-700">PNR Sorgula</span>
              </Link>
              <Link href="/bilet-iptal" className="flex flex-col items-center justify-center bg-white rounded-xl py-4 shadow border border-gray-100">
                <XCircle className="w-6 h-6 text-green-500 mb-1" />
                <span className="text-xs font-semibold text-gray-700">Biletimi İptal Et</span>
              </Link>
              <Link href="/yardim" className="flex flex-col items-center justify-center bg-white rounded-xl py-4 shadow border border-gray-100">
                <HelpCircle className="w-6 h-6 text-green-500 mb-1" />
                <span className="text-xs font-semibold text-gray-700">Yardım</span>
              </Link>
            </div>
          </div>

          {/* Mobil Uygulama Banner */}
          <div className="hidden sm:block w-full sm:container sm:mx-auto px-0 sm:px-4 mt-10">
            <div className="bg-green-500 rounded-[32px] shadow-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-white/20 to-green-400/30 pointer-events-none"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-8">
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
                      <span className="text-white font-normal text-xl font-semibold ml-2">Uygulaması</span>
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
          <div className="w-full sm:container sm:mx-auto px-0 sm:px-4 py-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Kampanyalar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
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

          {/* Mobil Yolcu Seçimi Modalı */}
          {showPassengerModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end sm:hidden">
              <div className="w-full bg-white rounded-t-2xl p-6 pb-8 shadow-2xl transform transition-transform duration-300 ease-out">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Yolcu Seçimi</h3>
                  <button 
                    onClick={() => setShowPassengerModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <XCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-6">
                  {/* Yetişkin */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">Yetişkin</div>
                      <div className="text-gray-500 text-sm">12 yaş ve üzeri</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setAdultCount(Math.max(1, adultCount-1))} 
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-40 text-xl font-bold transition-colors" 
                        disabled={adultCount === 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800 text-xl">{adultCount}</span>
                      <button 
                        onClick={() => setAdultCount(adultCount+1)} 
                        className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center text-white text-xl font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Çocuk */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">Çocuk</div>
                      <div className="text-gray-500 text-sm">2-12 yaş arası</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setChildCount(Math.max(0, childCount-1))} 
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-40 text-xl font-bold transition-colors" 
                        disabled={childCount === 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800 text-xl">{childCount}</span>
                      <button 
                        onClick={() => setChildCount(childCount+1)} 
                        className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center text-white text-xl font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Bebek */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">Bebek</div>
                      <div className="text-gray-500 text-sm">0-2 yaş arası</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setInfantCount(Math.max(0, infantCount-1))} 
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 disabled:opacity-40 text-xl font-bold transition-colors" 
                        disabled={infantCount === 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-gray-800 text-xl">{infantCount}</span>
                      <button 
                        onClick={() => setInfantCount(infantCount+1)} 
                        className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center text-white text-xl font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Toplam Yolcu Sayısı */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Toplam Yolcu</span>
                    <span className="font-bold text-green-600 text-lg">{adultCount + childCount + infantCount} Kişi</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowPassengerModal(false)} 
                  className="mt-6 w-full py-4 rounded-xl bg-green-500 text-white font-semibold text-lg shadow-lg hover:bg-green-600 transition-colors"
                >
                  Tamam
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
} 
