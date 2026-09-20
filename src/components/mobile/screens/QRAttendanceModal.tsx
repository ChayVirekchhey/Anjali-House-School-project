import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { QrCode, Camera, CheckCircle2, RefreshCw, X, Sparkles, UserCheck } from 'lucide-react';

interface QRAttendanceModalProps {
  onClose: () => void;
}

export const QRAttendanceModal: React.FC<QRAttendanceModalProps> = ({ onClose }) => {
  const { students, setStudentStatus, showToast, language } = useApp();
  const [scannedStudent, setScannedStudent] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const simulateScanStudent = (studentId: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const target = students.find(s => s.id === studentId) || students[0];
      setStudentStatus(target.id, 'present');
      setScannedStudent(target);
      showToast(
        language === 'km' 
          ? `✓ បានផ្ទៀងផ្ទាត់ និងកត់ត្រាវត្តមានសិស្ស "${target.name}" ដោយជោគជ័យ!`
          : `✓ Student "${target.name}" Verified & Marked Present via QR Scan!`
      );
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EAF6EF] text-[#006B45] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">QR Attendance Scanner</h3>
              <p className="text-[10px] text-slate-400">Class: Grade 5A • English</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative w-full aspect-square max-w-[260px] mx-auto bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-4 border-slate-900 shadow-inner">
          {/* Animated scan line */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />

          {/* Viewfinder corners */}
          <div className="absolute top-4 left-4 w-7 h-7 border-t-3 border-l-3 border-[#20A464] rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-7 h-7 border-t-3 border-r-3 border-[#20A464] rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b-3 border-l-3 border-[#20A464] rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-3 border-r-3 border-[#20A464] rounded-br-lg" />

          {isScanning ? (
            <div className="flex flex-col items-center gap-2 text-white text-xs">
              <RefreshCw className="w-7 h-7 animate-spin text-emerald-400" />
              <span>Scanning student pass...</span>
            </div>
          ) : scannedStudent ? (
            <div className="p-4 bg-emerald-950/80 rounded-xl text-center text-white space-y-1 backdrop-blur-xs border border-emerald-400/40">
              <UserCheck className="w-7 h-7 text-[#20A464] mx-auto" />
              <p className="text-xs font-bold">{scannedStudent.name}</p>
              <p className="text-[10px] text-emerald-200">ID: {scannedStudent.code} • Marked Present</p>
            </div>
          ) : (
            <div className="text-center text-slate-400 text-xs px-4">
              <Camera className="w-6 h-6 mx-auto mb-1.5 text-slate-500" />
              <p className="text-[11px]">Point camera at student QR code</p>
            </div>
          )}
        </div>

        {/* Quick Simulation Buttons */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block text-center">
            Simulate Student Badge Scan:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => simulateScanStudent('s001')}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#006B45] text-slate-700 text-xs font-semibold transition border border-slate-200 cursor-pointer text-left"
            >
              <span className="font-mono text-[10px] text-slate-400 block">001</span>
              <span className="truncate block font-bold">Sok Dara</span>
            </button>
            <button
              onClick={() => simulateScanStudent('s004')}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#006B45] text-slate-700 text-xs font-semibold transition border border-slate-200 cursor-pointer text-left"
            >
              <span className="font-mono text-[10px] text-slate-400 block">004</span>
              <span className="truncate block font-bold">Lim Rina</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#006B45] text-white text-xs font-bold hover:bg-[#004D35] cursor-pointer"
        >
          Done Scanning
        </button>
      </div>
    </div>
  );
};
