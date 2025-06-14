# GRBT - Gurbet.biz Web Uygulaması

Modern Next.js tabanlı web uygulaması.

## ⚠️ Geçici Çözümler ve Yapılması Gerekenler

### Veritabanı Geçici Çözümü
Şu anda PostgreSQL kurulumu tamamlanana kadar kullanıcı bilgileri geçici olarak JSON dosyasında saklanmaktadır:
- Kullanıcı bilgileri `data/users.json` dosyasında tutulmaktadır
- Bu geçici bir çözümdür ve production'da kullanılmamalıdır
- PostgreSQL kurulumu tamamlandığında bu yapı kaldırılacaktır

### Yapılması Gerekenler
1. PostgreSQL kurulumu
2. Prisma migration'larının oluşturulması
3. Kullanıcı verilerinin PostgreSQL'e taşınması
4. JSON dosya yapısının kaldırılması

## Geliştirme Ortamı

```bash
# Node.js sürümünü ayarla
nvm use 18.17.0

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## Önemli Notlar ve Best Practices

### 1. Client/Server Component Yapısı
- Next.js'de component'leri mümkün olduğunca basit tutun
- Client ve Server component'leri net bir şekilde ayırın
- Her component'in sorumluluğunu minimize edin
- State yönetimini sadece gerekli yerlerde kullanın

### 2. Routing ve Navigation
- Modal yerine sayfa routing'i tercih edin
- Link component'ini kullanın (onClick event handler yerine)
- Her sayfanın kendi state'ini yönetmesine izin verin
- Dynamic routing için loading ve error state'lerini unutmayın

### 3. State Yönetimi
- Global state'i minimize edin
- Component'lerde local state kullanın
- State updates'i optimize edin
- Hydration sorunlarına dikkat edin

### 4. Performance İyileştirmeleri
- Image optimizasyonlarını kullanın
- Code splitting'i etkin kullanın
- Lazy loading uygulayın
- Bundle size'ı kontrol edin

### 5. Debug ve Geliştirme
- Development modunda debug tool'ları kullanın
- Error boundary'leri implement edin
- Console logları temiz tutun
- Hot reload'u optimize edin

## Proje Yapısı

```
src/
  ├── app/                    # Next.js 13 app router
  │   ├── layout.tsx         # Root layout
  │   ├── page.tsx           # Ana sayfa
  │   └── ...               # Diğer sayfalar
  ├── components/            # Shared components
  │   ├── Header.tsx        # Site header
  │   └── ...               # Diğer componentler
  └── styles/               # Global styles
data/                      # Geçici JSON dosyaları (kaldırılacak)
  └── users.json           # Kullanıcı bilgileri (geçici)
```

## Sık Karşılaşılan Sorunlar ve Çözümleri

1. **Hydration Hataları**
   - Client/Server component ayrımını net yapın
   - useState hook'unu doğru yerde kullanın
   - Modal yerine sayfa routing tercih edin

2. **Performance Sorunları**
   - Component'leri basit tutun
   - Gereksiz re-render'ları önleyin
   - Image optimizasyonlarını kullanın

3. **State Yönetimi**
   - Global state yerine local state tercih edin
   - Props drilling'den kaçının
   - Context API'yi dikkatli kullanın

## Deployment

```bash
# Production build
npm run build

