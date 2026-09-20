import 'package:flutter/material.dart';
import '../models/attendance_session.dart';
import 'attendance_screen.dart';

class ClassesScreen extends StatelessWidget {
  const ClassesScreen({super.key});

  final List<SchoolClass> _classes = const [
    SchoolClass(
      id: 'CLS-001',
      name: 'Young Learners 2A',
      subject: 'English & Phonics',
      grade: 'Primary Level 2',
      room: 'Classroom 101',
      teacherName: 'Teacher Sreyneang',
      shift: 'Morning (08:00 - 11:00)',
      totalStudents: 24,
    ),
    SchoolClass(
      id: 'CLS-002',
      name: 'Creative Arts & Music 3B',
      subject: 'Arts & Traditional Dance',
      grade: 'Primary Level 3',
      room: 'Art Studio B',
      teacherName: 'Teacher Sreyneang',
      shift: 'Afternoon (13:30 - 15:30)',
      totalStudents: 20,
    ),
    SchoolClass(
      id: 'CLS-003',
      name: 'Computer & Digital Skills 4A',
      subject: 'Digital Literacy',
      grade: 'Level 4',
      room: 'Computer Lab 1',
      teacherName: 'Teacher Sreyneang',
      shift: 'Morning (10:00 - 11:30)',
      totalStudents: 18,
    ),
    SchoolClass(
      id: 'CLS-004',
      name: 'Life Skills & Hygiene 1A',
      subject: 'Health & Nutrition',
      grade: 'Level 1',
      room: 'Community Hall',
      teacherName: 'Teacher Sreyneang',
      shift: 'Afternoon (14:00 - 15:00)',
      totalStudents: 26,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF006B45),
        foregroundColor: Colors.white,
        title: const Text('My Assigned Classes', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(14),
        itemCount: _classes.length,
        itemBuilder: (context, index) {
          final c = _classes[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
              side: BorderSide(color: Colors.grey.shade200),
            ),
            elevation: 0.5,
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFF006B45).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          c.grade,
                          style: const TextStyle(color: Color(0xFF006B45), fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                      Text(
                        '${c.totalStudents} Students',
                        style: TextStyle(color: Colors.grey.shade600, fontSize: 12, fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(c.name, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 2),
                  Text(c.subject, style: TextStyle(color: Colors.grey.shade700, fontSize: 13)),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Icon(Icons.schedule_rounded, size: 14, color: Colors.grey.shade600),
                      const SizedBox(width: 4),
                      Text(c.shift, style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
                      const SizedBox(width: 12),
                      Icon(Icons.room_rounded, size: 14, color: Colors.grey.shade600),
                      const SizedBox(width: 4),
                      Text(c.room, style: TextStyle(fontSize: 12, color: Colors.grey.shade600)),
                    ],
                  ),
                  const SizedBox(height: 14),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF006B45),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => AttendanceScreen(className: c.name, subject: c.subject),
                          ),
                        );
                      },
                      icon: const Icon(Icons.playlist_add_check_rounded, size: 18),
                      label: const Text('Open Attendance Sheet'),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
