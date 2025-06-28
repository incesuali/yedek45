// BiletDukkani POST /flights/search demo fonksiyonu
import { Airport } from '@/types/flight';

export async function searchFlightsBiletDukkaniDemoPost(params: {
  OriginCode: string;
  OriginType: string;
  DestinationCode: string;
  DestinationType: string;
  DepartDate: string;
  ReturnDate?: string;
  Adults: string;
  Children?: string;
  SeniorCitizens?: string;
  Militaries?: string;
  Infants?: string;
}) {
  // Demo amaçlı, parametrelere göre örnek uçuş verisi döndürür
  return [
    {
      id: 1,
      airlineName: 'Turkish Airlines',
      flightNumber: 'TK123',
      origin: params.OriginCode,
      destination: params.DestinationCode,
      departureTime: `${params.DepartDate}T09:00:00`,
      arrivalTime: `${params.DepartDate}T10:20:00`,
      duration: '1s 20d',
      price: 120,
      direct: true,
      baggage: '15 kg',
      currency: 'EUR',
      passengers: params.Adults,
    },
    {
      id: 2,
      airlineName: 'SunExpress',
      flightNumber: 'XQ456',
      origin: params.OriginCode,
      destination: params.DestinationCode,
      departureTime: `${params.DepartDate}T13:00:00`,
      arrivalTime: `${params.DepartDate}T14:30:00`,
      duration: '1s 30d',
      price: 99,
      direct: false,
      baggage: '20 kg',
      currency: 'EUR',
      passengers: params.Adults,
    }
  ];
}

// BiletDukkani POST /flights/fare demo fonksiyonu
export async function fareFlightsBiletDukkaniDemo(params: {
  adults: number;
  children: number;
  infants: number;
  students?: number;
  disabledPersons?: number;
  flightBrandList: { flightId: string; brandId: string }[];
}) {
  // Demo amaçlı, parametrelere göre örnek fiyatlandırma verisi döndürür
  return {
    fareIds: ["demo-fare-id-12345"],
    flights: params.flightBrandList.map((item, idx) => ({
      selectedBrand: {
        id: item.brandId,
        name: `Demo Brand ${idx + 1}`
      },
      price: 120 + idx * 10,
      currency: 'EUR'
    }))
  };
}

// BiletDukkani GET /flights/fare/:fareIds demo fonksiyonu
export async function getFareDetailsBiletDukkaniDemo(fareIds: string) {
  // Demo amaçlı, fareIds parametresine göre örnek fare detayları döndürür
  return {
    fareId: fareIds,
    flights: [
      {
        flightId: "demo-flight-123",
        brandId: "demo-brand-456",
        selectedBrand: {
          id: "demo-brand-456",
          name: "Demo Economy Class"
        },
        price: 150,
        currency: 'EUR',
        baggage: '20 kg',
        cabinClass: 'Economy',
        fareRules: {
          cancellation: 'İade edilemez',
          change: 'Değişiklik ücreti: 50 EUR',
          refund: 'İade edilemez'
        }
      }
    ],
    totalPrice: 150,
    currency: 'EUR',
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 saat geçerli
    bookingClass: 'Y',
    fareType: 'Public'
  };
}

// BiletDukkani POST /flights/fare-extra-baggage demo fonksiyonu
export async function addExtraBaggageBiletDukkaniDemo(params: {
  fareExtraBaggages: {
    fareId: string;
    flightId: string;
    extraBaggageId: string;
    passengerIndex: number;
    passengerType: string;
  }[]
}) {
  // Demo amaçlı, başarılı bir ek bagaj işlemi simüle eder
  return {
    success: true,
    message: 'Ekstra bagaj başarıyla eklendi (DEMO)',
    request: params
  };
}

