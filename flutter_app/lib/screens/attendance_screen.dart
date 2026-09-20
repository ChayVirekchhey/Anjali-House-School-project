import 'package:flutter/material.dart';
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
  String _selectedFilter = 'all'; // all, present, late, absent, excused
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
        title: Text('Note for ${student.nameEnglish}', style: const TextStyle(fontSize: 16)),
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
              'Present: $_presentCount | Late: $_lateCount | Absent: $_absentCount | Excused: $_excusedCount',
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
          // Stat Summary Header
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
                        '$rate% Rate',
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                // Search bar
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
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(color: Colors.grey.shade200),
                    ),
                  ),
                ),
              ],
            ),
          ),

          const Divider(height: 1, thickness: 1),

          // Student Card List
          Expanded(
            child: filtered.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.search_off_rounded, size: 48, color: Colors.grey.shade400),
                        const SizedBox(height: 12),
                        Text('No students match "$_searchQuery"', style: TextStyle(color: Colors.grey.shade600)),
                      ],
                    ),
                  )
                : ListView.builder(
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

      // Bottom Submit Floating Bar
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
                    '$_presentCount of $total Present',
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

  const _StatBadge({
    required this.label,
    required this.count,
    required this.color,
    required this.bg,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Container(width: 6, height: 6, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
          const SizedBox(width: 5),
          Text('$label $count', style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
