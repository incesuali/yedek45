'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountSidebar from '@/components/AccountSidebar';
import { Heart, ArrowRight, Calendar, Trash2 } from 'lucide-react';

export default function FavorilerPage() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fetchFavorites();
    } else if (status === "unauthenticated") {
      router.push("/giris");
    }
  }, [status]);

  const fetchFavorites = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/search-favorites");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bir hata oluştu");
      setFavorites(data.favorites);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu aramayı favorilerinizden silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/search-favorites?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setFavorites(favorites.filter(f => f.id !== id));
    } catch (err) {
      alert("Silme işlemi başarısız oldu");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <AccountSidebar />
          
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-800">Favorilerim</h1>
            </div>
            
            {loading ? (
              <div className="text-center py-8 text-gray-500">Yükleniyor...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Henüz favori aramanız bulunmamaktadır.
              </div>
            ) : (
              <div className="space-y-4">
                {favorites.map((favorite) => (
                  <div 
                    key={favorite.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Nereden</span>
                            <span className="font-medium">{favorite.origin}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Nereye</span>
                            <span className="font-medium">{favorite.destination}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Tarih</span>
                            <span className="font-medium">
                              {new Date(favorite.departureDate).toLocaleDateString("tr-TR")}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Eklenme</span>
                          <span className="font-medium">
                            {new Date(favorite.createdAt).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/flights/search?from=${favorite.origin}&to=${favorite.destination}&date=${new Date(favorite.departureDate).toISOString().split('T')[0]}`)}
                          className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Uçuşları Gör
                        </button>
                        <button 
                          onClick={() => handleDelete(favorite.id)}
                          className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Favori aramalarınızı buradan kolayca tekrar yapabilir, fiyatları kontrol edebilirsiniz.
                Sık uçtuğunuz rotaları favorilerinize ekleyerek daha hızlı bilet alabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 