import 'student.dart';

class SchoolClass {
  final String id;
  final String name;
  final String subject;
  final String grade;
  final String room;
  final String teacherName;
  final String shift;
  final int totalStudents;

  const SchoolClass({
    required this.id,
    required this.name,
    required this.subject,
    required this.grade,
    required this.room,
    required this.teacherName,
    required this.shift,
    required this.totalStudents,
  });
}

class ClassSession {
  final String id;
  final String classId;
  final String className;
  final String subject;
  final String time;
  final String room;
  final bool isCompleted;
  final int totalCount;
  final int presentCount;

  ClassSession({
    required this.id,
    required this.classId,
    required this.className,
    required this.subject,
    required this.time,
    required this.room,
    this.isCompleted = false,
    required this.totalCount,
    required this.presentCount,
  });
}
