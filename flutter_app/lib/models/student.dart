enum AttendanceStatus {
  present,
  late,
  absent,
  excused,
}

extension AttendanceStatusExtension on AttendanceStatus {
  String get label {
    switch (this) {
      case AttendanceStatus.present:
        return 'Present';
      case AttendanceStatus.late:
        return 'Late';
      case AttendanceStatus.absent:
        return 'Absent';
      case AttendanceStatus.excused:
        return 'Excused';
    }
  }

  String get khmerLabel {
    switch (this) {
      case AttendanceStatus.present:
        return 'វត្តមាន';
      case AttendanceStatus.late:
        return 'យឺត';
      case AttendanceStatus.absent:
        return 'អវត្តមាន';
      case AttendanceStatus.excused:
        return 'ច្បាប់';
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
  bool hadBreakfast;
  bool hadLunch;
  final String allergies;
  final String guardianPhone;
  final String qrCode;

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
    this.hadBreakfast = true,
    this.hadLunch = true,
    this.allergies = 'None reported',
    this.guardianPhone = '+855 12 345 678',
    String? qrCode,
  }) : qrCode = qrCode ?? 'ANJALI-ID-$rollNumber';

  Student copyWith({
    AttendanceStatus? status,
    String? note,
    DateTime? markedAt,
    bool? hadBreakfast,
    bool? hadLunch,
  }) {
    return Student(
      id: id,
      nameKhmer: nameKhmer,
      nameEnglish: nameEnglish,
      gender: gender,
      className: className,
      rollNumber: rollNumber,
      status: status ?? this.status,
      note: note ?? this.note,
      markedAt: markedAt ?? this.markedAt,
      hadBreakfast: hadBreakfast ?? this.hadBreakfast,
      hadLunch: hadLunch ?? this.hadLunch,
      allergies: allergies,
      guardianPhone: guardianPhone,
      qrCode: qrCode,
    );
  }
}
