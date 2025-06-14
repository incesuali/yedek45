import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.exchangerate.host/latest?base=EUR&symbols=TRY');
    const rate = response.data?.rates?.TRY;
    if (!rate) throw new Error('Kur bulunamadı');
    return NextResponse.json({ rate });
  } catch (error) {
    console.error('Euro kuru çekilemedi:', error);
    return NextResponse.json({ rate: 44.50, error: true }, { status: 200 });
  }
} 