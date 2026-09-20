import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PresentationBoard } from './components/presentation/PresentationBoard';
import { MobileAppContainer } from './components/mobile/MobileAppContainer';
import { AdminWebDashboard } from './components/admin/AdminWebDashboard';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { EduAttendLogo } from './components/common/EduAttendLogo';
import { 
  LayoutGrid, 
  Smartphone, 
  Monitor, 
  FileCode,
  Globe, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Sparkles,
  School,
  QrCode,
  Shield,
  Layers,
  Moon,
  Sun,
  LogIn,
  UserPlus
} from 'lucide-react';

const MainShell: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    language, 
    setLanguage, 
    isDarkMode,
    setIsDarkMode,
    isOffline, 
    setIsOffline, 
    triggerSync, 
    pendingSyncCount,
    currentRole,
    setCurrentRole,
    activeScreen,
    setActiveScreen,
    isSyncing,
    currentUser,
    loginAsGuest,
    t,
    showToast 
  } = useApp();

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F0F2F0] text-slate-800'
    }`}>
      {/* Top Application Control Toolbar */}
      <header className={`sticky top-0 z-40 border-b shadow-2xs px-4 md:px-6 py-2 flex items-center justify-between gap-4 flex-wrap transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200/90 text-slate-800'
      }`}>
        {/* Brand Name & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-11 flex items-center justify-center">
            <EduAttendLogo size="sm" variant="icon" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Anjali House
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF6EF] text-[#006B45] border border-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
                {language === 'km' ? 'សមាគមផ្ទះអញ្ជលី' : 'EduAttend'}
              </span>
            </div>
            <h1 className="text-[11px] font-semibold text-slate-400">
              {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស' : 'Student Attendance Management System'}
            </h1>
          </div>
        </div>

        {/* View Mode Switcher (Presentation Board / Mobile Simulator / Admin Web) */}
        <div className={`flex items-center p-1 rounded-2xl border shadow-inner ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setViewMode('presentation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'presentation'
                ? 'bg-[#006B45] text-white shadow-xs'
                : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">9-Screen Presentation</span>
            <span className="md:hidden">Presentation</span>
          </button>

          <button
            onClick={() => setViewMode('mobile_app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'mobile_app'
                ? 'bg-[#006B45] text-white shadow-xs'
                : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App</span>
          </button>

          <button
            onClick={() => setViewMode('admin_desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'admin_desktop'
                ? 'bg-[#006B45] text-white shadow-xs'
                : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Admin Web</span>
          </button>

          <button
            onClick={() => setViewMode('dart_code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'dart_code'
                ? 'bg-[#006B45] text-white shadow-xs'
                : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span className="font-mono">.dart Code</span>
          </button>
        </div>

        {/* Utility Controls (Dark mode toggle, Language toggle, Offline simulator, Sync action) */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-750'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            <span className="hidden sm:inline">{isDarkMode ? t.lightMode : t.darkMode}</span>
          </button>

          {/* Offline/Online toggle */}
          <button
            onClick={() => {
              setIsOffline(!isOffline);
              showToast(isOffline ? 'Connected to Online Database' : 'Switched to Offline Local Storage Mode');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isOffline
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}
            title="Toggle offline simulated mode"
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOffline ? 'Offline' : 'Online'}</span>
          </button>

          {/* Sync status / action */}
          {pendingSyncCount > 0 && (
            <button
              onClick={triggerSync}
              disabled={isSyncing || isOffline}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#006B45] text-white shadow-xs hover:bg-[#004D35] disabled:opacity-50 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync ({pendingSyncCount})</span>
            </button>
          )}

          {/* Language Switcher (EN / KM) */}
          <div className={`flex items-center p-0.5 rounded-xl border text-xs font-bold ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                language === 'en' 
                  ? (isDarkMode ? 'bg-slate-700 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs') 
                  : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('km')}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                language === 'km' 
                  ? (isDarkMode ? 'bg-slate-700 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs') 
                  : 'text-slate-400'
              }`}
            >
              ខ្មែរ
            </button>
          </div>
        </div>
      </header>

      {/* Primary Workspace Content */}
      <main className="flex-1 flex flex-col">
        {viewMode === 'presentation' && <PresentationBoard />}

        {viewMode === 'mobile_app' && (
          <div className={`flex-1 py-8 px-4 flex flex-col items-center justify-center transition-colors ${
            isDarkMode ? 'bg-slate-950' : 'bg-[#E5E9E5]'
          }`}>
            {/* Quick Navigation Toolbar above phone */}
            <div className={`mb-4 flex items-center justify-between gap-2 max-w-md w-full px-4 py-2 rounded-2xl shadow-xs border text-xs flex-wrap transition-colors ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <Smartphone className="w-3.5 h-3.5 text-[#006B45] dark:text-emerald-400" />
                <span>Screen:</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  onClick={() => setActiveScreen('splash')}
                  className={`px-2 py-1 rounded-md font-medium transition cursor-pointer ${
                    activeScreen === 'splash'
                      ? 'bg-[#006B45] text-white'
                      : isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  Splash
                </button>
                <button
                  onClick={() => {
                    loginAsGuest('teacher');
                  }}
                  className={`px-2 py-1 rounded-md font-bold transition flex items-center gap-1 cursor-pointer bg-emerald-50 text-[#006B45] hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60`}
                  title="Direct access without login or registration"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Get Started</span>
                </button>
                <button
                  onClick={() => setActiveScreen('login')}
                  className={`px-2 py-1 rounded-md font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeScreen === 'login'
                      ? 'bg-[#006B45] text-white'
                      : isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <LogIn className="w-3 h-3" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => setActiveScreen('register')}
                  className={`px-2 py-1 rounded-md font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeScreen === 'register'
                      ? 'bg-[#006B45] text-white'
                      : isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Register</span>
                </button>
                <button
                  onClick={() => setActiveScreen('home')}
                  className={`px-2 py-1 rounded-md font-medium transition cursor-pointer ${
                    activeScreen === 'home'
                      ? 'bg-[#006B45] text-white'
                      : isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveScreen('take_attendance')}
                  className={`px-2 py-1 rounded-md font-bold transition cursor-pointer ${
                    activeScreen === 'take_attendance'
                      ? 'bg-[#006B45] text-white'
                      : 'bg-[#EAF6EF] text-[#006B45] dark:bg-emerald-950/60 dark:text-emerald-300'
                  }`}
                >
                  Mark
                </button>
                <button
                  onClick={() => setActiveScreen('settings')}
                  className={`px-2 py-1 rounded-md font-medium transition cursor-pointer ${
                    activeScreen === 'settings'
                      ? 'bg-[#006B45] text-white'
                      : isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  Profile
                </button>
              </div>
            </div>

            {/* Mobile Device */}
            <MobileAppContainer />
          </div>
        )}

        {viewMode === 'admin_desktop' && (
          <div className={`flex-1 p-4 md:p-8 flex justify-center transition-colors ${
            isDarkMode ? 'bg-slate-950' : 'bg-slate-100'
          }`}>
            <div className="w-full max-w-7xl h-[calc(100vh-100px)] min-h-[700px] shadow-xl rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800">
              <AdminWebDashboard isMockup={false} />
            </div>
          </div>
        )}

        {viewMode === 'dart_code' && <FlutterCodeViewer />}
      </main>

      {/* Professional Footer */}
      <footer className={`border-t px-6 py-2.5 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200/80 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-medium">
          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {language === 'km' ? 'សមាគមផ្ទះអញ្ជលី (Anjali House)' : 'Anjali House NGO'}
          </span>
          <span>• {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស EduAttend' : 'EduAttend Student Attendance System'}</span>
          <span className="hidden md:inline">• Siem Reap, Cambodia</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">● System Status: Operational</span>
          <span className="text-slate-400">Anjali House • Siem Reap</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}
