import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SplashScreen } from './screens/SplashScreen';
import { TeacherHomeScreen } from './screens/TeacherHomeScreen';
import { TakeAttendanceScreen } from './screens/TakeAttendanceScreen';
import { AttendanceHistoryScreen } from './screens/AttendanceHistoryScreen';
import { StudentAttendanceScreen } from './screens/StudentAttendanceScreen';
import { StudentRegistrationScreen } from './screens/StudentRegistrationScreen';
import { ClassesScheduleScreen } from './screens/ClassesScheduleScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { QRAttendanceModal } from './screens/QRAttendanceModal';
import { AuthScreen } from './screens/AuthScreen';
import { 
  Home, 
  BookOpen, 
  CheckSquare, 
  BarChart3, 
  User, 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles,
  QrCode
} from 'lucide-react';

interface MobileAppContainerProps {
  deviceStyle?: 'iphone' | 'compact' | 'borderless';
  initialScreen?: string;
  className?: string;
}

export const MobileAppContainer: React.FC<MobileAppContainerProps> = ({ 
  deviceStyle = 'iphone',
  className = ''
}) => {
  const { 
    activeScreen, 
    setActiveScreen, 
    currentRole, 
    t, 
    toastMessage, 
    isDarkMode 
  } = useApp();
  const [showQRModal, setShowQRModal] = useState(false);

  // Bottom navigation items matching the reference image layout:
  // Home, Classes, Attendance, Reports, Profile
  const navTabs = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'classes', label: t.navClasses, icon: BookOpen },
    { id: 'take_attendance', label: t.navAttendance, icon: CheckSquare, highlight: true },
    { id: 'reports', label: t.navReports, icon: BarChart3 },
    { id: 'settings', label: t.navProfile, icon: User }
  ];

  // Screen router
  const renderScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => setActiveScreen('home')} />;
      case 'login':
        return (
          <AuthScreen 
            initialMode="login" 
            onBack={() => setActiveScreen('splash')} 
            onSuccess={() => setActiveScreen('home')} 
          />
        );
      case 'register':
        return (
          <AuthScreen 
            initialMode="register" 
            onBack={() => setActiveScreen('splash')} 
            onSuccess={() => setActiveScreen('home')} 
          />
        );
      case 'home':
        return <TeacherHomeScreen onNavigate={(s) => setActiveScreen(s)} />;
      case 'take_attendance':
        return <TakeAttendanceScreen onBack={() => setActiveScreen('home')} />;
      case 'attendance_history':
        return <AttendanceHistoryScreen onBack={() => setActiveScreen('home')} />;
      case 'student_attendance':
        return <StudentAttendanceScreen onBack={() => setActiveScreen('home')} />;
      case 'register_student':
        return <StudentRegistrationScreen onBack={() => setActiveScreen('home')} />;
      case 'classes':
        return <ClassesScheduleScreen onBack={() => setActiveScreen('home')} />;
      case 'reports':
        return <ReportsScreen onBack={() => setActiveScreen('home')} />;
      case 'notifications':
        return <NotificationsScreen onBack={() => setActiveScreen('home')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setActiveScreen('home')} />;
      case 'qr_scan':
        return (
          <>
            <TeacherHomeScreen onNavigate={(s) => setActiveScreen(s)} />
            <QRAttendanceModal onClose={() => setActiveScreen('home')} />
          </>
        );
      default:
        return <TeacherHomeScreen onNavigate={(s) => setActiveScreen(s)} />;
    }
  };

  const showBottomNav = 
    activeScreen !== 'splash' && 
    activeScreen !== 'take_attendance' && 
    activeScreen !== 'login' && 
    activeScreen !== 'register';

  const isDarkThemeScreen = 
    activeScreen === 'splash' || 
    activeScreen === 'take_attendance' || 
    isDarkMode;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Device Body Frame */}
      <div 
        className="relative w-full max-w-[390px] h-[780px] max-h-[92vh] bg-slate-900 rounded-[46px] p-3 shadow-[0_24px_64px_rgba(0,0,0,0.35)] border-4 border-slate-800 flex flex-col overflow-hidden ring-1 ring-white/10"
      >
        {/* Hardware details: Speaker & Camera Notch (Dynamic Island) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-28 h-5 bg-black rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800/80 mr-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
        </div>

        {/* Screen Content Window */}
        <div className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-900' : 'bg-[#F7F8F7]'
        }`}>
          {/* Status Bar: 9:41, wifi, battery */}
          <div className="w-full h-9 px-6 flex items-center justify-between text-xs font-bold z-30 select-none bg-transparent pt-1">
            <span className={isDarkThemeScreen ? 'text-white' : 'text-slate-800'}>
              9:41
            </span>

            <div className={`flex items-center gap-2 ${isDarkThemeScreen ? 'text-white' : 'text-slate-800'}`}>
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
                <div className="w-3 h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Active Screen View */}
          <div className="flex-1 overflow-hidden relative">
            {renderScreen()}
          </div>

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="absolute top-12 left-4 right-4 z-50 animate-in fade-in slide-in-from-top duration-300">
              <div className="p-3 rounded-2xl bg-slate-900/90 text-white text-xs font-semibold shadow-2xl backdrop-blur-md border border-white/10 flex items-center justify-center text-center">
                <span>{toastMessage}</span>
              </div>
            </div>
          )}

          {/* Bottom Navigation Bar */}
          {showBottomNav && (
            <div className={`absolute bottom-0 inset-x-0 backdrop-blur-md border-t px-2 py-1.5 flex items-center justify-around z-30 shadow-lg transition-colors ${
              isDarkMode 
                ? 'bg-slate-900/95 border-slate-800' 
                : 'bg-white/95 border-slate-200/80'
            }`}>
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeScreen === tab.id;

                if (tab.highlight) {
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveScreen(tab.id as any)}
                      className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#006B45] hover:bg-[#004D35] text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform ring-4 ring-white dark:ring-slate-900">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-[#006B45] dark:text-emerald-400 mt-0.5">
                        {tab.label}
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreen(tab.id as any)}
                    className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition cursor-pointer ${
                      isActive 
                        ? 'text-[#006B45] dark:text-emerald-400 font-bold' 
                        : isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive 
                        ? 'text-[#006B45] dark:text-emerald-400' 
                        : isDarkMode ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                    <span className="text-[10px] font-medium mt-0.5">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Home indicator bar (iPhone gesture line) */}
          <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-40 pointer-events-none ${
            isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
          }`} />
        </div>
      </div>
    </div>
  );
};
