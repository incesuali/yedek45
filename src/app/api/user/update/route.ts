import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const updateUserSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır.").optional(),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır.").optional(),
  countryCode: z.string().optional(),
  phone: z.string().optional(),
  birthDay: z.string().optional(),
  birthMonth: z.string().optional(),
  birthYear: z.string().optional(),
  gender: z.string().optional(),
  identityNumber: z.string().optional(),
  isForeigner: z.boolean().optional(),
});

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();

    const validation = updateUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }
    
    const dataToUpdate = validation.data;

    // Prisma transaction kullanarak User ve ilgili ana Passenger kaydını güncelle
    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: dataToUpdate,
      });

      await tx.passenger.updateMany({
        where: {
          userId: userId,
          isAccountOwner: true,
        },
        data: {
          firstName: dataToUpdate.firstName,
          lastName: dataToUpdate.lastName,
          phone: dataToUpdate.phone,
          countryCode: dataToUpdate.countryCode,
          birthDay: dataToUpdate.birthDay,
          birthMonth: dataToUpdate.birthMonth,
          birthYear: dataToUpdate.birthYear,
          gender: dataToUpdate.gender,
          identityNumber: dataToUpdate.identityNumber,
          isForeigner: dataToUpdate.isForeigner,
        },
      });

      return user;
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
} 