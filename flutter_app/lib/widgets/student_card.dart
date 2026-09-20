import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/student.dart';

class StudentCard extends StatelessWidget {
  final Student student;
  final ValueChanged<AttendanceStatus> onStatusChanged;
  final VoidCallback? onNoteTap;
  final VoidCallback? onMealsChanged;

  const StudentCard({
    super.key,
    required this.student,
    required this.onStatusChanged,
    this.onNoteTap,
    this.onMealsChanged,
  });

  Color _getStatusColor(AttendanceStatus status) {
    switch (status) {
      case AttendanceStatus.present:
        return const Color(0xFF15803D); // Emerald green
      case AttendanceStatus.late:
        return const Color(0xFFD97706); // Amber
      case AttendanceStatus.absent:
        return const Color(0xFFDC2626); // Red
      case AttendanceStatus.excused:
        return const Color(0xFF2563EB); // Blue
    }
  }

  void _showStudentDetails(BuildContext context) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                CircleAvatar(
                  radius: 28,
                  backgroundColor: const Color(0xFF006B45),
                  child: Text(
                    student.nameEnglish.isNotEmpty ? student.nameEnglish[0] : 'S',
                    style: const TextStyle(fontSize: 22, color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        student.nameKhmer,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '${student.nameEnglish} • Roll #${student.rollNumber}',
                        style: TextStyle(fontSize: 13, color: Colors.grey.shade600),
                      ),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: const Color(0xFF006B45).withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          'ID: ${student.qrCode}',
                          style: const TextStyle(fontSize: 11, color: Color(0xFF006B45), fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(height: 28),

            // Emergency & Guardian Phone
            Row(
              children: [
                const Icon(Icons.phone_in_talk, color: Color(0xFF006B45), size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Guardian Contact', style: TextStyle(fontSize: 11, color: Colors.grey)),
                      Text(student.guardianPhone, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    HapticFeedback.selectionClick();
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Calling Guardian ${student.guardianPhone}... (Device Dial Action)'),
                        backgroundColor: const Color(0xFF006B45),
                      ),
                    );
                  },
                  icon: const Icon(Icons.call, size: 16, color: Colors.white),
                  label: const Text('Call', style: TextStyle(color: Colors.white)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF006B45),
                    visualDensity: VisualDensity.compact,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Medical & Allergies
            Row(
              children: [
                const Icon(Icons.medical_services_outlined, color: Colors.amber, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Health & Allergies', style: TextStyle(fontSize: 11, color: Colors.grey)),
                      Text(student.allergies, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // NGO Meals status
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.grey.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Row(
                    children: [
                      Icon(
                        student.hadBreakfast ? Icons.check_circle : Icons.cancel,
                        color: student.hadBreakfast ? Colors.green : Colors.grey,
                        size: 18,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Breakfast: ${student.hadBreakfast ? "Received" : "Not yet"}',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      Icon(
                        student.hadLunch ? Icons.check_circle : Icons.cancel,
                        color: student.hadLunch ? Colors.green : Colors.grey,
                        size: 18,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Lunch: ${student.hadLunch ? "Received" : "Not yet"}',
                        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
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
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            // Student Info Row
            InkWell(
              onTap: () => _showStudentDetails(context),
              borderRadius: BorderRadius.circular(8),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: const Color(0xFF006B45).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      student.nameEnglish.isNotEmpty ? student.nameEnglish[0] : 'S',
                      style: const TextStyle(
                        color: Color(0xFF006B45),
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
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
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                  color: Color(0xFF1E293B),
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: Colors.grey.shade100,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                '#${student.rollNumber}',
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.grey.shade600,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 2),
                        Row(
                          children: [
                            Text(
                              student.nameEnglish,
                              style: TextStyle(
                                fontSize: 13,
                                color: Colors.grey.shade700,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              '• ${student.gender}',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey.shade500,
                              ),
                            ),
                            const Spacer(),
                            // Quick meal icons
                            GestureDetector(
                              onTap: () {
                                HapticFeedback.selectionClick();
                                student.hadBreakfast = !student.hadBreakfast;
                                onMealsChanged?.call();
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                decoration: BoxDecoration(
                                  color: student.hadBreakfast ? Colors.green.shade50 : Colors.grey.shade100,
                                  borderRadius: BorderRadius.circular(4),
                                  border: Border.all(
                                    color: student.hadBreakfast ? Colors.green.shade300 : Colors.grey.shade300,
                                  ),
                                ),
                                child: Text(
                                  'BF 🥣',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: student.hadBreakfast ? Colors.green.shade800 : Colors.grey.shade500,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 4),
                            GestureDetector(
                              onTap: () {
                                HapticFeedback.selectionClick();
                                student.hadLunch = !student.hadLunch;
                                onMealsChanged?.call();
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                                decoration: BoxDecoration(
                                  color: student.hadLunch ? Colors.blue.shade50 : Colors.grey.shade100,
                                  borderRadius: BorderRadius.circular(4),
                                  border: Border.all(
                                    color: student.hadLunch ? Colors.blue.shade300 : Colors.grey.shade300,
                                  ),
                                ),
                                child: Text(
                                  'LN 🍲',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: student.hadLunch ? Colors.blue.shade800 : Colors.grey.shade500,
                                  ),
                                ),
                              ),
                            ),
                          ],
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
                    tooltip: 'Add note',
                  ),
                ],
              ),
            ),

            if (student.note != null && student.note!.isNotEmpty) ...[
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.amber.shade50,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.amber.shade200),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.info_outline, size: 14, color: Colors.amber),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        student.note!,
                        style: TextStyle(fontSize: 12, color: Colors.amber.shade900),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            const SizedBox(height: 10),

            // 4-Button Attendance Selector with Haptic Feedback
            Row(
              children: AttendanceStatus.values.map((status) {
                final isSelected = student.status == status;
                final buttonColor = _getStatusColor(status);

                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2.5),
                    child: InkWell(
                      onTap: () {
                        HapticFeedback.lightImpact();
                        onStatusChanged(status);
                      },
                      borderRadius: BorderRadius.circular(10),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 150),
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? buttonColor : Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: isSelected
                              ? [
                                  BoxShadow(
                                    color: buttonColor.withValues(alpha: 0.3),
                                    blurRadius: 4,
                                    offset: const Offset(0, 2),
                                  ),
                                ]
                              : null,
                        ),
                        alignment: Alignment.center,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              status.label,
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: isSelected ? Colors.white : Colors.grey.shade700,
                              ),
                            ),
                            Text(
                              status.khmerLabel,
                              style: TextStyle(
                                fontSize: 9,
                                color: isSelected ? Colors.white70 : Colors.grey.shade500,
                              ),
                            ),
                          ],
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
}
