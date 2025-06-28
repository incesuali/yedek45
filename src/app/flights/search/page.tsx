"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { format, addDays, subDays, isSameDay, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import { Bell, Heart, Filter, PlaneTakeoff, PlaneLanding, Users, Star, Plus, Minus, Search, Edit, Trash2, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import FlightSearchBox from '@/components/FlightSearchBox';
import { useSession } from 'next-auth/react';
import LoginModal from '@/components/LoginModal';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getAirRulesBiletDukkaniDemo } from '@/services/flightApi';
import { getAirlines } from '@/services/airlineApi';
import { Airline } from '@/types/airline';

// Demo fiyat verisi fonksiyonu (API'ye hazır)
function getDemoPrices(baseDate: Date, currency: string = "EUR") {
  // baseDate geçerli değilse bugünkü tarihi kullan
  const safeBaseDate = (baseDate instanceof Date && !isNaN(baseDate.getTime())) ? baseDate : new Date();
  return Array.from({ length: 10 }, (_, i) => {
    const date = addDays(subDays(safeBaseDate, 3), i);
    const price = 90 + Math.floor(Math.abs(Math.sin(date.getTime() / 1e9)) * 60);
    return {
      date,
      price,
      currency,
    };
  });
}

// API'den fiyat çekme fonksiyonu (gelecekte kullanılacak)
async function fetchPricesFromAPI(origin: string, destination: string, baseDate: Date, currency: string = "EUR") {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const demo = getDemoPrices(baseDate, currency);
    if (!demo || demo.length === 0) throw new Error('Demo veri boş');
    return demo;
  } catch (error) {
    console.error('Fiyat çekme hatası:', error);
    // Hata durumunda demo veri döndür
    return getDemoPrices(baseDate, currency);
  }
}

