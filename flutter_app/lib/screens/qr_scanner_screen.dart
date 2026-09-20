import 'dart:async';
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
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.white, size: 20),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                'Scanned: ${student.nameEnglish} (${student.nameKhmer}) - Marked Present',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        backgroundColor: const Color(0xFF006B45),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
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
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Scan Student ID Card', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text('Camera Viewfinder (Device Feature)', style: TextStyle(fontSize: 12, color: Colors.white70)),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(_isTorchOn ? Icons.flash_on : Icons.flash_off),
            tooltip: 'Toggle Flashlight',
            onPressed: () {
              HapticFeedback.selectionClick();
              setState(() => _isTorchOn = !_isTorchOn);
            },
          ),
          IconButton(
            icon: const Icon(Icons.flip_camera_ios),
            tooltip: 'Switch Camera',
            onPressed: () {
              HapticFeedback.selectionClick();
              setState(() => _isFrontCamera = !_isFrontCamera);
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          // Realistic Camera Preview background
          Positioned.fill(
            child: Container(
              color: const Color(0xFF1E293B),
              child: Center(
                child: Opacity(
                  opacity: 0.15,
                  child: Icon(
                    _isFrontCamera ? Icons.person : Icons.photo_camera,
                    size: 200,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),

          // Torch effect
          if (_isTorchOn)
            Positioned.fill(
              child: Container(
                color: Colors.white.withValues(alpha: 0.12),
              ),
            ),

          // Scanning Target Frame
          Center(
            child: SizedBox(
              width: 260,
              height: 260,
              child: Stack(
                children: [
                  // Corner borders
                  Align(
                    alignment: Alignment.topLeft,
                    child: Container(width: 36, height: 36, decoration: const BoxDecoration(border: Border(top: BorderSide(color: Color(0xFF00C853), width: 4), left: BorderSide(color: Color(0xFF00C853), width: 4)))),
                  ),
                  Align(
                    alignment: Alignment.topRight,
                    child: Container(width: 36, height: 36, decoration: const BoxDecoration(border: Border(top: BorderSide(color: Color(0xFF00C853), width: 4), right: BorderSide(color: Color(0xFF00C853), width: 4)))),
                  ),
                  Align(
                    alignment: Alignment.bottomLeft,
                    child: Container(width: 36, height: 36, decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFF00C853), width: 4), left: BorderSide(color: Color(0xFF00C853), width: 4)))),
                  ),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: Container(width: 36, height: 36, decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFF00C853), width: 4), right: BorderSide(color: Color(0xFF00C853), width: 4)))),
                  ),

                  // Animated Scanning Laser
                  AnimatedBuilder(
                    animation: _laserController,
                    builder: (context, child) {
                      return Positioned(
                        top: _laserController.value * 240,
                        left: 8,
                        right: 8,
                        child: Container(
                          height: 3,
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Colors.transparent, Color(0xFF00E676), Colors.transparent],
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF00E676).withValues(alpha: 0.8),
                                blurRadius: 10,
                                spreadRadius: 2,
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),

                  // Guidance center icon
                  const Center(
                    child: Icon(Icons.qr_code_scanner, color: Colors.white24, size: 80),
                  ),
                ],
              ),
            ),
          ),

          // Top Info Banner
          Positioned(
            top: 20,
            left: 20,
            right: 20,
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
              decoration: BoxDecoration(
                color: Colors.black87,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white24),
              ),
              child: const Row(
                children: [
                  Icon(Icons.info_outline, color: Color(0xFF00C853), size: 18),
                  SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'Align student QR ID card within frame. Haptic vibration confirms mark.',
                      style: TextStyle(color: Colors.white, fontSize: 13),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Bottom Quick Card Picker & Simulator
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Color(0xFF0F172A),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Tap Student to Simulate Camera Scan (${widget.students.length})',
                        style: const TextStyle(color: Colors.white70, fontSize: 13, fontWeight: FontWeight.bold),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFF006B45),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          'Scanned: $_scanCount',
                          style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 74,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: widget.students.length,
                      separatorBuilder: (_, __) => const SizedBox(width: 8),
                      itemBuilder: (context, index) {
                        final student = widget.students[index];
                        final isLast = _lastScannedStudent?.id == student.id;

                        return InkWell(
                          onTap: () => _simulateScan(student),
                          borderRadius: BorderRadius.circular(12),
                          child: Container(
                            width: 130,
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: isLast ? const Color(0xFF006B45) : const Color(0xFF1E293B),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: isLast ? Colors.greenAccent : Colors.white12,
                                width: isLast ? 2 : 1,
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                                      decoration: BoxDecoration(
                                        color: Colors.white12,
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: Text(
                                        '#${student.rollNumber}',
                                        style: const TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    const Spacer(),
                                    const Icon(Icons.qr_code, color: Colors.greenAccent, size: 14),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  student.nameEnglish,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  student.nameKhmer,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(color: Colors.white60, fontSize: 11),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () => Navigator.pop(context),
                      icon: const Icon(Icons.done_all, color: Colors.white),
                      label: const Text('Finished Scanning', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF006B45),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
