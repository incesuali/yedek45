import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.exchangerate.host/latest?base=EUR&symbols=TRY');
    const rate = response.data?.rates?.TRY;
    if (!rate) {
        // Fallback if rate is not found
        return NextResponse.json({ rate: 35.50 });
    }
    return NextResponse.json({ rate });
  } catch (error) {
    console.error('Euro kuru çekilemedi:', error);
    // Fallback in case of any error
    return NextResponse.json({ rate: 35.50 });
  }
} 