# Production sunucusu başlat
npm run start
```

## Lisans
MIT

## Teknoloji Sürümleri

- Node.js: 18.17.0 LTS (Sabit sürüm)
- Next.js: 13.5.6
- React: 18.2.0
- TypeScript: 5.0.4
- PostgreSQL: 16 (kurulum bekliyor)
- Tailwind CSS: 3.3.5

## Node.js Sürüm Kontrolü

Bu proje Node.js 18.17.0 sürümüne sabitlenmiştir. Sürüm kontrolü 3 farklı yerde yapılmaktadır:

1. `./nvmrc` dosyası - nvm için sürüm kontrolü
   ```
   18.17.0
   ```

2. `./package.json` içinde engines kısmı - npm için sürüm kontrolü
   ```json
   "engines": {
     "node": "18.17.0",
     "npm": "9.6.7"
   }
   ```

3. `./check-version.js` - runtime sürüm kontrolü
   ```javascript
   if (process.version !== 'v18.17.0') {
     console.error('🚨 HATA: Bu proje SADECE Node.js 18.17.0 ile çalışır!');
     process.exit(1);
   }
   ```

⚠️ Proje sadece Node.js 18.17.0 ile çalışır. Farklı bir sürüm kullanıldığında:
- nvm otomatik olarak 18.17.0'a geçiş yapar
- npm install sırasında uyarı verir
- npm run dev çalıştırıldığında hata verir

## Yolcu Bilgileri Yönetimi

### Veritabanı Şeması
Yolcu bilgileri `Passenger` modeli ile yönetilmektedir:

```prisma
model Passenger {
  id              String    @id @default(cuid())
  userId          String
  firstName       String
  lastName        String
  identityNumber  String?
  isForeigner     Boolean   @default(false)
  birthDay        String
  birthMonth      String
  birthYear       String
  gender          String
  countryCode     String?
  phone           String?
  hasMilCard      Boolean   @default(false)
  hasPassport     Boolean   @default(false)
  passportNumber  String?
  passportExpiry  DateTime?
  milCardNumber   String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  status          String    @default("active")

  user            User      @relation(fields: [userId], references: [id])
}
```

### API Endpointleri

1. **Yolcu Listesi** - `GET /api/passengers`
   - Oturum açmış kullanıcının yolcularını listeler
   - Aktif durumdaki yolcuları getirir
   - Oluşturulma tarihine göre sıralı

2. **Yolcu Ekleme** - `POST /api/passengers`
   - Yeni yolcu kaydı oluşturur
   - Zorunlu alanlar: ad, soyad, doğum tarihi, cinsiyet
   - TC kimlik numarası validasyonu (11 hane)

3. **Yolcu Detayı** - `GET /api/passengers/[id]`
   - Belirli bir yolcunun detaylarını getirir
   - Yolcu ID ve kullanıcı kontrolü yapılır

4. **Yolcu Güncelleme** - `PUT /api/passengers/[id]`
   - Mevcut yolcu bilgilerini günceller
   - Tüm validasyonlar tekrar kontrol edilir
   - Pasaport ve MilKart bilgileri opsiyonel

5. **Yolcu Silme** - `DELETE /api/passengers/[id]`
   - Soft delete uygular (status = "deleted")
   - Yolcu kaydı veritabanından silinmez

### Güvenlik Kontrolleri

1. **Oturum Kontrolü**
   - Tüm API endpointleri oturum kontrolü yapar
   - `getServerSession` ile NextAuth.js entegrasyonu

2. **Veri Validasyonu**
   - TC Kimlik numarası kontrolü (11 hane)
   - Zorunlu alan kontrolleri
   - Tarih formatı kontrolleri

3. **Yetki Kontrolü**
   - Her kullanıcı sadece kendi yolcularına erişebilir
   - Yolcu-kullanıcı ilişkisi kontrol edilir

### Kullanım Örneği

```typescript
// Yeni yolcu ekleme
const response = await fetch('/api/passengers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    birthDay: '01',
    birthMonth: '01',
    birthYear: '1990',
    gender: 'male',
    identityNumber: '12345678901',
    isForeigner: false
  })
});

// Yolcu listesi alma
const passengers = await fetch('/api/passengers').then(res => res.json());
```

### Hata Yönetimi

- 400: Validasyon hataları
- 401: Oturum hatası
- 404: Yolcu bulunamadı
- 500: Sunucu hatası

Her hata durumu için detaylı hata mesajları döndürülür.

## TODO / Yapılacaklar Listesi

- [ ] Google ile Giriş (OAuth) ayarları tamamlanacak
    - Google Cloud Console'da doğru redirect URI'ler eklenecek
    - .env dosyasında GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ve NEXTAUTH_URL doğru olacak
    - Uygulama çalıştığı port ile birebir aynı URI kullanılacak
- [ ] Facebook ile Giriş (OAuth) ayarları yapılacak
    - Facebook Developers Console'da uygulama oluşturulacak
    - Facebook Login > Settings kısmında Valid OAuth Redirect URIs olarak aşağıdakiler eklenecek:
        - http://localhost:3002/api/auth/callback/facebook
        - http://localhost:3003/api/auth/callback/facebook
        - http://localhost:3004/api/auth/callback/facebook
        - http://localhost:3005/api/auth/callback/facebook
    - .env dosyasında FACEBOOK_CLIENT_ID ve FACEBOOK_CLIENT_SECRET doğru olacak
    - Uygulama çalıştığı port ile birebir aynı URI kullanılacak
- [ ] Diğer geliştirme başlıkları buraya eklenebilir

> Not: Google veya Facebook ile girişte "redirect_uri_mismatch" hatası alınırsa, yukarıdaki adımlar tekrar kontrol edilmeli.
