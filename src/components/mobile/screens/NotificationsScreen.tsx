import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, CheckCheck } from 'lucide-react';

interface NotificationsScreenProps {
  onBack?: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const { setActiveScreen, notifications, t, language, showToast } = useApp();

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  const markAllRead = () => {
    showToast(language === 'km' ? 'បានសម្គាល់ថានៅអានរួចទាំងអស់' : 'All notifications marked as read');
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-y-auto pb-16 select-none">
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-3 shadow-sm flex items-center justify-between flex-shrink-0">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-bold">{t.notifications}</span>
        </button>

        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-emerald-200 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark Read</span>
        </button>
      </div>

      <div className="p-4 space-y-2.5">
        {notifications.map((n) => {
          let icon = <CheckCircle2 className="w-4 h-4 text-[#20A464]" />;
          let bg = "bg-emerald-50";
          if (n.type === 'absence') {
            icon = <AlertCircle className="w-4 h-4 text-[#E5484D]" />;
            bg = "bg-rose-50";
          } else if (n.type === 'alert') {
            icon = <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />;
            bg = "bg-amber-50";
          } else if (n.type === 'announcement') {
            icon = <Info className="w-4 h-4 text-[#3B82F6]" />;
            bg = "bg-blue-50";
          }

          return (
            <div 
              key={n.id}
              className={`p-3.5 rounded-2xl bg-white border transition shadow-2xs flex items-start gap-3 ${
                !n.read ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-slate-100'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    {language === 'km' && n.titleKhmer ? n.titleKhmer : n.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {language === 'km' && n.messageKhmer ? n.messageKhmer : n.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
