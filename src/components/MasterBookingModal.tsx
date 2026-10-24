import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Copy,
  Check,
  Send,
  ShieldCheck
} from 'lucide-react';
import { Master } from '../types';

interface MasterBookingModalProps {
  master: Master | null;
  onClose: () => void;
  onSubmitBooking: (bookingData: {
    masterName: string;
    clientName: string;
    clientPhone: string;
    serviceType: string;
    date: string;
  }) => void;
}

export const MasterBookingModal: React.FC<MasterBookingModalProps> = ({
  master,
  onClose,
  onSubmitBooking,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+994 ');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!master) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(master.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || clientPhone.length < 9) return;

    onSubmitBooking({
      masterName: master.name,
      clientName,
      clientPhone,
      serviceType: serviceType || master.specialty,
      date: date || 'Yaxın günlərdə',
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#141722] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Master Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-2xl bg-[#181C28] border border-white/5">
            <img
              src={master.avatar}
              alt={master.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#FF5E1E]/40"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
                  {master.name}
                </h2>
                {master.verified && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Yoxlanılmış Usta
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-[#FF5E1E] mt-0.5">
                {master.specialty}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
                <div className="flex items-center gap-1 text-amber-400 font-bold tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{master.rating.toFixed(2)}</span>
                </div>
                <span>·</span>
                <span className="tabular-nums">{master.reviewCount} rəy</span>
                <span>·</span>
                <span className="tabular-nums">{master.experienceYears} il təcrübə</span>
                <span>·</span>
                <span className="tabular-nums">{master.completedJobs}+ layihə</span>
              </div>
            </div>

            {/* Direct Phone Call Button */}
            <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
              <a
                href={`tel:${master.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5E1E]/20"
              >
                <Phone className="w-4 h-4" />
                <span>Birbaşa Zəng Et</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhone ? 'Nömrə köçürüldü' : master.phone}</span>
              </button>
            </div>
          </div>

          {/* Master Details & Portfolio Showcase */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Usta Haqqında & Təcrübə
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#12151D] p-4 rounded-xl border border-white/5">
              {master.bio}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {master.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-200 text-xs font-medium"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Works Portfolio */}
          {master.recentWorks && master.recentWorks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Son Görülən İşlərdən Fotoşəkillər
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {master.recentWorks.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video bg-[#1B202D] border border-white/5">
                    <img
                      src={img}
                      alt="Ustanın işi"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Request Form */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#171B26] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#FF5E1E]" />
              <h3 className="text-base font-bold text-white">
                Ustaya Müraciət və Baxış Sorğusu
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Məlumatlarınızı qeyd edin. Usta sizinlə 15 dəqiqə ərzində əlaqə saxlayaraq qiymət və baxış vaxtını dəqiqləşdirəcək.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">Sorğunuz uğurla göndərildi!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  {master.name} ən qısa zamanda qeyd etdiyiniz nömrə ilə əlaqə saxlayacaq.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Adınız və Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Məs: Rauf Məmmədov"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#111319] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Əlaqə Telefonunuz *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+994 (50) 123-45-67"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#111319] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Tələb olunan xidmət növü
                    </label>
                    <input
                      type="text"
                      placeholder={`Məs: ${master.skills[0] || 'Təmir işləri'}`}
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-[#111319] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Uyğun baxış tarixi
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#111319] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Görüləcək iş haqqında qısa qeyd (kvadrat metr, otaq sayı və s.)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Məs: 3 otaqlı yeni tikilidə santexnika və istipol çəkilişi üçün qiymət təklifi lazımdır."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#111319] border border-white/10 focus:border-[#FF5E1E] text-white text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#FF5E1E]/20 flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Müraciəti Göndər</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
