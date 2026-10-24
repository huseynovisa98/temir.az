import React, { useState, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  Phone,
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { Master, MasterSpecialty } from '../types';

interface MastersSectionProps {
  masters: Master[];
  onSelectMaster: (master: Master) => void;
}

export const MastersSection: React.FC<MastersSectionProps> = ({
  masters,
  onSelectMaster,
}) => {
  const [activeSpecialty, setActiveSpecialty] = useState<MasterSpecialty>('all');

  const specialtyTabs: { key: MasterSpecialty; label: string }[] = [
    { key: 'all', label: 'Bütün Ustalar' },
    { key: 'santexnik', label: 'Santexniklər' },
    { key: 'elektrik', label: 'Elektriklər' },
    { key: 'rengsaz', label: 'Rəngsaz & Suvaqçılar' },
    { key: 'kafel', label: 'Kafel & Keramoqranit' },
    { key: 'alcipan', label: 'Alçıpan Ustaları' },
    { key: 'briqada', label: 'Təmir Briqadaları' },
  ];

  const filteredMasters = useMemo(() => {
    if (activeSpecialty === 'all') return masters;
    return masters.filter((m) => m.specialtySlug === activeSpecialty);
  }, [masters, activeSpecialty]);

  return (
    <section id="masters" className="py-12 sm:py-20 bg-[#0C0E12] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E1E] mb-2">
              <UserCheck className="w-4 h-4 text-[#FF5E1E]" />
              Peşəkar Usta Birjası
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Yoxlanılmış və Reytinqli Ustalar
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Təcrübəli ustaları birbaşa sifariş edin, qiymətləri müqayisə edin və zəmanətli təmir təcrübəsi yaşayın. Heç bir vasitəçi komissiyası yoxdur.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-2 rounded-xl shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Şəxsiyyət və təcrübə sənədləri yoxlanılıb</span>
          </div>
        </div>

        {/* Specialty Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {specialtyTabs.map((tab) => {
            const isActive = activeSpecialty === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveSpecialty(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#FF5E1E] text-white shadow-md shadow-[#FF5E1E]/20'
                    : 'bg-[#161922] text-slate-300 hover:text-white hover:bg-[#1E2330] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Masters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMasters.map((master) => (
            <div
              key={master.id}
              className="glass-panel glass-panel-hover rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Profile Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={master.avatar}
                      alt={master.name}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-[#FF5E1E]/30 group-hover:ring-[#FF5E1E] transition-all"
                      referrerPolicy="no-referrer"
                    />
                    {master.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-[#0F1115]" title="Yoxlanılmış Usta">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF5E1E] transition-colors truncate">
                        {master.name}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-[#FF5E1E] truncate mt-0.5">
                      {master.specialty}
                    </p>

                    <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-300">
                      <div className="flex items-center gap-1 text-amber-400 font-bold tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{master.rating.toFixed(2)}</span>
                      </div>
                      <span>·</span>
                      <span className="text-slate-400 tabular-nums">({master.reviewCount} rəy)</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics strip */}
                <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-2xl bg-[#0F1115] border border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Təcrübə</span>
                    <span className="text-white font-bold tabular-nums flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#FF5E1E]" />
                      {master.experienceYears} il
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Tamamlanan</span>
                    <span className="text-white font-bold tabular-nums flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {master.completedJobs}+ layihə
                    </span>
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {master.bio}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {master.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {master.skills.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-[11px]">
                      +{master.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />
                  <span className="truncate">{master.location}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-semibold block">Xidmət haqqı</span>
                  <span className="text-sm font-extrabold text-white tabular-nums">
                    {master.hourlyOrStartingRate}
                  </span>
                </div>

                <button
                  onClick={() => onSelectMaster(master)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF5E1E] hover:bg-[#FF6B00] text-white text-xs font-bold transition-all shadow-md shadow-[#FF5E1E]/20 active:scale-95 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Əlaqə & Sifariş</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Master CTA Banner */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#1E2330] to-[#161922] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Siz də peşəkar ustasınız və ya təmir briqadasısınız?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              temir.az platformasına qoşularaq hər gün yüzlərlə mənzil sahibindən birbaşa sifarişlər qəbul edin. Qeydiyyat ödənişsizdir.
            </p>
          </div>
          <a
            href="tel:*1818"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F1115] font-bold text-xs sm:text-sm transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-[#FF5E1E]" />
            <span>Usta kimi qeydiyyatdan keç</span>
          </a>
        </div>

      </div>
    </section>
  );
};
