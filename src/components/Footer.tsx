import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-semibold text-gray-600 mb-4">Şirket</h3>
            <ul className="space-y-2">
              <li><Link href="/hakkimizda" className="text-sm text-gray-700 hover:text-gray-900">Hakkımızda</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-700 hover:text-gray-900">gurbet.biz Blog</Link></li>
              <li><Link href="/resmi-tatiller" className="text-sm text-gray-700 hover:text-gray-900">Resmi Tatiller</Link></li>
            </ul>
          </div>
          
          <div className="col-start-2">
            <h3 className="text-base font-semibold text-gray-600 mb-4">Yardım ve Destek</h3>
            <ul className="space-y-2">
              <li><Link href="/yardim" className="text-sm text-gray-700 hover:text-gray-900">Yardım ve İletişim</Link></li>
              <li><Link href="/sss" className="text-sm text-gray-700 hover:text-gray-900">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="text-sm text-gray-700 hover:text-gray-900">E-Posta</Link></li>
              <li><Link href="/api" className="text-sm text-gray-700 hover:text-gray-900">gurbet.biz API</Link></li>
            </ul>
          </div>
          
          <div className="col-start-3">
            <h3 className="text-base font-semibold text-gray-600 mb-4">Gizlilik ve Güvenlik</h3>
            <ul className="space-y-2">
              <li><Link href="/kullanim-sartlari" className="text-sm text-gray-700 hover:text-gray-900">Kullanım Şartları</Link></li>
              <li><Link href="/gizlilik-politikasi" className="text-sm text-gray-700 hover:text-gray-900">Gizlilik Politikası</Link></li>
              <li><Link href="/cerez-politikasi" className="text-sm text-gray-700 hover:text-gray-900">Çerez Politikası</Link></li>
              <li><Link href="/kvkk" className="text-sm text-gray-700 hover:text-gray-900">Kişisel Verilerin Korunması</Link></li>
              <li><Link href="/ticari-elektronik-ileti" className="text-sm text-gray-700 hover:text-gray-900">Ticari Elektronik İleti Açık Rıza Metni</Link></li>
            </ul>
          </div>

          <div className="col-start-4">
            <h3 className="text-base font-semibold text-gray-600 mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700">
                <strong>Adres:</strong><br />
                Örnek Mahallesi, Örnek Sokak<br />
                No: 123, Kat: 4<br />
                34000 İstanbul, Türkiye
              </li>
              <li className="text-sm text-gray-700">
                <strong>Telefon:</strong><br />
                +90 (212) 123 45 67
              </li>
              <li className="text-sm text-gray-700">
                <strong>E-posta:</strong><br />
                info@gurbet.biz
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-baseline">
              <span className="text-[17px] font-bold text-gray-700">gurbet</span>
              <span className="text-[17px] font-bold text-green-500">biz</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} gurbet.biz. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 