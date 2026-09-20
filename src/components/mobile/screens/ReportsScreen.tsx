import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  ArrowLeft, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Filter,
  FileSpreadsheet
} from 'lucide-react';

interface ReportsScreenProps {
  onBack?: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onBack }) => {
  const { setActiveScreen, historySummaries, showToast, language, t } = useApp();
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'class'>('monthly');

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  const handleExportCSV = () => {
    const headers = "Class,Period,Total,Present,Late,Absent,Rate\n";
    const rows = historySummaries.map(h => `"${h.className}","${h.date}",${h.total},${h.present},${h.late},${h.absent},${h.rate}%`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduAttend_${reportType}_report.csv`;
    a.click();
    showToast(language === 'km' ? 'បានទាញយករបាយការណ៍ CSV រួចរាល់' : 'Report CSV exported successfully');
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-y-auto pb-16 select-none">
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-3 shadow-sm flex items-center justify-between flex-shrink-0">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-bold">{t.reports}</span>
        </button>

        <button
          onClick={handleExportCSV}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 transition cursor-pointer"
          title="Export CSV"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Report type switchers */}
        <div className="grid grid-cols-4 gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          {[
            { id: 'daily', label: 'Daily' },
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'class', label: 'Class' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id as any)}
              className={`py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                reportType === tab.id
                  ? 'bg-[#006B45] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overall School Summary Card */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                School Average
              </span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">89.4%</div>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-50 text-[#20A464] text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2.3% this month</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Total Logs</span>
              <span className="font-extrabold text-slate-800 text-sm">1,240</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Unexcused</span>
              <span className="font-extrabold text-[#E5484D] text-sm">34</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Punctuality</span>
              <span className="font-extrabold text-[#F59E0B] text-sm">96.1%</span>
            </div>
          </div>
        </div>

        {/* Breakdown by Class */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Class Breakdown
          </h3>

          <div className="space-y-2">
            {[
              { class: 'Grade 5A', teacher: 'Mr. Dara', rate: 94.5, present: 28, late: 2, absent: 1, total: 32 },
              { class: 'Grade 6A', teacher: 'Ms. Sophea', rate: 96.4, present: 27, late: 1, absent: 0, total: 28 },
              { class: 'Grade 5B', teacher: 'Mr. Vichea', rate: 96.7, present: 29, late: 0, absent: 1, total: 30 },
              { class: 'Grade 6B', teacher: 'Mr. Dara', rate: 93.3, present: 28, late: 1, absent: 1, total: 30 }
            ].map((cls, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cls.class}</h4>
                    <span className="text-[10px] text-slate-400">In charge: {cls.teacher}</span>
                  </div>
                  <span className="text-xs font-black text-[#006B45]">{cls.rate}%</span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div style={{ width: `${(cls.present / cls.total) * 100}%` }} className="bg-[#20A464] h-full" />
                  <div style={{ width: `${(cls.late / cls.total) * 100}%` }} className="bg-[#F59E0B] h-full" />
                  <div style={{ width: `${(cls.absent / cls.total) * 100}%` }} className="bg-[#E5484D] h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="w-full py-3 rounded-2xl bg-[#006B45] hover:bg-[#004D35] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Download Excel / CSV Summary</span>
        </button>
      </div>
    </div>
  );
};
