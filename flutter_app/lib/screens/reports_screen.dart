import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ReportsScreen extends StatelessWidget {
  const ReportsScreen({super.key});

  void _exportCSV(BuildContext context) {
    HapticFeedback.mediumImpact();
    const csvContent = 'Date,Class,Enrolled,Present,Late,Absent,Excused,MealsServed\n'
        '2026-09-18,Young Learners 2A,10,8,1,1,0,10\n'
        '2026-09-19,Young Learners 2A,10,9,0,0,1,10\n'
        '2026-09-20,Young Learners 2A,10,7,2,1,0,9\n'
        '2026-09-20,Creative Arts 3B,12,11,1,0,0,12\n';

    Clipboard.setData(const ClipboardData(text: csvContent));

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.table_view, color: Color(0xFF006B45)),
            SizedBox(width: 8),
            Text('CSV Attendance Export', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('CSV records copied to device clipboard:', style: TextStyle(fontSize: 12, color: Colors.grey)),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text(
                csvContent,
                style: TextStyle(fontSize: 11, fontFamily: 'monospace'),
              ),
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
                  content: Text('Saved to device storage: anjali_attendance_sept2026.csv'),
                  backgroundColor: Color(0xFF006B45),
                ),
              );
            },
            icon: const Icon(Icons.download, size: 16, color: Colors.white),
            label: const Text('Save File', style: TextStyle(color: Colors.white)),
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF006B45)),
          ),
        ],
      ),
    );
  }

  void _exportPDF(BuildContext context) {
    HapticFeedback.selectionClick();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Generating NGO Donor & Ministry of Education PDF report...'),
        backgroundColor: Color(0xFF006B45),
        duration: Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF006B45),
        foregroundColor: Colors.white,
        title: const Text('Attendance Reports & NGO Metrics', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            tooltip: 'Share Report',
            onPressed: () => _exportCSV(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // KPI Summary Row
            Row(
              children: [
                Expanded(
                  child: _MetricCard(
                    title: 'Monthly Rate',
                    value: '94.2%',
                    subtitle: '+1.8% vs last month',
                    color: const Color(0xFF15803D),
                    icon: Icons.trending_up_rounded,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _MetricCard(
                    title: 'Nutrition Meals',
                    value: '142',
                    subtitle: 'Served today',
                    color: const Color(0xFFD97706),
                    icon: Icons.restaurant_rounded,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _MetricCard(
                    title: 'Active Students',
                    value: '88',
                    subtitle: '4 Class groups',
                    color: const Color(0xFF2563EB),
                    icon: Icons.people_alt_rounded,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _MetricCard(
                    title: 'Follow-ups',
                    value: '3',
                    subtitle: 'Social worker alerts',
                    color: const Color(0xFFDC2626),
                    icon: Icons.health_and_safety_rounded,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Class Performance Table
            const Text('Class Performance (This Week)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
            const SizedBox(height: 10),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Column(
                children: [
                  _ClassProgressRow(name: 'Young Learners 2A', percentage: 0.92, rate: '92%'),
                  const Divider(height: 1),
                  _ClassProgressRow(name: 'Creative Arts & Music 3B', percentage: 0.95, rate: '95%'),
                  const Divider(height: 1),
                  _ClassProgressRow(name: 'Digital Literacy 4A', percentage: 0.88, rate: '88%'),
                  const Divider(height: 1),
                  _ClassProgressRow(name: 'Life Skills 1A', percentage: 0.97, rate: '97%'),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Export Actions
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF006B45).withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF006B45).withValues(alpha: 0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'NGO Donor & Government Export',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Color(0xFF006B45)),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Generate signed monthly attendance sheets for social impact reporting and meal audits.',
                    style: TextStyle(fontSize: 12, color: Color(0xFF1E293B)),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          style: OutlinedButton.styleFrom(
                            foregroundColor: const Color(0xFF006B45),
                            side: const BorderSide(color: Color(0xFF006B45)),
                          ),
                          onPressed: () => _exportCSV(context),
                          icon: const Icon(Icons.table_chart_rounded, size: 16),
                          label: const Text('Export CSV', style: TextStyle(fontSize: 12)),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF006B45),
                            foregroundColor: Colors.white,
                          ),
                          onPressed: () => _exportPDF(context),
                          icon: const Icon(Icons.picture_as_pdf_rounded, size: 16),
                          label: const Text('Export PDF', style: TextStyle(fontSize: 12)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MetricCard extends StatelessWidget {
  final String title;
  final String value;
  final String subtitle;
  final Color color;
  final IconData icon;

  const _MetricCard({
    required this.title,
    required this.value,
    required this.subtitle,
    required this.color,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: TextStyle(fontSize: 12, color: Colors.grey.shade600, fontWeight: FontWeight.w600)),
              Icon(icon, size: 18, color: color),
            ],
          ),
          const SizedBox(height: 8),
          Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(height: 2),
          Text(subtitle, style: TextStyle(fontSize: 11, color: Colors.grey.shade500)),
        ],
      ),
    );
  }
}

class _ClassProgressRow extends StatelessWidget {
  final String name;
  final double percentage;
  final String rate;

  const _ClassProgressRow({required this.name, required this.percentage, required this.rate});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
              Text(rate, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Color(0xFF006B45))),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(
              value: percentage,
              backgroundColor: Colors.grey.shade100,
              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF006B45)),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }
}
