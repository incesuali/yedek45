import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/EUR';

export interface ExchangeRateResponse {
  rates: {
    TRY: number;
  };
}

export async function getEuroRate(): Promise<number> {
  try {
    const response = await axios.get<ExchangeRateResponse>(BASE_URL);
    return response.data.rates.TRY;
  } catch (error) {
    console.error('Döviz kuru çekilirken hata oluştu:', error);
    return 0;
  }
} 