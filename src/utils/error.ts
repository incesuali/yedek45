import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (error: unknown) => {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code
      },
      { status: error.statusCode }
    );
  }

  // Prisma hataları için
  if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Veritabanı işlemi başarısız',
        code: 'DATABASE_ERROR'
      },
      { status: 500 }
    );
  }

  // Validation hataları için
  if (error instanceof Error && error.name === 'ValidationError') {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: 'VALIDATION_ERROR'
      },
      { status: 400 }
    );
  }

  // Genel hatalar için
  return NextResponse.json(
    {
      success: false,
      error: 'Bir hata oluştu',
      code: 'INTERNAL_SERVER_ERROR'
    },
    { status: 500 }
  );
};

export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
}; 