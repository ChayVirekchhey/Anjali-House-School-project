import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  AttendanceStatus, 
  ActiveScreen, 
  AppViewMode, 
  Student, 
  SchoolClass, 
  ClassSession, 
  AttendanceHistorySummary, 
  NotificationItem,
  AttendanceRecord,
  AuthUser
} from '../types';
import { 
  INITIAL_CLASSES, 
  INITIAL_TODAY_SESSIONS, 
  INITIAL_GRADE_5A_STUDENTS, 
  INITIAL_HISTORY_SUMMARIES, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { translations } from '../localization/translations';

export const INITIAL_REGISTERED_USERS: AuthUser[] = [
  {
    id: 'u_teacher_1',
    name: 'Mr. Dara Heng',
    nameKhmer: 'លោកគ្រូ ហេង តារា',
    email: 'dara@anjali-house.com',
    role: 'teacher',
    phone: '+855 12 345 678',
    className: 'Grade 5A',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u_student_1',
    name: 'Sok Dara',
    nameKhmer: 'សុខ តារា',
    email: 's001@anjali-house.com',
    role: 'student',
    studentCode: '001',
    className: 'Grade 5A',
    phone: '+855 89 222 333',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u_admin_1',
    name: 'Sophea Chea (Admin)',
    nameKhmer: 'ជា សុភា (រដ្ឋបាល)',
    email: 'admin@anjali-house.com',
    role: 'admin',
    phone: '+855 63 965 555',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u_parent_1',
    name: 'Mrs. Sok Kolab',
    nameKhmer: 'អ្នកស្រី សុខ កូឡាប',
    email: 'kolab@anjali-house.com',
    role: 'parent',
    phone: '+855 12 888 999',
    className: 'Grade 5A'
  }
];

interface AppContextType {
  // Navigation & View Mode
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  
  // Presentation focus screen (1 to 9)
  presentationFocusedIndex: number | null;
  setPresentationFocusedIndex: (index: number | null) => void;

  // Role & Settings
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;

  // Authentication & Profiles
  currentUser: AuthUser;
  isAuthenticated: boolean;
  registeredUsers: AuthUser[];
  login: (email: string, password?: string, role?: UserRole) => boolean;
  register: (userData: { name: string; email: string; role: UserRole; phone?: string; className?: string; password?: string }) => boolean;
  loginAsGuest: (role?: UserRole) => void;
  logout: () => void;

  // Offline Simulation
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  pendingSyncCount: number;
  isSyncing: boolean;
  triggerSync: () => void;

  // Data
  classes: SchoolClass[];
  todaySessions: ClassSession[];
  students: Student[];
  currentAttendanceMap: Record<string, AttendanceStatus>; // studentId -> status
  currentRemarksMap: Record<string, string>;
  historySummaries: AttendanceHistorySummary[];
  notifications: NotificationItem[];
  
  // Fast Attendance Actions
  markAllPresent: () => void;
  setStudentStatus: (studentId: string, status: AttendanceStatus) => void;
  setStudentRemark: (studentId: string, remark: string) => void;
  saveAttendance: () => { success: boolean; total: number; present: number; late: number; absent: number; excused: number };
  
  // Registration Action
  registerNewStudent: (data: Omit<Student, 'id' | 'code' | 'overallAttendanceRate' | 'stats'>) => void;

  // Search & Filter state
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFilter: 'all' | 'present' | 'late' | 'absent' | 'excused';
  setSelectedFilter: (filter: 'all' | 'present' | 'late' | 'absent' | 'excused') => void;

  // Toast / Status message
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<AppViewMode>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'mobile_app';
    }
    return 'presentation';
  });
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('splash');
  const [presentationFocusedIndex, setPresentationFocusedIndex] = useState<number | null>(null);
  
  const [currentRole, setCurrentRole] = useState<UserRole>('teacher');
  const [language, setLanguage] = useState<Language>('en');
  
  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('anjali_dark_mode');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('anjali_dark_mode', JSON.stringify(isDarkMode));
    } catch {}
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auth state
  const [registeredUsers, setRegisteredUsers] = useState<AuthUser[]>(INITIAL_REGISTERED_USERS);
  const [currentUser, setCurrentUser] = useState<AuthUser>(INITIAL_REGISTERED_USERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  
  // Offline state
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Core Data
  const [classes] = useState<SchoolClass[]>(INITIAL_CLASSES);
  const [todaySessions, setTodaySessions] = useState<ClassSession[]>(INITIAL_TODAY_SESSIONS);
  const [students, setStudents] = useState<Student[]>(INITIAL_GRADE_5A_STUDENTS);
  const [historySummaries, setHistorySummaries] = useState<AttendanceHistorySummary[]>(INITIAL_HISTORY_SUMMARIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Initial Attendance Map initialized to match the reference specs:
  // 32 students in Grade 5A: 28 present, 2 late (s003 Mey Sopheak, s018 Rith Sothy), 1 absent (s004 Lim Rina), 1 excused (s024 Chorn Makara)
  const [currentAttendanceMap, setCurrentAttendanceMap] = useState<Record<string, AttendanceStatus>>(() => {
    const initialMap: Record<string, AttendanceStatus> = {};
    INITIAL_GRADE_5A_STUDENTS.forEach((st, idx) => {
      if (st.code === '003') initialMap[st.id] = 'late';
      else if (st.code === '004') initialMap[st.id] = 'absent';
      else if (st.code === '024') initialMap[st.id] = 'excused';
      else if (st.code === '018') initialMap[st.id] = 'late';
      else initialMap[st.id] = 'present';
    });
    return initialMap;
  });

  const [currentRemarksMap, setCurrentRemarksMap] = useState<Record<string, string>>({
    's003': 'Bus delayed due to traffic',
    's004': 'Family sickness - called office',
    's024': 'Doctor appointment with medical slip'
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'present' | 'late' | 'absent' | 'excused'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[language];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Fast Attendance Actions
  const markAllPresent = () => {
    const nextMap: Record<string, AttendanceStatus> = {};
    students.forEach((st) => {
      nextMap[st.id] = 'present';
    });
    setCurrentAttendanceMap(nextMap);
    showToast(language === 'km' ? '✓ បានកត់ត្រាវត្តមានទាំងអស់ (៣២ នាក់)' : '✓ All 32 Students Marked Present');
  };

  const setStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setCurrentAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  const setStudentRemark = (studentId: string, remark: string) => {
    setCurrentRemarksMap((prev) => ({
      ...prev,
      [studentId]: remark
    }));
  };

  const saveAttendance = () => {
    let present = 0;
    let late = 0;
    let absent = 0;
    let excused = 0;

    students.forEach((st) => {
      const status = currentAttendanceMap[st.id] || 'present';
      if (status === 'present') present++;
      else if (status === 'late') late++;
      else if (status === 'absent') absent++;
      else if (status === 'excused') excused++;
    });

    const total = students.length;
    // Rate calculation: Present + Late (counted as attended) / Total
    const rate = Math.round(((present + late) / total) * 1000) / 10;

    // Update today's session status
    setTodaySessions((prev) =>
      prev.map((sess) =>
        sess.id === 'sess-1'
          ? {
              ...sess,
              status: 'completed',
              attendanceRate: rate,
              summary: { present, late, absent, excused }
            }
          : sess
      )
    );

    // Update or prepend history summary
    const newSummary: AttendanceHistorySummary = {
      id: `h-${Date.now()}`,
      date: '20 Sep 2026',
      className: 'Grade 5A',
      subject: 'English',
      teacher: 'Mr. Dara',
      total,
      present,
      late,
      absent,
      excused,
      rate,
      status: 'Completed'
    };

    setHistorySummaries((prev) => [newSummary, ...prev.filter(h => h.id !== 'h-1')]);

    // Handle offline sync queue
    if (isOffline) {
      setPendingSyncCount((prev) => prev + 1);
      showToast(
        language === 'km'
          ? '📦 បានរក្សាទុកក្នុងទូរស័ព្ទ (គ្មានអ៊ីនធឺណិត - រង់ចាំបញ្ជូន)'
          : '📦 Saved to Local Storage (Offline Mode - Pending Sync)'
      );
    } else {
      showToast(
        language === 'km'
          ? `✓ បានរក្សាទុកជោគជ័យ (${total} នាក់៖ វត្តមាន ${present}, យឺត ${late}, អវត្តមាន ${absent})`
          : `✓ Attendance Saved (${total} processed: ${present} Present, ${late} Late, ${absent} Absent)`
      );
    }

    // Add new notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Grade 5A Attendance Saved',
      titleKhmer: 'បានរក្សាទុកវត្តមានថ្នាក់ 5A',
      message: `Mr. Dara recorded attendance: ${present} Present, ${late} Late, ${absent} Absent, ${excused} Excused.`,
      messageKhmer: `លោកគ្រូ តារា បានស្រង់វត្តមាន៖ វត្តមាន ${present}, យឺត ${late}, អវត្តមាន ${absent}, ច្បាប់ ${excused}។`,
      time: 'Just now',
      type: 'attendance',
      read: false,
      targetRole: 'all'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true, total, present, late, absent, excused };
  };

  const triggerSync = () => {
    if (pendingSyncCount === 0 && !isOffline) {
      showToast(language === 'km' ? 'ទិន្នន័យត្រូវបានធ្វើសមកាលកម្មរួចរាល់' : 'All attendance records already synchronized');
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsOffline(false);
      const count = pendingSyncCount || 1;
      setPendingSyncCount(0);
      showToast(
        language === 'km'
          ? `✓ បានធ្វើសមកាលកម្ម ${count} កំណត់ត្រាទៅកាន់ SQL Server ដោយជោគជ័យ!`
          : `✓ Successfully synced ${count} pending record(s) to server database!`
      );
    }, 1200);
  };

  const registerNewStudent = (data: Omit<Student, 'id' | 'code' | 'overallAttendanceRate' | 'stats'>) => {
    const newId = `s${Date.now()}`;
    const nextCode = String(students.length + 1).padStart(3, '0');
    const newStudent: Student = {
      ...data,
      id: newId,
      code: nextCode,
      overallAttendanceRate: 100,
      stats: { present: 1, late: 0, absent: 0, excused: 0 }
    };
    setStudents((prev) => [...prev, newStudent]);
    setCurrentAttendanceMap((prev) => ({ ...prev, [newId]: 'present' }));
    showToast(
      language === 'km'
        ? `✓ បានចុះឈ្មោះសិស្ស "${newStudent.name}" ដោយជោគជ័យ!`
        : `✓ Student "${newStudent.name}" registered successfully!`
    );
  };

  // Authentication methods
  const login = (email: string, _password?: string, role?: UserRole): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    // Try to match existing registered user
    let user = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail || u.studentCode === cleanEmail
    );

    if (!user) {
      // Create user session dynamically if not found
      const effectiveRole = role || 'teacher';
      user = {
        id: `u_${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' '),
        email: cleanEmail,
        role: effectiveRole,
        className: 'Grade 5A'
      };
      setRegisteredUsers((prev) => [user!, ...prev]);
    } else if (role && user.role !== role) {
      // If user chose a specific role during login
      user = { ...user, role };
    }

    setCurrentUser(user);
    setCurrentRole(user.role);
    setIsAuthenticated(true);
    showToast(
      language === 'km'
        ? `✓ ចូលប្រព័ន្ធជោគជ័យ! សូមស្វាគមន៍ ${user.name}`
        : `✓ Welcome back, ${user.name}!`
    );
    return true;
  };

  const register = (userData: { 
    name: string; 
    email: string; 
    role: UserRole; 
    phone?: string; 
    className?: string; 
    password?: string 
  }): boolean => {
    const newUser: AuthUser = {
      id: `u_${Date.now()}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      role: userData.role,
      phone: userData.phone?.trim(),
      className: userData.className || 'Grade 5A'
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole(newUser.role);
    setIsAuthenticated(true);

    showToast(
      language === 'km'
        ? `✓ បានចុះឈ្មោះគណនីថ្មីជោគជ័យ! សូមស្វាគមន៍ ${newUser.name}`
        : `✓ Account registered successfully! Welcome, ${newUser.name}`
    );
    return true;
  };

  const loginAsGuest = (role?: UserRole) => {
    const chosenRole = role || 'teacher';
    const guestUser: AuthUser = {
      id: `guest_${Date.now()}`,
      name: language === 'km' ? 'ភ្ញៀវទូទៅ (Guest)' : 'Guest Educator',
      nameKhmer: 'ភ្ញៀវទូទៅ',
      email: 'guest@anjali-house.org',
      role: chosenRole,
      className: 'Grade 5A',
      isGuest: true
    };
    setCurrentUser(guestUser);
    setCurrentRole(chosenRole);
    setIsAuthenticated(true);
    setActiveScreen('home');
    showToast(
      language === 'km'
        ? '✓ បានចាប់ផ្តើមជាភ្ញៀវ! មិនបាច់ Login ឬចុះឈ្មោះទេ'
        : '✓ Welcome! Started as Guest — No login or registration needed.'
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveScreen('login');
    showToast(
      language === 'km'
        ? 'បានចាកចេញពីគណនីដោយសុវត្ថិភាព'
        : 'You have been safely logged out.'
    );
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeScreen,
        setActiveScreen,
        presentationFocusedIndex,
        setPresentationFocusedIndex,
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        t,
        isDarkMode,
        setIsDarkMode,
        currentUser,
        isAuthenticated,
        registeredUsers,
        login,
        register,
        loginAsGuest,
        logout,
        isOffline,
        setIsOffline,
        pendingSyncCount,
        isSyncing,
        triggerSync,
        classes,
        todaySessions,
        students,
        currentAttendanceMap,
        currentRemarksMap,
        historySummaries,
        notifications,
        markAllPresent,
        setStudentStatus,
        setStudentRemark,
        saveAttendance,
        registerNewStudent,
        searchQuery,
        setSearchQuery,
        selectedFilter,
        setSelectedFilter,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
