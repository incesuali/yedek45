import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode?: string;
  phone?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  gender?: string;
  identityNumber?: string;
  isForeigner: boolean;
  birthDate?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  status: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

export async function GET(request: Request) {
  try {
    // Session'dan giriş yapan kullanıcının e-posta adresini al
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    // Mevcut kullanıcıları oku
    let users: UserData[] = [];
    try {
      const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf8');
      users = JSON.parse(fileContent);
    } catch (error) {
      users = [];
    }

    // E-posta ile kullanıcıyı bul
    const user = users.find(u => u.email === userEmail);
    if (!user) {
      // Kullanıcı yoksa, boş bir kullanıcı objesi döndür
      return NextResponse.json({
        id: '',
        firstName: '',
        lastName: '',
        email: userEmail,
        countryCode: '',
        phone: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        gender: '',
        identityNumber: '',
        isForeigner: false,
        birthDate: null,
        createdAt: '',
        updatedAt: '',
        lastLoginAt: '',
        status: 'active'
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Kullanıcı bilgileri getirme hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcı bilgileri getirilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    const data = await request.json();
    
    // Basit validasyon
    if (!data.firstName || !data.lastName) {
      return NextResponse.json(
        { error: 'Ad ve soyad zorunludur' },
        { status: 400 }
      );
    }

    // TC Kimlik validasyonu (basit)
    if (data.identityNumber && data.identityNumber.length !== 11) {
      return NextResponse.json(
        { error: 'TC Kimlik numarası 11 haneli olmalıdır' },
        { status: 400 }
      );
    }

    // Kullanıcı verilerini hazırla
    const userData: UserData = {
      id: '1', // Şimdilik sabit ID
      ...data,
      birthDate: data.birthDay && data.birthMonth && data.birthYear 
        ? `${data.birthYear}-${String(data.birthMonth).padStart(2, '0')}-${String(data.birthDay).padStart(2, '0')}`
        : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      status: 'active'
    };

    try {
      // data klasörünü oluştur (yoksa)
      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
      
      // Mevcut kullanıcıları oku
      let users: UserData[] = [];
      try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf8');
        users = JSON.parse(fileContent);
      } catch (error) {
        // Dosya yoksa veya bozuksa boş array ile devam et
        users = [];
      }

      // Kullanıcıyı güncelle veya ekle
      const existingUserIndex = users.findIndex(u => u.id === userData.id);
      if (existingUserIndex >= 0) {
        users[existingUserIndex] = userData;
      } else {
        users.push(userData);
      }

      // Değişiklikleri kaydet
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2));

      // --- YENİ: Yolcular tablosunda hesap sahibi yolcuyu da güncelle ---
      if (userId) {
        await prisma.passenger.updateMany({
          where: {
            userId,
            isAccountOwner: true
          },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            identityNumber: data.identityNumber,
            isForeigner: data.isForeigner || false,
            birthDay: data.birthDay,
            birthMonth: data.birthMonth,
            birthYear: data.birthYear,
            gender: data.gender,
            countryCode: data.countryCode,
            phone: data.phone,
            updatedAt: new Date()
          }
        });
      }
      // --- SON ---

      return NextResponse.json(userData);
    } catch (error) {
      console.error('Dosya işlemi hatası:', error);
      throw new Error('Kullanıcı bilgileri kaydedilemedi');
    }
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Kullanıcı bilgileri güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 