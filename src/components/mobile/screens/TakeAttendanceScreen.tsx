import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { AttendanceStatus } from '../../../types';
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  X, 
  Info, 
  CheckCheck, 
  Search, 
  Save, 
  MessageSquare,
  Sparkles,
  QrCode,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TakeAttendanceScreenProps {
  onBack?: () => void;
  isMockup?: boolean;
}

export const TakeAttendanceScreen: React.FC<TakeAttendanceScreenProps> = ({ 
  onBack, 
  isMockup = false 
}) => {
  const { 
    setActiveScreen, 
    students, 
    currentAttendanceMap, 
    setStudentStatus, 
    currentRemarksMap,
    setStudentRemark,
    markAllPresent, 
    saveAttendance,
    t,
    language 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'present' | 'late' | 'absent' | 'excused'>('all');
  const [search, setSearch] = useState('');
  const [remarkModalStudent, setRemarkModalStudent] = useState<string | null>(null);
  const [activeRemarkText, setActiveRemarkText] = useState('');
  const [saveSuccessModal, setSaveSuccessModal] = useState<any | null>(null);

  // Calculate live counts
  let presentCount = 0;
  let lateCount = 0;
  let absentCount = 0;
  let excusedCount = 0;

  students.forEach((st) => {
    const status = currentAttendanceMap[st.id] || 'present';
    if (status === 'present') presentCount++;
    else if (status === 'late') lateCount++;
    else if (status === 'absent') absentCount++;
    else if (status === 'excused') excusedCount++;
  });

  const totalCount = students.length;

  const filteredStudents = students.filter((st) => {
    const status = currentAttendanceMap[st.id] || 'present';
    const matchesFilter = filter === 'all' || status === filter;
    const matchesSearch = 
      st.name.toLowerCase().includes(search.toLowerCase()) || 
      st.code.includes(search) ||
      (st.nameKhmer && st.nameKhmer.includes(search));
    return matchesFilter && matchesSearch;
  });

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  const handleSave = () => {
    const res = saveAttendance();
    if (!isMockup) {
      setSaveSuccessModal(res);
    }
  };

  const openRemarkModal = (studentId: string) => {
    setRemarkModalStudent(studentId);
    setActiveRemarkText(currentRemarksMap[studentId] || '');
  };

  const saveRemark = () => {
    if (remarkModalStudent) {
      setStudentRemark(remarkModalStudent, activeRemarkText);
      setRemarkModalStudent(null);
    }
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Header (Matching Reference Screen 3 layout) */}
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-4 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={handleBack}
            className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-bold">
              {language === 'km' ? 'ស្រង់វត្តមាន' : 'Take Attendance'}
            </span>
          </button>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/15 text-emerald-100 font-medium">
            20 Sep 2026
          </span>
        </div>

        {/* Class Details Card */}
        <div className="bg-white/10 rounded-2xl p-3 border border-white/15 backdrop-blur-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white">Grade 5A</span>
              <span className="text-xs text-emerald-200 font-medium">• English</span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              {language === 'km' ? 'គ្រូបង្រៀន៖ លោកគ្រូ តារា' : 'Teacher: Mr. Dara'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold uppercase text-emerald-200 block">
              {language === 'km' ? 'សិស្សសរុប' : 'Total'}
            </span>
            <span className="text-xl font-extrabold text-white">{totalCount}</span>
          </div>
        </div>

        {/* Dynamic Summary Pills (Present: 28, Late: 2, Absent: 1, Excused: 1) */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 text-center">
          <button 
            onClick={() => setFilter(filter === 'present' ? 'all' : 'present')}
            className={`py-1.5 px-1 rounded-xl transition cursor-pointer ${
              filter === 'present' 
                ? 'bg-[#20A464] text-white ring-2 ring-white/50' 
                : 'bg-white/10 text-emerald-100 hover:bg-white/15'
            }`}
          >
            <div className="text-[10px] font-medium flex items-center justify-center gap-0.5">
              <span>✓</span> {language === 'km' ? 'វត្តមាន' : 'Present'}
            </div>
            <div className="text-sm font-extrabold text-white">{presentCount}</div>
          </button>

          <button 
            onClick={() => setFilter(filter === 'late' ? 'all' : 'late')}
            className={`py-1.5 px-1 rounded-xl transition cursor-pointer ${
              filter === 'late' 
                ? 'bg-[#F59E0B] text-white ring-2 ring-white/50' 
                : 'bg-white/10 text-amber-200 hover:bg-white/15'
            }`}
          >
            <div className="text-[10px] font-medium flex items-center justify-center gap-0.5">
              <span>⚠</span> {language === 'km' ? 'យឺត' : 'Late'}
            </div>
            <div className="text-sm font-extrabold text-white">{lateCount}</div>
          </button>

          <button 
            onClick={() => setFilter(filter === 'absent' ? 'all' : 'absent')}
            className={`py-1.5 px-1 rounded-xl transition cursor-pointer ${
              filter === 'absent' 
                ? 'bg-[#E5484D] text-white ring-2 ring-white/50' 
                : 'bg-white/10 text-rose-200 hover:bg-white/15'
            }`}
          >
            <div className="text-[10px] font-medium flex items-center justify-center gap-0.5">
              <span>✕</span> {language === 'km' ? 'អវត្តមាន' : 'Absent'}
            </div>
            <div className="text-sm font-extrabold text-white">{absentCount}</div>
          </button>

          <button 
            onClick={() => setFilter(filter === 'excused' ? 'all' : 'excused')}
            className={`py-1.5 px-1 rounded-xl transition cursor-pointer ${
              filter === 'excused' 
                ? 'bg-[#3B82F6] text-white ring-2 ring-white/50' 
                : 'bg-white/10 text-blue-200 hover:bg-white/15'
            }`}
          >
            <div className="text-[10px] font-medium flex items-center justify-center gap-0.5">
              <span>ⓘ</span> {language === 'km' ? 'ច្បាប់' : 'Excused'}
            </div>
            <div className="text-sm font-extrabold text-white">{excusedCount}</div>
          </button>
        </div>
      </div>

      {/* 2. Fast Attendance Controls Bar */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200/80 flex items-center justify-between gap-2 shadow-2xs flex-shrink-0">
        {/* Large Prominent CTA: "✓ Mark All Present" (Target: Under 60 seconds) */}
        <button
          onClick={markAllPresent}
          className="flex-1 py-2 px-3 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white text-xs font-bold shadow-xs transition active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <CheckCheck className="w-4 h-4 text-emerald-300" />
          <span>{t.markAllPresent}</span>
        </button>

        {/* Quick Search Input */}
        <div className="relative w-36">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'km' ? 'ស្វែងរក...' : 'Filter list...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-100 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white outline-none transition"
          />
        </div>
      </div>

      {/* 3. Student List (Scrollable, Fast Status Selector) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {filter !== 'all' && (
          <div className="flex items-center justify-between px-1 text-xs text-slate-500">
            <span>
              Showing {filteredStudents.length} of {totalCount} ({filter})
            </span>
            <button 
              onClick={() => setFilter('all')}
              className="text-[#006B45] font-semibold hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          </div>
        )}

        {filteredStudents.map((student) => {
          const currentStatus = currentAttendanceMap[student.id] || 'present';
          const remark = currentRemarksMap[student.id];

          return (
            <div 
              key={student.id}
              className={`p-2.5 rounded-2xl bg-white border transition shadow-2xs flex flex-col gap-2 ${
                currentStatus === 'absent' 
                  ? 'border-rose-200 bg-rose-50/20' 
                  : currentStatus === 'late'
                  ? 'border-amber-200 bg-amber-50/20'
                  : currentStatus === 'excused'
                  ? 'border-blue-200 bg-blue-50/20'
                  : 'border-slate-150 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Student Identity */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {student.code}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {student.name}
                      </h4>
                      {language === 'km' && student.nameKhmer && (
                        <span className="text-[11px] text-slate-500 font-medium truncate">
                          ({student.nameKhmer})
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      {student.gender} • Rate: {student.overallAttendanceRate}%
                    </span>
                  </div>
                </div>

                {/* Optional Note / Remark Trigger */}
                <button
                  onClick={() => openRemarkModal(student.id)}
                  title="Add note/remark"
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    remark 
                      ? 'bg-amber-100 text-amber-800 font-semibold text-[10px] flex items-center gap-1' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {remark && <span className="max-w-[80px] truncate text-[9px]">{remark}</span>}
                </button>
              </div>

              {/* Status Selector Buttons (Present / Late / Absent / Excused) */}
              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {/* Present Button */}
                <button
                  type="button"
                  onClick={() => setStudentStatus(student.id, 'present')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    currentStatus === 'present'
                      ? 'bg-[#20A464] text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-[#20A464]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{language === 'km' ? 'វត្តមាន' : 'Present'}</span>
                </button>

                {/* Late Button */}
                <button
                  type="button"
                  onClick={() => setStudentStatus(student.id, 'late')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    currentStatus === 'late'
                      ? 'bg-[#F59E0B] text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-[#F59E0B]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{language === 'km' ? 'យឺត' : 'Late'}</span>
                </button>

                {/* Absent Button */}
                <button
                  type="button"
                  onClick={() => setStudentStatus(student.id, 'absent')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    currentStatus === 'absent'
                      ? 'bg-[#E5484D] text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-[#E5484D]'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{language === 'km' ? 'អវត្តមាន' : 'Absent'}</span>
                </button>

                {/* Excused Button */}
                <button
                  type="button"
                  onClick={() => setStudentStatus(student.id, 'excused')}
                  className={`py-1.5 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    currentStatus === 'excused'
                      ? 'bg-[#3B82F6] text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#3B82F6]'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{language === 'km' ? 'ច្បាប់' : 'Excused'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Sticky Action Bar: Save Attendance */}
      <div className="p-3 bg-white border-t border-slate-200/90 shadow-lg flex items-center justify-between gap-3 flex-shrink-0">
        <div className="text-xs">
          <span className="text-slate-500 font-medium block">
            {language === 'km' ? 'បានកត់ត្រា៖' : 'Status:'}
          </span>
          <span className="font-bold text-[#006B45]">
            {totalCount}/{totalCount} {language === 'km' ? 'សិស្សគ្រប់ចំនួន' : 'Students Marked'}
          </span>
        </div>

        <button
          onClick={handleSave}
          className="py-3 px-6 rounded-2xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-sm shadow-md transition active:scale-[0.98] flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4 text-emerald-300" />
          <span>{t.saveAttendance}</span>
        </button>
      </div>

      {/* Optional Student Remark Modal */}
      {remarkModalStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#006B45]" />
                <span>Attendance Remark / Reason</span>
              </h3>
              <button 
                onClick={() => setRemarkModalStudent(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={3}
              value={activeRemarkText}
              onChange={(e) => setActiveRemarkText(e.target.value)}
              placeholder="E.g., Medical appointment, parent called, bus delay..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none resize-none"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRemarkModalStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveRemark}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#006B45] text-white hover:bg-[#004D35] cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Success Confirmation Modal */}
      {saveSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006B45] flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t.attendanceSaved}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Grade 5A • English (20 Sep 2026)
              </p>
            </div>

            {/* Summary Box */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <div>
                <span className="text-[10px] text-slate-500 block">Present</span>
                <span className="font-extrabold text-[#20A464] text-sm">{saveSuccessModal.present}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Late</span>
                <span className="font-extrabold text-[#F59E0B] text-sm">{saveSuccessModal.late}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Absent</span>
                <span className="font-extrabold text-[#E5484D] text-sm">{saveSuccessModal.absent}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Excused</span>
                <span className="font-extrabold text-[#3B82F6] text-sm">{saveSuccessModal.excused}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              ✓ 32 students processed in under 60 seconds
            </p>

            <button
              onClick={() => {
                setSaveSuccessModal(null);
                setActiveScreen('home');
              }}
              className="w-full py-3 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-sm transition cursor-pointer"
            >
              Done & Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
