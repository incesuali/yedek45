<<<<<<< HEAD
# GRBT - Gurbet.biz Web Uygulaması

Modern Next.js tabanlı web uygulaması.

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
- PostgreSQL: 16
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
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

<<<<<<< HEAD
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
=======
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

<<<<<<< HEAD
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
=======
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

<<<<<<< HEAD
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 6098fe3831dde8c733c4b0e464c7ef891ffef491
