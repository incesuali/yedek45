import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import SessionProviderWrapper from "../components/SessionProviderWrapper"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gurbet.biz - Yurt Dışı Seyahat Platformu',
  description: 'Yurt dışı seyahatleriniz için en uygun fiyatlı uçak bileti, otel ve araç kiralama hizmetleri.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
        <Toaster />
      </body>
    </html>
  )
}
