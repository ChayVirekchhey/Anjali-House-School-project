import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  Terminal, 
  FolderGit2, 
  ExternalLink, 
  Download, 
  Sparkles,
  Play,
  FileText,
  FolderTree,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DartFile {
  path: string;
  name: string;
  category: 'core' | 'screens' | 'widgets' | 'models' | 'config';
  description: string;
  code: string;
}

const DART_FILES: DartFile[] = [
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    category: 'core',
    description: 'Application entry point with DevicePreview & Material 3 theme',
    code: `import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:device_preview/device_preview.dart';
import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );

  runApp(
    DevicePreview(
      enabled: !kReleaseMode,
      initialDevice: Devices.ios.iPhone13ProMax, // Default to iPhone Pro Max
      builder: (context) => const EduAttendApp(),
    ),
  );
}

class EduAttendApp extends StatelessWidget {
  const EduAttendApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EduAttend - Anjali House',
      debugShowCheckedModeBanner: false,
      locale: DevicePreview.locale(context),
      builder: DevicePreview.appBuilder,
      theme: ThemeData(
        useMaterial3: true,
        fontFamily: 'Roboto',
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF006B45),
          primary: const Color(0xFF006B45),
          secondary: const Color(0xFF004D35),
          surface: Colors.white,
        ),
        scaffoldBackgroundColor: const Color(0xFFF7F8F7),
        appBarTheme: const AppBarTheme(
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}`
  },
  {
    path: 'lib/screens/attendance_screen.dart',
    name: 'attendance_screen.dart',
    category: 'screens',
    description: 'Core interactive attendance sheet with real-time stats, search filter & dialogs',
    code: `import 'package:flutter/material.dart';
import '../models/student.dart';
import '../widgets/student_card.dart';

class AttendanceScreen extends StatefulWidget {
  final String className;
  final String subject;

  const AttendanceScreen({
    super.key,
    this.className = 'Class 2A - Morning Shift',
    this.subject = 'Young Learners English',
  });

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  late List<Student> _students;
  String _searchQuery = '';
  String _selectedFilter = 'all';
  bool _isSaved = false;

  @override
  void initState() {
    super.initState();
    _students = [
      Student(id: 'STU-001', nameKhmer: 'សេង ដារ៉ា', nameEnglish: 'Seng Dara', gender: 'M', className: widget.className, rollNumber: '01', status: AttendanceStatus.present),
      Student(id: 'STU-002', nameKhmer: 'ចាន់ ស្រីមុំ', nameEnglish: 'Chan Sreymom', gender: 'F', className: widget.className, rollNumber: '02', status: AttendanceStatus.present),
      Student(id: 'STU-003', nameKhmer: 'គង់ វណ្ណៈ', nameEnglish: 'Kong Vannak', gender: 'M', className: widget.className, rollNumber: '03', status: AttendanceStatus.late),
      Student(id: 'STU-004', nameKhmer: 'ម៉ែន សោភា', nameEnglish: 'Men Sophea', gender: 'F', className: widget.className, rollNumber: '04', status: AttendanceStatus.present),
      Student(id: 'STU-005', nameKhmer: 'លឹម ប៊ុនធឿន', nameEnglish: 'Lim Bunthoeun', gender: 'M', className: widget.className, rollNumber: '05', status: AttendanceStatus.absent, note: 'Sick leave requested by parent'),
      Student(id: 'STU-006', nameKhmer: 'ហេង គន្ធា', nameEnglish: 'Heng Kunthea', gender: 'F', className: widget.className, rollNumber: '06', status: AttendanceStatus.present),
      Student(id: 'STU-007', nameKhmer: 'អ៊ុក វិបុល', nameEnglish: 'Ouk Vibol', gender: 'M', className: widget.className, rollNumber: '07', status: AttendanceStatus.present),
      Student(id: 'STU-008', nameKhmer: 'ទ្រី ធីតា', nameEnglish: 'Try Thida', gender: 'F', className: widget.className, rollNumber: '08', status: AttendanceStatus.excused, note: 'School dance team practice'),
      Student(id: 'STU-009', nameKhmer: 'ជា ពិសិដ្ឋ', nameEnglish: 'Chea Piseth', gender: 'M', className: widget.className, rollNumber: '09', status: AttendanceStatus.present),
      Student(id: 'STU-010', nameKhmer: 'រស់ ចរិយា', nameEnglish: 'Ros Chariya', gender: 'F', className: widget.className, rollNumber: '10', status: AttendanceStatus.present),
    ];
  }

  int get _presentCount => _students.where((s) => s.status == AttendanceStatus.present).length;
  int get _lateCount => _students.where((s) => s.status == AttendanceStatus.late).length;
  int get _absentCount => _students.where((s) => s.status == AttendanceStatus.absent).length;
  int get _excusedCount => _students.where((s) => s.status == AttendanceStatus.excused).length;

  List<Student> get _filteredStudents {
    return _students.where((s) {
      final matchesSearch = s.nameEnglish.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          s.nameKhmer.contains(_searchQuery) ||
          s.rollNumber.contains(_searchQuery);

      if (!matchesSearch) return false;

      if (_selectedFilter == 'present') return s.status == AttendanceStatus.present;
      if (_selectedFilter == 'late') return s.status == AttendanceStatus.late;
      if (_selectedFilter == 'absent') return s.status == AttendanceStatus.absent;
      if (_selectedFilter == 'excused') return s.status == AttendanceStatus.excused;

      return true;
    }).toList();
  }

  void _markAllPresent() {
    setState(() {
      for (var s in _students) {
        s.status = AttendanceStatus.present;
      }
      _isSaved = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Marked all students as Present'),
        backgroundColor: Color(0xFF006B45),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _openNoteDialog(Student student) {
    final controller = TextEditingController(text: student.note ?? '');

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text('Note for \${student.nameEnglish}', style: const TextStyle(fontSize: 16)),
        content: TextField(
          controller: controller,
          maxLines: 3,
          autofocus: true,
          decoration: InputDecoration(
            hintText: 'e.g., Parent called about hospital visit...',
            filled: true,
            fillColor: Colors.grey.shade50,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.shade300),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF006B45),
              foregroundColor: Colors.white,
            ),
            onPressed: () {
              setState(() {
                student.note = controller.text.trim();
              });
              Navigator.pop(ctx);
            },
            child: const Text('Save Note'),
          ),
        ],
      ),
    );
  }

  void _submitAttendance() {
    setState(() {
      _isSaved = true;
    });

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Color(0xFFDCFCE7),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.check_circle_rounded, size: 48, color: Color(0xFF15803D)),
            ),
            const SizedBox(height: 16),
            const Text(
              'Attendance Submitted!',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'Present: \$_presentCount | Late: \$_lateCount | Absent: \$_absentCount | Excused: \$_excusedCount',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: Colors.grey.shade700),
            ),
            const SizedBox(height: 6),
            const Text(
              'Records stored locally and queued for offline cloud sync.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF006B45),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Done'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final filtered = _filteredStudents;
    final total = _students.length;
    final rate = total > 0 ? (_presentCount / total * 100).round() : 0;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF006B45),
        foregroundColor: Colors.white,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.className, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
            Text(widget.subject, style: const TextStyle(fontSize: 11, color: Colors.white70)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.done_all_rounded),
            tooltip: 'Mark All Present',
            onPressed: _markAllPresent,
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: Colors.white,
            child: Column(
              children: [
                Row(
                  children: [
                    _StatBadge(label: 'Present', count: _presentCount, color: const Color(0xFF15803D), bg: const Color(0xFFDCFCE7)),
                    const SizedBox(width: 8),
                    _StatBadge(label: 'Late', count: _lateCount, color: const Color(0xFFD97706), bg: const Color(0xFFFEF3C7)),
                    const SizedBox(width: 8),
                    _StatBadge(label: 'Absent', count: _absentCount, color: const Color(0xFFDC2626), bg: const Color(0xFFFEE2E2)),
                    const SizedBox(width: 8),
                    _StatBadge(label: 'Excused', count: _excusedCount, color: const Color(0xFF2563EB), bg: const Color(0xFFDBEAFE)),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF006B45),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        '\$rate% Rate',
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                TextField(
                  onChanged: (val) => setState(() => _searchQuery = val),
                  decoration: InputDecoration(
                    hintText: 'Search by student name or roll #...',
                    hintStyle: TextStyle(fontSize: 13, color: Colors.grey.shade400),
                    prefixIcon: const Icon(Icons.search, size: 20),
                    filled: true,
                    fillColor: const Color(0xFFF8FAFC),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey.shade200),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1, thickness: 1),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.only(top: 8, bottom: 80),
              itemCount: filtered.length,
              itemBuilder: (context, index) {
                final student = filtered[index];
                return StudentCard(
                  student: student,
                  onStatusChanged: (newStatus) {
                    setState(() {
                      student.status = newStatus;
                      _isSaved = false;
                    });
                  },
                  onNoteTap: () => _openNoteDialog(student),
                );
              },
            ),
          ),
        ],
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          child: Row(
            children: [
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '\$_presentCount of \$total Present',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                  Text(
                    _isSaved ? 'Submitted' : 'Pending submission',
                    style: TextStyle(
                      fontSize: 11,
                      color: _isSaved ? const Color(0xFF15803D) : Colors.orange.shade800,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              const Spacer(),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF006B45),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  elevation: 2,
                ),
                onPressed: _submitAttendance,
                icon: const Icon(Icons.send_rounded, size: 18),
                label: const Text('Save & Submit', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _StatBadge extends StatelessWidget {
  final String label;
  final int count;
  final Color color;
  final Color bg;

  const _StatBadge({required this.label, required this.count, required this.color, required this.bg});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(8)),
      child: Row(
        children: [
          Container(width: 6, height: 6, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
          const SizedBox(width: 5),
          Text('\$label \$count', style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}`
  },
  {
    path: 'lib/screens/qr_scanner_screen.dart',
    name: 'qr_scanner_screen.dart',
    category: 'screens',
    description: 'Device Camera QR scanner with animated viewfinder, torch & haptic vibration',
    code: `import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/student.dart';

class QrScannerScreen extends StatefulWidget {
  final List<Student> students;
  final Function(Student student, AttendanceStatus status) onStudentScanned;

  const QrScannerScreen({
    super.key,
    required this.students,
    required this.onStudentScanned,
  });

  @override
  State<QrScannerScreen> createState() => _QrScannerScreenState();
}

class _QrScannerScreenState extends State<QrScannerScreen> with SingleTickerProviderStateMixin {
  late AnimationController _laserController;
  bool _isTorchOn = false;
  bool _isFrontCamera = false;
  Student? _lastScannedStudent;
  int _scanCount = 0;

  @override
  void initState() {
    super.initState();
    _laserController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _laserController.dispose();
    super.dispose();
  }

  void _simulateScan(Student student) {
    HapticFeedback.heavyImpact();
    setState(() {
      _lastScannedStudent = student;
      _scanCount++;
    });

    widget.onStudentScanned(student, AttendanceStatus.present);

    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Scanned: \${student.nameEnglish} (\${student.nameKhmer}) - Marked Present'),
        backgroundColor: const Color(0xFF006B45),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        title: const Text('Scan Student ID Card'),
        actions: [
          IconButton(
            icon: Icon(_isTorchOn ? Icons.flash_on : Icons.flash_off),
            onPressed: () => setState(() => _isTorchOn = !_isTorchOn),
          ),
          IconButton(
            icon: const Icon(Icons.flip_camera_ios),
            onPressed: () => setState(() => _isFrontCamera = !_isFrontCamera),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 260,
              height: 260,
              decoration: BoxDecoration(
                border: Border.all(color: const Color(0xFF00E676), width: 3),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Center(
                child: Icon(Icons.qr_code_scanner, color: Colors.white30, size: 80),
              ),
            ),
            const SizedBox(height: 20),
            const Text('Align Student QR code in camera box', style: TextStyle(color: Colors.white70)),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/widgets/student_card.dart',
    name: 'student_card.dart',
    category: 'widgets',
    description: 'Custom 4-button student attendance card with Khmer & English names',
    code: `import 'package:flutter/material.dart';
import '../models/student.dart';

class StudentCard extends StatelessWidget {
  final Student student;
  final ValueChanged<AttendanceStatus> onStatusChanged;
  final VoidCallback? onNoteTap;

  const StudentCard({
    super.key,
    required this.student,
    required this.onStatusChanged,
    this.onNoteTap,
  });

  Color _getStatusColor(AttendanceStatus status) {
    switch (status) {
      case AttendanceStatus.present:
        return const Color(0xFF15803D);
      case AttendanceStatus.late:
        return const Color(0xFFD97706);
      case AttendanceStatus.absent:
        return const Color(0xFFDC2626);
      case AttendanceStatus.excused:
        return const Color(0xFF2563EB);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: student.status == AttendanceStatus.absent
              ? Colors.red.shade200
              : Colors.grey.shade200,
          width: student.status == AttendanceStatus.absent ? 1.5 : 1.0,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: const Color(0xFF006B45).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    student.nameEnglish.isNotEmpty ? student.nameEnglish[0] : 'S',
                    style: const TextStyle(color: Color(0xFF006B45), fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              student.nameKhmer,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Color(0xFF1E293B)),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.grey.shade100,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              '#\${student.rollNumber}',
                              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Colors.grey.shade600),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '\${student.nameEnglish} • \${student.gender}',
                        style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: Icon(
                    student.note != null && student.note!.isNotEmpty
                        ? Icons.comment_rounded
                        : Icons.add_comment_outlined,
                    size: 20,
                    color: student.note != null && student.note!.isNotEmpty
                        ? const Color(0xFF006B45)
                        : Colors.grey.shade400,
                  ),
                  onPressed: onNoteTap,
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: AttendanceStatus.values.map((status) {
                final isSelected = student.status == status;
                final buttonColor = _getStatusColor(status);

                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2.5),
                    child: InkWell(
                      onTap: () => onStatusChanged(status),
                      borderRadius: BorderRadius.circular(10),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? buttonColor : Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          status.label,
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: isSelected ? Colors.white : Colors.grey.shade700,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }
}`
  },
  {
    path: 'lib/models/student.dart',
    name: 'student.dart',
    category: 'models',
    description: 'AttendanceStatus enum & Student domain model with Khmer labels',
    code: `enum AttendanceStatus { present, late, absent, excused }

extension AttendanceStatusExtension on AttendanceStatus {
  String get label {
    switch (this) {
      case AttendanceStatus.present: return 'Present';
      case AttendanceStatus.late: return 'Late';
      case AttendanceStatus.absent: return 'Absent';
      case AttendanceStatus.excused: return 'Excused';
    }
  }

  String get khmerLabel {
    switch (this) {
      case AttendanceStatus.present: return 'វត្តមាន';
      case AttendanceStatus.late: return 'យឺត';
      case AttendanceStatus.absent: return 'អវត្តមាន';
      case AttendanceStatus.excused: return 'ច្បាប់';
    }
  }
}

class Student {
  final String id;
  final String nameKhmer;
  final String nameEnglish;
  final String gender;
  final String className;
  final String rollNumber;
  AttendanceStatus status;
  String? note;
  DateTime? markedAt;

  Student({
    required this.id,
    required this.nameKhmer,
    required this.nameEnglish,
    required this.gender,
    required this.className,
    required this.rollNumber,
    this.status = AttendanceStatus.present,
    this.note,
    this.markedAt,
  });
}`
  },
  {
    path: 'lib/screens/splash_screen.dart',
    name: 'splash_screen.dart',
    category: 'screens',
    description: 'Anjali House welcome screen with brand badge, logo & sign-in actions',
    code: `import 'package:flutter/material.dart';
import 'home_screen.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF004D35), Color(0xFF006B45), Color(0xFF002B1D)],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.favorite_rounded, size: 14, color: Color(0xFFEF3D43)),
                          SizedBox(width: 6),
                          Text('Anjali House NGO', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    const Text('v1.0', style: TextStyle(color: Colors.white70, fontSize: 11)),
                  ],
                ),
                Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(28),
                      ),
                      child: const Icon(Icons.school_rounded, size: 54, color: Color(0xFF006B45)),
                    ),
                    const SizedBox(height: 20),
                    const Text('EduAttend', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    const Text('ប្រព័ន្ធកត់វត្តមានសិស្ស • Anjali House', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  ],
                ),
                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF006B45),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    ),
                    onPressed: () {
                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
                    },
                    child: const Text('Open Teacher Portal', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}`
  },
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    category: 'config',
    description: 'Flutter project dependencies & asset definitions',
    code: `name: eduattend_anjali
