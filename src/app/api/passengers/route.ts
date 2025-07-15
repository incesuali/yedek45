import { NextResponse } from 'next/server';

// GET: Tüm yolcuları getir
export async function GET() {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Passengers List API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
}

// POST: Yeni yolcu ekle
export async function POST(request: Request) {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Passengers List API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
} 