"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Açık rıza kutusunu işaretlemelisiniz.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Kayıt başarısız");
      toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Kayıt başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Üye ol</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[16px]"
            placeholder="E-posta"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-[16px]"
            placeholder="Şifre"
            required
          />
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              className="mt-1"
              required
            />
            <label className="text-sm text-gray-700 select-none">
              İndirimler ve kampanyalardan Rıza Metni kapsamında haberdar olmak istiyorum ve kişisel verilerimin pazarlama amacıyla işlenmesine <b>açık rıza</b> veriyorum.
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-[16px] font-medium disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? "Kayıt olunuyor..." : "Üye ol"}
          </button>
        </form>
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn('facebook')}
            className="w-full py-2.5 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <img src="/facebook.svg" alt="Facebook" width={20} height={20} />
            <span className="text-[15px] text-gray-700">Facebook ile üye ol</span>
          </button>
          <button
            type="button"
            onClick={() => signIn('google')}
            className="w-full py-2.5 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <img src="/google.svg" alt="Google" width={20} height={20} />
            <span className="text-[15px] text-gray-700">Google ile üye ol</span>
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Kişisel verileriniz <b>Aydınlatma Metni</b> kapsamında işleniyor. Üye olarak <b>Kullanım Koşulları</b>'nı kabul ettiğinizi onaylamış olursunuz.
        </div>
        <div className="mt-6 text-center text-[15px]">
          Üyeliğin varsa, <span className="text-green-600 font-bold cursor-pointer" onClick={onClose}>giriş yap</span>
        </div>
      </div>
    </div>
  );
} 