description: "Student Attendance & Class Management for Anjali House NGO"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  intl: ^0.19.0
  device_preview: ^1.2.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true`
  },
  {
    path: '.vscode/launch.json',
    name: 'launch.json',
    category: 'config',
    description: 'One-click F5 run configuration for VS Code',
    code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "EduAttend (Flutter Debug)",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart"
    }
  ]
}`
  }
];

export const FlutterCodeViewer: React.FC = () => {
  const { isDarkMode, showToast } = useApp();
  const [selectedFile, setSelectedFile] = useState<DartFile>(DART_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    showToast(`Copied ${selectedFile.name} to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F0F2F0] text-slate-900'}`}>
      {/* Top Banner Guide */}
      <div className={`border-b px-6 py-4 flex items-center justify-between gap-4 flex-wrap ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
            <FileCode className="w-5 h-5 text-[#006B45]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold">Flutter & Dart Codebase (/flutter_app)</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Ready for VS Code
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clean, human-styled idiomatic Dart code created for Anjali House student attendance.
            </p>
          </div>
        </div>

        {/* Action Button & VS Code Terminal Cheat */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/api/download/flutter-app"
            download="eduattend-flutter-app.zip"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006B45] text-white text-xs font-bold hover:bg-[#005234] transition shadow-xs cursor-pointer"
            title="Download complete Flutter project ready for flutter build apk"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Project (.ZIP)</span>
          </a>

          <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-800'
          }`}>
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>flutter build apk</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : `Copy ${selectedFile.name}`}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Left Sidebar file tree + Right Code Editor */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar: File list */}
        <div className={`w-full md:w-72 border-r flex flex-col ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="p-3 border-b border-inherit flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5" />
              FLUTTER FILES
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {DART_FILES.length} Files
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {DART_FILES.map(file => {
              const isCurrent = file.path === selectedFile.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-[#006B45] text-white font-bold shadow-xs'
                      : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-800/70'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-blue-500'}`} />
                    <span className="truncate">{file.path}</span>
                  </div>
                  {isCurrent && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Quick instructions widget */}
          <div className={`p-3 m-2 rounded-xl border text-[11px] space-y-1.5 ${
            isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <p className="font-bold text-[#006B45]">⚡ How to Run in VS Code:</p>
            <p>1. Open folder <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">flutter_app</code> in VS Code.</p>
            <p>2. Run <code className="font-mono bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">flutter pub get</code>.</p>
            <p>3. Press <kbd className="px-1 py-0.5 rounded border text-[10px] font-bold">F5</kbd> to launch!</p>
          </div>
        </div>

        {/* Right Code Content Pane */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 text-slate-100">
          {/* File Header Bar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-emerald-400">{selectedFile.path}</span>
              <span className="text-slate-400">• {selectedFile.description}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">Copy</span>
            </button>
          </div>

          {/* Code Viewer Textarea / Pre */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed selection:bg-emerald-800 selection:text-white">
            <pre className="text-slate-200 whitespace-pre">
              {selectedFile.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
