import React, { useEffect, useState } from 'react';

type Sale = {
  id: string;
  pnr: string;
  passengerName: string;
  createdAt: string;
  amount: number;
  currency: string;
  status: string;
  flightType: string;
  agencyId: string;
};

type SalesResponse = {
  total: number;
  items: Sale[];
};

export default function SalesReportTable() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports/sales')
      .then((res) => res.json())
      .then((data: SalesResponse) => {
        setSales(data.items);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Satış raporu yükleniyor...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">PNR</th>
            <th className="border px-2 py-1">Yolcu</th>
            <th className="border px-2 py-1">Tarih</th>
            <th className="border px-2 py-1">Tutar</th>
            <th className="border px-2 py-1">Durum</th>
            <th className="border px-2 py-1">Uçuş Tipi</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="border px-2 py-1">{sale.pnr}</td>
              <td className="border px-2 py-1">{sale.passengerName}</td>
              <td className="border px-2 py-1">{new Date(sale.createdAt).toLocaleString('tr-TR')}</td>
              <td className="border px-2 py-1">{sale.amount} {sale.currency}</td>
              <td className="border px-2 py-1">{sale.status}</td>
              <td className="border px-2 py-1">{sale.flightType === 'international' ? 'Yurtdışı' : 'Yurtiçi'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
