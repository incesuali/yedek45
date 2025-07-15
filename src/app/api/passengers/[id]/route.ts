import { NextResponse } from 'next/server';

// GET: Belirli bir yolcuyu getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Passengers API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
}

// PUT: Yolcu bilgilerini güncelle
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Passengers API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
}

// DELETE: Yolcu kaydını sil (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Vercel deployment için geçici olarak devre dışı
  return NextResponse.json({ 
    message: 'Passengers API geçici olarak devre dışı',
    note: 'Vercel deployment için Prisma ayarları gerekli'
  }, { status: 200 });
} 