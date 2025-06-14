import { NextResponse } from 'next/server';
import { validate } from '@/utils/validation';
import { userSchema } from '@/utils/validation';
import { logger } from '@/utils/error';

// Geliştirme aşaması için basit kullanıcı listesi
const DEV_USERS = [
  {
    id: '1',
    email: 'test@gurbet.biz',
    password: '$2a$10$YourHashedPasswordHere', // bcrypt ile hashlenmiş "test123"
    name: 'Test Kullanıcı'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Input validation
    await validate(userSchema.login, body);
    const { email, password } = body;

    // Geliştirme aşamasında basit kontrol
    const user = DEV_USERS.find(u => u.email === email);
    
    if (user) {
      // Geliştirme aşamasında basit şifre kontrolü
      if (password === 'test123') {
        logger.info(`Başarılı giriş: ${email}`);
        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        });
      }
    }

    logger.warn(`Başarısız giriş denemesi: ${email}`);
    return NextResponse.json({
      success: false,
      message: 'Geçersiz e-posta veya şifre'
    }, { status: 401 });

  } catch (error) {
    logger.error('Giriş hatası:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Bir hata oluştu'
    }, { status: 500 });
  }
} 