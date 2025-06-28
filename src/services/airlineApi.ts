import { Airline } from '@/types/airline';

const API_URL = process.env.BILETDUKKANI_BASE_URL || 'https://api.biletdukkani.com';

export async function getAirlines(): Promise<Airline[]> {
  try {
    const response = await fetch(`${API_URL}/lookups/airlines`);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return data.airlines || [];
  } catch (error) {
    // Demo fallback
    return [
      { id: 1, name: 'Turkish Airlines', code: 'TK', logoUrl: 'https://cdn.biletdukkani.com/airlines/tk.png' },
      { id: 2, name: 'Lufthansa', code: 'LH', logoUrl: 'https://cdn.biletdukkani.com/airlines/lh.png' },
      { id: 3, name: 'Pegasus Airlines', code: 'PC', logoUrl: 'https://cdn.biletdukkani.com/airlines/pc.png' },
      { id: 4, name: 'SunExpress', code: 'XQ', logoUrl: 'https://cdn.biletdukkani.com/airlines/xq.png' },
      { id: 5, name: 'KLM', code: 'KL', logoUrl: 'https://cdn.biletdukkani.com/airlines/kl.png' },
      { id: 6, name: 'Air France', code: 'AF', logoUrl: 'https://cdn.biletdukkani.com/airlines/af.png' },
    ];
  }
} 