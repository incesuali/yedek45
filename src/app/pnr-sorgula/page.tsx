'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { getReservationByPNR } from '@/services/flightApi';
import { PlaneTakeoff, User, Calendar, Clock, MapPin, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PNRSorgulaPage() {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setReservation(null);
    try {
      const result = await getReservationByPNR(pnr, lastName);
      setReservation(result);
    } catch (err: any) {
      setError(err.message || 'Rezervasyon bulunamadı');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <XCircle className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">PNR Sorgulama</h1>
            </div>
            <p className="text-gray-600">Rezervasyon kodunuz (PNR) ve soyadınız ile bilet bilgilerinizi sorgulayabilirsiniz.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PNR (Rezervasyon Kodu)</label>
                  <input
                    type="text"
                    value={pnr}
                    onChange={e => setPnr(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Örn: ABC123"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soyadınız</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Soyadınızı girin"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sorgulanıyor...' : 'Sorgula'}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          {reservation && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlaneTakeoff className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Rezervasyon Bulundu</h2>
                <p className="text-gray-600">Aşağıda rezervasyon detaylarınız yer almaktadır.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Yolcu</p>
                      <p className="font-medium">{reservation.passenger.firstName} {reservation.passenger.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PlaneTakeoff className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Uçuş</p>
                      <p className="font-medium">{reservation.flight.flightNumber} - {reservation.flight.airlineName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Rota</p>
                      <p className="font-medium">{reservation.flight.origin} → {reservation.flight.destination}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Kalkış</p>
                      <p className="font-medium">{new Date(reservation.flight.departureTime).toLocaleDateString('tr-TR')} - {new Date(reservation.flight.departureTime).toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Varış</p>
                      <p className="font-medium">{new Date(reservation.flight.arrivalTime).toLocaleDateString('tr-TR')} - {new Date(reservation.flight.arrivalTime).toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Koltuk</p>
                      <p className="font-medium">{reservation.flight.seat}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">PNR</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{reservation.pnr}</p>
                    <p className="text-sm text-blue-600">Rezervasyon kodunuzu saklayın.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 