import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Register API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
} 