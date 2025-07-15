import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Price Alerts API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
} 