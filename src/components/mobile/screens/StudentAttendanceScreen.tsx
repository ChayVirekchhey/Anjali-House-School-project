import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Check, 
  Clock, 
  X, 
  Info, 
  QrCode, 
  Award, 
  ChevronRight, 
  Calendar, 
  Bell, 
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

interface StudentAttendanceScreenProps {
  onBack?: () => void;
  isMockup?: boolean;
}

export const StudentAttendanceScreen: React.FC<StudentAttendanceScreenProps> = ({ 
  onBack, 
  isMockup = false 
}) => {
  const { setActiveScreen, t, language } = useApp();
  const [showQRModal, setShowQRModal] = useState(false);

  // Student profile data for Sok Dara (Grade 5A)
  const student = {
    name: 'Sok Dara',
    nameKhmer: 'សុខ តារា',
    code: '001',
    grade: 'Grade 5A',
    rate: 94.5,
    present: 85,
    late: 3,
    absent: 2,
    excused: 1,
    recent: [
      { date: '20 Sep', subject: 'English', status: 'present', icon: Check, color: 'text-[#20A464] bg-emerald-50' },
      { date: '19 Sep', subject: 'Computer', status: 'present', icon: Check, color: 'text-[#20A464] bg-emerald-50' },
      { date: '18 Sep', subject: 'Math', status: 'late', icon: Clock, color: 'text-[#F59E0B] bg-amber-50' },
      { date: '17 Sep', subject: 'English', status: 'absent', icon: X, color: 'text-[#E5484D] bg-rose-50' },
      { date: '16 Sep', subject: 'Science', status: 'excused', icon: Info, color: 'text-[#3B82F6] bg-blue-50' }
    ]
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-y-auto pb-16 select-none">
      <div className="p-4 space-y-4">
        {/* Header: Hello, Sok Dara */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#006B45] to-emerald-500 text-white flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-emerald-100">
              SD
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {language === 'km' ? 'សួស្តី សុខ តារា 👋' : 'Hello, Sok Dara 👋'}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] px-2 py-0.2 rounded-full bg-[#EAF6EF] text-[#006B45] font-semibold">
                  Grade 5A
                </span>
                <span className="text-xs text-slate-400">• ID: 001</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowQRModal(true)}
            className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:bg-slate-50 text-[#006B45] transition cursor-pointer"
            title="Show My Attendance QR"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        {/* Circular Chart & Large Overall Attendance Card */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.overallAttendance}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#20A464] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.goodStanding}
            </span>
          </div>

          <div className="flex items-center justify-around py-2">
            {/* Circular Progress Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress arc (94.5%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#20A464"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - 0.945)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 tracking-tight">94.5%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Rating</span>
              </div>
            </div>

            {/* Quick summary points */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#20A464]" />
                <span className="text-slate-600">85 Sessions Present</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span className="text-slate-600">3 Late Arrivals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
                <span className="text-slate-600">2 Absences</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="text-slate-600">1 Excused Slip</span>
              </div>
            </div>
          </div>

          {/* 4 Statistics Cards (Prompt Requirement: Present 85, Late 3, Absent 2, Excused 1) */}
          <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
            <div className="p-2 rounded-2xl bg-[#EAF6EF] text-[#006B45]">
              <span className="text-[10px] font-semibold block">{t.present}</span>
              <span className="text-base font-black text-[#20A464]">85</span>
            </div>
            <div className="p-2 rounded-2xl bg-amber-50 text-amber-900">
              <span className="text-[10px] font-semibold block">{t.late}</span>
              <span className="text-base font-black text-[#F59E0B]">3</span>
            </div>
            <div className="p-2 rounded-2xl bg-rose-50 text-rose-900">
              <span className="text-[10px] font-semibold block">{t.absent}</span>
              <span className="text-base font-black text-[#E5484D]">2</span>
            </div>
            <div className="p-2 rounded-2xl bg-blue-50 text-blue-900">
              <span className="text-[10px] font-semibold block">{t.excused}</span>
              <span className="text-base font-black text-[#3B82F6]">1</span>
            </div>
          </div>
        </div>

        {/* Recent Attendance List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.recentAttendance}
            </h3>
            <span className="text-xs text-slate-400">Past 5 Days</span>
          </div>

          <div className="space-y-2">
            {student.recent.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center font-bold text-xs">
                      <Calendar className="w-3.5 h-3.5 mb-0.5 text-slate-500" />
                      <span className="text-[9px]">{item.date}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.subject}</h4>
                      <p className="text-[10px] text-slate-400">Class period 08:00 AM</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 capitalize ${item.color}`}>
                    <Icon className="w-3 h-3" />
                    <span>{item.status}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button: View Full History */}
        <button
          onClick={() => setActiveScreen('attendance_history')}
          className="w-full py-3.5 rounded-2xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-xs shadow-md transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t.viewFullHistory}</span>
          <ChevronRight className="w-4 h-4 text-emerald-300" />
        </button>
      </div>

      {/* Student QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-xs font-bold text-[#006B45] uppercase tracking-wider">
                Digital Attendance Pass
              </span>
              <button 
                onClick={() => setShowQRModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">Sok Dara</h3>
              <p className="text-xs text-slate-500">Student ID: 001 • Grade 5A</p>
            </div>

            {/* Generated QR Pattern Box */}
            <div className="p-4 bg-slate-50 border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center mx-auto">
              <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-inner flex items-center justify-center">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                  {/* Top-left position marker */}
                  <rect x="10" y="10" width="25" height="25" fill="#006B45" />
                  <rect x="15" y="15" width="15" height="15" fill="#FFFFFF" />
                  <rect x="18" y="18" width="9" height="9" fill="#006B45" />

                  {/* Top-right position marker */}
                  <rect x="65" y="10" width="25" height="25" fill="#006B45" />
                  <rect x="70" y="15" width="15" height="15" fill="#FFFFFF" />
                  <rect x="73" y="18" width="9" height="9" fill="#006B45" />

                  {/* Bottom-left position marker */}
                  <rect x="10" y="65" width="25" height="25" fill="#006B45" />
                  <rect x="15" y="70" width="15" height="15" fill="#FFFFFF" />
                  <rect x="18" y="73" width="9" height="9" fill="#006B45" />

                  {/* Data matrix dots */}
                  <rect x="42" y="12" width="6" height="6" fill="#006B45" />
                  <rect x="52" y="18" width="6" height="6" fill="#006B45" />
                  <rect x="40" y="40" width="20" height="20" rx="2" fill="#20A464" />
                  <rect x="12" y="44" width="8" height="8" fill="#006B45" />
                  <rect x="26" y="48" width="6" height="6" fill="#006B45" />
                  <rect x="46" y="46" width="8" height="8" fill="#FFFFFF" />
                  <rect x="68" y="42" width="8" height="8" fill="#006B45" />
                  <rect x="80" y="52" width="8" height="8" fill="#006B45" />
                  <rect x="44" y="68" width="8" height="8" fill="#006B45" />
                  <rect x="58" y="76" width="8" height="8" fill="#006B45" />
                  <rect x="74" y="68" width="14" height="14" fill="#006B45" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 font-mono">EDU-ATTEND-SOK-001</span>
            </div>

            <p className="text-[11px] text-slate-500">
              Present this code to the teacher's scanner for fast attendance check-in.
            </p>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#006B45] text-white text-xs font-bold hover:bg-[#004D35] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
