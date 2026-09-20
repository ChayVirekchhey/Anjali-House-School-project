import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  CheckSquare, 
  GraduationCap, 
  Users, 
  History, 
  Calendar, 
  BarChart3, 
  Bell, 
  MessageSquare, 
  User, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  QrCode,
  WifiOff,
  Sun,
  Moon
} from 'lucide-react';

interface TeacherHomeScreenProps {
  onNavigate?: (screen: any) => void;
  isMockup?: boolean;
}

export const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({ onNavigate, isMockup = false }) => {
  const { 
    setActiveScreen, 
    todaySessions, 
    notifications, 
    isOffline, 
    pendingSyncCount,
    currentUser,
    isDarkMode,
    setIsDarkMode,
    t,
    language 
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNav = (screen: any) => {
    if (onNavigate) {
      onNavigate(screen);
    } else {
      setActiveScreen(screen);
    }
  };

  const userDisplayName = currentUser?.name || (language === 'km' ? 'តារា' : 'Mr. Dara');
  const userInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'MD';

  // Quick Action Items (3x3 grid matching the reference image layout)
  const quickActions = [
    {
      id: 'take_attendance',
      label: t.takeAttendance,
      icon: CheckSquare,
      color: 'bg-emerald-50 text-[#006B45]',
      badge: 'Fast',
      action: () => handleNav('take_attendance')
    },
    {
      id: 'classes',
      label: t.myClasses,
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-700',
      action: () => handleNav('classes')
    },
    {
      id: 'students',
      label: t.students,
      icon: Users,
      color: 'bg-amber-50 text-amber-700',
      action: () => handleNav('classes')
    },
    {
      id: 'attendance_history',
      label: t.attendanceHistory,
      icon: History,
      color: 'bg-purple-50 text-purple-700',
      action: () => handleNav('attendance_history')
    },
    {
      id: 'schedule',
      label: t.schedule,
      icon: Calendar,
      color: 'bg-rose-50 text-rose-700',
      action: () => handleNav('classes')
    },
    {
      id: 'reports',
      label: t.reports,
      icon: BarChart3,
      color: 'bg-teal-50 text-teal-700',
      action: () => handleNav('reports')
    },
    {
      id: 'notifications',
      label: t.notifications,
      icon: Bell,
      color: 'bg-orange-50 text-orange-700',
      badge: unreadCount > 0 ? String(unreadCount) : undefined,
      action: () => handleNav('notifications')
    },
    {
      id: 'qr_attendance',
      label: 'QR Scanner',
      icon: QrCode,
      color: 'bg-indigo-50 text-indigo-700',
      action: () => handleNav('qr_scan')
    },
    {
      id: 'profile',
      label: t.profile,
      icon: User,
      color: 'bg-slate-100 text-slate-700',
      action: () => handleNav('settings')
    }
  ];

  return (
    <div className={`w-full h-full flex flex-col justify-between overflow-y-auto pb-16 select-none transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#F7F8F7] text-slate-800'
    }`}>
      <div className="p-4 space-y-4">
        {/* Header (Matching Reference 2. Home Screen) */}
        <div className="flex items-center justify-between pt-1">
          <button 
            onClick={() => handleNav('settings')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-[#006B45] text-white flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-emerald-100 dark:ring-emerald-950 group-hover:scale-105 transition-transform">
              {userInitials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className={`text-base font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {language === 'km' ? `សួស្តី ${userDisplayName} 👋` : `Hello, ${userDisplayName} 👋`}
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-medium">{t.goodMorning}</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            {/* Quick Dark Mode toggle button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full shadow-sm border transition cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={isDarkMode ? t.lightMode : t.darkMode}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isOffline && (
              <div className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-semibold flex items-center gap-1">
                <WifiOff className="w-3 h-3" />
                <span>Offline</span>
              </div>
            )}
            <button 
              onClick={() => handleNav('notifications')}
              className={`relative p-2 rounded-full shadow-sm border transition cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' 
                  : 'bg-white text-slate-700 border-slate-200/70 hover:bg-slate-50'
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5484D] ring-2 ring-white dark:ring-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Guest Mode Banner with Quick Login/Register option */}
        {currentUser?.isGuest && (
          <div className={`p-2.5 px-3 rounded-2xl border flex items-center justify-between gap-2 shadow-2xs ${
            isDarkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-[#EAF6EF] border-emerald-200'
          }`}>
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-0.5 rounded-full bg-[#006B45] text-white text-[9.5px] font-black uppercase tracking-wider flex-shrink-0">
                {t.guestBadge}
              </span>
              <p className={`text-[11px] font-medium truncate ${isDarkMode ? 'text-emerald-200' : 'text-emerald-950'}`}>
                {language === 'km' ? 'កំពុងប្រើប្រាស់របៀបសាកល្បង' : 'Exploring in guest mode'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => handleNav('login')}
                className="px-2 py-1 rounded-lg text-[10px] font-bold text-[#006B45] dark:text-emerald-300 hover:underline cursor-pointer"
              >
                {t.signIn}
              </button>
              <button
                onClick={() => handleNav('register')}
                className="px-2 py-1 rounded-lg bg-[#006B45] text-white text-[10px] font-bold shadow-2xs hover:bg-[#004D35] cursor-pointer"
              >
                {t.register}
              </button>
            </div>
          </div>
        )}

        {/* Hero / Banner: Today's Attendance (Inspired by School Banner in Reference) */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#006B45] to-[#004D35] text-white p-4 shadow-md">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-md pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200/90 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {t.todayAttendance}
              </span>
              <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded-full font-medium text-emerald-100">
                20 Sep 2026
              </span>
            </div>

            {/* 3 Metric counters specified in prompt: 3 Classes Today, 64 Students, 2 Pending */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-white/10 text-center">
              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-white">3</div>
                <div className="text-[10px] text-emerald-100/80 font-medium leading-tight">
                  {language === 'km' ? 'ថ្នាក់ថ្ងៃនេះ' : 'Classes Today'}
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-white">64</div>
                <div className="text-[10px] text-emerald-100/80 font-medium leading-tight">
                  {language === 'km' ? 'សិស្សត្រូវស្រង់' : '64 Students'}
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
                <div className="text-xl font-extrabold text-amber-300">
                  {todaySessions.filter(s => s.status === 'pending').length}
                </div>
                <div className="text-[10px] text-emerald-100/80 font-medium leading-tight">
                  {language === 'km' ? 'មិនទាន់ស្រង់' : 'Pending'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3x3 Quick-Action Grid (Matching the Reference Image style) */}
        <div>
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all active:scale-[0.97] group cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 hover:border-emerald-500/50' 
                      : 'bg-white border-slate-100 hover:border-emerald-200'
                  }`}
                >
                  {action.badge && (
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-[#006B45] text-white text-[9px] font-bold">
                      {action.badge}
                    </span>
                  )}
                  <div className={`w-11 h-11 rounded-2xl ${action.color} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-semibold text-center leading-tight line-clamp-1 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Classes Section (Prompt Specification) */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              <span>{t.todayClasses}</span>
              <span className="w-2 h-2 rounded-full bg-[#20A464]" />
            </h3>
            <button 
              onClick={() => handleNav('classes')}
              className="text-xs text-[#006B45] dark:text-emerald-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t.viewAll}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Class 1: 08:00 English Grade 5A (Actionable) */}
            <div className={`p-3.5 rounded-2xl border shadow-sm transition flex items-center justify-between gap-3 ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:border-emerald-500/50' 
                : 'bg-white border-emerald-100 hover:border-[#006B45]/40'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EAF6EF] text-[#006B45] dark:bg-emerald-950/60 dark:text-emerald-300 flex flex-col items-center justify-center font-bold">
                  <span className="text-xs font-black">08:00</span>
                  <span className="text-[9px] text-emerald-700 dark:text-emerald-400 uppercase">AM</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Grade 5A</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Room 201
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">English • 32 Students</p>
                </div>
              </div>

              <button
                onClick={() => handleNav('take_attendance')}
                className="px-3.5 py-2 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white text-xs font-bold shadow-sm transition active:scale-95 flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>{t.takeAttendance}</span>
              </button>
            </div>

            {/* Class 2: 10:00 Computer Grade 6A (Completed) */}
            <div className={`p-3.5 rounded-2xl border shadow-xs flex items-center justify-between gap-3 opacity-95 ${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold ${
                  isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className="text-xs font-black">10:00</span>
                  <span className="text-[9px] uppercase">AM</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Grade 6A</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#20A464] dark:text-emerald-300 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      96.4%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Computer • 28 Students</p>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-[#EAF6EF] dark:bg-emerald-950/60 text-[#006B45] dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#20A464]" />
                <span>{t.completed}</span>
              </span>
            </div>

            {/* Class 3: 13:30 Mathematics Grade 5B (Upcoming) */}
            <div className={`p-3.5 rounded-2xl border shadow-xs flex items-center justify-between gap-3 opacity-80 ${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold ${
                  isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}>
                  <span className="text-xs font-black">13:30</span>
                  <span className="text-[9px] uppercase">PM</span>
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Grade 5B</h4>
                  <p className="text-xs text-slate-400 font-medium">Mathematics • 30 Students</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-xl text-xs font-medium ${
                isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {t.upcoming}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
