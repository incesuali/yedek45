'use client';

import Image from 'next/image';

export default function MobileAppBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-green-700 via-teal-600 to-green-800 rounded-2xl shadow-lg px-3 py-3 flex flex-col sm:flex-col items-center text-center relative">
      {/* Mobilde yatay hizalama */}
      <div className="flex flex-row sm:flex-col items-center w-full justify-center">
        {/* Telefon ikonu sola */}
        <div className="block sm:hidden flex-shrink-0 flex items-center justify-center mr-2" style={{ minWidth: 60 }}>
          <svg width="56" height="84" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="8" width="52" height="104" rx="12" fill="#fff" stroke="#222" strokeWidth="3"/>
            <rect x="30" y="16" width="20" height="4" rx="2" fill="#e5e7eb"/>
            <rect x="37" y="104" width="6" height="4" rx="2" fill="#e5e7eb"/>
            <circle cx="40" cy="24" r="2" fill="#222"/>
            <rect x="34" y="100" width="12" height="2" rx="1" fill="#222" opacity="0.2"/>
            {/* gurbetbiz logo */}
            <g>
              <foreignObject x="16" y="44" width="48" height="24">
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                  <span style={{color:'#16a34a',fontWeight:'800',fontSize:'10px',fontFamily:'inherit'}}>gurbet</span><span style={{color:'#222',fontWeight:'800',fontSize:'10px',fontFamily:'inherit'}}>biz</span>
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
        {/* Yazılar sağda */}
        <div className="flex flex-col items-start text-left justify-center flex-1">
          <div className="flex items-center mb-1">
            <span className="text-white text-lg font-extrabold">gurbet</span><span className="text-black text-lg font-extrabold">biz</span>
            <span className="text-black text-xs font-medium ml-2">Mobil Uygulama</span>
          </div>
          <div className="text-white text-base font-normal mb-1">Avrupa’dan Türkiye’ye Yol arkadasiniz</div>
          <div className="text-white text-lg font-extrabold mb-2">
            <span className="text-white">Hemen </span>
            <span className="text-white uppercase tracking-wider">İNDİR !</span>
          </div>
        </div>
      </div>
      {/* Store badge'leri */}
      <div className="flex gap-4 justify-center w-full mt-2 items-center">
        <a href="#" className="block">
          <Image
            src="/images/app-store.png"
            alt="App Store"
            width={140}
            height={44}
            className="h-11 w-[140px] object-contain"
          />
        </a>
        <a href="#" className="block">
          <Image
            src="/images/google-play.png"
            alt="Google Play"
            width={140}
            height={44}
            className="h-11 w-[140px] object-contain"
          />
        </a>
      </div>
    </div>
  );
} 