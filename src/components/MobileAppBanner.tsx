'use client';

import Image from 'next/image';

export default function MobileAppBanner() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-4">
        <Image 
          src="/images/app-qr.svg" 
          alt="gurbet.biz app" 
          width={48} 
          height={48} 
          className="rounded-xl"
        />
        <div className="flex-1">
          <div className="text-[15px] font-medium">
            gurbet.biz
          </div>
          <div className="text-[13px] text-gray-600">
            Mobil uygulamamızı indirin
          </div>
        </div>
        <div className="flex gap-2">
          <a 
            href="#" 
            className="bg-black hover:bg-gray-900 transition-colors rounded-lg px-4 py-2 flex items-center"
          >
            <Image 
              src="/images/app-store-badge.svg" 
              alt="App Store" 
              width={24} 
              height={24} 
              className="w-6 h-6"
            />
            <div className="ml-2">
              <div className="text-[10px] text-gray-400">Download on the</div>
              <div className="text-white font-semibold text-[12px] -mt-1">App Store</div>
            </div>
          </a>
          <a 
            href="#" 
            className="bg-black hover:bg-gray-900 transition-colors rounded-lg px-4 py-2 flex items-center"
          >
            <Image 
              src="/images/google-play-badge.svg" 
              alt="Google Play" 
              width={24} 
              height={24} 
              className="w-6 h-6"
            />
            <div className="ml-2">
              <div className="text-[10px] text-gray-400">GET IT ON</div>
              <div className="text-white font-semibold text-[12px] -mt-1">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
} 