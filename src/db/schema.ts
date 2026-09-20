import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  role: text('role').default('teacher'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  studentId: text('student_id').notNull().unique(),
  nameKhmer: text('name_khmer').notNull(),
  nameEnglish: text('name_english').notNull(),
  gender: text('gender').notNull(),
  className: text('class_name').notNull(),
  rollNumber: text('roll_number').notNull(),
  guardianPhone: text('guardian_phone'),
  allergies: text('allergies'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const attendanceRecords = pgTable('attendance_records', {
  id: serial('id').primaryKey(),
  studentId: text('student_id')
    .references(() => students.studentId)
    .notNull(),
  date: text('date').notNull(), // YYYY-MM-DD
  status: text('status').notNull(), // 'present', 'late', 'absent', 'excused'
  hadBreakfast: boolean('had_breakfast').default(false),
  hadLunch: boolean('had_lunch').default(false),
  note: text('note'),
  markedByUid: text('marked_by_uid'),
  markedAt: timestamp('marked_at').defaultNow(),
});
