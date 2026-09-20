import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EduAttendLogo } from '../common/EduAttendLogo';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  Calendar, 
  BarChart3, 
  Bell, 
  UserCog, 
  Settings, 
  Search, 
  Download, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface AdminWebDashboardProps {
  isMockup?: boolean;
}

export const AdminWebDashboard: React.FC<AdminWebDashboardProps> = ({ isMockup = false }) => {
  const { students, showToast } = useApp();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [tableFilter, setTableFilter] = useState('All');

  // Sidebar navigation items matching prompt
  const sidebarItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Students', icon: Users, badge: '320' },
    { label: 'Teachers', icon: GraduationCap, badge: '20' },
    { label: 'Classes', icon: BookOpen, badge: '10' },
    { label: 'Attendance', icon: CalendarCheck },
    { label: 'Schedules', icon: Calendar },
    { label: 'Reports', icon: BarChart3 },
    { label: 'Notifications', icon: Bell, badge: '3' },
    { label: 'Users', icon: UserCog },
    { label: 'Settings', icon: Settings }
  ];

  // Top statistics from prompt: Total Students 320, Present 286, Absent 20, Late 14, Rate 89.4%
  const statCards = [
    {
      title: 'Total Students',
      value: '320',
      change: '+12 this term',
      icon: Users,
      color: 'bg-emerald-50 text-[#006B45]'
    },
    {
      title: 'Present Today',
      value: '286',
      sub: '89.4% rate',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-[#20A464]'
    },
    {
      title: 'Absent Today',
      value: '20',
      sub: '5 with medical slips',
      icon: XCircle,
      color: 'bg-rose-50 text-[#E5484D]'
    },
    {
      title: 'Late Today',
      value: '14',
      sub: 'Traffic delay logged',
      icon: AlertTriangle,
      color: 'bg-amber-50 text-[#F59E0B]'
    }
  ];

  // Recent attendance table data (Exact prompt specifications)
  const recentAttendanceRows = [
    { id: 'S0001', name: 'Sok Dara', class: 'Grade 5A', date: '20 Sep, 08:05 AM', status: 'Present' },
    { id: 'S0002', name: 'Chan Vanna', class: 'Grade 5A', date: '20 Sep, 08:02 AM', status: 'Late' },
    { id: 'S0003', name: 'Mey Sopheak', class: 'Grade 6A', date: '20 Sep, 08:15 AM', status: 'Absent' },
    { id: 'S0004', name: 'Lim Rina', class: 'Grade 5A', date: '20 Sep, 08:00 AM', status: 'Absent' },
    { id: 'S0005', name: 'Khem Piseth', class: 'Grade 6A', date: '20 Sep, 07:58 AM', status: 'Present' },
    { id: 'S0006', name: 'Soun Chanthou', class: 'Grade 5B', date: '20 Sep, 08:03 AM', status: 'Present' }
  ];

  const handleExportCSV = () => {
    const headers = "Student ID,Student Name,Class,Date,Status\n";
    const rows = recentAttendanceRows.map(r => `"${r.id}","${r.name}","${r.class}","${r.date}","${r.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduAttend_Admin_Report_${Date.now()}.csv`;
    a.click();
    showToast('Admin Attendance Report exported as CSV');
  };

  return (
    <div className="w-full h-full min-h-[560px] bg-[#F7F8F7] flex overflow-hidden rounded-2xl select-none text-slate-800 font-sans">
      {/* 1. Dark Green Sidebar (#004D35) matching reference laptop view */}
      <aside className="w-56 bg-[#004D35] text-white flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          {/* Logo & School Name */}
          <div className="pt-2 px-2 flex items-center justify-between">
            <EduAttendLogo size="md" lightText={true} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveMenu(item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-white/20 text-white font-bold shadow-xs'
                      : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-emerald-300" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/15 text-emerald-200 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin User Footer */}
        <div className="pt-4 border-t border-emerald-800/60 flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white">
            AD
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-white block truncate">Anjali House Admin</span>
            <span className="text-[10px] text-emerald-200/70 block truncate">admin@anjali-house.com</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Dashboard Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#F7F8F7]">
        {/* Top Header */}
        <header className="px-6 py-4 bg-white border-b border-slate-200/80 flex items-center justify-between gap-4 flex-shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <span className="text-xs font-semibold text-slate-400">
              Welcome back, Principal & Administrators
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search students, teachers..."
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-100 rounded-xl border border-transparent focus:border-[#006B45] focus:bg-white outline-none w-52 transition"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#006B45] hover:bg-[#004D35] text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Top 4 Statistic Cards (Total 320, Present 286, Absent 20, Late 14) */}
          <div className="grid grid-cols-4 gap-4">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                    <div className={`w-8 h-8 rounded-xl ${card.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-medium">{card.sub || card.change}</div>
                </div>
              );
            })}
          </div>

          {/* Middle Row: Charts (Today's Attendance Trend & Students Overview Donut) */}
          <div className="grid grid-cols-3 gap-6">
            {/* Today's Attendance Overview (Col span 2) */}
            <div className="col-span-2 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Today's Attendance by Grade</h3>
                  <p className="text-xs text-slate-400">September 20, 2026 • Real-time attendance submission</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#20A464]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#20A464]" /> Present
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#F59E0B]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Late
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#E5484D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" /> Absent
                  </span>
                </div>
              </div>

              {/* Bar Chart Simulation */}
              <div className="space-y-3 pt-2">
                {[
                  { grade: 'Grade 5A (English)', present: 28, late: 2, absent: 2, total: 32, rate: '94.5%' },
                  { grade: 'Grade 6A (Computer)', present: 27, late: 1, absent: 0, total: 28, rate: '96.4%' },
                  { grade: 'Grade 5B (Math)', present: 29, late: 0, absent: 1, total: 30, rate: '96.7%' },
                  { grade: 'Grade 6B (Geography)', present: 28, late: 1, absent: 1, total: 30, rate: '93.3%' },
                  { grade: 'Grade 4A (Science)', present: 26, late: 2, absent: 2, total: 30, rate: '86.7%' }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.grade}</span>
                      <span className="text-emerald-700 font-bold">{item.rate}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div 
                        style={{ width: `${(item.present / item.total) * 100}%` }} 
                        className="bg-[#20A464] h-full" 
                        title={`Present: ${item.present}`}
                      />
                      <div 
                        style={{ width: `${(item.late / item.total) * 100}%` }} 
                        className="bg-[#F59E0B] h-full" 
                        title={`Late: ${item.late}`}
                      />
                      <div 
                        style={{ width: `${(item.absent / item.total) * 100}%` }} 
                        className="bg-[#E5484D] h-full" 
                        title={`Absent: ${item.absent}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Students Overview Donut Chart (Matching Reference 6) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Students Overview</h3>
                <p className="text-xs text-slate-400">320 Students Enrolled</p>
              </div>

              {/* Donut Chart Visual */}
              <div className="relative w-40 h-40 mx-auto my-3 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* English Class: 120 (37.5%) */}
                  <circle cx="50" cy="50" r="38" stroke="#006B45" strokeWidth="12" fill="none"
                    strokeDasharray="89.5 238.7" strokeDashoffset="0" />
                  {/* Computer Class: 60 (18.75%) */}
                  <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" fill="none"
                    strokeDasharray="44.7 238.7" strokeDashoffset="-89.5" />
                  {/* Art Class: 60 (18.75%) */}
                  <circle cx="50" cy="50" r="38" stroke="#20A464" strokeWidth="12" fill="none"
                    strokeDasharray="44.7 238.7" strokeDashoffset="-134.2" />
                  {/* Other/Math: 80 (25%) */}
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="12" fill="none"
                    strokeDasharray="59.7 238.7" strokeDashoffset="-178.9" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-slate-900">320</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Total</span>
                </div>
              </div>

              {/* Legend matching reference */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006B45]" />
                  <span className="text-slate-600">English (120)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-slate-600">Computer (60)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#20A464]" />
                  <span className="text-slate-600">Art Class (60)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-slate-600">Other (80)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Table: Recent Attendance (Matching prompt specification) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Attendance Records</h3>
                <p className="text-xs text-slate-400">Live student log stream across all school gates and homerooms</p>
              </div>

              <div className="flex items-center gap-2">
                {['All', 'Present', 'Late', 'Absent'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTableFilter(tab)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition ${
                      tableFilter === tab
                        ? 'bg-[#006B45] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase">
                    <th className="pb-3 px-3">Student ID</th>
                    <th className="pb-3 px-3">Student Name</th>
                    <th className="pb-3 px-3">Class</th>
                    <th className="pb-3 px-3">Date & Time</th>
                    <th className="pb-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {recentAttendanceRows
                    .filter(r => tableFilter === 'All' || r.status === tableFilter)
                    .map((row) => {
                      let statusBadge = (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#20A464] font-bold text-[11px] inline-flex items-center gap-1">
                          ✓ Present
                        </span>
                      );
                      if (row.status === 'Late') {
                        statusBadge = (
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-[#F59E0B] font-bold text-[11px] inline-flex items-center gap-1">
                            ⚠ Late
                          </span>
                        );
                      } else if (row.status === 'Absent') {
                        statusBadge = (
                          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#E5484D] font-bold text-[11px] inline-flex items-center gap-1">
                            ✕ Absent
                          </span>
                        );
                      }

                      return (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3 font-mono font-bold text-slate-900">{row.id}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{row.name}</td>
                          <td className="py-3 px-3 text-slate-600">{row.class}</td>
                          <td className="py-3 px-3 text-slate-500">{row.date}</td>
                          <td className="py-3 px-3 text-right">{statusBadge}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