// Uçuş kartı bileşeni
function FlightCard({ flight, onSelect, airlinesList }: { flight: any, onSelect: () => void, airlinesList: Airline[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const airlineObj = airlinesList.find((a: Airline) => a.name.toLowerCase() === (flight.airlineName || flight.airline || '').toLowerCase());

  const handleSelect = () => {
    const flightData = encodeURIComponent(JSON.stringify(flight));
    router.push(`/flights/booking?flight=${flightData}`);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-4 border border-gray-100 hover:shadow-lg transition">
      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-col items-center min-w-[100px]">
          {airlineObj?.logoUrl && (
            <img src={airlineObj.logoUrl} alt={airlineObj.name} className="h-8 w-8 object-contain mb-1" />
          )}
          <span className="font-semibold text-lg text-gray-800">{airlineObj?.name || flight.airlineName || flight.airline || "Havayolu"}</span>
          <span className="text-xs text-gray-500">{flight.flightNumber}</span>
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-bold text-xl">{flight.departureTime?.slice(0,5) || "--:--"}</span>
            <span className="text-xs text-gray-500">{flight.origin || flight.departureAirport}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400">→</span>
            <span className="text-xs text-gray-400">{flight.duration || "-"}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-700 font-bold text-xl">{flight.arrivalTime?.slice(0,5) || "--:--"}</span>
            <span className="text-xs text-gray-500">{flight.destination || flight.arrivalAirport}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500">Bagaj: {flight.baggage || '-'}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end min-w-[120px]">
        <span className="text-green-600 font-bold text-2xl">{flight.price?.toLocaleString()} EUR</span>
        <span className={`text-xs mt-1 ${flight.direct ? "text-green-500" : "text-orange-500"}`}>{flight.direct ? "Direkt" : "Aktarmalı"}</span>
        <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition" onClick={onSelect}>Seç</button>
      </div>
    </div>
  );
}

// Bagaj seçimi modalı
function BaggageModal({ open, onClose, passengers, baggageOptions, onSave }: {
  open: boolean;
  onClose: () => void;
  passengers: { type: string; name: string }[];
  baggageOptions: { weight: string; price: number }[][];
  onSave: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(passengers.map(() => '0 kg'));
  const ref = useRef<HTMLDivElement>(null);
  // Modal dışına tıklayınca kapat
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (open && ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div ref={ref} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Ek Bagaj Seçimi</h2>
        <div className="space-y-4">
          {passengers.map((p, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="font-medium text-gray-700">{p.name} <span className="text-xs text-gray-500">({p.type})</span></div>
              <div className="flex gap-2 flex-wrap">
                {baggageOptions[i].map(opt => (
                  <button
                    key={opt.weight}
                    className={`px-3 py-1 rounded-lg border text-sm font-semibold transition ${selected[i] === opt.weight ? 'bg-green-500 text-white border-green-600' : 'bg-white border-gray-200 hover:bg-green-50'}`}
                    onClick={() => setSelected(sel => sel.map((s, idx) => idx === i ? opt.weight : s))}
                  >
                    {opt.weight} {opt.price > 0 && <span className="ml-1 text-xs text-gray-500">+{opt.price} EUR</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700" onClick={onClose}>İptal</button>
          <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold" onClick={() => { onSave(selected); onClose(); }}>Kaydet</button>
        </div>
      </div>
    </div>
  );
}

// Fiyat Alarmı Bileşeni
function PriceAlertBox({ origin, destination, departureDate }: { origin: string, destination: string, departureDate: Date }) {
  const { data: session, status } = useSession();
  const [isAlertCreated, setIsAlertCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = async () => {
    if (loading || isAlertCreated) return;

    if (status !== 'authenticated' || !session?.user) {
      setShowLogin(true);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/price-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          departureDate: departureDate.toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Bir hata oluştu.');
      }
      
      setIsAlertCreated(true);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white relative mb-4 border border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-green-600 text-sm leading-tight">
          Fiyat alarmı
        </h3>
        
        <div
          onClick={handleClick}
          className={`relative inline-flex flex-shrink-0 items-center w-12 h-6 rounded-full transition-colors ${
            isAlertCreated ? 'bg-blue-600' : 'bg-gray-200'
          } ${!isAlertCreated && !loading ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform flex items-center justify-center ${
              isAlertCreated ? 'translate-x-full' : ''
            }`}
          >
            {loading ? (
              <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Bell size={12} className={isAlertCreated ? "text-blue-600" : "text-gray-500"} />
            )}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Bu rota için fiyatlar değiştiğinde alarm alın.
      </p>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {isAlertCreated && !error && <p className="text-green-600 text-xs mt-2">Alarm başarıyla oluşturuldu!</p>}
      
      {showLogin && <LoginModal isOpen={true} onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// Favoriler Bileşeni
function SearchFavoriteBox({ origin, destination, departureDate }: { origin: string, destination: string, departureDate: Date }) {
  const { data: session, status } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = async () => {
    if (loading || isFavorite) return;

    if (status !== 'authenticated' || !session?.user) {
      setShowLogin(true);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/search-favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          departureDate: departureDate.toISOString()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Bir hata oluştu');
      setIsFavorite(true);
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white relative mb-4 border border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-green-600 text-sm leading-tight">
          Aramayı favorile
        </h3>
        
        <div
          onClick={handleClick}
          className={`relative inline-flex flex-shrink-0 items-center w-12 h-6 rounded-full transition-colors ${
            isFavorite ? 'bg-blue-600' : 'bg-gray-200'
          } ${!isFavorite && !loading ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform flex items-center justify-center ${
              isFavorite ? 'translate-x-full' : ''
            }`}
          >
            {loading ? (
              <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Heart size={12} className={isFavorite ? "text-blue-600" : "text-gray-500"} />
            )}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-2">
        Bu aramayı daha sonra kolayca tekrar yapmak için kaydet.
      </p>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      {isFavorite && !error && <p className="text-green-600 text-xs mt-2">Arama favorilere eklendi!</p>}
      
      {showLogin && <LoginModal isOpen={true} onClose={() => setShowLogin(false)} />}
    </div>
  );
}

// Yeni: Paket/brand detaylarını gösteren modern panel
function FlightBrandOptions({ flight, onSelectBrand }: { flight: any, onSelectBrand: (brand: any) => void }) {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rules, setRules] = useState<{ [brandId: string]: { title: string; detail: string }[] }>({});

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      setError(null);
      try {
        setTimeout(() => {
          const demoBrands = [
            { id: 'ecofly', name: 'EcoFly', price: flight.price, baggage: '15 kg', rules: 'İade edilemez, değişiklik ücretli', description: 'En uygun fiyatlı paket. Bagaj hakkı 15 kg.' },
            { id: 'extrafly', name: 'ExtraFly', price: flight.price + 20, baggage: '20 kg', rules: 'İade edilemez, değişiklik ücretsiz', description: 'Daha fazla bagaj ve esnek değişiklik hakkı.' },
            { id: 'primefly', name: 'PrimeFly', price: flight.price + 40, baggage: '30 kg', rules: 'İade ve değişiklik ücretsiz', description: 'En yüksek bagaj ve tam esneklik.' }
          ];
          setBrands(demoBrands);
          // Demo: Her brand için kuralı çek
          demoBrands.forEach(async (brand) => {
            const ruleList = await getAirRulesBiletDukkaniDemo({ fareId: 'demo-fare-id-12345', flightId: flight.id?.toString() || 'demo-flight-id', brandId: brand.id });
            setRules(prev => ({ ...prev, [brand.id]: ruleList }));
          });
          setLoading(false);
        }, 500);
      } catch (e) {
        setError('Paketler yüklenemedi');
        setLoading(false);
      }
    }
    fetchBrands();
  }, [flight]);

  if (loading) return <div className="p-4 text-gray-500">Paketler yükleniyor...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <div className="bg-gray-50 border border-green-200 rounded-xl p-4 mt-2 flex flex-col gap-3 animate-fade-in">
      <div className="font-semibold text-green-700 mb-2">Paket Seçenekleri</div>
      <div className="grid md:grid-cols-3 gap-4">
        {brands.map(brand => (
          <div key={brand.id} className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-2 shadow-sm">
            <div className="font-bold text-lg text-green-700">{brand.name}</div>
            <div className="text-gray-700 text-sm">{brand.description}</div>
            <div className="text-xs text-gray-500">Bagaj: {brand.baggage}</div>
            <div className="text-xs text-gray-500">Kurallar: {brand.rules}</div>
            <div className="font-bold text-xl text-green-700 mt-2">{brand.price} EUR</div>
            {/* Kurallar kutusu */}
            {rules[brand.id] && (
              <div className="mt-2 p-2 bg-gray-50 border border-gray-100 rounded text-[11px] text-gray-600 leading-tight">
                <div className="font-semibold text-gray-700 mb-1 text-[12px]">Taşıma/Bilet Kuralları</div>
                <ul className="list-disc pl-4">
                  {rules[brand.id].map((rule, idx) => (
                    <li key={idx}><span className="font-bold text-gray-700">{rule.title}:</span> {rule.detail}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => onSelectBrand(brand)}
            >
              Bu Paketi Seç
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FlightSearchPage() {
  const params = useSearchParams();
  const [selectedDeparture, setSelectedDeparture] = useState<Date | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<Date | null>(null);
  const [step, setStep] = useState<"departure" | "return">("departure");
  const [loading, setLoading] = useState(false);
  const [departureFlights, setDepartureFlights] = useState<any[]>([]);
  const [returnFlights, setReturnFlights] = useState<any[]>([]);
  const [loadingDeparture, setLoadingDeparture] = useState(false);
  const [loadingReturn, setLoadingReturn] = useState(false);
  const [errorDeparture, setErrorDeparture] = useState<string | null>(null);
  const [errorReturn, setErrorReturn] = useState<string | null>(null);

  // Fiyat kutuları için API entegrasyonu state'leri
  const [departurePrices, setDeparturePrices] = useState<any[]>([]);
  const [returnPrices, setReturnPrices] = useState<any[]>([]);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [errorPrices, setErrorPrices] = useState<string | null>(null);

  // Parametreleri oku
  const origin = params.get("origin") || "IST";
  const destination = params.get("destination") || "SAW";
  const departureDateStr = params.get("departureDate") || format(new Date(), 'yyyy-MM-dd');
  const returnDateStr = params.get("returnDate") || "";
  const tripType = params.get("tripType") || "oneWay";
  const passengersCount = params.get("passengers") || "1";

  // Havalimanı kodundan isim çıkarımı (örnek, gerçek API ile dinamik yapılabilir)
  function parseAirport(val: string) {
    if (!val) return { code: '', name: '' };
    const [code, ...rest] = val.split(' - ');
    return { code: code.trim(), name: rest.join(' - ').trim() };
  }
  const originObj = parseAirport(origin);
  const destinationObj = parseAirport(destination);

  // Tarih formatı
  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    try {
      const d = parseISO(dateStr);
      return format(d, 'dd MMM yyyy EEE', { locale: tr });
    } catch {
      return dateStr;
    }
  }

  // Tarihleri hazırla
  const departureDate = departureDateStr ? parseISO(departureDateStr) : new Date();
  const returnDate = returnDateStr ? parseISO(returnDateStr) : null;

  // Fiyat kutuları için API entegrasyonu
  useEffect(() => {
    setLoadingPrices(true);
    setErrorPrices(null);
    (async () => {
      try {
        const prices = await fetchPricesFromAPI(origin, destination, departureDate, "EUR");
        setDeparturePrices(prices && prices.length > 0 ? prices : getDemoPrices(departureDate, "EUR"));
        if (tripType === "roundTrip" && returnDate) {
          const returnPricesData = await fetchPricesFromAPI(destination, origin, returnDate, "EUR");
          setReturnPrices(returnPricesData && returnPricesData.length > 0 ? returnPricesData : getDemoPrices(returnDate, "EUR"));
        } else {
          setReturnPrices([]);
        }
      } catch (error) {
        console.error('Fiyat çekme hatası:', error);
        setErrorPrices('Fiyatlar yüklenirken hata oluştu');
        setDeparturePrices(getDemoPrices(departureDate, "EUR"));
        if (tripType === "roundTrip" && returnDate) {
          setReturnPrices(getDemoPrices(returnDate, "EUR"));
        }
      } finally {
        setLoadingPrices(false);
      }
    })();
  }, [origin, destination, tripType, returnDate]);

  // Otomatik olarak ortadaki günü seçili yap (ilk render'da)
  useEffect(() => {
    if (!selectedDeparture && departurePrices.length > 0) {
      // Ortadaki günü seçili yap
      setSelectedDeparture(departurePrices[3].date);
    }
  }, [departurePrices]);

  useEffect(() => {
    if (tripType === "roundTrip" && !selectedReturn && returnPrices.length > 0 && step === "return") {
      setSelectedReturn(returnPrices[3].date);
    }
  }, [returnPrices, tripType, step]);

  // Gidiş/dönüş seçim adımı
  const showReturn = tripType === "roundTrip" && step === "return";

  // Seçim handler
  function handleSelect(date: Date) {
    if (step === "departure") {
      setSelectedDeparture(date);
      if (tripType === "roundTrip") {
        setStep("return");
      }
    } else {
      setSelectedReturn(date);
    }
  }

  // Gidiş uçuşlarını çek
  useEffect(() => {
    if (!selectedDeparture) return;
    // Parametre olmasa da demo veri göster
    setLoadingDeparture(true);
    setErrorDeparture(null);
    (async () => {
      try {
        // --- DEMO: Her zaman örnek uçuşlar göster ---
        await new Promise(r => setTimeout(r, 500));
        const departureDate = format(selectedDeparture, 'yyyy-MM-dd');
        setDepartureFlights([
          {
            id: 1,
            airlineName: 'Turkish Airlines',
            flightNumber: 'TK123',
            origin: origin || 'IST',
            destination: destination || 'SAW',
            departureTime: `${departureDate}T09:00:00`,
            arrivalTime: `${departureDate}T10:20:00`,
            duration: '1s 20d',
            price: 120,
            direct: true,
            baggage: '15 kg',
          },
          {
            id: 2,
            airlineName: 'SunExpress',
            flightNumber: 'XQ456',
            origin: origin || 'IST',
            destination: destination || 'SAW',
            departureTime: `${departureDate}T13:30:00`,
            arrivalTime: `${departureDate}T15:00:00`,
            duration: '1s 30d',
            price: 99,
            direct: false,
            baggage: '20 kg',
          },
          {
            id: 3,
            airlineName: 'Airjet',
            flightNumber: 'AJ789',
            origin: origin || 'IST',
            destination: destination || 'SAW',
            departureTime: `${departureDate}T18:00:00`,
            arrivalTime: `${departureDate}T19:10:00`,
            duration: '1s 10d',
            price: 105,
            direct: true,
            baggage: '10 kg',
          },
        ]);
      } catch (e) {
        setErrorDeparture('Gidiş uçuşları yüklenirken hata oluştu.');
      } finally {
        setLoadingDeparture(false);
      }
    })();
  }, [selectedDeparture, origin, destination]);

  // Dönüş uçuşlarını çek
  useEffect(() => {
    if (tripType !== 'roundTrip' || !selectedReturn || !destination || !origin) return;
    setLoadingReturn(true);
    setErrorReturn(null);
    (async () => {
      // --- DEMO ---
      await new Promise(r => setTimeout(r, 1000));
      const returnDate = format(selectedReturn, 'yyyy-MM-dd');
      setReturnFlights([
        { 
          id: 3, 
          airlineName: 'Pegasus', 
          flightNumber: 'PC789', 
          origin: destination, 
          destination: origin, 
          departureTime: `${returnDate}T10:00:00`, 
          arrivalTime: `${returnDate}T13:00:00`, 
          duration: '3s 0d', 
          price: 110, 
          direct: true,
          baggage: '20 kg',
        },
        { 
          id: 4, 
          airlineName: 'SunExpress', 
          flightNumber: 'XQ101', 
          origin: destination, 
          destination: origin, 
          departureTime: `${returnDate}T18:00:00`, 
          arrivalTime: `${returnDate}T21:00:00`, 
          duration: '3s 0d', 
          price: 95, 
          direct: false,
          baggage: '15 kg',
        },
      ]);
    })();
  }, [selectedReturn, destination, origin, tripType]);

  // Filtre state'leri
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [departureHourRange, setDepartureHourRange] = useState<[number, number]>([0, 24]);
  // Yeni filtreler
  const [arrivalHourRange, setArrivalHourRange] = useState<[number, number]>([0, 24]);
  const [flightDurationRange, setFlightDurationRange] = useState<[number, number]>([0, 24]);
  const [maxStops, setMaxStops] = useState<number>(2);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [selectedCabinClass, setSelectedCabinClass] = useState<string>('economy');

  const allFlights = useMemo(() => [...departureFlights, ...returnFlights], [departureFlights, returnFlights]);

  // Havayolu listesi
  const [airlinesList, setAirlinesList] = useState<Airline[]>([]);
  useEffect(() => {
    getAirlines().then(setAirlinesList);
  }, []);

  // airlines state'i airlineName yerine airline code ile eşleşecek şekilde güncellenecek
  const airlines = useMemo(() => {
    if (allFlights.length === 0) return [];
    const allAirlines = allFlights.map(f => f.airlineName).filter(Boolean);
    return Array.from(new Set(allAirlines));
  }, [allFlights]);

  useEffect(() => {
    if (allFlights.length > 0) {
      const prices = allFlights.map(f => f.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange([min, max]);
      setMaxPrice(max);
    }
  }, [allFlights]);

  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines(prev =>
      prev.includes(airline)
        ? prev.filter(a => a !== airline)
        : [...prev, airline]
    );
  };

  const filteredFlights = useMemo(() => {
    return allFlights.filter(flight => {
      const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airlineName);
      const priceMatch = flight.price <= maxPrice;
      
      // Kalkış saati filtresi
      const departureHour = parseInt(flight.departureTime.slice(0, 2), 10);
      const departureHourMatch = departureHour >= departureHourRange[0] && departureHour <= departureHourRange[1];
      
      // Varış saati filtresi
      const arrivalHour = parseInt(flight.arrivalTime.slice(0, 2), 10);
      const arrivalHourMatch = arrivalHour >= arrivalHourRange[0] && arrivalHour <= arrivalHourRange[1];
      
      // Uçuş süresi filtresi (saat cinsinden)
      const durationMatch = flight.duration ? (() => {
        const durationStr = flight.duration;
        const hoursMatch = durationStr.match(/(\d+)s/);
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        return hours >= flightDurationRange[0] && hours <= flightDurationRange[1];
      })() : true;
      
      // Aktarma sayısı filtresi
      const stopsMatch = flight.direct ? (maxStops >= 0) : (maxStops >= 1);

      return airlineMatch && priceMatch && 
             departureHourMatch && arrivalHourMatch && durationMatch && stopsMatch;
    });
  }, [allFlights, selectedAirlines, maxPrice, 
      departureHourRange, arrivalHourRange, flightDurationRange, maxStops]);

  // Demo: Yolcu listesi (3 yolcu)
  const passengers = [
    { type: 'ADT', name: 'Ali Yılmaz' },
    { type: 'ADT', name: 'Ayşe Yılmaz' },
    { type: 'CHD', name: 'Mehmet Yılmaz' },
  ];
  // Demo: Her yolcu için ek bagaj opsiyonları
  const baggageOptions = [
    [ { weight: '0 kg', price: 0 }, { weight: '10 kg', price: 25 }, { weight: '20 kg', price: 40 } ],
    [ { weight: '0 kg', price: 0 }, { weight: '10 kg', price: 25 }, { weight: '20 kg', price: 40 } ],
    [ { weight: '0 kg', price: 0 }, { weight: '10 kg', price: 15 } ],
  ];
  const [baggageModalOpen, setBaggageModalOpen] = useState(false);
  const [baggageSelections, setBaggageSelections] = useState<string[]>(passengers.map(() => '0 kg'));

  const [openFlightId, setOpenFlightId] = useState<number | null>(null);
  const handleBrandSelect = (flight: any, brand: any) => {
    // Seçilen brand ile rezervasyon akışına devam et
    // Örnek: booking sayfasına flight ve brand bilgisini gönder
    const flightData = encodeURIComponent(JSON.stringify({ ...flight, selectedBrand: brand }));
    window.location.href = `/flights/booking?flight=${flightData}`;
  };

  // Responsive ve modern tasarım
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sol filtre paneli */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-100 p-4 hidden md:block md:ml-6">
          {/* Fiyat Alarmı ve Favoriler */}
          <PriceAlertBox origin={originObj.code} destination={destinationObj.code} departureDate={departureDate} />
          <SearchFavoriteBox origin={originObj.code} destination={destinationObj.code} departureDate={departureDate} />
          <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
            <Filter className="w-5 h-5" /> Filtreler
          </div>
          <div className="space-y-6 text-sm text-gray-600">
            {/* Havayolu filtresi */}
            {airlinesList.length > 0 && airlines.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Havayolu</h4>
                <div className="space-y-1">
                  {airlines.map(airlineName => {
                    const airlineObj = airlinesList.find(a => a.name.toLowerCase() === airlineName.toLowerCase());
                    return (
                      <label key={airlineName} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedAirlines.includes(airlineName)}
                          onChange={() => handleAirlineChange(airlineName)}
                        />
                        {airlineObj?.logoUrl && (
                          <img src={airlineObj.logoUrl} alt={airlineObj.name} className="h-5 w-5 object-contain" />
                        )}
                        <span>{airlineObj?.name || airlineName}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bilet Fiyatı Filtresi */}
            {allFlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Maksimum Fiyat</h4>
                <input
                  type="range"
                  min={priceRange[0]}
                  max={priceRange[1]}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{priceRange[0]} EUR</span>
                  <span className="font-bold">{maxPrice} EUR</span>
                </div>
              </div>
            )}

            {/* Kalkış Saati Filtresi */}
            {allFlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Kalkış Saati</h4>
                <div className="px-2">
                  <Slider
                    range
                    min={0}
                    max={24}
                    value={departureHourRange}
                    onChange={(value) => setDepartureHourRange(value as [number, number])}
                    allowCross={false}
                    step={1}
                    styles={{
                      track: { backgroundColor: '#2563eb', height: 6 },
                      handle: {
                        borderColor: '#2563eb',
                        backgroundColor: '#ffffff',
                        opacity: 1,
                        borderWidth: 2,
                        height: 18,
                        width: 18,
                        marginTop: -6,
                      },
                      rail: { backgroundColor: '#e5e7eb', height: 6 },
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{departureHourRange[0]}:00</span>
                  <span>{departureHourRange[1]}:00</span>
                </div>
              </div>
            )}

            {/* Varış Saati Filtresi */}
            {allFlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Varış Saati</h4>
                <div className="px-2">
                  <Slider
                    range
                    min={0}
                    max={24}
                    value={arrivalHourRange}
                    onChange={(value) => setArrivalHourRange(value as [number, number])}
                    allowCross={false}
                    step={1}
                    styles={{
                      track: { backgroundColor: '#2563eb', height: 6 },
                      handle: {
                        borderColor: '#2563eb',
                        backgroundColor: '#ffffff',
                        opacity: 1,
                        borderWidth: 2,
                        height: 18,
                        width: 18,
                        marginTop: -6,
                      },
                      rail: { backgroundColor: '#e5e7eb', height: 6 },
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{arrivalHourRange[0]}:00</span>
                  <span>{arrivalHourRange[1]}:00</span>
                </div>
              </div>
            )}

            {/* Uçuş Süresi Filtresi */}
            {allFlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Uçuş Süresi (Saat)</h4>
                <div className="px-2">
                  <Slider
                    range
                    min={0}
                    max={24}
                    value={flightDurationRange}
                    onChange={(value) => setFlightDurationRange(value as [number, number])}
                    allowCross={false}
                    step={1}
                    styles={{
                      track: { backgroundColor: '#2563eb', height: 6 },
                      handle: {
                        borderColor: '#2563eb',
                        backgroundColor: '#ffffff',
                        opacity: 1,
                        borderWidth: 2,
                        height: 18,
                        width: 18,
                        marginTop: -6,
                      },
                      rail: { backgroundColor: '#e5e7eb', height: 6 },
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{flightDurationRange[0]}s</span>
                  <span>{flightDurationRange[1]}s</span>
                </div>
              </div>
            )}

            {/* Aktarma Sayısı Filtresi */}
            <div>
              <h4 className="font-semibold mb-2">Maksimum Aktarma</h4>
              <div className="space-y-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="maxStops"
                    value="0"
                    checked={maxStops === 0}
                    onChange={(e) => setMaxStops(Number(e.target.value))}
                    className="rounded"
                  />
                  Direkt uçuşlar (0 aktarma)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="maxStops"
                    value="1"
                    checked={maxStops === 1}
                    onChange={(e) => setMaxStops(Number(e.target.value))}
                    className="rounded"
                  />
                  En fazla 1 aktarma
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="maxStops"
                    value="2"
                    checked={maxStops === 2}
                    onChange={(e) => setMaxStops(Number(e.target.value))}
                    className="rounded"
                  />
                  En fazla 2 aktarma
                </label>
              </div>
            </div>

            {/* Kabin Sınıfı Filtresi */}
            <div>
              <h4 className="font-semibold mb-2">Kabin Sınıfı</h4>
              <div className="space-y-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cabinClass"
                    value="economy"
                    checked={selectedCabinClass === 'economy'}
                    onChange={(e) => setSelectedCabinClass(e.target.value)}
                    className="rounded"
                  />
                  Ekonomi
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cabinClass"
                    value="business"
                    checked={selectedCabinClass === 'business'}
                    onChange={(e) => setSelectedCabinClass(e.target.value)}
                    className="rounded"
                  />
                  Business
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cabinClass"
                    value="first"
                    checked={selectedCabinClass === 'first'}
                    onChange={(e) => setSelectedCabinClass(e.target.value)}
                    className="rounded"
                  />
                  First Class
                </label>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-2 md:p-8">
          {/* Sadeleştirilmiş Uçuş Arama Kutusu */}
          <div className="mb-6">
            <FlightSearchBox
              initialOrigin={origin}
              initialDestination={destination}
              initialTripType={tripType}
              initialDepartureDate={departureDateStr}
              initialReturnDate={returnDateStr}
              initialPassengers={passengersCount}
              onSubmit={(params) => {
                // Yeni arama yapıldığında URL parametrelerini güncelle
                const search = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                  if (value) search.append(key, value);
                });
                window.location.href = `/flights/search?${search.toString()}`;
              }}
            />
            {/* Fiyat kutuları buraya taşındı */}
            <div className="mt-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-shrink-0">
                  <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <PlaneTakeoff className="w-6 h-6 text-green-600" />
                    <span>Gidiş Tarihi Seçimi</span>
                  </div>
                  <div className="text-gray-500 text-sm mt-1 ml-8">
                    {origin} → {destination}
                  </div>
                </div>
                <div className="flex-grow flex gap-2 mt-2 md:mt-0 overflow-x-auto pb-2">
                  {loadingPrices ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  ) : errorPrices ? (
                    <div className="text-red-500 text-sm">{errorPrices}</div>
                  ) : (
                    departurePrices.map(({ date, price, currency }) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => {
                          handleSelect(date);
                          if (tripType === "roundTrip") setStep("return");
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 min-w-[80px]
                          ${(selectedDeparture && isSameDay(date, selectedDeparture))
                            ? "bg-green-500 text-white border-green-500 shadow-lg" 
                            : "bg-white text-gray-800 border-gray-200 hover:border-green-400 hover:shadow-md"}
                        `}
                      >
                        <span className="text-sm font-medium">{format(date, "dd MMM", { locale: tr })}</span>
                        <span className="font-bold text-xl mt-1">{price.toLocaleString()}</span>
                        <span className="text-xs font-medium opacity-80">{currency}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Uçuş kartları */}
          <div className="space-y-3">
            {loadingDeparture ? (
              <div className="flex flex-col items-center py-8 text-gray-400"><Loader2 className="w-8 h-8 animate-spin mb-2" /> Yükleniyor...</div>
            ) : errorDeparture ? (
              <div className="text-red-500 py-8">{errorDeparture}</div>
            ) : filteredFlights.length === 0 ? (
              <div className="text-gray-400 text-sm italic">Uygun gidiş uçuşu bulunamadı.</div>
            ) : (
              filteredFlights.map(flight => (
                <div key={flight.id}>
                  <FlightCard flight={flight} onSelect={() => setOpenFlightId(openFlightId === flight.id ? null : flight.id)} airlinesList={airlinesList} />
                  {openFlightId === flight.id && (
                    <FlightBrandOptions
                      flight={flight}
                      onSelectBrand={brand => handleBrandSelect(flight, brand)}
                    />
                  )}
                </div>
              ))
            )}
          </div>
          {/* Bagaj seçimi modalı */}
          {baggageModalOpen && (
            <BaggageModal
              open={baggageModalOpen}
              onClose={() => setBaggageModalOpen(false)}
              passengers={passengers}
              baggageOptions={baggageOptions}
              onSave={setBaggageSelections}
            />
          )}
        </main>
      </div>
    </>
  );
} 