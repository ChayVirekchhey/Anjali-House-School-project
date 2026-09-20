import React from 'react';
import { useApp } from '../../context/AppContext';
import { ANJALI_LOGO_BASE64 } from './anjali_logo_base64';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge';
  lightText?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

export const EduAttendLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full', 
  lightText = false,
  showSubtitle = true,
  className = ''
}) => {
  const { language } = useApp();

  // Responsive dimensions for official logo (approx 300x207 aspect ratio ~ 1.45:1)
  const dimensions = {
    xs: { w: 'w-10 h-7', subClass: 'text-[9px]' },
    sm: { w: 'w-16 h-11', subClass: 'text-[10px]' },
    md: { w: 'w-24 h-16', subClass: 'text-xs' },
    lg: { w: 'w-36 h-25', subClass: 'text-sm' },
    xl: { w: 'w-48 h-33', subClass: 'text-base' }
  };

  const dim = dimensions[size];

  // Official Anjali House Logo image
  const logoGraphic = (
    <img 
      src={ANJALI_LOGO_BASE64}
      alt="Anjali House"
      className="w-full h-full object-contain filter drop-shadow-2xs"
      draggable={false}
    />
  );

  // Variant: Icon / standalone emblem
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center flex-shrink-0 ${dim.w} ${className}`}>
        {logoGraphic}
      </div>
    );
  }

  // Variant: Badge with high-contrast card (for dark headers or dark sidebars)
  if (variant === 'badge' || lightText) {
    return (
      <div className={`inline-flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-2xl shadow-xs border border-slate-100 ${className}`}>
        <div className={`flex-shrink-0 ${dim.w}`}>
          {logoGraphic}
        </div>
        {showSubtitle && (
          <div className="flex flex-col border-l border-slate-200 pl-2.5 text-left">
            <span className="text-[11px] font-bold text-slate-800 leading-tight">
              {language === 'km' ? 'សមាគមផ្ទះអញ្ជលី' : 'Anjali House'}
            </span>
            <span className="text-[9px] font-semibold text-[#006B45]">
              {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស' : 'Student Attendance'}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Variant: Full layout
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`flex items-center justify-center flex-shrink-0 ${dim.w}`}>
        {logoGraphic}
      </div>

      {showSubtitle && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#EAF6EF] text-[#006B45] tracking-tight">
              {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស' : 'Student Attendance System'}
            </span>
          </div>
          <span className={`${dim.subClass} text-slate-500 font-medium mt-0.5`}>
            {language === 'km' ? 'សមាគមផ្ទះអញ្ជលី • ខេត្តសៀមរាប' : 'Anjali House Association • Siem Reap'}
          </span>
        </div>
      )}
    </div>
  );
};
