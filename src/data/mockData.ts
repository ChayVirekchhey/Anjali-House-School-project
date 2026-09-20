import { Student, SchoolClass, ClassSession, AttendanceHistorySummary, NotificationItem, AttendanceRecord } from '../types';

export const INITIAL_CLASSES: SchoolClass[] = [
  {
    id: 'c1',
    name: 'Grade 5A',
    grade: '5',
    room: 'Room 201',
    totalStudents: 32,
    teacherId: 't1',
    teacherName: 'Mr. Dara',
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies']
  },
  {
    id: 'c2',
    name: 'Grade 6A',
    grade: '6',
    room: 'Computer Lab 1',
    totalStudents: 28,
    teacherId: 't2',
    teacherName: 'Ms. Sophea',
    subjects: ['Computer', 'English', 'Science']
  },
  {
    id: 'c3',
    name: 'Grade 5B',
    grade: '5',
    room: 'Room 202',
    totalStudents: 30,
    teacherId: 't3',
    teacherName: 'Mr. Vichea',
    subjects: ['Mathematics', 'Khmer Literature', 'Art']
  },
  {
    id: 'c4',
    name: 'Grade 6B',
    grade: '6',
    room: 'Room 301',
    totalStudents: 30,
    teacherId: 't1',
    teacherName: 'Mr. Dara',
    subjects: ['English', 'Geography', 'History']
  }
];

export const INITIAL_TODAY_SESSIONS: ClassSession[] = [
  {
    id: 'sess-1',
    classId: 'c1',
    className: 'Grade 5A',
    subject: 'English',
    teacherName: 'Mr. Dara',
    time: '08:00 - 09:30',
    room: 'Room 201',
    totalStudents: 32,
    date: '2026-09-20',
    status: 'pending',
    summary: {
      present: 28,
      late: 2,
      absent: 1,
      excused: 1
    }
  },
  {
    id: 'sess-2',
    classId: 'c2',
    className: 'Grade 6A',
    subject: 'Computer',
    teacherName: 'Ms. Sophea',
    time: '10:00 - 11:30',
    room: 'Lab 1',
    totalStudents: 28,
    date: '2026-09-20',
    status: 'completed',
    attendanceRate: 96.4,
    summary: {
      present: 27,
      late: 1,
      absent: 0,
      excused: 0
    }
  },
  {
    id: 'sess-3',
    classId: 'c3',
    className: 'Grade 5B',
    subject: 'Mathematics',
    teacherName: 'Mr. Vichea',
    time: '13:30 - 15:00',
    room: 'Room 202',
    totalStudents: 30,
    date: '2026-09-20',
    status: 'upcoming'
  }
];

