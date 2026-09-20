import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/student.dart';
import '../widgets/student_card.dart';
import 'qr_scanner_screen.dart';

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
  bool _isSaved = true;
  bool _isOffline = false;
  int _pendingSyncCount = 0;
  bool _isSyncing = false;

  @override
  void initState() {
    super.initState();
    _students = [
      Student(id: 'STU-001', nameKhmer: 'សេង ដារ៉ា', nameEnglish: 'Seng Dara', gender: 'M', className: widget.className, rollNumber: '01', status: AttendanceStatus.present, allergies: 'No known allergies', guardianPhone: '+855 12 901 234'),
      Student(id: 'STU-002', nameKhmer: 'ចាន់ ស្រីមុំ', nameEnglish: 'Chan Sreymom', gender: 'F', className: widget.className, rollNumber: '02', status: AttendanceStatus.present, allergies: 'Peanut allergy', guardianPhone: '+855 98 456 789'),
      Student(id: 'STU-003', nameKhmer: 'គង់ វណ្ណៈ', nameEnglish: 'Kong Vannak', gender: 'M', className: widget.className, rollNumber: '03', status: AttendanceStatus.late, allergies: 'Asthma inhaler required', guardianPhone: '+855 10 333 222'),
      Student(id: 'STU-004', nameKhmer: 'ម៉ែន សោភា', nameEnglish: 'Men Sophea', gender: 'F', className: widget.className, rollNumber: '04', status: AttendanceStatus.present, allergies: 'None', guardianPhone: '+855 77 888 999'),
      Student(id: 'STU-005', nameKhmer: 'លឹម ប៊ុនធឿន', nameEnglish: 'Lim Bunthoeun', gender: 'M', className: widget.className, rollNumber: '05', status: AttendanceStatus.absent, note: 'Sick leave requested by parent', guardianPhone: '+855 11 222 333'),
      Student(id: 'STU-006', nameKhmer: 'ហេង គន្ធា', nameEnglish: 'Heng Kunthea', gender: 'F', className: widget.className, rollNumber: '06', status: AttendanceStatus.present, allergies: 'None', guardianPhone: '+855 15 678 910'),
      Student(id: 'STU-007', nameKhmer: 'អ៊ុក វិបុល', nameEnglish: 'Ouk Vibol', gender: 'M', className: widget.className, rollNumber: '07', status: AttendanceStatus.present, allergies: 'Lactose intolerance', guardianPhone: '+855 92 111 444'),
      Student(id: 'STU-008', nameKhmer: 'ទ្រី ធីតា', nameEnglish: 'Try Thida', gender: 'F', className: widget.className, rollNumber: '08', status: AttendanceStatus.excused, note: 'School dance team practice', guardianPhone: '+855 89 555 777'),
      Student(id: 'STU-009', nameKhmer: 'ជា ពិសិដ្ឋ', nameEnglish: 'Chea Piseth', gender: 'M', className: widget.className, rollNumber: '09', status: AttendanceStatus.present, allergies: 'None', guardianPhone: '+855 17 666 888'),
      Student(id: 'STU-010', nameKhmer: 'រស់ ចរិយា', nameEnglish: 'Ros Chariya', gender: 'F', className: widget.className, rollNumber: '10', status: AttendanceStatus.present, allergies: 'None', guardianPhone: '+855 70 999 111'),
    ];
  }

  int get _presentCount => _students.where((s) => s.status == AttendanceStatus.present).length;
  int get _lateCount => _students.where((s) => s.status == AttendanceStatus.late).length;
  int get _absentCount => _students.where((s) => s.status == AttendanceStatus.absent).length;
  int get _excusedCount => _students.where((s) => s.status == AttendanceStatus.excused).length;
  int get _breakfastCount => _students.where((s) => s.hadBreakfast).length;
  int get _lunchCount => _students.where((s) => s.hadLunch).length;

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
    HapticFeedback.mediumImpact();
    setState(() {
      for (var s in _students) {
        s.status = AttendanceStatus.present;
      }
      _isSaved = false;
      if (_isOffline) _pendingSyncCount += _students.length;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Marked all students as Present (វត្តមានទាំងអស់)'),
        backgroundColor: Color(0xFF006B45),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _syncOfflineRecords() async {
    HapticFeedback.mediumImpact();
    setState(() => _isSyncing = true);

    await Future.delayed(const Duration(seconds: 1));

    if (mounted) {
      HapticFeedback.heavyImpact();
      setState(() {
        _isSyncing = false;
        _pendingSyncCount = 0;
        _isSaved = true;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Row(
            children: [
              Icon(Icons.cloud_done, color: Colors.white),
              SizedBox(width: 8),
              Text('Cloud Synced: All attendance & meal records verified'),
            ],
          ),
          backgroundColor: Color(0xFF006B45),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  void _openQrScanner() {
    HapticFeedback.selectionClick();
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => QrScannerScreen(
          students: _students,
          onStudentScanned: (student, status) {
            setState(() {
              student.status = status;
              _isSaved = false;
              if (_isOffline) _pendingSyncCount++;
            });
          },
        ),
      ),
    );
  }

  void _exportDeviceReport() {
    HapticFeedback.selectionClick();
    final rate = ((_presentCount + _lateCount) / _students.length * 100).toStringAsFixed(1);
    final summaryText = 'Anjali House Attendance Report\n'
        'Class: ${widget.className}\n'
        'Date: ${DateTime.now().toLocal().toString().split(" ")[0]}\n'
        'Present: $_presentCount | Late: $_lateCount | Absent: $_absentCount | Excused: $_excusedCount\n'
        'Attendance Rate: $rate%\n'
        'Meals Served: Breakfast: $_breakfastCount | Lunch: $_lunchCount';

    Clipboard.setData(ClipboardData(text: summaryText));

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.share, color: Color(0xFF006B45)),
            SizedBox(width: 8),
            Text('Device Share & Export', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Copied attendance summary to device clipboard:', style: TextStyle(fontSize: 12, color: Colors.grey)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(summaryText, style: const TextStyle(fontSize: 12, fontFamily: 'monospace')),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Close')),
          ElevatedButton.icon(
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Exported to device documents (CSV generated)'),
                  backgroundColor: Color(0xFF006B45),
                ),
              );
            },
            icon: const Icon(Icons.download, size: 16, color: Colors.white),
            label: const Text('Save CSV', style: TextStyle(color: Colors.white)),
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF006B45)),
          ),
        ],
      ),
    );
  }

  void _openNoteDialog(Student student) {
    final controller = TextEditingController(text: student.note ?? '');

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text('Note for ${student.nameEnglish}', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
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
            onPressed: () {
              HapticFeedback.lightImpact();
              setState(() {
                student.note = controller.text.trim();
                _isSaved = false;
              });
              Navigator.pop(ctx);
            },
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF006B45)),
            child: const Text('Save Note', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final attendanceRate = _students.isEmpty
        ? 0.0
        : ((_presentCount + _lateCount) / _students.length * 100);

    return Scaffold(
      backgroundColor: const Color(0xFFF7F8F7),
      appBar: AppBar(
        backgroundColor: const Color(0xFF006B45),
        foregroundColor: Colors.white,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.className, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text(widget.subject, style: const TextStyle(fontSize: 12, color: Colors.white70)),
          ],
        ),
        actions: [
          // Device Camera QR Scanner Action
          IconButton(
            icon: const Icon(Icons.qr_code_scanner),
            tooltip: 'Camera QR Scanner',
            onPressed: _openQrScanner,
          ),
          // Device Share / Export
          IconButton(
            icon: const Icon(Icons.share),
            tooltip: 'Export Report',
            onPressed: _exportDeviceReport,
          ),
          // Offline toggle
          IconButton(
            icon: Icon(_isOffline ? Icons.cloud_off : Icons.cloud_done, color: _isOffline ? Colors.amberAccent : Colors.white),
            tooltip: _isOffline ? 'Offline Mode (Local Storage)' : 'Online Mode',
            onPressed: () {
              HapticFeedback.selectionClick();
              setState(() => _isOffline = !_isOffline);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(_isOffline ? 'Switched to Offline Mode (Caching on Device)' : 'Connected to Online Sync'),
                  duration: const Duration(seconds: 1),
                ),
              );
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _openQrScanner,
        backgroundColor: const Color(0xFF006B45),
        icon: const Icon(Icons.photo_camera, color: Colors.white),
        label: const Text('Scan QR ID', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
      ),
      body: Column(
        children: [
          // Offline Banner
          if (_isOffline || _pendingSyncCount > 0)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              color: Colors.amber.shade100,
              child: Row(
                children: [
                  const Icon(Icons.wifi_off, size: 16, color: Colors.amber),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _isOffline
                          ? 'Offline Mode Active • $_pendingSyncCount changes stored locally'
                          : '$_pendingSyncCount records waiting to sync',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.amber.shade900),
                    ),
                  ),
                  if (_pendingSyncCount > 0)
                    TextButton.icon(
                      onPressed: _isSyncing ? null : _syncOfflineRecords,
                      icon: _isSyncing
                          ? const SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 2))
                          : const Icon(Icons.sync, size: 14),
                      label: Text(_isSyncing ? 'Syncing...' : 'Sync Now', style: const TextStyle(fontSize: 12)),
                    ),
                ],
              ),
            ),

          // Overview Dashboard Card
          Container(
            margin: const EdgeInsets.all(12),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade200),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2)),
              ],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('ATTENDANCE RATE', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey)),
                        Text('${attendanceRate.toStringAsFixed(0)}%', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFF006B45))),
                      ],
                    ),
                    Row(
                      children: [
                        _metricBadge('Present', _presentCount, const Color(0xFF15803D)),
                        const SizedBox(width: 6),
                        _metricBadge('Late', _lateCount, const Color(0xFFD97706)),
                        const SizedBox(width: 6),
                        _metricBadge('Absent', _absentCount, const Color(0xFFDC2626)),
                        const SizedBox(width: 6),
                        _metricBadge('Excused', _excusedCount, const Color(0xFF2563EB)),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                // NGO Meals Row
                Row(
                  children: [
                    const Icon(Icons.restaurant, size: 14, color: Color(0xFF006B45)),
                    const SizedBox(width: 6),
                    Text(
                      'NGO Meals: Breakfast: $_breakfastCount/10  |  Lunch: $_lunchCount/10',
                      style: TextStyle(fontSize: 12, color: Colors.grey.shade700, fontWeight: FontWeight.w600),
                    ),
                    const Spacer(),
                    TextButton(
                      onPressed: _markAllPresent,
                      child: const Text('Mark All Present', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF006B45))),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Search & Filters
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    onChanged: (val) => setState(() => _searchQuery = val),
                    decoration: InputDecoration(
                      hintText: 'Search Khmer, English, or #Roll...',
                      prefixIcon: const Icon(Icons.search, size: 18),
                      isDense: true,
                      contentPadding: const EdgeInsets.symmetric(vertical: 10),
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: Colors.grey.shade200)),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Filter chips
          SizedBox(
            height: 34,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 14),
              children: [
                _filterChip('all', 'All (${_students.length})'),
                const SizedBox(width: 6),
                _filterChip('present', 'Present ($_presentCount)'),
                const SizedBox(width: 6),
                _filterChip('late', 'Late ($_lateCount)'),
                const SizedBox(width: 6),
                _filterChip('absent', 'Absent ($_absentCount)'),
                const SizedBox(width: 6),
                _filterChip('excused', 'Excused ($_excusedCount)'),
              ],
            ),
          ),
          const SizedBox(height: 6),

          // Student List
          Expanded(
            child: ListView.builder(
              itemCount: _filteredStudents.length,
              padding: const EdgeInsets.only(bottom: 80),
              itemBuilder: (context, index) {
                final student = _filteredStudents[index];
                return StudentCard(
                  student: student,
                  onStatusChanged: (newStatus) {
                    setState(() {
                      student.status = newStatus;
                      student.markedAt = DateTime.now();
                      _isSaved = false;
                      if (_isOffline) _pendingSyncCount++;
                    });
                  },
                  onMealsChanged: () => setState(() => _isSaved = false),
                  onNoteTap: () => _openNoteDialog(student),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _metricBadge(String label, int count, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text(count.toString(), style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: color)),
          Text(label, style: TextStyle(fontSize: 9, color: color, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }

  Widget _filterChip(String id, String label) {
    final isSelected = _selectedFilter == id;
    return ChoiceChip(
      label: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSelected ? Colors.white : Colors.grey.shade700)),
      selected: isSelected,
      selectedColor: const Color(0xFF006B45),
      backgroundColor: Colors.white,
      onSelected: (_) {
        HapticFeedback.selectionClick();
        setState(() => _selectedFilter = id);
      },
    );
  }
}
