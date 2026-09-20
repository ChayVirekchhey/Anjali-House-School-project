import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  ArrowLeft, 
  GraduationCap, 
  Users, 
  Clock, 
  Calendar, 
  BookOpen, 
  ChevronRight,
  Plus,
  Search 
} from 'lucide-react';

interface ClassesScheduleScreenProps {
  onBack?: () => void;
}

export const ClassesScheduleScreen: React.FC<ClassesScheduleScreenProps> = ({ onBack }) => {
  const { setActiveScreen, classes, students, t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'classes' | 'schedule' | 'students'>('classes');
  const [search, setSearch] = useState('');

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-y-auto pb-16 select-none">
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-3 shadow-sm flex items-center justify-between flex-shrink-0">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-bold">
            {activeTab === 'classes' ? t.myClasses : activeTab === 'schedule' ? t.schedule : t.students}
          </span>
        </button>

        <button
          onClick={() => setActiveScreen('register_student')}
          className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Navigation tabs */}
        <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          {[
            { id: 'classes', label: t.myClasses },
            { id: 'schedule', label: t.schedule },
            { id: 'students', label: t.students }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#006B45] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search classes or students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-[#006B45] outline-none shadow-2xs"
          />
        </div>

        {/* Tab 1: Classes */}
        {activeTab === 'classes' && (
          <div className="space-y-2.5">
            {classes.map(cls => (
              <div 
                key={cls.id}
                className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-xs transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF6EF] text-[#006B45] flex items-center justify-center font-bold">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{cls.name}</h4>
                      <p className="text-xs text-slate-400">{cls.room} • {cls.teacherName}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#006B45] px-2.5 py-1 rounded-xl bg-emerald-50">
                    {cls.totalStudents} Students
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
                  {cls.subjects.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Schedule */}
        {activeTab === 'schedule' && (
          <div className="space-y-2.5">
            {[
              { time: '08:00 - 09:30', class: 'Grade 5A', subject: 'English', room: 'Room 201', active: true },
              { time: '10:00 - 11:30', class: 'Grade 6A', subject: 'Computer Lab', room: 'Lab 1', active: false },
              { time: '13:30 - 15:00', class: 'Grade 5B', subject: 'Mathematics', room: 'Room 202', active: false },
              { time: '15:15 - 16:45', class: 'Grade 6B', subject: 'Geography', room: 'Room 301', active: false }
            ].map((slot, i) => (
              <div 
                key={i}
                className={`p-3.5 rounded-2xl bg-white border transition shadow-2xs flex items-center justify-between ${
                  slot.active ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{slot.class}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-mono">
                        {slot.room}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{slot.subject}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block">{slot.time}</span>
                  {slot.active ? (
                    <span className="text-[10px] font-bold text-[#20A464]">Now Active</span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Scheduled</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Students Roster */}
        {activeTab === 'students' && (
          <div className="space-y-2">
            {students
              .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search))
              .map(student => (
                <div 
                  key={student.id}
                  className="p-3 rounded-2xl bg-white border border-slate-100 shadow-2xs flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono">
                      {student.code}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{student.name}</h4>
                      <span className="text-[10px] text-slate-400">{student.className} • {student.parentPhone}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#006B45] px-2 py-0.5 rounded-lg bg-emerald-50">
                    {student.overallAttendanceRate}%
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
