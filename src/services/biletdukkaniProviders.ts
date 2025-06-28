import axios from 'axios';

const DEMO_PROVIDERS = [
  { id: 'THY', name: 'Türk Hava Yolları' },
  { id: 'Sabre', name: 'Sabre GDS' },
  { id: 'Pegasus', name: 'Pegasus Airlines' },
  { id: 'SunExpress', name: 'SunExpress Airlines' },
  { id: 'TravelFusion', name: 'TravelFusion GDS' },
];

export async function getProvidersBiletDukkani(token?: string) {
  if (!token) return DEMO_PROVIDERS;
  try {
    const res = await axios.get('https://test-api.biletdukkani.com/lookups/providers', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    return DEMO_PROVIDERS;
  }
} 