// BiletDukkani POST /flights/fare-extra-baggage gerçek API fonksiyonu (hazırlık, canlıda aktif edilecek)
export async function addExtraBaggageBiletDukkaniReal(params: {
  fareExtraBaggages: {
    fareId: string;
    flightId: string;
    extraBaggageId: string;
    passengerIndex: number;
    passengerType: string;
  }[]
}, token: string) {
  // Gerçek API entegrasyonu için örnek (şu an aktif değil)
  const response = await fetch('https://test-api.biletdukkani.com/flights/fare-extra-baggage/' + params.fareExtraBaggages[0].fareId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(params)
  });
  if (!response.ok) {
    throw new Error('Ekstra bagaj eklenemedi: ' + response.statusText);
  }
  // API response'u genellikle boştur, sadece başarılı/başarısız kontrol edilir
  return { success: true };
}

// BiletDukkani GET /flights/air-rules demo fonksiyonu
export async function getAirRulesBiletDukkaniDemo(params: {
  fareId: string;
  flightId: string;
  brandId: string;
}) {
  // Demo amaçlı, örnek kural verisi döndürür
  return [
    { title: 'Bagaj Kuralları', detail: 'Her yolcu için 20kg bagaj dahildir. Ekstra bagaj ücretlidir.' },
    { title: 'İade/Değişiklik', detail: 'İade edilemez, değişiklik ücreti 50 EUR.' },
    { title: 'Check-in', detail: 'Online check-in uçuş saatinden 24 saat önce başlar.' }
  ];
}

// BiletDukkani GET /flights/air-rules gerçek API fonksiyonu (hazırlık, canlıda aktif edilecek)
export async function getAirRulesBiletDukkaniReal(params: {
  fareId: string;
  flightId: string;
  brandId: string;
}, token: string) {
  const url = `https://test-api.biletdukkani.com/flights/air-rules?FareId=${params.fareId}&FlightId=${params.flightId}&BrandId=${params.brandId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Kural bilgisi alınamadı: ' + response.statusText);
  }
  const data = await response.json();
  return data.data || [];
}

// Havalimanı arama fonksiyonu (demo ve gerçek API)
export async function searchAirports(query: string): Promise<Airport[]> {
  const API_KEY = process.env.NEXT_PUBLIC_FLIGHT_API_KEY;
  
  // Demo veri (API anahtarı olmadığında kullanılır)
  const demoAirports: Airport[] = [
    { code: 'IST', name: 'İstanbul Havalimanı', city: 'İstanbul' },
    { code: 'SAW', name: 'Sabiha Gökçen', city: 'İstanbul' },
    { code: 'ESB', name: 'Esenboğa Havalimanı', city: 'Ankara' },
    { code: 'ADB', name: 'Adnan Menderes Havalimanı', city: 'İzmir' },
    { code: 'AYT', name: 'Antalya Havalimanı', city: 'Antalya' },
    { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam' },
    { code: 'FRA', name: 'Frankfurt Havalimanı', city: 'Frankfurt' },
    { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris' },
  ];

  if (!API_KEY) {
    console.log("DEMO MODE: Returning mock airports.");
    const q = query.toLowerCase();
    return demoAirports.filter(airport =>
      airport.code.toLowerCase().includes(q) ||
      airport.name.toLowerCase().includes(q) ||
      airport.city.toLowerCase().includes(q)
    );
  }

  try {
    const response = await fetch(`https://test-api.biletdukkani.com/airports/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.airports || [];
  } catch (error) {
    console.error("API Error: Could not fetch airports, returning demo data.", error);
    return demoAirports;
  }
}

