'use client';

import { MapPin, CalendarDays, UserCircle2, ArrowRightLeft, PlaneTakeoff, XCircle, Building, Car, Wifi } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignCard from '@/components/CampaignCard';

export default function Home() {
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
            <div className="flex items-center mb-8">
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative w-6 h-6">
                    <input
                      type="radio"
                      name="tripType"
                      value="oneWay"
                      defaultChecked
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full rounded-full border-2 border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500"></div>
                  </div>
                  <span className="text-gray-700">Tek yön</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative w-6 h-6">
                    <input
                      type="radio"
                      name="tripType"
                      value="roundTrip"
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full rounded-full border-2 border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500"></div>
                  </div>
                  <span className="text-gray-700">Gidiş-dönüş</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative w-6 h-6">
                    <input
                      type="radio"
                      name="tripType"
                      value="multiCity"
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full rounded-full border-2 border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500"></div>
                  </div>
                  <span className="text-gray-700">Çoklu uçuş</span>
                </label>
              </div>
              <div className="ml-auto">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative w-6 h-6">
                    <input
                      type="checkbox"
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full rounded border-2 border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500"></div>
                  </div>
                  <span className="text-gray-700">Aktarmasız</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2 flex">
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-[24px] p-4">
                    <label className="block text-sm text-gray-500 mb-1">Nereden</label>
                    <div className="relative">
                      <MapPin className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Şehir veya havalimanı"
                        className="w-full pl-7 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative px-2">
                  <button className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-10 mx-auto w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <ArrowRightLeft className="w-4 h-4 text-green-500" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-[24px] p-4">
                    <label className="block text-sm text-gray-500 mb-1">Nereye</label>
                    <div className="relative">
                      <MapPin className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Şehir veya havalimanı"
                        className="w-full pl-7 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-gray-50 rounded-[24px] p-4">
                  <label className="block text-sm text-gray-500 mb-1">Gidiş Tarihi</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="30.05.2025"
                      className="w-full pl-7 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-gray-50 rounded-[24px] p-4">
                  <label className="block text-sm text-gray-500 mb-1">Dönüş Tarihi</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="30.05.2025"
                      className="w-full pl-7 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="bg-gray-50 rounded-[24px] p-4">
                  <label className="block text-sm text-gray-500 mb-1">Yolcu</label>
                  <div className="relative">
                    <UserCircle2 className="absolute left-0 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-7 bg-transparent text-gray-700 focus:outline-none appearance-none">
                      <option>1 Yolcu</option>
                      <option>2 Yolcu</option>
                      <option>3 Yolcu</option>
                      <option>4 Yolcu</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <button className="w-full h-full bg-green-500 text-white rounded-[24px] font-medium hover:bg-green-600 transition-colors">
                  Uçuş Ara
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
