import React from 'react';
import { useApp } from '../../../context/AppContext';
import { EduAttendLogo } from '../../common/EduAttendLogo';
import { 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Heart, 
  Moon, 
  Sun, 
  UserPlus, 
  LogIn, 
  Sparkles 
} from 'lucide-react';

interface SplashScreenProps {
  onContinue?: () => void;
  isMockup?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue, isMockup = false }) => {
  const { 
    setActiveScreen, 
    language, 
    setLanguage, 
    isDarkMode, 
    setIsDarkMode, 
    loginAsGuest,
    t 
  } = useApp();

  const handleGetStarted = () => {
    if (isMockup && onContinue) {
      onContinue();
    } else {
      loginAsGuest('teacher');
      setActiveScreen('home');
    }
  };

  const handleGoToAuth = (mode: 'login' | 'register') => {
    if (isMockup && onContinue) {
      onContinue();
    } else {
      setActiveScreen(mode);
    }
  };

  const handleStartDirect = (role: 'student' | 'admin') => {
    loginAsGuest(role);
    if (role === 'student') {
      setActiveScreen('student_attendance');
    } else if (role === 'admin') {
      setActiveScreen('admin_web');
    }
  };

  return (
    <div className="relative w-full h-full min-h-[580px] bg-gradient-to-b from-[#004D35] via-[#006B45] to-[#003826] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
      {/* Subtle Background Pattern & Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-48 h-48 bg-emerald-300/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Clean Top Header (Branding & Controls only - No top tabs) */}
      <div className="relative z-10 pt-1 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-white/10">
          <Heart className="w-3.5 h-3.5 text-[#EF3D43] fill-[#EF3D43]" />
          <span>{language === 'km' ? 'ផ្ទះអញ្ជលី • សៀមរាប' : 'Anjali House NGO'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
            title={isDarkMode ? t.lightMode : t.darkMode}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
            className="px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-[10px] font-bold text-white transition cursor-pointer"
          >
            {language === 'en' ? 'ខ្មែរ' : 'EN'}
          </button>
        </div>
      </div>

      {/* Central Hero Logo & Value Proposition */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto">
        {/* Pure White Backdrop Pill for Crisp Logo Display */}
        <div className="p-4 bg-white rounded-3xl shadow-2xl mb-3.5 border border-white/40 ring-4 ring-white/10 flex items-center justify-center">
          <div className="w-36 h-24 flex items-center justify-center">
            <EduAttendLogo size="lg" variant="icon" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>{language === 'km' ? 'សមាគមផ្ទះអញ្ជលី' : 'Anjali House'}</span>
          </h1>
          <p className="text-emerald-100 text-xs font-bold tracking-wide">
            {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស (EduAttend)' : 'EduAttend — Student Attendance System'}
          </p>
        </div>

        <div className="mt-3 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/30 text-emerald-200 text-[11px] font-semibold tracking-wider flex items-center gap-2">
          <span>{language === 'km' ? 'ការអប់រំ' : 'Education'}</span>
          <span className="text-emerald-400">•</span>
          <span>{language === 'km' ? 'អាហារូបត្ថម្ភ' : 'Nutrition'}</span>
          <span className="text-emerald-400">•</span>
          <span>{language === 'km' ? 'សហគមន៍' : 'Community'}</span>
        </div>

        {/* Value badges */}
        <div className="mt-4 flex items-center justify-center gap-3 text-emerald-200/70 text-[11px]">
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-300" /> &lt;60s Attendance</span>
          <span>•</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-300" /> Offline Ready</span>
        </div>
      </div>

      {/* Bottom Action Area: Get Started at the bottom + Login & Register */}
      <div className="relative z-10 space-y-2.5 pb-2 w-full max-w-xs mx-auto">
        {/* 1. Primary Action: GET STARTED at the bottom */}
        <button
          onClick={handleGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-[#006B45] font-black text-sm shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer ring-4 ring-white/20"
        >
          <Sparkles className="w-4 h-4 text-[#20A464]" />
          <span>{t.getStarted}</span>
          <ArrowRight className="w-4 h-4 text-[#006B45] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 2. Login and Register buttons right below Get Started */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            onClick={() => handleGoToAuth('login')}
            className="py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs backdrop-blur-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t.signIn}</span>
          </button>

          <button
            onClick={() => handleGoToAuth('register')}
            className="py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs backdrop-blur-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t.register}</span>
          </button>
        </div>

        {/* 3. Secondary Portal Links */}
        {!isMockup && (
          <div className="pt-2 flex items-center justify-center gap-4 text-xs text-emerald-200/80">
            <button 
              onClick={() => handleStartDirect('student')}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer text-[11px]"
            >
              {language === 'km' ? 'ផ្នែកសិស្ស' : 'Student Portal'}
            </button>
            <span>•</span>
            <button 
              onClick={() => handleStartDirect('admin')}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer text-[11px]"
            >
              {language === 'km' ? 'ផ្នែករដ្ឋបាល' : 'Admin Web'}
            </button>
          </div>
        )}

        <p className="text-center text-[9.5px] text-emerald-200/60 mt-1">
          Anjali House NGO • Siem Reap, Cambodia
        </p>
      </div>
    </div>
  );
};
