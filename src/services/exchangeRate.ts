import axios from 'axios';

const BASE_URL = '/api/euro-rate';

export interface ExchangeRateResponse {
  rates: {
    TRY: number;
  };
}

export async function getEuroRate(): Promise<number> {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.rate;
  } catch (error) {
    console.error('Döviz kuru çekilirken hata oluştu:', error);
    return 44.50; // Hata durumunda varsayılan değer
  }
} 