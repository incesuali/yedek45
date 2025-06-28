import { NextResponse } from 'next/server';
import { getSalesReportBiletDukkani } from '@/src/services/biletdukkaniSalesReport';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = process.env.BILETDUKKANI_TOKEN || undefined;
  const status = Number(searchParams.get('status') || 0);
  const flightType = Number(searchParams.get('flightType') || 0);
  const createdAtStart = searchParams.get('createdAtStart') || undefined;
  const createdAtEnd = searchParams.get('createdAtEnd') || undefined;
  const agencyIds = searchParams.get('agencyIds') || '';
  const pageSize = Number(searchParams.get('pageSize') || 10);
  const pageNumber = Number(searchParams.get('pageNumber') || 1);

  const data = await getSalesReportBiletDukkani({
    token,
    status,
    flightType,
    createdAtStart,
    createdAtEnd,
    agencyIds,
    pageSize,
    pageNumber,
  });
  return NextResponse.json(data);
} 