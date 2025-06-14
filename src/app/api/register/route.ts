import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      return NextResponse.json({ error: 'Tüm alanlar zorunlu.' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: 'Bu e-posta ile zaten bir hesap var.' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        countryCode: data.countryCode,
        phone: data.phone,
        status: 'active',
        role: 'user'
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.' }, { status: 500 });
  }
} 