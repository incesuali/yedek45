import { NextResponse } from 'next/server';

const TEST_USER = {
  email: 'test@gurbet.biz',
  password: 'test123'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Test kullanıcı kontrolü
    if (email === TEST_USER.email && password === TEST_USER.password) {
      return NextResponse.json({
        success: true,
        user: {
          email: TEST_USER.email,
          name: 'Test Kullanıcı'
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Geçersiz e-posta veya şifre'
    }, { status: 401 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Bir hata oluştu'
    }, { status: 500 });
  }
} 