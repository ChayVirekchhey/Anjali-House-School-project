export type AttendanceStatus = 'present' | 'late' | 'absent' | 'excused';

export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  nameKhmer?: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  studentCode?: string;
  className?: string;
  isGuest?: boolean;
}

export type Language = 'en' | 'km';

export interface Student {
  id: string;
  code: string; // e.g., "001", "S0001"
  name: string;
  nameKhmer?: string;
  gender: 'Male' | 'Female';
  dob: string;
  classId: string;
  className: string;
  parentName: string;
  parentPhone: string;
  address: string;
  avatarUrl?: string;
  overallAttendanceRate: number; // e.g. 94.5
  stats: {
    present: number;
    late: number;
    absent: number;
    excused: number;
  };
  recentLogs?: {
    date: string;
    subject: string;
    status: AttendanceStatus;
    time?: string;
  }[];
}

export interface Teacher {
  id: string;
  name: string;
  nameKhmer?: string;
  email: string;
  phone: string;
  subject: string;
  avatarUrl?: string;
  classes: string[];
}

export interface SchoolClass {
  id: string;
  name: string;
  grade: string;
  room: string;
  totalStudents: number;
  teacherId: string;
  teacherName: string;
  subjects: string[];
}

export interface ClassSession {
  id: string;
  classId: string;
  className: string;
  subject: string;
  teacherName: string;
  time: string;
  room: string;
  totalStudents: number;
  date: string;
  status: 'pending' | 'completed' | 'upcoming';
  attendanceRate?: number;
  summary?: {
    present: number;
    late: number;
    absent: number;
    excused: number;
  };
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classId: string;
  className: string;
  subject: string;
  date: string;
  status: AttendanceStatus;
  remark?: string;
  timestamp: string;
  markedBy: string;
  synced: boolean;
}

export interface AttendanceHistorySummary {
  id: string;
  date: string;
  className: string;
  subject: string;
  teacher: string;
  total: number;
  present: number;
  late: number;
  absent: number;
  excused: number;
  rate: number;
  status: 'Completed' | 'Pending';
}

export interface NotificationItem {
  id: string;
  title: string;
  titleKhmer?: string;
  message: string;
  messageKhmer?: string;
  time: string;
  type: 'attendance' | 'absence' | 'late' | 'alert' | 'announcement';
  read: boolean;
  targetRole: UserRole | 'all';
}

export type ActiveScreen = 
  | 'splash'
  | 'login'
  | 'register'
  | 'home'
  | 'take_attendance'
  | 'attendance_history'
  | 'student_attendance'
  | 'register_student'
  | 'classes'
  | 'reports'
  | 'notifications'
  | 'qr_scan'
  | 'my_qr'
  | 'settings'
  | 'admin_web';

export type AppViewMode = 'presentation' | 'mobile_app' | 'admin_desktop' | 'dart_code';
