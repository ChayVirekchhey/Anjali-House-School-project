import 'package:flutter/material.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _offlineMode = false;
  bool _autoSync = true;
  String _selectedLanguage = 'English / ខ្មែរ';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF006B45),
        foregroundColor: Colors.white,
        title: const Text('Teacher Profile & Settings', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Teacher Info Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: const Color(0xFF006B45),
                  child: const Text('SN', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Chann Sreyneang',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Primary English Teacher • Anjali House',
                        style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                      ),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: const Color(0xFFDCFCE7),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text(
                          'Verified Educator ID #T-409',
                          style: TextStyle(color: Color(0xFF15803D), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Settings Section
          const Text('System Preferences', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              children: [
                SwitchListTile(
                  activeColor: const Color(0xFF006B45),
                  title: const Text('Force Offline Storage Mode', style: TextStyle(fontSize: 14)),
                  subtitle: const Text('Keeps all records stored in local SQLite cache', style: TextStyle(fontSize: 12)),
                  value: _offlineMode,
                  onChanged: (val) => setState(() => _offlineMode = val),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  activeColor: const Color(0xFF006B45),
                  title: const Text('Auto-Sync On WiFi Reconnect', style: TextStyle(fontSize: 14)),
                  subtitle: const Text('Automatically upload pending attendance records', style: TextStyle(fontSize: 12)),
                  value: _autoSync,
                  onChanged: (val) => setState(() => _autoSync = val),
                ),
                const Divider(height: 1),
                ListTile(
                  title: const Text('Language / ភាសា', style: TextStyle(fontSize: 14)),
                  subtitle: Text(_selectedLanguage, style: const TextStyle(fontSize: 12)),
                  trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14),
                  onTap: () {
                    setState(() {
                      _selectedLanguage = _selectedLanguage == 'English' ? 'ខ្មែរ (Khmer)' : 'English';
                    });
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // About Anjali House
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF006B45).withOpacity(0.06),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF006B45).withOpacity(0.15)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.info_outline_rounded, color: Color(0xFF006B45), size: 18),
                    SizedBox(width: 8),
                    Text('About Anjali House', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF006B45))),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'Non-governmental organization founded in Siem Reap, Cambodia, providing education, healthcare, and nutrition to underprivileged children.',
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade800, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
