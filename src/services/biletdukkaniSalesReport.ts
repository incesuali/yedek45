import axios from 'axios';

const DEMO_SALES = {
  total: 1,
  items: [
    {
      id: 'demo-sale-1',
      pnr: 'ABC123',
      passengerName: 'Ali Veli',
      createdAt: '2024-10-20T10:00:00.000Z',
      amount: 150.5,
      currency: 'EUR',
      status: 'booked',
      flightType: 'international',
      agencyId: 'demo-agency-1',
    },
  ],
};

export async function getSalesReportBiletDukkani({
  token,
  status = 0,
  flightType = 0,
  createdAtStart,
  createdAtEnd,
  agencyIds = '',
  pageSize = 10,
  pageNumber = 1,
}: {
  token?: string;
  status?: number;
  flightType?: number;
  createdAtStart?: string;
  createdAtEnd?: string;
  agencyIds?: string;
  pageSize?: number;
  pageNumber?: number;
}) {
  if (!token) return DEMO_SALES;
  try {
    const params = new URLSearchParams({
      Status: String(status),
      FlightType: String(flightType),
      CreatedAtStart: createdAtStart || '',
      CreatedAtEnd: createdAtEnd || '',
      agencyIds: agencyIds,
      pageSize: String(pageSize),
      pageNumber: String(pageNumber),
    });
    const res = await axios.get(`https://test-api.biletdukkani.com/reports/sales?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    return DEMO_SALES;
  }
} 