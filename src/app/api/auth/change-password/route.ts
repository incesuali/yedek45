import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    // Basit doğrulama
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Test kullanıcısı için sabit şifre kontrolü
    if (currentPassword !== 'test123') {
      return NextResponse.json(
        { error: 'Mevcut şifre yanlış' },
        { status: 400 }
      );
    }

    // Simüle edilmiş şifre değiştirme
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: 'Şifre başarıyla değiştirildi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Şifre değiştirme hatası:', error);
    return NextResponse.json(
      { error: 'Şifre değiştirme başarısız' },
      { status: 500 }
    );
  }
} 