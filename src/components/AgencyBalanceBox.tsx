import React, { useEffect, useState } from 'react';

type Balance = {
  accountName: string;
  accountCodeDesc: string;
  totalCredit: number;
  totalDebit: number;
  totalBalance: number;
};

export default function AgencyBalanceBox() {
  const [balance, setBalance] = useState<Balance | null>(null);

  useEffect(() => {
    fetch('/api/agency-balance/detail')
      .then((res) => res.json())
      .then(setBalance);
  }, []);

  if (!balance) return <div>Bakiye yükleniyor...</div>;

  return (
    <div className="p-4 border rounded bg-gray-50 max-w-md">
      <div className="font-bold text-lg mb-2">Cari Bakiye</div>
      <div><b>Hesap:</b> {balance.accountName}</div>
      <div><b>Kod:</b> {balance.accountCodeDesc}</div>
      <div><b>Toplam Alacak:</b> {balance.totalCredit.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
      <div><b>Toplam Borç:</b> {balance.totalDebit.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
      <div className="mt-2 text-xl font-semibold text-green-700"><b>Mevcut Bakiye:</b> {balance.totalBalance.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</div>
    </div>
  );
} 