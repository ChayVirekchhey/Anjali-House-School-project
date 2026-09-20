import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SplashScreen } from '../mobile/screens/SplashScreen';
import { TeacherHomeScreen } from '../mobile/screens/TeacherHomeScreen';
import { TakeAttendanceScreen } from '../mobile/screens/TakeAttendanceScreen';
import { AttendanceHistoryScreen } from '../mobile/screens/AttendanceHistoryScreen';
import { StudentAttendanceScreen } from '../mobile/screens/StudentAttendanceScreen';
import { StudentRegistrationScreen } from '../mobile/screens/StudentRegistrationScreen';
import { AdminWebDashboard } from '../admin/AdminWebDashboard';
import { TechnologyStackCard } from './TechnologyStackCard';
import { AppIconCard } from './AppIconCard';
import { 
  Maximize2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  ZoomIn, 
  X,
  Play
} from 'lucide-react';

export const PresentationBoard: React.FC = () => {
  const { setActiveScreen, setViewMode } = useApp();
  const [zoomedPanel, setZoomedPanel] = useState<number | null>(null);

  const openInteractiveScreen = (screenName: any) => {
    setActiveScreen(screenName);
    setViewMode('mobile_app');
  };

  const panels = [
    {
      number: 1,
      title: "1. Splash & Auth (Login & Register)",
      screenKey: 'splash',
      type: 'mobile',
      component: <SplashScreen isMockup={true} onContinue={() => openInteractiveScreen('home')} />
    },
    {
      number: 2,
      title: "2. Teacher Home",
      screenKey: 'home',
      type: 'mobile',
      component: <TeacherHomeScreen isMockup={true} />
    },
    {
      number: 3,
      title: "3. Take Attendance",
      screenKey: 'take_attendance',
      type: 'mobile',
      highlight: true,
      component: <TakeAttendanceScreen isMockup={true} />
    },
    {
      number: 4,
      title: "4. Attendance History",
      screenKey: 'attendance_history',
      type: 'mobile',
      component: <AttendanceHistoryScreen isMockup={true} />
    },
    {
      number: 5,
      title: "5. Student Attendance",
      screenKey: 'student_attendance',
      type: 'mobile',
      component: <StudentAttendanceScreen isMockup={true} />
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F4F6F4] text-slate-800 p-4 md:p-8 select-none">
      {/* Presentation Header Bar */}
      <div className="max-w-[1720px] mx-auto mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#EAF6EF] text-[#006B45] text-xs font-bold uppercase tracking-wider">
              Anjali House NGO • Product Specification
            </span>
            <span className="text-xs font-medium text-slate-400">• High-Fidelity Mobile App Showcase</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2 flex-wrap">
            <span>Anjali House — Student Attendance Management System</span>
            <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-[#EAF6EF] text-[#006B45]">
              សមាគមផ្ទះអញ្ជលី
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Dedicated student attendance management system for Anjali House NGO • Siem Reap, Cambodia
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('mobile_app')}
            className="px-5 py-2.5 rounded-2xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-emerald-300" />
            <span>Launch Live Mobile Simulator</span>
          </button>

          <button
            onClick={() => setViewMode('admin_desktop')}
            className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Laptop className="w-4 h-4 text-[#006B45]" />
            <span>Admin Web View</span>
          </button>
        </div>
      </div>

      {/* Main 9-Panel Canvas (Exact Visual Reference Composition from image.png) */}
      <div className="max-w-[1720px] mx-auto space-y-8">
        
        {/* ROW 1: 5 MOBILE SCREENS (Splash, Home, Take Attendance, History, Student) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {panels.map((p) => (
              <div key={p.number} className="flex flex-col items-center">
                {/* Green Label Pill (Matching Reference Graphic) */}
                <div className="mb-3 px-4 py-1.5 rounded-xl bg-[#004D35] text-white text-xs font-black shadow-xs tracking-tight flex items-center gap-1.5">
                  <span>{p.title}</span>
                  {p.highlight && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#20A464] text-[9px] font-bold">
                      Primary
                    </span>
                  )}
                </div>

                {/* Mobile Phone Mockup Frame */}
                <div className="relative group w-full max-w-[310px] h-[590px] bg-slate-900 rounded-[36px] p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] border-2 border-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl">
                  {/* Status Bar */}
                  <div className="w-full h-6 px-4 flex items-center justify-between text-[10px] font-bold text-slate-700 z-20 select-none">
                    <span className={p.number === 1 || p.number === 3 ? 'text-white' : 'text-slate-800'}>9:41</span>
                    <div className="w-14 h-3 bg-black rounded-full mx-auto -mt-1" />
                    <span className={p.number === 1 || p.number === 3 ? 'text-white' : 'text-slate-800'}>100%</span>
                  </div>

                  {/* Screen Content */}
                  <div className="w-full h-[calc(100%-24px)] rounded-[28px] overflow-hidden bg-[#F7F8F7] relative">
                    {p.component}
                  </div>

                  {/* Hover Overlay to Zoom or Test Live */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[36px] flex flex-col items-center justify-center gap-3 backdrop-blur-xs p-4">
                    <button
                      onClick={() => openInteractiveScreen(p.screenKey)}
                      className="px-4 py-2 rounded-xl bg-[#006B45] text-white text-xs font-bold shadow-lg hover:bg-[#004D35] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Test Live Screen</span>
                    </button>
                    <button
                      onClick={() => setZoomedPanel(p.number)}
                      className="px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold shadow-md hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
                      <span>Zoom View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: 4 MAJOR SECTIONS (Admin Dashboard Laptop, Register Form Mobile, Tech Stack, App Icon) */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* 6. Admin Dashboard Web (Laptop Form Factor, Col Span 6) */}
            <div className="md:col-span-6 flex flex-col items-center">
              {/* Green Header Pill */}
              <div className="mb-3 px-4 py-1.5 rounded-xl bg-[#004D35] text-white text-xs font-black shadow-xs tracking-tight">
                6. Admin Dashboard (Web)
              </div>

              {/* Laptop Shell Frame */}
              <div className="relative group w-full bg-slate-900 rounded-t-2xl p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.18)] border-2 border-slate-700 flex flex-col h-[590px]">
                {/* Webcam dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mx-auto mb-1.5 ring-1 ring-slate-700" />
                
                {/* Screen glass */}
                <div className="w-full flex-1 rounded-xl overflow-hidden bg-[#F7F8F7] relative">
                  <AdminWebDashboard isMockup={true} />
                </div>

                {/* Laptop Base Lip */}
                <div className="absolute -bottom-3 inset-x-4 h-3 bg-slate-400 rounded-b-xl shadow-md pointer-events-none" />

                {/* Hover button to open full desktop */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={() => setViewMode('admin_desktop')}
                    className="px-5 py-2.5 rounded-2xl bg-[#006B45] text-white text-xs font-bold shadow-xl hover:bg-[#004D35] transition flex items-center gap-2 cursor-pointer"
                  >
                    <Laptop className="w-4 h-4 text-emerald-300" />
                    <span>Open Fullscreen Desktop Admin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 7. Register Student Form (Mobile Form Factor, Col Span 2.5) */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="mb-3 px-4 py-1.5 rounded-xl bg-[#004D35] text-white text-xs font-black shadow-xs tracking-tight">
                7. Register Student (Form)
              </div>

              <div className="relative group w-full max-w-[310px] h-[590px] bg-slate-900 rounded-[36px] p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] border-2 border-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="w-full h-6 px-4 flex items-center justify-between text-[10px] font-bold text-white z-20 select-none">
                  <span>9:41</span>
                  <div className="w-14 h-3 bg-black rounded-full mx-auto -mt-1" />
                  <span>100%</span>
                </div>

                <div className="w-full h-[calc(100%-24px)] rounded-[28px] overflow-hidden bg-[#F7F8F7]">
                  <StudentRegistrationScreen isMockup={true} />
                </div>

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[36px] flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={() => openInteractiveScreen('register_student')}
                    className="px-4 py-2 rounded-xl bg-[#006B45] text-white text-xs font-bold shadow-lg hover:bg-[#004D35] transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Test Form Live</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 8. Technology Stack Presentation Card (Col Span 2) */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="mb-3 px-4 py-1.5 rounded-xl bg-[#004D35] text-white text-xs font-black shadow-xs tracking-tight">
                8. Technology Stack
              </div>

              <div className="w-full h-[590px] rounded-[32px] overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <TechnologyStackCard />
              </div>
            </div>

            {/* 9. App Icon Presentation Card (Col Span 2) */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="mb-3 px-4 py-1.5 rounded-xl bg-[#004D35] text-white text-xs font-black shadow-xs tracking-tight">
                9. App Icon
              </div>

              <div className="w-full h-[590px] rounded-[32px] overflow-hidden border border-slate-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-white transition hover:-translate-y-1 hover:shadow-xl">
                <AppIconCard />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Zoom Modal if user clicks on any panel */}
      {zoomedPanel && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 p-4 rounded-[40px] shadow-2xl relative max-w-[420px] w-full max-h-[90vh] flex flex-col">
            <button
              onClick={() => setZoomedPanel(null)}
              className="absolute top-6 right-6 z-50 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-[720px] max-h-[80vh] rounded-[32px] overflow-hidden bg-[#F7F8F7]">
              {zoomedPanel === 1 && <SplashScreen />}
              {zoomedPanel === 2 && <TeacherHomeScreen />}
              {zoomedPanel === 3 && <TakeAttendanceScreen />}
              {zoomedPanel === 4 && <AttendanceHistoryScreen />}
              {zoomedPanel === 5 && <StudentAttendanceScreen />}
              {zoomedPanel === 7 && <StudentRegistrationScreen />}
              {zoomedPanel === 8 && <TechnologyStackCard />}
              {zoomedPanel === 9 && <AppIconCard />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
