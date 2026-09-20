import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Filter, 
  ChevronRight,
  BarChart2,
  Clock
} from 'lucide-react';

interface AttendanceHistoryScreenProps {
  onBack?: () => void;
  isMockup?: boolean;
}

export const AttendanceHistoryScreen: React.FC<AttendanceHistoryScreenProps> = ({ 
  onBack, 
  isMockup = false 
}) => {
  const { setActiveScreen, historySummaries, t, language, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<'today' | 'week' | 'month' | 'custom'>('week');
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  const filterTabs = [
    { id: 'today', label: t.today },
    { id: 'week', label: t.thisWeek },
    { id: 'month', label: t.thisMonth },
    { id: 'custom', label: t.customDate }
  ];

  const filteredRecords = historySummaries.filter((rec) => {
    const matchesSearch = 
      rec.className.toLowerCase().includes(search.toLowerCase()) ||
      rec.subject.toLowerCase().includes(search.toLowerCase()) ||
      rec.teacher.toLowerCase().includes(search.toLowerCase()) ||
      rec.date.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const exportCSV = () => {
    const headers = "Date,Class,Subject,Teacher,Total,Present,Late,Absent,Excused,Rate\n";
    const rows = filteredRecords.map(r => 
      `"${r.date}","${r.className}","${r.subject}","${r.teacher}",${r.total},${r.present},${r.late},${r.absent},${r.excused},${r.rate}%`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduAttend_History_${Date.now()}.csv`;
    a.click();
    showToast(language === 'km' ? 'បានទាញយកឯកសារ CSV ដោយជោគជ័យ' : 'Attendance History exported as CSV');
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-hidden select-none">
      {/* Header Bar */}
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-3 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-bold">{t.attendanceHistory}</span>
          </button>
          
          <button
            onClick={exportCSV}
            title="Export CSV"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills: Today, This Week, This Month, Custom Date */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-0.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-white text-[#004D35] shadow-xs font-bold'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-200/80 flex items-center gap-2 flex-shrink-0">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'km' ? 'ស្វែងរកតាមថ្នាក់ មុខវិជ្ជា...' : 'Search by class, subject, date...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white outline-none transition"
          />
        </div>
      </div>

      {/* History Records List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            onClick={() => setSelectedRecord(record)}
            className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-sm hover:border-emerald-200 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#EAF6EF] text-[#006B45] flex flex-col items-center justify-center font-bold flex-shrink-0">
                  <Calendar className="w-4 h-4 mb-0.5" />
                  <span className="text-[9px] font-bold uppercase">{record.date.slice(0, 6)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{record.className}</h4>
                    <span className="text-xs text-slate-500">• {record.subject}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Teacher: {record.teacher}</p>
                </div>
              </div>

              {/* Attendance Rate Badge */}
              <div className="text-right flex-shrink-0">
                <div className="px-2.5 py-1 rounded-xl bg-emerald-50 text-[#20A464] text-xs font-black flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{record.rate}%</span>
                </div>
                <span className="text-[9px] text-slate-400 font-medium mt-0.5 block">
                  {record.status}
                </span>
              </div>
            </div>

            {/* Breakdown Mini Bar */}
            <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-center text-xs">
              <div className="bg-emerald-50/70 rounded-lg py-1 px-1">
                <span className="text-[10px] text-slate-500 block">Present</span>
                <span className="font-bold text-[#20A464]">{record.present}</span>
              </div>
              <div className="bg-amber-50/70 rounded-lg py-1 px-1">
                <span className="text-[10px] text-slate-500 block">Late</span>
                <span className="font-bold text-[#F59E0B]">{record.late}</span>
              </div>
              <div className="bg-rose-50/70 rounded-lg py-1 px-1">
                <span className="text-[10px] text-slate-500 block">Absent</span>
                <span className="font-bold text-[#E5484D]">{record.absent}</span>
              </div>
              <div className="bg-blue-50/70 rounded-lg py-1 px-1">
                <span className="text-[10px] text-slate-500 block">Excused</span>
                <span className="font-bold text-[#3B82F6]">{record.excused}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{selectedRecord.className} Attendance</h3>
                <p className="text-xs text-slate-500">{selectedRecord.date} • {selectedRecord.subject}</p>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-xs text-slate-500 uppercase font-semibold">Attendance Success</span>
              <div className="text-3xl font-black text-[#006B45] mt-1">{selectedRecord.rate}%</div>
              <p className="text-xs text-slate-600 mt-1">
                {selectedRecord.present} of {selectedRecord.total} students present
              </p>
            </div>

            <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-slate-500">Teacher in charge:</span>
                <span className="font-semibold text-slate-800">{selectedRecord.teacher}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submission Status:</span>
                <span className="font-semibold text-[#20A464]">Verified & Synced</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full py-2.5 rounded-xl bg-[#006B45] text-white text-xs font-bold hover:bg-[#004D35] cursor-pointer"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
