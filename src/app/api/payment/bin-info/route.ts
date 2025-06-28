import { NextRequest, NextResponse } from 'next/server';
import { getCardBinInfo } from '@/services/paymentApi';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardNumber = searchParams.get('cardNumber');
    const price = searchParams.get('price');
    const productType = searchParams.get('productType');
    const currencyCode = searchParams.get('currencyCode');

    if (!cardNumber) {
      return NextResponse.json(
        { success: false, error: 'Kart numarası gerekli' },
        { status: 400 }
      );
    }

    // BIN bilgisini al (v2 formatında)
    const binInfo = await getCardBinInfo(cardNumber, {
      withInstallment: true,
      price: price ? parseFloat(price) : undefined,
      productType: productType || undefined,
      currencyCode: currencyCode || undefined
    });

    return NextResponse.json({
      success: true,
      data: binInfo
    });

  } catch (error) {
    console.error('BIN bilgisi alınırken hata:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
} 