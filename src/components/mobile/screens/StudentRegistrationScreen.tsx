import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Calendar, 
  Phone, 
  Home, 
  CheckCircle2, 
  Upload,
  AlertCircle 
} from 'lucide-react';

interface StudentRegistrationScreenProps {
  onBack?: () => void;
  isMockup?: boolean;
}

export const StudentRegistrationScreen: React.FC<StudentRegistrationScreenProps> = ({ 
  onBack, 
  isMockup = false 
}) => {
  const { setActiveScreen, registerNewStudent, t, language } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    fullNameKhmer: '',
    studentId: `S${Math.floor(1000 + Math.random() * 9000)}`,
    dob: '2015-05-12',
    gender: 'Male' as 'Male' | 'Female',
    classId: 'c1',
    className: 'Grade 5A',
    parentName: '',
    parentPhone: '',
    address: 'Siem Reap, Cambodia'
  });

  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleBack = () => {
    if (onBack) onBack();
    else setActiveScreen('home');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter student full name');
      return;
    }
    if (!formData.parentName.trim()) {
      setErrorMsg('Please enter parent or guardian name');
      return;
    }

    registerNewStudent({
      name: formData.fullName,
      nameKhmer: formData.fullNameKhmer,
      gender: formData.gender,
      dob: formData.dob,
      classId: formData.classId,
      className: formData.className,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone || '+855 12 000 111',
      address: formData.address,
      avatarUrl: photoUploaded ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150' : undefined
    });

    setSubmittedSuccess(true);
  };

  return (
    <div className="w-full h-full bg-[#F7F8F7] flex flex-col justify-between overflow-y-auto pb-16 select-none">
      {/* Top Header Bar (Matching reference 7. Register Student) */}
      <div className="bg-[#004D35] text-white px-4 pt-3 pb-3 shadow-sm flex items-center justify-between flex-shrink-0">
        <button 
          onClick={handleBack}
          className="flex items-center gap-1.5 text-emerald-100 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-bold">{t.registerStudent}</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {submittedSuccess ? (
          <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-sm text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006B45] flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {t.registeredSuccess}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Student {formData.fullName} ({formData.studentId}) is now enrolled in {formData.className}.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setActiveScreen('home');
                }}
                className="w-full py-3 rounded-xl bg-[#006B45] text-white font-bold text-xs hover:bg-[#004D35] transition cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Photo Upload Circle (Matching Reference Photo Upload Circle) */}
            <div className="flex flex-col items-center justify-center pt-2">
              <button
                type="button"
                onClick={() => setPhotoUploaded(!photoUploaded)}
                className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 border-dashed transition cursor-pointer ${
                  photoUploaded
                    ? 'border-[#20A464] bg-emerald-50 text-[#006B45]'
                    : 'border-slate-300 bg-white hover:border-[#006B45] text-slate-400'
                }`}
              >
                {photoUploaded ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-6 h-6 text-[#20A464]" />
                    <span className="text-[9px] font-bold text-[#006B45] mt-0.5">Uploaded</span>
                  </div>
                ) : (
                  <>
                    <Camera className="w-6 h-6 mb-1 text-slate-400" />
                    <span className="text-[9px] font-semibold text-slate-500">{t.uploadPhoto}</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-slate-400 mt-1">Tap to select student image</span>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Fields List */}
            <div className="space-y-2.5 bg-white p-4 rounded-3xl border border-slate-100 shadow-2xs">
              {/* Full Name */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sok Dara"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006B45] focus:bg-white outline-none transition"
                />
              </div>

              {/* Student ID & Date of Birth */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    {t.studentId}
                  </label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 focus:border-[#006B45] focus:bg-white outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    {t.dob}
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:border-[#006B45] focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              {/* Gender & Class */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    {t.gender}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:border-[#006B45] focus:bg-white outline-none transition"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    {t.class}
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:border-[#006B45] focus:bg-white outline-none transition"
                  >
                    <option value="Grade 5A">Grade 5A</option>
                    <option value="Grade 5B">Grade 5B</option>
                    <option value="Grade 6A">Grade 6A</option>
                    <option value="Grade 6B">Grade 6B</option>
                  </select>
                </div>
              </div>

              {/* Parent / Guardian Name */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {t.parentGuardianName} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Sok Kolab"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006B45] focus:bg-white outline-none transition"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  placeholder="+855 12 345 678"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006B45] focus:bg-white outline-none transition"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {t.address}
                </label>
                <input
                  type="text"
                  placeholder="Salakanseng, Siem Reap"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#006B45] focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* Primary Green Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#006B45] hover:bg-[#004D35] text-white font-bold text-sm shadow-md transition active:scale-[0.98] cursor-pointer"
            >
              {t.registerStudent}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
