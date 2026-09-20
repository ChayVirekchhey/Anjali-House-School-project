import React from 'react';
import { Database, ShieldCheck, Bell, MapPin, Layers, Server, Smartphone, Key } from 'lucide-react';

export const TechnologyStackCard: React.FC = () => {
  const techItems = [
    {
      category: 'Frontend',
      title: 'Flutter',
      desc: 'Cross-platform mobile UI framework for iOS & Android',
      color: 'bg-[#02569B]/10 text-[#02569B] border-[#02569B]/20',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zM6.002 15.702L12 21.7 15.686 18 9.688 12l-3.686 3.702zM12 9.688l3.686-3.686H21.7L15.7 12 12 9.688zM15.7 12l5.986 6h-6.014L12 14.314 15.7 12z" fill="#02569B"/>
        </svg>
      )
    },
    {
      category: 'Backend',
      title: 'ASP.NET Core Web API',
      desc: 'High-performance C# RESTful backend services',
      color: 'bg-[#512BD4]/10 text-[#512BD4] border-[#512BD4]/20',
      iconSvg: (
        <div className="w-9 h-9 rounded-full bg-[#512BD4] text-white flex items-center justify-center font-black text-xs">
          AN.NET
        </div>
      )
    },
    {
      category: 'Database',
      title: 'SQL Server',
      desc: 'Enterprise relational database management system',
      color: 'bg-[#CC292B]/10 text-[#CC292B] border-[#CC292B]/20',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#CC292B]" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      )
    },
    {
      category: 'Map & Location',
      title: 'Google Maps API',
      desc: 'School geofencing, student transit, and campus mapping',
      color: 'bg-[#EA4335]/10 text-[#EA4335] border-[#EA4335]/20',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#EA4335]" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>
      )
    },
    {
      category: 'Authentication',
      title: 'JWT Bearer Tokens',
      desc: 'Role-based access control with secure HMAC encryption',
      color: 'bg-emerald-50 text-[#006B45] border-emerald-200',
      iconSvg: (
        <div className="w-8 h-8 rounded-xl bg-[#006B45] text-white flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
      )
    },
    {
      category: 'Cloud Notification',
      title: 'Firebase Cloud Messaging',
      desc: 'Automated instant parent absence & tardy push alerts',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      iconSvg: (
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
          <Bell className="w-5 h-5" />
        </div>
      )
    }
  ];

  return (
    <div className="w-full h-full bg-white p-6 flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-[#EAF6EF] text-[#006B45] flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 leading-tight">
              Technology Stack
            </h3>
            <p className="text-[11px] text-slate-400">Enterprise Production Architecture</p>
          </div>
        </div>

        {/* 4 Primary Technology Rows matching the reference card */}
        <div className="space-y-3.5">
          {techItems.slice(0, 4).map((tech, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-2xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:shadow-xs transition flex items-center gap-3.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center flex-shrink-0">
                {tech.iconSvg}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  {tech.category}
                </span>
                <h4 className="text-sm font-black text-slate-900">{tech.title}</h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Cloud Footnote */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 font-semibold text-[#006B45]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#20A464]" /> JWT Auth Ready
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1 font-semibold text-amber-700">
          <Bell className="w-3.5 h-3.5 text-amber-500" /> Firebase Alerts
        </span>
      </div>
    </div>
  );
};
