import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { EduAttendLogo } from '../../common/EduAttendLogo';
import { UserRole } from '../../../types';
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft,
  Moon,
  Sun,
  School
} from 'lucide-react';

interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
  onBack?: () => void;
  isMockup?: boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ 
  initialMode = 'login', 
  onSuccess, 
  onBack,
  isMockup = false 
}) => {
  const { 
    login, 
    register, 
    loginAsGuest,
    language, 
    setLanguage, 
    isDarkMode, 
    setIsDarkMode, 
    t, 
    showToast,
    registeredUsers,
    setActiveScreen
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('dara@anjali-house.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginRole, setLoginRole] = useState<UserRole>('teacher');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('teacher');
  const [regClass, setRegClass] = useState('Grade 5A');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const roles: { id: UserRole; labelEn: string; labelKm: string; icon: any }[] = [
    { id: 'teacher', labelEn: 'Teacher', labelKm: 'គ្រូបង្រៀន', icon: GraduationCap },
    { id: 'student', labelEn: 'Student', labelKm: 'សិស្ស', icon: User },
    { id: 'admin', labelEn: 'Admin', labelKm: 'រដ្ឋបាល', icon: ShieldCheck },
    { id: 'parent', labelEn: 'Parent', labelKm: 'អាណាព្យាបាល', icon: Users }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      showToast(language === 'km' ? 'សូមបញ្ចូលអ៊ីមែល ឬលេខសម្គាល់' : 'Please enter your email or ID');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const success = login(loginEmail, loginPassword, loginRole);
      if (success) {
        if (onSuccess) onSuccess();
        else {
          if (loginRole === 'admin') setActiveScreen('admin_web');
          else if (loginRole === 'student') setActiveScreen('student_attendance');
          else setActiveScreen('home');
        }
      }
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      showToast(language === 'km' ? 'សូមបញ្ចូលឈ្មោះពេញ' : 'Please enter your full name');
      return;
    }
    if (!regEmail.trim()) {
      showToast(language === 'km' ? 'សូមបញ្ចូលអ៊ីមែល' : 'Please enter your email');
      return;
    }
    if (regPassword && regPassword !== regConfirmPassword) {
      showToast(language === 'km' ? 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ' : 'Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      showToast(language === 'km' ? 'សូមយល់ព្រមតាមលក្ខខណ្ឌអង្គការ' : 'Please accept Anjali House policies');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const success = register({
        name: regName,
        email: regEmail,
        role: regRole,
        phone: regPhone,
        className: regClass,
        password: regPassword
      });
      if (success) {
        if (onSuccess) onSuccess();
        else {
          if (regRole === 'admin') setActiveScreen('admin_web');
          else if (regRole === 'student') setActiveScreen('student_attendance');
          else setActiveScreen('home');
        }
      }
    }, 500);
  };

  const quickFillDemo = (user: typeof registeredUsers[0]) => {
    setLoginEmail(user.email);
    setLoginRole(user.role);
    setLoginPassword('password123');
    showToast(language === 'km' ? `បានជ្រើសរើសគណនី: ${user.name}` : `Selected demo: ${user.name}`);
  };

  return (
    <div className={`w-full h-full min-h-[580px] flex flex-col justify-between overflow-y-auto select-none transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-[#F7F8F7] text-slate-800'
    }`}>
      {/* Top Header bar with Back, Brand, and Controls */}
      <div className={`sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b backdrop-blur-md transition-colors ${
        isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80 shadow-2xs'
      }`}>
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Go Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="w-12 h-8 flex items-center">
            <EduAttendLogo size="xs" variant="icon" />
          </div>
          <div>
            <span className={`text-xs font-black tracking-tight block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Anjali House
            </span>
            <span className="text-[9px] font-semibold text-[#006B45]">
              {language === 'km' ? 'សមាគមផ្ទះអញ្ជលី' : 'Attendance Portal'}
            </span>
          </div>
        </div>

        {/* Language & Theme Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded-xl border transition cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
            title={isDarkMode ? t.lightMode : t.darkMode}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setLanguage(language === 'en' ? 'km' : 'en')}
            className={`px-2 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-200 border-slate-700' 
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {language === 'en' ? 'ខ្មែរ' : 'EN'}
          </button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="p-5 flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
        {/* Logo Card Header */}
        <div className="text-center mb-4">
          <div className={`inline-flex p-3 rounded-2xl mb-2 shadow-xs border transition-colors ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-100'
          }`}>
            <div className="w-24 h-16 flex items-center justify-center">
              <EduAttendLogo size="md" variant="icon" />
            </div>
          </div>
          <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {mode === 'login' ? t.signIn : t.createAccount}
          </h2>
          <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {mode === 'login' 
              ? (language === 'km' ? 'សូមបញ្ចូលព័ត៌មានគណនីរបស់អ្នក' : 'Sign in to access your attendance workspace')
              : (language === 'km' ? 'ចុះឈ្មោះបង្កើតគណនីថ្មីនៅផ្ទះអញ្ជលី' : 'Register a new account with Anjali House')}
          </p>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div className={`p-1 rounded-2xl flex items-center mb-3 border transition-colors ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-200/70 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'login'
                ? 'bg-[#006B45] text-white shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.signIn}
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              mode === 'register'
                ? 'bg-[#006B45] text-white shadow-xs'
                : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.register}
          </button>
        </div>

        {/* Quick Get Started Option (No Login / No Registration Required) */}
        <div className={`mb-3.5 p-2.5 rounded-2xl border flex items-center justify-between gap-2 transition-all ${
          isDarkMode ? 'bg-emerald-950/40 border-emerald-800/60' : 'bg-[#EAF6EF] border-emerald-200'
        }`}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-[#006B45] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <p className={`text-[11px] font-bold leading-tight truncate ${isDarkMode ? 'text-emerald-200' : 'text-emerald-950'}`}>
                {language === 'km' ? 'មិនចង់ Login ឬចុះឈ្មោះ?' : "Don't want to sign in?"}
              </p>
              <p className={`text-[9.5px] leading-tight truncate ${isDarkMode ? 'text-emerald-300/70' : 'text-emerald-700'}`}>
                {t.noAccountNeeded}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              loginAsGuest(mode === 'login' ? loginRole : regRole);
              if (onSuccess) onSuccess();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#006B45] hover:bg-[#005436] text-white text-[10.5px] font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1 flex-shrink-0 cursor-pointer"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* MODE 1: LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            {/* Role Selection */}
            <div>
              <label className={`block text-[11px] font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.role}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = loginRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setLoginRole(r.id)}
                      className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center border text-[10px] font-bold transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#EAF6EF] text-[#006B45] border-emerald-500 shadow-2xs dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-600'
                          : isDarkMode
                            ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 mb-0.5" />
                      <span className="truncate w-full text-center">
                        {language === 'km' ? r.labelKm : r.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email / ID */}
            <div>
              <label className={`block text-[11px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.emailOrUsername}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@anjali-house.com or ID"
                  required
                  className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none transition font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#006B45]'
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.password}
                </label>
                <button
                  type="button"
                  onClick={() => showToast(language === 'km' ? 'សូមទាក់ទងរដ្ឋបាលដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ' : 'Please contact administrator to reset password')}
                  className="text-[10px] font-bold text-[#006B45] hover:underline cursor-pointer"
                >
                  {t.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-9 pr-9 py-2 rounded-xl text-xs border outline-none transition font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#006B45]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#006B45] rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className={`text-xs cursor-pointer select-none ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.rememberMe}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? '...' : t.signIn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Quick Demo Credentials Autofill */}
            <div className={`pt-2 border-t mt-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className={`text-[10px] font-bold block mb-1.5 uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                ⚡ {t.demoAccounts}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {registeredUsers.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => quickFillDemo(u)}
                    className={`p-1.5 rounded-xl border text-left text-[10px] transition cursor-pointer flex items-center gap-1.5 ${
                      isDarkMode 
                        ? 'bg-slate-800/70 border-slate-700 hover:bg-slate-700 text-slate-300' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#EAF6EF] text-[#006B45] font-black text-[9px] flex items-center justify-center flex-shrink-0">
                      {u.role[0].toUpperCase()}
                    </span>
                    <div className="overflow-hidden">
                      <span className="font-bold block truncate">{u.name}</span>
                      <span className="text-[9px] text-slate-400 block truncate capitalize">{u.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </form>
        ) : (
          /* MODE 2: REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
            {/* Role Selection */}
            <div>
              <label className={`block text-[11px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.role}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {roles.filter(r => r.id !== 'admin').map((r) => {
                  const Icon = r.icon;
                  const isSelected = regRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRegRole(r.id)}
                      className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center border text-[10px] font-bold transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#EAF6EF] text-[#006B45] border-emerald-500 shadow-2xs dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-600'
                          : isDarkMode
                            ? 'bg-slate-800 text-slate-400 border-slate-700'
                            : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 mb-0.5" />
                      <span className="truncate w-full text-center">
                        {language === 'km' ? r.labelKm : r.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className={`block text-[11px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {t.fullName} *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Heng Dara / ហេង តារា"
                  required
                  className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border outline-none font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Email & Phone grid */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="user@anjali.org"
                  required
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs border outline-none font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+855 ..."
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs border outline-none font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Class selection if student/teacher */}
            <div>
              <label className={`block text-[10px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Assigned Class / Grade
              </label>
              <select
                value={regClass}
                onChange={(e) => setRegClass(e.target.value)}
                className={`w-full px-2.5 py-1.5 rounded-xl text-xs border outline-none font-medium ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="Grade 5A">Grade 5A (English & Khmer)</option>
                <option value="Grade 4B">Grade 4B (Primary Education)</option>
                <option value="Grade 6A">Grade 6A (Secondary Prep)</option>
                <option value="Arts & Life Skills">Arts & Life Skills Workshop</option>
              </select>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.password}
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs border outline-none font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[10px] font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {t.confirmPassword}
                </label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full px-2.5 py-1.5 rounded-xl text-xs border outline-none font-medium ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Agree Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#006B45] rounded mt-0.5 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className={`text-[10px] cursor-pointer leading-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {language === 'km' 
                  ? 'ខ្ញុំយល់ព្រមតាមបទបញ្ជាផ្ទៃក្នុង និងក្រមសីលធម៌អង្គការផ្ទះអញ្ជលី' 
                  : 'I agree to Anjali House child safety & school attendance guidelines.'}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              <span>{isLoading ? '...' : t.createAccount}</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Switch mode footer */}
        <div className="mt-4 text-center space-y-2.5">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className={`text-xs font-semibold cursor-pointer block w-full text-center ${
              isDarkMode ? 'text-emerald-400 hover:underline' : 'text-[#006B45] hover:underline'
            }`}
          >
            {mode === 'login' ? t.dontHaveAccount + ' ' + t.register : t.alreadyHaveAccount + ' ' + t.signIn}
          </button>

          <button
            type="button"
            onClick={() => {
              loginAsGuest('teacher');
              if (onSuccess) onSuccess();
            }}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.continueAsGuest} →</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className={`p-3 text-center text-[10px] border-t ${
        isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
      }`}>
        <span>Anjali House NGO • Siem Reap, Cambodia</span>
      </div>
    </div>
  );
};
