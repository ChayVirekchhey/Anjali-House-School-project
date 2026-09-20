import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  ArrowLeft, 
  Globe, 
  Moon, 
  Sun, 
  Wifi, 
  WifiOff, 
  UserCheck, 
  Database, 
  LogOut, 
  ShieldCheck, 
  RefreshCw,
  HelpCircle,
  Smartphone,
  LogIn,
  UserPlus,
  KeyRound
} from 'lucide-react';
import { EduAttendLogo } from '../../common/EduAttendLogo';

interface SettingsScreenProps {
  onBack?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { 
    setActiveScreen, 
    currentRole, 
    setCurrentRole, 
    language, 
    setLanguage, 
    isDarkMode, 
    setIsDarkMode, 
    isOffline, 
    setIsOffline, 
    pendingSyncCount, 
    triggerSync, 
    isSyncing,
    currentUser,
    logout,
    t,
    showToast 
  } = useApp();

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  return (
    <div className={`w-full h-full flex flex-col justify-between overflow-y-auto pb-16 select-none transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#F7F8F7] text-slate-800'
    }`}>
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-3 shadow-sm flex items-center justify-between flex-shrink-0">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-bold">{t.profile} & {language === 'km' ? 'ការកំណត់' : 'Settings'}</span>
        </button>

        {/* Quick Dark Mode Icon in header */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          title={isDarkMode ? t.lightMode : t.darkMode}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-4 space-y-3.5">
        {/* User Card */}
        <div className={`p-4 rounded-3xl border shadow-sm flex items-center justify-between transition-colors ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-[#006B45] text-white flex items-center justify-center font-black text-base shadow-sm ring-2 ring-emerald-400/20">
              {currentUser?.name
                ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                : 'AH'}
            </div>
            <div>
              <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {currentUser?.name || 'Anjali Educator'}
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[170px]">{currentUser?.email}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#EAF6EF] text-[#006B45] text-[10px] font-bold uppercase dark:bg-emerald-950/60 dark:text-emerald-300">
                  {currentUser?.role || currentRole}
                </span>
                {currentUser?.className && (
                  <span className="text-[10px] text-slate-400">
                    • {currentUser.className}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveScreen('login')}
            className={`p-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Switch Account"
          >
            <LogIn className="w-4 h-4 text-[#006B45] dark:text-emerald-400" />
          </button>
        </div>

        {/* Dark Mode Toggle Card */}
        <div className={`p-4 rounded-3xl border shadow-2xs space-y-2 transition-colors ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {t.darkMode} / {t.lightMode}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {isDarkMode ? (language === 'km' ? 'ងងឹត' : 'Dark') : (language === 'km' ? 'ភ្លឺ' : 'Light')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setIsDarkMode(false);
                showToast(language === 'km' ? 'បានប្តូរទៅជាមុខងារភ្លឺ' : 'Switched to Light Mode');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                !isDarkMode
                  ? 'bg-[#006B45] text-white border-[#006B45] shadow-xs'
                  : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.lightMode}</span>
            </button>

            <button
              onClick={() => {
                setIsDarkMode(true);
                showToast(language === 'km' ? 'បានប្តូរទៅជាមុខងារងងឹត' : 'Switched to Dark Mode');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                isDarkMode
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.darkMode}</span>
            </button>
          </div>
        </div>

        {/* 1. Language Switcher (English / Khmer) */}
        <div className={`p-4 rounded-3xl border shadow-2xs space-y-2 transition-colors ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#006B45] dark:text-emerald-400" />
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Language / ភាសា
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {language === 'km' ? 'ភាសាខ្មែរ' : 'English'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setLanguage('en');
                showToast('Language changed to English');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                language === 'en'
                  ? 'bg-[#006B45] text-white border-[#006B45] shadow-xs'
                  : isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🇺🇸 English
            </button>

            <button
              onClick={() => {
                setLanguage('km');
                showToast('បានប្តូរទៅជាភាសាខ្មែរ');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                language === 'km'
                  ? 'bg-[#006B45] text-white border-[#006B45] shadow-xs'
                  : isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🇰🇭 ភាសាខ្មែរ (Khmer)
            </button>
          </div>
        </div>

        {/* 2. Role Switcher */}
        <div className={`p-4 rounded-3xl border shadow-2xs space-y-2 transition-colors ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-4 h-4 text-[#006B45] dark:text-emerald-400" />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {language === 'km' ? 'ប្តូរតួនាទីសាកល្បង' : 'Switch User Role'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { role: 'teacher', label: 'Teacher', desc: 'Dara Heng • Grade 5A' },
              { role: 'student', label: 'Student', desc: 'Sok Dara • 94.5%' },
              { role: 'parent', label: 'Parent', desc: 'Sok Kolab • Family' },
              { role: 'admin', label: 'Admin', desc: 'School Console' }
            ].map(r => (
              <button
                key={r.role}
                onClick={() => {
                  setCurrentRole(r.role as any);
                  if (r.role === 'student') setActiveScreen('student_attendance');
                  else if (r.role === 'admin') setActiveScreen('admin_web');
                  else setActiveScreen('home');
                  showToast(`Switched active role to: ${r.label}`);
                }}
                className={`p-2.5 rounded-2xl text-left transition border cursor-pointer ${
                  currentRole === r.role
                    ? 'border-[#006B45] bg-[#EAF6EF] text-[#006B45] dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-600'
                    : isDarkMode 
                      ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-750' 
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{r.label}</div>
                <div className="text-[10px] text-slate-400">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Offline Mode & Server Sync */}
        <div className={`p-4 rounded-3xl border shadow-2xs space-y-3 transition-colors ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOffline ? <WifiOff className="w-4 h-4 text-amber-500" /> : <Wifi className="w-4 h-4 text-[#20A464]" />}
              <div>
                <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Offline Attendance Engine
                </span>
                <p className="text-[10px] text-slate-400">Record without internet, sync when back online</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOffline(!isOffline);
                showToast(isOffline ? 'Online Mode Enabled' : 'Offline Mode Enabled: Records will queue locally');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                isOffline 
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300' 
                  : 'bg-emerald-50 text-[#006B45] dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}
            >
              {isOffline ? 'Offline' : 'Online'}
            </button>
          </div>

          <div className={`pt-2 border-t flex items-center justify-between text-xs ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
              Pending: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{pendingSyncCount} record(s)</strong>
            </span>

            <button
              onClick={triggerSync}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-[#006B45] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#004D35] disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync to SQL Server'}</span>
            </button>
          </div>
        </div>

        {/* Auth Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setActiveScreen('login')}
            className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-[#006B45] dark:text-emerald-400" />
            <span>{t.signIn}</span>
          </button>

          <button
            onClick={() => setActiveScreen('register')}
            className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-[#006B45] dark:text-emerald-400" />
            <span>{t.register}</span>
          </button>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className={`w-full py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 text-rose-400 hover:bg-rose-950/40 border border-slate-700' 
              : 'bg-slate-100 hover:bg-rose-50 hover:text-[#E5484D] text-slate-600'
          }`}
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};
