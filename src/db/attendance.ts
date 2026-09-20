import { db } from './index.ts';
import { students, attendanceRecords } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getAllStudents() {
  try {
    return await db.select().from(students);
  } catch (error) {
    console.error("Failed to fetch students from Cloud SQL:", error);
    throw new Error("Failed to fetch students", { cause: error });
  }
}

export async function getAttendanceByDate(date: string) {
  try {
    return await db.select().from(attendanceRecords).where(eq(attendanceRecords.date, date));
  } catch (error) {
    console.error("Failed to fetch attendance:", error);
    throw new Error("Failed to fetch attendance records", { cause: error });
  }
}

export async function saveAttendanceRecord(record: {
  studentId: string;
  date: string;
  status: string;
  hadBreakfast?: boolean;
  hadLunch?: boolean;
  note?: string;
  markedByUid?: string;
}) {
  try {
    return await db.insert(attendanceRecords).values(record).returning();
  } catch (error) {
    console.error("Failed to save attendance:", error);
    throw new Error("Failed to save attendance record", { cause: error });
  }
}
