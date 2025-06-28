// Bu dosya, havayolu isimlerini online check-in URL'lerine eşler.
// Bu liste zamanla genişletilebilir.

const airlineCheckInLinks: { [key: string]: string } = {
  'turkish airlines': 'https://www.turkishairlines.com/tr-tr/ucak-bileti/online-check-in/',
  'pegasus airlines': 'https://www.flypgs.com/online-check-in',
  'sunexpress': 'https://www.sunexpress.com/tr/online-check-in/',
  'anadolujet': 'https://www.anadolujet.com/tr/kurumsal/online-check-in',
  'ajet': 'https://www.ajet.com/tr/online-islemler/check-in',
  'corendon airlines': 'https://www.corendonairlines.com/tr/online-check-in',
  'lufthansa': 'https://www.lufthansa.com/tr/tr/online-check-in',
  'klm': 'https://www.klm.com.tr/check-in',
};

/**
 * Verilen havayolu adına göre online check-in URL'sini döndürür.
 * @param airlineName Havayolunun adı (örn: "Turkish Airlines")
 * @returns Check-in URL'si veya bulunamazsa undefined.
 */
export const getAirlineCheckInUrl = (airlineName: string): string | undefined => {
  if (!airlineName) return undefined;
  // Gelen adı küçük harfe çevirerek ve boşlukları temizleyerek daha esnek bir arama yaparız
  const normalizedAirlineName = airlineName.toLowerCase().trim();
  return airlineCheckInLinks[normalizedAirlineName];
}; 