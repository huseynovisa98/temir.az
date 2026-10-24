import React, { useState } from 'react';
import { X, User, Phone, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [role, setRole] = useState<'client' | 'master'>('client');
  const [phone, setPhone] = useState('+994 ');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role === 'client' ? 'Hörmətli Müştəri' : 'Peşəkar Usta');
      onClose();
      setStep('phone');
      setOtp('');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#141722] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF5E1E] to-[#FF8C00] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF5E1E]/25">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            temir.az Şəxsi Kabinet
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sifarişlərinizi izləyin, endirimlərdən yararlanın və ustalarla əlaqə qurun
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-[#0F1115] rounded-xl mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              role === 'client' ? 'bg-[#FF5E1E] text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Müştəri girişi
          </button>
          <button
            type="button"
            onClick={() => setRole('master')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              role === 'master' ? 'bg-[#FF5E1E] text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Usta kabineti
          </button>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Mobil Telefon Nömrəniz
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="+994 (50) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1A1E2B] border border-white/10 focus:border-[#FF5E1E] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Giriş üçün bu nömrəyə birdəfəlik təhlükəsizlik kodu (SMS) göndəriləcək.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white font-bold text-sm transition-all shadow-md shadow-[#FF5E1E]/20 flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{loading ? 'Göndərilir...' : 'Təsdiq Kodu Göndər'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-200">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  SMS ilə gələn 4 rəqəmli kod
                </label>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[11px] text-[#FF5E1E] hover:underline"
                >
                  Nömrəni dəyiş
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="1 2 3 4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-[#1A1E2B] border border-white/10 focus:border-[#FF5E1E] text-white text-center font-bold text-lg tracking-widest rounded-xl py-2.5 outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 text-center">
                Kod daxil edildikdən sonra avtomatik daxil olacaqsınız (Test üçün: istənilən 4 rəqəm).
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Yoxlanılır...' : 'Daxil Ol'}</span>
            </button>
          </form>
        )}

        {/* Security badge footer */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-slate-500">
          Daxil olmaqla siz temir.az platformasının <span className="text-slate-400 underline cursor-pointer">İstifadəçi Qaydaları</span> ilə razılaşırsınız.
        </div>

      </div>
    </div>
  );
};
