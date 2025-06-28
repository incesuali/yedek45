import { NextResponse } from 'next/server';
import { getAgencyBalanceBiletDukkani } from '@/src/services/biletdukkaniAgencyBalance';

export async function GET(req: Request) {
  const token = process.env.BILETDUKKANI_TOKEN || undefined;
  const balance = await getAgencyBalanceBiletDukkani(token);
  return NextResponse.json(balance);
} 