// Grade 5A 32 Students with authentic Cambodian names matching the prompt
export const INITIAL_GRADE_5A_STUDENTS: Student[] = [
  {
    id: 's001',
    code: '001',
    name: 'Sok Dara',
    nameKhmer: 'សុខ តារា',
    gender: 'Male',
    dob: '2014-04-12',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mrs. Sok Kolab',
    parentPhone: '+855 12 345 678',
    address: 'Salakanseng, Siem Reap',
    overallAttendanceRate: 94.5,
    stats: { present: 85, late: 3, absent: 2, excused: 1 },
    recentLogs: [
      { date: '20 Sep', subject: 'English', status: 'present', time: '08:05' },
      { date: '19 Sep', subject: 'Computer', status: 'present', time: '09:58' },
      { date: '18 Sep', subject: 'Math', status: 'late', time: '08:22' },
      { date: '17 Sep', subject: 'English', status: 'absent' },
      { date: '16 Sep', subject: 'Science', status: 'excused' }
    ]
  },
  {
    id: 's002',
    code: '002',
    name: 'Chan Vanna',
    nameKhmer: 'ចាន់ វណ្ណា',
    gender: 'Female',
    dob: '2014-06-18',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mr. Chan Socheat',
    parentPhone: '+855 17 889 900',
    address: 'Wat Bo, Siem Reap',
    overallAttendanceRate: 97.2,
    stats: { present: 88, late: 2, absent: 1, excused: 0 }
  },
  {
    id: 's003',
    code: '003',
    name: 'Mey Sopheak',
    nameKhmer: 'ម៉ី សុភ័ក្ត្រ',
    gender: 'Male',
    dob: '2014-01-25',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mrs. Mey Phalla',
    parentPhone: '+855 92 112 233',
    address: 'Svay Dangkum, Siem Reap',
    overallAttendanceRate: 91.0,
    stats: { present: 81, late: 6, absent: 3, excused: 1 }
  },
  {
    id: 's004',
    code: '004',
    name: 'Lim Rina',
    nameKhmer: 'លីម រីណា',
    gender: 'Female',
    dob: '2014-09-08',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mr. Lim Bunheng',
    parentPhone: '+855 88 554 433',
    address: 'Slor Kram, Siem Reap',
    overallAttendanceRate: 88.5,
    stats: { present: 78, late: 4, absent: 5, excused: 4 }
  },
  {
    id: 's005',
    code: '005',
    name: 'Khem Piseth',
    nameKhmer: 'ខេម ពិសិដ្ឋ',
    gender: 'Male',
    dob: '2014-03-30',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mrs. Chea Chantou',
    parentPhone: '+855 12 998 877',
    address: 'Kork Chak, Siem Reap',
    overallAttendanceRate: 98.9,
    stats: { present: 90, late: 1, absent: 0, excused: 0 }
  },
  {
    id: 's006',
    code: '006',
    name: 'Soun Chanthou',
    nameKhmer: 'ស៊ុន ចាន់ធូ',
    gender: 'Female',
    dob: '2014-11-15',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mr. Soun Meng',
    parentPhone: '+855 77 445 566',
    address: 'Chreav, Siem Reap',
    overallAttendanceRate: 95.0,
    stats: { present: 86, late: 3, absent: 1, excused: 1 }
  },
  {
    id: 's007',
    code: '007',
    name: 'Keo Bopha',
    nameKhmer: 'កែវ បុប្ផា',
    gender: 'Female',
    dob: '2014-02-14',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mrs. Keo Samnang',
    parentPhone: '+855 10 223 344',
    address: 'Nokor Thom, Siem Reap',
    overallAttendanceRate: 96.2,
    stats: { present: 87, late: 2, absent: 1, excused: 1 }
  },
  {
    id: 's008',
    code: '008',
    name: 'Noun Visal',
    nameKhmer: 'នួន វិសាល',
    gender: 'Male',
    dob: '2014-05-22',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mr. Noun Rithy',
    parentPhone: '+855 93 667 788',
    address: 'Svay Dangkum, Siem Reap',
    overallAttendanceRate: 92.4,
    stats: { present: 83, late: 5, absent: 2, excused: 1 }
  },
  {
    id: 's009',
    code: '009',
    name: 'Prum Sreynoch',
    nameKhmer: 'ព្រំ ស្រីណុច',
    gender: 'Female',
    dob: '2014-07-07',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mrs. Tep Malis',
    parentPhone: '+855 15 334 455',
    address: 'Wat Bo, Siem Reap',
    overallAttendanceRate: 97.8,
    stats: { present: 89, late: 1, absent: 1, excused: 0 }
  },
  {
    id: 's010',
    code: '010',
    name: 'Heng Sovann',
    nameKhmer: 'ហេង សុវណ្ណ',
    gender: 'Male',
    dob: '2014-10-10',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mr. Heng Bora',
    parentPhone: '+855 12 771 122',
    address: 'Salakanseng, Siem Reap',
    overallAttendanceRate: 94.0,
    stats: { present: 85, late: 3, absent: 2, excused: 1 }
  },
  {
    id: 's011',
    code: '011',
    name: 'Ros Thida',
    nameKhmer: 'រស់ ធីតា',
    gender: 'Female',
    dob: '2014-08-19',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mrs. Ros Kanha',
    parentPhone: '+855 98 443 322',
    address: 'Kork Chak, Siem Reap',
    overallAttendanceRate: 93.3,
    stats: { present: 84, late: 4, absent: 2, excused: 1 }
  },
  {
    id: 's012',
    code: '012',
    name: 'Ouk Chenda',
    nameKhmer: 'អ៊ុក ចិន្តា',
    gender: 'Female',
    dob: '2014-12-03',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: 'Mr. Ouk Vibol',
    parentPhone: '+855 70 882 211',
    address: 'Wat Damnak, Siem Reap',
    overallAttendanceRate: 98.0,
    stats: { present: 89, late: 1, absent: 1, excused: 0 }
  },
  // Adding more students to complete the 32 students of Grade 5A
  {
    id: 's013', code: '013', name: 'Chhem Virak', nameKhmer: 'ឆែម វីរៈ', gender: 'Male', dob: '2014-03-11',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Chhem Ratana', parentPhone: '+855 12 445 566', address: 'Siem Reap',
    overallAttendanceRate: 95.5, stats: { present: 86, late: 2, absent: 1, excused: 2 }
  },
  {
    id: 's014', code: '014', name: 'Ly Sovanna', nameKhmer: 'លី សុវណ្ណា', gender: 'Female', dob: '2014-01-09',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Ly Sophorn', parentPhone: '+855 16 778 899', address: 'Siem Reap',
    overallAttendanceRate: 96.7, stats: { present: 87, late: 1, absent: 1, excused: 2 }
  },
  {
    id: 's015', code: '015', name: 'Meas Vanny', nameKhmer: 'មាស វ៉ាន់នី', gender: 'Female', dob: '2014-04-05',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Meas Kunthea', parentPhone: '+855 89 223 311', address: 'Siem Reap',
    overallAttendanceRate: 90.0, stats: { present: 81, late: 4, absent: 3, excused: 3 }
  },
  {
    id: 's016', code: '016', name: 'Nget Samnang', nameKhmer: 'ង៉ែត សំណាង', gender: 'Male', dob: '2014-07-29',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Nget Kosal', parentPhone: '+855 11 889 922', address: 'Siem Reap',
    overallAttendanceRate: 94.4, stats: { present: 85, late: 3, absent: 2, excused: 1 }
  },
  {
    id: 's017', code: '017', name: 'Pen Sreyneang', nameKhmer: 'ប៉ែន ស្រីនាង', gender: 'Female', dob: '2014-09-14',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Pen Dany', parentPhone: '+855 92 334 477', address: 'Siem Reap',
    overallAttendanceRate: 92.2, stats: { present: 83, late: 4, absent: 2, excused: 2 }
  },
  {
    id: 's018', code: '018', name: 'Rith Sothy', nameKhmer: 'រិទ្ធ សុធី', gender: 'Male', dob: '2014-05-19',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Rith Socheat', parentPhone: '+855 17 556 611', address: 'Siem Reap',
    overallAttendanceRate: 91.1, stats: { present: 82, late: 5, absent: 2, excused: 2 }
  },
  {
    id: 's019', code: '019', name: 'Samath Chantha', nameKhmer: 'សាម៉ាត ចន្ថា', gender: 'Female', dob: '2014-10-25',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Samath Sary', parentPhone: '+855 78 991 100', address: 'Siem Reap',
    overallAttendanceRate: 97.8, stats: { present: 88, late: 2, absent: 0, excused: 1 }
  },
  {
    id: 's020', code: '020', name: 'Tep Narith', nameKhmer: 'ទេព ណារិទ្ធ', gender: 'Male', dob: '2014-02-28',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Tep Borin', parentPhone: '+855 93 114 422', address: 'Siem Reap',
    overallAttendanceRate: 93.3, stats: { present: 84, late: 3, absent: 3, excused: 1 }
  },
  {
    id: 's021', code: '021', name: 'Un Phalla', nameKhmer: 'អ៊ុន ផល្លា', gender: 'Male', dob: '2014-06-30',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Un Sokha', parentPhone: '+855 12 338 844', address: 'Siem Reap',
    overallAttendanceRate: 95.6, stats: { present: 86, late: 2, absent: 1, excused: 2 }
  },
  {
    id: 's022', code: '022', name: 'Vannak Kolap', nameKhmer: 'វណ្ណាក់ កុលាប', gender: 'Female', dob: '2014-08-11',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Vannak Sophea', parentPhone: '+855 88 772 299', address: 'Siem Reap',
    overallAttendanceRate: 98.9, stats: { present: 89, late: 1, absent: 0, excused: 1 }
  },
  {
    id: 's023', code: '023', name: 'Yin Rasmey', nameKhmer: 'យិន រស្មី', gender: 'Female', dob: '2014-11-04',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Yin Chhay', parentPhone: '+855 95 661 144', address: 'Siem Reap',
    overallAttendanceRate: 94.4, stats: { present: 85, late: 3, absent: 1, excused: 2 }
  },
  {
    id: 's024', code: '024', name: 'Chorn Makara', nameKhmer: 'ចន មករា', gender: 'Male', dob: '2014-01-01',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Chorn Linda', parentPhone: '+855 70 551 188', address: 'Siem Reap',
    overallAttendanceRate: 89.0, stats: { present: 80, late: 4, absent: 4, excused: 3 }
  },
  {
    id: 's025', code: '025', name: 'Din Kalyan', nameKhmer: 'ឌីន កល្យាណ', gender: 'Female', dob: '2014-03-17',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Din Serey', parentPhone: '+855 16 339 900', address: 'Siem Reap',
    overallAttendanceRate: 96.7, stats: { present: 87, late: 2, absent: 1, excused: 1 }
  },
  {
    id: 's026', code: '026', name: 'Eam Sovath', nameKhmer: 'អ៊ាម សុវត្ថិ', gender: 'Male', dob: '2014-07-12',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Eam Samet', parentPhone: '+855 12 660 099', address: 'Siem Reap',
    overallAttendanceRate: 92.2, stats: { present: 83, late: 4, absent: 2, excused: 2 }
  },
  {
    id: 's027', code: '027', name: 'Hun Channary', nameKhmer: 'ហ៊ុន ច័ន្ទណារី', gender: 'Female', dob: '2014-09-21',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Hun Vouchleng', parentPhone: '+855 97 448 833', address: 'Siem Reap',
    overallAttendanceRate: 97.8, stats: { present: 88, late: 1, absent: 1, excused: 1 }
  },
  {
    id: 's028', code: '028', name: 'Im Rotana', nameKhmer: 'អុឹម រតនា', gender: 'Male', dob: '2014-04-26',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Im Vuthy', parentPhone: '+855 89 550 011', address: 'Siem Reap',
    overallAttendanceRate: 93.3, stats: { present: 84, late: 3, absent: 2, excused: 2 }
  },
  {
    id: 's029', code: '029', name: 'Kong Sopheara', nameKhmer: 'គង់ សុភារ៉ា', gender: 'Female', dob: '2014-05-31',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Kong Mom', parentPhone: '+855 11 229 977', address: 'Siem Reap',
    overallAttendanceRate: 95.6, stats: { present: 86, late: 2, absent: 1, excused: 2 }
  },
  {
    id: 's030', code: '030', name: 'Mom Pheakdey', nameKhmer: 'ម៉ម ភក្តី', gender: 'Male', dob: '2014-12-19',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Mom Kimlong', parentPhone: '+855 78 440 055', address: 'Siem Reap',
    overallAttendanceRate: 94.4, stats: { present: 85, late: 3, absent: 1, excused: 2 }
  },
  {
    id: 's031', code: '031', name: 'Nuon Sinat', nameKhmer: 'នួន ស៊ីណាត', gender: 'Female', dob: '2014-02-08',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mrs. Nuon Sarun', parentPhone: '+855 93 771 188', address: 'Siem Reap',
    overallAttendanceRate: 96.7, stats: { present: 87, late: 1, absent: 1, excused: 2 }
  },
  {
    id: 's032', code: '032', name: 'Phon Theara', nameKhmer: 'ផុន ធារ៉ា', gender: 'Male', dob: '2014-10-02',
    classId: 'c1', className: 'Grade 5A', parentName: 'Mr. Phon Sophan', parentPhone: '+855 15 882 233', address: 'Siem Reap',
    overallAttendanceRate: 90.0, stats: { present: 81, late: 4, absent: 3, excused: 3 }
  }
];