// BiletDukkani POST /orders demo fonksiyonu (reserve to book desteği)
export async function createOrderBiletDukkaniDemo(params: {
  fareIds: string[];
  passengers: {
    firstName: string;
    lastName: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    gender: string;
    identityNumber: string;
    isForeigner: boolean;
    passengerType: string;
  }[];
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  bookingType: 'book' | 'reserve';
  orderType: 'individual' | 'corporate';
  marketingConsent?: boolean;
}) {
  // Demo amaçlı, başarılı bir sipariş/rezervasyon oluşturma simüle eder
  return {
    success: true,
    orderId: 'demo-order-id-12345',
    pnr: 'DEMO123',
    bookingType: params.bookingType,
    orderType: params.orderType,
    message: `Sipariş (${params.bookingType}) başarıyla oluşturuldu (DEMO)`,
    orderDetails: {
      totalPrice: 150,
      currency: 'EUR',
      status: params.bookingType === 'book' ? 'confirmed' : 'reserved',
      passengers: params.passengers.map((p, idx) => ({
        ...p,
        seat: `12${String.fromCharCode(65 + idx)}`,
        ticketNumber: `DEMO-TKT-${1000 + idx}`
      })),
      contactInfo: params.contactInfo,
      createdAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
  };
}

// BiletDukkani POST /orders gerçek API fonksiyonu (reserve to book desteği)
export async function createOrderBiletDukkaniReal(params: {
  fareIds: string[];
  passengers: {
    firstName: string;
    lastName: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    gender: string;
    identityNumber: string;
    isForeigner: boolean;
    passengerType: string;
  }[];
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  bookingType: 'book' | 'reserve';
  orderType: 'individual' | 'corporate';
  marketingConsent?: boolean;
}, token: string) {
  // Gerçek API entegrasyonu için örnek (şu an aktif değil)
  const response = await fetch('https://test-api.biletdukkani.com/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      fareIds: params.fareIds,
      passengers: params.passengers.map(p => ({
        firstName: p.firstName,
        lastName: p.lastName,
        birthDate: `${p.birthYear}-${p.birthMonth.padStart(2, '0')}-${p.birthDay.padStart(2, '0')}`,
        gender: p.gender === 'Erkek' ? 'M' : 'F',
        identityNumber: p.identityNumber,
        isForeigner: p.isForeigner,
        passengerType: p.passengerType === 'Yetişkin' ? 'adult' : 'child'
      })),
      contactInfo: {
        firstName: params.contactInfo.firstName,
        lastName: params.contactInfo.lastName,
        email: params.contactInfo.email,
        phone: params.contactInfo.phone
      },
      bookingType: params.bookingType,
      orderType: params.orderType,
      marketingConsent: params.marketingConsent || false
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Sipariş oluşturulamadı' }));
    throw new Error(errorData.message || 'Sipariş oluşturulamadı');
  }
  
  const data = await response.json();
  return data;
}

// BiletDukkani PUT /orders/:orderId/note demo fonksiyonu
/**
 * Siparişe not ekleme/güncelleme (DEMO)
 * @param orderId string - Siparişin benzersiz kimliği
 * @param note string - Eklenecek/güncellenecek not
 * @returns { success: boolean, orderId: string, note: string, updatedAt: string }
 *
 * Örnek kullanım:
 *   await updateOrderNoteBiletDukkaniDemo('demo-order-id-12345', 'Müşteri arandı, bilgi verildi.');
 */
export async function updateOrderNoteBiletDukkaniDemo(orderId: string, note: string) {
  // Demo amaçlı, başarılı bir not güncelleme simüle eder
  return {
    success: true,
    orderId,
    note,
    updatedAt: new Date().toISOString(),
    message: 'Sipariş notu başarıyla güncellendi (DEMO)'
  };
}

// BiletDukkani GET /orders/:orderId/routes/:routeId/tickets demo fonksiyonu
/**
 * Sipariş ve rota için bilet detaylarını getirir (DEMO)
 * @param orderId string - Siparişin benzersiz kimliği
 * @param routeId string - Rota kimliği
 * @returns { tickets: Array, orderId: string, routeId: string, agency, passenger, flight, price, pnr, createdAt }
 *
 * Örnek kullanım:
 *   await getOrderRouteTicketsBiletDukkaniDemo('demo-order-id-12345', 'demo-route-id-67890');
 */
export async function getOrderRouteTicketsBiletDukkaniDemo(orderId: string, routeId: string) {
  // Demo amaçlı, örnek bilet detayları döndürür
  return {
    orderId,
    routeId,
    agency: {
      agencyId: 'demo-agency-id',
      companyName: 'DEMO SEYAHAT',
      address: 'İstanbul',
      taxNo: '1234567890',
      taxOffice: 'DEMO',
    },
    tickets: [
      {
        ticketNumber: 'DEMO-TKT-1001',
        passengerName: 'Ali Veli',
        pnr: 'DEMO123',
        flightNumber: 'TK123',
        origin: 'IST',
        destination: 'ESB',
        departureTime: new Date(Date.now() + 86400000).toISOString(),
        seat: '12A',
        price: 150,
        currency: 'EUR',
        status: 'confirmed',
      }
    ],
    totalPrice: 150,
    currency: 'EUR',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Bir sipariş ve rota için havayolu/bilet kurallarını getirir (GERÇEK API)
 * @param orderId string - Siparişin benzersiz kimliği
 * @param routeId string - Rota kimliği
 * @param token string - BiletDukkani API token
 * @returns { rules: Array<{ title: string, detail: string }> }
 *
 * Örnek kullanım:
 *   await getOrderRouteAirRulesBiletDukkaniReal('order-id', 'route-id', 'BEARER_TOKEN');
 */
export async function getOrderRouteAirRulesBiletDukkaniReal(orderId: string, routeId: string, token: string) {
  const url = `https://test-api.biletdukkani.com/orders/${orderId}/routes/${routeId}/air-rules`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Kural bilgisi alınamadı: ' + response.statusText);
  }
  const data = await response.json();
  return data.data || [];
}

/**
 * BiletDukkani - Sipariş/Bilet İptal Et (GERÇEK API)
 * @param orderId string - İptal edilecek siparişin/biletin ID'si
 * @param token string - BiletDukkani API token
 * @returns { success: boolean, message: string }
 *
 * Örnek kullanım:
 *   await cancelOrderBiletDukkaniReal('order-id', 'BEARER_TOKEN');
 */
export async function cancelOrderBiletDukkaniReal(orderId: string, token: string) {
  const url = `https://test-api.biletdukkani.com/orders/${orderId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('İptal işlemi başarısız: ' + response.statusText);
  }
  return { success: true, message: 'Bilet başarıyla iptal edildi.' };
}

/**
 * BiletDukkani - Sipariş/Bilet İade Edilebilirlik ve Tutar Sorgulama (GERÇEK API)
 * @param orderId string - İadesi sorgulanacak siparişin/biletin ID'si
 * @param token string - BiletDukkani API token
 * @returns { totalRefundPrice: number, currencyCode: string, passengerRefunds: any[] }
 *
 * Örnek kullanım:
 *   await refundValidateBiletDukkaniReal('order-id', 'BEARER_TOKEN');
 */
export async function refundValidateBiletDukkaniReal(orderId: string, token: string) {
  const url = `https://test-api.biletdukkani.com/orders/${orderId}/refund_validate`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('İade sorgulama işlemi başarısız: ' + response.statusText);
  }
  return await response.json();
}

/**
 * BiletDukkani - Sipariş/Bilet İade Onayla (GERÇEK API, admin paneli için)
 * @param orderId string - İadesi onaylanacak siparişin/biletin ID'si
 * @param totalRefundPrice number - Toplam iade edilecek tutar
 * @param agencyCommission number - Acente komisyonu (varsa)
 * @param token string - BiletDukkani API token
 * @returns { success: boolean }
 *
 * Örnek kullanım:
 *   await refundConfirmBiletDukkaniReal('order-id', 900.2, 0, 'BEARER_TOKEN');
 */
export async function refundConfirmBiletDukkaniReal(orderId: string, totalRefundPrice: number, agencyCommission: number, token: string) {
  const url = `https://test-api.biletdukkani.com/orders/${orderId}/refund_confirm`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ totalRefundPrice, agencyCommission })
  });
  if (!response.ok) {
    throw new Error('İade onay işlemi başarısız: ' + response.statusText);
  }
  return { success: true };
}

