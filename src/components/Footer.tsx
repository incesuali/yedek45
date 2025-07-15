// !!! SADECE MOBİL DÜZENLEME, DESKTOPA DOKUNMA !!!
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-24">
      <div className="container mx-auto px-4 py-16">
        <div
          className="grid grid-cols-4 gap-8
            max-md:grid-cols-1 max-md:gap-4 max-md:space-y-8 max-md:pt-4"
        >
          <div>
            <h3 className="text-base font-semibold text-gray-600 mb-4 max-md:mb-2">Şirket</h3>
            <ul className="space-y-2 max-md:space-y-1">
              <li><Link href="/hakkimizda" className="text-sm text-gray-700 hover:text-gray-900">Hakkımızda</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-700 hover:text-gray-900">gurbet.biz Blog</Link></li>
              <li><Link href="/resmi-tatiller" className="text-sm text-gray-700 hover:text-gray-900">Resmi Tatiller</Link></li>
            </ul>
          </div>
          <div className="col-start-2 max-md:col-start-auto">
            <h3 className="text-base font-semibold text-gray-600 mb-4 max-md:mb-2">Yardım ve Destek</h3>
            <ul className="space-y-2 max-md:space-y-1">
              <li><Link href="/yardim" className="text-sm text-gray-700 hover:text-gray-900">Yardım ve İletişim</Link></li>
              <li><Link href="/sss" className="text-sm text-gray-700 hover:text-gray-900">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="text-sm text-gray-700 hover:text-gray-900">E-Posta</Link></li>
              <li><Link href="/api" className="text-sm text-gray-700 hover:text-gray-900">gurbet.biz API</Link></li>
            </ul>
          </div>
          <div className="col-start-3 max-md:col-start-auto">
            <h3 className="text-base font-semibold text-gray-600 mb-4 max-md:mb-2">Gizlilik ve Güvenlik</h3>
            <ul className="space-y-2 max-md:space-y-1">
              <li><Link href="/kullanim-sartlari" className="text-sm text-gray-700 hover:text-gray-900">Kullanım Şartları</Link></li>
              <li><Link href="/gizlilik-politikasi" className="text-sm text-gray-700 hover:text-gray-900">Gizlilik Politikası</Link></li>
              <li><Link href="/cerez-politikasi" className="text-sm text-gray-700 hover:text-gray-900">Çerez Politikası</Link></li>
              <li><Link href="/kvkk" className="text-sm text-gray-700 hover:text-gray-900">Kişisel Verilerin Korunması</Link></li>
              <li><Link href="/ticari-elektronik-ileti" className="text-sm text-gray-700 hover:text-gray-900">Ticari Elektronik İleti Açık Rıza Metni</Link></li>
            </ul>
          </div>
          <div className="col-start-4 max-md:col-start-auto">
            <h3 className="text-base font-semibold text-gray-600 mb-4 max-md:mb-2">İletişim</h3>
            <ul className="space-y-2 max-md:space-y-1">
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

        <div className="mt-16 pt-8 border-t border-gray-200 max-md:mt-8 max-md:pt-4">
          <div className="flex justify-between items-center max-md:flex-col max-md:gap-2 max-md:text-center">
            <div className="flex items-baseline justify-center max-md:mb-1">
              <span className="text-[17px] font-bold text-gray-700">gurbet</span>
              <span className="text-[17px] font-bold text-green-500">biz</span>
            </div>
            <p className="text-sm text-gray-500 max-md:mt-1">
              © {new Date().getFullYear()} gurbet.biz. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 