export const INITIAL_HISTORY_SUMMARIES: AttendanceHistorySummary[] = [
  {
    id: 'h-1',
    date: '20 Sep 2026',
    className: 'Grade 5A',
    subject: 'English',
    teacher: 'Mr. Dara',
    total: 32,
    present: 28,
    late: 2,
    absent: 1,
    excused: 1,
    rate: 94.5,
    status: 'Completed'
  },
  {
    id: 'h-2',
    date: '19 Sep 2026',
    className: 'Grade 6A',
    subject: 'Computer',
    teacher: 'Ms. Sophea',
    total: 28,
    present: 27,
    late: 1,
    absent: 0,
    excused: 0,
    rate: 96.4,
    status: 'Completed'
  },
  {
    id: 'h-3',
    date: '19 Sep 2026',
    className: 'Grade 5B',
    subject: 'Mathematics',
    teacher: 'Mr. Vichea',
    total: 30,
    present: 29,
    late: 0,
    absent: 1,
    excused: 0,
    rate: 96.7,
    status: 'Completed'
  },
  {
    id: 'h-4',
    date: '18 Sep 2026',
    className: 'Grade 5A',
    subject: 'Science',
    teacher: 'Mr. Dara',
    total: 32,
    present: 26,
    late: 4,
    absent: 2,
    excused: 0,
    rate: 87.5,
    status: 'Completed'
  },
  {
    id: 'h-5',
    date: '17 Sep 2026',
    className: 'Grade 6B',
    subject: 'Geography',
    teacher: 'Mr. Dara',
    total: 30,
    present: 28,
    late: 1,
    absent: 1,
    excused: 0,
    rate: 93.3,
    status: 'Completed'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Attendance Recorded',
    titleKhmer: 'បានកត់ត្រាវត្តមាន',
    message: 'Grade 5A English attendance has been saved by Mr. Dara (28 Present, 2 Late, 1 Absent, 1 Excused).',
    messageKhmer: 'វត្តមានថ្នាក់ 5A មុខវិជ្ជាភាសាអង់គ្លេសត្រូវបានរក្សាទុកដោយលោកគ្រូ តារា។',
    time: '10 mins ago',
    type: 'attendance',
    read: false,
    targetRole: 'all'
  },
  {
    id: 'notif-2',
    title: 'Student Absence Notice',
    titleKhmer: 'ដំណឹងអវត្តមានសិស្ស',
    message: 'Lim Rina was marked absent today in Grade 5A English. Automated SMS sent to parent.',
    messageKhmer: 'សិស្ស លីម រីណា ត្រូវបានកត់ត្រាថាអវត្តមានថ្ងៃនេះ ក្នុងថ្នាក់ 5A។',
    time: '25 mins ago',
    type: 'absence',
    read: false,
    targetRole: 'parent'
  },
  {
    id: 'notif-3',
    title: 'Grade 5A Attendance Pending',
    titleKhmer: 'វត្តមានថ្នាក់ 5A មិនទាន់ស្រង់',
    message: 'Morning session attendance is pending submission. Please submit before 09:30 AM.',
    messageKhmer: 'ការស្រង់វត្តមានពេលព្រឹកមិនទាន់បានដាក់ស្នើទេ។ សូមស្រង់មុនម៉ោង 9:30 ព្រឹក។',
    time: '1 hour ago',
    type: 'alert',
    read: true,
    targetRole: 'teacher'
  },
  {
    id: 'notif-4',
    title: 'Monthly Attendance Report Ready',
    titleKhmer: 'របាយការណ៍វត្តមានប្រចាំខែបានរួចរាល់',
    message: 'September 2026 attendance report compiled. School average: 89.4%.',
    messageKhmer: 'របាយការណ៍វត្តមានខែកញ្ញា ២០២៦ ត្រូវបានចងក្រងរួចរាល់។ មធ្យមភាគសាលា៖ ៨៩.៤%។',
    time: 'Yesterday',
    type: 'announcement',
    read: true,
    targetRole: 'admin'
  }
];
