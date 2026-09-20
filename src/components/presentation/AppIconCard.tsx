import React from 'react';
import { EduAttendLogo } from '../common/EduAttendLogo';
import { useApp } from '../../context/AppContext';

export const AppIconCard: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="w-full h-full bg-white p-5 flex flex-col items-center justify-between text-center select-none">
      <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Brand Identity
        </span>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-50 text-[#EF3D43] font-bold border border-rose-200">
          Official NGO Logo
        </span>
      </div>

      {/* Main App Icon in Rounded Squircle with Subtle Shadow matching user's uploaded logo */}
      <div className="my-auto flex flex-col items-center">
        {/* Squircle App Icon Container */}
        <div className="relative group">
          {/* Subtle Outer Ambient Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#EF3D43]/20 via-[#FDB813]/15 to-[#8FA91C]/20 rounded-[38px] opacity-40 blur-lg group-hover:opacity-60 transition" />

          <div className="relative w-44 h-44 rounded-[36px] bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-slate-200/90 flex items-center justify-center">
            {/* Grid overlay for geometric design balance */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#EF3D43_1px,transparent_1px)] [background-size:12px_12px] rounded-[36px] pointer-events-none" />
            <div className="w-36 h-28 flex items-center justify-center">
              <EduAttendLogo size="lg" variant="icon" />
            </div>
          </div>
        </div>

        {/* Brand Name & Correct NGO Identity */}
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Anjali House
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF6EF] text-[#006B45]">
              {language === 'km' ? 'សមាគមផ្ទះអញ្ជលី' : 'NGO Association'}
            </span>
          </div>

          <p className="text-xs font-bold text-slate-700">
            {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស (EduAttend)' : 'EduAttend — Student Attendance System'}
          </p>

          <p className="text-[11px] text-slate-400 font-medium">
            {language === 'km' ? 'ក្រុងសៀមរាប ខេត្តសៀមរាប ព្រះរាជាណាចក្រកម្ពុជា' : 'Siem Reap, Kingdom of Cambodia'}
          </p>
        </div>
      </div>

      {/* Optical Design Tokens Bar showing exact logo palette */}
      <div className="w-full pt-2.5 border-t border-slate-100 grid grid-cols-6 gap-1 text-[9px] text-slate-500 font-medium">
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#EF3D43] shadow-2xs" />
          <span className="mt-0.5 text-[8px] font-mono font-bold text-slate-600">#EF3D43</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#FDB813] shadow-2xs" />
          <span className="mt-0.5 text-[8px] font-mono font-bold text-slate-600">#FDB813</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#0083B8] shadow-2xs" />
          <span className="mt-0.5 text-[8px] font-mono font-bold text-slate-600">#0083B8</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#F6A778] shadow-2xs" />
          <span className="mt-0.5 text-[8px] font-mono font-bold text-slate-600">#F6A778</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#8FA91C] shadow-2xs" />
          <span className="mt-0.5 text-[8px] font-mono font-bold text-slate-600">#8FA91C</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#F58025] shadow-2xs" />
          <span className="mt-0.5 text-[8px] font-mono font-bold text-slate-600">#F58025</span>
        </div>
      </div>
    </div>
  );
};
