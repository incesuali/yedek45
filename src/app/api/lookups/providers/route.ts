import { NextResponse } from 'next/server';
import { getProvidersBiletDukkani } from '@/services/biletdukkaniProviders';

export async function GET(req: Request) {
  const token = process.env.BILETDUKKANI_TOKEN || undefined;
  const providers = await getProvidersBiletDukkani(token);
  return NextResponse.json(providers);
} 