import { PlaneTakeoff, Building, Wifi, MapPin, CalendarDays, ArrowRightLeft, UserCircle2, Car, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">      
      {/* Hero Section */}
      <div className="bg-green-500 text-center text-white pb-32 pt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-white">gurbet</span>
            <span className="text-black">biz</span>
          </h1>
          <h2 className="text-xl font-light">Hoşgeldin Gurbetçi</h2>
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
        <div className="bg-white rounded-[32px] shadow-lg p-8">
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
                <label className="block text-sm text-gray-500 mb-1">Dönüş</label>
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
                  <input
                    type="text"
                    placeholder="1 Yolcu, Ekonomi"
                    className="w-full pl-7 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-end">
              <button className="w-full bg-green-500 text-white px-8 py-4 rounded-[24px] text-lg hover:bg-green-600 transition-colors">
                Ara
              </button>
            </div>
          </div>
        </div>

        {/* İşlem Butonları */}
        <div className="bg-white rounded-[32px] shadow-lg mt-4 p-6">
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
      <div className="container mx-auto px-4 mt-12">
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
            <div className="flex gap-3">
              {/* App Store Butonu */}
              <a href="#" className="block">
                <Image 
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-[40px] w-auto"
                />
              </a>
              {/* Google Play Butonu */}
              <a href="#" className="block">
                <Image 
                  src="/images/google-play-badge.svg"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="h-[40px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Kampanyalar Section */}
      <div className="container mx-auto px-4 mt-12 mb-24">
        <h2 className="text-2xl font-semibold text-gray-800">Kampanyalar</h2>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/campaigns/early-flight.jpg"
                alt="Erken Rezervasyon Uçak Bileti"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-700 font-medium">Erken Rezervasyon Uçak Bileti</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/campaigns/hotel-deals.jpg"
                alt="Otel Fırsatları"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-700 font-medium">Otel Fırsatları</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/campaigns/car-rental.jpg"
                alt="Araç Kiralama İndirimi"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-700 font-medium">Araç Kiralama İndirimi</h3>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/campaigns/summer-hotels.jpg"
                alt="Yaz Sezonu Otelleri"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-gray-700 font-medium">Yaz Sezonu Otelleri</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-base font-semibold text-gray-600 mb-4">Şirket</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Hakkımızda</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Turna Blog</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Resmi Tatiller</Link></li>
              </ul>
            </div>
            <div className="col-start-2">
              <h3 className="text-base font-semibold text-gray-600 mb-4">Yardım ve Destek</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Yardım ve İletişim</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Sıkça Sorulan Sorular</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">E-Posta</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Turna API</Link></li>
              </ul>
            </div>
            <div className="col-start-3">
              <h3 className="text-base font-semibold text-gray-600 mb-4">Gizlilik ve Güvenlik</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Kullanım Şartları</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Gizlilik Politikası</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Çerez Politikası</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Kişisel Verilerin Korunması</Link></li>
                <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900">Ticari Elektronik İleti Açık Rıza Metni</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