/**
 * BiletDukkani - Yolcu Ekle (GERÇEK API)
 * @param customerData object - Yolcu bilgileri (name, surname, passengerType, gender, vs.)
 * @param token string - BiletDukkani API token
 * @returns { success: boolean, customerId?: string }
 *
 * Örnek kullanım:
 *   await addCustomerBiletDukkaniReal({ name: 'Ali', surname: 'Yılmaz', ... }, 'BEARER_TOKEN');
 */
export async function addCustomerBiletDukkaniReal(customerData: any, token: string) {
  const url = `https://test-api.biletdukkani.com/customers`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerData)
  });
  if (!response.ok) {
    throw new Error('Yolcu ekleme işlemi başarısız: ' + response.statusText);
  }
  // API response body boş olabilir, başarılıysa true döner
  return { success: true };
}

/**
 * BiletDukkani - Yolcu Listesi Getir (GERÇEK API)
 * @param params object - Filtreler (page, perPage, name, surname, vs.)
 * @param token string - BiletDukkani API token
 * @returns { customers: any[], totalCount: number }
 *
 * Örnek kullanım:
 *   await getCustomerListBiletDukkaniReal({ page: 1, perPage: 10 }, 'BEARER_TOKEN');
 */
export async function getCustomerListBiletDukkaniReal(params: any, token: string) {
  const query = new URLSearchParams();
  if (params.page) query.append('Page', params.page);
  if (params.perPage) query.append('PerPage', params.perPage);
  if (params.name) query.append('Name', params.name);
  if (params.surname) query.append('SurName', params.surname);
  if (params.gsmNumber) query.append('GsmNumber', params.gsmNumber);
  if (params.email) query.append('Email', params.email);
  if (params.identityNumber) query.append('IdentityNumber', params.identityNumber);
  if (params.passportNumber) query.append('PassportNumber', params.passportNumber);
  if (params.passengerType) query.append('PassengerType', params.passengerType);
  if (params.agencyId) query.append('AgencyId', params.agencyId);
  if (params.corporateId) query.append('CorporateId', params.corporateId);
  const url = `https://test-api.biletdukkani.com/customers?${query.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Yolcu listesi alınamadı: ' + response.statusText);
  }
  return await response.json();
}

/**
 * BiletDukkani - Yolcu Güncelle (GERÇEK API)
 * @param id string - Güncellenecek yolcunun ID'si
 * @param customerData object - Güncellenecek yolcu bilgileri
 * @param token string - BiletDukkani API token
 * @returns { success: boolean }
 *
 * Örnek kullanım:
 *   await updateCustomerBiletDukkaniReal('customer-id', { name: 'Ali', ... }, 'BEARER_TOKEN');
 */
export async function updateCustomerBiletDukkaniReal(id: string, customerData: any, token: string) {
  const url = `https://test-api.biletdukkani.com/customers/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerData)
  });
  if (!response.ok) {
    throw new Error('Yolcu güncelleme işlemi başarısız: ' + response.statusText);
  }
  return { success: true };
}

/**
 * BiletDukkani - Yolcu Sil (GERÇEK API)
 * @param id string - Silinecek yolcunun ID'si
 * @param token string - BiletDukkani API token
 * @returns { success: boolean }
 *
 * Örnek kullanım:
 *   await deleteCustomerBiletDukkaniReal('customer-id', 'BEARER_TOKEN');
 */
export async function deleteCustomerBiletDukkaniReal(id: string, token: string) {
  const url = `https://test-api.biletdukkani.com/customers/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Yolcu silme işlemi başarısız: ' + response.statusText);
  }
  return { success: true };
}

/**
 * BiletDukkani - Yolcu Detayları Getir (GERÇEK API)
 * @param id string - Yolcunun ID'si
 * @param token string - BiletDukkani API token
 * @returns { customer: any }
 *
 * Örnek kullanım:
 *   await getCustomerDetailBiletDukkaniReal('customer-id', 'BEARER_TOKEN');
 */
export async function getCustomerDetailBiletDukkaniReal(id: string, token: string) {
  const url = `https://test-api.biletdukkani.com/customers/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Yolcu detayları alınamadı: ' + response.statusText);
  }
  return await response.json();
} 