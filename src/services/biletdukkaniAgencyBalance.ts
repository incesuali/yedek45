import axios from 'axios';

const DEMO_BALANCE = {
  accountName: 'TEST API INTERNET $B TL',
  accountCodeDesc: '1.12.120.126.02',
  totalCredit: 1565712.319143,
  totalDebit: 616889.327849,
  totalBalance: 948822.991294,
  paginatedBalance: 0,
  totalItems: 0,
  list: [],
  page: 1,
  perPage: 10,
  totalPages: 0,
  hideColumns: null
};

export async function getAgencyBalanceBiletDukkani(token?: string) {
  if (!token) return DEMO_BALANCE;
  try {
    const res = await axios.get('https://test-api.biletdukkani.com/agency-balance/detail?page=1&perPage=10', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    return DEMO_BALANCE;
  }
} 