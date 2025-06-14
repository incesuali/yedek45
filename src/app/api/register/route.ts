import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import type { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Sadece email ve password zorunlu
    if (!data.email || !data.password) {
      return NextResponse.json({ error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }
    
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: 'Bu e-posta ile zaten bir hesap var.' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Transaction ile kullanıcı ve yolcu birlikte oluşturulsun
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          countryCode: data.countryCode || '',
          phone: data.phone || '',
          status: 'active',
          role: 'user'
        }
      });
      await tx.passenger.create({
        data: {
          userId: user.id,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          identityNumber: data.identityNumber || null,
          isForeigner: data.isForeigner || false,
          birthDay: data.birthDay || '',
          birthMonth: data.birthMonth || '',
          birthYear: data.birthYear || '',
          gender: data.gender || '',
          countryCode: data.countryCode || '',
          phone: data.phone || '',
          hasMilCard: false,
          hasPassport: false,
          isAccountOwner: true
        }
      });
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Kayıt Hatası:', error);
    return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.', detail: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 